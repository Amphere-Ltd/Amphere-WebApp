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
import service from './models/firebase/service';
import DeveloperData from './components/common/developer-data';
import CallbackSpotify from './components/common/callback-spotify';
import ArtistSignUp from './components/artist-sign-up/artist-sign-up';
import './App.css';

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
        <Route path={'developer-data'} element={<DeveloperData/>}/>
        <Route path={'sign-up/*'}
          element={
            <ArtistSignUp currUser={this.state.currUser}/>
          }/>
        <Route path={'callback-spotify'}
          element={
            <CallbackSpotify currUser={this.state.currUser}/>
          }/>
      </Routes>
    );
  }
}

App.propTypes = {};

export default App;
