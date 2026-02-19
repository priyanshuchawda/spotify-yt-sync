### Start Vite Development Server

Source: https://developer.spotify.com/documentation/web-api/howtos/web-app-profile

Navigates to the project directory, installs dependencies, and starts the Vite development server. This command is essential for local development and testing.

```bash
cd spotify-profile-demo
npm install
npm run dev
```

--------------------------------

### Get Playlist Example (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-playlist

This snippet demonstrates how to retrieve playlist information using the cURL command-line tool. It requires the playlist ID and an authorization token.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### Get User's Audiobooks Request (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-users-saved-audiobooks

Example of how to make a GET request to the Spotify Web API to retrieve a list of audiobooks for the current user using cURL. This request requires an Authorization header with a Bearer token.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/me/audiobooks \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### Get Track Information using cURL

Source: https://developer.spotify.com/documentation/web-api/concepts/access-token

This example demonstrates how to retrieve information about a specific track using the 'Get a track' endpoint of the Spotify Web API. It requires a GET request with an authorization header.

```bash
curl --request GET \
    'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V' \
     --header "Authorization: Bearer NgCXRK...MzYjw"
```

--------------------------------

### Get User's Playlists Request (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists

Example of how to make a GET request to the Spotify Web API to retrieve the current user's playlists using cURL. Requires an Authorization header with a Bearer token.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/me/playlists \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### Pagination Example

Source: https://developer.spotify.com/documentation/web-api/concepts/api-calls

This example illustrates how to use query parameters 'offset' and 'limit' to paginate through datasets in the Spotify Web API. It shows a request for albums by a specific artist, retrieving a subset of results.

```bash
$ curl  
https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10
```

--------------------------------

### GET /v1/me

Source: https://developer.spotify.com/documentation/web-api/concepts/access-token

Retrieves the current user's profile information. This example shows a JavaScript function using the `fetch` API.

```APIDOC
## GET /v1/me

### Description
Retrieves the profile information for the current user, including their display name, country, and product type.

### Method
GET

### Endpoint
`/v1/me`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```javascript
async function getProfile(accessToken) {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });
  const data = await response.json();
  return data;
}
```

### Response
#### Success Response (200)
- **display_name** (string) - The name displayed for the user.
- **country** (string) - The user's country code (e.g., 'US', 'GB').
- **product** (string) - The user's Spotify product type (e.g., 'premium', 'free').

#### Response Example
```json
{
  "display_name": "Example User",
  "country": "US",
  "product": "premium"
}
```
```

--------------------------------

### PUT /me/player/play

Source: https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback

Start or resume playback on the user's Spotify player. This endpoint allows specifying a device, context, track URIs, and starting position.

```APIDOC
## PUT /me/player/play

### Description
Start or resume playback on the user's Spotify player. This endpoint allows specifying a device, context, track URIs, and starting position.

### Method
PUT

### Endpoint
/me/player/play

### Parameters
#### Query Parameters
- **device_id** (string) - Optional - The id of the device this command is targeting. If not supplied, the user's currently active device is the target.

#### Request Body
- **context_uri** (string) - Optional - Spotify URI of the context to play. Valid contexts are albums, artists & playlists.
- **uris** (array of strings) - Optional - A JSON array of the Spotify track URIs to play.
- **offset** (object) - Optional - Indicates from where in the context playback should start. Can be an object with 'position' (integer) or 'uri' (string).
- **position_ms** (integer) - Optional - The position in milliseconds to start playback from.

### Request Example
```json
{
    "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
    "offset": {
        "position": 5
    },
    "position_ms": 0
}
```

### Response
#### Success Response (204)
Playback started. The response body is empty.

#### Error Responses
- **401**: Unauthorized
- **403**: Forbidden
- **429**: Too Many Requests
```

--------------------------------

### Get Album Tracks Request (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-an-albums-tracks

Example of how to request tracks from a specific album using cURL. It includes the necessary endpoint, HTTP method, and authorization header.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### Get Artists by IDs (Wget)

Source: https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists

This snippet illustrates how to use wget to make a GET request to the Spotify Web API's /v1/artists endpoint. It includes the necessary Authorization header and the artist IDs in the URL.

```bash
wget request example would go here, similar to the cURL example but using wget syntax.
```

--------------------------------

### GET /v1/me/following

Source: https://developer.spotify.com/documentation/web-api/reference/get-followed

Get a list of the artists or podcasts that the user follows. This endpoint allows retrieval of followed artists or podcasts, with options to specify the type and pagination cursors.

```APIDOC
## GET /v1/me/following

### Description
Get a list of the artists or podcasts that the user follows. This endpoint allows retrieval of followed artists or podcasts, with options to specify the type and pagination cursors.

### Method
GET

### Endpoint
https://api.spotify.com/v1/me/following

### Parameters
#### Query Parameters
- **type** (string) - Required - The type of followed content to return: 'artist' or 'show'.
- **after** (string) - Optional - The last artist or show ID from the previous query. Use this to get the next page of artists or shows.
- **limit** (integer) - Optional - The maximum number of items to return. Default: 20. Maximum: 50.

### Request Example
```json
{
  "example": "curl --request GET \
  --url 'https://api.spotify.com/v1/me/following?type=artist' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'"
}
```

### Response
#### Success Response (200)
- **artists** (object) - A paged set of artists.
  - **href** (string) - A link to the Web API endpoint returning the full result of the request.
  - **limit** (integer) - The maximum number of items in the response (as set in the query or by default).
  - **next** (string) - URL to the next page of items. ( `null` if none)
  - **cursors** (object) - The cursors used to find the next set of items.
    - **after** (string) - The cursor to use as key to find the next page of items.
    - **before** (string) - The cursor to use as key to find the previous page of items.
  - **total** (integer) - The total number of items available to return.
  - **items** (array of ArtistObject) - An array of Artist objects.
    - **external_urls** (object) - Known external URLs for this artist.
      - **spotify** (string) - The Spotify URL for the object.
    - **followers** (object) - Information about the followers of the artist.
      - **href** (string) - Nullable. This will always be set to null, as the Web API does not support it at the moment.
      - **total** (integer) - The total number of followers.
    - **genres** (array of strings) - A list of the genres the artist is associated with. If not yet classified, the array is empty.
    - **href** (string) - A link to the Web API endpoint providing full details of the artist.
    - **id** (string) - The Spotify ID for the artist.
    - **images** (array of ImageObject) - Images of the artist in various sizes, widest first.
      - **url** (string) - Required. The source URL of the image.
      - **height** (integer) - Required. The image height in pixels.
      - **width** (integer) - Required. The image width in pixels.
    - **name** (string) - The name of the artist.
    - **popularity** (integer) - The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular.
    - **type** (string) - The object type. Allowed values: "artist".
    - **uri** (string) - The Spotify URI for the artist.

#### Response Example
```json
{
  "artists": {
    "href": "string",
    "limit": 0,
    "next": "string",
    "cursors": {
      "after": "string",
      "before": "string"
    },
    "total": 0,
    "items": [
      {
        "external_urls": {
          "spotify": "string"
        },
        "followers": {
          "href": "string",
          "total": 0
        },
        "genres": [
          "Prog rock",
          "Grunge"
        ],
        "href": "string",
        "id": "string",
        "images": [
          {
            "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            "height": 300,
            "width": 300
          }
        ],
        "name": "string",
        "popularity": 0,
        "type": "artist",
        "uri": "string"
      }
    ]
  }
}
```

#### Error Responses
- **401** Unauthorized
- **403** Forbidden
- **429** Too Many Requests
```

--------------------------------

### Get Track Metadata With Market Parameter (cURL)

Source: https://developer.spotify.com/documentation/web-api/concepts/track-relinking

This example shows a cURL request to retrieve metadata for a track, including the 'market=US' parameter. If the track is unavailable in the US, Spotify returns information about a relinked track and includes 'is_playable' and 'linked_from' objects.

```cURL
curl -X GET "https://api.spotify.com/v1/tracks/6kLCHFM39wkFjOuyPGLGeQ?market=US"
```

--------------------------------

### Get User's Saved Tracks Request (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks

Example of how to make a GET request to the Spotify Web API to retrieve the current user's saved tracks. This uses cURL and requires an Authorization header with a Bearer token.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/me/tracks \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### Get Track Metadata Without Market Parameter (cURL)

Source: https://developer.spotify.com/documentation/web-api/concepts/track-relinking

This example demonstrates a cURL request to retrieve metadata for a specific track without specifying a market. The response includes the 'available_markets' array, indicating where the track is playable.

```cURL
curl -X GET "https://api.spotify.com/v1/tracks/6kLCHFM39wkFjOuyPGLGeQ"
```

--------------------------------

### Get Episode

Source: https://developer.spotify.com/documentation/web-api/reference/get-an-episode

Get Spotify catalog information for a podcast episode. All fields in the response body will be populated.

```APIDOC
## GET /v1/episodes/{id}

### Description
Retrieves detailed information about a specific podcast episode from the Spotify catalog.

### Method
GET

### Endpoint
`/v1/episodes/{id}`

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID for the episode.
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code or the special value `from_token`. This parameter is needed to retrieve the episode's playback information.

### Request Example
```
curl --request GET \
  --url https://api.spotify.com/v1/episodes/512ojhOuo1ktJprKbVcKyQ \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **audio_preview_url** (string) - URL to a 30-second preview (mp3 format) of the episode. `null` if not available.
- **description** (string) - A description of the episode. HTML tags are stripped.
- **html_description** (string) - A description of the episode. HTML tags are included.
- **duration_ms** (integer) - The duration of the episode in milliseconds.
- **explicit** (boolean) - Whether or not the episode has explicit content.
- **external_urls** (object) - External URLs for this episode.
  - **spotify** (string) - The Spotify URL for the episode.
- **href** (string) - A link to the Web API endpoint providing full details of the episode.
- **id** (string) - The Spotify ID for the episode.
- **images** (array of ImageObject) - The cover art for the episode in various sizes.
  - **url** (string) - The source URL of the image.
  - **height** (integer) - The image height in pixels.
  - **width** (integer) - The image width in pixels.
- **is_externally_hosted** (boolean) - True if the episode is hosted outside of Spotify's CDN.
- **is_playable** (boolean) - Whether or not the episode is playable in the given market.
- **language** (string) - The language of the episode, identified by its ISO 639 code.
- **languages** (array of strings) - A list of the languages used in the episode, identified by their ISO 639 code.
- **name** (string) - The name of the episode.
- **release_date** (string) - The date the episode was released.
- **release_date_precision** (string) - The precision with which `release_date` is known.
- **resume_point** (object) - Indicates the most recent position played by the user.
  - **fully_played** (boolean) - Whether or not the episode has been fully played by the user.
  - **resume_position_ms** (integer) - The position in milliseconds played by the user.
- **type** (string) - The object type, 'episode'.
- **uri** (string) - The Spotify URI for the episode.
- **restrictions** (object) - Any restrictions for the episode.
  - **reason** (string) - The reason for the restriction.
- **show** (object) - The show associated with this episode.
  - **available_markets** (array of strings) - The markets in which the show is available.
  - **copyrights** (array of CopyrightObject) - The copyrights associated with the show.
  - **description** (string) - A description of the show.
  - **html_description** (string) - A description of the show. HTML tags are included.
  - **explicit** (boolean) - Whether or not the show has explicit content.
  - **external_urls** (object) - External URLs for this show.
    - **spotify** (string) - The Spotify URL for the object.
  - **href** (string) - A link to the Web API endpoint providing full details of the show.
  - **id** (string) - The Spotify ID for the show.
  - **images** (array of ImageObject) - The cover art for the show in various sizes.
    - **url** (string) - The source URL of the image.
    - **height** (integer) - The image height in pixels.
    - **width** (integer) - The image width in pixels.
  - **is_externally_hosted** (boolean) - True if all of the shows episodes are hosted outside of Spotify's CDN.
  - **languages** (array of strings) - A list of the languages used in the show.
  - **media_type** (string) - The media type of the show.
  - **name** (string) - The name of the show.
  - **publisher** (string) - The publisher of the show.
  - **type** (string) - The object type, 'show'.
  - **uri** (string) - The Spotify URI for the show.
  - **total_episodes** (integer) - The total number of episodes in the show.

#### Response Example
```json
{
  "audio_preview_url": "https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17",
  "description": "A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.",
  "html_description": "<p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>",
  "duration_ms": 1686230,
  "explicit": false,
  "external_urls": {
    "spotify": "string"
  },
  "href": "https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ",
  "id": "5Xt5DXGzch68nYYamXrNxZ",
  "images": [
    {
      "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "height": 300,
      "width": 300
    }
  ],
  "is_externally_hosted": false,
  "is_playable": false,
  "language": "en",
  "languages": ["fr", "en"],
  "name": "Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators",
  "release_date": "1981-12-15",
  "release_date_precision": "day",
  "resume_point": {
    "fully_played": false,
    "resume_position_ms": 0
  },
  "type": "episode",
  "uri": "spotify:episode:0zLhl3WsOCQHbe1BPTiHgr",
  "restrictions": {
    "reason": "string"
  },
  "show": {
    "available_markets": ["string"],
    "copyrights": [
      {
        "text": "string",
        "type": "string"
      }
    ],
    "description": "string",
    "html_description": "string",
    "explicit": false,
    "external_urls": {
      "spotify": "string"
    },
    "href": "string",
    "id": "string",
    "images": [
      {
        "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
        "height": 300,
        "width": 300
      }
    ],
    "is_externally_hosted": false,
    "languages": ["string"],
    "media_type": "string",
    "name": "string",
    "publisher": "string",
    "type": "show",
    "uri": "string",
    "total_episodes": 0
  }
}
```
```

--------------------------------

### Get Artist Information (Wget)

Source: https://developer.spotify.com/documentation/web-api/reference/get-an-artist

This snippet shows how to fetch artist details using Wget, a command-line utility for retrieving files using HTTP, HTTPS, and FTP. It includes the necessary Authorization header.

```bash
wget --header="Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z" https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg
```

--------------------------------

### GET /playlists/{playlist_id}/tracks

Source: https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks

Get a list of the playlists that the user created.

```APIDOC
## GET /playlists/{playlist_id}/tracks

### Description
Retrieves a list of tracks for a specific playlist, with options for filtering and pagination.

### Method
GET

### Endpoint
`/v1/playlists/{playlist_id}/tracks`

### Parameters
#### Path Parameters
- **playlist_id** (string) - Required - The Spotify ID for the playlist.

#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If provided, only tracks available in this market will be returned.
- **fields** (string) - Optional - Filters for the query: a comma-separated string of JSON path selectors, separated by commas. E.g. `items(track(name,artists(name))),next`
- **limit** (integer) - Optional - The maximum number of items to return. Default: 20. Maximum: 100.
- **offset** (integer) - Optional - The number of items to skip. Default: 0.
- **additional_types** (string) - Optional - A comma-separated list of item types that should be returned for each item. Valid values: `track` and `episode`.

### Request Example
```curl
curl --request GET \
  --url https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **href** (string) - URL to the Web API endpoint where the results of the request are returned.
- **limit** (integer) - The maximum number of items that could be returned from this playlist.
- **next** (string) - URL to the next page of items. If null, there is no next page.
- **offset** (integer) - The offset from the start of the playlist. 
- **previous** (string) - URL to the previous page of items. If null, there is no previous page.
- **total** (integer) - The total number of items available in this playlist.
- **items** (array) - An array of playlist items. Each item contains:
  - **added_at** (string) - The date and time the track or episode was added. ISO 8601 format: YYYY-MM-DD. Example: 2014-05-16.
  - **added_by** (object) - The user who added the item. May be null if the item was added by the playlist owner.
    - **external_urls** (object) - Known external URLs for this object.
      - **spotify** (string) - A URL to the Spotify web SDK endpoint of the object.
    - **href** (string) - A link to the Web API endpoint of this object.
    - **id** (string) - The Spotify ID for the user.
    - **type** (string) - The type of the object. Allowed values: `user`.
    - **uri** (string) - The Spotify URI for the user.
  - **is_local** (boolean) - Whether the track or episode is local.
  - **track** (object) - Information about the track or episode.
    - **album** (object) - Information about the album.
      - **album_type** (string) - The type of album. Example: `album`, `single`, `compilation`.
      - **total_tracks** (integer) - The total number of tracks in the album.
      - **available_markets** (array of strings) - The markets in which the album is available. 
      - **external_urls** (object) - Known external URLs for this object.
        - **spotify** (string) - A URL to the Spotify web SDK endpoint of the object.
      - **href** (string) - A link to the Web API endpoint of this object.
      - **id** (string) - The Spotify ID for the album.
      - **images** (array of objects) - The cover art for the album in various sizes.
        - **url** (string) - The source URL of the image.
        - **height** (integer) - The image height in pixels.
        - **width** (integer) - The image width in pixels.
      - **name** (string) - The name of the album.
      - **release_date** (string) - The date the album was first released.
      - **release_date_precision** (string) - The precision with which `release_date` is known.
      - **restrictions** (object) - Known restrictions for this album.
        - **reason** (string) - The reason for the restriction. Allowed values: `market`.
      - **type** (string) - The type of the object. Allowed values: `album`.
      - **uri** (string) - The Spotify URI for the album.
      - **artists** (array of objects) - The artists of the album. Each artist object contains:
        - **external_urls** (object) - Known external URLs for this object.
          - **spotify** (string) - A URL to the Spotify web SDK endpoint of the object.
        - **href** (string) - A link to the Web API endpoint of this object.
        - **id** (string) - The Spotify ID for the artist.
        - **name** (string) - The name of the artist.
        - **type** (string) - The type of the object. Allowed values: `artist`.
        - **uri** (string) - The Spotify URI for the artist.
    - **artists** (array of objects) - The artists of the track. Each artist object contains:
      - **external_urls** (object) - Known external URLs for this object.
        - **spotify** (string) - A URL to the Spotify web SDK endpoint of the object.
      - **href** (string) - A link to the Web API endpoint of this object.
      - **id** (string) - The Spotify ID for the artist.
      - **name** (string) - The name of the artist.
      - **type** (string) - The type of the object. Allowed values: `artist`.
      - **uri** (string) - The Spotify URI for the artist.
    - **available_markets** (array of strings) - The markets in which the track is available.
    - **disc_number** (integer) - The disc number for the track. This field is only relevant for tracks that are part of an album.
    - **duration_ms** (integer) - The duration of the track in milliseconds.
    - **explicit** (boolean) - Whether or not the track has explicit content (screwed, sampled, or otherwise explicit).
    - **external_ids** (object) - Known external IDs for this track.
      - **isrc** (string) - International Standard Recording Code.
      - **ean** (string) - International Article Number.
      - **upc** (string) - Universal Product Code.
    - **external_urls** (object) - Known external URLs for this track.
      - **spotify** (string) - A URL to the Spotify web SDK endpoint of this object.
    - **href** (string) - A link to the Web API endpoint of this object.
    - **id** (string) - The Spotify ID for the track.
    - **is_playable** (boolean) - Whether or not the track is playable in the given market. 
    - **linked_from** (object) - Optional. If the track is part of an album, this field will be the album object.
    - **restrictions** (object) - Known restrictions for this track.
      - **reason** (string) - The reason for the restriction. Allowed values: `market`.
    - **name** (string) - The name of the track.
    - **popularity** (integer) - The popularity of the track. The value will be between 0 and 100, inclusive. 
    - **preview_url** (string) - A URL to a 30-second preview (or less) of the track. 
    - **track_number** (integer) - The number of the track in the album or set. 
    - **type** (string) - The type of the object. Allowed values: `track`.
    - **uri** (string) - The Spotify URI for the track.
    - **is_local** (boolean) - Whether the track is local or not.

#### Response Example
```json
{
  "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
  "limit": 20,
  "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  "offset": 0,
  "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  "total": 4,
  "items": [
    {
      "added_at": "string",
      "added_by": {
        "external_urls": {
          "spotify": "string"
        },
        "href": "string",
        "id": "string",
        "type": "user",
        "uri": "string"
      },
      "is_local": false,
      "track": {
        "album": {
          "album_type": "compilation",
          "total_tracks": 9,
          "available_markets": ["CA", "BR", "IT"],
          "external_urls": {
            "spotify": "string"
          },
          "href": "string",
          "id": "2up3OPMp9Tb4dAKM2erWXQ",
          "images": [
            {
              "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
              "height": 300,
              "width": 300
            }
          ],
          "name": "string",
          "release_date": "1981-12",
          "release_date_precision": "year",
          "restrictions": {
            "reason": "market"
          },
          "type": "album",
          "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
          "artists": [
            {
              "external_urls": {
                "spotify": "string"
              },
              "href": "string",
              "id": "string",
              "name": "string",
              "type": "artist",
              "uri": "string"
            }
          ]
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "string"
            },
            "href": "string",
            "id": "string",
            "name": "string",
            "type": "artist",
            "uri": "string"
          }
        ],
        "available_markets": ["string"],
        "disc_number": 0,
        "duration_ms": 0,
        "explicit": false,
        "external_ids": {
          "isrc": "string",
          "ean": "string",
          "upc": "string"
        },
        "external_urls": {
          "spotify": "string"
        },
        "href": "string",
        "id": "string",
        "is_playable": false,
        "linked_from": {},
        "restrictions": {
          "reason": "string"
        },
        "name": "string",
        "popularity": 0,
        "preview_url": "string",
        "track_number": 0,
        "type": "track",
        "uri": "string",
        "is_local": false
      }
    }
  ]
}
```

--------------------------------

### GET /playlists/{playlist_id}

Source: https://developer.spotify.com/documentation/web-api/reference/get-playlist

Get a Playlist. Get a playlist owned by a Spotify user.

```APIDOC
## GET /playlists/{playlist_id}

### Description
Get a playlist owned by a Spotify user.

### Method
GET

### Endpoint
/playlists/{playlist_id}

### Parameters
#### Path Parameters
- **playlist_id** (string) - Required - The Spotify ID of the playlist.

#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned. If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter. Note: If neither market or user country are provided, the content is considered unavailable for the client. Users can view the country that is associated with their account in the account settings.
- **fields** (string) - Optional - Filters for the query: a comma-separated list of the fields to return. If omitted, all fields are returned. For example, to get just the playlist's description and URI: `fields=description,uri`. A dot separator can be used to specify non-reoccurring fields, while parentheses can be used to specify reoccurring fields within objects. For example, to get just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`. Use multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`. Fields can be excluded by prefixing them with an exclamation mark, for example: `fields=tracks.items(track(name,href,album(!name,href)))`.
- **additional_types** (string) - Optional - A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`. Note: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future. In addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.

### Request Example
```
GET https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n?market=ES&fields=description,uri
```

### Response
#### Success Response (200)
- **description** (string) - The playlist description.
- **uri** (string) - The Spotify URI of the playlist.

#### Response Example
```json
{
  "description": "A playlist description.",
  "uri": "spotify:playlist:3cEYpjA9oz9GiPac4AsH4n"
}
```
```

--------------------------------

### Authentication Error Object Example

Source: https://developer.spotify.com/documentation/web-api/concepts/api-calls

This example demonstrates the JSON structure for an authentication or authorization error response from the Spotify Web API, following RFC 6749. It includes 'error' and 'error_description' fields.

```bash
$ curl -H "Authorization: Basic Yjc...cK" -d grant_type=refresh_token -d refresh_token=AQD...f0 "https://accounts.spotify.com/api/token"  

{
    "error": "invalid_client",
    "error_description": "Invalid client secret"
}
```

--------------------------------

### Get User's Player Devices (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-users-available-devices

This cURL command demonstrates how to make a GET request to the Spotify Web API to retrieve a list of the user's connected playback devices. It requires an 'Authorization' header with a valid Bearer token.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/me/player/devices \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### Get Playlists by Category (Wget)

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-categories-playlists

This snippet shows how to fetch a paginated list of playlists for a given category using Wget. Ensure you include the 'Authorization' header with your Bearer token when making the request to the '/browse/categories/{category_id}/playlists' endpoint.

```shell
wget 
  --method GET 
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z' 
  --url https://api.spotify.com/v1/browse/categories/dinner/playlists
```

--------------------------------

### Get Followed Artists (Wget)

Source: https://developer.spotify.com/documentation/web-api/reference/get-followed

This snippet shows how to fetch a list of followed artists using Wget. Similar to cURL, it requires an Authorization header for authentication.

```shell
wget --header="Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z" "https://api.spotify.com/v1/me/following?type=artist"
```

--------------------------------

### Get Artist Information (HTTPie)

Source: https://developer.spotify.com/documentation/web-api/reference/get-an-artist

This snippet illustrates how to make a GET request to the Spotify API to retrieve artist information using HTTPie, a command-line HTTP client. It requires specifying the Authorization header.

```bash
http GET https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg \
  Authorization:Bearer 1POdFZRZbvb...qqillRxMr2z
```

--------------------------------

### Request Audio Analysis Data (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis

This snippet demonstrates how to request audio analysis data for a specific track using cURL. It includes the necessary HTTP GET request, the endpoint URL, and an example authorization header.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/audio-analysis/11dFghVXANMlKmJXsNCbNl \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### GET /authorize

Source: https://developer.spotify.com/documentation/web-api/tutorials/implicit-flow

Initiates the user authorization flow by redirecting the user to Spotify's authorization server. This endpoint requires several query parameters to identify your application and specify the desired permissions.

```APIDOC
## GET /authorize

### Description
Initiates the user authorization flow by redirecting the user to Spotify's authorization server. This endpoint requires several query parameters to identify your application and specify the desired permissions.

### Method
GET

### Endpoint
https://accounts.spotify.com/authorize

### Parameters
#### Query Parameters
- **client_id** (string) - Required - The client ID provided to you by Spotify when you register your application.
- **response_type** (string) - Required - Set it to `token`.
- **redirect_uri** (string) - Required - The URI to redirect to after the user grants or denies permission. This URI must exactly match one of the URIs registered for your application.
- **state** (string) - Optional, but strongly recommended - A value to help correlate requests and responses, protecting against CSRF attacks.
- **scope** (string) - Optional - A space-separated list of scopes defining the permissions your application is requesting.
- **show_dialog** (boolean) - Optional - If `true`, forces the user to approve the app again. Defaults to `false`.

### Request Example
```javascript
var client_id = 'YOUR_CLIENT_ID';
var redirect_uri = 'YOUR_REDIRECT_URI';
var state = generateRandomString(16);
localStorage.setItem(stateKey, state);
var scope = 'user-read-private user-read-email';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);

// Redirect the user to the constructed URL
window.location.href = url;
```

### Response
#### Success Response (200 OK - Redirect)
Upon successful authorization, the user is redirected to the `redirect_uri` with a hash fragment containing the following parameters:
- **access_token** (string) - An access token that can be used for subsequent API calls.
- **token_type** (string) - The type of token, typically "Bearer".
- **expires_in** (integer) - The time period in seconds for which the access token is valid.
- **state** (string) - The value of the state parameter supplied in the authorization URI.

#### Success Response Example
```
https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123
```

#### Error Response (Redirect)
If the user denies access or an error occurs, the user is redirected to the `redirect_uri` with a query string containing the following parameters:
- **error** (string) - The reason authorization failed (e.g., "access_denied").
- **state** (string) - The value of the state parameter supplied in the request.

#### Error Response Example
```
https://example.com/callback?error=access_denied&state=123
```
```

--------------------------------

### Set Playback Volume using HTTPie

Source: https://developer.spotify.com/documentation/web-api/reference/set-volume-for-users-playback

Example of how to set the playback volume using the HTTPie command-line tool. This demonstrates a concise way to interact with the Spotify API for volume control.

```bash
http --auth="Authorization:Bearer 1POdFZRZbvb...qqillRxMr2z" --method=PUT https://api.spotify.com/v1/me/player/volume volume_percent==50
```

--------------------------------

### Get Chapters

Source: https://developer.spotify.com/documentation/web-api/reference/get-audiobook-chapters

Retrieves a list of chapters, potentially for a specific podcast or user.

```APIDOC
## GET /websites/developer_spotify_web-api/chapters

### Description
Retrieves a list of chapters, potentially for a specific podcast or user. This endpoint is part of the Spotify Web API.

### Method
GET

### Endpoint
/websites/developer_spotify_web-api/chapters

### Query Parameters
- **offset** (integer) - Optional - The offset of the items returned (as set in the query or by default).
- **limit** (integer) - Optional - The maximum number of items in the response (as set in the query or by default).

### Response
#### Success Response (200)
- **href** (string) - A link to the Web API endpoint returning the full result of the request.
- **limit** (integer) - The maximum number of items in the response.
- **next** (string) - URL to the next page of items. (null if none).
- **offset** (integer) - The offset of the items returned.
- **previous** (string) - URL to the previous page of items. (null if none).
- **total** (integer) - The total number of items available to return.
- **items** (array of SimplifiedChapterObject) - An array of chapter objects.
  - **audio_preview_url** (string) - Nullable, Deprecated. A URL to a 30 second preview (MP3 format) of the chapter.
  - **available_markets** (array of strings) - A list of the countries in which the chapter can be played.
  - **chapter_number** (integer) - The number of the chapter.
  - **description** (string) - A description of the chapter. HTML tags are stripped away.
  - **html_description** (string) - A description of the chapter. This field may contain HTML tags.
  - **duration_ms** (integer) - The chapter length in milliseconds.
  - **explicit** (boolean) - Whether or not the chapter has explicit content.
  - **external_urls** (object) - External URLs for this chapter.
    - **spotify** (string) - The Spotify URL for the object.
  - **href** (string) - A link to the Web API endpoint providing full details of the chapter.
  - **id** (string) - The Spotify ID for the chapter.
  - **images** (array of ImageObject) - The cover art for the chapter in various sizes.
    - **url** (string) - The source URL of the image.
    - **height** (integer) - The image height in pixels.
    - **width** (integer) - The image width in pixels.
  - **is_playable** (boolean) - True if the chapter is playable in the given market.
  - **languages** (array of strings) - A list of the languages used in the chapter.
  - **name** (string) - The name of the chapter.
  - **release_date** (string) - The date the chapter was first released.
  - **release_date_precision** (string) - The precision with which `release_date` value is known (year, month, day).
  - **resume_point** (object) - The user's most recent position in the chapter.
    - **fully_played** (boolean) - Whether or not the episode has been fully played by the user.
    - **resume_position_ms** (integer) - The user's most recent position in the episode in milliseconds.
  - **type** (string) - The object type (e.g., "episode").
  - **uri** (string) - The Spotify URI for the chapter.
  - **restrictions** (object) - Included in the response when a content restriction is applied.
    - **reason** (string) - The reason for the restriction.

#### Error Responses
- **401** - Unauthorized
- **403** - Forbidden
- **429** - Too Many Requests

### Response Example
```json
{
  "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
  "limit": 20,
  "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  "offset": 0,
  "previous": null,
  "total": 4,
  "items": [
    {
      "audio_preview_url": "https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17",
      "available_markets": ["CA", "SE"],
      "chapter_number": 1,
      "description": "We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.",
      "html_description": "<p>We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.</p>",
      "duration_ms": 1686230,
      "explicit": false,
      "external_urls": {
        "spotify": "https://open.spotify.com/episode/0zLhl3WsOCQHbe1BPTiHgr"
      },
      "href": "https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ",
      "id": "5Xt5DXGzch68nYYamXrNxZ",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          "height": 300,
          "width": 300
        }
      ],
      "is_playable": true,
      "languages": ["fr", "en"],
      "name": "Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators",
      "release_date": "1981-12-15",
      "release_date_precision": "day",
      "resume_point": {
        "fully_played": false,
        "resume_position_ms": 10000
      },
      "type": "episode",
      "uri": "spotify:episode:0zLhl3WsOCQHbe1BPTiHgr",
      "restrictions": {
        "reason": "market"
      }
    }
  ]
}
```
```

--------------------------------

### Play Content from Context (PUT /me/player/play)

Source: https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback

Initiates playback of content from a specified context (album, artist, or playlist) on a target device. It supports playing from a specific URI, a list of track URIs, and starting at a particular offset within the context. The response is typically empty upon success (204 No Content).

```json
{
    "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
    "offset": {
        "position": 5
    },
    "position_ms": 0
}
```

```json
{ "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr", "offset": { "position": 5 }, "position_ms": 0 }
```

--------------------------------

### GET /v1/recommendations

Source: https://developer.spotify.com/documentation/web-api/reference/get-recommendations

Get a list of recommended tracks based on a list of seed artists, genres, and tracks. This endpoint allows for discovery of new music tailored to user preferences.

```APIDOC
## GET /v1/recommendations

### Description
Get a list of recommended tracks based on a list of seed artists, genres, and tracks. This endpoint allows for discovery of new music tailored to user preferences.

### Method
GET

### Endpoint
`/v1/recommendations`

### Query Parameters
*   **seed_artists** (string) - Required - Comma-separated list of Spotify IDs for seed artists. Up to 5 seed artists are allowed.
*   **seed_genres** (string) - Required - Comma-separated list of Spotify genre seeds. Up to 5 genre seeds are allowed.
*   **seed_tracks** (string) - Required - Comma-separated list of Spotify track attributes or IDs for seed tracks. Up to 5 seed tracks are allowed.

### Request Example
```
GET https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA
Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z
```

### Response
#### Success Response (200)
Returns a JSON object containing a list of recommended tracks.

*   **tracks** (array) - An array of Track Objects.

#### Response Example
```json
{
  "tracks": [
    {
      "id": "string",
      "name": "string",
      "popularity": 80,
      "preview_url": "string",
      "external_urls": {
        "spotify": "string"
      },
      "external_ids": {
        "isrc": "string"
      },
      "explicit": false,
      "is_playable": true,
      "uri": "string"
    }
  ]
}
```
```

--------------------------------

### GET /v1/tracks/{id}

Source: https://developer.spotify.com/documentation/web-api/concepts/access-token

Retrieves information about a specific track using its ID. This example demonstrates how to use cURL to make the request.

```APIDOC
## GET /v1/tracks/{id}

### Description
Retrieves detailed information about a specific track, including its name, artists, album, and popularity.

### Method
GET

### Endpoint
`/v1/tracks/{id}`

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID for the track.

#### Query Parameters
None

### Request Example
```bash
curl --request GET \
     'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V' \
     --header "Authorization: Bearer NgCXRK...MzYjw"
```

### Response
#### Success Response (200)
- **name** (string) - The name of the track.
- **artists** (array) - An array of artist objects, each containing information about an artist.
- **album** (object) - An object containing information about the album the track belongs to.
- **popularity** (integer) - The popularity of the track (0 to 100).

#### Response Example
```json
{
  "name": "Example Track Name",
  "artists": [
    {
      "name": "Example Artist"
    }
  ],
  "album": {
    "name": "Example Album"
  },
  "popularity": 85
}
```
```

--------------------------------

### GET /v1/chapters/{id}

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-chapter

Get an Audiobook Chapter. Retrieves detailed information about a specific audiobook chapter using its Spotify ID.

