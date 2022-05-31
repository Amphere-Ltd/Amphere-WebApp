import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import {onAuthStateChanged} from 'firebase/auth';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import service from './models/firebase/service';
import LoadingScreen from './components/common/loading-screen';
import DeveloperData from './components/common/developer-data';
import CallbackSpotify from './components/common/callback-spotify';
import SignUpArtists from './components/sign-up/artists/sign-up-artists';
import ArtistsHome from './components/artists/home/artists-home';
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
      isLoading: true,
      currUser: null,
    };
  }

  /**
   *
   */
  componentDidMount() {
    onAuthStateChanged(service.auth, (user) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          isLoading: false,
          currUser: user,
        };
      });
    });
  }

  /**
   *
   * @param {Object} prevProps
   * @param {Object} prevState
   * @param {Object} snapshot
   */
  async componentDidUpdate(prevProps, prevState, snapshot) {
  }

  /**
   *
   * @return {JSX.Element}
   */
  render() {
    if (this.state.isLoading) {
      return <LoadingScreen/>;
    } else {
      let root;
      if (process.env.NODE_ENV != 'development' ||
        this.state.currUser === null) {
        root = <Navigate replace to={'/sign-up/artists'}/>;
      } else {
        root = <Navigate replace to={`/artists/${this.state.currUser.uid}`}/>;
      }

      return (
        <Routes>
          <Route path={'*'}
            element={
              root
            }/>
          <Route path={'developer-data'}
            element={
              <DeveloperData/>
            }/>
          <Route path={'sign-up/artists/*'}
            element={
              <SignUpArtists currUser={this.state.currUser}/>
            }/>
          <Route path={'artists/:userUid'}
            element={
              <ArtistsHome currUser={this.state.currUser}/>
            }/>
          <Route path={'callback-spotify'}
            element={
              <CallbackSpotify currUser={this.state.currUser}/>
            }/>
        </Routes>
      );
    }
  }
}

App.propTypes = {};

export default App;
