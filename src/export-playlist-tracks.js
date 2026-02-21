#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const config = require('./config');
const { fetchJson } = require('./lib/http');
const { ensureSpotifyAccessToken } = require('./lib/spotify');
const { createTokenStore } = require('./store/tokenStore');

function printUsage() {
  console.log(`
Export Spotify playlist tracks to a local file.

Usage:
  node src/export-playlist-tracks.js --list-playlists
  node src/export-playlist-tracks.js --playlist-name "<name>" [--format json|csv] [--out <path>] [--max <number>] [--no-raw]
  node src/export-playlist-tracks.js --playlist-id "<id>" [--format json|csv] [--out <path>] [--max <number>] [--no-raw]

Options:
  --list-playlists  List your playlists with id and track count
  --playlist-name   Playlist name from your Spotify account
  --playlist-id     Playlist ID (preferred if you already know it)
  --format, -f      Output format (default: json)
  --out, -o         Output file path
  --max, -m         Max tracks to export (default: all)
  --no-raw          Exclude full raw Spotify item from JSON output
  --help, -h        Show this help message
`);
}

function slugify(value) {
  return String(value || 'playlist')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'playlist';
}

function parseArgs(argv) {
  const args = {
    listPlaylists: false,
    playlistName: null,
    playlistId: null,
    format: 'json',
    out: null,
    max: null,
    includeRaw: true,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      args.help = true;
      continue;
    }
    if (arg === '--list-playlists') {
      args.listPlaylists = true;
      continue;
    }
    if (arg === '--no-raw') {
      args.includeRaw = false;
      continue;
    }
    if (arg === '--playlist-name') {
      args.playlistName = String(argv[i + 1] || '').trim();
      i += 1;
      continue;
    }
    if (arg === '--playlist-id') {
      args.playlistId = String(argv[i + 1] || '').trim();
      i += 1;
      continue;
    }
    if (arg === '--format' || arg === '-f') {
      args.format = String(argv[i + 1] || '').trim().toLowerCase();
      i += 1;
      continue;
    }
    if (arg === '--out' || arg === '-o') {
      args.out = String(argv[i + 1] || '').trim();
      i += 1;
      continue;
    }
    if (arg === '--max' || arg === '-m') {
      args.max = Number(argv[i + 1]);
      i += 1;
      continue;
    }
  }

  if (args.help) {
    return args;
  }
  if (!args.listPlaylists && !args.playlistId && !args.playlistName) {
    throw new Error('Missing playlist selector. Use --playlist-name or --playlist-id.');
  }
  if (!['json', 'csv'].includes(args.format)) {
    throw new Error(`Unsupported format "${args.format}". Use "json" or "csv".`);
  }
  if (args.max !== null && (!Number.isFinite(args.max) || args.max < 1)) {
    throw new Error('Invalid --max value. It must be a positive number.');
  }

  return args;
}

function createDefaultOutputPath(format, playlistName) {
  const stamp = new Date().toISOString().replace(/[:]/g, '-');
  const fileName = `spotify-playlist-${slugify(playlistName)}-${stamp}.${format}`;
  return path.join(process.cwd(), fileName);
}

function asSpotifyError(error) {
  const body = String(error?.body || '');
  if (error?.status === 403 && body.includes('insufficient scope')) {
    return new Error(
      'Spotify token is missing playlist scopes. Reconnect Spotify at /auth/spotify, then run export again.'
    );
  }
  return error;
}