```APIDOC
## GET /v1/chapters/{id}

### Description
Retrieves detailed information about a specific audiobook chapter using its Spotify ID.

### Method
GET

### Endpoint
`/v1/chapters/{id}`

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID for the audiobook chapter.

#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code or the keyword `from_token`. Provide this parameter if you want the API to return chapters the user can stream in that specific market. If omitted, the tracks returned will be available in every market. 

### Request Example
```
curl --request GET \
  --url https://api.spotify.com/v1/chapters/0D5wENdkdwbqlrHoaJ9g29 \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **audio_preview_url** (string) - URL to a 30-second preview of the audiobook chapter.
- **available_markets** (array of strings) - An array of markets where the chapter is available.
- **chapter_number** (integer) - The chapter number of the audiobook.
- **description** (string) - A description of the audiobook chapter. HTML tags are stripped.
- **html_description** (string) - A description of the audiobook chapter. This field may contain HTML tags.
- **duration_ms** (integer) - The duration of the audiobook chapter in milliseconds.
- **explicit** (boolean) - Whether or not the audiobook chapter has explicit content.
- **external_urls** (object) - External URLs for this audiobook chapter.
  - **spotify** (string) - The Spotify URL for the object.
- **href** (string) - A link to the Web API endpoint providing full details of the audiobook chapter.
- **id** (string) - The Spotify ID for the audiobook chapter.
- **images** (array of ImageObject) - The cover art for the audiobook chapter in various sizes.
  - **url** (string) - The source URL of the image.
  - **height** (integer) - The image height in pixels.
  - **width** (integer) - The image width in pixels.
- **is_playable** (boolean) - Whether or not the audiobook chapter is playable.
- **languages** (array of strings) - A list of the languages used in the audiobook chapter.
- **name** (string) - The name of the audiobook chapter.
- **release_date** (string) - The release date of the audiobook chapter.
- **release_date_precision** (string) - The precision of the release date.
- **resume_point** (object) - The user's resume point for the audiobook chapter.
  - **fully_played** (boolean) - Whether the chapter has been fully played.
  - **resume_position_ms** (integer) - The position in milliseconds to resume playback from.
- **type** (string) - The object type.
- **uri** (string) - The Spotify URI for the audiobook chapter.
- **restrictions** (object) - Restrictions for the audiobook chapter.
  - **reason** (string) - The reason for the restriction.
- **audiobook** (object) - The audiobook object the chapter belongs to.
  - **authors** (array of object) - The authors of the audiobook.
    - **name** (string) - The name of the author.
  - **available_markets** (array of strings) - An array of markets where the audiobook is available.
  - **copyrights** (array of CopyrightObject) - The copyright statements of the audiobook.
    - **text** (string) - The copyright text for this content.
    - **type** (string) - The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.
  - **description** (string) - A description of the audiobook. HTML tags are stripped.
  - **html_description** (string) - A description of the audiobook. This field may contain HTML tags.
  - **edition** (string) - The edition of the audiobook.
  - **explicit** (boolean) - Whether or not the audiobook has explicit content.
  - **external_urls** (object) - External URLs for this audiobook.
    - **spotify** (string) - The Spotify URL for the object.
  - **href** (string) - A link to the Web API endpoint providing full details of the audiobook.
  - **id** (string) - The Spotify ID for the audiobook.
  - **images** (array of ImageObject) - The cover art for the audiobook in various sizes.
    - **url** (string) - The source URL of the image.
    - **height** (integer) - The image height in pixels.
    - **width** (integer) - The image width in pixels.
  - **languages** (array of strings) - A list of the languages used in the audiobook.
  - **media_type** (string) - The media type of the audiobook.
  - **name** (string) - The name of the audiobook.
  - **narrators** (array of NarratorObject) - The narrator(s) for the audiobook.
    - **name** (string) - The name of the Narrator.
  - **publisher** (string) - The publisher of the audiobook.
  - **type** (string) - The object type.
  - **uri** (string) - The Spotify URI for the audiobook.
  - **total_chapters** (integer) - The number of chapters in this audiobook.

#### Response Example
```json
{
  "audio_preview_url": "https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17",
  "available_markets": ["string"],
  "chapter_number": 1,
  "description": "We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.",
  "html_description": "<p>We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.</p>",
  "duration_ms": 1686230,
  "explicit": false,
  "external_urls": {
    "spotify": "string"
  },
  "href": "https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ",
  "id": "5Xt5DXGzch68nYYamXrNxZ",
  "images": [
    {
      "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "height": 300,
      "width": 300
    }
  ],
  "is_playable": false,
  "languages": ["fr", "en"],
  "name": "Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators",
  "release_date": "1981-12-15",
  "release_date_precision": "day",
  "resume_point": {
    "fully_played": false,
    "resume_position_ms": 0
  },
  "type": "episode",
  "uri": "spotify:episode:0zLhl3WsOCQHbe1BPTiHgr",
  "restrictions": {
    "reason": "string"
  },
  "audiobook": {
    "authors": [
      {
        "name": "string"
      }
    ],
    "available_markets": ["string"],
    "copyrights": [
      {
        "text": "string",
        "type": "string"
      }
    ],
    "description": "string",
    "html_description": "string",
    "edition": "Unabridged",
    "explicit": false,
    "external_urls": {
      "spotify": "string"
    },
    "href": "string",
    "id": "string",
    "images": [
      {
        "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
        "height": 300,
        "width": 300
      }
    ],
    "languages": ["string"],
    "media_type": "string",
    "name": "string",
    "narrators": [
      {
        "name": "string"
      }
    ],
    "publisher": "string",
    "type": "audiobook",
    "uri": "string",
    "total_chapters": 0
  }
}
```
```

--------------------------------

### Get User's Player Queue (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-queue

This snippet demonstrates how to retrieve the user's current playback queue using a GET request with cURL. It requires an 'Authorization' header with a valid Bearer token.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/me/player/queue \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### Get User Profile (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-users-profile

This snippet demonstrates how to retrieve a user's profile information using a GET request with cURL. It requires an authorization token and the user's ID.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/users/smedjan \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### GET /v1/shows/{id}/episodes

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-shows-episodes

Get Spotify's 20 most recent episodes for a given show. The Show ID is found in the Spotify URI. For example, the URI for the Spotify podcast 'The Joe Rogan Experience' is spotify:show:38bS44xjbVVZ3No3ByF1dJ, so the Show ID is '38bS44xjbVVZ3No3ByF1dJ'.

```APIDOC
## GET /v1/shows/{id}/episodes

### Description
Retrieves the 20 most recent episodes for a given Spotify show.

### Method
GET

### Endpoint
/v1/shows/{id}/episodes

#### Path Parameters
- **id** (string) - Required - The Spotify ID for the show.

#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If provided, only episodes available in that market will be returned.
- **limit** (integer) - Optional - The maximum number of episodes to return. Default: 20. Maximum: 50.
- **offset** (integer) - Optional - The number of episodes to skip. Default: 0.

### Request Example
```
curl --request GET \
  --url https://api.spotify.com/v1/shows/38bS44xjbVVZ3No3ByF1dJ/episodes \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **href** (string) - A link to the Web API endpoint providing the full result.
- **limit** (integer) - The limit used in the response (e.g., 20).
- **next** (string) - The next page of results.
- **offset** (integer) - The offset from the start of the data set.
- **previous** (string) - The previous page of results.
- **total** (integer) - The total number of items in the result set.
- **items** (array) - An array of episode objects.
  - **audio_preview_url** (string) - URL to a 30-second preview (very small file) of the audio.
  - **description** (string) - A description of the content. HTML tags are stripped on output.
  - **html_description** (string) - A description of the content, including HTML tags.
  - **duration_ms** (integer) - The duration of the episode in milliseconds.
  - **explicit** (boolean) - Whether or not the episode has explicit content (true = yes it does; false = no it does not).
  - **external_urls** (object) - Known external URLs for this episode.
    - **spotify** (string) - A URL pointing to the Spotify Web API endpoint.
  - **href** (string) - A link to the Web API endpoint providing full details of the episode.
  - **id** (string) - The Spotify ID for the episode.
  - **images** (array) - An array of images for the episode. Images can have different sizes, with different width and height values.
    - **url** (string) - The source URL of the image.
    - **height** (integer) - The height of the image in pixels.
    - **width** (integer) - The width of the image in pixels.
  - **is_externally_hosted** (boolean) - True if the episode is hosted outside of Spotify by the publisher.
  - **is_playable** (boolean) - True if the episode is playable in the given market. Otherwise false.
  - **language** (string) - The language of the episode, identified by a [BCP 47 language tag](https://tools.ietf.org/html/bcp47). Example: 'en-US'.
  - **languages** (array) - An array of languages the episode is available in, identified by BCP 47 language tags.
  - **name** (string) - The name of the episode.
  - **release_date** (string) - The date the episode was first released, can be inaccurate.
  - **release_date_precision** (string) - The precision with which `release_date` is known: 'year', 'month' or 'day'.
  - **resume_point** (object) - The episode's resume point. 
    - **fully_played** (boolean) - Whether or not the episode has been fully played by the user.
    - **resume_position_ms** (integer) - The position in milliseconds where the episode was last paused or stopped. 
  - **type** (string) - The object type: 'episode'.
  - **uri** (string) - The Spotify URI for the episode.
  - **restrictions** (object) - Included if the content isn't available for the user's subscription type or market. 
    - **reason** (string) - The reason for the restriction. Possible values: `product`, `explicit`.

#### Response Example
```json
{
  "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
  "limit": 20,
  "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  "offset": 0,
  "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  "total": 4,
  "items": [
    {
      "audio_preview_url": "https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17",
      "description": "A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.",
      "html_description": "<p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>",
      "duration_ms": 1686230,
      "explicit": false,
      "external_urls": {
        "spotify": "string"
      },
      "href": "https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ",
      "id": "5Xt5DXGzch68nYYamXrNxZ",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          "height": 300,
          "width": 300
        }
      ],
      "is_externally_hosted": false,
      "is_playable": false,
      "language": "en",
      "languages": ["fr", "en"],
      "name": "Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators",
      "release_date": "1981-12-15",
      "release_date_precision": "day",
      "resume_point": {
        "fully_played": false,
        "resume_position_ms": 0
      },
      "type": "episode",
      "uri": "spotify:episode:0zLhl3WsOCQHbe1BPTiHgr",
      "restrictions": {
        "reason": "string"
      }
    }
  ]
}
```
```

--------------------------------

### GET /shows/{id}

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-show

Get Spotify catalog information for a single show identified by its Spotify ID.

```APIDOC
## GET /shows/{id}

### Description
Get Spotify catalog information for a single show identified by its Spotify ID.

### Method
GET

### Endpoint
/shows/{id}

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID for the show.

### Response
#### Success Response (200)
- **available_markets** (array of strings) - Required - A list of the countries in which the show can be played, identified by their ISO 3166-1 alpha-2 code.
- **copyrights** (array of CopyrightObject) - Required - The copyright statements of the show.
  - **text** (string) - The copyright text for this content.
  - **type** (string) - The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.
- **description** (string) - Required - A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
- **html_description** (string) - Required - A description of the show. This field may contain HTML tags.
- **explicit** (boolean) - Required - Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).
- **external_urls** (object) - Required - External URLs for this show.
  - **spotify** (string) - The Spotify URL for the object.
- **href** (string) - Required - A link to the Web API endpoint providing full details of the show.
- **id** (string) - Required - The Spotify ID for the show.
- **images** (array of ImageObject) - Required - The cover art for the show in various sizes, widest first.
  - **url** (string) - Required - The source URL of the image.
  - **height** (integer) - Required - Nullable - The image height in pixels.
  - **width** (integer) - Required - Nullable - The image width in pixels.
- **is_externally_hosted** (boolean) - Required - True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be `null` in some cases.
- **languages** (array of strings) - Required - A list of the languages used in the show, identified by their ISO 639 code.
- **media_type** (string) - Required - The media type of the show.
- **name** (string) - Required - The name of the episode.
- **publisher** (string) - Required - The publisher of the show.
- **type** (string) - Required - The object type. Allowed values: `"show"`
- **uri** (string) - Required - The Spotify URI for the show.
- **total_episodes** (integer) - Required - The total number of episodes in the show.
- **episodes** (object) - Required - The episodes of the show.
  - **href** (string) - Required - A link to the Web API endpoint returning the full result of the request
  - **limit** (integer) - Required - The maximum number of items in the response (as set in the query or by default).
  - **next** (string) - Required - Nullable - URL to the next page of items. ( `null` if none)
  - **offset** (integer) - Required - The offset of the items returned (as set in the query or by default)
  - **previous** (string) - Required - Nullable - URL to the previous page of items. ( `null` if none)
  - **total** (integer) - Required - The total number of items available to return.
  - **items** (array of SimplifiedEpisodeObject) - Required
    - **audio_preview_url** (string) - Required - Nullable - Deprecated - A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.
    - **description** (string) - Required - A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
    - **html_description** (string) - Required - A description of the episode. This field may contain HTML tags.
    - **duration_ms** (integer) - Required - The episode length in milliseconds.
    - **explicit** (boolean) - Required - Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown).
    - **external_urls** (object) - Required - External URLs for this episode.
      - **spotify** (string) - The Spotify URL for the object.
    - **href** (string) - Required - A link to the Web API endpoint providing full details of the episode.
    - **id** (string) - Required - The Spotify ID for the episode.
    - **images** (array of ImageObject) - Required

#### Error Response
- **401**: Unauthorized
- **403**: Forbidden
- **429**: Too Many Requests
```

--------------------------------

### Initiate Spotify Authorization Request (JavaScript)

Source: https://developer.spotify.com/documentation/web-api/tutorials/code-flow

This JavaScript code snippet demonstrates how to initiate the Spotify authorization request using the Express framework. It constructs the authorization URL with required parameters like client ID, redirect URI, scope, and state, then redirects the user to Spotify's authorization endpoint. Ensure 'express' and 'querystring' are installed and imported.

```javascript
var client_id = 'CLIENT_ID';
var redirect_uri = 'http://127.0.0.1:8888/callback';

var app = express();

app.get('/login', function(req, res) {
  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});
```

--------------------------------

### Play Content from Context using cURL

Source: https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback

Demonstrates how to use cURL to send a PUT request to the Spotify Web API's '/me/player/play' endpoint. This example includes setting the Authorization header, Content-Type, and providing a JSON payload to specify the playback context, offset, and position.

```bash
curl --request PUT \
  --url https://api.spotify.com/v1/me/player/play \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z' \
  --header 'Content-Type: application/json' \
  --data '{ \
    "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr", \
    "offset": { \
        "position": 5 \
    }, \
    "position_ms": 0 \
}'
```

--------------------------------

### GET /v1/chapters

Source: https://developer.spotify.com/documentation/web-api/reference/get-several-chapters

Get Spotify catalog information about a Spotify audiobook chapter. The Spotify ID for the audiobook chapter must be provided.

```APIDOC
## GET /v1/chapters

### Description
Retrieve detailed information about one or more Spotify audiobook chapters using their Spotify IDs.

### Method
GET

### Endpoint
`/v1/chapters`

### Parameters
#### Query Parameters
- **ids** (string) - Required - A comma-separated list of Spotify IDs for the chapters. Maximum of 20 IDs.
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code or the keyword `from_token`. Provide this parameter if you want the artist and album references to be in the specified ISO 3166-1 alpha-2 country. Otherwise, artist and album references will be in the market of the person making the request. If a country code is specified, the returned content will be licensed for that country and the response may differ from the default. First in best-known location. E.g. `from_token`.

### Request Example
```json
{
  "example": "curl --request GET \
  --url 'https://api.spotify.com/v1/chapters?ids=0IsXVP0JmcB2adSE338GkK%2C3ZXb8FKZGU0EHALYX6uCzU%2C0D5wENdkdwbqlrHoaJ9g29' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'"
}
```

### Response
#### Success Response (200)
- **chapters** (array of ChapterObject) - A list of audiobook chapter objects.
  - **audio_exclusive_content** (boolean) - True if the content is only available in the Spotify application.
  - **available_markets** (array of strings) - A list of the countries in which the audiobook can be played, identified by their ISO 3166-1 alpha-2 code.
  - **copyrights** (array of CopyrightObject) - The copyright statements of the audiobook.
    - **text** (string) - The copyright text for this content.
    - **type** (string) - The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.
  - **description** (string) - A description of the audiobook. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
  - **html_description** (string) - A description of the audiobook. This field may contain HTML tags.
  - **edition** (string) - The edition of the audiobook.
  - **explicit** (boolean) - Whether or not the audiobook has explicit content (true = yes it does; false = no it does not OR unknown).
  - **external_urls** (object) - External URLs for this audiobook.
    - **spotify** (string) - The Spotify URL for the object.
  - **href** (string) - A link to the Web API endpoint providing full details of the audiobook.
  - **id** (string) - The Spotify ID for the audiobook.
  - **images** (array of ImageObject) - The cover art for the audiobook in various sizes, widest first.
    - **url** (string) - The source URL of the image.
    - **height** (integer) - The image height in pixels.
    - **width** (integer) - The image width in pixels.
  - **languages** (array of strings) - A list of the languages used in the audiobook, identified by their ISO 639 code.
  - **media_type** (string) - The media type of the audiobook.
  - **name** (string) - The name of the audiobook.
  - **narrators** (array of NarratorObject) - The narrator(s) for the audiobook.
    - **name** (string) - The name of the Narrator.
  - **publisher** (string) - The publisher of the audiobook.
  - **type** (string) - The object type. Allowed values: "audiobook"
  - **uri** (string) - The Spotify URI for the audiobook.
  - **total_chapters** (integer) - The number of chapters in this audiobook.

#### Response Example
```json
{
  "example": "{\"chapters\": [{\"audio_exclusive_content\": false, \"available_markets\": [\"CA\", \"US\"], \"copyrights\": [{\"text\": \"© 2023 Spotify AB\", \"type\": \"C\"}], \"description\": \"A thrilling tale of adventure.\", \"html_description\": \"<p>A thrilling tale of adventure.</p>\", \"edition\": \"First Edition\", \"explicit\": false, \"external_urls\": {\"spotify\": \"https://open.spotify.com/episode/exampleId\"}, \"href\": \"https://api.spotify.com/v1/chapters/exampleId\", \"id\": \"exampleId\", \"images\": [{\"height\": 300, \"url\": \"https://i.scdn.co/image/example.jpg\", \"width\": 300}], \"languages\": [\"en\"], \"media_type\": \"audiobook\", \"name\": \"Chapter 1: The Beginning\", \"narrators\": [{\"name\": \"John Doe\"}], \"publisher\": \"Example Publishing\", \"type\": \"audiobook\", \"uri\": \"spotify:chapter:exampleId\", \"total_chapters\": 10}]}"}
```
```

--------------------------------

### GET /albums

Source: https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums

Get one or more album objects by providing their Spotify IDs. You can also specify a market to filter available content.

```APIDOC
## GET /albums

### Description
Retrieve one or more album objects using their Spotify IDs. The `market` parameter can be used to filter content available in a specific country.

### Method
GET

### Endpoint
/albums

### Parameters
#### Query Parameters
- **ids** (string) - Required - A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.
  Example: `ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc`
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If specified, only content available in that market will be returned. If a valid user access token is provided, the user's country takes priority. If neither market nor user country is provided, content is considered unavailable.
  Example: `market=ES`

### Request Example
```
GET /v1/albums?ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo&market=ES
```

### Response
#### Success Response (200)
- **albums** (array) - An array of album objects.
- **album_type** (string) - The type of the album. 
- **artists** (array) - The artists who performed the album.
- **available_markets** (array) - The markets in which the album is available.
- **external_urls** (object) - Known external URLs for this album.
- **href** (string) - A link to the Web API endpoint providing full details of the album.
- **id** (string) - The Spotify ID for the album.
- **images** (array) - Images of the album.
- **name** (string) - The name of the album.
- **release_date** (string) - The date the album was first released.
- **release_date_precision** (string) - The precision with which `release_date` is known.
- **total_tracks** (integer) - The total number of tracks in the album.
- **type** (string) - The type of object. 
- **uri** (string) - The Spotify URI for the album.

#### Response Example
```json
{
  "albums": [
    {
      "album_type": "album",
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/6qqNVTkY8uBg9ml5tBj706"
          },
          "href": "https://api.spotify.com/v1/artists/6qqNVTkY8uBg9ml5tBj706",
          "id": "6qqNVTkY8uBg9ml5tBj706",
          "name": "The Weeknd",
          "type": "artist",
          "uri": "spotify:artist:6qqNVTkY8uBg9ml5tBj706"
        }
      ],
      "available_markets": [
        "CA",
        "MX",
        "US"
      ],
      "external_urls": {
        "spotify": "https://open.spotify.com/album/382ObEPsp2rxGrnsizN5TX"
      },
      "href": "https://api.spotify.com/v1/albums/382ObEPsp2rxGrnsizN5TX",
      "id": "382ObEPsp2rxGrnsizN5TX",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b2733f70377633135371f266371b",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e023f70377633135371f266371b",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/ab67616d000048513f70377633135371f266371b",
          "width": 64
        }
      ],
      "name": "After Hours",
      "release_date": "2020-03-20",
      "release_date_precision": "day",
      "total_tracks": 14,
      "type": "album",
      "uri": "spotify:album:382ObEPsp2rxGrnsizN5TX"
    }
  ]
}
```
```

--------------------------------

### GET /v1/shows/{id}

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-show

Get Spotify catalog information for a single show identified by its Spotify ID.

```APIDOC
## GET /v1/shows/{id}

### Description
Get Spotify catalog information for a single show identified by its Spotify ID.

### Method
GET

### Endpoint
https://api.spotify.com/v1/shows/{id}

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID for the show.

#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If provided, only tracks and episodes available in that market will be returned. If a valid market is specified, the value of `is_playable` will be true.

### Request Example
```
curl --request GET \
  --url https://api.spotify.com/v1/shows/38bS44xjbVVZ3No3ByF1dJ \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **id** (string) - The Spotify ID for the show.
- **name** (string) - The name of the show.
- **uri** (string) - The Spotify URI for the show.
- **external_urls** (object) - Known external URLs for this object.
- **images** (array of objects) - An array of images associated with the show. Widest first.
  - **url** (string) - The source URL of the image.
  - **height** (integer) - The image height in pixels.
  - **width** (integer) - The image width in pixels.
- **description** (string) - A description of the show. This field may contain limited HTML tags; please style and parse in the client.
- **publisher** (string) - The publisher of the show.
- **total_episodes** (integer) - The total number of episodes for this show.
- **available_markets** (array of strings) - A list of markets where the show is available.
- **copyrights** (array of objects) - Known copyright details for the show.
  - **text** (string) - The copyright text.
  - **type** (string) - The type of copyright.
- **explicit** (boolean) - Whether or not the show has explicit content.
- **type** (string) - The object type, currently 'show'.

#### Response Example
```json
{
  "id": "38bS44xjbVVZ3No3ByF1dJ",
  "name": "The Joe Rogan Experience",
  "uri": "spotify:show:38bS44xjbVVZ3No3ByF1dJ",
  "external_urls": {
    "spotify": "https://open.spotify.com/show/38bS44xjbVVZ3No3ByF1dJ"
  },
  "images": [
    {
      "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "height": 300,
      "width": 300
    }
  ],
  "description": "The Joe Rogan Experience is a podcast hosted by comedian Joe Rogan. It features a variety of guests, including comedians, athletes, musicians, and politicians.",
  "publisher": "Spotify",
  "total_episodes": 1500,
  "available_markets": ["US", "CA", "GB"],
  "copyrights": [
    {
      "text": "© 2023 The Joe Rogan Experience",
      "type": "C"
    }
  ],
  "explicit": true,
  "type": "show"
}
```
```

--------------------------------

### Get Several Tracks - HTTPie Request

Source: https://developer.spotify.com/documentation/web-api/reference/get-several-tracks

This snippet illustrates fetching multiple tracks using the HTTPie command-line tool. It requires an authorization token and a list of track IDs. The output is a JSON object containing detailed information for each track.

```bash
http --headers GET "https://api.spotify.com/v1/tracks?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B" "Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z"
```

--------------------------------

### GET /recommendations

Source: https://developer.spotify.com/documentation/web-api/reference/get-recommendations

Retrieve a list of recommended tracks based on available genre seeds, artist seeds, and track seeds.

```APIDOC
## GET /recommendations

### Description
This endpoint retrieves a list of recommended tracks based on various seed types such as artists, genres, and tracks. It allows for fine-tuning recommendations using additional parameters like target attributes and popularity.

### Method
GET

### Endpoint
/recommendations

### Parameters
#### Query Parameters
- **seed_artists** (string) - Optional - A comma-separated list of Spotify IDs for the artists you want to get recommendations for. Up to 5 seed artists are allowed.
- **seed_genres** (string) - Optional - A comma-separated list of genres you want to get recommendations for. Up to 5 genre seeds are allowed.
- **seed_tracks** (string) - Optional - A comma-separated list of Spotify IDs for the tracks you want to get recommendations for. Up to 5 seed tracks are allowed.
- **target_acousticness** (number) - Optional - The target value for acousticness. Range: 0.0 to 1.0.
- **target_danceability** (number) - Optional - The target value for danceability. Range: 0.0 to 1.0.
- **target_duration_ms** (integer) - Optional - The target value for duration in milliseconds.
- **target_energy** (number) - Optional - The target value for energy. Range: 0.0 to 1.0.
- **target_instrumentalness** (number) - Optional - The target value for instrumentalness. Range: 0.0 to 1.0.
- **target_key** (integer) - Optional - The target value for the key the track is in. Integers map to pitches using standard pitch notation.
- **target_liveness** (number) - Optional - The target value for liveness. Range: 0.0 to 1.0.
- **target_loudness** (number) - Optional - The target value for loudness in decibels (dB).
- **target_mode** (number) - Optional - The target value for mode. Major is 1 and Minor is 0.
- **target_popularity** (integer) - Optional - The target value for popularity. Range: 0 to 100.
- **target_speechiness** (number) - Optional - The target value for speechiness. Range: 0.0 to 1.0.
- **target_tempo** (number) - Optional - The target value for tempo in beats per minute (BPM).
- **target_time_signature** (integer) - Optional - The target value for the time signature.
- **target_valence** (number) - Optional - The target value for valence. Range: 0.0 to 1.0.
- **limit** (integer) - Optional - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 100.
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code or the keyword 'from_token'. Provide this parameter if you want the list of recommended tracks to be playable in a specific market.

### Response
#### Success Response (200)
- **seeds** (array) - An array of recommendation seed objects.
  - **afterFilteringSize** (integer) - The number of tracks available after min_* and max_* filters have been applied.
  - **afterRelinkingSize** (integer) - The number of tracks available after relinking for regional availability.
  - **href** (string) - A link to the full track or artist data for this seed.
  - **id** (string) - The id used to select this seed.
  - **initialPoolSize** (integer) - The number of recommended tracks available for this seed.
  - **type** (string) - The entity type of this seed (`artist`, `track`, or `genre`).
- **tracks** (array) - An array of track objects (simplified) ordered according to the parameters supplied.
  - **album** (object) - The album on which the track appears.
    - **album_type** (string) - The type of the album (`album`, `single`, `compilation`).
    - **total_tracks** (integer) - The number of tracks in the album.
    - **available_markets** (array of strings) - The markets in which the album is available.
    - **external_urls** (object) - Known external URLs for this album.
      - **spotify** (string) - The Spotify URL for the object.
    - **href** (string) - A link to the Web API endpoint providing full details of the album.
    - **id** (string) - The Spotify ID for the album.
    - **images** (array of ImageObject) - The cover art for the album.
    - **name** (string) - The name of the album.
    - **release_date** (string) - The date the album was first released.
    - **release_date_precision** (string) - The precision of the release date (`year`, `month`, `day`).
    - **restrictions** (object) - Included if a content restriction is applied.
      - **reason** (string) - The reason for the restriction.
    - **type** (string) - The object type (`album`).
    - **uri** (string) - The Spotify URI for the album.
    - **artists** (array of SimplifiedArtistObject) - The artists of the album.
  - **artists** (array of SimplifiedArtistObject) - The artists who performed the track.
  - **available_markets** (array of strings) - A list of countries where the track can be played.
  - **disc_number** (integer) - The disc number.
  - **duration_ms** (integer) - The track length in milliseconds.
  - **explicit** (boolean) - Indicates if the track is explicit.

#### Error Response
- **401** - Unauthorized: The request requires authentication.
- **403** - Forbidden: The authenticated user does not have permission to access the requested resource.
- **429** - Too Many Requests: The rate limit for the API has been exceeded.

### Request Example
```json
{
  "seeds": [
    {
      "afterFilteringSize": 1000,
      "afterRelinkingSize": 950,
      "href": "https://api.spotify.com/v1/artists/4NHQUffQyix7R0uXWfHk0f",
      "id": "4NHQUffQyix7R0uXWfHk0f",
      "initialPoolSize": 1200,
      "type": "artist"
    }
  ],
  "tracks": [
    {
      "album": {
        "album_type": "album",
        "total_tracks": 10,
        "available_markets": ["CA", "BR", "IT"],
        "external_urls": {
          "spotify": "https://open.spotify.com/album/2up3OPMp9Tb4dAKM2erWXQ"
        },
        "href": "https://api.spotify.com/v1/albums/2up3OPMp9Tb4dAKM2erWXQ",
        "id": "2up3OPMp9Tb4dAKM2erWXQ",
        "images": [
          {
            "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            "height": 300,
            "width": 300
          }
        ],
        "name": "Album Name",
        "release_date": "1981-12",
        "release_date_precision": "year",
        "restrictions": {
          "reason": "market"
        },
        "type": "album",
        "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4NHQUffQyix7R0uXWfHk0f"
            },
            "href": "https://api.spotify.com/v1/artists/4NHQUffQyix7R0uXWfHk0f",
            "id": "4NHQUffQyix7R0uXWfHk0f",
            "name": "Artist Name",
            "type": "artist",
            "uri": "spotify:artist:4NHQUffQyix7R0uXWfHk0f"
          }
        ]
      },
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/4NHQUffQyix7R0uXWfHk0f"
          },
          "href": "https://api.spotify.com/v1/artists/4NHQUffQyix7R0uXWfHk0f",
          "id": "4NHQUffQyix7R0uXWfHk0f",
          "name": "Artist Name",
          "type": "artist",
          "uri": "spotify:artist:4NHQUffQyix7R0uXWfHk0f"
        }
      ],
      "available_markets": ["CA", "BR", "IT"],
      "disc_number": 1,
      "duration_ms": 200000,
      "explicit": false
    }
  ]
}
```
```

--------------------------------

### Fetch New Releases (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-new-releases

Example of how to fetch new album releases from the Spotify Web API using cURL. This request requires an authorization header with a valid access token.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/browse/new-releases \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### GET /playlists/{playlist_id}/tracks

Source: https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks

Get a list of the playlists owned by a Spotify user.

```APIDOC
## GET /playlists/{playlist_id}/tracks

### Description
Retrieves a list of tracks or episodes included in a specific playlist.

### Method
GET

### Endpoint
/playlists/{playlist_id}/tracks

### Parameters
#### Path Parameters
- **playlist_id** (string) - Required - The Spotify ID of the playlist.

#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned. If a valid user access token is specified, the country associated with the user account will take priority. If neither market nor user country are provided, the content is considered unavailable.
- **fields** (string) - Optional - Filters for the query: a comma-separated list of the fields to return. Use dot notation for nested fields and parentheses for recurring fields. Fields can be excluded by prefixing with an exclamation mark.
- **limit** (integer) - Optional - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
- **offset** (integer) - Optional - The index of the first item to return. Default: 0.
- **additional_types** (string) - Optional - A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.

### Request Example
```json
{
  "example": "GET https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks?market=ES&fields=items(added_by.id,track(name,href,album(name,href)))&limit=10&offset=5"
}
```

### Response
#### Success Response (200)
- **items** (array) - The tracks or episodes in the playlist.
- **next** (string) - URL to the next page of items.
- **offset** (integer) - The offset from the beginning of the playlist.
- **previous** (string) - URL to the previous page of items.
- **total** (integer) - The total number of items in the playlist.

#### Response Example
```json
{
  "example": {
    "href": "https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks?offset=0&limit=100",
    "items": [
      {
        "added_at": "2023-01-01T10:00:00Z",
        "added_by": {
          "external_urls": {
            "spotify": "https://open.spotify.com/user/exampleuser"
          },
          "href": "https://api.spotify.com/v1/users/exampleuser",
          "id": "exampleuser",
          "type": "user",
          "uri": "spotify:user:exampleuser"
        },
        "is_local": false,
        "track": {
          "album": {
            "album_type": "album",
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/exampleartist"
                },
                "href": "https://api.spotify.com/v1/artists/exampleartist",
                "id": "exampleartist",
                "name": "Example Artist",
                "type": "artist",
                "uri": "spotify:artist:exampleartist"
              }
            ],
            "external_urls": {
              "spotify": "https://open.spotify.com/album/examplealbum"
            },
            "href": "https://api.spotify.com/v1/albums/examplealbum",
            "id": "examplealbum",
            "images": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/exampleimage",
                "width": 640
              }
            ],
            "name": "Example Album",
            "release_date": "2023-01-01",
            "release_date_precision": "day",
            "total_tracks": 10,
            "type": "album",
            "uri": "spotify:album:examplealbum"
          },
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/exampleartist"
              },
              "href": "https://api.spotify.com/v1/artists/exampleartist",
              "id": "exampleartist",
              "name": "Example Artist",
              "type": "artist",
              "uri": "spotify:artist:exampleartist"
            }
          ],
          "disc_number": 1,
          "duration_ms": 200000,
          "explicit": false,
          "external_ids": {
            "isrc": "XX1234567890"
          },
          "external_urls": {
            "spotify": "https://open.spotify.com/track/exampletrack"
          },
          "href": "https://api.spotify.com/v1/tracks/exampletrack",
          "id": "exampletrack",
          "is_playable": true,
          "name": "Example Track",
          "popularity": 80,
          "preview_url": "https://p.scdn.co/mp3-preview/examplepreview",
          "track_number": 1,
          "type": "track",
          "uri": "spotify:track:exampletrack"
        },
        "video_thumbnail": {
          "url": null
        }
      }
    ],
    "limit": 100,
    "next": "https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks?offset=100&limit=100",
    "offset": 0,
    "previous": null,
    "total": 150
  }
}
```
```

--------------------------------

### Player API - Start/Resume Playback

Source: https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback

Starts or resumes playback on the user's active device. Requires Spotify Premium and the 'user-modify-playback-state' scope.

```APIDOC
## POST /me/player/play

### Description
Starts a new context or resumes current playback on the user's active device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.

### Method
POST

### Endpoint
/me/player/play

### Parameters
#### Query Parameters
- **device_id** (string) - Optional - The ID of the device this request should be directed to.

