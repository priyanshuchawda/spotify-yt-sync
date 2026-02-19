function ensureGoogleEnv(config) {
  if (!config.GOOGLE_CLIENT_ID || !config.GOOGLE_CLIENT_SECRET) {
    throw new Error('Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in .env');
  }
}

async function exchangeGoogleCode(code, config, fetchJson) {
  const body = new URLSearchParams({
    code,
    client_id: config.GOOGLE_CLIENT_ID,
    client_secret: config.GOOGLE_CLIENT_SECRET,
    redirect_uri: config.GOOGLE_REDIRECT_URI,
    grant_type: 'authorization_code',
  });

  return fetchJson('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
}

async function refreshGoogleToken(config, tokenStore, fetchJson) {
  const youtubeToken = tokenStore.getProvider('youtube');
  if (!youtubeToken || !youtubeToken.refresh_token) {
    throw new Error('YouTube refresh token missing. Reconnect YouTube.');
  }

  const body = new URLSearchParams({
    client_id: config.GOOGLE_CLIENT_ID,
    client_secret: config.GOOGLE_CLIENT_SECRET,
    refresh_token: youtubeToken.refresh_token,
    grant_type: 'refresh_token',
  });

  const refreshed = await fetchJson('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  tokenStore.upsertProvider('youtube', refreshed);
  return tokenStore.getProvider('youtube').access_token;
}

async function ensureYouTubeAccessToken(config, tokenStore, fetchJson) {
  ensureGoogleEnv(config);

  const youtubeToken = tokenStore.getProvider('youtube');
  if (!youtubeToken || !youtubeToken.access_token) {
    throw new Error('YouTube not connected. Visit /auth/youtube first.');
  }

  if (youtubeToken.expires_at && youtubeToken.expires_at > Date.now() + 60 * 1000) {
    return youtubeToken.access_token;
  }

  return refreshGoogleToken(config, tokenStore, fetchJson);
}

async function createYouTubePlaylist(accessToken, params, fetchJson) {
  const url = new URL('https://www.googleapis.com/youtube/v3/playlists');
  url.searchParams.set('part', 'snippet,status');

  const data = await fetchJson(url.toString(), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      snippet: {
        title: params.title,
        description: params.description,
      },
      status: {
        privacyStatus: params.privacyStatus,
      },
    }),
  });

  if (!data.id) {
    throw new Error('YouTube playlist creation returned no playlist ID');
  }
  return data;
}

async function addVideoToPlaylist(accessToken, playlistId, videoId, fetchJson) {
  const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
  url.searchParams.set('part', 'snippet');

  return fetchJson(url.toString(), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      snippet: {
        playlistId,
        resourceId: {
          kind: 'youtube#video',
          videoId,
        },
      },
    }),
  });
}

const POSITIVE_VIDEO_HINTS = [
  'official music video',
  'official mv',
  'official video',
  'official audio',
  'audio',
  'topic',
];
const NEGATIVE_VIDEO_HINTS = [
  'cover',
  'karaoke',
  'instrumental',
  'slowed',
  'sped up',
  'nightcore',
  '8d',
  'bass boosted',
  'reverb',
  'remix',
  'reaction',
  'lyrics',
  'lyric video',
  'dance practice',
  'performance video',
  'fanmade',
  'unofficial',
];

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripVersionTags(title) {
  return String(title || '').replace(/\([^)]*\)|\[[^\]]*\]/g, ' ').replace(/\s+/g, ' ').trim();
}

function tokenize(value) {
  return normalizeText(value)
    .split(' ')
    .map((token) => token.trim())
    .filter((token) => token.length > 1);
}

function tokenOverlapRatio(baseTokens, candidateTokens) {
  const base = new Set(baseTokens);
  const candidate = new Set(candidateTokens);
  if (base.size === 0 || candidate.size === 0) {
    return 0;
  }

  let overlap = 0;
  for (const token of base) {
    if (candidate.has(token)) {
      overlap += 1;
    }
  }
  return overlap / base.size;
}

function parseIsoDurationToSeconds(isoDuration) {
  const text = String(isoDuration || '');
  const match = text.match(/^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/);
  if (!match) {
    return 0;
  }

  const days = Number(match[1] || 0);
  const hours = Number(match[2] || 0);
  const minutes = Number(match[3] || 0);
  const seconds = Number(match[4] || 0);
  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
}

function includesHint(text, hints) {
  return hints.some((hint) => text.includes(hint));
}

function hasWord(text, word) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`\\b${escaped}\\b`);
  return pattern.test(text);
}

