# Spotify Liked Songs -> YouTube Playlist Sync

This service connects your Spotify account and YouTube account, fetches Spotify liked songs (`GET /v1/me/tracks`), finds best-matching YouTube videos, and appends them into a YouTube playlist.

## Strategy (Best Default)

- Incremental sync is default (`incremental=true`): only new liked songs since last successful sync are processed.
- One persistent YouTube playlist is reused across runs.
- Track and video mappings are stored locally to avoid duplicates and reduce quota usage.
- Matching uses multi-candidate scoring (title + artist + channel + duration + keyword boosts/penalties).

## Local state files

- `.tokens.json`: Spotify/Google OAuth tokens
- `.sync-state.json`: sync cursor (`lastSyncedAddedAt`), persistent playlist id, synced track map

## Prerequisites

- Node.js 18+
- Spotify app credentials
- Google OAuth credentials with YouTube Data API v3 enabled

## Install

```bash
npm install
cp .env.example .env
```

## Credential setup (required)

1. Create a Spotify app in the Spotify Developer Dashboard.
2. Add this redirect URI in Spotify app settings:
   - `http://127.0.0.1:3000/auth/spotify/callback`
3. Create a Google OAuth client (Web application) in Google Cloud.
4. Enable YouTube Data API v3 for that Google project.
5. Add this redirect URI in Google OAuth client settings:
   - `http://127.0.0.1:3000/auth/youtube/callback`
6. Copy credentials into `.env`:
   - `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

Notes:
- If you download a Google `client_secret_*.json` file, keep it only as a local backup. This app does not read that JSON directly.
- The app reads credentials from `.env` only.
- Keep redirect URIs exactly the same in provider dashboards and `.env`.

## Security notes

- Never commit `.env`, `.tokens.json`, `.sync-state.json`, private keys, or client secret JSON files.
- Use `.env.example` as the template for new developers.
- If a secret is exposed, rotate it in Spotify/Google dashboards immediately.

## Run

```bash
npm start
```

## Connect accounts

- `http://127.0.0.1:3000/auth/spotify`
- `http://127.0.0.1:3000/auth/youtube`

Check:

```bash
curl http://127.0.0.1:3000/status
```

## Export Spotify liked songs to file

After Spotify is connected, you can export liked songs with metadata (title, artists, album, IDs, links, timestamps, etc.) to a local file.

Default JSON export:

```bash
npm run export:spotify-liked
```

CSV export:

```bash
npm run export:spotify-liked:csv
```

Custom output path and limit:

```bash
node src/export-liked-songs.js --format json --out exports/liked-songs.json --max 500
```

## Export a Spotify playlist to file

Export a specific Spotify playlist (by name or id) to a separate JSON/CSV file.

Example for your Hindi playlist:

```bash
npm run export:spotify-playlist -- --playlist-name "Hindi" --out exports/hindi-playlist.json
```

List your playlists first (name + id):

```bash
npm run export:spotify-playlist -- --list-playlists
```

By playlist id:

```bash
npm run export:spotify-playlist -- --playlist-id <SPOTIFY_PLAYLIST_ID> --out exports/hindi-playlist.json
```

Note: if playlist export says `insufficient scope`, reconnect Spotify once at `/auth/spotify` so token includes playlist read scopes.

## Recommended commands

### 1) Dry run first (safe)

```bash
curl -X POST http://127.0.0.1:3000/sync \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true,"maxTracks":50,"searchMaxResults":10,"minMatchScore":35}'
```

### 2) Real incremental sync (new likes only)

```bash
curl -X POST http://127.0.0.1:3000/sync \
  -H "Content-Type: application/json" \
  -d '{"maxTracks":50,"searchMaxResults":10,"minMatchScore":35,"privacyStatus":"private"}'
```

## One-time full backfill (all current likes)

Run this once to fill one YouTube playlist with your full Spotify liked library in batches of 50:

```bash
curl -sS -X POST http://127.0.0.1:3000/sync/state/reset \
  -H "Content-Type: application/json" \
  -d '{"keepPlaylist":false}'

while true; do
  RES=$(curl -sS -X POST http://127.0.0.1:3000/sync \
    -H "Content-Type: application/json" \
    -d '{"incremental":false,"onlyUnsynced":true,"maxTracks":50,"searchMaxResults":10,"minMatchScore":35,"privacyStatus":"private"}')
  echo "$RES" | jq '{message, playlistId, fetched: .totalSpotifyTracksFetched, added, notFound, duplicatesSkipped, failed}'
  FETCHED=$(echo "$RES" | jq -r '.totalSpotifyTracksFetched // 0')
  if [ "$FETCHED" -eq 0 ]; then
    echo "Backfill complete."
    break
  fi
done
```

After backfill, use the incremental command only.

## Useful options (`POST /sync`)

- `maxTracks` (default `50`, max `200`)
- `incremental` (default `true`)
- `searchMaxResults` (default `10`)
- `minMatchScore` (default `35`)
- `dryRun` (default `false`)
- `playlistId` (force target playlist)
- `forceNewPlaylist` (default `false`)
- `resetSyncState` (default `false`)

## Sync state endpoints

- `GET /sync/state` - inspect cursor and playlist state
- `POST /sync/state/reset` - reset sync cursor/map
  - body: `{"keepPlaylist":true}` (default true)

## Quota notes

- `search.list`: 100 units per track
- `videos.list`: ~1 unit per track
- `playlistItems.insert`: 50 units per added video
- `playlists.insert`: 50 units (only when creating a new playlist)
