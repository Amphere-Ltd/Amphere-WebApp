import React from 'react';
import authHandler from '../../models/spotify/auth-handler';
import PropTypes from 'prop-types';

/**
 *
 */
class CallbackSpotify extends React.Component {
  /**
   *
   * @param {CallbackSpotify.propTypes} props
   */
  constructor(props) {
    super(props);
  }

  /**
   *
   * @return {Promise<void>}
   */
  async componentDidMount() {
    if (this.props.currUser) {
      const queryString = window.location.search.substring(1);
      const queryParams = new URLSearchParams(queryString);
      await authHandler.handleAuthCallback(queryParams);
    }
  }

  /**
   *
   * @param {Object} prevProps
   * @param {Object} prevState
   * @param {Object} snapshot
   */
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.currUser === prevProps.currUser) return;
    if (this.props.currUser) {
      const queryString = window.location.search.substring(1);
      const queryParams = new URLSearchParams(queryString);
      await authHandler.handleAuthCallback(queryParams);
    }
  }

  /**
   *
   * @return {null}
   */
  render() {
    return null;
  }
}

CallbackSpotify.propTypes = {
  currUser: PropTypes.object,
};

export default CallbackSpotify;