#### Request Body
- **context_uri** (string) - Optional - Spotify URI of the context to play. Examples: "spotify:album:5ht7awnx4Z7wA97x05oG0V", "spotify:playlist:37i9dQZF1f0sijW4M0f5qM"
- **uris** (array of strings) - Optional - Spotify URIs of the context to play. Example: ["spotify:track:4iV5W9uY57xrZ<seg_125>izfV"]
- **offset** (object) - Optional - An object containing a Spotify URI for the context or track to start playback from.
  - **uri** (string) - Required - The URI of the context or track to start playback from.
  - **position_ms** (integer) - Optional - The position in milliseconds to start playback from.

### Request Example
```json
{
  "context_uri": "spotify:album:5ht7awnx4Z7wA97x05oG0V",
  "offset": {
    "uri": "spotify:track:4iV5W9uY57xrZ<seg_125>izfV"
  },
  "position_ms": 0
}
```

### Response
#### Success Response (204 No Content)
This endpoint does not return a response body on success.

#### Error Response
- **400 Bad Request**: The request could not be understood or was invalid.
- **401 Unauthorized**: The request requires user authentication.
- **403 Forbidden**: The authenticated user does not have the required scopes or permissions.
- **404 Not Found**: The requested resource could not be found.
- **429 Too Many Requests**: The rate limit has been exceeded.

### Authorization scopes
- user-modify-playback-state: Control playback on your Spotify clients and Spotify Connect devices.
```

--------------------------------

### GET /v1/artists

Source: https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists

Get Spotify catalog information for a single or multiple artists based on their Spotify IDs.

```APIDOC
## GET /v1/artists

### Description
Get Spotify catalog information for a single or multiple artists based on their Spotify IDs.

### Method
GET

### Endpoint
https://api.spotify.com/v1/artists

#### Query Parameters
- **ids** (string) - Required - A comma-separated list of the Spotify IDs for the artists. Maximum of 50 IDs.

### Request Example
```
curl --request GET \
  --url 'https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **artists** (array) - An array of Artist Objects. The array may be empty if no artists are found for the given IDs.

##### ArtistObject
- **external_urls** (object) - Known external URLs for this artist.
  - **spotify** (string) - The Spotify URL for the object.
- **followers** (object) - Information about the followers of the artist.
  - **href** (string) - Nullable. This will always be set to null, as the Web API does not support it at the moment.
  - **total** (integer) - The total number of followers.
- **genres** (array of strings) - A list of the genres the artist is associated with. If not yet classified, the array is empty.
- **href** (string) - A link to the Web API endpoint providing full details of the artist.
- **id** (string) - The Spotify ID for the artist.
- **images** (array of ImageObject) - Images of the artist in various sizes, widest first.
  - **url** (string) - Required. The source URL of the image.
  - **height** (integer) - Required. The image height in pixels.
  - **width** (integer) - Required. The image width in pixels.
- **name** (string) - The name of the artist.
- **popularity** (integer) - The popularity of the artist. The value will be between 0 and 100.
- **type** (string) - The object type. Allowed values: "artist"
- **uri** (string) - The Spotify URI for the artist.

#### Response Example
```json
{
  "artists": [
    {
      "external_urls": {
        "spotify": "string"
      },
      "followers": {
        "href": "string",
        "total": 0
      },
      "genres": ["Prog rock", "Grunge"],
      "href": "string",
      "id": "string",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          "height": 300,
          "width": 300
        }
      ],
      "name": "string",
      "popularity": 0,
      "type": "artist",
      "uri": "string"
    }
  ]
}
```

#### Error Response
- **401** Unauthorized
- **403** Forbidden
- **429** Too Many Requests
```

--------------------------------

### Create Playlist Request Sample (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/create-playlist-for-user

This snippet demonstrates how to create a new playlist using the Spotify Web API with a POST request. It includes headers for authorization and content type, along with a JSON payload specifying the playlist's name, description, and public status.

```bash
curl --request POST \
  --url https://api.spotify.com/v1/users/smedjan/playlists \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "New Playlist",
    "description": "New playlist description",
    "public": false
}'
```

--------------------------------

### GET /v1/tracks/{id}

Source: https://developer.spotify.com/documentation/web-api/reference/get-track

Get Spotify catalog information for a single track identified by its Spotify ID.

```APIDOC
## GET /v1/tracks/{id}

### Description
Retrieve detailed information about a specific track using its Spotify ID. This endpoint provides data such as track name, artist, album, popularity, and preview URL.

### Method
GET

### Endpoint
`/v1/tracks/{id}`

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID for the track.

#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code or the keyword `from_token`. Provide this parameter if you want the response to be localized to a specific market. If omitted, the general track information will be returned.

### Request Example
```curl
curl --request GET \
  --url https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **album** (object) - Information about the album the track belongs to.
- **artists** (array) - The artists who performed the track.
- **available_markets** (array) - A list of markets where the track is available.
- **disc_number** (integer) - The disc number.
- **duration_ms** (integer) - The duration of the track in milliseconds.
- **explicit** (boolean) - Whether or not the track has explicit content.
- **external_ids** (object) - External IDs for the track (e.g., ISRC, EAN, UPC).
- **external_urls** (object) - Known external URLs for this track.
- **href** (string) - A link to the Web API endpoint providing full details of the track.
- **id** (string) - The Spotify ID for the track.
- **is_playable** (boolean) - Whether or not the track is playable in the given market.
- **linked_from** (object) - Part of a playlist object. If the track is a local track, this field will be null.
- **restrictions** (object) - Restrictions for the track, if any.
- **name** (string) - The name of the track.
- **popularity** (integer) - The popularity of the track. The value will be between 0 and 100.
- **preview_url** (string) - A link to a 30 second preview (MP3 format) of the track. Can be `null`.
- **track_number** (integer) - The number of the track.
- **type** (string) - The object type: "track".
- **uri** (string) - The Spotify URI for the track.
- **is_local** (boolean) - Whether or not the track is from a local file.

#### Response Example
```json
{
  "album": {
    "album_type": "compilation",
    "total_tracks": 9,
    "available_markets": ["CA", "BR", "IT"],
    "external_urls": {
      "spotify": "string"
    },
    "href": "string",
    "id": "2up3OPMp9Tb4dAKM2erWXQ",
    "images": [
      {
        "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
        "height": 300,
        "width": 300
      }
    ],
    "name": "string",
    "release_date": "1981-12",
    "release_date_precision": "year",
    "restrictions": {
      "reason": "market"
    },
    "type": "album",
    "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
    "artists": [
      {
        "external_urls": {
          "spotify": "string"
        },
        "href": "string",
        "id": "string",
        "name": "string",
        "type": "artist",
        "uri": "string"
      }
    ]
  },
  "artists": [
    {
      "external_urls": {
        "spotify": "string"
      },
      "href": "string",
      "id": "string",
      "name": "string",
      "type": "artist",
      "uri": "string"
    }
  ],
  "available_markets": ["string"],
  "disc_number": 0,
  "duration_ms": 0,
  "explicit": false,
  "external_ids": {
    "isrc": "string",
    "ean": "string",
    "upc": "string"
  },
  "external_urls": {
    "spotify": "string"
  },
  "href": "string",
  "id": "string",
  "is_playable": false,
  "linked_from": {  },
  "restrictions": {
    "reason": "string"
  },
  "name": "string",
  "popularity": 0,
  "preview_url": "string",
  "track_number": 0,
  "type": "track",
  "uri": "string",
  "is_local": false
}
```
```

--------------------------------

### GET /v1/me/player/recently-played

Source: https://developer.spotify.com/documentation/web-api/reference/get-recently-played

Get a list of the objects that the user has most recently played. This includes the track and the context it was played from.

```APIDOC
## GET /v1/me/player/recently-played

### Description
Retrieves a list of the user's recently played tracks, including the context from which they were played.

### Method
GET

### Endpoint
https://api.spotify.com/v1/me/player/recently-played

#### Query Parameters
- **limit** (integer) - Optional - The maximum number of items to return. Default: 20. Maximum: 50.
- **after** (integer) - Optional - A Unix timestamp in milliseconds. Returns objects after the specified time.
- **before** (integer) - Optional - A Unix timestamp in milliseconds. Returns objects before the specified time.

### Request Example
```curl
curl --request GET \
  --url https://api.spotify.com/v1/me/player/recently-played \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **items** (array) - A list of recently played items.
  - **track** (object) - Information about the track.
    - **external_urls** (object) - Known external URLs for this track.
      - **spotify** (string) - The Spotify URL for the object.
    - **href** (string) - A link to the Web API endpoint providing full details of the track.
    - **id** (string) - The Spotify ID for the track.
    - **is_playable** (boolean) - Whether the track is playable in the given market.
    - **linked_from** (object) - Information about the originally requested track if it was replaced.
    - **restrictions** (object) - Included if a content restriction is applied.
      - **reason** (string) - The reason for the restriction (e.g., 'market', 'product', 'explicit').
    - **name** (string) - The name of the track.
    - **popularity** (integer) - The popularity of the track (0-100).
    - **preview_url** (string) - A link to a 30-second preview of the track (can be null).
    - **track_number** (integer) - The track number on the album.
    - **type** (string) - The object type: "track".
    - **uri** (string) - The Spotify URI for the track.
    - **is_local** (boolean) - Whether the track is from a local file.
  - **played_at** (string [date-time]) - The date and time the track was played.
  - **context** (object) - The context the track was played from.
    - **type** (string) - The object type (e.g., "artist", "playlist", "album", "show").
    - **href** (string) - A link to the Web API endpoint providing full details of the context.
    - **external_urls** (object) - External URLs for this context.
      - **spotify** (string) - The Spotify URL for the object.
    - **uri** (string) - The Spotify URI for the context.

#### Response Example
```json
{
  "items": [
    {
      "track": {
        "external_urls": {
          "spotify": "https://open.spotify.com/track/1dfIA59f0r3aYgYI1s7ZzQ"
        },
        "href": "https://api.spotify.com/v1/tracks/1dfIA59f0r3aYgYI1s7ZzQ",
        "id": "1dfIA59f0r3aYgYI1s7ZzQ",
        "is_playable": true,
        "name": "Example Track Name",
        "popularity": 85,
        "preview_url": "https://p.scdn.co/mp3-preview/examplepreviewurl",
        "track_number": 5,
        "type": "track",
        "uri": "spotify:track:1dfIA59f0r3aYgYI1s7ZzQ",
        "is_local": false
      },
      "played_at": "2023-10-27T10:00:00Z",
      "context": {
        "type": "playlist",
        "href": "https://api.spotify.com/v1/playlists/exampleplaylistid",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/exampleplaylistid"
        },
        "uri": "spotify:playlist:exampleplaylistid"
      }
    }
  ],
  "next": "https://api.spotify.com/v1/me/player/recently-played?limit=1&after=1698397200000",
  "cursors": {
    "after": "1698397200000"
  }
}
```
```

--------------------------------

### Get Several Albums

Source: https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums

Get Spotify catalog information for a comma separated list of Spotify IDs. For a maximum of 20 Spotify IDs.

```APIDOC
## GET /v1/albums

### Description
Retrieves Spotify catalog information for a comma-separated list of Spotify IDs. This endpoint supports a maximum of 20 IDs per request.

### Method
GET

### Endpoint
`/v1/albums`

### Parameters
#### Query Parameters
- **ids** (string) - Required - A comma-separated list of Spotify IDs for the albums. Maximum of 20 IDs.
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code or the keyword `from_token`. Provide this parameter if you want the response to be localized to a specific market.

### Request Example
```json
{
  "example": "curl --request GET \
  --url 'https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'"
}
```

### Response
#### Success Response (200)
- **albums** (array of AlbumObject) - Information about the albums.

#### Response Example
```json
{
  "example": "{\"albums\": [{\"album_type\": \"album\", \"artists\": [{\"external_urls\": {\"spotify\": \"https://open.spotify.com/artist/6qqNVTkY4uBg6UI1ksGRt1\"}, \"href\": \"https://api.spotify.com/v1/artists/6qqNVTkY4uBg6UI1ksGRt1\", \"id\": \"6qqNVTkY4uBg6UI1ksGRt1\", \"name\": \"Coldplay\", \"type\": \"artist\", \"uri\": \"spotify:artist:6qqNVTkY4uBg6UI1ksGRt1\"}], \"external_urls\": {\"spotify\": \"https://open.spotify.com/album/382ObEPsp2rxGrnsizN5TX\"}, \"href\": \"https://api.spotify.com/v1/albums/382ObEPsp2rxGrnsizN5TX\", \"id\": \"382ObEPsp2rxGrnsizN5TX\", \"images\": [{\"height\": 640, \"url\": \"https://i.scdn.co/image/ab67616d0000b2736707c34d9359369407707800\", \"width\": 640}, {\"height\": 300, \"url\": \"https://i.scdn.co/image/ab67616d00001e026707c34d9359369407707800\", \"width\": 300}, {\"height\": 64, \"url\": \"https://i.scdn.co/image/ab67616d000044d46707c34d9359369407707800\", \"width\": 64}], \"name\": \"Music Of The Spheres\", \"release_date\": \"2021-10-22\", \"release_date_precision\": \"day\", \"total_tracks\": 12, \"type\": \"album\", \"uri\": \"spotify:album:382ObEPsp2rxGrnsizN5TX\"}, {\"album_type\": \"album\", \"artists\": [{\"external_urls\": {\"spotify\": \"https://open.spotify.com/artist/77Ai0qI95K0iy9v7Pz114E\"}, \"href\": \"https://api.spotify.com/v1/artists/77Ai0qI95K0iy9v7Pz114E\", \"id\": \"77Ai0qI95K0iy9v7Pz114E\", \"name\": \"Taylor Swift\", \"type\": \"artist\", \"uri\": \"spotify:artist:77Ai0qI95K0iy9v7Pz114E\"}], \"external_urls\": {\"spotify\": \"https://open.spotify.com/album/1A2GTWGtFfWp7KSQTwWOyo\"}, \"href\": \"https://api.spotify.com/v1/albums/1A2GTWGtFfWp7KSQTwWOyo\", \"id\": \"1A2GTWGtFfWp7KSQTwWOyo\", \"images\": [{\"height\": 640, \"url\": \"https://i.scdn.co/image/ab67616d0000b2731c9799131f250583335f2208\", \"width\": 640}, {\"height\": 300, \"url\": \"https://i.scdn.co/image/ab67616d00001e021c9799131f250583335f2208\", \"width\": 300}, {\"height\": 64, \"url\": \"https://i.scdn.co/image/ab67616d000044d41c9799131f250583335f2208\", \"width\": 64}], \"name\": \"Midnights\", \"release_date\": \"2022-10-21\", \"release_date_precision\": \"day\", \"total_tracks\": 13, \"type\": \"album\", \"uri\": \"spotify:album:1A2GTWGtFfWp7KSQTwWOyo\"}, {\"album_type\": \"album\", \"artists\": [{\"external_urls\": {\"spotify\": \"https://open.spotify.com/artist/0du5cTTI U3z8hA7K0e9i7T\"}, \"href\": \"https://api.spotify.com/v1/artists/0du5cTTIU3z8hA7K0e9i7T\", \"id\": \"0du5cTTIU3z8hA7K0e9i7T\", \"name\": \"The Weeknd\", \"type\": \"artist\", \"uri\": \"spotify:artist:0du5cTTIU3z8hA7K0e9i7T\"}], \"external_urls\": {\"spotify\": \"https://open.spotify.com/album/2noRn2Aes5aoNVsU6iWThc\"}, \"href\": \"https://api.spotify.com/v1/albums/2noRn2Aes5aoNVsU6iWThc\", \"id\": \"2noRn2Aes5aoNVsU6iWThc\", \"images\": [{\"height\": 640, \"url\": \"https://i.scdn.co/image/ab67616d0000b2733c89673096184760e5917771\", \"width\": 640}, {\"height\": 300, \"url\": \"https://i.scdn.co/image/ab67616d00001e023c89673096184760e5917771\", \"width\": 300}, {\"height\": 64, \"url\": \"https://i.scdn.co/image/ab67616d000044d43c89673096184760e5917771\", \"width\": 64}], \"name\": \"Dawn FM (Alternate World)\", \"release_date\": \"2022-01-07\", \"release_date_precision\": \"day\", \"total_tracks\": 17, \"type\": \"album\", \"uri\": \"spotify:album:2noRn2Aes5aoNVsU6iWThc\"}]}
```

```text

```

```text

```

```text

```

--------------------------------

### Scaffold New Project with Vite (TypeScript/JavaScript)

Source: https://developer.spotify.com/documentation/web-api/howtos/web-app-profile

Scaffolds a new project using Vite with either TypeScript or JavaScript as the template. This command initializes a basic project structure, ready for development.

```bash
npm create vite@latest spotify-profile-demo -- --template vanilla-ts
```

--------------------------------

### Save Tracks to User Library (cURL Example)

Source: https://developer.spotify.com/documentation/web-api/reference/save-tracks-user

This cURL command shows how to make a PUT request to the Spotify Web API to save tracks for the current user. It includes the necessary authorization header and specifies the track IDs and timestamps in the JSON request body. Ensure you replace placeholder values with actual data.

```bash
curl --request PUT \
  --url https://api.spotify.com/v1/me/tracks \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z' \
  --header 'Content-Type: application/json' \
  --data '{ \
    "ids": [ \
        "string" \
    ], \
    "timestamped_ids": [ \
        { \
            "id": "string", \
            "added_at": "string" \
        } \
    ] \
}'
```

--------------------------------

### GET /me/player/queue

Source: https://developer.spotify.com/documentation/web-api/reference/get-queue

Get the User's Queue. This endpoint retrieves the user's current playback queue, including tracks and episodes.

```APIDOC
## GET /me/player/queue

### Description
Retrieves the user's current playback queue, including tracks and episodes.

### Method
GET

### Endpoint
https://api.spotify.com/v1/me/player/queue

### Parameters
#### Query Parameters
- **device_id** (string) - Optional - The ID of the device this request is intended for. If not specified, the playback is assumed to be on the user's active device.

### Request Example
```json
{
  "example": "curl --request GET \
  --url https://api.spotify.com/v1/me/player/queue \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'"
}
```

### Response
#### Success Response (200)
- **tracks** (array) - An array of track objects currently in the playback queue.
- **currently_playing** (object) - The currently playing track or episode object.
- **queue** (array) - An array of track or episode objects that are next in the queue.

#### Response Example
```json
{
  "example": "{\"tracks\": [...], \"currently_playing\": {...}, \"queue\": [...]}"
}
```
```

--------------------------------

### GET /recommendations

Source: https://developer.spotify.com/documentation/web-api/reference/get-recommendations

Retrieve recommendations for tracks based on given seeds (artists, genres, tracks) and tunable track attributes.

```APIDOC
## GET /recommendations

### Description
Retrieve recommendations for tracks based on given seeds (artists, genres, tracks) and tunable track attributes. You can specify parameters like `limit`, `market`, `seed_artists`, `seed_genres`, `seed_tracks`, and various tunable attributes such as `min_acousticness`, `max_danceability`, and `target_energy`.

### Method
GET

### Endpoint
/recommendations

### Parameters
#### Query Parameters
- **limit** (integer) - Optional - The target size of the list of recommended tracks. Default: 20. Range: 1 - 100.
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If specified, only content available in that market will be returned. User's country takes priority if a valid access token is provided.
- **seed_artists** (string) - Required (if seed_genres and seed_tracks are not set) - A comma-separated list of Spotify IDs for seed artists. Up to 5 seed values can be provided in combination with seed_tracks and seed_genres.
- **seed_genres** (string) - Required (if seed_artists and seed_tracks are not set) - A comma-separated list of available genre seeds. Up to 5 seed values can be provided in combination with seed_artists and seed_tracks.
- **seed_tracks** (string) - Required (if seed_artists and seed_genres are not set) - A comma-separated list of Spotify IDs for seed tracks. Up to 5 seed values can be provided in combination with seed_artists and seed_genres.
- **min_acousticness** (number) - Optional - A hard floor for the acousticness value. Range: 0 - 1.
- **max_acousticness** (number) - Optional - A hard ceiling for the acousticness value. Range: 0 - 1.
- **target_acousticness** (number) - Optional - A target value for acousticness. Tracks with values nearest to the target will be preferred. Range: 0 - 1.
- **min_danceability** (number) - Optional - A hard floor for the danceability value. Range: 0 - 1.
- **max_danceability** (number) - Optional - A hard ceiling for the danceability value. Range: 0 - 1.
- **target_danceability** (number) - Optional - A target value for danceability. Tracks with values nearest to the target will be preferred. Range: 0 - 1.
- **min_duration_ms** (integer) - Optional - A hard floor for the duration of the track in milliseconds.
- **max_duration_ms** (integer) - Optional - A hard ceiling for the duration of the track in milliseconds.
- **target_duration_ms** (integer) - Optional - A target duration for the track in milliseconds.
- **min_energy** (number) - Optional - A hard floor for the energy value. Range: 0 - 1.

### Request Example
```
GET /recommendations?limit=10&market=ES&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical,country&target_danceability=0.8
```

### Response
#### Success Response (200)
- **tracks** (array) - A list of recommended track objects.
- **seeds** (array) - The seeds used for the recommendation.

#### Response Example
```json
{
  "tracks": [
    {
      "album": {
        "album_type": "album",
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4NHQUGzhtTLFvgF5SZesLK"
            },
            "href": "https://api.spotify.com/v1/artists/4NHQUGzhtTLFvgF5SZesLK",
            "id": "4NHQUGzhtTLFvgF5SZesLK",
            "name": "Artist Name",
            "type": "artist",
            "uri": "spotify:artist:4NHQUGzhtTLFvgF5SZesLK"
          }
        ],
        "external_urls": {
          "spotify": "https://open.spotify.com/album/12345"
        },
        "href": "https://api.spotify.com/v1/albums/12345",
        "id": "12345",
        "images": [
          {
            "height": 640,
            "url": "https://i.scdn.co/image/abc123def456",
            "width": 640
          }
        ],
        "name": "Album Name",
        "release_date": "2023-01-01",
        "release_date_precision": "day",
        "total_tracks": 10,
        "type": "album",
        "uri": "spotify:album:12345"
      },
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/4NHQUGzhtTLFvgF5SZesLK"
          },
          "href": "https://api.spotify.com/v1/artists/4NHQUGzhtTLFvgF5SZesLK",
          "id": "4NHQUGzhtTLFvgF5SZesLK",
          "name": "Artist Name",
          "type": "artist",
          "uri": "spotify:artist:4NHQUGzhtTLFvgF5SZesLK"
        }
      ],
      "disc_number": 1,
      "duration_ms": 200000,
      "explicit": false,
      "external_ids": {
        "isrc": "USABC1234567"
      },
      "external_urls": {
        "spotify": "https://open.spotify.com/track/789xyz"
      },
      "href": "https://api.spotify.com/v1/tracks/789xyz",
      "id": "789xyz",
      "is_local": false,
      "name": "Track Name",
      "popularity": 80,
      "preview_url": "https://p.scdn.co/mp3-preview/abcdef1234567890",
      "track_number": 1,
      "type": "track",
      "uri": "spotify:track:789xyz"
    }
  ],
  "seeds": [
    {
      "afterFilteringSize": 500,
      "afterRelinkingSize": 500,
      "id": "4NHQUGzhtTLFvgF5SZesLK",
      "initialSize": 500,
      "type": "artist"
    }
  ]
}
```
```

--------------------------------

### Add Items to Playlist (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist

Example using cURL to add items to a Spotify playlist. It demonstrates the POST request to the /playlists/{playlist_id}/tracks endpoint, including authorization, content type, and the request body with URIs and an optional position.

```shell
curl --request POST \
  --url https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z' \
  --header 'Content-Type: application/json' \
  --data '{ \
    "uris": [ \
        "string" \
    ], \
    "position": 0 \
}'
```

--------------------------------

### Get Current Playback Information (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback

This snippet demonstrates how to fetch the user's current playback state using a cURL command. It requires an Authorization header with a valid Bearer token. The response includes details about the playing item, device, playback state, and available actions.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/me/player \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### GET /v1/users/{user_id}

Source: https://developer.spotify.com/documentation/web-api/reference/get-users-profile

Get a User's Profile. This endpoint retrieves the public profile information of a Spotify user.

```APIDOC
## GET /v1/users/{user_id}

### Description
Retrieves the public profile information of a Spotify user based on their user ID.

### Method
GET

### Endpoint
`/v1/users/{user_id}`

### Parameters
#### Path Parameters
- **user_id** (string) - Required - The Spotify ID for the user.

### Request Example
```curl
curl --request GET \
  --url https://api.spotify.com/v1/users/smedjan \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **display_name** (string) - The name displayed on the user's profile. Null if not available.
- **external_urls** (object) - Known public external URLs for this user.
  - **spotify** (string) - The Spotify URL for the object.
- **followers** (object) - Information about the followers of this user.
  - **href** (string) - This will always be set to null, as the Web API does not support it at the moment.
  - **total** (integer) - The total number of followers.
- **href** (string) - A link to the Web API endpoint for this user.
- **id** (string) - The Spotify user ID for this user.
- **images** (array of ImageObject) - The user's profile image.
  - **url** (string) - The source URL of the image.
  - **height** (integer) - The image height in pixels.
  - **width** (integer) - The image width in pixels.
- **type** (string) - The object type. Allowed values: "user".
- **uri** (string) - The Spotify URI for this user.

#### Response Example
```json
{
  "display_name": "string",
  "external_urls": {
    "spotify": "string"
  },
  "followers": {
    "href": "string",
    "total": 0
  },
  "href": "string",
  "id": "string",
  "images": [
    {
      "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "height": 300,
      "width": 300
    }
  ],
  "type": "user",
  "uri": "string"
}
```

#### Error Responses
- **401** - Unauthorized: The request requires authentication.
- **403** - Forbidden: The server understood the request but refuses to authorize it.
- **429** - Too Many Requests: The rate limit has been exceeded.
```

--------------------------------

### GET /me/episodes

Source: https://developer.spotify.com/documentation/web-api/reference/search

Get a list of episodes saved by the current Spotify user. This endpoint retrieves episodes the user has saved or followed.

```APIDOC
## GET /me/episodes

### Description
Retrieves a list of episodes saved by the current Spotify user.

### Method
GET

### Endpoint
/me/episodes

### Query Parameters
- **limit** (integer) - Optional - The maximum number of episodes to return.
- **offset** (integer) - Optional - The number of episodes to skip over before returning results.
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If provided, only episodes available in the specified market will be returned.

### Request Example
```
GET /me/episodes?limit=10&offset=0&market=US
```

### Response
#### Success Response (200)
- **items** (array) - A list of episode objects.
  - **audio_preview_url** (string) - URL to the audio preview of the episode. Null if not available.
  - **description** (string) - The description of the episode.
  - **html_description** (string) - The HTML description of the episode.
  - **duration_ms** (integer) - The duration of the episode in milliseconds.
  - **explicit** (boolean) - Whether the episode contains explicit content.
  - **external_urls** (object) - Known external URLs for this object.
    - **spotify** (string) - A URL to the Spotify web SDK endpoint of the object.
  - **href** (string) - A link to the Web API endpoint for this episode.
  - **id** (string) - The Spotify ID for the episode.
  - **images** (array of objects) - The cover art for the episode in various sizes.
    - **url** (string) - The source URL of the image.
    - **height** (integer) - The height of the image in pixels.
    - **width** (integer) - The width of the image in pixels.
  - **is_externally_hosted** (boolean) - Whether the episode is externally hosted.
  - **is_playable** (boolean) - Whether the episode is playable in the given market.
  - **language** (string) - The language of the episode (e.g., "en").
  - **languages** (array of strings) - A list of languages the episode is available in.
  - **name** (string) - The name of the episode.
  - **release_date** (string) - The release date of the episode (YYYY-MM-DD).
  - **release_date_precision** (string) - The precision of the release date ('year', 'month', or 'day').
  - **resume_point** (object) - The user's resume point for the episode.
    - **fully_played** (boolean) - Whether the episode has been fully played.
    - **resume_position_ms** (integer) - The position in milliseconds to resume playback from.
  - **type** (string) - The object type: "episode".
  - **uri** (string) - The Spotify URI for the episode.
  - **restrictions** (object) - Any restrictions for the episode.
    - **reason** (string) - The reason for the restriction.

#### Response Example
```json
{
  "episodes": {
    "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
    "limit": 20,
    "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    "offset": 0,
    "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    "total": 4,
    "items": [
      {
        "audio_preview_url": "https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17",
        "description": "A Spotify podcast sharing fresh insights...",
        "html_description": "<p>A Spotify podcast sharing fresh insights...</p>",
        "duration_ms": 1686230,
        "explicit": false,
        "external_urls": {
          "spotify": "string"
        },
        "href": "https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ",
        "id": "5Xt5DXGzch68nYYamXrNxZ",
        "images": [
          {
            "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            "height": 300,
            "width": 300
          }
        ],
        "is_externally_hosted": false,
        "is_playable": true,
        "language": "en",
        "languages": ["fr", "en"],
        "name": "Starting Your Own Podcast",
        "release_date": "1981-12-15",
        "release_date_precision": "day",
        "resume_point": {
          "fully_played": false,
          "resume_position_ms": 0
        },
        "type": "episode",
        "uri": "spotify:episode:0zLhl3WsOCQHbe1BPTiHgr",
        "restrictions": {
          "reason": "string"
        }
      }
    ]
  }
}
```
```

--------------------------------

### Get Spotify Albums by IDs (Wget)

Source: https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums

This snippet shows how to fetch album data from the Spotify Web API using Wget. It requires an authentication token and a list of album IDs. The output contains detailed information about the specified albums.

```shell
wget --header="Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z" "https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc"
```

--------------------------------

### Regular Error Object Example

Source: https://developer.spotify.com/documentation/web-api/concepts/api-calls

This example shows the JSON format for a regular error response from the Spotify Web API when a request fails for reasons other than authentication. It includes 'status' and 'message' fields within an 'error' object.

```bash
$ curl -i "https://api.spotify.com/v1/tracks/2KrxsD86ARO5beq7Q0Drfqa"  

HTTP/1.1 400 Bad Request  
{
    "error": {
        "status": 400,
        "message": "invalid id"
    }
}
```

--------------------------------

### GET /v1/me/player

Source: https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback

Get information about the user's current playback device and status. This includes details about the active device, playback state (playing/paused, repeat, shuffle), the current item being played, and available playback actions.

```APIDOC
## GET /v1/me/player

### Description
Retrieves information about the currently playing content on the user's Spotify account, including device details, playback state, and available actions.

### Method
GET

### Endpoint
/v1/me/player

### Parameters
#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code or the wildcard `all`. If provided, only tracks and episodes available in that market will be returned.
- **additional_types** (string) - Optional - A comma-separated list of item types that the API should return. Valid values are `track` and `episode`.

### Request Example
```
curl --request GET \
  --url https://api.spotify.com/v1/me/player \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **device** (object) - Information about the current playback device.
  - **id** (string) - The device ID.
  - **is_active** (boolean) - Whether the device is currently active.
  - **is_private_session** (boolean) - Whether the device is running a private session.
  - **is_restricted** (boolean) - Whether the device is restricted.
  - **name** (string) - The name of the device.
  - **type** (string) - The type of the device (e.g., "computer", "smartphone").
  - **volume_percent** (integer) - The current volume in percent.
  - **supports_volume** (boolean) - Whether the device supports volume control.
- **repeat_state** (string) - The repeat state of the current playback (e.g., "off", "context", "track").
- **shuffle_state** (boolean) - Whether shuffle is enabled for the current playback.
- **context** (object) - Information about the context of the current playback.
  - **type** (string) - The type of the context (e.g., "album", "playlist").
  - **href** (string) - A link to the Web API endpoint providing full context details.
  - **external_urls** (object) - Known external URLs for this context.
    - **spotify** (string) - External Spotify URL.
  - **uri** (string) - The Spotify URI for the context.
- **timestamp** (integer) - The Unix timestamp (in milliseconds) when this event was sent.
- **progress_ms** (integer) - The progress into the currently playing track or episode in milliseconds.
- **is_playing** (boolean) - Whether or not the playback is currently playing.
- **item** (object) - The currently playing track or episode.
  - **album** (object) - Album information for the track.
    - **album_type** (string) - The type of the album (e.g., "album", "single", "compilation").
    - **total_tracks** (integer) - The total number of tracks in the album.
    - **available_markets** (array of strings) - Markets in which the album is available.
    - **external_urls** (object) - Known external URLs for this album.
      - **spotify** (string) - External Spotify URL.
    - **href** (string) - A link to the Web API endpoint providing full album details.
    - **id** (string) - The Spotify ID for the album.
    - **images** (array of objects) - The cover art for the album.
      - **url** (string) - The source URL of the image.
      - **height** (integer) - The image height in pixels.
      - **width** (integer) - The image width in pixels.
    - **name** (string) - The name of the album.
    - **release_date** (string) - The date the album was released.
    - **release_date_precision** (string) - The precision of the release date (e.g., "year", "month", "day").
    - **restrictions** (object) - Known restrictions for this album.
      - **reason** (string) - The reason for the restriction (e.g., "market").
    - **type** (string) - The type of the album.
    - **uri** (string) - The Spotify URI for the album.
    - **artists** (array of objects) - The artists of the album.
      - **external_urls** (object) - Known external URLs for this artist.
        - **spotify** (string) - External Spotify URL.
      - **href** (string) - A link to the Web API endpoint providing full artist details.
      - **id** (string) - The Spotify ID for the artist.
      - **name** (string) - The name of the artist.
      - **type** (string) - The type of the artist.
      - **uri** (string) - The Spotify URI for the artist.
  - **artists** (array of objects) - The artists of the track.
    - **external_urls** (object) - Known external URLs for this artist.
      - **spotify** (string) - External Spotify URL.
    - **href** (string) - A link to the Web API endpoint providing full artist details.
    - **id** (string) - The Spotify ID for the artist.
    - **name** (string) - The name of the artist.
    - **type** (string) - The type of the artist.
    - **uri** (string) - The Spotify URI for the artist.
  - **available_markets** (array of strings) - Markets in which the track is available.
  - **disc_number** (integer) - The disc number for the track.
  - **duration_ms** (integer) - The duration of the track in milliseconds.
  - **explicit** (boolean) - Whether the track is explicit.
  - **external_ids** (object) - Known external IDs for the track.
    - **isrc** (string) - The International Standard Recording Code (ISRC).
    - **ean** (string) - The International Article Number (EAN).
    - **upc** (string) - The Universal Product Code (UPC).
  - **external_urls** (object) - Known external URLs for the track.
    - **spotify** (string) - External Spotify URL.
  - **href** (string) - A link to the Web API endpoint providing full track details.
  - **id** (string) - The Spotify ID for the track.
  - **is_playable** (boolean) - Whether or not the track is playable in the given market.
  - **linked_from** (object) - The linked track or episode from which this track was created.
  - **restrictions** (object) - Known restrictions for this track.
    - **reason** (string) - The reason for the restriction (e.g., "market").
  - **name** (string) - The name of the track.
  - **popularity** (integer) - The popularity of the track.
  - **preview_url** (string) - A URL to a 30-second preview (MP3) of the track.
  - **track_number** (integer) - The track number.
  - **type** (string) - The type of the track.
  - **uri** (string) - The Spotify URI for the track.
  - **is_local** (boolean) - Whether or not the track is local.
- **currently_playing_type** (string) - The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.
- **actions** (object) - Allows to update the user interface based on which playback actions are available within the current context.
  - **interrupting_playback** (boolean) - Interrupting playback. Optional field.
  - **pausing** (boolean) - Pausing. Optional field.
  - **resuming** (boolean) - Resuming. Optional field.
  - **seeking** (boolean) - Seeking playback location. Optional field.
  - **skipping_next** (boolean) - Skipping to the next context. Optional field.
  - **skipping_prev** (boolean) - Skipping to the previous context. Optional field.
  - **toggling_repeat_context** (boolean) - Toggling repeat context flag. Optional field.
  - **toggling_shuffle** (boolean) - Toggling shuffle flag. Optional field.
  - **toggling_repeat_track** (boolean) - Toggling repeat track flag. Optional field.
  - **transferring_playback** (boolean) - Transferring playback between devices. Optional field.

#### Response Example
```json
{
  "device": {
    "id": "string",
    "is_active": false,
    "is_private_session": false,
    "is_restricted": false,
    "name": "Kitchen speaker",
    "type": "computer",
    "volume_percent": 59,
    "supports_volume": false
  },
  "repeat_state": "string",
  "shuffle_state": false,
  "context": {
    "type": "string",
    "href": "string",
    "external_urls": {
      "spotify": "string"
    },
    "uri": "string"
  },
  "timestamp": 0,
  "progress_ms": 0,
  "is_playing": false,
  "item": {
    "album": {
      "album_type": "compilation",
      "total_tracks": 9,
      "available_markets": ["CA", "BR", "IT"],
      "external_urls": {
        "spotify": "string"
      },
      "href": "string",
      "id": "2up3OPMp9Tb4dAKM2erWXQ",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          "height": 300,
          "width": 300
        }
      ],
      "name": "string",
      "release_date": "1981-12",
      "release_date_precision": "year",
      "restrictions": {
        "reason": "market"
      },
      "type": "album",
      "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
      "artists": [
        {
          "external_urls": {
            "spotify": "string"
          },
          "href": "string",
          "id": "string",
          "name": "string",
          "type": "artist",
          "uri": "string"
        }
      ]
    },
    "artists": [
      {
        "external_urls": {
          "spotify": "string"
        },
        "href": "string",
        "id": "string",
        "name": "string",
        "type": "artist",
        "uri": "string"
      }
    ],
    "available_markets": ["string"],
    "disc_number": 0,
    "duration_ms": 0,
    "explicit": false,
    "external_ids": {
      "isrc": "string",
      "ean": "string",
      "upc": "string"
    },
    "external_urls": {
      "spotify": "string"
    },
    "href": "string",
    "id": "string",
    "is_playable": false,
    "linked_from": { },
    "restrictions": {
      "reason": "string"
    },
    "name": "string",
    "popularity": 0,
    "preview_url": "string",
    "track_number": 0,
    "type": "track",
    "uri": "string",
    "is_local": false
  },
  "currently_playing_type": "string",
  "actions": {
    "interrupting_playback": false,
    "pausing": false,
    "resuming": false,
    "seeking": false,
    "skipping_next": false,
    "skipping_prev": false,
    "toggling_repeat_context": false,
    "toggling_shuffle": false,
    "toggling_repeat_track": false,
    "transferring_playback": false
  }
}
```
```

--------------------------------

### GET /v1/me/albums

Source: https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums

Get a list of the albums saved by the current user. This endpoint supports pagination to retrieve large collections of albums.

```APIDOC
## GET /v1/me/albums

### Description
Retrieves a paginated list of albums saved by the current user.

### Method
GET

### Endpoint
/v1/me/albums

### Query Parameters
- **limit** (integer) - Optional - The maximum number of items to return. Default: 20. Maximum: 50.
- **offset** (integer) - Optional - The number of items to skip before returning results.

### Response
#### Success Response (200 OK)
- **href** (string) - A link to the Web API endpoint returning the full result of the request.
- **limit** (integer) - The maximum number of items in the response.
- **next** (string) - URL to the next page of items. `null` if none.
- **offset** (integer) - The offset of the items returned.
- **previous** (string) - URL to the previous page of items. `null` if none.
- **total** (integer) - The total number of items available to return.
- **items** (array of SavedAlbumObject) - An array of saved album objects.
  - **added_at** (string [date-time]) - The date and time the album was saved (ISO 8601 UTC format).
  - **album** (object) - Information about the album.
    - **album_type** (string) - The type of the album (`album`, `single`, `compilation`).
    - **total_tracks** (integer) - The number of tracks in the album.
    - **available_markets** (array of strings) - ISO 3166-1 alpha-2 country codes where the album is available.
    - **external_urls** (object) - Known external URLs for this album.
      - **spotify** (string) - The Spotify URL for the object.
    - **href** (string) - A link to the Web API endpoint providing full details of the album.
    - **id** (string) - The Spotify ID for the album.
    - **images** (array of ImageObject) - The cover art for the album.
      - **url** (string) - The source URL of the image.
      - **height** (integer) - The image height in pixels.
      - **width** (integer) - The image width in pixels.
    - **name** (string) - The name of the album.
    - **release_date** (string) - The date the album was first released.
    - **release_date_precision** (string) - The precision of the `release_date` (`year`, `month`, `day`).
    - **restrictions** (object, optional) - Included if a content restriction is applied.
      - **reason** (string) - The reason for the restriction (`market`, `product`, `explicit`).
    - **type** (string) - The object type (`album`).
    - **uri** (string) - The Spotify URI for the album.
    - **artists** (array of SimplifiedArtistObject) - The artists of the album.
      - **external_urls** (object) - Known external URLs for this artist.
        - **spotify** (string) - The Spotify URL for the object.
      - **href** (string) - A link to the Web API endpoint providing full details of the artist.
      - **id** (string) - The Spotify ID for the artist.
      - **name** (string) - The name of the artist.
      - **type** (string) - The object type (`artist`).
      - **uri** (string) - The Spotify URI for the artist.
    - **tracks** (object) - The tracks of the album.
      - **href** (string) - A link to the Web API endpoint returning the full result of the request.
      - **limit** (integer) - The maximum number of items in the response.
      - **next** (string) - URL to the next page of items. `null` if none.
      - **offset** (integer) - The offset of the items returned.
      - **previous** (string) - URL to the previous page of items. `null` if none.
      - **total** (integer) - The total number of items available to return.

#### Error Response
- **401** Unauthorized
- **403** Forbidden
- **429** Too Many Requests

### Request Example
```json
{
  "example": "GET https://api.spotify.com/v1/me/albums?limit=10&offset=5"
}
```

### Response Example
```json
{
  "href": "https://api.spotify.com/v1/me/albums?offset=0&limit=20",
  "limit": 20,
  "next": "https://api.spotify.com/v1/me/albums?offset=20&limit=20",
  "offset": 0,
  "previous": null,
  "total": 4,
  "items": [
    {
      "added_at": "2023-01-01T10:00:00Z",
      "album": {
        "album_type": "album",
        "total_tracks": 12,
        "available_markets": ["US", "CA", "MX"],
        "external_urls": {
          "spotify": "https://open.spotify.com/album/examplealbumid1"
        },
        "href": "https://api.spotify.com/v1/albums/examplealbumid1",
        "id": "examplealbumid1",
        "images": [
          {
            "url": "https://i.scdn.co/image/exampleimage1",
            "height": 300,
            "width": 300
          }
        ],
        "name": "Example Album Name",
        "release_date": "2022-01-01",
        "release_date_precision": "day",
        "restrictions": {
          "reason": "market"
        },
        "type": "album",
        "uri": "spotify:album:examplealbumid1",
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/exampleartistid1"
            },
            "href": "https://api.spotify.com/v1/artists/exampleartistid1",
            "id": "exampleartistid1",
            "name": "Example Artist",
            "type": "artist",
            "uri": "spotify:artist:exampleartistid1"
          }
        ],
        "tracks": {
          "href": "https://api.spotify.com/v1/albums/examplealbumid1/tracks?offset=0&limit=20",
          "limit": 20,
          "next": null,
          "offset": 0,
          "previous": null,
          "total": 12
        }
      }
    }
  ]
}
```
```

--------------------------------

### GET /v1/episodes

Source: https://developer.spotify.com/documentation/web-api/reference/get-multiple-episodes

Get Spotify catalog information for several episodes based on their Spotify IDs. Maximum of 50 IDs can be sent in one request.

```APIDOC
## GET /v1/episodes

### Description
Retrieves information about multiple Spotify episodes using their IDs.

### Method
GET

### Endpoint
`/v1/episodes`

### Parameters
#### Query Parameters
- **ids** (string) - Required - A comma-separated list of Spotify episode IDs. Maximum of 50 IDs.
- **market** (string) - Optional - An ISO 3166-1 country code or the keyword `from_token`. If provided, the response will exclude episodes that are not available in the specified market.

### Request Example
```
GET https://api.spotify.com/v1/episodes?ids=77o6BIVlYM3msb4MMIL1jH%2C0Q86acNRm6V9GYx55SXKwf
Authorization: Bearer <your_access_token>
```

### Response
#### Success Response (200)
- **episodes** (array of EpisodeObject) - A list of episode objects.

#### Response Example
```json
{
  "episodes": [
    {
      "audio_preview_url": "https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17",
      "description": "A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.",
      "html_description": "<p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>",
      "duration_ms": 1686230,
      "explicit": false,
      "external_urls": {
        "spotify": "string"
      },
      "href": "https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ",
      "id": "5Xt5DXGzch68nYYamXrNxZ",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          "height": 300,
          "width": 300
        }
      ],
      "is_externally_hosted": false,
      "is_playable": false,
      "language": "en",
      "languages": ["fr", "en"],
      "name": "Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators",
      "release_date": "1981-12-15",
      "release_date_precision": "day",
      "resume_point": {
        "fully_played": false,
        "resume_position_ms": 0
      },
      "type": "episode",
      "uri": "spotify:episode:0zLhl3WsOCQHbe1BPTiHgr",
      "restrictions": {
        "reason": "string"
      },
      "show": {
        "available_markets": ["string"],
        "copyrights": [
          {
            "text": "string",
            "type": "string"
          }
        ],
        "description": "string",
        "html_description": "string",
        "explicit": false,
        "external_urls": {
          "spotify": "string"
        },
        "href": "string",
        "id": "string",
        "images": [
          {
            "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            "height": 300,
            "width": 300
          }
        ],
        "is_externally_hosted": false,
        "languages": ["string"],
        "media_type": "string",
        "name": "string",
        "publisher": "string",
        "type": "show",
        "uri": "string",
        "total_episodes": 0
      }
    }
  ]
}
```
```

--------------------------------

### GET /v1/browse/categories/{category_id}

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-category

Get a Single Category. This endpoint retrieves detailed information about a specific category based on its ID.

```APIDOC
## GET /v1/browse/categories/{category_id}

### Description
Retrieves detailed information about a specific category based on its ID.

### Method
GET

### Endpoint
`/v1/browse/categories/{category_id}`

### Parameters
#### Path Parameters
- **category_id** (string) - Required - The Spotify category ID of the category.
- **locale** (string) - Optional - The desired country, in the form of an ISO 3166-1 alpha-2 country code. Provide this if you want the category strings to be in a specific language.

### Request Example
```curl
curl --request GET \
  --url https://api.spotify.com/v1/browse/categories/dinner \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **href** (string) - A link to the Web API endpoint returning full details of the category.
- **icons** (array of ImageObject) - The category icon, in various sizes.
  - **url** (string) - The source URL of the image.
  - **height** (integer) - The image height in pixels.
  - **width** (integer) - The image width in pixels.
- **id** (string) - The Spotify category ID of the category.
- **name** (string) - The name of the category.

#### Response Example
```json
{
  "href": "string",
  "icons": [
    {
      "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "height": 300,
      "width": 300
    }
  ],
  "id": "equal",
  "name": "EQUAL"
}
```

#### Error Responses
- **401** Unauthorized
- **403** Forbidden
- **429** Too Many Requests
```

--------------------------------

### Get Available Markets - cURL Request

Source: https://developer.spotify.com/documentation/web-api/reference/get-available-markets

This snippet demonstrates how to make a GET request to the Spotify API to retrieve a list of available markets using cURL. It requires an 'Authorization' header with a Bearer token.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/markets \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### Fetch Artist Albums (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums

This snippet demonstrates how to fetch a list of albums for a specific artist using a GET request with the cURL command-line tool. It requires an Authorization header with a Bearer token.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### GET /v1/me

Source: https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile

Get the current user's profile information. This endpoint requires the user to have granted the `user-read-private` and `user-read-email` scopes.

```APIDOC
## GET /v1/me

### Description
Retrieves the profile information of the currently authenticated user. This includes details like display name, country, email, subscription level, and profile images.

### Method
GET

### Endpoint
https://api.spotify.com/v1/me

### Parameters
#### Query Parameters
None

#### Request Body
None

### Request Example
```curl
curl --request GET \
  --url https://api.spotify.com/v1/me \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **country** (string) - The country of the user, as set in the user's account profile. An ISO 3166-1 alpha-2 country code. Available with `user-read-private` scope.
- **display_name** (string) - The name displayed on the user's profile. `null` if not available.
- **email** (string) - The user's email address. Unverified. Available with `user-read-email` scope.
- **explicit_content** (object) - The user's explicit content settings. Available with `user-read-private` scope.
  - **filter_enabled** (boolean) - When `true`, indicates that explicit content should not be played.
  - **filter_locked** (boolean) - When `true`, indicates that the explicit content setting is locked.
- **external_urls** (object) - Known external URLs for this user.
  - **spotify** (string) - The Spotify URL for the object.
- **followers** (object) - Information about the followers of the user.
  - **href** (string) - This will always be set to null.
  - **total** (integer) - The total number of followers.
- **href** (string) - A link to the Web API endpoint for this user.
- **id** (string) - The Spotify user ID for the user.
- **images** (array of ImageObject) - The user's profile image.
  - **url** (string) - The source URL of the image.
  - **height** (integer) - The image height in pixels.
  - **width** (integer) - The image width in pixels.
- **product** (string) - The user's Spotify subscription level: "premium", "free", etc. Available with `user-read-private` scope.
- **type** (string) - The object type: "user".
- **uri** (string) - The Spotify URI for the user.

#### Response Example
```json
{
  "country": "string",
  "display_name": "string",
  "email": "string",
  "explicit_content": {
    "filter_enabled": false,
    "filter_locked": false
  },
  "external_urls": {
    "spotify": "string"
  },
  "followers": {
    "href": "string",
    "total": 0
  },
  "href": "string",
  "id": "string",
  "images": [
    {
      "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "height": 300,
      "width": 300
    }
  ],
  "product": "string",
  "type": "string",
  "uri": "string"
}
```

#### Error Responses
- **401** Unauthorized
- **403** Forbidden
- **429** Too Many Requests
```

--------------------------------

### Get Currently Playing Endpoint (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track

This code snippet demonstrates how to use cURL to make a GET request to the Spotify Web API's 'Get Currently Playing' endpoint. It requires an 'Authorization' header with a valid Bearer token. The endpoint returns details about the currently playing item.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/me/player/currently-playing \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### Get Artist Information (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-an-artist

This snippet demonstrates how to retrieve detailed information about a specific artist using a GET request with cURL. It requires an Authorization header with a Bearer token.

```curl
curl --request GET \
  --url https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### GET /v1/me/tracks

Source: https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks

Get a list of the tracks saved by the current user. This endpoint supports filtering by market and pagination using limit and offset.

```APIDOC
## GET /v1/me/tracks

### Description
Retrieve a list of tracks saved by the current user. This endpoint allows you to paginate through the saved tracks and filter them by a specific market.

### Method
GET

### Endpoint
https://api.spotify.com/v1/me/tracks

### Parameters
#### Query Parameters
- **market** (string) - Optional - The markets to return as ISO 3166-1 alpha-2 codes. If not specified, all markets will be returned.
- **limit** (integer) - Optional - The maximum number of items to return. Default: 20. Maximum: 50.
- **offset** (integer) - Optional - The number of items to skip. Default: 0.

### Request Example
```
GET https://api.spotify.com/v1/me/tracks?market=US&limit=10&offset=5
```

### Response
#### Success Response (200)
- **href** (string) - URL to the Web API endpoint providing full details of the saved tracks.
- **items** (array) - An array of track objects.
  - **added_at** (string) - The date and time the track was added to the user's library.
  - **track** (object) - The track object itself, containing details like:
    - **album** (object) - Information about the album the track belongs to.
    - **artists** (array) - A list of artists who performed on the track.
    - **disc_number** (integer) - The disc number.
    - **duration_ms** (integer) - The track length in milliseconds.
    - **explicit** (boolean) - Whether the track has explicit lyrics.
    - **external_ids** (object) - Known external IDs for the track (e.g., isrc, ean, upc).
    - **external_urls** (object) - Known external URLs for this track (e.g., spotify).
    - **href** (string) - A link to the Web API endpoint providing full details of the track.
    - **id** (string) - The Spotify ID for the track.
    - **is_playable** (boolean) - Whether the track is playable in the given market.
    - **linked_from** (object) - Information about the originally requested track if track relinking is applied.
    - **name** (string) - The name of the track.
    - **popularity** (integer) - The popularity of the track (0-100).
    - **preview_url** (string) - A link to a 30-second preview of the track (MP3 format), can be null.
    - **track_number** (integer) - The number of the track on the album.
    - **type** (string) - The object type: "track".
    - **uri** (string) - The Spotify URI for the track.
    - **is_local** (boolean) - Whether the track is from a local file.
- **limit** (integer) - The limit used for pagination.
- **next** (string) - URL to the next page of results, or null if there are no more results.
- **offset** (integer) - The offset used for pagination.
- **previous** (string) - URL to the previous page of results, or null if this is the first page.
- **total** (integer) - The total number of tracks saved by the user.

#### Response Example
```json
{
  "href": "https://api.spotify.com/v1/me/tracks?offset=0&limit=20",
  "items": [
    {
      "added_at": "2023-01-01T10:00:00Z",
      "track": {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1vQN54rcZ7X3f3jQ07E4fX"
              },
              "href": "https://api.spotify.com/v1/artists/1vQN54rcZ7X3f3jQ07E4fX",
              "id": "1vQN54rcZ7X3f3jQ07E4fX",
              "name": "Artist Name",
              "type": "artist",
              "uri": "spotify:artist:1vQN54rcZ7X3f3jQ07E4fX"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/12345abcde"
          },
          "href": "https://api.spotify.com/v1/albums/12345abcde",
          "id": "12345abcde",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/abc123def456",
              "width": 640
            }
          ],
          "name": "Album Name",
          "release_date": "2022-01-01",
          "release_date_precision": "day",
          "total_tracks": 10,
          "type": "album",
          "uri": "spotify:album:12345abcde"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/1vQN54rcZ7X3f3jQ07E4fX"
            },
            "href": "https://api.spotify.com/v1/artists/1vQN54rcZ7X3f3jQ07E4fX",
            "id": "1vQN54rcZ7X3f3jQ07E4fX",
            "name": "Artist Name",
            "type": "artist",
            "uri": "spotify:artist:1vQN54rcZ7X3f3jQ07E4fX"
          }
        ],
        "disc_number": 1,
        "duration_ms": 240000,
        "explicit": false,
        "external_ids": {
          "isrc": "USRC12212345"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/67890fghij"
        },
        "href": "https://api.spotify.com/v1/tracks/67890fghij",
        "id": "67890fghij",
        "is_playable": true,
        "name": "Track Name",
        "popularity": 85,
        "preview_url": "https://p.scdn.co/mp3-preview/abcdef1234567890",
        "track_number": 5,
        "type": "track",
        "uri": "spotify:track:67890fghij",
        "is_local": false
      }
    }
  ],
  "limit": 20,
  "next": "https://api.spotify.com/v1/me/tracks?offset=20&limit=20",
  "offset": 0,
  "previous": null,
  "total": 150
}
```
```

