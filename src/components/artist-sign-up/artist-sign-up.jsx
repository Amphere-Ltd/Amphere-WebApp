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
import TopBar from './top-bar';
import BotBar from './bot-bar';
import Welcome from './welcome';
import ProfilePicture from './profile-picture';
import 'bootstrap/dist/css/bootstrap.css';
import '../common/base.css';

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
    if (this.state.currUser === null) {
      // TODO: Replace this with loading screen.
      content = <Welcome onError={this.onError}/>;
    } else {
      content = (
        <Routes>
          <Route path='*' element={<Welcome/>}/>
          <Route path='profile-picture' element={<ProfilePicture/>}/>
          <Route path='set-up-epk' element={<p/>}/>
          <Route path='connect-socials' element={<p/>}/>
          <Route path='connect-to-spotify' element={<p/>}/>
          <Route path='connect-to-spotify-complete' element={<p/>}/>
          <Route path='review' element={<p/>}/>
          <Route path='thank-you' element={<p/>}/>
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
