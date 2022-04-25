// Shortcuts to Spotify's API URLS.
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com';
const SPOTIFY_API_VER = 'v1';
const SPOTIFY_API_URL = `${SPOTIFY_API_BASE_URL}/${SPOTIFY_API_VER}`;

// Make sure the callback URI is whitelisted in the Spotify Developers settings.
// See https://developer.spotify.com/dashboard/applications.
const CLIENT_IDENT = '49a57c0a79f94c5da7071842ed6a7753';
const CALLBACK_EXT = 'callback-spotify';

// Additional settings when making the query to Spotify's API.
const SHOW_DIALOG = true;
const STATE = '';
const SCOPE = ' '.join([
  'user-read-playback-state',
  'user-read-currently-playing',
  'user-follow-read',
  'user-read-recently-played',
  'user-top-read',
  'playlist-read-collaborative',
  'playlist-read-private',
  'user-read-email',
  'user-read-private',
  'user-library-read',
]);
