const express = require('express');
const crypto = require('crypto');

const config = require('./config');
const { fetchJson } = require('./lib/http');
const {
  ensureSpotifyEnv,
  exchangeSpotifyCode,
  ensureSpotifyAccessToken,
  fetchSpotifyLikedSongs,
  isStrictlyNewerIso,
} = require('./lib/spotify');
const {
  ensureGoogleEnv,
  exchangeGoogleCode,
  ensureYouTubeAccessToken,
  createYouTubePlaylist,
  addVideoToPlaylist,
  findBestYouTubeMatch,
} = require('./lib/youtube');
const { createTokenStore } = require('./store/tokenStore');
const { createSyncStateStore } = require('./store/syncStateStore');

const app = express();
app.use(express.json());

const tokenStore = createTokenStore(config.TOKEN_FILE);
const syncStateStore = createSyncStateStore(config.SYNC_STATE_FILE);
const oauthStates = new Map();

function isYouTubeQuotaExceeded(error) {
  if (!error) {
    return false;
  }
  if (error.reason === 'quotaExceeded' || error.reason === 'dailyLimitExceeded') {
    return true;
  }
  const body = String(error.body || '');
  return body.includes('quotaExceeded') || body.includes('dailyLimitExceeded');
}

function createState(provider) {
  const state = crypto.randomBytes(24).toString('hex');
  oauthStates.set(state, { provider, createdAt: Date.now() });
  return state;
}

function consumeStateOrThrow(state, provider) {
  const item = oauthStates.get(state);
  oauthStates.delete(state);

  if (!item || item.provider !== provider) {
    throw new Error('Invalid OAuth state');
  }

  const ageMs = Date.now() - item.createdAt;
  if (ageMs > 15 * 60 * 1000) {
    throw new Error('Expired OAuth state');
  }
}

function cleanOldStates() {
  const now = Date.now();
  for (const [state, item] of oauthStates.entries()) {
    if (now - item.createdAt > 15 * 60 * 1000) {
      oauthStates.delete(state);
    }
  }
}
setInterval(cleanOldStates, 60 * 1000).unref();

async function resolveTargetPlaylist(accessToken, options = {}) {
  const state = syncStateStore.getState();
  const requestedPlaylistId = options.playlistId || null;
  const forceNewPlaylist = Boolean(options.forceNewPlaylist);

  if (requestedPlaylistId) {
    if (state.youtube.playlistId !== requestedPlaylistId) {
      state.youtube.playlistId = requestedPlaylistId;
      if (!state.youtube.videoIds || typeof state.youtube.videoIds !== 'object') {
        state.youtube.videoIds = {};
      }
      syncStateStore.persist();
    }
    return { playlistId: requestedPlaylistId, created: false };
  }

  if (!forceNewPlaylist && state.youtube.playlistId) {
    return { playlistId: state.youtube.playlistId, created: false };
  }

  const created = await createYouTubePlaylist(
    accessToken,
    {
      title: options.playlistTitle,
      description: options.playlistDescription,
      privacyStatus: options.privacyStatus,
    },
    fetchJson
  );

  state.youtube.playlistId = created.id;
  state.youtube.videoIds = {};
  syncStateStore.persist();
  return { playlistId: created.id, created: true };
}

app.get('/', (req, res) => {
  res.json({
    message: 'Spotify liked songs -> YouTube playlist sync service',
    endpoints: {
      status: 'GET /status',
      connectSpotify: 'GET /auth/spotify',
      connectYouTube: 'GET /auth/youtube',
      sync: 'POST /sync',
      clearTokens: 'POST /tokens/clear',
      syncState: 'GET /sync/state',
      resetSyncState: 'POST /sync/state/reset',
    },
  });
});