--------------------------------

### GET /v1/me/episodes

Source: https://developer.spotify.com/documentation/web-api/reference/get-users-saved-episodes

Get a list of the episodes saved to the current Spotify user's library. This endpoint allows filtering by market and pagination using limit and offset.

```APIDOC
## GET /v1/me/episodes

### Description
Retrieves a list of episodes saved to the current Spotify user's library. This endpoint supports filtering by market and pagination using limit and offset parameters.

### Method
GET

### Endpoint
https://api.spotify.com/v1/me/episodes

### Parameters
#### Query Parameters
- **market** (string) - Optional - The markets where the episodes are available.
- **limit** (integer) - Optional - The maximum number of episodes to return. Default: 20. Maximum: 50.
- **offset** (integer) - Optional - The number of episodes to skip from the beginning of the result set. Default: 0.

### Request Example
```
curl --request GET \
  --url https://api.spotify.com/v1/me/episodes \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **items** (array of objects) - A list of saved episodes.
  - **added_at** (string) - The date and time the episode was added to the library.
  - **episode** (object) - The episode object.
    - **restrictions** (object) - Included in the response when a content restriction is applied.
      - **reason** (string) - The reason for the restriction. Supported values: `market`, `product`, `explicit`.
    - **show** (object) - Required. The show on which the episode belongs.
      - **available_markets** (array of strings) - Required. A list of the countries in which the show can be played.
      - **copyrights** (array of CopyrightObject) - Required. The copyright statements of the show.
      - **description** (string) - Required. A description of the show.
      - **html_description** (string) - Required. A description of the show with HTML tags.
      - **explicit** (boolean) - Required. Whether or not the show has explicit content.
      - **external_urls** (object) - Required. External URLs for this show.
      - **href** (string) - Required. A link to the Web API endpoint providing full details of the show.
      - **id** (string) - Required. The Spotify ID for the show.
      - **images** (array of ImageObject) - Required. The cover art for the show.
      - **is_externally_hosted** (boolean) - Required. True if all of the shows episodes are hosted outside of Spotify's CDN.
      - **languages** (array of strings) - Required. A list of the languages used in the show.
      - **media_type** (string) - Required. The media type of the show.
      - **name** (string) - Required. The name of the episode.
      - **publisher** (string) - Required. The publisher of the show.
      - **type** (string) - Required. The object type. Allowed values: `"show"`.
      - **uri** (string) - Required. The Spotify URI for the show.
      - **total_episodes** (integer) - Required. The total number of episodes in the show.
- **next** (string) - URL to the next page of results, or null if there isn't one.
- **limit** (integer) - The maximum number of episodes returned.
- **offset** (integer) - The number of episodes skipped.
- **total** (integer) - The total number of saved episodes.

#### Response Example
```json
{
  "items": [
    {
      "added_at": "2023-01-01T12:00:00Z",
      "episode": {
        "restrictions": {
          "reason": "market"
        },
        "show": {
          "available_markets": ["US", "CA"],
          "copyrights": [],
          "description": "A podcast about everything.",
          "html_description": "<p>A podcast about everything.</p>",
          "explicit": false,
          "external_urls": {
            "spotify": "https://open.spotify.com/show/12345"
          },
          "href": "https://api.spotify.com/v1/shows/12345",
          "id": "12345",
          "images": [
            {
              "url": "https://i.scdn.co/image/abc",
              "height": 300,
              "width": 300
            }
          ],
          "is_externally_hosted": false,
          "languages": ["en"],
          "media_type": "podcast",
          "name": "The Podcast",
          "publisher": "Podcast Publisher",
          "type": "show",
          "uri": "spotify:show:12345",
          "total_episodes": 100
        }
      }
    }
  ],
  "next": null,
  "limit": 20,
  "offset": 0,
  "total": 1
}
```
```

--------------------------------

### Get Show Information (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-show

This snippet demonstrates how to fetch details for a specific Spotify show using a cURL command. It requires a valid authorization token and the show's unique ID.

```shell
curl --request GET \
  --url https://api.spotify.com/v1/shows/38bS44xjbVVZ3No3ByF1dJ \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### Get User's Saved Shows Request (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-users-saved-shows

This cURL command demonstrates how to make a GET request to the Spotify Web API to retrieve the shows saved by the authenticated user. It includes the necessary authorization header and the endpoint URL.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/me/shows \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### Get a Chapter

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-chapter

Retrieves Spotify catalog information for a single audiobook chapter. Chapters are only available in specific markets.

```APIDOC
## GET /api/chapters/{id}

### Description
Get Spotify catalog information for a single audiobook chapter. Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.

### Method
GET

### Endpoint
/api/chapters/{id}

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID for the chapter.

#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If provided, only tracks available in this market will be returned.

### Request Example
```json
{
  "example": "GET https://api.spotify.com/v1/chapters/4oDII27p2wYQh5j5a0w15t"
}
```

### Response
#### Success Response (200)
- **audio_features** (object) - The audio features of the track.
- **external_urls** (object) - Known external URLs for this object.
- **href** (string) - A link to the Web API endpoint providing full details of the chapter.
- **html_url** - A link to the Web API endpoint providing full details of the chapter.
- **id** (string) - The Spotify ID for the chapter.
- **name** (string) - The name of the chapter.
- **type** (string) - The object type: 'chapter'.
- **uri** (string) - The Spotify URI for the chapter.

#### Response Example
```json
{
  "example": "{\n  \"audio_features\": null,\n  \"external_urls\": {\n    \"spotify\": \"https://open.spotify.com/episode/7rQj3Q9f05L35e4w7w7w7w\"\n  },\n  \"href\": \"https://api.spotify.com/v1/episodes/7rQj3Q9f05L35e4w7w7w7w\",\n  \"html_url\": \"https://open.spotify.com/episode/7rQj3Q9f05L35e4w7w7w7w\",\n  \"id\": \"7rQj3Q9f05L35e4w7w7w7w\",\n  \"name\": \"Chapter 1\",\n  \"type\": \"episode\",\n  \"uri\": \"spotify:episode:7rQj3Q9f05L35e4w7w7w7w\"\n}"
}
```
```

--------------------------------

### POST /v1/me/playlists

Source: https://developer.spotify.com/documentation/web-api/reference/create-playlist

Create a playlist for a specific user. The playlist will be owned by the user specified in the `Authorization` header.

```APIDOC
## POST /v1/me/playlists

### Description
Create a playlist for a specific user. The playlist will be owned by the user specified in the `Authorization` header.

### Method
POST

### Endpoint
https://api.spotify.com/v1/me/playlists

### Parameters
#### Query Parameters
None

#### Request Body
- **name** (string) - Required - The name for the new playlist, otherwise, no name will be set.
- **public** (boolean) - Optional - Whether or not the playlist should be public.
- **collaborative** (boolean) - Optional - Whether or not the playlist should be collaborative.
- **description** (string) - Optional - The description for the playlist. This field may contain HTML tags.

### Request Example
```json
{
  "name": "New Playlist",
  "description": "New playlist description",
  "public": false
}
```

### Response
#### Success Response (201 Created)
- **id** (string) - The Spotify ID for the playlist.
- **name** (string) - The name of the playlist.
- **description** (string) - The playlist's description.
- **public** (boolean) - Whether the playlist is public.
- **collaborative** (boolean) - Whether the playlist is collaborative.
- **uri** (string) - The Spotify URI for the playlist.
- **owner** (object) - The user who owns the playlist.
  - **display_name** (string) - The name of the user.
  - **external_urls** (object) - Known external URLs for this object.
    - **spotify** (string) - A URL to the Web API endpoint providing full details of the owner.
  - **href** (string) - A link to the Web API endpoint providing full details of this owner.
  - **id** (string) - The Spotify ID for the user.
  - **type** (string) - The object type, typically "user".
  - **uri** (string) - The Spotify URI for the user.
- **snapshot_id** (string) - The revision ID of the playlist's content.
- **external_urls** (object) - Known external URLs for this object.
  - **spotify** (string) - A URL to the Web API endpoint providing full details of the playlist.
- **href** (string) - A link to the Web API endpoint providing full details of this playlist.
- **type** (string) - The object type, typically "playlist".

#### Response Example
```json
{
  "id": "37i9dQZF1DXcBWIGoYBM5M",
  "name": "New Playlist",
  "description": "New playlist description",
  "public": false,
  "collaborative": false,
  "uri": "spotify:playlist:37i9dQZF1DXcBWIGoYBM5M",
  "owner": {
    "display_name": "Spotify User",
    "external_urls": {
      "spotify": "https://open.spotify.com/user/spotify"
    },
    "href": "https://api.spotify.com/v1/users/spotify",
    "id": "spotify",
    "type": "user",
    "uri": "spotify:user:spotify"
  },
  "snapshot_id": "b19fld3c7a77421e9114067b8312181e",
  "external_urls": {
    "spotify": "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
  },
  "href": "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M",
  "type": "playlist"
}
```
```

--------------------------------

### Player API

Source: https://developer.spotify.com/documentation/web-api/reference/get-multiple-episodes

Endpoints for controlling music playback, including starting, pausing, skipping, and managing volume.

```APIDOC
## Player API Endpoints

### Get Playback State

**Description**: Get information about the user's current playback state.

**Method**: GET

**Endpoint**: `/me/player

### Transfer Playback

**Description**: Transfer playback to a new device.

**Method**: PUT

**Endpoint**: `/me/player

### Get Available Devices

**Description**: Get information about a user's available devices.

**Method**: GET

**Endpoint**: `/me/player/devices

### Get Currently Playing Track

**Description**: Get the currently playing track or episode.

**Method**: GET

**Endpoint**: `/me/player/currently-playing

### Start/Resume Playback

**Description**: Start or resume user playback.

**Method**: PUT

**Endpoint**: `/me/player

### Pause Playback

**Description**: Pause user's playback.

**Method**: PUT

**Endpoint**: `/me/player/pause

### Skip To Next

**Description**: Skip to the next item in the user's queue.

**Method**: POST

**Endpoint**: `/me/player/next

### Skip To Previous

**Description**: Skip to the previous item in the user's queue.

**Method**: POST

**Endpoint**: `/me/player/previous

### Seek To Position

**Description**: Seek to the given position in the user's currently playing track.

**Method**: PUT

**Endpoint**: `/me/player/seek

### Set Repeat Mode

**Description**: Set the repeat mode for playback.

**Method**: PUT

**Endpoint**: `/me/player/repeat

### Set Playback Volume

**Description**: Set the volume for the user's current playback.

**Method**: PUT

**Endpoint**: `/me/player/volume

### Toggle Playback Shuffle

**Description**: Toggle shuffle on or off for playback.

**Method**: PUT

**Endpoint**: `/me/player/shuffle

### Get Recently Played Tracks

**Description**: Get a list of the objects that the user has most recently played.

**Method**: GET

**Endpoint**: `/me/player/recently-played

### Get the User's Queue

**Description**: Get the user's playback queue.

**Method**: GET

**Endpoint**: `/me/player/queue

### Add Item to Playback Queue

**Description**: Add an item to the user's playback queue.

**Method**: POST

**Endpoint**: `/me/player/queue
```

--------------------------------

### Get Spotify Episodes by IDs (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-multiple-episodes

This snippet demonstrates how to retrieve multiple Spotify episodes using their IDs via a GET request. It requires an 'Authorization' header with a Bearer token. The input is a comma-separated string of episode IDs, and the output is a JSON object containing an 'episodes' array.

```bash
curl --request GET \
  --url 'https://api.spotify.com/v1/episodes?ids=77o6BIVlYM3msb4MMIL1jH%2C0Q86acNRm6V9GYx55SXKwf' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### GET /v1/audiobooks/{id}/chapters

Source: https://developer.spotify.com/documentation/web-api/reference/get-audiobook-chapters

Get a list of the chapters of a Spotify audiobook. This endpoint retrieves chapters for a specific audiobook, with options to control the number of results and the offset.

```APIDOC
## GET /v1/audiobooks/{id}/chapters

### Description
Get a list of the chapters of a Spotify audiobook. This endpoint retrieves chapters for a specific audiobook, with options to control the number of results and the offset.

### Method
GET

### Endpoint
https://api.spotify.com/v1/audiobooks/{id}/chapters

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID for the audiobook.

#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. Provide this parameter if you want the API to return items relevant to that market. If not supplied, the API will take 'from_token' as default.
- **limit** (integer) - Optional - The maximum number of items to return. Default: 20. Maximum: 50.
- **offset** (integer) - Optional - The number of items to skip. Default: 0.

### Request Example
```json
{
  "example": "curl --request GET \
  --url https://api.spotify.com/v1/audiobooks/7iHfbu1YPACw6oZPAFJtqe/chapters \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'"
}
```

### Response
#### Success Response (200)
- **href** (string) - URL to the Web API endpoint.
- **limit** (integer) - The maximum number of items returned.
- **next** (string) - URL to the next page of items.
- **offset** (integer) - The offset of the items returned.
- **previous** (string) - URL to the previous page of items.
- **total** (integer) - The total number of items available.
- **items** (array) - An array of chapter objects.
  - **audio_preview_url** (string) - URL to a 30-second preview (mp3 format) of the chapter.
  - **available_markets** (array) - An array of country codes where the chapter is available.
  - **chapter_number** (integer) - The number of the chapter.
  - **description** (string) - The description of the chapter.
  - **html_description** (string) - A plain text description of the chapter. HTML tags are stripped away from this field, and it's a clean string.
  - **duration_ms** (integer) - The duration of the chapter in milliseconds.
  - **explicit** (boolean) - Whether or not the chapter is explicit.
  - **external_urls** (object) - Known external URLs for this chapter.
    - **spotify** (string) - A URL pointing to the Spotify object.
  - **href** (string) - A link to the Web API endpoint providing full information about the chapter.
  - **id** (string) - The Spotify ID for the chapter.
  - **images** (array) - An array of images associated with the chapter.
    - **url** (string) - The source URL of the image.
    - **height** (integer) - The height of the image in pixels.
    - **width** (integer) - The width of the image in pixels.
  - **is_playable** (boolean) - Whether or not the episode is playable in the given market. True if the episode is playable in the given market, false otherwise.
  - **languages** (array) - The languages of the chapter, identified by their ISO 639-1 code.
  - **name** (string) - The name of the chapter.
  - **release_date** (string) - The date the chapter was first released, for example "1981-12-15". Depending on the precision, the year (YYYY), year and month (YYYY-MM) or year, month and day (YYYY-MM-DD) will be returned.
  - **release_date_precision** (string) - The precision with which `release_date` is known: "year", "month" or "day".
  - **resume_point** (object) - The user's most recent position in the chapter.
    - **fully_played** (boolean) - Whether or not the episode has been fully played by the user.
    - **resume_position_ms** (integer) - The position in milliseconds where the user last stopped playing the chapter.
  - **type** (string) - The object type.
  - **uri** (string) - The Spotify URI for the chapter.
  - **restrictions** (object) - This object appears in the response of the Get Audiobooks Chapters endpoint. It contains information about the restrictions applied to the content.
    - **reason** (string) - The reason for the restriction. Supported values: `market`, `product`, `explicit`, `payment_required`.

#### Response Example
```json
{
  "example": "{\"href\": \"https://api.spotify.com/v1/me/shows?offset=0&limit=20\", \"limit\": 20, \"next\": \"https://api.spotify.com/v1/me/shows?offset=1&limit=1\", \"offset\": 0, \"previous\": \"https://api.spotify.com/v1/me/shows?offset=1&limit=1\", \"total\": 4, \"items\": [ { \"audio_preview_url\": \"https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17\", \"available_markets\": [\"string\"], \"chapter_number\": 1, \"description\": \"We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.\", \"html_description\": \"<p>We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.</p>\", \"duration_ms\": 1686230, \"explicit\": false, \"external_urls\": { \"spotify\": \"string\" }, \"href\": \"https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ\", \"id\": \"5Xt5DXGzch68nYYamXrNxZ\", \"images\": [ { \"url\": \"https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\", \"height\": 300, \"width\": 300 } ], \"is_playable\": false, \"languages\": [\"fr\", \"en\"], \"name\": \"Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators\", \"release_date\": \"1981-12-15\", \"release_date_precision\": \"day\", \"resume_point\": { \"fully_played\": false, \"resume_position_ms\": 0 }, \"type\": \"episode\", \"uri\": \"spotify:episode:0zLhl3WsOCQHbe1BPTiHgr\", \"restrictions\": { \"reason\": \"string\" } } ]}"
}
```
```

