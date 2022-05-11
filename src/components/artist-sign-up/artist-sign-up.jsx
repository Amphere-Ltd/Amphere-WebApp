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
      signUpProg: 0,
      artistSyncer: null,
      epkSyncer: null,
      error: null,
    };

    this.onFlowProgression = this.onFlowProgression.bind(this);
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
   * @param {Number} prog
   */
  onFlowProgression(prog) {
    if (this.state.artistSyncer) {
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.artistSyncer.signUpProg = prog;
      this.state.artistSyncer.push();
    }

    this.setState((prevState) => {
      return {...prevState, signUpProg: prog};
    });
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
              onFlowProgression={this.onFlowProgression}
              onError={this.onError}/>
          }/>
        <Route path='profile-picture'
          element={
            <ProfilePicture
              artistSyncer={this.state.artistSyncer}
              epkSyncer={this.state.epkSyncer}
              onFlowProgression={this.onFlowProgression}
              onError={this.onError}/>
          }/>
        <Route path='set-up-epk'
          element={
            <SetUpEpk
              artistSyncer={this.state.artistSyncer}
              epkSyncer={this.state.epkSyncer}
              onFlowProgression={this.onFlowProgression}
              onError={this.onError}/>
          }/>
        <Route path='connect-socials'
          element={
            <ConnectSocials
              artistSyncer={this.state.artistSyncer}
              epkSyncer={this.state.epkSyncer}
              onFlowProgression={this.onFlowProgression}
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
              onFlowProgression={this.onFlowProgression}
              onError={this.onError}/>
          }/>
        <Route path='thank-you'
          element={
            <Complete
              artistSyncer={this.state.artistSyncer}
              epkSyncer={this.state.epkSyncer}
              onFlowProgression={this.onFlowProgression}/>
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

    const displayName = this.state.artistSyncer ?
      this.state.artistSyncer.displayName : 'Unknown Artist';

    return (
      <div className="container">
        <TopBar
          displayName={displayName}
          signUpCurrProg={this.state.signUpProg}
          signUpCompleteProg={5}/>
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