async function fetchPlaylistById(accessToken, playlistId) {
  try {
    const url = new URL(`https://api.spotify.com/v1/playlists/${encodeURIComponent(playlistId)}`);
    return await fetchJson(url.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    throw asSpotifyError(error);
  }
}

async function fetchMyPlaylists(accessToken) {
  const items = [];
  let offset = 0;

  while (true) {
    try {
      const url = new URL('https://api.spotify.com/v1/me/playlists');
      url.searchParams.set('limit', '50');
      url.searchParams.set('offset', String(offset));

      const data = await fetchJson(url.toString(), {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const batch = Array.isArray(data.items) ? data.items : [];
      if (batch.length === 0) {
        break;
      }
      items.push(...batch);
      if (!data.next) {
        break;
      }
      offset += batch.length;
    } catch (error) {
      throw asSpotifyError(error);
    }
  }

  return items;
}

async function resolvePlaylist(accessToken, args) {
  if (args.playlistId) {
    const playlist = await fetchPlaylistById(accessToken, args.playlistId);
    return playlist;
  }

  const all = await fetchMyPlaylists(accessToken);
  const targetName = args.playlistName.toLowerCase();

  const exact = all.find((item) => String(item?.name || '').toLowerCase() === targetName);
  if (exact) {
    return fetchPlaylistById(accessToken, exact.id);
  }

  const partial = all.find((item) => String(item?.name || '').toLowerCase().includes(targetName));
  if (partial) {
    return fetchPlaylistById(accessToken, partial.id);
  }

  throw new Error(`Playlist "${args.playlistName}" not found in your Spotify account. Run with --list-playlists to find exact name/id.`);
}

async function fetchPlaylistTracks(accessToken, playlistId, maxTracks) {
  const items = [];
  let offset = 0;

  while (true) {
    const remaining = maxTracks ? maxTracks - items.length : 100;
    if (maxTracks && remaining <= 0) {
      break;
    }

    const limit = Math.min(100, Math.max(1, remaining));
    const url = new URL(`https://api.spotify.com/v1/playlists/${encodeURIComponent(playlistId)}/tracks`);
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('offset', String(offset));
    url.searchParams.set('additional_types', 'track');

    let data;
    try {
      data = await fetchJson(url.toString(), {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (error) {
      throw asSpotifyError(error);
    }

    const batch = Array.isArray(data.items) ? data.items : [];
    if (batch.length === 0) {
      break;
    }

    items.push(...batch);
    offset += batch.length;
    console.log(`Fetched ${items.length} playlist tracks...`);

    if (!data.next) {
      break;
    }
  }

  return items;
}

function normalizeItem(item, includeRaw) {
  const track = item?.track || {};
  const album = track.album || {};
  const artists = Array.isArray(track.artists) ? track.artists : [];

  const normalized = {
    playlistAddedAt: item?.added_at || null,
    playlistAddedBy: item?.added_by?.id || null,
    playlistAddedByUri: item?.added_by?.uri || null,
    spotifyTrackId: track.id || null,
    title: track.name || null,
    artists: artists.map((artist) => artist.name).filter(Boolean),
    artistIds: artists.map((artist) => artist.id).filter(Boolean),
    artistUris: artists.map((artist) => artist.uri).filter(Boolean),
    albumName: album.name || null,
    albumId: album.id || null,
    albumType: album.album_type || null,
    albumReleaseDate: album.release_date || null,
    albumReleaseDatePrecision: album.release_date_precision || null,
    albumTotalTracks: Number.isFinite(Number(album.total_tracks)) ? Number(album.total_tracks) : null,
    trackNumber: Number.isFinite(Number(track.track_number)) ? Number(track.track_number) : null,
    discNumber: Number.isFinite(Number(track.disc_number)) ? Number(track.disc_number) : null,
    durationMs: Number.isFinite(Number(track.duration_ms)) ? Number(track.duration_ms) : null,
    explicit: Boolean(track.explicit),
    popularity: Number.isFinite(Number(track.popularity)) ? Number(track.popularity) : null,
    isLocal: Boolean(track.is_local),
    isPlayable: typeof track.is_playable === 'boolean' ? track.is_playable : null,
    previewUrl: track.preview_url || null,
    spotifyUrl: track.external_urls?.spotify || null,
    trackUri: track.uri || null,
    albumImageUrl: Array.isArray(album.images) && album.images[0] ? album.images[0].url : null,
    externalIds: track.external_ids || null,
    availableMarketsCount: Array.isArray(track.available_markets) ? track.available_markets.length : 0,
    availableMarkets: Array.isArray(track.available_markets) ? track.available_markets : [],
  };

  if (includeRaw) {
    normalized.rawSpotifyItem = item;
  }

  return normalized;
}

function csvEscape(value) {
  if (value === null || value === undefined) {
    return '';
  }
  const text = String(value);
  if (text.includes('"') || text.includes(',') || text.includes('\n')) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function toCsv(rows) {
  const headers = [
    'playlistAddedAt',
    'playlistAddedBy',
    'playlistAddedByUri',
    'spotifyTrackId',
    'title',
    'artists',
    'artistIds',
    'artistUris',
    'albumName',
    'albumId',
    'albumType',
    'albumReleaseDate',
    'albumReleaseDatePrecision',
    'albumTotalTracks',
    'trackNumber',
    'discNumber',
    'durationMs',
    'explicit',
    'popularity',
    'isLocal',
    'isPlayable',
    'previewUrl',
    'spotifyUrl',
    'trackUri',
    'albumImageUrl',
    'externalIds',
    'availableMarketsCount',
    'availableMarkets',
  ];

  const lines = [headers.join(',')];
  for (const row of rows) {
    const values = headers.map((header) => {
      const value = row[header];
      if (Array.isArray(value) || (value && typeof value === 'object')) {
        return csvEscape(JSON.stringify(value));
      }
      return csvEscape(value);
    });
    lines.push(values.join(','));
  }

  return lines.join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printUsage();
    return;
  }

  const tokenStore = createTokenStore(config.TOKEN_FILE);
  const spotifyAccessToken = await ensureSpotifyAccessToken(config, tokenStore, fetchJson);

  if (args.listPlaylists) {
    const playlists = await fetchMyPlaylists(spotifyAccessToken);
    if (playlists.length === 0) {
      console.log('No playlists found in your Spotify account.');
      return;
    }
    for (const playlist of playlists) {
      const line = [
        `name="${playlist?.name || ''}"`,
        `id=${playlist?.id || ''}`,
        `tracks=${Number(playlist?.tracks?.total || 0)}`,
        `owner=${playlist?.owner?.display_name || playlist?.owner?.id || ''}`,
      ].join(' | ');
      console.log(line);
    }
    console.log(`Total playlists: ${playlists.length}`);
    return;
  }

  const playlist = await resolvePlaylist(spotifyAccessToken, args);

  const rows = (await fetchPlaylistTracks(spotifyAccessToken, playlist.id, args.max))
    .filter((item) => item?.track && item.track.type === 'track')
    .map((item) => normalizeItem(item, args.includeRaw && args.format === 'json'));

  const outputPath = args.out
    ? path.resolve(process.cwd(), args.out)
    : createDefaultOutputPath(args.format, playlist.name || args.playlistName || playlist.id);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  if (args.format === 'json') {
    const payload = {
      generatedAt: new Date().toISOString(),
      source: `Spotify API /v1/playlists/${playlist.id}/tracks`,
      playlist: {
        id: playlist.id,
        name: playlist.name || null,
        owner: playlist.owner?.display_name || playlist.owner?.id || null,
        ownerId: playlist.owner?.id || null,
        public: typeof playlist.public === 'boolean' ? playlist.public : null,
        collaborative: typeof playlist.collaborative === 'boolean' ? playlist.collaborative : null,
        spotifyUrl: playlist.external_urls?.spotify || null,
        uri: playlist.uri || null,
        totalTracksFromPlaylist: Number(playlist?.tracks?.total || 0),
      },
      exportedCount: rows.length,
      maxApplied: args.max,
      items: rows,
    };
    fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  } else {
    fs.writeFileSync(outputPath, `${toCsv(rows)}\n`, 'utf8');
  }

  console.log(`Export complete: ${rows.length} tracks from "${playlist.name}" -> ${outputPath}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