function scoreYouTubeCandidate(track, candidate) {
  const candidateTitleNorm = normalizeText(candidate.title);
  const candidateChannelNorm = normalizeText(candidate.channelTitle);
  const trackTitleNorm = normalizeText(track.title);
  const trackTitleCoreNorm = normalizeText(stripVersionTags(track.title));
  const primaryArtistNorm = normalizeText(track.primaryArtist);

  const titleTokens = tokenize(candidate.title);
  const trackTokens = tokenize(stripVersionTags(track.title));

  let score = 0;

  if (trackTitleNorm && candidateTitleNorm.includes(trackTitleNorm)) {
    score += 42;
  } else if (trackTitleCoreNorm && candidateTitleNorm.includes(trackTitleCoreNorm)) {
    score += 35;
  } else {
    score += Math.round(tokenOverlapRatio(trackTokens, titleTokens) * 34);
  }

  if (primaryArtistNorm && candidateTitleNorm.includes(primaryArtistNorm)) {
    score += 24;
  }
  if (primaryArtistNorm && candidateChannelNorm.includes(primaryArtistNorm)) {
    score += 14;
  }

  const extraArtists = (track.artistList || []).slice(1, 4).map((artist) => normalizeText(artist));
  for (const artistNorm of extraArtists) {
    if (!artistNorm) {
      continue;
    }
    if (candidateTitleNorm.includes(artistNorm) || candidateChannelNorm.includes(artistNorm)) {
      score += 5;
    }
  }

  if (candidateTitleNorm.includes('official music video')) {
    score += 26;
  }
  if (candidateTitleNorm.includes('official mv')) {
    score += 26;
  }
  if (candidateTitleNorm.includes('official video')) {
    score += 16;
  }
  if (candidateTitleNorm.includes('official audio')) {
    score += 18;
  }
  if (candidateChannelNorm.endsWith(' topic') || candidateChannelNorm.includes(' - topic')) {
    score += 10;
  }

  if (includesHint(candidateTitleNorm, POSITIVE_VIDEO_HINTS) || includesHint(candidateChannelNorm, POSITIVE_VIDEO_HINTS)) {
    score += 4;
  }
  if (includesHint(candidateTitleNorm, NEGATIVE_VIDEO_HINTS)) {
    score -= 18;
  }
  if (candidateTitleNorm.includes('dance practice')) {
    score -= 14;
  }
  if (candidateTitleNorm.includes('performance video')) {
    score -= 10;
  }
  if (candidateTitleNorm.includes('lyrics')) {
    score -= 12;
  }
  if (candidateTitleNorm.includes(' with ')) {
    score -= 8;
  }
  if (hasWord(candidateTitleNorm, 'live') && !hasWord(trackTitleNorm, 'live')) {
    score -= 16;
  }

  if (track.durationMs > 0 && candidate.durationMs > 0) {
    const diffSec = Math.abs(track.durationMs - candidate.durationMs) / 1000;
    if (diffSec <= 2) score += 18;
    else if (diffSec <= 5) score += 15;
    else if (diffSec <= 10) score += 12;
    else if (diffSec <= 20) score += 8;
    else if (diffSec <= 30) score += 4;
    else if (diffSec > 120) score -= 24;
    else if (diffSec > 60) score -= 12;
  }

  return score;
}

async function searchYouTubeCandidates(accessToken, query, maxResults, fetchJson) {
  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('q', query);
  url.searchParams.set('type', 'video');
  url.searchParams.set('maxResults', String(maxResults));
  url.searchParams.set('fields', 'items(id/videoId,snippet/title,snippet/channelTitle)');

  const data = await fetchJson(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return (data.items || [])
    .map((item) => ({
      videoId: item?.id?.videoId || null,
      title: item?.snippet?.title || '',
      channelTitle: item?.snippet?.channelTitle || '',
      durationMs: 0,
    }))
    .filter((item) => Boolean(item.videoId));
}

async function fetchYouTubeDurations(accessToken, videoIds, fetchJson) {
  if (!Array.isArray(videoIds) || videoIds.length === 0) {
    return {};
  }

  const url = new URL('https://www.googleapis.com/youtube/v3/videos');
  url.searchParams.set('part', 'contentDetails');
  url.searchParams.set('id', videoIds.join(','));
  url.searchParams.set('fields', 'items(id,contentDetails/duration)');

  const data = await fetchJson(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const durations = {};
  for (const item of data.items || []) {
    const id = item?.id;
    const durationIso = item?.contentDetails?.duration;
    if (!id || !durationIso) {
      continue;
    }
    durations[id] = parseIsoDurationToSeconds(durationIso) * 1000;
  }
  return durations;
}

async function findBestYouTubeMatch(accessToken, track, options, fetchJson) {
  const searchMaxResults = options?.searchMaxResults || 10;
  const minMatchScore = options?.minMatchScore || 35;

  const candidates = await searchYouTubeCandidates(accessToken, track.query, searchMaxResults, fetchJson);
  if (candidates.length === 0) {
    return {
      selected: null,
      rankedCandidates: [],
      searchQuery: track.query,
      quota: { searchCalls: 1, videoDetailsCalls: 0 },
    };
  }

  const durationsById = await fetchYouTubeDurations(
    accessToken,
    candidates.map((candidate) => candidate.videoId),
    fetchJson
  );

  for (const candidate of candidates) {
    candidate.durationMs = durationsById[candidate.videoId] || 0;
    candidate.score = scoreYouTubeCandidate(track, candidate);
  }

  candidates.sort((a, b) => b.score - a.score);
  const best = candidates[0];
  const selected = best && best.score >= minMatchScore ? best : null;

  return {
    selected,
    rankedCandidates: candidates.slice(0, 5),
    searchQuery: track.query,
    quota: { searchCalls: 1, videoDetailsCalls: 1 },
  };
}

module.exports = {
  ensureGoogleEnv,
  exchangeGoogleCode,
  ensureYouTubeAccessToken,
  createYouTubePlaylist,
  addVideoToPlaylist,
  findBestYouTubeMatch,
};
