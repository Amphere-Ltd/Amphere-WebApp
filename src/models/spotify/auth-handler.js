import axios from 'axios';
import service from '../firebase/service';
import artistSyncHandler from '../firebase/syncers/artist-syncer';

// Shortcuts to Spotify's API URLS.
const SPOTIFY_OAUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com';
const SPOTIFY_API_VER = 'v1';
const SPOTIFY_API_URL = `${SPOTIFY_API_BASE_URL}/${SPOTIFY_API_VER}`;

// Make sure the callback URI is whitelisted in the Spotify Developers settings.
// See https://developer.spotify.com/dashboard/applications.
const CLIENT_IDENT = '49a57c0a79f94c5da7071842ed6a7753';
const CLIENT_SECRET = '93727de085be49f2a4475f08fce5b2ab'; // TODO: Remove.
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

const getAppUrlBase = () => {
  const testBase = 'http://localhost:3000';
  const prodBase = 'https://web.amphere.co.uk';
  return process.env.NODE_ENV == 'development' ? testBase : prodBase;
};

const getAppUrlCallback = () => {
  return `${getAppUrlBase()}/${CALLBACK_EXT}`;
};

const getAccessToken = async () => {
  if (service.auth.currentUser) {
    const userUid = service.auth.currentUser.uid;
    const artistSyncer = await artistSyncHandler.getSyncer(userUid);
    const epkSyncer = await artistSyncer.getEpkSyncer();
    if (epkSyncer.accessToSpotify) {
      const refreshToken = epkSyncer.accessToSpotify['refresh_token'];

      const queryString = require('query-string');
      const data = queryString.stringify({
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken,
      });
      const authString = `${CLIENT_IDENT}:${CLIENT_SECRET}`;
      const authHashed = btoa(authString);
      const headers = {
        'Authorization': 'Basic ' + authHashed,
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      try {
        const response = await axios.post(SPOTIFY_TOKEN_URL, data, {
          headers: headers,
        });
        console.log('Spotify Refresh Token callback worked', response.data);
        const newAccessToken = response.data['access_token'];
        epkSyncer.accessToSpotify['access_token'] = newAccessToken;
        await epkSyncer.push();
        return newAccessToken;
      } catch (error) {
        // TODO: Handle.
        console.log('Spotify Refresh Token callback failed', error);
      }
    } else {
      return '';
    }
  }
};

const setAccessToken = async (token) => {
  if (service.auth.currentUser) {
    const userUid = service.auth.currentUser.uid;
    const artistSyncer = await artistSyncHandler.getSyncer(userUid);
    const epkSyncer = await artistSyncer.getEpkSyncer();
    if (epkSyncer.accessToSpotify) {
      epkSyncer.accessToSpotify['access_token'] = token;
    }
  }
};

const getRedirectUrl = () => {
  return window.localStorage.getItem('spotifyRedirectUrl');
};

const setRedirectUrl = (url) => {
  window.localStorage.setItem('spotifyRedirectUrl', url);
};

const getIsHandlingCallback = () => {
  return window.localStorage.getItem('isHandlingSpotifyCallback');
};

const setIsHandlingCallback = (isHandling) => {
  if (isHandling) {
    console.log('spotify/auth-handler is handling callback and blocking ' +
      'redirects.');
  } else {
    console.log('spotify/auth-handler is done handling callback.');
  }
  window.localStorage.setItem('isHandlingSpotifyCallback', isHandling);
};

const authAndSetRedirect = (redirectUrl) => {
  setRedirectUrl(redirectUrl);

  const queryParams = {
    response_type: 'code',
    redirect_uri: getAppUrlCallback(),
    scope: SCOPE,
    state: STATE,
    show_dialog: SHOW_DIALOG,
    client_id: CLIENT_IDENT,
  };
  const queryParamsAsString = Object.entries(queryParams).map(([key, val]) => {
    return `${key}=${encodeURI(val)}`;
  }).join('&');

  window.location.replace(`${SPOTIFY_OAUTH_URL}/?${queryParamsAsString}`);
};

const handleAuthCallback = async (queryParams) => {
  setIsHandlingCallback(true);

  // Step 4: Requests refresh and access tokens.
  if (queryParams.get('error')) {
    // TODO: Handle.
    console.log('Spotify Auth callback failed', queryParams.get('error'));
    return;
  }

  const queryString = require('query-string');
  const code = queryParams.get('code');
  const data = queryString.stringify({
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': getAppUrlCallback(),
  });
  const authString = `${CLIENT_IDENT}:${CLIENT_SECRET}`;
  const authHashed = btoa(authString);
  const headers = {
    'Authorization': 'Basic ' + authHashed,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const response = await axios.post(SPOTIFY_TOKEN_URL, data, {
      headers: headers,
    });
    console.log('Spotify Code callback worked', response.data);
    if (service.auth.currentUser) {
      const userUid = service.auth.currentUser.uid;
      const artistSyncer = await artistSyncHandler.getSyncer(userUid);
      const epkSyncer = await artistSyncer.getEpkSyncer();
      epkSyncer.accessToSpotify = response.data;
      await epkSyncer.push();
      console.log('Spotify connected to user with UID', userUid);
    }
    window.location.replace(getRedirectUrl());
  } catch (error) {
    // TODO: Handle.
    console.log('Spotify Code callback failed', error);
  }
};

const authHandler = {
  getAppUrlBase: getAppUrlBase,
  getAppUrlCallback: getAppUrlCallback,
  authAndSetRedirect: authAndSetRedirect,
  handleAuthCallback: handleAuthCallback,
  getSpotifyApiUrl: () => SPOTIFY_API_URL,
  getAccessToken: getAccessToken,
  setAccessToken: setAccessToken,
  getRedirectUrl: getRedirectUrl,
  setRedirectUrl: setRedirectUrl,
  getIsHandlingCallback: getIsHandlingCallback,
  setIsHandlingCallback: setIsHandlingCallback,
};

export default authHandler;
