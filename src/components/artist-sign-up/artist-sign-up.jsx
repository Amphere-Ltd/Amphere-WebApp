import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import PropTypes from 'prop-types';
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
    this.state = {error: null};

    this.onError = this.onError.bind(this);
  }

  /**
   *
   */
  componentDidMount() {}

  /**
   *
   * @param {Object} prevProps
   * @param {Object} prevState
   * @param {Object} snapshot
   */
  componentDidUpdate(prevProps, prevState, snapshot) {}

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
        <BotBar/>
      </div>
    );
  }
}

ArtistSignUp.propTypes = {
  currUser: PropTypes.any,
};

export default ArtistSignUp;
