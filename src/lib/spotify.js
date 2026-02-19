function ensureSpotifyEnv(config) {
  if (!config.SPOTIFY_CLIENT_ID || !config.SPOTIFY_CLIENT_SECRET) {
    throw new Error('Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env');
  }
}

async function exchangeSpotifyCode(code, config, fetchJson) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: config.SPOTIFY_REDIRECT_URI,
  });

  return fetchJson('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${config.SPOTIFY_CLIENT_ID}:${config.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
}

async function refreshSpotifyToken(config, tokenStore, fetchJson) {
  const spotifyToken = tokenStore.getProvider('spotify');
  if (!spotifyToken || !spotifyToken.refresh_token) {
    throw new Error('Spotify refresh token missing. Reconnect Spotify.');
  }

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: spotifyToken.refresh_token,
  });

  const refreshed = await fetchJson('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${config.SPOTIFY_CLIENT_ID}:${config.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  tokenStore.upsertProvider('spotify', refreshed);
  return tokenStore.getProvider('spotify').access_token;
}

async function ensureSpotifyAccessToken(config, tokenStore, fetchJson) {
  ensureSpotifyEnv(config);

  const spotifyToken = tokenStore.getProvider('spotify');
  if (!spotifyToken || !spotifyToken.access_token) {
    throw new Error('Spotify not connected. Visit /auth/spotify first.');
  }

  if (spotifyToken.expires_at && spotifyToken.expires_at > Date.now() + 60 * 1000) {
    return spotifyToken.access_token;
  }

  return refreshSpotifyToken(config, tokenStore, fetchJson);
}

function parseSpotifyTrackItem(item) {
  const track = item?.track;
  if (!track || !track.id || !track.name || !Array.isArray(track.artists)) {
    return null;
  }

  const artistList = track.artists.map((artist) => artist.name).filter(Boolean);
  const artists = artistList.join(', ');
  return {
    spotifyTrackId: track.id,
    title: track.name,
    artists,
    artistList,
    primaryArtist: artistList[0] || '',
    durationMs: Number(track.duration_ms) || 0,
    addedAt: item?.added_at || null,
    query: `${track.name} ${artistList[0] || artists}`.trim(),
  };
}

function isStrictlyNewerIso(a, b) {
  const aMs = Date.parse(a || '');
  const bMs = Date.parse(b || '');
  if (!Number.isFinite(aMs)) {
    return false;
  }
  if (!Number.isFinite(bMs)) {
    return true;
  }
  return aMs > bMs;
}

function maxIsoDate(values) {
  let maxValue = null;
  for (const value of values) {
    if (isStrictlyNewerIso(value, maxValue)) {
      maxValue = value;
    }
  }
  return maxValue;
}

async function fetchSpotifyLikedSongs(accessToken, fetchJson, options = {}) {
  const maxTracks = Math.max(1, Math.min(2000, Number(options.maxTracks || 50)));
  const sinceAddedAt = options.sinceAddedAt || null;
  const knownTrackIds = options.knownTrackIds || new Set();
  const onlyUnsynced = options.onlyUnsynced !== false;

  const tracks = [];
  let offset = 0;
  let reachedSyncCursor = false;
  let scannedItems = 0;

  while (tracks.length < maxTracks && !reachedSyncCursor) {
    const limit = Math.min(50, maxTracks - tracks.length);
    const url = new URL('https://api.spotify.com/v1/me/tracks');
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('offset', String(offset));

    const data = await fetchJson(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const items = Array.isArray(data.items) ? data.items : [];
    if (items.length === 0) {
      break;
    }

    for (const item of items) {
      scannedItems += 1;
      const addedAt = item?.added_at || null;
      if (sinceAddedAt && addedAt && !isStrictlyNewerIso(addedAt, sinceAddedAt)) {
        reachedSyncCursor = true;
        break;
      }

      const parsed = parseSpotifyTrackItem(item);
      if (!parsed) {
        continue;
      }
      if (onlyUnsynced && knownTrackIds.has(parsed.spotifyTrackId)) {
        continue;
      }
      tracks.push(parsed);

      if (tracks.length >= maxTracks) {
        break;
      }
    }

    if (!data.next || tracks.length >= maxTracks || reachedSyncCursor) {
      break;
    }
    offset += items.length;
  }

  return {
    tracks,
    scannedItems,
    reachedSyncCursor,
    latestAddedAt: maxIsoDate(tracks.map((track) => track.addedAt).filter(Boolean)),
  };
}

module.exports = {
  ensureSpotifyEnv,
  exchangeSpotifyCode,
  ensureSpotifyAccessToken,
  fetchSpotifyLikedSongs,
  isStrictlyNewerIso,
};
