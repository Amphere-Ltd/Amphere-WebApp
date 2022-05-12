import React from 'react';
import authHandler from '../../models/spotify/auth-handler';

/**
 *
 */
class CallbackSpotify extends React.Component {
  /**
   *
   * @return {null}
   */
  render() {
    const queryString = window.location.hash.substring(1);
    const queryParams = new URLSearchParams(queryString);
    authHandler.handleAuthCallback(queryParams);
    return null;
  }
}

export default CallbackSpotify;
