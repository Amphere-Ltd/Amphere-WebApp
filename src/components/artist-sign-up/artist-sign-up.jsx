import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useRouteMatch,
} from 'react-router-dom';
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
  constructor(props) {
    super(props);
    this.state = {
      currUser: null,
      error: null,
    };
  }

  componentDidMount() {
    onAuthStateChanged(service.auth, (user) => {
      if (user) {
        this.setState((prevState) => {
          return {...prevState, currUser: user};
        });
      } else {
        this.setState((prevState) => {
          return {...prevState, currUser: null};
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

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
        <BrowserRouter>
          <Routes>
            <Route path='/sign-up' element={<Welcome/>}>
              <Route path='/profile-picture' element={<ProfilePicture/>}/>
              <Route path='/set-up-epk' element={<p/>}/>
              <Route path='/connect-socials' element={<p/>}/>
              <Route path='/connect-to-spotify' element={<p/>}/>
              <Route path='/connect-to-spotify-complete' element={<p/>}/>
              <Route path='/review' element={<p/>}/>
              <Route path='/thank-you' element={<p/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      );
    }

    const match = useRouteMatch();
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

export default ArtistSignUp;
