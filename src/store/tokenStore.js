const fs = require('fs');

function createTokenStore(filePath) {
  function loadTokens() {
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(raw);
    } catch (error) {
      return {};
    }
  }

  function saveTokens(tokens) {
    fs.writeFileSync(filePath, JSON.stringify(tokens, null, 2));
  }

  let tokens = loadTokens();

  function getAll() {
    return tokens;
  }

  function getProvider(provider) {
    return tokens[provider] || null;
  }

  function upsertProvider(provider, payload) {
    const expiresIn = Number(payload.expires_in || 3600);
    const existing = tokens[provider] || {};
    tokens[provider] = {
      ...existing,
      ...payload,
      refresh_token: payload.refresh_token || existing.refresh_token,
      expires_at: Date.now() + Math.max(expiresIn - 30, 1) * 1000,
    };
    saveTokens(tokens);
    return tokens[provider];
  }

  function clear() {
    tokens = {};
    saveTokens(tokens);
  }

  return {
    getAll,
    getProvider,
    upsertProvider,
    clear,
  };
}

module.exports = {
  createTokenStore,
};
