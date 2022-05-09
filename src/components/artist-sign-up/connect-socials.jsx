import React from 'react';
import {Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import artistSyncHandler from '../../models/firebase/syncers/artist-syncer';
import authHandler from '../../models/spotify/auth-handler';
import service from '../../models/firebase/service';
import artistHandler from '../../models/spotify/artist-handler';

/**
 *
 */
class ConnectSocials extends React.Component {
  /**
   *
   * @param {ConnectSocials.propTypes} props
   */
  constructor(props) {
    super(props);

    this.state = {
      shouldRedirect: false,
      shouldConnectToSpotify: false,
      linkToInstagram: '',
      linkToSpotify: '',
      linkToAppleMusic: '',
      linkToSoundCloud: '',
      linkToFacebook: '',
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   *
   * @param {Event} event
   */
  handleFormChange(event) {
    switch (event.target.name) {
      case 'linkToInstagram':
        this.setState((prevState) => {
          return {...prevState, linkToInstagram: event.target.value};
        });
        break;
      case 'linkToSpotify':
        this.setState((prevState) => {
          return {...prevState, shouldConnectToSpotify: true};
        });
        break;
      case 'linkToAppleMusic':
        this.setState((prevState) => {
          return {...prevState, linkToAppleMusic: event.target.value};
        });
        break;
      case 'linkToSoundCloud':
        this.setState((prevState) => {
          return {...prevState, linkToSoundCloud: event.target.value};
        });
        break;
      case 'linkToFacebook':
        this.setState((prevState) => {
          return {...prevState, linkToFacebook: event.target.value};
        });
        break;
      default:
        break;
    }
  }

  /**
   *
   * @param {Event} event
   */
  handleFormSubmit(event) {
    event.preventDefault();

    // TODO: Validate input data.

    const userUid = this.props.getCurrUser().uid;
    artistSyncHandler.getSyncer(userUid).then((artistSyncer) => {
      artistSyncer.getEpkSyncer().then((epkSyncer) => {
        epkSyncer.linkToInstagram = this.state.linkToInstagram;
        epkSyncer.linkToSpotify = this.state.linkToSpotify;
        epkSyncer.linkToAppleMusic = this.state.linkToAppleMusic;
        epkSyncer.linkToSoundCloud = this.state.linkToSoundCloud;
        epkSyncer.linkToFacebook = this.state.linkToFacebook;
        epkSyncer.push();
      });
    });

    this.setState((prevState) => {
      return {...prevState, shouldRedirect: true};
    });
  }

  /**
   *
   * @return {JSX.Element}
   */
  render() {
    if (this.state.shouldRedirect) {
      return <Navigate replace to={'/sign-up/complete'}/>;
    }
    if (this.state.shouldConnectToSpotify) {
      return <Navigate replace to={'/sign-up/connect-to-spotify'}/>;
    }

    return (
      <div className={'container'}>
        <div className="my-4 text-center">
          <h1>Connect your socials</h1>
        </div>
        <div className="container-narrow mx-auto">
          <form>
            <div className="form-group row my-3">
              <label htmlFor="linkToInstagram"
                className="col-sm-3 col-form-label">
                <div className="row">
                  <div className="col-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <div className="col-10">
                  Instagram:
                  </div>
                </div>
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="linkToInstagram"
                  name="linkToInstagram"
                  placeholder="Enter your Instagram link"
                  value={this.state.linkToInstagram}
                  onChange={this.handleFormChange}/>
              </div>
            </div>
            <div className="form-group row my-3">
              <label htmlFor="linkToSpotify"
                className="col-sm-3 col-form-label">
                <div className="row">
                  <div className="col-2">
                    <i className="fa-brands fa-spotify"></i>
                  </div>
                  <div className="col-10">
                  Spotify:
                  </div>
                </div>
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" role="button"
                  id="linkToSpotify" name="linkToSpotify"
                  placeholder="Enter your Spotify Artist link"
                  value={this.state.linkToSpotify}
                  onFocus={this.handleFormChange}/>
              </div>
            </div>
            <div className="form-group row my-3">
              <label htmlFor="linkToAppleMusic"
                className="col-sm-3 col-form-label">
                <div className="row">
                  <div className="col-2">
                    <i className="fa-brands fa-apple"></i>
                  </div>
                  <div className="col-10">
                  Apple Music:
                  </div>
                </div>
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control"
                  id="linkToAppleMusic" name="linkToAppleMusic"
                  placeholder="Enter your Apple Music link"
                  value={this.state.linkToAppleMusic}
                  onChange={this.handleFormChange}/>
              </div>
            </div>
            <div className="form-group row my-3">
              <label htmlFor="linkToSoundCloud"
                className="col-sm-3 col-form-label">
                <div className="row">
                  <div className="col-2">
                    <i className="fa-brands fa-soundcloud"></i>
                  </div>
                  <div className="col-10">
                  SoundCloud:
                  </div>
                </div>
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control"
                  id="linkToSoundCloud" name="linkToSoundCloud"
                  placeholder="Enter your SoundCloud link"
                  value={this.state.linkToSoundCloud}
                  onChange={this.handleFormChange}/>
              </div>
            </div>
            <div className="form-group row my-3">
              <label htmlFor="linkToFacebook"
                className="col-sm-3 col-form-label">
                <div className="row">
                  <div className="col-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <div className="col-10">
                  Facebook:
                  </div>
                </div>
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="linkToFacebook"
                  name="linkToFacebook"
                  placeholder="Enter your Facebook page link"
                  value={this.state.linkToFacebook}
                  onChange={this.handleFormChange}/>
              </div>
            </div>
            <div className="row my-5">
              <input type="submit" name="action" value="N E X T"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ConnectSocials.propTypes = {
  getCurrUser: PropTypes.func,
  onError: PropTypes.func,
};

/**
 *
 */
class ConnectToSpotify extends React.Component {
  /**
   *
   */
  componentDidMount() {
    const redirectUrl =
      `${authHandler.getAppUrlBase()}/sign-up/connect-to-spotify-complete`;
    authHandler.authThenRedirectTo(redirectUrl);
  }

  /**
   *
   * @return {null}
   */
  render() {
    return null;
  }
}

/**
 *
 */
class ConnectToSpotifyComplete extends React.Component {
  /**
   *
   */
  componentDidMount() {
    const userUid = service.auth.currentUser.uid;
    artistHandler.getCurrUserArtistLink().then((linkToSpotify) => {
      artistSyncHandler.getSyncer(userUid).then((artistSyncer) => {
        artistSyncer.getEpkSyncer().then((epkSyncer) => {
          epkSyncer.linkToSpotify = linkToSpotify;
          epkSyncer.push();
        });
      });
    });
  }

  /**
   *
   * @return {JSX.Element}
   */
  render() {
    return <Navigate replace to={'/sign-up/connect-socials'}/>;
  }
}

export {ConnectSocials, ConnectToSpotify, ConnectToSpotifyComplete};
