import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import artistSyncHandler from '../../models/firebase/syncers/artist-syncer';
import TopBar from './top-bar';
import BotBar from './bot-bar';
import Welcome from './welcome';
import ProfilePicture from './profile-picture';
import SetUpEpk from './set-up-epk';
import {
  ConnectSocials,
  ConnectToSpotify,
  ConnectToSpotifyComplete,
} from './connect-socials';
import Review from './review';
import Complete from './complete';

/**
 *
 */
class ArtistSignUp extends React.Component {
  /**
   *
   * @param {ArtistSignUp.propTypes} props
   */
  constructor(props) {
    super(props);
    this.state = {
      didAutoRedirect: false,
      artistSyncer: null,
      epkSyncer: null,
      error: null,
    };

    this.onError = this.onError.bind(this);
  }

  /**
   *
   */
  componentDidMount() {
    if (this.props.currUser) {
      artistSyncHandler.getSyncer(this.props.currUser.uid)
          .then((artistSyncer) => {
            artistSyncer.getEpkSyncer().then((epkSyncer) => {
              this.setState((prevState) => {
                return {
                  ...prevState,
                  artistSyncer: artistSyncer,
                  epkSyncer: epkSyncer,
                };
              });
            });
          });
    }
  }

  /**
   *
   * @param {Object} prevProps
   * @param {Object} prevState
   * @param {Object} snapshot
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.currUser === prevProps.currUser) return;
    if (this.props.currUser) {
      artistSyncHandler.getSyncer(this.props.currUser.uid)
          .then((artistSyncer) => {
            artistSyncer.getEpkSyncer().then((epkSyncer) => {
              this.setState((prevState) => {
                return {
                  ...prevState,
                  artistSyncer: artistSyncer,
                  epkSyncer: epkSyncer,
                };
              });
            });
          });
    }
  }

  /**
   *
   * @param {String} err
   */
  onError(err) {
    this.setState((prevState) => {
      return {...prevState, error: err};
    });
  }

  /**
   *
   * @return {JSX.Element}
   */
  render() {
    const content = (
      <Routes>
        <Route path='*'
          element={
            <Welcome
              artistSyncer={this.state.artistSyncer}
              epkSyncer={this.state.epkSyncer}
              onError={this.onError}/>
          }/>
        <Route path='profile-picture'
          element={
            <ProfilePicture
              artistSyncer={this.state.artistSyncer}
              epkSyncer={this.state.epkSyncer}
              onError={this.onError}/>
          }/>
        <Route path='set-up-epk'
          element={
            <SetUpEpk
              artistSyncer={this.state.artistSyncer}
              epkSyncer={this.state.epkSyncer}
              onError={this.onError}/>
          }/>
        <Route path='connect-socials'
          element={
            <ConnectSocials
              artistSyncer={this.state.artistSyncer}
              epkSyncer={this.state.epkSyncer}
              onError={this.onError}/>
          }/>
        <Route path='connect-to-spotify'
          element={<ConnectToSpotify/>}/>
        <Route path='connect-to-spotify-complete'
          element={
            <ConnectToSpotifyComplete
              epkSyncer={this.state.epkSyncer}/>
          }/>
        <Route path='review'
          element={
            <Review
              artistSyncer={this.state.artistSyncer}
              epkSyncer={this.state.epkSyncer}
              onError={this.onError}/>
          }/>
        <Route path='thank-you'
          element={
            <Complete
              artistSyncer={this.state.artistSyncer}
              epkSyncer={this.state.epkSyncer}/>
          }/>
      </Routes>
    );

    const redirectOverride = () => {
      if (this.state.didAutoRedirect) return null;
      if (this.state.artistSyncer === null) return null;
      if (this.state.artistSyncer.signUpProg === 0) return null;

      let content;
      switch (this.state.artistSyncer.signUpProg) {
        case 1:
          content = <Navigate replace to={'/sign-up/profile-picture'}/>;
          break;
        case 2:
          content = <Navigate replace to={'/sign-up/set-up-epk'}/>;
          break;
        case 3:
          content = <Navigate replace to={'/sign-up/connect-socials'}/>;
          break;
        case 4:
          content = <Navigate replace to={'/sign-up/review'}/>;
          break;
        case 5:
          content = <Navigate replace to={'/sign-up/thank-you'}/>;
          break;
        default:
          content = null;
      }

      this.setState((prevState) => {
        return {...prevState, didAutoRedirect: true};
      });
      return content;
    };

    return (
      <div className="container">
        <TopBar/>
        {
          this.state.error &&
          <div className="alert alert-danger my-4" role="alert">
            {this.state.error}
          </div>
        }
        {content}
        {redirectOverride()}
        <BotBar/>
      </div>
    );
  }
}

ArtistSignUp.propTypes = {
  currUser: PropTypes.any,
};

export default ArtistSignUp;
