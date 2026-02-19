const fs = require('fs');

function defaultSyncState() {
  return {
    spotify: {
      lastSyncedAddedAt: null,
    },
    youtube: {
      playlistId: null,
      videoIds: {},
    },
    trackMap: {},
  };
}

function normalizeSyncState(state) {
  return {
    spotify: {
      lastSyncedAddedAt: state?.spotify?.lastSyncedAddedAt || null,
    },
    youtube: {
      playlistId: state?.youtube?.playlistId || null,
      videoIds: state?.youtube?.videoIds && typeof state.youtube.videoIds === 'object' ? state.youtube.videoIds : {},
    },
    trackMap: state?.trackMap && typeof state.trackMap === 'object' ? state.trackMap : {},
  };
}

function createSyncStateStore(filePath) {
  function load() {
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      return normalizeSyncState(JSON.parse(raw));
    } catch (error) {
      return defaultSyncState();
    }
  }

  function save(state) {
    fs.writeFileSync(filePath, JSON.stringify(state, null, 2));
  }

  let state = load();

  function getState() {
    return state;
  }

  function persist() {
    save(state);
  }

  function replace(nextState) {
    state = normalizeSyncState(nextState);
    save(state);
    return state;
  }

  function reset(options = {}) {
    const keepPlaylist = options.keepPlaylist !== false;
    const existingPlaylistId = keepPlaylist ? state.youtube.playlistId : null;
    const existingVideoIds = keepPlaylist ? state.youtube.videoIds : {};

    state = defaultSyncState();
    if (existingPlaylistId) {
      state.youtube.playlistId = existingPlaylistId;
      state.youtube.videoIds = existingVideoIds || {};
    }
    save(state);
    return state;
  }

  return {
    defaultSyncState,
    getState,
    persist,
    replace,
    reset,
  };
}

module.exports = {
  createSyncStateStore,
};
