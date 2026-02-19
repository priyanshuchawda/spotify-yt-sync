function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseRetryAfterMs(retryAfterHeader) {
  if (!retryAfterHeader) {
    return null;
  }

  const seconds = Number(retryAfterHeader);
  if (Number.isFinite(seconds)) {
    return Math.max(0, seconds * 1000);
  }

  const dateMs = Date.parse(retryAfterHeader);
  if (Number.isFinite(dateMs)) {
    return Math.max(0, dateMs - Date.now());
  }

  return null;
}

async function parseErrorResponse(response) {
  let bodyText;
  try {
    bodyText = await response.text();
  } catch (error) {
    bodyText = '<failed to read error body>';
  }

  const err = new Error(`HTTP ${response.status}: ${bodyText}`);
  err.status = response.status;
  err.body = bodyText;
  try {
    const parsed = JSON.parse(bodyText);
    const firstApiError = parsed?.error?.errors?.[0];
    err.api = parsed?.error || null;
    err.reason = firstApiError?.reason || null;
    err.domain = firstApiError?.domain || null;
  } catch (parseError) {
    err.api = null;
    err.reason = null;
    err.domain = null;
  }
  throw err;
}

async function fetchJson(url, options = {}) {
  const retries = Number.isInteger(options.retries) ? options.retries : 4;
  const baseDelayMs = Number.isInteger(options.baseDelayMs) ? options.baseDelayMs : 400;
  const maxDelayMs = Number.isInteger(options.maxDelayMs) ? options.maxDelayMs : 8000;
  const fetchOptions = { ...options };
  delete fetchOptions.retries;
  delete fetchOptions.baseDelayMs;
  delete fetchOptions.maxDelayMs;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    let response;
    try {
      response = await fetch(url, fetchOptions);
    } catch (error) {
      if (attempt >= retries) {
        throw error;
      }
      const backoffMs = Math.min(maxDelayMs, baseDelayMs * 2 ** attempt);
      await sleep(backoffMs);
      continue;
    }

    if (response.ok) {
      if (response.status === 204) {
        return null;
      }
      return response.json();
    }

    const isRetryable = response.status === 429 || response.status >= 500;
    if (isRetryable && attempt < retries) {
      const retryAfterMs = parseRetryAfterMs(response.headers.get('retry-after'));
      const backoffMs = Math.min(maxDelayMs, baseDelayMs * 2 ** attempt);
      await sleep(retryAfterMs ?? backoffMs);
      continue;
    }

    await parseErrorResponse(response);
  }

  throw new Error('Unexpected HTTP retry exit');
}

module.exports = {
  sleep,
  fetchJson,
};
