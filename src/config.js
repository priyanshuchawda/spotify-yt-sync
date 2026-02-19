const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const PORT = Number(process.env.PORT || 3000);
const APP_BASE_URL = process.env.APP_BASE_URL || `http://localhost:${PORT}`;

module.exports = {
  PORT,
  APP_BASE_URL,
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI || `${APP_BASE_URL}/auth/spotify/callback`,
  SPOTIFY_SCOPE: 'user-library-read',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI || `${APP_BASE_URL}/auth/youtube/callback`,
  YOUTUBE_SCOPE: process.env.YOUTUBE_SCOPE || 'https://www.googleapis.com/auth/youtube.force-ssl',
  DEFAULT_YOUTUBE_PRIVACY_STATUS: process.env.DEFAULT_YOUTUBE_PRIVACY_STATUS || 'private',
  TOKEN_FILE: path.join(process.cwd(), '.tokens.json'),
  SYNC_STATE_FILE: path.join(process.cwd(), '.sync-state.json'),
};
