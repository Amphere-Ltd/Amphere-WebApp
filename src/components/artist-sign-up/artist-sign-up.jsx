import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import artistSyncHandler from '../../models/firebase/syncers/artist-syncer';
import LoadingScreen from '../common/loading-screen';
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
        <Route path='thank-you' element={<LoadingScreen/>}/>
      </Routes>
    );

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
        <BotBar/>
      </div>
    );
  }
}

ArtistSignUp.propTypes = {
  currUser: PropTypes.any,
};

export default ArtistSignUp;
