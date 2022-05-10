import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import {onAuthStateChanged, User} from 'firebase/auth';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import authHandler from '../models/spotify/auth-handler';
import ArtistSignUp from './artist-sign-up/artist-sign-up';
import './app.css';
import service from '../models/firebase/service';

/**
 *
 */
class App extends React.Component {
  /**
   *
   * @param {App.propTypes} props
   */
  constructor(props) {
    super(props);
    this.state = {
      currUser: null,
    };
  }

  /**
   *
   */
  componentDidMount() {
    onAuthStateChanged(service.auth, (user) => {
      this.setState((prevState) => {
        return {...prevState, currUser: user};
      });
    });
  }

  /**
   *
   * @return {JSX.Element}
   */
  render() {
    return (
      <Routes>
        <Route path={'*'} element={<Navigate replace to={'/sign-up'}/>}/>
        <Route path={'sign-up/*'}
          element={
            <ArtistSignUp currUser={this.state.currUser}/>
          }/>
        <Route path={'callback-spotify'}
          element={<CallbackSpotify/>}/>
      </Routes>
    );
  }
}

App.propTypes = {};

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

export default App;