--------------------------------

### GET /v1/audiobooks

Source: https://developer.spotify.com/documentation/web-api/reference/get-multiple-audiobooks

Get one or more audiobooks by their Spotify IDs. This endpoint allows retrieval of audiobook details, including metadata, chapter information, and restrictions.

```APIDOC
## GET /v1/audiobooks

### Description
Get one or more audiobooks by their Spotify IDs. This endpoint allows retrieval of audiobook details, including metadata, chapter information, and restrictions.

### Method
GET

### Endpoint
`https://api.spotify.com/v1/audiobooks`

### Parameters
#### Query Parameters
- **ids** (string) - Required - A comma-separated list of Spotify IDs for the audiobooks. Maximum of 50 IDs.
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. Provide this parameter if you want the response to be specific to the desired country.

### Request Example
```json
{
  "curl": "curl --request GET \
  --url 'https://api.spotify.com/v1/audiobooks?ids=18yVqkdbdRvS24c0Ilj2ci%2C1HGw3J3NxZO1TP1BTtVhpZ%2C7iHfbu1YPACw6oZPAFJtqe' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'"
}
```

### Response
#### Success Response (200)
- **audiobooks** (array) - An array of audiobook objects.
  - **duration_ms** (integer) - The chapter length in milliseconds.
  - **explicit** (boolean) - Whether or not the chapter has explicit content.
  - **external_urls** (object) - External URLs for this chapter.
    - **spotify** (string) - The Spotify URL for the object.
  - **href** (string) - A link to the Web API endpoint providing full details of the chapter.
  - **id** (string) - The Spotify ID for the chapter.
  - **images** (array of ImageObject) - The cover art for the chapter in various sizes.
    - **url** (string) - The source URL of the image.
    - **height** (integer) - The image height in pixels.
    - **width** (integer) - The image width in pixels.
  - **is_playable** (boolean) - True if the chapter is playable in the given market.
  - **languages** (array of strings) - A list of the languages used in the chapter.
  - **name** (string) - The name of the chapter.
  - **release_date** (string) - The date the chapter was first released.
  - **release_date_precision** (string) - The precision of the release date ('year', 'month', or 'day').
  - **resume_point** (object) - The user's most recent position in the chapter.
    - **fully_played** (boolean) - Whether or not the episode has been fully played.
    - **resume_position_ms** (integer) - The user's most recent position in the episode in milliseconds.
  - **type** (string) - The object type ('episode').
  - **uri** (string) - The Spotify URI for the chapter.
  - **restrictions** (object) - Included when a content restriction is applied.
    - **reason** (string) - The reason for the restriction.

#### Response Example
```json
{
  "audiobooks": [
    {
      "duration_ms": 1686230,
      "explicit": false,
      "external_urls": {
        "spotify": "https://open.spotify.com/episode/5Xt5DXGzch68nYYamXrNxZ"
      },
      "href": "https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ",
      "id": "5Xt5DXGzch68nYYamXrNxZ",
      "images": [
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          "width": 300
        }
      ],
      "is_playable": true,
      "languages": ["fr", "en"],
      "name": "Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators",
      "release_date": "1981-12-15",
      "release_date_precision": "day",
      "resume_point": {
        "fully_played": false,
        "resume_position_ms": 10000
      },
      "type": "episode",
      "uri": "spotify:episode:0zLhl3WsOCQHbe1BPTiHgr",
      "restrictions": {
        "reason": "market"
      }
    }
  ]
}
```
```

--------------------------------

### GET /v1/shows/{id}

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-show

Get Spotify catalog information for a single show or episode. This endpoint retrieves details about a specific podcast show, including its description, episodes, and copyright information.

```APIDOC
## GET /v1/shows/{id}

### Description
Retrieves detailed information about a specific Spotify show, including its description, episodes, and copyright information.

### Method
GET

### Endpoint
/v1/shows/{id}

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID for the show.

#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. Provide this parameter if you want the API to return only tracks available in that market. If a country code is specified, the available markets in the response will be restricted to that country code.
- **offset** (integer) - Optional - The index of the first episode to return. Default: 0. Use with limit to get the next page of episodes.
- **limit** (integer) - Optional - The maximum number of episodes to return. Default: 20. Maximum: 50. Use with offset to get the next page of episodes.

### Request Example
```json
{
  "example": "GET /v1/shows/5Xt5DXGzch68nYYamXrNxZ"
}
```

### Response
#### Success Response (200)
- **available_markets** (array of strings) - The markets in which the show is available.
- **copyrights** (array of objects) - Information about the copyrights associated with the show.
  - **text** (string) - The copyright text.
  - **type** (string) - The type of copyright (e.g., 'C', 'P').
- **description** (string) - The description of the show.
- **html_description** (string) - The HTML description of the show.
- **explicit** (boolean) - Whether the show is explicit.
- **external_urls** (object) - Known external URLs for this object.
  - **spotify** (string) - The Spotify URL for the show.
- **href** (string) - A link to the Web API endpoint providing full details of the show.
- **id** (string) - The Spotify ID for the show.
- **images** (array of objects) - An array of images associated with the show.
  - **url** (string) - The source URL of the image.
  - **height** (integer) - The height of the image in pixels.
  - **width** (integer) - The width of the image in pixels.
- **is_externally_hosted** (boolean) - Whether or not the show is hosted externally.
- **languages** (array of strings) - The languages used in the show.
- **media_type** (string) - The media type of the show.
- **name** (string) - The name of the show.
- **publisher** (string) - The publisher of the show.
- **type** (string) - The type of object (e.g., 'show').
- **uri** (string) - The Spotify URI for the show.
- **total_episodes** (integer) - The total number of episodes for the show.
- **episodes** (object) - A paginated list of episodes for the show.
  - **href** (string) - A link to the Web API endpoint providing the next page of episodes.
  - **limit** (integer) - The maximum number of episodes returned in this response.
  - **next** (string) - The URL for the next page of episodes.
  - **offset** (integer) - The offset of the episodes returned in this response.
  - **previous** (string) - The URL for the previous page of episodes.
  - **total** (integer) - The total number of episodes available for the show.
  - **items** (array of objects) - A list of episode objects.
    - **audio_preview_url** (string) - URL to a 30-second preview (null if not available).
    - **description** (string) - Description of the episode.
    - **html_description** (string) - HTML-formatted description of the episode.
    - **duration_ms** (integer) - The duration of the episode in milliseconds.
    - **explicit** (boolean) - Whether the episode is explicit.
    - **external_urls** (object) - Known external URLs for this object.
      - **spotify** (string) - The Spotify URL for the episode.
    - **href** (string) - A link to the Web API endpoint providing full details of the episode.
    - **id** (string) - The Spotify ID for the episode.
    - **images** (array of objects) - Images for the episode.
      - **url** (string) - The source URL of the image.
      - **height** (integer) - The height of the image in pixels.
      - **width** (integer) - The width of the image in pixels.
    - **is_externally_hosted** (boolean) - Whether or not the episode is hosted externally.
    - **is_playable** (boolean) - Whether or not the episode is playable in the user’s market.
    - **language** (string) - The language of the episode.
    - **languages** (array of strings) - A list of languages the episode is available in.
    - **name** (string) - The name of the episode.
    - **release_date** (string) - The date the episode was released.
    - **release_date_precision** (string) - The precision of the release date ('year', 'month', or 'day').
    - **resume_point** (object) - The user's most recent position in the episode.
      - **fully_played** (boolean) - Whether or not the episode has been fully played.
      - **resume_position_ms** (integer) - The position in milliseconds to resume playback from.
    - **type** (string) - The type of object (e.g., 'episode').
    - **uri** (string) - The Spotify URI for the episode.
    - **restrictions** (object) - Any restrictions for the episode.
      - **reason** (string) - The reason for the restriction.

#### Response Example
```json
{
  "available_markets": ["string"],
  "copyrights": [
    {
      "text": "string",
      "type": "string"
    }
  ],
  "description": "string",
  "html_description": "string",
  "explicit": false,
  "external_urls": {
    "spotify": "string"
  },
  "href": "string",
  "id": "string",
  "images": [
    {
      "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "height": 300,
      "width": 300
    }
  ],
  "is_externally_hosted": false,
  "languages": ["string"],
  "media_type": "string",
  "name": "string",
  "publisher": "string",
  "type": "show",
  "uri": "string",
  "total_episodes": 0,
  "episodes": {
    "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
    "limit": 20,
    "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    "offset": 0,
    "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    "total": 4,
    "items": [
      {
        "audio_preview_url": "https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17",
        "description": "A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.",
        "html_description": "<p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>",
        "duration_ms": 1686230,
        "explicit": false,
        "external_urls": {
          "spotify": "string"
        },
        "href": "https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ",
        "id": "5Xt5DXGzch68nYYamXrNxZ",
        "images": [
          {
            "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            "height": 300,
            "width": 300
          }
        ],
        "is_externally_hosted": false,
        "is_playable": false,
        "language": "en",
        "languages": ["fr", "en"],
        "name": "Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators",
        "release_date": "1981-12-15",
        "release_date_precision": "day",
        "resume_point": {
          "fully_played": false,
          "resume_position_ms": 0
        },
        "type": "episode",
        "uri": "spotify:episode:0zLhl3WsOCQHbe1BPTiHgr",
        "restrictions": {
          "reason": "string"
        }
      }
    ]
  }
}
```
```

--------------------------------

### GET /v1/me/shows

Source: https://developer.spotify.com/documentation/web-api/reference/get-users-saved-shows

Retrieve a list of shows saved by the current user. This endpoint supports pagination with 'limit' and 'offset' query parameters.

```APIDOC
## GET /v1/me/shows

### Description
Retrieve a list of shows saved by the current user. This endpoint supports pagination with 'limit' and 'offset' query parameters.

### Method
GET

### Endpoint
/v1/me/shows

### Query Parameters
- **limit** (integer) - Optional - The maximum number of items to return in the response. Default is 20.
- **offset** (integer) - Optional - The number of items to skip before returning results. Default is 0.

### Request Example
```curl
curl --request GET \
  --url https://api.spotify.com/v1/me/shows \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **href** (string) - A link to the Web API endpoint returning the full result of the request.
- **limit** (integer) - The maximum number of items in the response.
- **next** (string, null) - URL to the next page of items. Null if none.
- **offset** (integer) - The offset of the items returned.
- **previous** (string, null) - URL to the previous page of items. Null if none.
- **total** (integer) - The total number of items available to return.
- **items** (array of SavedShowObject) - An array of saved show objects.
  - **added_at** (string [date-time]) - The date and time the show was saved.
  - **show** (object) - Information about the show.
    - **available_markets** (array of strings) - A list of countries where the show can be played.
    - **copyrights** (array of CopyrightObject) - The copyright statements of the show.
    - **description** (string) - A description of the show (HTML tags stripped).
    - **html_description** (string) - A description of the show (may contain HTML tags).
    - **explicit** (boolean) - Whether or not the show has explicit content.
    - **external_urls** (object) - External URLs for this show.
    - **href** (string) - A link to the Web API endpoint providing full details of the show.
    - **id** (string) - The Spotify ID for the show.
    - **images** (array of ImageObject) - The cover art for the show.
    - **is_externally_hosted** (boolean) - True if episodes are hosted outside Spotify's CDN.
    - **languages** (array of strings) - Languages used in the show.
    - **media_type** (string) - The media type of the show.
    - **name** (string) - The name of the show.
    - **publisher** (string) - The publisher of the show.
    - **type** (string) - The object type ('show').
    - **uri** (string) - The Spotify URI for the show.
    - **total_episodes** (integer) - The total number of episodes in the show.

#### Response Example
```json
{
  "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
  "limit": 20,
  "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  "offset": 0,
  "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  "total": 4,
  "items": [
    {
      "added_at": "string",
      "show": {
        "available_markets": ["string"],
        "copyrights": [
          {
            "text": "string",
            "type": "string"
          }
        ],
        "description": "string",
        "html_description": "string",
        "explicit": false,
        "external_urls": {
          "spotify": "string"
        },
        "href": "string",
        "id": "string",
        "images": [
          {
            "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            "height": 300,
            "width": 300
          }
        ],
        "is_externally_hosted": false,
        "languages": ["string"],
        "media_type": "string",
        "name": "string",
        "publisher": "string",
        "type": "show",
        "uri": "string",
        "total_episodes": 0
      }
    }
  ]
}
```

#### Error Responses
- **401**: Bad or expired token.
- **403**: Bad OAuth request.
- **429**: Rate limiting has been applied.
```

--------------------------------

### GET /v1/browse/new-releases

Source: https://developer.spotify.com/documentation/web-api/reference/get-new-releases

Retrieves a list of new album releases, with options for pagination.

```APIDOC
## GET /v1/browse/new-releases

### Description
Retrieves a paged collection of new album releases.

### Method
GET

### Endpoint
`https://api.spotify.com/v1/browse/new-releases`

### Query Parameters
- **limit** (integer) - Optional - The maximum number of items to return in the response. Default is 20.
- **offset** (integer) - Optional - The offset of the items to return. Default is 0.

### Response
#### Success Response (200)
- **href** (string) - A link to the Web API endpoint returning the full result of the request.
- **limit** (integer) - The maximum number of items in the response.
- **next** (string, nullable) - URL to the next page of items. `null` if none.
- **offset** (integer) - The offset of the items returned.
- **previous** (string, nullable) - URL to the previous page of items. `null` if none.
- **total** (integer) - The total number of items available to return.
- **items** (array of SimplifiedAlbumObject) - An array of simplified album objects.
  - **album_type** (string) - The type of the album. Allowed values: `"album"`, `"single"`, `"compilation"`.
  - **total_tracks** (integer) - The number of tracks in the album.
  - **available_markets** (array of strings) - The markets in which the album is available (ISO 3166-1 alpha-2 country codes).
  - **external_urls** (object) - Known external URLs for this album.
    - **spotify** (string) - The Spotify URL for the object.
  - **href** (string) - A link to the Web API endpoint providing full details of the album.
  - **id** (string) - The Spotify ID for the album.
  - **images** (array of ImageObject) - The cover art for the album in various sizes.
    - **url** (string) - The source URL of the image.
    - **height** (integer, nullable) - The image height in pixels.
    - **width** (integer, nullable) - The image width in pixels.
  - **name** (string) - The name of the album.
  - **release_date** (string) - The date the album was first released.
  - **release_date_precision** (string) - The precision of the `release_date` value. Allowed values: `"year"`, `"month"`, `"day"`.
  - **restrictions** (object, nullable) - Included if a content restriction is applied.
    - **reason** (string) - The reason for the restriction. Allowed values: `"market"`, `"product"`, `"explicit"`.
  - **type** (string) - The object type. Allowed values: `"album"`.
  - **uri** (string) - The Spotify URI for the album.
  - **artists** (array of SimplifiedArtistObject) - The artists of the album.
    - **external_urls** (object) - Known external URLs for this artist.
      - **spotify** (string) - The Spotify URL for the object.
    - **href** (string) - A link to the Web API endpoint providing full details of the artist.
    - **id** (string) - The Spotify ID for the artist.
    - **name** (string) - The name of the artist.
    - **type** (string) - The object type. Allowed values: `"artist"`.
    - **uri** (string) - The Spotify URI for the artist.

#### Error Response
- **401** - Bad or expired token.
- **403** - Bad OAuth request or invalid scope.
- **429** - Rate limiting errors.

### Request Example
```json
{
  "example": "curl --request GET \
  --url https://api.spotify.com/v1/browse/new-releases \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'"
}
```

### Response Example
```json
{
  "example": "{\"albums\": {\"href\": \"https://api.spotify.com/v1/me/shows?offset=0&limit=20\", \"items\": [{\"album_type\": \"compilation\", \"total_tracks\": 9, \"available_markets\": [\"CA\", \"BR\", \"IT\"], \"external_urls\": {\"spotify\": \"https://open.spotify.com/artist/0TnIq5VzX3v6fBfP050j0m\"}, \"href\": \"https://api.spotify.com/v1/albums/4iV5W9uYEdYETAMnsWzZcj\", \"id\": \"4iV5W9uYEdYETAMnsWzZcj\", \"images\": [{\"url\": \"https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\", \"height\": 300, \"width\": 300}], \"name\": \"Example Album Name\", \"release_date\": \"1981-12\", \"release_date_precision\": \"year\", \"restrictions\": {\"reason\": \"market\"}, \"type\": \"album\", \"uri\": \"spotify:album:4iV5W9uYEdYETAMnsWzZcj\", \"artists\": [{\"external_urls\": {\"spotify\": \"https://open.spotify.com/artist/0TnIq5VzX3v6fBfP050j0m\"}, \"href\": \"https://api.spotify.com/v1/artists/0TnIq5VzX3v6fBfP050j0m\", \"id\": \"0TnIq5VzX3v6fBfP050j0m\", \"name\": \"Example Artist Name\", \"type\": \"artist\", \"uri\": \"spotify:artist:0TnIq5VzX3v6fBfP050j0m\"}]}], \"limit\": 20, \"next\": \"https://api.spotify.com/v1/me/shows?offset=1&limit=1\", \"offset\": 0, \"previous\": null, \"total\": 4}}"}
```
```

--------------------------------

### GET /audiobooks

Source: https://developer.spotify.com/documentation/web-api/reference/get-multiple-audiobooks

Fetches a list of audiobooks based on provided IDs and market.

```APIDOC
## GET /audiobooks

### Description
Retrieve information about one or more Spotify audiobooks. You can specify a comma-separated list of audiobook IDs and optionally filter the results by a specific market.

### Method
GET

### Endpoint
/audiobooks

### Parameters
#### Query Parameters
- **ids** (string) - Required - A comma-separated list of the Spotify IDs. Maximum: 50 IDs. Example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If provided, only content available in that market will be returned. If a user access token is provided, the user's country takes priority. If neither market nor user country is provided, content may be considered unavailable.

### Request Example
```
GET /v1/audiobooks?ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ&market=ES
```

### Response
#### Success Response (200)
- **audiobooks** (array) - A list of audiobook objects.
  - **available_markets** (array) - A list of markets where the audiobook is available.
  - **copyrights** (array) - Information about the copyright of the audiobook.
  - **description** (string) - A description of the audiobook.
  - **html_description** (string) - An HTML formatted description of the audiobook.
  - **id** (string) - The Spotify ID for the audiobook.
  - **images** (array) - Images associated with the audiobook.
  - **name** (string) - The name of the audiobook.
  - **narrators** (array) - A list of narrators for the audiobook.
  - **publisher** (string) - The publisher of the audiobook.
  - **total_length_ms** (integer) - The total length of the audiobook in milliseconds.
  - **type** (string) - The type of object (e.g., 'audiobook').
  - **uri** (string) - The Spotify URI for the audiobook.

#### Response Example
```json
{
  "audiobooks": [
    {
      "available_markets": ["AR", "AU", "BG", "BO", "BR", "CA", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IN", "IS", "IT", "JP", "KR", "LI", "LT", "LU", "LV", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN"],
      "copyrights": [
        {
          "text": "© 2023 Spotify AB",
          "type": "copyright"
        }
      ],
      "description": "A gripping tale of adventure and discovery.",
      "html_description": "<p>A gripping tale of adventure and discovery.</p>",
      "id": "18yVqkdbdRvS24c0Ilj2ci",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab676663000022a518yVqkdbdRvS24c0Ilj2ci",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab676663000014ed18yVqkdbdRvS24c0Ilj2ci",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/ab676663000014a118yVqkdbdRvS24c0Ilj2ci",
          "width": 64
        }
      ],
      "name": "The Great Adventure",
      "narrators": ["John Doe"],
      "publisher": "Awesome Books Inc.",
      "total_length_ms": 7200000,
      "type": "audiobook",
      "uri": "spotify:episode:18yVqkdbdRvS24c0Ilj2ci"
    }
  ]
}
```
```

--------------------------------

### GET /episodes

Source: https://developer.spotify.com/documentation/web-api/reference/search

Get Spotify catalog information for a single episode or a multiple episodes. This endpoint allows retrieval of detailed information about one or more episodes based on their Spotify IDs.

```APIDOC
## GET /episodes

### Description
Get Spotify catalog information for a single episode or a multiple episodes. This endpoint allows retrieval of detailed information about one or more episodes based on their Spotify IDs.

### Method
GET

### Endpoint
/episodes

### Parameters
#### Query Parameters
- **ids** (string) - Required - A comma-separated list of the Spotify IDs for the episodes. Maximum: 50 IDs.
- **market** (string) - Optional - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter if you want the response to be localized to a specific country. If omitted, the general Spotify catalog will be returned.

### Request Example
```json
{
  "example": "GET /v1/episodes?ids=77ddkZJxufx71X5f7y5z20,09z1xK0f00f00f00f00f00"
}
```

### Response
#### Success Response (200)
- **episodes** (array of EpisodeObject) - An array of episode objects.

#### Response Example
```json
{
  "example": "{\n  \"episodes\": [\n    {\n      \"audio_preview_url\": \"https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17\",\n      \"description\": \"A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.\",\n      \"html_description\": \"<p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>\",\n      \"duration_ms\": 1686230,\n      \"explicit\": false,\n      \"external_urls\": {\n        \"spotify\": \"https://open.spotify.com/episode/5Xt5DXGzch68nYYamXrNxZ\"\n      },\n      \"href\": \"https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ\",\n      \"id\": \"5Xt5DXGzch68nYYamXrNxZ\",\n      \"images\": [\n        {\n          \"height\": 300,\n          \"url\": \"https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\",\n          \"width\": 300\n        }\n      ],\n      \"is_externally_hosted\": false,\n      \"is_playable\": true,\n      \"language\": \"en\",\n      \"languages\": [\n        \"en\"\n      ],\n      \"name\": \"Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators\",\n      \"release_date\": \"1981-12-15\",\n      \"release_date_precision\": \"day\",\n      \"resume_point\": {\n        \"fully_played\": false,\n        \"resume_position_ms\": 10000\n      },\n      \"type\": \"episode\",\n      \"uri\": \"spotify:episode:5Xt5DXGzch68nYYamXrNxZ\"\n    }\n  ]\n}"
}
```
```

--------------------------------

### Get Followed Artists (HTTPie)

Source: https://developer.spotify.com/documentation/web-api/reference/get-followed

This snippet illustrates retrieving followed artists with HTTPie. It includes the necessary Authorization header for API access.

```shell
http GET https://api.spotify.com/v1/me/following \
  'Authorization:Bearer 1POdFZRZbvb...qqillRxMr2z' \
  type=artist
```

--------------------------------

### Request User Authorization with PKCE (JavaScript)

Source: https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow

Constructs and redirects to the Spotify authorization URL, including the necessary PKCE parameters (`code_challenge` and `code_challenge_method`). It also stores the `code_verifier` in local storage for the next step.

```javascript
const clientId = 'YOUR_CLIENT_ID';
const redirectUri = 'http://127.0.0.1:8080';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

// generated in the previous step
window.localStorage.setItem('code_verifier', codeVerifier);

const params = {
  response_type: 'code',
  client_id: clientId,
  scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
}

authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();
```

--------------------------------

### GET /v1/me/player/devices

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-users-available-devices

Retrieves a list of all devices a user can control, such as computers, smartphones, and speakers. This endpoint is useful for understanding where playback can occur and for controlling playback across different devices.

```APIDOC
## GET /v1/me/player/devices

### Description
Retrieves a list of all devices a user can control, such as computers, smartphones, and speakers. This endpoint is useful for understanding where playback can occur and for controlling playback across different devices.

### Method
GET

### Endpoint
https://api.spotify.com/v1/me/player/devices

### Parameters
#### Query Parameters
* None

#### Request Body
* None

### Request Example
```
curl --request GET \
  --url https://api.spotify.com/v1/me/player/devices \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **devices** (array) - An array of Device Objects.

#### Device Object
- **id** (string, nullable) - The device ID. This ID is unique and persistent to some extent. However, this is not guaranteed and any cached `device_id` should periodically be cleared out and refetched as necessary.
- **is_active** (boolean) - If this device is the currently active device.
- **is_private_session** (boolean) - If this device is currently in a private session.
- **is_restricted** (boolean) - Whether controlling this device is restricted. At present if this is "true" then no Web API commands will be accepted by this device.
- **name** (string) - A human-readable name for the device. Some devices have a name that the user can configure (e.g. "Loudest speaker") and some devices have a generic name associated with the manufacturer or device model.
- **type** (string) - Device type, such as "computer", "smartphone" or "speaker".
- **volume_percent** (integer, nullable) - The current volume in percent. Range: `0` - `100`.
- **supports_volume** (boolean) - If this device can be used to set the volume.

#### Response Example
```json
{
  "devices": [
    {
      "id": "string",
      "is_active": false,
      "is_private_session": false,
      "is_restricted": false,
      "name": "Kitchen speaker",
      "type": "computer",
      "volume_percent": 59,
      "supports_volume": false
    }
  ]
}
```

#### Error Responses
- **401**: Bad or expired token.
- **403**: Bad OAuth request or invalid scope.
- **429**: Rate limiting information.
```

--------------------------------

### GET /chapters

Source: https://developer.spotify.com/documentation/web-api/reference/get-several-chapters

Fetches details for one or more chapters based on their Spotify IDs. You can also specify a market to filter content availability.

```APIDOC
## GET /chapters

### Description
Retrieve information about one or more Spotify chapters.

### Method
GET

### Endpoint
/chapters

### Parameters
#### Query Parameters
- **ids** (string) - Required - A comma-separated list of the Spotify IDs. Maximum: 50 IDs. Example: `ids=0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU`
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned. If a valid user access token is specified, the country associated with the user account will take priority. If neither market nor user country are provided, the content is considered unavailable. Example: `market=ES`

### Request Example
```
GET /chapters?ids=0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU&market=US
```

### Response
#### Success Response (200)
- **chapters** (array) - An array of chapter objects.
  - **name** (string) - The name of the chapter.
  - **id** (string) - The Spotify ID for the chapter.
  - **description** (string) - A description of the chapter.
  - **html_description** (string) - An HTML description of the chapter.
  - **images** (array) - An array of image objects for the chapter.
  - **audio_preview_url** (string) - A URL to a preview of the chapter's audio.
  - **duration_ms** (integer) - The duration of the chapter in milliseconds.
  - **explicit** (boolean) - Whether or not the content is explicit.
  - **external_urls** (object) - Known external URLs for this object.
  - **href** (string) - A link to the Web API endpoint providing full details of the chapter.
  - **type** (string) - The object type.
  - **uri** (string) - The Spotify URI for the chapter.
  - **resume_point** (object) - The user's most recent position in the chapter.

#### Response Example
```json
{
  "chapters": [
    {
      "name": "Chapter 1",
      "id": "0IsXVP0JmcB2adSE338GkK",
      "description": "This is the first chapter.",
      "html_description": "<p>This is the first chapter.</p>",
      "images": [
        {
          "url": "https://i.scdn.co/image/abc123xyz",
          "height": 640,
          "width": 640
        }
      ],
      "audio_preview_url": "https://p.scdn.co/preview/abc123xyz",
      "duration_ms": 180000,
      "explicit": false,
      "external_urls": {
        "spotify": "https://open.spotify.com/episode/0IsXVP0JmcB2adSE338GkK"
      },
      "href": "https://api.spotify.com/v1/episodes/0IsXVP0JmcB2adSE338GkK",
      "type": "episode",
      "uri": "spotify:episode:0IsXVP0JmcB2adSE338GkK",
      "resume_point": {
        "fully_played": false,
        "resume_position_ms": 0
      }
    }
  ]
}
```
```

--------------------------------

### Get User's Saved Episodes

Source: https://developer.spotify.com/documentation/web-api/reference/get-an-episode

Get a list of the episodes saved to the current user's library. Requires appropriate authorization scopes.

```APIDOC
## GET /v1/me/episodes

### Description
Get a list of the episodes saved to the current user's library.

### Method
GET

### Endpoint
`/v1/me/episodes`

### Parameters
#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code or the keyword `from_token`. Provide this parameter if you want the response to be localized to a specific market.
- **limit** (integer) - Optional - The maximum number of items to return. Default: 20. Maximum: 50.
- **offset** (integer) - Optional - The index of the first item to return. Default: 0.

### Request Example
```json
{
  "example": "GET /v1/me/episodes?market=US&limit=10&offset=5"
}
```

### Response
#### Success Response (200)
- **href** (string) - A link to the Web API endpoint providing full results.
- **items** (array) - An array of saved episode objects.
- **limit** (integer) - The maximum number of items to be returned.
- **next** (string) - URL to the next page of items, or null if it is the last page.
- **offset** (integer) - The offset from the start of the collection.
- **previous** (string) - URL to the previous page of items, or null if it is the first page.
- **total** (integer) - The total number of items available in the collection.

#### Response Example
```json
{
  "example": "{\n  \"href\": \"https://api.spotify.com/v1/me/episodes?offset=0&limit=2\",\n  \"items\": [ { \"added_at\": \"2023-01-01T10:00:00Z\", \"episode\": { \"id\": \"4iV5W9uYEdYUVa79Axb7Rh\", \"name\": \"Example Episode 1\" } }, { \"added_at\": \"2023-01-02T11:00:00Z\", \"episode\": { \"id\": \"2xqK0kk2Oe9xzBFDrbQpyw\", \"name\": \"Example Episode 2\" } } ],\n  \"limit\": 2,\n  \"next\": \"https://api.spotify.com/v1/me/episodes?offset=2&limit=2\",\n  \"offset\": 0,\n  \"previous\": null,\n  \"total\": 5\n}"}
```
```

--------------------------------

### Spotify API Show Response Sample (JSON)

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-show

This JSON object represents a sample response from the Spotify Web API for a show. It includes details about available markets, copyright information, descriptions (both plain text and HTML), external URLs, images, and a list of episodes with their respective metadata. The structure is typical for retrieving information about a podcast or show on Spotify.

```json
{
  "available_markets": ["string"],
  "copyrights": [
    {
      "text": "string",
      "type": "string"
    }
  ],
  "description": "string",
  "html_description": "string",
  "explicit": false,
  "external_urls": {
    "spotify": "string"
  },
  "href": "string",
  "id": "string",
  "images": [
    {
      "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "height": 300,
      "width": 300
    }
  ],
  "is_externally_hosted": false,
  "languages": ["string"],
  "media_type": "string",
  "name": "string",
  "publisher": "string",
  "type": "show",
  "uri": "string",
  "total_episodes": 0,
  "episodes": {
    "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
    "limit": 20,
    "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    "offset": 0,
    "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    "total": 4,
    "items": [
      {
        "audio_preview_url": "https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17",
        "description": "A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.",
        "html_description": "<p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>",
        "duration_ms": 1686230,
        "explicit": false,
        "external_urls": {
          "spotify": "string"
        },
        "href": "https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ",
        "id": "5Xt5DXGzch68nYYamXrNxZ",
        "images": [
          {
            "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            "height": 300,
            "width": 300
          }
        ],
        "is_externally_hosted": false,
        "is_playable": false,
        "language": "en",
        "languages": ["fr", "en"],
        "name": "Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators",
        "release_date": "1981-12-15",
        "release_date_precision": "day",
        "resume_point": {
          "fully_played": false,
          "resume_position_ms": 0
        },
        "type": "episode",
        "uri": "spotify:episode:0zLhl3WsOCQHbe1BPTiHgr",
        "restrictions": {
          "reason": "string"
        }
      }
    ]
  }
}
```

--------------------------------

### Get Available Markets - HTTPie Request

Source: https://developer.spotify.com/documentation/web-api/reference/get-available-markets

This snippet illustrates how to use HTTPie, a command-line HTTP client, to request available markets from the Spotify API. It includes the necessary Authorization header.

```bash
http GET https://api.spotify.com/v1/markets \
  Authorization:Bearer 1POdFZRZbvb...qqillRxMr2z
```

--------------------------------

### Get Several Tracks - Wget Request

Source: https://developer.spotify.com/documentation/web-api/reference/get-several-tracks

This snippet shows how to retrieve multiple tracks using the Wget command-line utility. Similar to cURL, it requires an authorization token and a list of track IDs. The response is a JSON object detailing the requested tracks.

```bash
wget --header="Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z" "https://api.spotify.com/v1/tracks?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B"
```

--------------------------------

### Create Playlist

Source: https://developer.spotify.com/documentation/web-api/reference/create-playlist-for-user

Create a playlist for a specific user. The playlist will be empty until you add tracks to it.

