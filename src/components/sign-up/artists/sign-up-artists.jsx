import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import artistSyncHandler from '../../../models/firebase/syncers/artist-syncer';
import LoadingScreen from '../../common/loading-screen';
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
class SignUpArtists extends React.Component {
  /**
   *
   * @param {SignUpArtists.propTypes} props
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoadingSyncers: true,
      shouldRedirectTo: 0,
      error: null,
    };

    this.onError = this.onError.bind(this);
  }

  /**
   *
   */
  async componentDidMount() {
    if (this.props.currUser && this.state.isLoadingSyncers) {
      // Triggered by first visiting the page, or reloading the page.

      /**
       *
       * @param {String} userUid
       */
      const setSyncersAndRedirect = async (userUid) => {
        if (this.props.currUser === null) return;

        const artistSyncer =
          await artistSyncHandler.getSyncer(this.props.currUser.uid);

        this.setState((prevState) => {
          return {
            ...prevState,
            isLoadingSyncers: false,
            shouldRedirectTo: artistSyncer.signUpProg,
          };
        });
      };

      const currUserUid = this.props.currUser.uid;
      await setSyncersAndRedirect(currUserUid);
    } else {
      this.setState((prevState) => {
        return {...prevState, isLoadingSyncers: false};
      });
    }
  }

  /**
   *
   * @param {Object} prevProps
   * @param {Object} prevState
   * @param {Object} snapshot
   */
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  /**
   *
   * @param {null|String} err
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
    if (this.state.isLoadingSyncers) {
      return <LoadingScreen/>;
    }

    let redirectOverride = null;
    if (this.state.shouldRedirectTo > 0) {
      switch (this.state.shouldRedirectTo) {
        case 1:
          redirectOverride =
            <Navigate replace to={'/sign-up/artists/profile-picture'}/>;
          break;
        case 2:
          redirectOverride =
            <Navigate replace to={'/sign-up/artists/set-up-epk'}/>;
          break;
        case 3:
          redirectOverride =
            <Navigate replace to={'/sign-up/artists/connect-socials'}/>;
          break;
        case 4:
          redirectOverride =
            <Navigate replace to={'/sign-up/artists/review'}/>;
          break;
        case 5:
          redirectOverride =
            <Navigate replace to={'/sign-up/artists/thank-you'}/>;
          break;
        default:
          break;
      }
      this.setState((prevState) => {
        return {...prevState, shouldRedirectTo: 0};
      });
    }

    const content = (
      <Routes>
        <Route path='*'
          element={
            <Welcome
              currUser={this.props.currUser}
              onError={this.onError}/>
          }/>
        <Route path='profile-picture'
          element={
            <ProfilePicture
              currUser={this.props.currUser}
              onError={this.onError}/>
          }/>
        <Route path='set-up-epk'
          element={
            <SetUpEpk
              currUser={this.props.currUser}
              onError={this.onError}/>
          }/>
        <Route path='connect-socials'
          element={
            <ConnectSocials
              currUser={this.props.currUser}
              onError={this.onError}/>
          }/>
        <Route path='connect-to-spotify'
          element={<ConnectToSpotify/>}/>
        <Route path='connect-to-spotify-complete'
          element={
            <ConnectToSpotifyComplete
              currUser={this.props.currUser}/>
          }/>
        <Route path='review'
          element={
            <Review
              currUser={this.props.currUser}
              onError={this.onError}/>
          }/>
        <Route path='thank-you'
          element={
            <Complete
              currUser={this.props.currUser}/>
          }/>
      </Routes>
    );

    return (
      <div className="container">
        <TopBar
          currUser={this.props.currUser}
          signUpStageCount={5}/>
        {
          this.state.error &&
          <div className="alert alert-danger my-4" role="alert">
            {this.state.error}
          </div>
        }
        {content}
        {redirectOverride}
        <BotBar/>
      </div>
    );
  }
}

SignUpArtists.propTypes = {
  currUser: PropTypes.any,
};

export default SignUpArtists;
