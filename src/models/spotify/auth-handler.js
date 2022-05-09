// Shortcuts to Spotify's API URLS.
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
// const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
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
const SCOPE = [
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
].join(' ');

// let nextRedirectUrl = undefined;

const getAppUrlBase = () => {
  const testBase = 'http://localhost:3000';
  const prodBase = 'https://web.amphere.co.uk';
  return process.env.NODE_ENV == 'development' ? testBase : prodBase;
};

const getAppUrlCallback = () => {
  return `${getAppUrlBase()}/${CALLBACK_EXT}`;
};

const authThenRedirectTo = (redirectUrl) => {
  window.localStorage.setItem('nextRedirectUrl', redirectUrl);

  const queryParams = {
    response_type: 'token',
    redirect_uri: getAppUrlCallback(),
    scope: SCOPE,
    state: STATE,
    show_dialog: SHOW_DIALOG,
    client_id: CLIENT_IDENT,
  };
  const queryParamsAsString = Object.entries(queryParams).map(([key, val]) => {
    return `${key}=${encodeURI(val)}`;
  }).join('&');

  window.location.replace(`${SPOTIFY_AUTH_URL}/?${queryParamsAsString}`);
};

const handleCallback = (queryParams) => {
  // Step 4: Requests refresh and access tokens.
  if (queryParams.get('error')) {
    // TODO: Handle.
    return;
  }

  window.localStorage.setItem('access_token', queryParams.get('access_token'));
  window.location.replace(window.localStorage.getItem('nextRedirectUrl'));
};

const authHandler = {
  getAppUrlBase: getAppUrlBase,
  getAppUrlCallback: getAppUrlCallback,
  authThenRedirectTo: authThenRedirectTo,
  handleCallback: handleCallback,
  getSpotifyApiUrl: () => SPOTIFY_API_URL,
};

export default authHandler;