```APIDOC
## POST /v1/users/{user_id}/playlists

### Description
Create a playlist for a specific user. The playlist will be empty until you add tracks to it.

### Method
POST

### Endpoint
/v1/users/{user_id}/playlists

### Parameters
#### Path Parameters
- **user_id** (string) - Required - The user's Spotify ID or the string "me" to refer to the current user.

#### Query Parameters
None

#### Request Body
- **name** (string) - Required - The name for the playlist, otherwise the playlist will have no name.
- **public** (boolean) - Optional - If true, the playlist will be public. Otherwise, false.
- **collaborative** (boolean) - Optional - If true, the playlist will be collaborative.
- **description** (string) - Optional - Personalized description for the playlist. Maximum 300 characters.

### Request Example
```json
{
  "name": "New Playlist",
  "description": "New playlist description",
  "public": false
}
```

### Response
#### Success Response (201 Created)
- **id** (string) - The Spotify ID for the playlist.
- **name** (string) - The name of the playlist.
- **public** (boolean) - Whether the playlist is public.
- **collaborative** (boolean) - Whether the playlist is collaborative.
- **description** (string) - The description of the playlist.
- **uri** (string) - The Spotify URI for the playlist.
- **owner** (object) - The user who owns the playlist.
  - **display_name** (string) - The name of the user.
  - **external_urls** (object) - Known external URLs for this object.
    - **spotify** (string) - The Spotify URL for the object.
  - **href** (string) - A link to the Web API endpoint providing full details of this owner.
  - **id** (string) - The Spotify ID for the owner.
  - **type** (string) - The object type, currently 'user'.
  - **uri** (string) - The Spotify URI for the owner.
- **snapshot_id** (string) - The revision ID of the playlist's content.
- **external_urls** (object) - Known external URLs for this object.
  - **spotify** (string) - The Spotify URL for the object.
- **href** (string) - A link to the Web API endpoint providing full details of this playlist.
- **type** (string) - The object type, currently 'playlist'.
- **tracks** (object) - A link to the Web API endpoint for the playlist's tracks.
  - **href** (string) - A link to the Web API endpoint providing full details of the playlist's tracks.
  - **total** (integer) - The total number of tracks in the playlist.

#### Response Example
```json
{
  "id": "37i9dQZF1DXcBWIGoYBM5M",
  "name": "New Playlist",
  "public": false,
  "collaborative": false,
  "description": "New playlist description",
  "owner": {
    "display_name": "smedjan",
    "external_urls": {
      "spotify": "https://open.spotify.com/user/smedjan"
    },
    "href": "https://api.spotify.com/v1/users/smedjan",
    "id": "smedjan",
    "type": "user",
    "uri": "spotify:user:smedjan"
  },
  "snapshot_id": "J84jO3j9d3j8f8f8f8f8f8f8f8f8f8f8",
  "external_urls": {
    "spotify": "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
  },
  "href": "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M",
  "type": "playlist",
  "tracks": {
    "href": "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks",
    "total": 0
  }
}
```
```

--------------------------------

### GET /v1/me/shows

Source: https://developer.spotify.com/documentation/web-api/reference/get-users-saved-episodes

Retrieves a list of episodes saved by the current user. This endpoint supports pagination to handle large numbers of saved episodes.

```APIDOC
## GET /v1/me/shows

### Description
Retrieves a list of episodes saved by the current user. This endpoint supports pagination to handle large numbers of saved episodes.

### Method
GET

### Endpoint
/v1/me/shows

### Query Parameters
- **limit** (integer) - Optional - The maximum number of items in the response (as set in the query or by default).
- **offset** (integer) - Optional - The offset of the items returned (as set in the query or by default).

### Response
#### Success Response (200)
- **href** (string) - A link to the Web API endpoint returning the full result of the request.
- **limit** (integer) - The maximum number of items in the response.
- **next** (string) - URL to the next page of items. ( `null` if none).
- **offset** (integer) - The offset of the items returned.
- **previous** (string) - URL to the previous page of items. ( `null` if none).
- **total** (integer) - The total number of items available to return.
- **items** (array of SavedEpisodeObject) - An array of saved episode objects.
  - **added_at** (string [date-time]) - The date and time the episode was saved.
  - **episode** (object) - Information about the episode.
    - **audio_preview_url** (string) - A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.
    - **description** (string) - A description of the episode.
    - **html_description** (string) - A description of the episode, potentially containing HTML tags.
    - **duration_ms** (integer) - The episode length in milliseconds.
    - **explicit** (boolean) - Whether or not the episode has explicit content.
    - **external_urls** (object) - External URLs for this episode.
      - **spotify** (string) - The Spotify URL for the object.
    - **href** (string) - A link to the Web API endpoint providing full details of the episode.
    - **id** (string) - The Spotify ID for the episode.
    - **images** (array of ImageObject) - The cover art for the episode in various sizes.
      - **url** (string) - The source URL of the image.
      - **height** (integer) - The image height in pixels.
      - **width** (integer) - The image width in pixels.
    - **is_externally_hosted** (boolean) - True if the episode is hosted outside of Spotify's CDN.
    - **is_playable** (boolean) - True if the episode is playable in the given market.
    - **language** (string) - Deprecated. The language used in the episode.
    - **languages** (array of strings) - A list of the languages used in the episode.
    - **name** (string) - The name of the episode.
    - **release_date** (string) - The date the episode was first released.
    - **release_date_precision** (string) - The precision with which `release_date` value is known.
    - **resume_point** (object) - The user's most recent position in the episode.
      - **fully_played** (boolean) - Whether or not the episode has been fully played by the user.
      - **resume_position_ms** (integer) - The user's most recent position in the episode in milliseconds.
    - **type** (string) - The object type.
    - **uri** (string) - The Spotify URI for the episode.

#### Error Response
- **401** - Bad or expired token.
- **403** - Invalid scope or insufficient permissions.
- **429** - Rate limit exceeded.
```

--------------------------------

### GET /me

Source: https://developer.spotify.com/documentation/web-api/howtos/web-app-profile

Retrieves the current user's profile information.

```APIDOC
## GET /me

### Description
Retrieves the current user's profile information.

### Method
GET

### Endpoint
/me

### Parameters


### Request Example
```json
{
  "example": "/me"
}
```

### Response
#### Success Response (200)
- **display_name** (string) - The user's display name.
- **id** (string) - The user's Spotify ID.

#### Response Example
```json
{
  "display_name": "User Name",
  "id": "user_id"
}
```
```

--------------------------------

### Get Category Details using cURL

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-category

This snippet demonstrates how to fetch details for a specific Spotify category using the cURL command-line tool. It requires an authorization token and the category ID as parameters.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/browse/categories/dinner \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### GET /artists/{id}

Source: https://developer.spotify.com/documentation/web-api/howtos/web-app-profile

Fetches information about a single artist, including their name, genres, and related data.

```APIDOC
## GET /artists/{id}

### Description
Retrieves metadata for a specific artist, including their genres and related artists.

### Method
GET

### Endpoint
/artists/{id}

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID of the artist.

### Request Example
```json
{
  "example": "/artists/000000000000000000000000000000"
}
```

### Response
#### Success Response (200)
- **name** (string) - The name of the artist.
- **genres** (array) - The genres associated with the artist.

#### Response Example
```json
{
  "name": "Artist Name",
  "genres": [
    "genre1",
    "genre2"
  ]
}
```
```

--------------------------------

### GET /albums

Source: https://developer.spotify.com/documentation/web-api/concepts/apps

Retrieves information about several albums. This is useful for fetching multiple albums at once.

```APIDOC
## GET /albums

### Description
Retrieves information about several albums.

### Method
GET

### Endpoint
/albums

### Parameters
#### Query Parameters
- **ids** (string) - Required - A comma-separated list of the Spotify IDs for the albums.
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code or the string `from_token`.

### Request Example
{
  "example": ""
}

### Response
#### Success Response (200)
- **albums** (array) - An array of album objects.

#### Response Example
{
  "example": "{\n  \"albums\": [\n    {\n      \"album_type\": \"album\",\n      \"artists\": [\n        {\n          \"external_urls\": {\n            \"spotify\": \"https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02\"\n          },\n          \"href\": \"https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02\",\n          \"id\": \"06HL4z0CvFAxyc27GXpf02\",\n          \"name\": \"Taylor Swift\",\n          \"type\": \"artist\",\n          \"uri\": \"spotify:artist:06HL4z0CvFAxyc27GXpf02\"\n        }\n      ],\n      \"available_markets\": [\n        \"AD\",\n        \"AE\",\n        \"AG\",\n        \"AL\",\n        \"AM\",\n        \"AO\",\n        \"AR\",\n        \"AT\",\n        \"AU\",\n        \"AZ\",\n        \"BA\",\n        \"BB\",\n        \"BD\",\n        \"BE\",\n        \"BF\",\n        \"BG\",\n        \"BH\",\n        \"BI\",\n        \"BJ\",\n        \"BN\",\n        \"BO\",\n        \"BR\",\n        \"BS\",\n        \"BT\",\n        \"BW\",\n        \"BY\",\n        \"BZ\",\n        \"CA\",\n        \"CD\",\n        \"CG\",\n        \"CH\",\n        \"CI\",\n        \"CL\",\n        \"CM\",\n        \"CO\",\n        \"CR\",\n        \"CV\",\n        \"CY\",\n        \"CZ\",\n        \"DE\",\n        \"DJ\",\n        \"DK\",\n        \"DM\",\n        \"DO\",\n        \"DZ\",\n        \"EC\",\n        \"EE\",\n        \"EG\",\n        \"ES\",\n        \"ET\",\n        \"FI\",\n        \"FJ\",\n        \"FM\",\n        \"FR\",\n        \"GA\",\n        \"GB\",\n        \"GD\",\n        \"GE\",\n        \"GH\",\n        \"GM\",\n        \"GN\",\n        \"GQ\",\n        \"GR\",\n        \"GT\",\n        \"GW\",\n        \"GY\",\n        \"HK\",\n        \"HN\",\n        \"HR\",\n        \"HT\",\n        \"HU\",\n        \"ID\",\n        \"IE\",\n        \"IL\",\n        \"IN\",\n        \"IQ\",\n        \"IS\",\n        \"IT\",\n        \"JM\",\n        \"JO\",\n        \"JP\",\n        \"KE\",\n        \"KG\",\n        \"KH\",\n        \"KI\",\n        \"KM\",\n        \"KR\",\n        \"KW\",\n        \"KZ\",\n        \"LA\",\n        \"LB\",\n        \"LC\",\n        \"LI\",\n        \"LK\",\n        \"LR\",\n        \"LS\",\n        \"LT\",\n        \"LU\",\n        \"LV\",\n        \"LY\",\n        \"MA\",\n        \"MC\",\n        \"MD\",\n        \"ME\",\n        \"MG\",\n        \"MH\",\n        \"MK\",\n        \"ML\",\n        \"MN\",\n        \"MO\",\n        \"MR\",\n        \"MT\",\n        \"MU\",\n        \"MV\",\n        \"MW\",\n        \"MX\",\n        \"MY\",\n        \"MZ\",\n        \"NA\",\n        \"NE\",\n        \"NG\",\n        \"NI\",\n        \"NL\",\n        \"NO\",\n        \"NP\",\n        \"NR\",\n        \"NZ\",\n        \"OM\",\n        \"PA\",\n        \"PE\",\n        \"PG\",\n        \"PH\",\n        \"PK\",\n        \"PL\",\n        \"PS\",\n        \"PT\",\n        \"PW\",\n        \"PY\",\n        \"QA\",\n        \"RO\",\n        \"RS\",\n        \"RU\",\n        \"RW\",\n        \"SA\",\n        \"SB\",\n        \"SC\",\n        \"SE\",\n        \"SG\",\n        \"SI\",\n        \"SK\",\n        \"SL\",\n        \"SM\",\n        \"SN\",\n        \"SR\",\n        \"ST\",\n        \"SV\",\n        \"SY\",\n        \"SZ\",\n        \"TD\",\n        \"TG\",\n        \"TH\",\n        \"TJ\",\n        \"TL\",\n        \"TN\",\n        \"TO\",\n        \"TR\",\n        \"TT\",\n        \"TV\",\n        \"TW\",\n        \"TZ\",\n        \"UA\",\n        \"UG\",\n        \"US\",\n        \"UY\",\n        \"UZ\",\n        \"VC\",\n        \"VE\",\n        \"VN\",\n        \"VU\",\n        \"WS\",\n        \"XK\",\n        \"ZA\",\n        \"ZM\",\n        \"ZW\"\n      ],\n      \"external_urls\": {\n        \"spotify\": \"https://open.spotify.com/album/1o5955gE7L2XkXCHhZ2B40\"\n      },\n      \"href\": \"https://api.spotify.com/v1/albums/1o5955gE7L2XkXCHhZ2B40\",\n      \"id\": \"1o5955gE7L2XkXCHhZ2B40\",\n      \"images\": [\n        {\n          \"height\": 640,\n          \"url\": \"https://i.scdn.co/image/ab67616d0000b27376c989676e65934570077e68\",\n          \"width\": 640\n        },\n        {\n          \"height\": 300,\n          \"url\": \"https://i.scdn.co/image/ab67616d00001e0276c989676e65934570077e68\",\n          \"width\": 300\n        },\n        {\n          \"height\": 64,\n          \"url\": \"https://i.scdn.co/image/ab67616d0000485176c989676e65934570077e68\",\n          \"width\": 64\n        }\n      ],\n      \"name\": \"Midnights (3am Edition)\",\n      \"release_date\": \"2022-10-21\",\n      \"release_date_precision\": \"day\",\n      \"total_tracks\": 31,\n      \"type\": \"album\",\n      \"uri\": \"spotify:album:1o5955gE7L2XkXCHhZ2B40\"\n    }\n  ]\n}"
}

```

--------------------------------

### Get Available Markets - Wget Request

Source: https://developer.spotify.com/documentation/web-api/reference/get-available-markets

This snippet shows how to fetch the list of available Spotify markets using Wget. Similar to cURL, it requires the 'Authorization' header for authentication.

```bash
wget 
  --header="Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z" 
  https://api.spotify.com/v1/markets
```

--------------------------------

### GET /artists/{id}/albums

Source: https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums

Get Spotify catalog information about an artist's albums. Includes singles and compilations, as well as the artist's related albums.

```APIDOC
## GET /artists/{id}/albums

### Description
Get Spotify catalog information about an artist's albums. Includes singles and compilations, as well as the artist's related albums.

### Method
GET

### Endpoint
/artists/{id}/albums

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID of the artist.
  Example: `0TnOYISbd1XYRBk9myaseg`

#### Query Parameters
- **include_groups** (string) - Optional - A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. Valid values are: `album`, `single`, `appears_on`, `compilation`. For example: `include_groups=album,single`.
  Example: `include_groups=single,appears_on`
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned. If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter. Note: If neither market or user country are provided, the content is considered unavailable for the client.
  Example: `market=ES`
- **limit** (integer) - Optional - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  Default: `limit=20`
  Range: `0` - `50`
  Example: `limit=10`
- **offset** (integer) - Optional - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
  Default: `offset=0`
  Example: `offset=5`

### Request Example
```json
{
  "example": "GET /artists/0TnOYISbd1XYRBk9myaseg/albums?include_groups=single,album&market=US&limit=10"
}
```

### Response
#### Success Response (200)
- **albums** (array) - A list of album objects.
- **album_type** (string) - The type of the album (e.g., 'album', 'single').
- **artists** (array) - The artists who performed on the album.
- **available_markets** (array) - The markets in which the album is available.
- **external_urls** (object) - Known external URLs for this album.
- **href** (string) - A link to the Web API endpoint providing full details of the album.
- **id** (string) - The Spotify ID for the album.
- **images** (array) - Images of the album.
- **name** (string) - The name of the album.
- **release_date** (string) - The date the album was first released.
- **release_date_precision** (string) - The precision of the release date (e.g., 'year', 'month', 'day').
- **total_tracks** (integer) - The total number of tracks on the album.
- **type** (string) - The object type.
- **uri** (string) - The Spotify URI for the album.

#### Response Example
```json
{
  "example": {
    "href": "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums?offset=0&limit=20&include_groups=single%2Calbum",
    "items": [
      {
        "album_type": "single",
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/0TnOYISbd1XYRBk9myaseg"
            },
            "href": "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg",
            "id": "0TnOYISbd1XYRBk9myaseg",
            "name": "Artist Name",
            "type": "artist",
            "uri": "spotify:artist:0TnOYISbd1XYRBk9myaseg"
          }
        ],
        "available_markets": [
          "CA",
          "MX",
          "US"
        ],
        "external_urls": {
          "spotify": "https://open.spotify.com/album/1xJ70W1j5fN7Q0f7vM1z2q"
        },
        "href": "https://api.spotify.com/v1/albums/1xJ70W1j5fN7Q0f7vM1z2q",
        "id": "1xJ70W1j5fN7Q0f7vM1z2q",
        "images": [
          {
            "height": 640,
            "url": "https://i.scdn.co/image/ab67616d0000b2731a2b3c4d5e6f7a8b9c0d1e2f",
            "width": 640
          },
          {
            "height": 300,
            "url": "https://i.scdn.co/image/ab67616d00001e021a2b3c4d5e6f7a8b9c0d1e2f",
            "width": 300
          },
          {
            "height": 64,
            "url": "https://i.scdn.co/image/ab67616d000044d01a2b3c4d5e6f7a8b9c0d1e2f",
            "width": 64
          }
        ],
        "name": "Example Single",
        "release_date": "2023-01-01",
        "release_date_precision": "day",
        "total_tracks": 1,
        "type": "album",
        "uri": "spotify:album:1xJ70W1j5fN7Q0f7vM1z2q"
      }
    ],
    "limit": 10,
    "next": "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums?offset=10&limit=10&include_groups=single%2Calbum",
    "offset": 0,
    "previous": null,
    "total": 50
  }
}
```
```

--------------------------------

### POST /me/playlists

Source: https://developer.spotify.com/documentation/web-api/reference/create-playlist

Creates a new playlist for the current user. You can specify the playlist's name, public/private status, collaborative status, and description.

```APIDOC
## POST /me/playlists

### Description
Creates a new playlist for the current user. You can specify the playlist's name, public/private status, collaborative status, and description.

### Method
POST

### Endpoint
/me/playlists

### Parameters
#### Query Parameters
None

#### Request Body
- **name** (string) - Required - The name for the new playlist, for example `"Your Coolest Playlist"`.
- **public** (boolean) - Optional - Defaults to `true`. The playlist's public/private status. `true` for public, `false` for private. Requires `playlist-modify-private` scope for private playlists.
- **collaborative** (boolean) - Optional - Defaults to `false`. If `true`, the playlist will be collaborative. Requires `playlist-modify-private` and `playlist-modify-public` scopes and `public` must be `false`.
- **description** (string) - Optional - The description for the playlist as displayed in Spotify Clients and the Web API.

### Request Example
```json
{
  "name": "My Awesome Playlist",
  "public": false,
  "collaborative": true,
  "description": "My favorite tracks"
}
```

### Response
#### Success Response (201 Created)
- **id** (string) - The ID of the newly created playlist.
- **snapshot_id** (string) - The snapshot ID of the newly created playlist.

#### Response Example
```json
{
  "id": "37i9dQZF1DXcBWIGoYBM5M",
  "snapshot_id": "DJJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJj
```

--------------------------------

### Get Available Genre Seeds Response Sample

Source: https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres

This snippet shows a sample JSON response for the 'Get Available Genre Seeds' endpoint. It contains a 'genres' key whose value is an array of strings, representing the available genre seeds.

```json
{
  "genres": ["alternative", "samba"]
}
```

--------------------------------

### PUT /me/player

Source: https://developer.spotify.com/documentation/web-api/reference/transfer-a-users-playback

Transfers playback to a specific device. You can also choose to start playback on the new device or maintain the current playback state.

```APIDOC
## PUT /me/player

### Description
Transfers playback to a specific device. You can also choose to start playback on the new device or maintain the current playback state.

### Method
PUT

### Endpoint
https://api.spotify.com/v1/me/player

### Parameters
#### Request Body
- **device_ids** (array of strings) - Required - A JSON array containing the ID of the device on which playback should be started/transferred. Note: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return `400 Bad Request`.
- **play** (boolean) - Optional - `true` to ensure playback happens on the new device. `false` or not provided to keep the current playback state.

### Request Example
```json
{
    "device_ids": [
        "74ASZWbe4lXaubB36ztrGX"
    ],
    "play": true
}
```

### Response
#### Success Response (204)
Playback transferred successfully. The response body will be empty.

#### Error Responses
- **401 Unauthorized**: The access token expired, is invalid, or the scope is insufficient.
- **403 Forbidden**: The request is forbidden, possibly due to user consent or account restrictions.
- **429 Too Many Requests**: The rate limit has been exceeded.
```

--------------------------------

### Get Information About the Queue

Source: https://developer.spotify.com/documentation/web-api/reference/get-queue

Retrieve information about the user's current playback queue, including the currently playing track or episode.

```APIDOC
## GET /playlists/{playlist_id}/tracks

### Description
This endpoint retrieves information about the user's current playback queue. It can return details about the currently playing track or episode.

### Method
GET

### Endpoint
/playlists/{playlist_id}/tracks

### Parameters
#### Path Parameters
- **playlist_id** (string) - Required - The Spotify ID for the playlist.

#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If provided, only tracks available in this market will be returned.
- **limit** (integer) - Optional - The maximum number of items to return. Default: 100, Max: 50.
- **offset** (integer) - Optional - The position in the collection of the first item to return. Default: 0.

### Request Body
This endpoint does not accept a request body.

### Response
#### Success Response (200)
- **currently_playing** (object) - Information about the currently playing track or episode. Can be `null`.
  - **album** (object) - The album on which the track appears.
    - **album_type** (string) - The type of the album. Allowed values: `"album"`, `"single"`, `"compilation"`.
    - **total_tracks** (integer) - The number of tracks in the album.
    - **available_markets** (array of strings) - The markets in which the album is available.
    - **external_urls** (object) - Known external URLs for this album.
      - **spotify** (string) - The Spotify URL for the object.
    - **href** (string) - A link to the Web API endpoint providing full details of the album.
    - **id** (string) - The Spotify ID for the album.
    - **images** (array of ImageObject) - The cover art for the album.
      - **url** (string) - The source URL of the image.
      - **height** (integer) - The image height in pixels.
      - **width** (integer) - The image width in pixels.
    - **name** (string) - The name of the album.
    - **release_date** (string) - The date the album was first released.
    - **release_date_precision** (string) - The precision of the release date. Allowed values: `"year"`, `"month"`, `"day"`.
    - **restrictions** (object) - Included if a content restriction is applied.
      - **reason** (string) - The reason for the restriction.
    - **type** (string) - The object type. Allowed values: `"album"`.
    - **uri** (string) - The Spotify URI for the album.
    - **artists** (array of SimplifiedArtistObject) - The artists of the album.
  - **artists** (array of SimplifiedArtistObject) - The artists who performed the track.
  - **available_markets** (array of strings) - A list of countries where the track can be played.
  - **disc_number** (integer) - The disc number.
  - **duration_ms** (integer) - The track length in milliseconds.
  - **explicit** (boolean) - Whether the track has explicit lyrics.
  - **external_ids** (object) - Known external IDs for the track.
    - **isrc** (string) - International Standard Recording Code.
    - **ean** (string) - International Article Number.
    - **upc** (string) - Universal Product Code.
  - **external_urls** (object) - Known external URLs for this track.
    - **spotify** (string) - The Spotify URL for the object.
  - **href** (string) - A link to the Web API endpoint providing full details of the track.
  - **id** (string) - The Spotify ID for the track.
  - **is_playable** (boolean) - Whether the track is playable in the given market.
  - **linked_from** (object) - Information about a linked track.

#### Error Response
- **401** - Bad or expired token.
- **403** - Invalid scope or insufficient permissions.
- **429** - Rate limiting has been exceeded.
```

--------------------------------

### PKCE Authorization Flow

Source: https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow

This section covers the generation of a code verifier and code challenge, followed by the request for user authorization via a GET request to the /authorize endpoint.

```APIDOC
## Code Verifier Generation

The PKCE authorization flow begins with generating a code verifier, a random string between 43 and 128 characters.

### Code
```javascript
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const codeVerifier = generateRandomString(64);
```

## Code Challenge Generation

The code verifier is then transformed using the SHA256 algorithm to create a code challenge.

### Code
```javascript
const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const hashed = await sha256(codeVerifier);
const codeChallenge = base64encode(hashed);
```

## Request User Authorization

A GET request to the `/authorize` endpoint is made to request user authorization, including the `code_challenge` and `code_challenge_method`.

### Method
GET

### Endpoint
`https://accounts.spotify.com/authorize`

### Query Parameters

- **client_id** (string) - Required - The Client ID generated after registering your application.
- **response_type** (string) - Required - Set to `code`.
- **redirect_uri** (string) - Required - The URI to redirect to after the user grants or denies permission.
- **state** (string) - Optional - Provides protection against attacks.
- **scope** (string) - Optional - A space-separated list of scopes.
- **code_challenge_method** (string) - Required - Set to `S256`.
- **code_challenge** (string) - Required - The calculated code challenge.

### Request Example
```javascript
const clientId = 'YOUR_CLIENT_ID';
const redirectUri = 'http://127.0.0.1:8080';
const scope = 'user-read-private user-read-email';

window.localStorage.setItem('code_verifier', codeVerifier);

const params = {
  response_type: 'code',
  client_id: clientId,
  scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
};

const authUrl = new URL("https://accounts.spotify.com/authorize");
authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();
```

### Description

This process initiates the user authorization flow by generating necessary PKCE parameters and redirecting the user to Spotify's authorization server. The `code_verifier` is stored in `localStorage` for subsequent steps.
```

--------------------------------

### GET /v1/audio-features/{id}

Source: https://developer.spotify.com/documentation/web-api/reference/get-audio-features

Get audio feature information for a single track based on its Spotify ID. This endpoint provides insights into various musical characteristics of the track.

```APIDOC
## GET /v1/audio-features/{id}

### Description
Retrieves audio features for one track. Use the track ID to get audio features for a single track.

### Method
GET

### Endpoint
`/v1/audio-features/{id}`

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID for the track.

### Request Example
```curl
curl --request GET \
  --url https://api.spotify.com/v1/audio-features/11dFghVXANMlKmJXsNCbNl \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **acousticness** (number [float]) - A confidence measure from 0.0 to 1.0 of whether the track is acoustic.
- **analysis_url** (string) - A URL to access the full audio analysis of this track.
- **danceability** (number [float]) - Describes how suitable a track is for dancing.
- **duration_ms** (integer) - The duration of the track in milliseconds.
- **energy** (number [float]) - A measure from 0.0 to 1.0 representing a perceptual measure of intensity and activity.
- **id** (string) - The Spotify ID for the track.
- **instrumentalness** (number [float]) - Predicts whether a track contains no vocals.
- **key** (integer) - The key the track is in. Integers map to pitches using standard Pitch Class notation.
- **liveness** (number [float]) - Detects the presence of an audience in the recording.
- **loudness** (number [float]) - The overall loudness of a track in decibels (dB).
- **mode** (integer) - Indicates the modality (major or minor) of a track.
- **speechiness** (number [float]) - Detects the presence of spoken words in a track.
- **tempo** (number [float]) - The overall estimated tempo of a track in beats per minute (BPM).
- **time_signature** (integer) - An estimated time signature.
- **track_href** (string) - A link to the Web API endpoint providing full details of the track.
- **type** (string) - The object type. Allowed values: "audio_features"
- **uri** (string) - The Spotify URI for the track.
- **valence** (number [float]) - Describes the musical positiveness conveyed by a track.

#### Response Example
```json
{
  "acousticness": 0.00242,
  "analysis_url": "https://api.spotify.com/v1/audio-analysis/2takcwOaAZWiXQijPHIx7B",
  "danceability": 0.585,
  "duration_ms": 237040,
  "energy": 0.842,
  "id": "2takcwOaAZWiXQijPHIx7B",
  "instrumentalness": 0.00686,
  "key": 9,
  "liveness": 0.0866,
  "loudness": -5.883,
  "mode": 0,
  "speechiness": 0.0556,
  "tempo": 118.211,
  "time_signature": 4,
  "track_href": "https://api.spotify.com/v1/tracks/2takcwOaAZWiXQijPHIx7B",
  "type": "audio_features",
  "uri": "spotify:track:2takcwOaAZWiXQijPHIx7B",
  "valence": 0.428
}
```

#### Error Responses
- **401** Unauthorized
- **403** Forbidden
- **429** Too Many Requests
```

--------------------------------

### GET /shows

Source: https://developer.spotify.com/documentation/web-api/reference/get-multiple-shows

Fetches a collection of shows by their Spotify IDs. You can optionally filter the results by a specified market. If a user access token is provided, the user's country takes precedence over the market parameter.

```APIDOC
## GET /shows

### Description
Retrieves information about multiple shows based on their Spotify IDs. You can optionally filter the results by a specified market. If a user access token is provided, the user's country takes precedence over the market parameter.

### Method
GET

### Endpoint
/shows

### Parameters
#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned. If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter. Note: If neither market or user country are provided, the content is considered unavailable for the client.
- **ids** (string) - Required - A comma-separated list of the Spotify IDs for the shows. Maximum: 50 IDs.

### Request Example
```curl
curl --request GET \
  --url 'https://api.spotify.com/v1/shows?ids=5CfCWKI5pZ28U0uOzXkDHe%2C5as3aKmN2k11yfDDDSrvaZ' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **shows** (array of SimplifiedShowObject) - Required - A set of shows.
  - **available_markets** (array of strings) - Required - A list of the countries in which the show can be played, identified by their ISO 3166-1 alpha-2 code.
  - **copyrights** (array of CopyrightObject) - Required - The copyright statements of the show.
    - **text** (string) - The copyright text for this content.
    - **type** (string) - The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.
  - **description** (string) - Required - A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
  - **html_description** (string) - Required - A description of the show. This field may contain HTML tags.
  - **explicit** (boolean) - Required - Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).
  - **external_urls** (object) - Required - External URLs for this show.
    - **spotify** (string) - The Spotify URL for the object.
  - **href** (string) - Required - A link to the Web API endpoint providing full details of the show.
  - **id** (string) - Required - The Spotify ID for the show.
  - **images** (array of ImageObject) - Required - The cover art for the show in various sizes, widest first.
    - **url** (string) - Required - The source URL of the image.
    - **height** (integer) - Required - The image height in pixels.
    - **width** (integer) - Required - The image width in pixels.
  - **is_externally_hosted** (boolean) - Required - True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be `null` in some cases.
  - **languages** (array of strings) - Required - A list of the languages used in the show, identified by their ISO 639 code.
  - **media_type** (string) - Required - The media type of the show.
  - **name** (string) - Required - The name of the episode.
  - **publisher** (string) - Required - The publisher of the show.
  - **type** (string) - Required - The object type. Allowed values: `"show"`.
  - **uri** (string) - Required - The Spotify URI for the show.
  - **total_episodes** (integer) - Required - The total number of episodes in the show.

#### Response Example
```json
{
  "shows": [
    {
      "available_markets": ["string"],
      "copyrights": [
        {
          "text": "string",
          "type": "string"
        }
      ],
      "description": "string",
      "html_description": "string",
      "explicit": false,
      "external_urls": {
        "spotify": "string"
      },
      "href": "string",
      "id": "string",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          "height": 300,
          "width": 300
        }
      ],
      "is_externally_hosted": false,
      "languages": ["string"],
      "media_type": "string",
      "name": "string",
      "publisher": "string",
      "type": "show",
      "uri": "string",
      "total_episodes": 0
    }
  ]
}
```

#### Error Responses
- **401**: Unauthorized
- **403**: Forbidden
- **429**: Too Many Requests
```

--------------------------------

### Spotify Callback Code Handling (TypeScript)

Source: https://developer.spotify.com/documentation/web-api/howtos/web-app-profile

Modifies the initial script to correctly handle the callback from Spotify. It parses the URL's query parameters to extract the authorization 'code'. If a code is present, it proceeds to get the access token and fetch the user profile; otherwise, it initiates the authorization flow.

```typescript
const clientId = "your_client_id";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    populateUI(profile);
}
```

--------------------------------

### GET /v1/artists/{id}/albums

Source: https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums

Get a list of the albums associated with an artist. This endpoint allows you to retrieve albums, singles, compilations, and appears_on groups for a given artist ID.

```APIDOC
## GET /v1/artists/{id}/albums

### Description
Get a list of the albums associated with an artist. This endpoint allows you to retrieve albums, singles, compilations, and appears_on groups for a given artist ID.

### Method
GET

### Endpoint
`/v1/artists/{id}/albums`

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID for the artist.

#### Query Parameters
- **include_groups** (string) - Optional - A comma-separated list of album types to return. Valid values are: `album`, `single`, `compilation`, `appears_on`.
- **market** (string) - Optional - An ISO 3166-1 country code. If provided, only products available in that market will be returned.
- **limit** (integer) - Optional - The maximum number of items to return. Default: 20. Maximum: 50.
- **offset** (integer) - Optional - The offset of the items to return (for pagination). Default: 0.

### Request Example
```curl
curl --request GET \
  --url https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **href** (string) - A link to the Web API endpoint returning the full result of the request.
- **limit** (integer) - The maximum number of items in the response.
- **next** (string) - URL to the next page of items. ( `null` if none).
- **offset** (integer) - The offset of the items returned.
- **previous** (string) - URL to the previous page of items. ( `null` if none).
- **total** (integer) - The total number of items available to return.
- **items** (array of SimplifiedAlbumObject) - A list of Simplified Album Objects.
  - **album_type** (string) - The type of the album. Allowed values: `"album"`, `"single"`, `"compilation"`.
  - **total_tracks** (integer) - The number of tracks in the album.
  - **available_markets** (array of strings) - The markets in which the album is available.
  - **external_urls** (object) - Known external URLs for this album.
    - **spotify** (string) - The Spotify URL for the object.
  - **href** (string) - A link to the Web API endpoint providing full details of the album.
  - **id** (string) - The Spotify ID for the album.
  - **images** (array of ImageObject) - The cover art for the album in various sizes.
    - **url** (string) - The source URL of the image.
    - **height** (integer) - The image height in pixels.
    - **width** (integer) - The image width in pixels.
  - **name** (string) - The name of the album.
  - **release_date** (string) - The date the album was first released.
  - **release_date_precision** (string) - The precision with which `release_date` value is known. Allowed values: `"year"`, `"month"`, `"day"`.
  - **restrictions** (object) - Included in the response when a content restriction is applied.
    - **reason** (string) - The reason for the restriction. Allowed values: `"market"`, `"product"`, `"explicit"`.
  - **type** (string) - The object type. Allowed values: `"album"`.
  - **uri** (string) - The Spotify URI for the album.
  - **artists** (array of SimplifiedArtistObject) - The artists of the album.
    - **external_urls** (object) - Known external URLs for this artist.
      - **spotify** (string) - The Spotify URL for the object.
    - **href** (string) - A link to the Web API endpoint providing full details of the artist.
    - **id** (string) - The Spotify ID for the artist.
    - **name** (string) - The name of the artist.
    - **type** (string) - The object type. Allowed values: `"artist"`.
    - **uri** (string) - The Spotify URI for the artist.
  - **album_group** (string) - This field describes the relationship between the artist and the album. Allowed values: `"album"`, `"single"`, `"compilation"`, `"appears_on"`.

#### Error Response
- **401** - Bad or expired token.
- **403** - Bad OAuth request or invalid scope.
- **429** - Rate limiting error.
```

--------------------------------

### GET /v1/artists/{id}/top-tracks

Source: https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks

Get Spotify's recommended search results for artists. This endpoint retrieves the top tracks for a given artist ID in a specified market.

