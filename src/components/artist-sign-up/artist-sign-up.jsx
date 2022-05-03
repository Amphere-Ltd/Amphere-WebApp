import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  onAuthStateChanged,
} from 'firebase/auth';
import service from '../../models/firebase/service';
import LoadingScreen from '../common/loading-screen';
import TopBar from './top-bar';
import BotBar from './bot-bar';
import Welcome from './welcome';
import ProfilePicture from './profile-picture';
import SetUpEpk from './set-up-epk';

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
      isFindingUser: true,
      error: null,
    };
  }

  /**
   *
   */
  componentDidMount() {
    onAuthStateChanged(service.auth, (user) => {
      if (user) {
        this.props.setCurrUser(user);
      } else {
        this.props.setCurrUser(null);
      }
      this.setState((prevState) => {
        return {...prevState, isFindingUser: false};
      });
    });
  }

  /**
   *
   * @param {Object} prevProps
   * @param {Object} prevState
   * @param {Object} snapshot
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
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
    let content;

    if (this.state.isFindingUser) {
      return <LoadingScreen/>;
    }

    if (this.props.getCurrUser() === undefined) {
      content = <Welcome onError={this.onError}/>;
    } else {
      content = (
        <Routes>
          <Route path='*' element={<Welcome onError={this.onError}/>}/>
          <Route path='profile-picture'
            element={
              <ProfilePicture getCurrUser={this.props.getCurrUser}
                onError={this.onError}/>
            }/>
          <Route path='set-up-epk'
            element={
              <SetUpEpk getCurrUser={this.props.getCurrUser}
                onError={this.onError}/>
            }/>
          <Route path='connect-socials' element={<LoadingScreen/>}/>
          <Route path='connect-to-spotify' element={<LoadingScreen/>}/>
          <Route path='connect-to-spotify-complete' element={<LoadingScreen/>}/>
          <Route path='review' element={<LoadingScreen/>}/>
          <Route path='thank-you' element={<LoadingScreen/>}/>
        </Routes>
      );
    }

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
  getCurrUser: PropTypes.func,
  setCurrUser: PropTypes.func,
};

export default ArtistSignUp;
