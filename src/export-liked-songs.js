#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const config = require('./config');
const { fetchJson } = require('./lib/http');
const { ensureSpotifyAccessToken } = require('./lib/spotify');
const { createTokenStore } = require('./store/tokenStore');

function printUsage() {
  console.log(`
Export Spotify liked songs to a local file.

Usage:
  node src/export-liked-songs.js [--format json|csv] [--out <path>] [--max <number>] [--no-raw]

Options:
  --format, -f   Output format (default: json)
  --out, -o      Output file path
  --max, -m      Max liked songs to export (default: all)
  --no-raw       Exclude full raw Spotify item from JSON output
  --help, -h     Show this help message
`);
}

function parseArgs(argv) {
  const args = {
    format: 'json',
    out: null,
    max: null,
    includeRaw: true,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      args.help = true;
      continue;
    }
    if (arg === '--no-raw') {
      args.includeRaw = false;
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

  if (!['json', 'csv'].includes(args.format)) {
    throw new Error(`Unsupported format "${args.format}". Use "json" or "csv".`);
  }
  if (args.max !== null && (!Number.isFinite(args.max) || args.max < 1)) {
    throw new Error('Invalid --max value. It must be a positive number.');
  }

  return args;
}

function createDefaultOutputPath(format) {
  const stamp = new Date().toISOString().replace(/[:]/g, '-');
  const fileName = `spotify-liked-songs-${stamp}.${format}`;
  return path.join(process.cwd(), fileName);
}

async function fetchAllLikedSongs(accessToken, maxTracks) {
  const items = [];
  let offset = 0;
  let total = null;

  while (true) {
    const remaining = maxTracks ? maxTracks - items.length : 50;
    if (maxTracks && remaining <= 0) {
      break;
    }

    const limit = Math.min(50, Math.max(1, remaining));
    const url = new URL('https://api.spotify.com/v1/me/tracks');
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('offset', String(offset));

    const data = await fetchJson(url.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const batch = Array.isArray(data.items) ? data.items : [];
    if (total === null && Number.isFinite(Number(data.total))) {
      total = Number(data.total);
    }
    if (batch.length === 0) {
      break;
    }

    items.push(...batch);
    offset += batch.length;
    console.log(`Fetched ${items.length}${total ? ` / ${total}` : ''} liked songs...`);

    if (!data.next) {
      break;
    }
  }

  return { items, totalFromApi: total };
}

function normalizeItem(item, includeRaw) {
  const track = item?.track || {};
  const album = track.album || {};
  const artists = Array.isArray(track.artists) ? track.artists : [];

  const normalized = {
    addedAt: item?.added_at || null,
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
    'addedAt',
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

  const outputPath = args.out ? path.resolve(process.cwd(), args.out) : createDefaultOutputPath(args.format);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const tokenStore = createTokenStore(config.TOKEN_FILE);
  const spotifyAccessToken = await ensureSpotifyAccessToken(config, tokenStore, fetchJson);
  const { items, totalFromApi } = await fetchAllLikedSongs(spotifyAccessToken, args.max);
  const rows = items.map((item) => normalizeItem(item, args.includeRaw && args.format === 'json'));

  if (args.format === 'json') {
    const payload = {
      generatedAt: new Date().toISOString(),
      source: 'Spotify API /v1/me/tracks',
      totalFromApi,
      exportedCount: rows.length,
      maxApplied: args.max,
      items: rows,
    };
    fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  } else {
    fs.writeFileSync(outputPath, `${toCsv(rows)}\n`, 'utf8');
  }

  console.log(`Export complete: ${rows.length} liked songs -> ${outputPath}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