```APIDOC
## GET /v1/artists/{id}/top-tracks

### Description
Retrieves the top tracks for a specified artist ID in a given market. This endpoint is useful for discovering popular music associated with an artist.

### Method
GET

### Endpoint
`/v1/artists/{id}/top-tracks`

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID for the artist.
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code or the keyword `from_token`. This is used to filter out tracks not available in that market. If omitted, the content will be returned for the user's market set in the `Accept-Language` header.

### Request Example
```curl
curl --request GET \
  --url https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **tracks** (array) - An array of track objects, each containing details about a top track.
  - **album** (object) - Information about the album the track belongs to.
    - **album_type** (string) - The type of the album.
    - **total_tracks** (integer) - The total number of tracks in the album.
    - **available_markets** (array) - A list of markets where the album is available.
    - **external_urls** (object) - Known external URLs for this album.
    - **href** (string) - A link to the Web API endpoint providing full details of the album.
    - **id** (string) - The Spotify ID for the album.
    - **images** (array) - An array of image objects for the album.
    - **name** (string) - The name of the album.
    - **release_date** (string) - The date the album was first released.
    - **release_date_precision** (string) - The precision with which `release_date` is known.
    - **restrictions** (object) - Included if the content restriction is applied.
      - **reason** (string) - The reason for the restriction.
    - **type** (string) - The type of the album: `album`.
    - **uri** (string) - The Spotify URI for the album.
    - **artists** (array) - The artists of the album.
  - **artists** (array) - The artists who performed the track.
  - **available_markets** (array) - A list of markets where the track is available.
  - **disc_number** (integer) - The disc number of the track.
  - **duration_ms** (integer) - The duration of the track in milliseconds.
  - **explicit** (boolean) - Whether or not the track has explicit content.
  - **external_ids** (object) - Known external IDs for the track.
  - **external_urls** (object) - Known external URLs for this track.
  - **href** (string) - A link to the Web API endpoint providing full details of the track.
  - **id** (string) - The Spotify ID for the track.
  - **is_playable** (boolean) - Whether or not the track is playable in the given market.
  - **linked_from** (object) - (Not present if the track isn't a local file or if the track is a local file but the artist is not known.) Part of a linked track.
  - **restrictions** (object) - Included if the content restriction is applied.
    - **reason** (string) - The reason for the restriction.
  - **name** (string) - The name of the track.
  - **popularity** (integer) - The popularity of the track.
  - **preview_url** (string) - A link to a 30 second preview of the track.
  - **track_number** (integer) - The track number on the album.
  - **type** (string) - The object type: `track`.
  - **uri** (string) - The Spotify URI for the track.
  - **is_local** (boolean) - Whether or not the track is from a local file.

#### Response Example
```json
{
  "tracks": [
    {
      "album": {
        "album_type": "compilation",
        "total_tracks": 9,
        "available_markets": ["CA", "BR", "IT"],
        "external_urls": {
          "spotify": "string"
        },
        "href": "string",
        "id": "2up3OPMp9Tb4dAKM2erWXQ",
        "images": [
          {
            "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            "height": 300,
            "width": 300
          }
        ],
        "name": "string",
        "release_date": "1981-12",
        "release_date_precision": "year",
        "restrictions": {
          "reason": "market"
        },
        "type": "album",
        "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
        "artists": [
          {
            "external_urls": {
              "spotify": "string"
            },
            "href": "string",
            "id": "string",
            "name": "string",
            "type": "artist",
            "uri": "string"
          }
        ]
      },
      "artists": [
        {
          "external_urls": {
            "spotify": "string"
          },
          "href": "string",
          "id": "string",
          "name": "string",
          "type": "artist",
          "uri": "string"
        }
      ],
      "available_markets": ["string"],
      "disc_number": 0,
      "duration_ms": 0,
      "explicit": false,
      "external_ids": {
        "isrc": "string",
        "ean": "string",
        "upc": "string"
      },
      "external_urls": {
        "spotify": "string"
      },
      "href": "string",
      "id": "string",
      "is_playable": false,
      "linked_from": {},
      "restrictions": {
        "reason": "string"
      },
      "name": "string",
      "popularity": 0,
      "preview_url": "string",
      "track_number": 0,
      "type": "track",
      "uri": "string",
      "is_local": false
    }
  ]
}
```
```

--------------------------------

### Get Available Devices

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-users-available-devices

Retrieves information about a user's available Spotify Connect devices. Note that some device models may not be supported and will not appear in the API response.

```APIDOC
## GET /me/player/devices

### Description
Get information about a user’s available Spotify Connect devices. Some device models are not supported and will not be listed in the API response.

### Method
GET

### Endpoint
/me/player/devices

### Parameters
#### Query Parameters
- **Authorization** (string) - Required - OAuth 2.0 token with the `user-read-playback-state` scope.

### Request Example
```
GET https://api.spotify.com/v1/me/player/devices
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Response
#### Success Response (200)
- **devices** (array) - A list of Spotify Connect devices.
  - **id** (string) - The device ID.
  - **is_active** (boolean) - Whether the device is currently active.
  - **is_private_session** (boolean) - Whether the device is in a private session.
  - **is_restricted** (boolean) - Whether the device is restricted.
  - **name** (string) - The name of the device.
  - **type** (string) - The type of the device (e.g., 'Computer', 'Smartphone', 'Speaker').
  - **volume_percent** (integer) - The current volume in percent.

#### Response Example
```json
{
  "devices": [
    {
      "id": "5f4922d35e30481076720697",
      "is_active": true,
      "is_private_session": false,
      "is_restricted": false,
      "name": "My Computer",
      "type": "Computer",
      "volume_percent": 100
    },
    {
      "id": "9a40970008174737a57567085308188212476531",
      "is_active": false,
      "is_private_session": false,
      "is_restricted": false,
      "name": "My Phone",
      "type": "Smartphone",
      "volume_percent": 80
    }
  ]
}
```
```

--------------------------------

### GET /playlists/{id}

Source: https://developer.spotify.com/documentation/web-api/howtos/web-app-profile

Retrieves information about a specific playlist, including its tracks, description, and owner.

```APIDOC
## GET /playlists/{id}

### Description
Retrieves metadata for a specific playlist, including its tracks and owner.

### Method
GET

### Endpoint
/playlists/{id}

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID of the playlist.

### Request Example
```json
{
  "example": "/playlists/000000000000000000000000000000"
}
```

### Response
#### Success Response (200)
- **name** (string) - The name of the playlist.
- **description** (string) - The description of the playlist.
- **tracks** (object) - The tracks in the playlist.

#### Response Example
```json
{
  "name": "Playlist Name",
  "description": "Playlist Description",
  "tracks": {
    "items": [
      {
        "track": {
          "name": "Track Name",
          "id": "track_id"
        }
      }
    ]
  }
}
```
```

--------------------------------

### Get User Profile Information using JavaScript

Source: https://developer.spotify.com/documentation/web-api/concepts/access-token

This JavaScript function, `getProfile()`, retrieves the current user's profile information by making an API call to the 'Get Current User's Profile' endpoint. It uses the `fetch` API and requires an access token stored in local storage.

```javascript
async function getProfile(accessToken) {
  let accessToken = localStorage.getItem('access_token');
  
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });
  
  const data = await response.json();
}
```

--------------------------------

### GET /me/player

Source: https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback

Retrieves the user's current playback state, including the currently playing track or episode, and other playback-related information.

```APIDOC
## GET /me/player

### Description
Retrieves the user's current playback state, including the currently playing track or episode, and other playback-related information.

### Method
GET

### Endpoint
/me/player

### Parameters
#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned. If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter. Note: If neither market or user country are provided, the content is considered unavailable for the client. Users can view the country that is associated with their account in the account settings. Example: `market=ES`
- **additional_types** (string) - Optional - A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`. Note: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future. In addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.

### Request Example
```json
{
  "example": "GET /me/player?market=ES&additional_types=track,episode"
}
```

### Response
#### Success Response (200)
- **device** (object) - The active device.
- **repeat_state** (string) - The repeat state. One of "off", "context", "track".
- **context** (object) - The context of the playback.
- **timestamp** (integer) - The Unix timestamp (in milliseconds) when this request was executed.
- **playing_type** (string) - The type of playback. Possible values are "track", "episode", "ad", "unknown".
- **shuffle_state** (boolean) - Whether shuffle is enabled for the playback.
- **item** (object) - The context of the playback.
- **progress_ms** (integer) - Progress into the current song.
- **is_playing** (boolean) - If something is currently playing.

#### Response Example
```json
{
  "example": "{\n  \"device\": {\n    \"id\": \"5fbb394758f15007a930f85272403200777d8d52\",\n    \"is_active\": true,\n    \"is_private_session\": false,\n    \"is_restricted\": false,\n    \"name\": \"Web Player (Chrome)\",\n    \"type\": \"Computer\",\n    \"volume_percent\": 100\n  },\n  \"repeat_state\": \"context\",\n  \"context\": {\n    \"external_urls\": {\n      \"spotify\": \"https://open.spotify.com/album/3n3XpUS8z7EaY0f007Xf9f\"\n    },\n    \"href\": \"https://api.spotify.com/v1/albums/3n3XpUS8z7EaY0f007Xf9f\",\n    \"type\": \"album\",\n    \"uri\": \"spotify:album:3n3XpUS8z7EaY0f007Xf9f\"\n  },\n  \"timestamp\": 1678747730000,\n  \"playing_type\": \"track\",\n  \"shuffle_state\": false,\n  \"item\": {\n    \"album\": {\n      \"album_type\": \"album\",\n      \"artists\": [\n        {\n          \"external_urls\": {\n            \"spotify\": \"https://open.spotify.com/artist/6e200rk52U1S2 mdl0W47t1\"\n          },\n          \"href\": \"https://api.spotify.com/v1/artists/6e200rk52U1S2 mdl0W47t1\",\n          \"id\": \"6e200rk52U1S2 mdl0W47t1\",\n          \"name\": \"The Lumineers\",\n          \"type\": \"artist\",\n          \"uri\": \"spotify:artist:6e200rk52U1S2 mdl0W47t1\"\n        }\n      ],\n      \"external_urls\": {\n        \"spotify\": \"https://open.spotify.com/album/3n3XpUS8z7EaY0f007Xf9f\"\n      },\n      \"href\": \"https://api.spotify.com/v1/albums/3n3XpUS8z7EaY0f007Xf9f\",\n      \"id\": \"3n3XpUS8z7EaY0f007Xf9f\",\n      \"images\": [\n        {\n          \"height\": 640,\n          \"url\": \"https://i.scdn.co/image/ab67616d0000b2732e75087d0669c7463983004a\",\n          \"width\": 640\n        },\n        {\n          \"height\": 300,\n          \"url\": \"https://i.scdn.co/image/ab67616d00001e022e75087d0669c7463983004a\",\n          \"width\": 300\n        },\n        {\n          \"height\": 64,\n          \"url\": \"https://i.scdn.co/image/ab67616d000044d42e75087d0669c7463983004a\",\n          \"width\": 64\n        }\n      ],\n      \"name\": \"BRIGHTSIDE\",\n      \"release_date\": \"2022-01-14\",\n      \"release_date_precision\": \"day\",\n      \"total_tracks\": 12,\n      \"type\": \"album\",\n      \"uri\": \"spotify:album:3n3XpUS8z7EaY0f007Xf9f\"\n    },\n    \"artists\": [\n      {\n        \"external_urls\": {\n          \"spotify\": \"https://open.spotify.com/artist/6e200rk52U1S2 mdl0W47t1\"\n        },\n        \"href\": \"https://api.spotify.com/v1/artists/6e200rk52U1S2 mdl0W47t1\",\n        \"id\": \"6e200rk52U1S2 mdl0W47t1\",\n        \"name\": \"The Lumineers\",\n        \"type\": \"artist\",\n        \"uri\": \"spotify:artist:6e200rk52U1S2 mdl0W47t1\"\n      }\n    ],\n    \"disc_number\": 1,\n    \"duration_ms\": 185400,\n    \"explicit\": false,\n    \"external_ids\": {\n      \"isrc\": \"USQX92100553\"\n    },\n    \"external_urls\": {\n      \"spotify\": \"https://open.spotify.com/track/452437e505433714470178949335079538133330\"\n    },\n    \"href\": \"https://api.spotify.com/v1/tracks/452437e505433714470178949335079538133330\",\n    \"id\": \"452437e505433714470178949335079538133330\",\n    \"is_local\": false,\n    \"name\": \"BRIGHTSIDE\",\n    \"popularity\": 80,\n    \"preview_url\": \"https://p.scdn.co/mp3-preview/71b0226433586248e5658923779f712737256569\",\n    \"track_number\": 1,\n    \"type\": \"track\",\n    \"uri\": \"spotify:track:452437e505433714470178949335079538133330\"\n  },\n  \"progress_ms\": 50000,\n  \"is_playing\": true\n}" 
}
```
```

--------------------------------

### Get Audio Features for Tracks (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features

This snippet demonstrates how to retrieve audio features for multiple tracks using a GET request to the Spotify Web API. It requires an 'Authorization' header with a Bearer token. The request includes a comma-separated list of track IDs.

```bash
curl --request GET \
  --url 'https://api.spotify.com/v1/audio-features?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### GET /me/playlists

Source: https://developer.spotify.com/documentation/web-api/reference/search

Get a list of the playlists owned by the current Spotify user. This endpoint allows users to retrieve their playlists, including details like name, owner, and track count.

```APIDOC
## GET /me/playlists

### Description
Retrieves a list of playlists owned by the current Spotify user.

### Method
GET

### Endpoint
/me/playlists

### Query Parameters
- **limit** (integer) - Optional - The maximum number of playlists to return.
- **offset** (integer) - Optional - The number of playlists to skip over before returning results.

### Request Example
```
GET /me/playlists?limit=10&offset=5
```

### Response
#### Success Response (200)
- **items** (array) - A list of playlist objects.
  - **name** (string) - The name of the playlist.
  - **owner** (object) - Information about the playlist owner.
    - **display_name** (string) - The display name of the owner.
    - **external_urls** (object) - Known external URLs for this object.
      - **spotify** (string) - A URL to the Spotify web SDK endpoint of the object.
    - **href** (string) - A link to the Web API endpoint for this user.
    - **id** (string) - The Spotify ID for the user.
    - **type** (string) - The object type: "user".
    - **uri** (string) - The Spotify URI for the user.
  - **public** (boolean) - Whether the playlist is public.
  - **snapshot_id** (string) - The version identifier for the current playlist.
  - **tracks** (object) - Information about the tracks in the playlist.
    - **href** (string) - A link to the Web API endpoint for the track list.
    - **total** (integer) - The total number of tracks in the playlist.
  - **type** (string) - The object type: "playlist".
  - **uri** (string) - The Spotify URI for the playlist.

#### Response Example
```json
{
  "items": [
    {
      "name": "My Awesome Playlist",
      "owner": {
        "external_urls": {
          "spotify": "https://open.spotify.com/user/spotify"
        },
        "href": "https://api.spotify.com/v1/users/spotify",
        "id": "spotify",
        "type": "user",
        "uri": "spotify:user:spotify",
        "display_name": "Spotify"
      },
      "public": false,
      "snapshot_id": "aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789",
      "tracks": {
        "href": "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks",
        "total": 50
      },
      "type": "playlist",
      "uri": "spotify:playlist:37i9dQZF1DXcBWIGoYBM5M"
    }
  ]
}
```
```

--------------------------------

### Transfer Playback Request (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/transfer-a-users-playback

Example of how to transfer playback to a specific device using cURL. This command sends a PUT request to the Spotify API with the necessary authorization and content type headers, along with the JSON payload specifying the target device.

```curl
curl --request PUT \
  --url https://api.spotify.com/v1/me/player \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z' \
  --header 'Content-Type: application/json' \
  --data '{ \
    "device_ids": [ \
        "74ASZWbe4lXaubB36ztrGX" \
    ] \
}'
```

--------------------------------

### POST /v1/me/player/previous

Source: https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track

Skip to the previous track in the user's playback queue. This endpoint requires authentication and returns an empty response on success.

```APIDOC
## POST /v1/me/player/previous

### Description
Skips to the previous track in the user's playback queue.

### Method
POST

### Endpoint
https://api.spotify.com/v1/me/player/previous

### Parameters

#### Query Parameters
None

#### Request Body
None

### Request Example
```curl
curl --request POST \
  --url https://api.spotify.com/v1/me/player/previous \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (204)
An empty response indicates success.

#### Response Example
```
empty response
```

#### Error Responses
- **401**: Bad or expired token.
- **403**: Invalid scope or insufficient permissions.
- **429**: Rate limiting has been applied.
```

--------------------------------

### GET /tracks

Source: https://developer.spotify.com/documentation/web-api/reference/get-several-tracks

Fetches information for multiple tracks. You can specify the market to filter available content. If a user access token is provided, the user's country takes precedence.

```APIDOC
## GET /tracks

### Description
Retrieves detailed information about several tracks using their Spotify IDs. The `market` parameter can be used to filter tracks available in a specific country. If a user's access token is provided, the country associated with the user's account will be used instead of the `market` parameter.

### Method
GET

### Endpoint
/tracks

### Parameters
#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If provided, only content available in that market will be returned. If neither `market` nor the user's country (from an access token) is provided, the content is considered unavailable.
- **ids** (string) - Required - A comma-separated list of Spotify track IDs. Maximum of 50 IDs allowed.

### Request Example
```
GET /v1/tracks?ids=7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B&market=ES
```

### Response
#### Success Response (200)
- **tracks** (array) - An array of track objects, each containing details like ID, name, artists, album, popularity, and availability information.

#### Response Example
```json
{
  "tracks": [
    {
      "album": {
        "album_type": "album",
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/6HQ8e42XG77fSjVv7f6d45"
            },
            "href": "https://api.spotify.com/v1/artists/6HQ8e42XG77fSjVv7f6d45",
            "id": "6HQ8e42XG77fSjVv7f6d45",
            "name": "The Lumineers",
            "type": "artist",
            "uri": "spotify:artist:6HQ8e42XG77fSjVv7f6d45"
          }
        ],
        "external_urls": {
          "spotify": "https://open.spotify.com/album/6f6WzXf7p7nQz9a56f5j44"
        },
        "href": "https://api.spotify.com/v1/albums/6f6WzXf7p7nQz9a56f5j44",
        "id": "6f6WzXf7p7nQz9a56f5j44",
        "images": [
          {
            "height": 640,
            "url": "https://i.scdn.co/image/ab67616d0000b27347c27568167a7f78c752930f",
            "width": 640
          },
          {
            "height": 300,
            "url": "https://i.scdn.co/image/ab67616d00001e0247c27568167a7f78c752930f",
            "width": 300
          },
          {
            "height": 64,
            "url": "https://i.scdn.co/image/ab67616d0000485147c27568167a7f78c752930f",
            "width": 64
          }
        ],
        "name": "Brightside",
        "release_date": "2022-01-14",
        "release_date_precision": "day",
        "total_tracks": 12,
        "type": "album",
        "uri": "spotify:album:6f6WzXf7p7nQz9a56f5j44"
      },
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/6HQ8e42XG77fSjVv7f6d45"
          },
          "href": "https://api.spotify.com/v1/artists/6HQ8e42XG77fSjVv7f6d45",
          "id": "6HQ8e42XG77fSjVv7f6d45",
          "name": "The Lumineers",
          "type": "artist",
          "uri": "spotify:artist:6HQ8e42XG77fSjVv7f6d45"
        }
      ],
      "disc_number": 1,
      "duration_ms": 201173,
      "explicit": false,
      "external_ids": {
        "isrc": "USUG12104133"
      },
      "external_urls": {
        "spotify": "https://open.spotify.com/track/7ouMYWpwJ422jRcDASZB7P"
      },
      "href": "https://api.spotify.com/v1/tracks/7ouMYWpwJ422jRcDASZB7P",
      "id": "7ouMYWpwJ422jRcDASZB7P",
      "is_local": false,
      "is_playable": true,
      "name": "Brightside",
      "popularity": 80,
      "preview_url": "https://p.scdn.co/mp3-preview/0a6e3b7a1c9a4f7b8c8d7e7f7e7f7e7f7e7f7e7f",
      "track_number": 1,
      "type": "track",
      "uri": "spotify:track:7ouMYWpwJ422jRcDASZB7P"
    }
  ]
}
```
```

--------------------------------

### Get Current User Profile Response Structure

Source: https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile

This is a sample JSON response for the 'Get Current User' endpoint. It illustrates the structure and types of data returned, including user details, external URLs, follower information, and images. Note that some fields are conditional based on granted scopes.

```json
{
  "country": "string",
  "display_name": "string",
  "email": "string",
  "explicit_content": {
    "filter_enabled": false,
    "filter_locked": false
  },
  "external_urls": {
    "spotify": "string"
  },
  "followers": {
    "href": "string",
    "total": 0
  },
  "href": "string",
  "id": "string",
  "images": [
    {
      "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      "height": 300,
      "width": 300
    }
  ],
  "product": "string",
  "type": "string",
  "uri": "string"
}
```

--------------------------------

### GET /player

Source: https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback

Retrieves information about the user's current playback state, including the active device, shuffle and repeat states, and the currently playing item.

```APIDOC
## GET /player

### Description
Retrieves information about the user's current playback state, including the active device, shuffle and repeat states, and the currently playing item.

### Method
GET

### Endpoint
/player

### Parameters
#### Query Parameters
None

#### Request Body
None

### Response
#### Success Response (200)
- **device** (object) - The device that is currently active.
  - **id** (string, nullable) - The device ID. This ID is unique and persistent to some extent. However, this is not guaranteed and any cached `device_id` should periodically be cleared out and refetched as necessary.
  - **is_active** (boolean) - If this device is the currently active device.
  - **is_private_session** (boolean) - If this device is currently in a private session.
  - **is_restricted** (boolean) - Whether controlling this device is restricted. At present if this is "true" then no Web API commands will be accepted by this device.
  - **name** (string) - A human-readable name for the device. Some devices have a name that the user can configure (e.g. "Loudest speaker") and some devices have a generic name associated with the manufacturer or device model.
  - **type** (string) - Device type, such as "computer", "smartphone" or "speaker".
  - **volume_percent** (integer, nullable) - The current volume in percent. Range: `0` - `100`
  - **supports_volume** (boolean) - If this device can be used to set the volume.
- **repeat_state** (string) - off, track, context
- **shuffle_state** (boolean) - If shuffle is on or off.
- **context** (object, nullable) - A Context Object. Can be `null`.
  - **type** (string) - The object type, e.g. "artist", "playlist", "album", "show".
  - **href** (string) - A link to the Web API endpoint providing full details of the track.
  - **external_urls** (object) - External URLs for this context.
    - **spotify** (string) - The Spotify URL for the object.
  - **uri** (string) - The Spotify URI for the context.
- **timestamp** (integer) - Unix Millisecond Timestamp when playback state was last changed (play, pause, skip, scrub, new song, etc.).
- **progress_ms** (integer, nullable) - Progress into the currently playing track or episode. Can be `null`.
- **is_playing** (boolean) - If something is currently playing, return `true`.
- **item** (oneOf, nullable) - The currently playing track or episode. Can be `null`.
  - **TrackObject** (object)
    - **album** (object) - The album on which the track appears. The album object includes a link in `href` to full information about the album.
      - **album_type** (string) - The type of the album. Allowed values: `"album"`, `"single"`, `"compilation"`
      - **total_tracks** (integer) - The number of tracks in the album.
      - **available_markets** (array of strings) - The markets in which the album is available: ISO 3166-1 alpha-2 country codes.
      - **external_urls** (object) - Known external URLs for this album.
        - **spotify** (string) - The Spotify URL for the object.
      - **href** (string) - A link to the Web API endpoint providing full details of the album.
      - **id** (string) - The Spotify ID for the album.
      - **images** (array of ImageObject) - The cover art for the album in various sizes, widest first.
        - **url** (string) - The source URL of the image.
        - **height** (integer, nullable) - The image height in pixels.
        - **width** (integer, nullable) - The image width in pixels.
      - **name** (string) - The name of the album. In case of an album takedown, the value may be an empty string.
      - **release_date** (string) - The date the album was first released.
      - **release_date_precision** (string) - The precision with which `release_date` value is known. Allowed values: `"year"`, `"month"`, `"day"`
      - **restrictions** (object, nullable) - Included in the response when a content restriction is applied.
        - **reason** (string) - The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content. Additional reasons may be added in the future. Allowed values: `"market"`, `"product"`, `"explicit"`
      - **type** (string) - The object type. Allowed values: `"album"`
      - **uri** (string) - The Spotify URI for the album.
      - **artists** (array of SimplifiedArtistObject) - The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.
        - **external_urls** (object) - Known external URLs for this artist.
          - **spotify** (string) - The Spotify URL for the object.
        - **href** (string) - A link to the Web API endpoint providing full details of the artist.
        - **id** (string) - The Spotify ID for the artist.
        - **name** (string) - The name of the artist.

#### Error Responses
- **401** - Bad or expired token.
- **403** - Bad OAuth request.
- **429** - Rate limiting information and/or details concerning the amount of requests that the client is permitted to make.

#### Response Example
{
  "device": {
    "id": "5f4922d165714e001478347e",
    "is_active": true,
    "is_private_session": false,
    "is_restricted": false,
    "name": "My Computer",
    "type": "computer",
    "volume_percent": 100,
    "supports_volume": true
  },
  "repeat_state": "off",
  "shuffle_state": false,
  "context": {
    "type": "playlist",
    "href": "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M",
    "external_urls": {
      "spotify": "spotify:playlist:37i9dQZF1DXcBWIGoYBM5M"
    },
    "uri": "spotify:playlist:37i9dQZF1DXcBWIGoYBM5M"
  },
  "timestamp": 1494073556424,
  "progress_ms": 12345,
  "is_playing": true,
  "item": {
    "album": {
      "album_type": "album",
      "total_tracks": 12,
      "available_markets": [
        "CA",
        "BR",
        "IT"
      ],
      "external_urls": {
        "spotify": "https://open.spotify.com/album/2up3OPMp9Tb4dAKM2erWXQ"
      },
      "href": "https://api.spotify.com/v1/albums/2up3OPMp9Tb4dAKM2erWXQ",
      "id": "2up3OPMp9Tb4dAKM2erWXQ",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          "height": 300,
          "width": 300
        }
      ],
      "name": "The Dark Side of the Moon",
      "release_date": "1973-03-01",
      "release_date_precision": "day",
      "restrictions": {
        "reason": "market"
      },
      "type": "album",
      "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ"
    },
    "artists": [
      {
        "external_urls": {
          "spotify": "https://open.spotify.com/artist/07a0bnUXxI208p0v0Q0V41"
        },
        "href": "https://api.spotify.com/v1/artists/07a0bnUXxI208p0v0Q0V41",
        "id": "07a0bnUXxI208p0v0Q0V41",
        "name": "Pink Floyd"
      }
    ],
    "external_urls": {
      "spotify": "https://open.spotify.com/track/3z8h0TU7EdSxir7VlM621p"
    },
    "href": "https://api.spotify.com/v1/tracks/3z8h0TU7EdSxir7VlM621p",
    "id": "3z8h0TU7EdSxir7VlM621p",
    "name": "Money",
    "type": "track",
    "uri": "spotify:track:3z8h0TU7EdSxir7VlM621p"
  }
}
```

--------------------------------

### Set Playback Volume using Wget

Source: https://developer.spotify.com/documentation/web-api/reference/set-volume-for-users-playback

Example of how to set the playback volume using the Wget command-line tool. This command sends a PUT request to the Spotify API to modify the volume settings.

```bash
wget --method=PUT --header="Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z" --tries=10 --waitretry=5 "https://api.spotify.com/v1/me/player/volume?volume_percent=50"
```

--------------------------------

### Get Audiobook Chapter Details (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-chapter

This snippet demonstrates how to fetch detailed information about a specific audiobook chapter using a cURL request to the Spotify Web API. It requires an authorization token and the chapter ID as parameters.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/chapters/0D5wENdkdwbqlrHoaJ9g29 \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### Spotify API Chapter Response Sample (JSON)

Source: https://developer.spotify.com/documentation/web-api/reference/get-several-chapters

This JSON object represents a sample response from the Spotify Web API, detailing information about a podcast chapter. It includes fields such as audio preview URL, chapter number, description, duration, and associated audiobook details. This structure is useful for developers integrating with the Spotify API to retrieve and display chapter content.

```json
{
  "chapters": [
    {
      "audio_preview_url": "https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17",
      "available_markets": ["string"],
      "chapter_number": 1,
      "description": "We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.",
      "html_description": "<p>We kept on ascending, with occasional periods of quick descent, but in the main always ascending. Suddenly, I became conscious of the fact that the driver was in the act of pulling up the horses in the courtyard of a vast ruined castle, from whose tall black windows came no ray of light, and whose broken battlements showed a jagged line against the moonlit sky.</p>",
      "duration_ms": 1686230,
      "explicit": false,
      "external_urls": {
        "spotify": "string"
      },
      "href": "https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ",
      "id": "5Xt5DXGzch68nYYamXrNxZ",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          "height": 300,
          "width": 300
        }
      ],
      "is_playable": false,
      "languages": ["fr", "en"],
      "name": "Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators",
      "release_date": "1981-12-15",
      "release_date_precision": "day",
      "resume_point": {
        "fully_played": false,
        "resume_position_ms": 0
      },
      "type": "episode",
      "uri": "spotify:episode:0zLhl3WsOCQHbe1BPTiHgr",
      "restrictions": {
        "reason": "string"
      },
      "audiobook": {
        "authors": [
          {
            "name": "string"
          }
        ],
        "available_markets": ["string"],
        "copyrights": [
          {
            "text": "string",
            "type": "string"
          }
        ],
        "description": "string",
        "html_description": "string",
        "edition": "Unabridged",
        "explicit": false,
        "external_urls": {
          "spotify": "string"
        },
        "href": "string",
        "id": "string",
        "images": [
          {
            "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            "height": 300,
            "width": 300
          }
        ],
        "languages": ["string"],
        "media_type": "string",
        "name": "string",
        "narrators": [
          {
            "name": "string"
          }
        ],
        "publisher": "string",
        "type": "audiobook",
        "uri": "string",
        "total_chapters": 0
      }
    }
  ]
}
```

--------------------------------

### GET /v1/audio-features

Source: https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features

Get audio features for multiple tracks based on their Spotify IDs. This endpoint returns a comprehensive set of audio features for each track, including danceability, energy, tempo, and more.

```APIDOC
## GET /v1/audio-features

### Description
Retrieve the audio features for a given set of tracks. 

### Method
GET

### Endpoint
`/v1/audio-features?ids={ids}`

### Parameters
#### Query Parameters
- **ids** (string) - Required - A comma-separated list of Spotify IDs for the tracks. Maximum of 100 IDs.

### Request Example
```curl
curl --request GET \
  --url 'https://api.spotify.com/v1/audio-features?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **audio_features** (array) - An array of AudioFeaturesObject, one for each track specified in the request.
  - **acousticness** (number) - A confidence measure from 0.0 to 1.0 of whether the track is acoustic.
  - **analysis_url** (string) - A URL to access the full audio analysis of this track.
  - **danceability** (number) - Describes how suitable a track is for dancing.
  - **duration_ms** (integer) - The duration of the track in milliseconds.
  - **energy** (number) - A measure from 0.0 to 1.0 representing a perceptual measure of intensity and activity.
  - **id** (string) - The Spotify ID for the track.
  - **instrumentalness** (number) - Predicts whether a track contains no vocals.
  - **key** (integer) - The key the track is in.
  - **liveness** (number) - Detects the presence of an audience in the recording.
  - **loudness** (number) - The overall loudness of a track in decibels (dB).
  - **mode** (integer) - Indicates the modality (major or minor) of a track.
  - **speechiness** (number) - Detects the presence of spoken words in a track.
  - **tempo** (number) - The overall estimated tempo of a track in beats per minute (BPM).
  - **time_signature** (integer) - An estimated time signature.
  - **track_href** (string) - A link to the Web API endpoint providing full details of the track.
  - **type** (string) - The object type, value is 'audio_features'.
  - **uri** (string) - The Spotify URI for the track.
  - **valence** (number) - Describes the musical positiveness conveyed by a track.

#### Response Example
```json
{
  "audio_features": [
    {
      "id": "2takcwOaAZWiXQijPHIx7B",
      "uri": "spotify:track:2takcwOaAZWiXQijPHIx7B",
      "track_href": "https://api.spotify.com/v1/tracks/2takcwOaAZWiXQijPHIx7B",
      "analysis_url": "https://api.spotify.com/v1/audio-analysis/2takcwOaAZWiXQijPHIx7B",
      "danceability": 0.585,
      "energy": 0.842,
      "key": 9,
      "loudness": -5.883,
      "mode": 0,
      "speechiness": 0.0556,
      "acousticness": 0.00242,
      "instrumentalness": 0.000001,
      "liveness": 0.0866,
      "valence": 0.428,
      "tempo": 118.211,
      "type": "audio_features",
      "time_signature": 4,
      "duration_ms": 237040
    }
  ]
}
```

#### Error Response
- **401 Unauthorized**: The access token is missing or invalid.
- **403 Forbidden**: The access token is expired or does not have the necessary scope.
- **429 Too Many Requests**: The rate limit has been exceeded.
```

--------------------------------

### Get Album Information

Source: https://developer.spotify.com/documentation/web-api/reference/get-an-album

Retrieve detailed information about a specific album, including its tracks, copyright details, external IDs, genres, label, and popularity. You can also specify a market to get relevant data.

```APIDOC
## GET /v1/albums/{id}

### Description
Retrieve detailed information about a specific album by its ID. The `market` parameter can be used to filter results based on a specific country's availability.

### Method
GET

### Endpoint
`/v1/albums/{id}`

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID for the album.

#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If provided, the response will be filtered to playlists available in that market. 

### Request Example
```
curl --request GET \
  --url https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **album_type** (string) - The type of the album: `album`, `single`, or `compilation`.
- **artists** (array of ArtistObject) - The artists of the album. 
- **available_markets** (array of strings) - The markets in which the album is available.
- **copyrights** (array of CopyrightObject) - The copyright statements of the album.
- **external_ids** (object) - Known external IDs for the album.
- **genres** (array of strings) - The genres associated with the album (deprecated, always empty).
- **href** (string) - A link to the Web API endpoint providing full details of the album.
- **id** (string) - The Spotify ID for the album.
- **images** (array of ImageObject) - The cover art for the album.
- **label** (string) - The label associated with the album.
- **name** (string) - The name of the album.
- **popularity** (integer) - The popularity of the album.
- **release_date** (string) - The date the album was released.
- **release_date_precision** (string) - The precision of the release date: `year`, `month`, or `day`.
- **tracks** (object) - The tracks of the album.
- **type** (string) - The object type: "album".
- **uri** (string) - The Spotify URI for the album.

