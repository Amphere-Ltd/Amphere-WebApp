import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
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
        <Switch>
          <Route path={`${match.path}`}>
            <Welcome onError={this.onError}/>
          </Route>
          <Route path={`${match.path}/profile-picture`}>
            <ProfilePicture/>
          </Route>
          <Route path={`${match.path}/set-up-epk`}>
            <p/>
          </Route>
          <Route path={`${match.path}/connect-socials`}>
            <p/>
          </Route>
          <Route path={`${match.path}/connect-to-spotify`}>
            <p/>
          </Route>
          <Route path={`${match.path}/connect-to-spotify-complete`}>
            <p/>
          </Route>
          <Route path={`${match.path}/review`}>
            <p/>
          </Route>
          <Route path={`${match.path}/thank-you`}>
            <p/>
          </Route>
        </Switch>
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
