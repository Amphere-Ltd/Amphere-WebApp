import axios from 'axios';
import authHandler from './auth-handler';

const getCurrUserProfile = async () => {
  const accessToken = await authHandler.getAccessToken();
  const response = await axios.get(`${authHandler.getSpotifyApiUrl()}/me`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

const getCurrUserArtistLink = async () => {
  const profileData = await getCurrUserProfile();
  if (!profileData) {
    return null;
  } else {
    return profileData['external_urls']['spotify'];
  }
};

const artistHandler = {
  getCurrUserProfile: getCurrUserProfile,
  getCurrUserArtistLink: getCurrUserArtistLink,
};

export default artistHandler;