app.get('/status', (req, res) => {
  const state = syncStateStore.getState();
  res.json({
    spotifyConnected: Boolean(tokenStore.getProvider('spotify')?.access_token),
    spotifyHasRefreshToken: Boolean(tokenStore.getProvider('spotify')?.refresh_token),
    youtubeConnected: Boolean(tokenStore.getProvider('youtube')?.access_token),
    youtubeHasRefreshToken: Boolean(tokenStore.getProvider('youtube')?.refresh_token),
    spotifyRedirectUri: config.SPOTIFY_REDIRECT_URI,
    youtubeRedirectUri: config.GOOGLE_REDIRECT_URI,
    sync: {
      playlistId: state.youtube.playlistId || null,
      lastSyncedAddedAt: state.spotify.lastSyncedAddedAt || null,
      syncedTrackCount: Object.keys(state.trackMap || {}).length,
      knownPlaylistVideoCount: Object.keys(state.youtube.videoIds || {}).length,
    },
  });
});

app.get('/auth/spotify', (req, res, next) => {
  try {
    ensureSpotifyEnv(config);
    const state = createState('spotify');

    const url = new URL('https://accounts.spotify.com/authorize');
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', config.SPOTIFY_CLIENT_ID);
    url.searchParams.set('scope', config.SPOTIFY_SCOPE);
    url.searchParams.set('redirect_uri', config.SPOTIFY_REDIRECT_URI);
    url.searchParams.set('state', state);

    res.redirect(url.toString());
  } catch (error) {
    next(error);
  }
});

app.get(['/auth/spotify/callback', '/callback/spotify'], async (req, res, next) => {
  try {
    const { code, state, error } = req.query;
    if (error) {
      return res.status(400).json({ error: `Spotify auth failed: ${error}` });
    }
    if (!code || !state) {
      return res.status(400).json({ error: 'Missing code or state from Spotify callback' });
    }

    consumeStateOrThrow(String(state), 'spotify');
    const token = await exchangeSpotifyCode(String(code), config, fetchJson);
    tokenStore.upsertProvider('spotify', token);
    return res.json({ message: 'Spotify connected successfully. You can now connect YouTube at /auth/youtube' });
  } catch (error) {
    next(error);
  }
});

app.get('/auth/youtube', (req, res, next) => {
  try {
    ensureGoogleEnv(config);
    const state = createState('youtube');

    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', config.GOOGLE_CLIENT_ID);
    url.searchParams.set('redirect_uri', config.GOOGLE_REDIRECT_URI);
    url.searchParams.set('scope', config.YOUTUBE_SCOPE);
    url.searchParams.set('access_type', 'offline');
    url.searchParams.set('include_granted_scopes', 'true');
    url.searchParams.set('prompt', 'consent');
    url.searchParams.set('state', state);

    res.redirect(url.toString());
  } catch (error) {
    next(error);
  }
});

app.get(['/auth/youtube/callback', '/callback/youtube'], async (req, res, next) => {
  try {
    const { code, state, error } = req.query;
    if (error) {
      return res.status(400).json({ error: `Google auth failed: ${error}` });
    }
    if (!code || !state) {
      return res.status(400).json({ error: 'Missing code or state from Google callback' });
    }

    consumeStateOrThrow(String(state), 'youtube');
    const token = await exchangeGoogleCode(String(code), config, fetchJson);
    tokenStore.upsertProvider('youtube', token);
    return res.json({ message: 'YouTube connected successfully. Run POST /sync.' });
  } catch (error) {
    next(error);
  }
});

app.post('/tokens/clear', (req, res) => {
  tokenStore.clear();
  res.json({ message: 'Stored tokens cleared' });
});

app.get('/sync/state', (req, res) => {
  const state = syncStateStore.getState();
  res.json({
    spotify: state.spotify,
    youtube: {
      playlistId: state.youtube.playlistId || null,
      knownPlaylistVideoCount: Object.keys(state.youtube.videoIds || {}).length,
    },
    trackMapCount: Object.keys(state.trackMap || {}).length,
  });
});

app.post('/sync/state/reset', (req, res) => {
  const body = req.body || {};
  const keepPlaylist = body.keepPlaylist !== false;
  const state = syncStateStore.reset({ keepPlaylist });
  res.json({
    message: 'Sync state reset',
    keepPlaylist,
    playlistId: state.youtube.playlistId || null,
  });
});