#### Response Example
```json
{
  "album_type": "album",
  "artists": [
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/6qqNVyps7mG4hEjEyqER5k"
      },
      "href": "https://api.spotify.com/v1/artists/6qqNVyps7mG4hEjEyqER5k",
      "id": "6qqNVyps7mG4hEjEyqER5k",
      "name": "Maroon 5",
      "type": "artist",
      "uri": "spotify:artist:6qqNVyps7mG4hEjEyqER5k"
    }
  ],
  "available_markets": [
    "CA",
    "MX",
    "US"
  ],
  "copyrights": [
    {
      "text": "© 2010 Interscope Records",
      "type": "C"
    },
    {
      "text": "℗ 2010 Interscope Records",
      "type": "P"
    }
  ],
  "external_ids": {
    "upc": "602527345717"
  },
  "genres": [],
  "href": "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy",
  "id": "4aawyAB9vmqN3uQ7FjRGTy",
  "images": [
    {
      "height": 640,
      "url": "https://i.scdn.co/image/ab67616d0000b27342291171412284283c111111",
      "width": 640
    },
    {
      "height": 300,
      "url": "https://i.scdn.co/image/ab67616d00001e0242291171412284283c111111",
      "width": 300
    },
    {
      "height": 64,
      "url": "https://i.scdn.co/image/ab67616d0000485142291171412284283c111111",
      "width": 64
    }
  ],
  "label": "Interscope Records",
  "name": "Hands All Over",
  "popularity": 75,
  "release_date": "2011-01-01",
  "release_date_precision": "day",
  "tracks": {
    "href": "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks?offset=0&limit=100",
    "items": [
      {
        "is_playable": true,
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:0eFz0rN7T1N3jJ7f0j0j0j0"
      }
    ],
    "limit": 100,
    "next": null,
    "offset": 0,
    "previous": null,
    "total": 12
  },
  "type": "album",
  "uri": "spotify:album:4aawyAB9vmqN3uQ7FjRGTy"
}
```
```

--------------------------------

### POST /me/player/queue

Source: https://developer.spotify.com/documentation/web-api/reference/add-to-queue

Adds a track or an episode to the user's playback queue. You can specify a target device or let it default to the active device.

```APIDOC
## POST /me/player/queue

### Description
Adds a track or an episode to the user's playback queue. This endpoint allows you to queue up content for playback on a specific device or the user's currently active device.

### Method
POST

### Endpoint
https://api.spotify.com/v1/me/player/queue

### Parameters
#### Query Parameters
- **uri** (string) - Required - The uri of the item to add to the queue. Must be a track or an episode uri.
- **device_id** (string) - Optional - The id of the device this command is targeting. If not supplied, the user's currently active device is the target.

### Request Example
```json
{
  "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
  "device_id": "0d1841b0976bae2a3a310dd74c0f3df354899bc8"
}
```

### Response
#### Success Response (204)
This endpoint returns an empty response upon successful execution.

#### Error Responses
- **401**: Bad or expired token.
- **403**: Invalid scope or insufficient permissions.
- **429**: Rate limit exceeded.
```

--------------------------------

### Get Artist's Albums

Source: https://developer.spotify.com/documentation/web-api/reference/get-an-artist

Retrieves Spotify catalog information about an artist's albums.

```APIDOC
## GET /artists/{id}/albums

### Description
Retrieves Spotify catalog information about an artist's albums. This includes both albums and singles.

### Method
GET

### Endpoint
/artists/{id}/albums

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID of the artist.

#### Query Parameters
- **album_type** (string) - Optional - Comma-separated list of album types to return. e.g., "album,single". Default: "album,single,compilation".
- **limit** (integer) - Optional - The maximum number of items to return. Default: 20. Maximum: 50.
- **offset** (integer) - Optional - The index of the first item to return. Default: 0.
- **market** (string) - Optional - An ISO 3166-1 A2 country code or the keyword 'from_token'. Provide this parameter if you want to filter the list of albums based on the available markets.

### Request Example
```
GET https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums?album_type=album&market=US&limit=10
```

### Response
#### Success Response (200)
- **href** (string) - A link to the Web API endpoint providing full details of the album.
- **items** (array) - A list of album objects.
- **limit** (integer) - The maximum number of items returned in this response.
- **next** (string) - The URL for the next page of results, or null if there is no next page.
- **offset** (integer) - The offset from the start of the query.
- **previous** (string) - The URL for the previous page of results, or null if there is no previous page.
- **total** (integer) - The total number of albums available for the artist.

#### Response Example
```json
{
  "href": "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums?offset=0&limit=10&album_type=album&market=US",
  "items": [
    {
      "album_type": "album",
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/0TnOYISbd1XYRBk9myaseg"
          },
          "href": "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg",
          "id": "0TnOYISbd1XYRBk9myaseg",
          "name": "Example Artist",
          "type": "artist",
          "uri": "spotify:artist:0TnOYISbd1XYRBk9myaseg"
        }
      ],
      "available_markets": [
        "CA",
        "US",
        "MX"
      ],
      "external_urls": {
        "spotify": "https://open.spotify.com/album/12345abcde"
      },
      "href": "https://api.spotify.com/v1/albums/12345abcde",
      "id": "12345abcde",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b273abcdef1234567890",
          "width": 640
        }
      ],
      "name": "Example Album",
      "release_date": "2023-01-01",
      "release_date_precision": "day",
      "total_tracks": 12,
      "type": "album",
      "uri": "spotify:album:12345abcde"
    }
  ],
  "limit": 10,
  "next": "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums?offset=10&limit=10&album_type=album&market=US",
  "offset": 0,
  "previous": null,
  "total": 25
}
```
```

--------------------------------

### Get Several Tracks - cURL Request

Source: https://developer.spotify.com/documentation/web-api/reference/get-several-tracks

This snippet demonstrates how to fetch multiple tracks using the cURL command-line tool. It requires an authorization token and a list of track IDs. The output is a JSON object containing an array of track details.

```bash
curl --request GET \
  --url 'https://api.spotify.com/v1/tracks?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### Genres - Get Available Genre Seeds

Source: https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres

Retrieve a list of available genres that can be used as seed parameters for music recommendations.

```APIDOC
## GET /recommendations/available-genre-seeds

### Description
Retrieve a list of available genres seed parameter values for recommendations.

### Method
GET

### Endpoint
/recommendations/available-genre-seeds

### Parameters
#### Query Parameters
None

#### Request Body
None

### Request Example
```curl
curl --request GET \
  --url https://api.spotify.com/v1/recommendations/available-genre-seeds \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **genres** (array of strings) - A set of genres. Example: `["alternative","samba"]`

#### Response Example
```json
{
  "genres": [
    "alternative",
    "samba"
  ]
}
```

#### Error Responses
- **401**: Unauthorized
- **403**: Forbidden
- **429**: Too Many Requests
```

--------------------------------

### Get User's Saved Albums Request (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums

This code snippet demonstrates how to make a GET request to the Spotify Web API to retrieve the albums saved by the current user using cURL. It includes the necessary authorization header.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/me/albums \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### GET /playlists

Source: https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists

Retrieves a list of the current user's playlists. Supports pagination via limit and offset query parameters.

```APIDOC
## GET /v1/me/playlists

### Description
Retrieves a list of the current user's playlists. This endpoint supports pagination to handle large numbers of playlists.

### Method
GET

### Endpoint
`/v1/me/playlists`

### Query Parameters
- **limit** (integer) - Optional - The maximum number of items to return in the response. Default is 20.
- **offset** (integer) - Optional - The offset of the items returned. Used for pagination. Default is 0.

### Request Example
```
GET /v1/me/playlists?limit=10&offset=5
```

### Response
#### Success Response (200 OK)
Returns a paged set of playlists. The structure includes pagination details and an array of playlist objects.

- **href** (string) - A link to the Web API endpoint returning the full result of the request.
- **limit** (integer) - The maximum number of items in the response.
- **next** (string | null) - URL to the next page of items. `null` if none.
- **offset** (integer) - The offset of the items returned.
- **previous** (string | null) - URL to the previous page of items. `null` if none.
- **total** (integer) - The total number of items available to return.
- **items** (array of SimplifiedPlaylistObject) - An array containing simplified playlist objects.
  - **collaborative** (boolean) - `true` if the owner allows other users to modify the playlist.
  - **description** (string | null) - The playlist description. Only returned for modified, verified playlists.
  - **external_urls** (object) - Known external URLs for this playlist.
    - **spotify** (string) - The Spotify URL for the object.
  - **href** (string) - A link to the Web API endpoint providing full details of the playlist.
  - **id** (string) - The Spotify ID for the playlist.
  - **images** (array of ImageObject) - Images for the playlist. May be empty or contain up to three images.
    - **url** (string) - The source URL of the image.
    - **height** (integer | null) - The image height in pixels.
    - **width** (integer | null) - The image width in pixels.
  - **name** (string) - The name of the playlist.
  - **owner** (object) - The user who owns the playlist.
    - **external_urls** (object) - Known public external URLs for this user.
      - **spotify** (string) - The Spotify URL for the object.
    - **href** (string) - A link to the Web API endpoint for this user.
    - **id** (string) - The Spotify user ID for this user.
    - **type** (string) - The object type. Allowed values: `"user"`.
    - **uri** (string) - The Spotify URI for this user.
    - **display_name** (string | null) - The name displayed on the user's profile.
  - **public** (boolean | null) - The playlist's public/private status.
  - **snapshot_id** (string) - The version identifier for the current playlist.
  - **tracks** (object) - A collection containing a link to retrieve playlist tracks and the total number of tracks.
    - **href** (string) - A link to the Web API endpoint where full details of the playlist's tracks can be retrieved.
    - **total** (integer) - Number of tracks in the playlist.
  - **type** (string) - The object type: "playlist".
  - **uri** (string) - The Spotify URI for the playlist.

#### Error Responses
- **401 Unauthorized**: The request requires authentication.
- **403 Forbidden**: The authenticated user does not have permission to access this resource.
- **429 Too Many Requests**: The request has been rate-limited.

#### Response Example
```json
{
  "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
  "limit": 20,
  "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  "offset": 0,
  "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  "total": 4,
  "items": [
    {
      "collaborative": false,
      "description": "string",
      "external_urls": {
        "spotify": "string"
      },
      "href": "string",
      "id": "string",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          "height": 300,
          "width": 300
        }
      ],
      "name": "string",
      "owner": {
        "external_urls": {
          "spotify": "string"
        },
        "href": "string",
        "id": "string",
        "type": "user",
        "uri": "string",
        "display_name": "string"
      },
      "public": false,
      "snapshot_id": "string",
      "tracks": {
        "href": "string",
        "total": 0
      },
      "type": "string",
      "uri": "string"
    }
  ]
}
```
```

--------------------------------

### Get Available Markets

Source: https://developer.spotify.com/documentation/web-api/reference/get-available-markets

Retrieves a list of markets where Spotify is available. This endpoint is useful for filtering content based on user location.

```APIDOC
## GET /markets

### Description
Get the list of markets where Spotify is available.

### Method
GET

### Endpoint
/markets

### Query Parameters
None

### Request Body
None

### Request Example
```
curl --request GET \
  --url https://api.spotify.com/v1/markets \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **markets** (array of strings) - An array of country codes representing available markets.

#### Response Example
```json
{
  "markets": [
    "CA",
    "BR",
    "IT"
  ]
}
```

#### Error Responses
- **401**: Unauthorized
- **403**: Forbidden
- **429**: Too Many Requests
```

--------------------------------

### Get Episode Details using cURL

Source: https://developer.spotify.com/documentation/web-api/reference/get-an-episode

This snippet demonstrates how to retrieve detailed information about a specific Spotify episode using the cURL command-line tool. It requires an authorization token and the episode ID as parameters.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/episodes/512ojhOuo1ktJprKbVcKyQ \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### GET /albums/{id}

Source: https://developer.spotify.com/documentation/web-api/reference/get-an-album

Retrieve detailed information about a specific Spotify album, including its tracks and availability in different markets.

```APIDOC
## GET /albums/{id}

### Description
Retrieve detailed information about a specific Spotify album, including its tracks and availability in different markets.

### Method
GET

### Endpoint
/albums/{id}

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID of the album.

#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned. If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter. Note: If neither market or user country are provided, the content is considered unavailable for the client. Users can view the country that is associated with their account in the account settings.

### Request Example
```
GET https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy?market=ES
```

### Response
#### Success Response (200)
- **name** (string) - The name of the album.
- **artists** (array) - The artists who performed the album.
- **release_date** (string) - The date the album was released.
- **total_tracks** (integer) - The total number of tracks on the album.
- **tracks** (object) - A list of tracks on the album.

#### Response Example
```json
{
  "name": "Example Album Name",
  "artists": [
    {
      "name": "Example Artist"
    }
  ],
  "release_date": "2023-01-01",
  "total_tracks": 10,
  "tracks": {
    "items": [
      {
        "name": "Track 1"
      },
      {
        "name": "Track 2"
      }
    ]
  }
}
```
```

--------------------------------

### Get Track Information using cURL

Source: https://developer.spotify.com/documentation/web-api/reference/get-track

This snippet demonstrates how to fetch details for a specific track using the cURL command-line tool. It requires an authorization token and the track's unique identifier.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### POST /api/token

Source: https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow

Request an access token using client credentials. This is the initial step to authenticate with the Spotify API.

```APIDOC
## POST /api/token

### Description
Requests an access token from the Spotify OAuth 2.0 service using client credentials. This token is necessary for making authenticated requests to the Spotify Web API.

### Method
POST

### Endpoint
https://accounts.spotify.com/api/token

### Parameters
#### Header Parameters
- **Authorization** (string) - Required - Base 64 encoded string containing the client ID and client secret in the format `Authorization: Basic <base64 encoded client_id:client_secret>`.
- **Content-Type** (string) - Required - Set to `application/x-www-form-urlencoded`.

#### Request Body
- **grant_type** (string) - Required - Must be set to `client_credentials`.

### Request Example
```javascript
var client_id = 'YOUR_CLIENT_ID';
var client_secret = 'YOUR_CLIENT_SECRET';

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var token = body.access_token;
    // Use the token for subsequent API requests
  }
});
```

### Response
#### Success Response (200 OK)
- **access_token** (string) - An access token that can be provided in subsequent calls to Spotify Web API services.
- **token_type** (string) - How the access token may be used; always "Bearer".
- **expires_in** (int) - The time period (in seconds) for which the access token is valid.

#### Response Example
```json
{
  "access_token": "NgCXRK...MzYjw",
  "token_type": "bearer",
  "expires_in": 3600
}
```
```

--------------------------------

### GET /audiobooks/{id}

Source: https://developer.spotify.com/documentation/web-api/reference/get-an-audiobook

Retrieves a specific audiobook by its Spotify ID. You can also specify a market to filter available content.

```APIDOC
## GET /audiobooks/{id}

### Description
Retrieves a specific audiobook by its Spotify ID. You can also specify a market to filter available content.

### Method
GET

### Endpoint
/audiobooks/{id}

### Parameters
#### Path Parameters
- **id** (string) - Required - The Spotify ID for the audiobook.

#### Query Parameters
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned. If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter. Note: If neither market or user country are provided, the content is considered unavailable for the client. Users can view the country that is associated with their account in the account settings.

### Request Example
```
GET https://api.spotify.com/v1/audiobooks/7iHfbu1YPACw6oZPAFJtqe?market=ES
```

### Response
#### Success Response (200)
- **audiobook_object** (object) - The audiobook object.

#### Response Example
```json
{
  "audiobooks": [
    {
      "available_markets": [
        "ES",
        "GB",
        "US"
      ],
      "external_urls": {
        "spotify": "https://open.spotify.com/show/7iHfbu1YPACw6oZPAFJtqe"
      },
      "href": "https://api.spotify.com/v1/audiobooks/7iHfbu1YPACw6oZPAFJtqe",
      "html_url": "https://open.spotify.com/show/7iHfbu1YPACw6oZPAFJtqe",
      "id": "7iHfbu1YPACw6oZPAFJtqe",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab676663000022ad241713a47066855686116114",
          "width": 640
        }
      ],
      "name": "The Lord of the Rings",
      "type": "audiobook",
      "uri": "spotify:show:7iHfbu1YPACw6oZPAFJtqe"
    }
  ]
}
```
```

--------------------------------

### Get Playlist Images (cURL)

Source: https://developer.spotify.com/documentation/web-api/reference/get-playlist-cover

This snippet demonstrates how to retrieve images for a specific Spotify playlist using a cURL command. It requires an authorization token and the playlist ID as parameters. The output is a JSON array of image objects.

```bash
curl --request GET \
  --url https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/images \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

--------------------------------

### GET /v1/me/audiobooks

Source: https://developer.spotify.com/documentation/web-api/reference/get-users-saved-audiobooks

Retrieves a list of audiobooks associated with the user's account. This endpoint supports pagination through 'limit' and 'offset' query parameters.

```APIDOC
## GET /v1/me/audiobooks

### Description
Retrieves a list of audiobooks saved to the user's library. Supports pagination.

### Method
GET

### Endpoint
`/v1/me/audiobooks`

### Query Parameters
- **limit** (integer) - Optional - The maximum number of items to return. Defaults to 20.
- **offset** (integer) - Optional - The number of items to skip before returning results. Defaults to 0.

### Request Example
```curl
curl --request GET \
  --url https://api.spotify.com/v1/me/audiobooks \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **href** (string) - A link to the Web API endpoint returning the full result of the request.
- **limit** (integer) - The maximum number of items in the response.
- **next** (string) - URL to the next page of items. Null if none.
- **offset** (integer) - The offset of the items returned.
- **previous** (string) - URL to the previous page of items. Null if none.
- **total** (integer) - The total number of items available to return.
- **items** (array of SimplifiedAudiobookObject) - A list of audiobook objects.
  - **authors** (array of AuthorObject)
    - **name** (string) - The name of the author.
  - **available_markets** (array of strings) - A list of countries where the audiobook can be played (ISO 3166-1 alpha-2 code).
  - **copyrights** (array of CopyrightObject)
    - **text** (string) - The copyright text.
    - **type** (string) - The type of copyright ('C' or 'P').
  - **description** (string) - A description of the audiobook (HTML tags stripped).
  - **html_description** (string) - A description of the audiobook (may contain HTML tags).
  - **edition** (string) - The edition of the audiobook.
  - **explicit** (boolean) - Whether the audiobook has explicit content.
  - **external_urls** (object) - External URLs for this audiobook.
    - **spotify** (string) - The Spotify URL for the object.
  - **href** (string) - A link to the Web API endpoint providing full details of the audiobook.
  - **id** (string) - The Spotify ID for the audiobook.
  - **images** (array of ImageObject)
    - **url** (string) - The source URL of the image.
    - **height** (integer) - The image height in pixels.
    - **width** (integer) - The image width in pixels.
  - **languages** (array of strings) - A list of languages used in the audiobook (ISO 639 code).
  - **media_type** (string) - The media type of the audiobook.
  - **name** (string) - The name of the audiobook.
  - **narrators** (array of NarratorObject)
    - **name** (string) - The name of the narrator.
  - **publisher** (string) - The publisher of the audiobook.
  - **type** (string) - The object type ('audiobook').
  - **uri** (string) - The Spotify URI for the audiobook.
  - **total_chapters** (integer) - The number of chapters in this audiobook.

#### Response Example
```json
{
  "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
  "limit": 20,
  "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  "offset": 0,
  "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  "total": 4,
  "items": [
    {
      "authors": [
        {
          "name": "string"
        }
      ],
      "available_markets": ["string"],
      "copyrights": [
        {
          "text": "string",
          "type": "string"
        }
      ],
      "description": "string",
      "html_description": "string",
      "edition": "Unabridged",
      "explicit": false,
      "external_urls": {
        "spotify": "string"
      },
      "href": "string",
      "id": "string",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          "height": 300,
          "width": 300
        }
      ],
      "languages": ["string"],
      "media_type": "string",
      "name": "string",
      "narrators": [
        {
          "name": "string"
        }
      ],
      "publisher": "string",
      "type": "audiobook",
      "uri": "string",
      "total_chapters": 0
    }
  ]
}
```

#### Error Responses
- **401** Unauthorized
- **403** Forbidden
- **429** Too Many Requests
```

--------------------------------

### Spotify API Response Sample - User Shows

Source: https://developer.spotify.com/documentation/web-api/reference/get-users-saved-episodes

This JSON object represents a sample response from the Spotify Web API when retrieving a user's saved shows. It includes pagination details and a list of shows, each with episode information, added date, and show details. The structure allows for detailed inspection of API data.

```json
{
  "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
  "limit": 20,
  "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  "offset": 0,
  "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  "total": 4,
  "items": [
    {
      "added_at": "string",
      "episode": {
        "audio_preview_url": "https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17",
        "description": "A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.",
        "html_description": "<p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>",
        "duration_ms": 1686230,
        "explicit": false,
        "external_urls": {
          "spotify": "string"
        },
        "href": "https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ",
        "id": "5Xt5DXGzch68nYYamXrNxZ",
        "images": [
          {
            "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            "height": 300,
            "width": 300
          }
        ],
        "is_externally_hosted": false,
        "is_playable": false,
        "language": "en",
        "languages": ["fr", "en"],
        "name": "Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators",
        "release_date": "1981-12-15",
        "release_date_precision": "day",
        "resume_point": {
          "fully_played": false,
          "resume_position_ms": 0
        },
        "type": "episode",
        "uri": "spotify:episode:0zLhl3WsOCQHbe1BPTiHgr",
        "restrictions": {
          "reason": "string"
        },
        "show": {
          "available_markets": ["string"],
          "copyrights": [
            {
              "text": "string",
              "type": "string"
            }
          ],
          "description": "string",
          "html_description": "string",
          "explicit": false,
          "external_urls": {
            "spotify": "string"
          },
          "href": "string",
          "id": "string",
          "images": [
            {
              "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
              "height": 300,
              "width": 300
            }
          ],
          "is_externally_hosted": false,
          "languages": ["string"],
          "media_type": "string",
          "name": "string",
          "publisher": "string",
          "type": "show",
          "uri": "string",
          "total_episodes": 0
        }
      }
    }
  ]
}
```

--------------------------------

### GET /v1/tracks

Source: https://developer.spotify.com/documentation/web-api/reference/get-several-tracks

Retrieve information about one or more tracks based on their Spotify IDs. This endpoint is useful for getting details like track name, artist, album, popularity, and preview URL for multiple tracks in a single request.

```APIDOC
## GET /v1/tracks

### Description
Retrieves detailed information for multiple tracks using their Spotify IDs. This endpoint allows you to fetch data such as track name, artist, album information, popularity, and availability across different markets.

### Method
GET

### Endpoint
`/v1/tracks?ids={ids}`

### Parameters
#### Query Parameters
- **ids** (string) - Required - A comma-separated list of Spotify IDs for the tracks. Maximum of 50 IDs.
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. If provided, the response will include availability information for the specified market.

### Request Example
```curl
curl --request GET \
  --url 'https://api.spotify.com/v1/tracks?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **tracks** (array) - An array of track objects, each containing detailed information about a track.
  - **album** (object) - Information about the album the track belongs to.
  - **artists** (array) - An array of artist objects for the track.
  - **available_markets** (array) - A list of markets where the track is available.
  - **disc_number** (integer) - The disc number the track appears on.
  - **duration_ms** (integer) - The duration of the track in milliseconds.
  - **explicit** (boolean) - Whether the track contains explicit content.
  - **external_ids** (object) - External IDs for the track (e.g., ISRC, EAN, UPC).
  - **external_urls** (object) - External URLs for the track.
  - **href** (string) - A link to the Web API endpoint providing full details of the track.
  - **id** (string) - The Spotify ID for the track.
  - **is_playable** (boolean) - Whether the track is playable in the given market.
  - **linked_from** (object) - (Nullable) If the track is a part of a larger album, this object provides information about the linked track.
  - **name** (string) - The name of the track.
  - **popularity** (integer) - The popularity of the track (0-100).
  - **preview_url** (string) - A URL to a 30-second preview of the track (MP3 format), or null if unavailable.
  - **track_number** (integer) - The track number on the album.
  - **type** (string) - The type of object, always "track".
  - **uri** (string) - The Spotify URI for the track.
  - **is_local** (boolean) - Whether the track is from a local file.
  - **restrictions** (object) - Included if a content restriction is applied, detailing the reason.
    - **reason** (string) - The reason for the restriction (`market`, `product`, `explicit`).

#### Response Example
```json
{
  "tracks": [
    {
      "album": {
        "album_type": "compilation",
        "total_tracks": 9,
        "available_markets": ["CA", "BR", "IT"],
        "external_urls": {
          "spotify": "string"
        },
        "href": "string",
        "id": "2up3OPMp9Tb4dAKM2erWXQ",
        "images": [
          {
            "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            "height": 300,
            "width": 300
          }
        ],
        "name": "string",
        "release_date": "1981-12",
        "release_date_precision": "year",
        "restrictions": {
          "reason": "market"
        },
        "type": "album",
        "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
        "artists": [
          {
            "external_urls": {
              "spotify": "string"
            },
            "href": "string",
            "id": "string",
            "name": "string",
            "type": "artist",
            "uri": "string"
          }
        ]
      },
      "artists": [
        {
          "external_urls": {
            "spotify": "string"
          },
          "href": "string",
          "id": "string",
          "name": "string",
          "type": "artist",
          "uri": "string"
        }
      ],
      "available_markets": ["string"],
      "disc_number": 0,
      "duration_ms": 0,
      "explicit": false,
      "external_ids": {
        "isrc": "string",
        "ean": "string",
        "upc": "string"
      },
      "external_urls": {
        "spotify": "string"
      },
      "href": "string",
      "id": "string",
      "is_playable": false,
      "linked_from": {      },
      "restrictions": {
        "reason": "string"
      },
      "name": "string",
      "popularity": 0,
      "preview_url": "string",
      "track_number": 0,
      "type": "track",
      "uri": "string",
      "is_local": false
    }
  ]
}
```
```

--------------------------------

### GET /me/player/recently-played

Source: https://developer.spotify.com/documentation/web-api/reference/get-recently-played

Get a list of the objects that represent the tracks that the current user has played on Spotify. This includes the track, the artist(s) of the track, the album on which the track was released, the added at, and whether the track is local or not. This endpoint is useful for tracking listening history.

```APIDOC
## GET /me/player/recently-played

### Description
Retrieve information about the tracks that the current user has played recently on Spotify.

### Method
GET

### Endpoint
/me/player/recently-played

### Parameters
#### Query Parameters
- **limit** (integer) - Optional - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
- **after** (integer) - Optional - A Unix timestamp in milliseconds. Returns all items after (but not including) this cursor position. If `after` is specified, `before` must not be specified.
- **before** (integer) - Optional - A Unix timestamp in milliseconds. Returns all items before (but not including) this cursor position. If `before` is specified, `after` must not be specified.

### Request Example
```
GET https://api.spotify.com/v1/me/player/recently-played?limit=10&after=1484811043508
```

### Response
#### Success Response (200)
- **items** (array) - A list of recently played track objects.
- **next** (string) - The URL to the next page of results.
- **cursors** (object) - Contains the cursors for fetching the next page.

#### Response Example
```json
{
  "items": [
    {
      "track": {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/74Xk5F4x34d7a29Q7f4d72"
              },
              "href": "https://api.spotify.com/v1/artists/74Xk5F4x34d7a29Q7f4d72",
              "id": "74Xk5F4x34d7a29Q7f4d72",
              "name": "Artist Name",
              "type": "artist",
              "uri": "spotify:artist:74Xk5F4x34d7a29Q7f4d72"
            }
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/1x0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x"
          },
          "href": "https://api.spotify.com/v1/albums/1x0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x",
          "id": "1x0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b2730x0x0x0x0x0x0x0x0x0x0x0x",
              "width": 640
            }
          ],
          "name": "Album Name",
          "release_date": "2023-01-01",
          "release_date_precision": "day",
          "total_tracks": 10,
          "type": "album",
          "uri": "spotify:album:1x0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/74Xk5F4x34d7a29Q7f4d72"
            },
            "href": "https://api.spotify.com/v1/artists/74Xk5F4x34d7a29Q7f4d72",
            "id": "74Xk5F4x34d7a29Q7f4d72",
            "name": "Artist Name",
            "type": "artist",
            "uri": "spotify:artist:74Xk5F4x34d7a29Q7f4d72"
          }
        ],
        "disc_number": 1,
        "duration_ms": 180000,
        "explicit": false,
        "external_ids": {
          "isrc": "USXYZ1234567"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/1x0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x"
        },
        "href": "https://api.spotify.com/v1/tracks/1x0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x",
        "id": "1x0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x",
        "is_local": false,
        "is_playable": true,
        "name": "Track Name",
        "popularity": 80,
        "preview_url": "https://p.scdn.co/mp3-preview/abcdef1234567890abcdef1234567890",
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:1x0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x"
      },
      "played_at": "2023-10-27T10:00:00Z",
      "context": {
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
        },
        "href": "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M",
        "id": "37i9dQZF1DXcBWIGoYBM5M",
        "type": "playlist",
        "uri": "spotify:playlist:37i9dQZF1DXcBWIGoYBM5M"
      }
    }
  ],
  "next": "https://api.spotify.com/v1/me/player/recently-played?limit=10&after=1484811043508",
  "cursors": {
    "after": 1484811043508
  }
}
```
```

--------------------------------

### GET /playlists/{playlist_id}/images

Source: https://developer.spotify.com/documentation/web-api/reference/get-playlist-cover

Retrieves a list of images for a given playlist. The images can vary in size and resolution.

```APIDOC
## GET /playlists/{playlist_id}/images

### Description
Retrieves a list of images for a given playlist. The images can vary in size and resolution.

### Method
GET

### Endpoint
https://api.spotify.com/v1/playlists/{playlist_id}/images

### Parameters
#### Path Parameters
- **playlist_id** (string) - Required - The Spotify ID for the playlist.

### Request Example
```curl
curl --request GET \
  --url https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/images \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **url** (string) - The source URL of the image.
- **height** (integer) - The image height in pixels.
- **width** (integer) - The image width in pixels.

#### Response Example
```json
[
  {
    "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    "height": 300,
    "width": 300
  }
]
```

#### Error Responses
- **401**: Unauthorized
- **403**: Forbidden
- **429**: Too Many Requests
```

--------------------------------

### Spotify Authorization and Profile Fetching (TypeScript)

Source: https://developer.spotify.com/documentation/web-api/howtos/web-app-profile

Initial script structure for Spotify API integration. It checks for an authorization code, redirects to Spotify if absent, and otherwise fetches user profile data using an access token. Requires helper functions like redirectToAuthCodeFlow, getAccessToken, fetchProfile, and populateUI.

```typescript
const clientId = "your-client-id-here"; // Replace with your client id
const code = undefined;

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    populateUI(profile);
}

async function redirectToAuthCodeFlow(clientId: string) {
    // TODO: Redirect to Spotify authorization page
}

async function getAccessToken(clientId: string, code: string) {
  // TODO: Get access token for code
}

async function fetchProfile(token: string): Promise<any> {
    // TODO: Call Web API
}

function populateUI(profile: any) {
    // TODO: Update UI with profile data
}
```

--------------------------------

### GET /v1/me/albums

Source: https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums

Get a list of the albums saved in the current Spotify user's "Your Music" library. This endpoint allows users to retrieve their saved albums, including details about the albums, artists, and copyright information.

```APIDOC
## GET /v1/me/albums

### Description
Get a list of the albums saved in the current Spotify user's "Your Music" library. This endpoint allows users to retrieve their saved albums, including details about the albums, artists, and copyright information.

### Method
GET

### Endpoint
https://api.spotify.com/v1/me/albums

### Parameters
#### Query Parameters
- **limit** (integer) - Optional - The maximum number of items to return. Default: 20, Max: 50.
- **offset** (integer) - Optional - The number of items to skip over before returning.
- **market** (string) - Optional - An ISO 3166-1 alpha-2 country code. Provide this parameter to ensure the content is considered in the specified market. If omitted, the content will be considered in the market of the user requesting the data.

### Request Example
```curl
curl --request GET \
  --url https://api.spotify.com/v1/me/albums \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
```

### Response
#### Success Response (200)
- **items** (array of SimplifiedAlbumObject) - An array of album objects.
  - **artists** (array of SimplifiedArtistObject) - The artists who performed the album.
  - **available_markets** (array of strings) - A list of the countries in which the album can be played.
  - **copyrights** (array of CopyrightObject) - The copyright statements of the album.
  - **external_ids** (object) - Known external IDs for the album.
  - **genres** (array of strings) - Deprecated. The array is always empty.
  - **label** (string) - The label associated with the album.
  - **name** (string) - The name of the album.
  - **popularity** (integer) - The popularity of the album. The value will be between 0 and 100.
  - **release_date** (string) - The date the album was released.
  - **release_date_precision** (string) - The precision of the release date (year, month, or day).
  - **total_tracks** (integer) - The total number of tracks on the album.
  - **type** (string) - The object type: "album".
  - **uri** (string) - The Spotify URI for the album.
  - **external_urls** (object) - Known external URLs for this album.
  - **href** (string) - A link to the Web API endpoint providing full details of the album.
  - **id** (string) - The Spotify ID for the album.
  - **images** (array of ImageObject) - The cover art for the album.
  - **tracks** (object) - A link to the Web API endpoint for the album's tracks.

#### Response Example
```json
{
  "href": "https://api.spotify.com/v1/me/albums?offset=0&limit=20",
  "items": [
    {
      "album": {
        "album_type": "album",
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/0fA0RE75a1h2g09z7S3Q4W"
            },
            "href": "https://api.spotify.com/v1/artists/0fA0RE75a1h2g09z7S3Q4W",
            "id": "0fA0RE75a1h2g09z7S3Q4W",
            "name": "The Beatles",
            "type": "artist",
            "uri": "spotify:artist:0fA0RE75a1h2g09z7S3Q4W"
          }
        ],
        "available_markets": [
          "CA",
          "MX",
          "US"
        ],
        "copyrights": [
          {
            "text": "© 1967",
            "type": "C"
          },
          {
            "text": "℗ 1967",
            "type": "P"
          }
        ],
        "external_ids": {
          "isrc": "GBAYE6700071",
          "ean": "0077779657728",
          "upc": "77779657728"
        },
        "genres": [],
        "href": "https://api.spotify.com/v1/albums/6UTJuI7Z120J2f0f7n0a3O",
        "id": "6UTJuI7Z120J2f0f7n0a3O",
        "images": [
          {
            "height": 640,
            "url": "https://i.scdn.co/image/ab67616d0000b273337a11535157660136269163",
            "width": 640
          },
          {
            "height": 300,
            "url": "https://i.scdn.co/image/ab67616d00001e02337a11535157660136269163",
            "width": 300
          },
          {
            "height": 64,
            "url": "https://i.scdn.co/image/ab67616d000044d4337a11535157660136269163",
            "width": 64
          }
        ],
        "label": "Capitol Records",
        "name": "Sgt. Pepper's Lonely Hearts Club Band",
        "popularity": 80,
        "release_date": "1967-06-01",
        "release_date_precision": "day",
        "total_tracks": 13,
        "track_number": 1,
        "type": "album",
        "uri": "spotify:album:6UTJuI7Z120J2f0f7n0a3O"
      },
      "added_at": "2023-01-01T12:00:00Z"
    }
  ],
  "limit": 20,
  "next": null,
  "offset": 0,
  "previous": null,
  "total": 1
}
```
```