app.post('/sync', async (req, res, next) => {
  try {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);

    const body = req.body || {};
    const playlistTitle = String(body.playlistTitle || `Spotify Liked Songs ${dateStr}`);
    const playlistDescription = String(
      body.playlistDescription || `Auto-created from Spotify liked songs on ${now.toISOString()}`
    );
    const privacyStatus = ['private', 'public', 'unlisted'].includes(body.privacyStatus)
      ? body.privacyStatus
      : config.DEFAULT_YOUTUBE_PRIVACY_STATUS;
    const maxTracks = Math.max(1, Math.min(200, Number(body.maxTracks || 50)));
    const dryRun = Boolean(body.dryRun);
    const searchMaxResults = Math.max(1, Math.min(10, Number(body.searchMaxResults || 10)));
    const minMatchScore = Math.max(1, Math.min(120, Number(body.minMatchScore || 35)));
    const includeDebug = Boolean(body.includeDebug) || dryRun;
    const incremental = body.incremental !== false;
    const forceNewPlaylist = Boolean(body.forceNewPlaylist);
    const onlyUnsynced = body.onlyUnsynced !== false;
    const resetSyncState = Boolean(body.resetSyncState);
    const playlistId = typeof body.playlistId === 'string' && body.playlistId.trim() ? body.playlistId.trim() : null;
    const requestedSinceAddedAt =
      typeof body.sinceAddedAt === 'string' && body.sinceAddedAt.trim() ? body.sinceAddedAt.trim() : null;

    if (resetSyncState) {
      const keepPlaylistOnReset = body.keepPlaylistOnReset !== false;
      syncStateStore.reset({ keepPlaylist: keepPlaylistOnReset });
    }

    const spotifyAccessToken = await ensureSpotifyAccessToken(config, tokenStore, fetchJson);
    const youtubeAccessToken = await ensureYouTubeAccessToken(config, tokenStore, fetchJson);

    const state = syncStateStore.getState();
    const sinceAddedAt = incremental ? requestedSinceAddedAt || state.spotify.lastSyncedAddedAt : null;
    const knownTrackIds = new Set(Object.keys(state.trackMap || {}));

    const fetchResult = await fetchSpotifyLikedSongs(spotifyAccessToken, fetchJson, {
      maxTracks,
      sinceAddedAt,
      knownTrackIds,
      onlyUnsynced,
    });

    const likedTracks = fetchResult.tracks;
    likedTracks.sort((a, b) => Date.parse(a.addedAt || 0) - Date.parse(b.addedAt || 0));

    if (likedTracks.length === 0) {
      return res.status(200).json({
        message: incremental
          ? 'No new liked tracks since last sync.'
          : 'No liked tracks found for the requested scan window.',
        mode: incremental ? 'incremental' : 'full',
        maxTracks,
        sinceAddedAt,
        scannedSpotifyItems: fetchResult.scannedItems,
        reachedSyncCursor: fetchResult.reachedSyncCursor,
        playlistId: playlistId || state.youtube.playlistId || null,
      });
    }

    const result = {
      mode: incremental ? 'incremental' : 'full',
      sinceAddedAtUsed: sinceAddedAt,
      scannedSpotifyItems: fetchResult.scannedItems,
      reachedSyncCursor: fetchResult.reachedSyncCursor,
      totalSpotifyTracksFetched: likedTracks.length,
      matched: 0,
      added: 0,
      notFound: 0,
      duplicatesSkipped: 0,
      failed: 0,
      details: [],
    };

    const quota = {
      searchCalls: 0,
      videoDetailsCalls: 0,
      playlistCreateCalls: 0,
      playlistInsertCalls: 0,
    };

    const isStoredPlaylistTarget =
      !forceNewPlaylist &&
      ((!playlistId && Boolean(state.youtube.playlistId)) || (playlistId && playlistId === state.youtube.playlistId));
    const seenVideoIds = new Set(isStoredPlaylistTarget ? Object.keys(state.youtube.videoIds || {}) : []);

    const preparedMatches = [];
    for (const track of likedTracks) {
      let matchResult;
      try {
        matchResult = await findBestYouTubeMatch(
          youtubeAccessToken,
          track,
          {
            searchMaxResults,
            minMatchScore,
          },
          fetchJson
        );
      } catch (error) {
        if (isYouTubeQuotaExceeded(error)) {
          return res.status(429).json({
            error:
              'YouTube API daily quota exceeded. Retry after quota reset (midnight Pacific Time) or reduce requests.',
            quotaExceeded: true,
            mode: incremental ? 'incremental' : 'full',
            processedTracksBeforeFailure: result.matched + result.notFound + result.duplicatesSkipped,
            maxTracks,
            searchMaxResults,
            minMatchScore,
            note: 'Use smaller batches and incremental sync to reduce quota burn.',
          });
        }
        throw error;
      }

      quota.searchCalls += matchResult.quota.searchCalls;
      quota.videoDetailsCalls += matchResult.quota.videoDetailsCalls;

      if (!matchResult.selected) {
        result.notFound += 1;
        const best = matchResult.rankedCandidates[0] || null;
        const detail = {
          spotifyTrackId: track.spotifyTrackId,
          spotifyTitle: `${track.title} - ${track.artists}`,
          addedAt: track.addedAt,
          status: 'not_found',
          searchQuery: matchResult.searchQuery,
          reason: best ? `best score ${best.score} < minMatchScore ${minMatchScore}` : 'no candidates returned',
        };

        if (includeDebug) {
          detail.candidates = matchResult.rankedCandidates.map((candidate) => ({
            youtubeVideoId: candidate.videoId,
            youtubeTitle: candidate.title,
            youtubeChannel: candidate.channelTitle,
            score: candidate.score,
          }));
        }

        result.details.push(detail);
        continue;
      }

      const selected = matchResult.selected;
      if (seenVideoIds.has(selected.videoId)) {
        result.duplicatesSkipped += 1;
        result.details.push({
          spotifyTrackId: track.spotifyTrackId,
          spotifyTitle: `${track.title} - ${track.artists}`,
          addedAt: track.addedAt,
          status: 'duplicate_video',
          searchQuery: matchResult.searchQuery,
          youtubeVideoId: selected.videoId,
          youtubeTitle: selected.title,
          youtubeChannel: selected.channelTitle,
          score: selected.score,
        });
        continue;
      }

      seenVideoIds.add(selected.videoId);
      result.matched += 1;
      preparedMatches.push({
        track,
        selected,
        searchQuery: matchResult.searchQuery,
        candidates: includeDebug
          ? matchResult.rankedCandidates.map((candidate) => ({
              youtubeVideoId: candidate.videoId,
              youtubeTitle: candidate.title,
              youtubeChannel: candidate.channelTitle,
              score: candidate.score,
            }))
          : null,
      });
    }

    const payloadBase = {
      maxTracks,
      searchMaxResults,
      minMatchScore,
      quotaEstimateUnits:
        quota.searchCalls * 100 +
        quota.videoDetailsCalls +
        quota.playlistCreateCalls * 50 +
        quota.playlistInsertCalls * 50,
      quotaBreakdown: {
        searchList: quota.searchCalls * 100,
        videosList: quota.videoDetailsCalls,
        playlistsInsert: quota.playlistCreateCalls * 50,
        playlistItemsInsert: quota.playlistInsertCalls * 50,
      },
      ...result,
    };

    if (dryRun) {
      return res.json({
        message: 'Dry run complete. Matching evaluated; no playlist was created.',
        ...payloadBase,
        details: [
          ...result.details,
          ...preparedMatches.map((item) => ({
            spotifyTrackId: item.track.spotifyTrackId,
            spotifyTitle: `${item.track.title} - ${item.track.artists}`,
            addedAt: item.track.addedAt,
            status: 'matched',
            searchQuery: item.searchQuery,
            youtubeVideoId: item.selected.videoId,
            youtubeTitle: item.selected.title,
            youtubeChannel: item.selected.channelTitle,
            score: item.selected.score,
            candidates: item.candidates || undefined,
          })),
        ],
      });
    }

    const playlistResolution = await resolveTargetPlaylist(youtubeAccessToken, {
      playlistId,
      forceNewPlaylist,
      playlistTitle,
      playlistDescription,
      privacyStatus,
    });
    if (playlistResolution.created) {
      quota.playlistCreateCalls += 1;
    }

    const targetPlaylistId = playlistResolution.playlistId;

    if (preparedMatches.length === 0) {
      if (incremental && fetchResult.latestAddedAt && isStrictlyNewerIso(fetchResult.latestAddedAt, state.spotify.lastSyncedAddedAt)) {
        state.spotify.lastSyncedAddedAt = fetchResult.latestAddedAt;
      }
      syncStateStore.persist();
      return res.status(200).json({
        message: 'No confident YouTube matches found. Nothing added.',
        playlistId: targetPlaylistId,
        playlistUrl: `https://www.youtube.com/playlist?list=${targetPlaylistId}`,
        ...payloadBase,
      });
    }

    for (const item of preparedMatches) {
      try {
        quota.playlistInsertCalls += 1;
        await addVideoToPlaylist(youtubeAccessToken, targetPlaylistId, item.selected.videoId, fetchJson);
        result.added += 1;

        if (!state.youtube.videoIds || typeof state.youtube.videoIds !== 'object') {
          state.youtube.videoIds = {};
        }
        state.youtube.videoIds[item.selected.videoId] = true;
        state.trackMap[item.track.spotifyTrackId] = {
          youtubeVideoId: item.selected.videoId,
          score: item.selected.score,
          spotifyTitle: item.track.title,
          spotifyArtists: item.track.artists,
          addedAt: item.track.addedAt,
          syncedAt: new Date().toISOString(),
        };

        result.details.push({
          spotifyTrackId: item.track.spotifyTrackId,
          spotifyTitle: `${item.track.title} - ${item.track.artists}`,
          addedAt: item.track.addedAt,
          status: 'added',
          searchQuery: item.searchQuery,
          youtubeVideoId: item.selected.videoId,
          youtubeTitle: item.selected.title,
          youtubeChannel: item.selected.channelTitle,
          score: item.selected.score,
          candidates: item.candidates || undefined,
        });
      } catch (error) {
        result.failed += 1;
        result.details.push({
          spotifyTrackId: item.track.spotifyTrackId,
          spotifyTitle: `${item.track.title} - ${item.track.artists}`,
          addedAt: item.track.addedAt,
          status: 'failed',
          reason: error.message,
          searchQuery: item.searchQuery,
          youtubeVideoId: item.selected.videoId,
          youtubeTitle: item.selected.title,
          youtubeChannel: item.selected.channelTitle,
          score: item.selected.score,
          candidates: item.candidates || undefined,
        });
      }
    }

    if (incremental && fetchResult.latestAddedAt && isStrictlyNewerIso(fetchResult.latestAddedAt, state.spotify.lastSyncedAddedAt)) {
      state.spotify.lastSyncedAddedAt = fetchResult.latestAddedAt;
    }
    syncStateStore.persist();

    const payloadFinal = {
      maxTracks,
      searchMaxResults,
      minMatchScore,
      quotaEstimateUnits:
        quota.searchCalls * 100 +
        quota.videoDetailsCalls +
        quota.playlistCreateCalls * 50 +
        quota.playlistInsertCalls * 50,
      quotaBreakdown: {
        searchList: quota.searchCalls * 100,
        videosList: quota.videoDetailsCalls,
        playlistsInsert: quota.playlistCreateCalls * 50,
        playlistItemsInsert: quota.playlistInsertCalls * 50,
      },
      ...result,
    };

    return res.json({
      message: 'Sync completed',
      playlistId: targetPlaylistId,
      playlistUrl: `https://www.youtube.com/playlist?list=${targetPlaylistId}`,
      quotaNote:
        'search.list costs 100 units/call; playlistItems.insert costs 50 units/call; playlists.insert costs 50 units/call.',
      ...payloadFinal,
    });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  if (!isYouTubeQuotaExceeded(error)) {
    console.error(error);
  }
  const status = error.status || 500;
  if (isYouTubeQuotaExceeded(error)) {
    return res.status(429).json({
      error: 'YouTube API daily quota exceeded. Retry after midnight Pacific Time.',
      quotaExceeded: true,
    });
  }
  res.status(status).json({ error: error.message || 'Internal server error' });
});

app.listen(config.PORT, () => {
  console.log(`Server listening on ${config.APP_BASE_URL}`);
  console.log('Endpoints: /status, /auth/spotify, /auth/youtube, /sync, /sync/state');
});
