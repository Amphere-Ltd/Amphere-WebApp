import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';
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
   * @return {JSX.Element}
   */
  render() {
    const match = useRouteMatch();
    return (
      <div className="container">
        <TopBar/>
        <Switch>
          <Route path={`${match.path}`}>
            <Welcome/>
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
        <BotBar/>
      </div>
    );
  }
}

export default ArtistSignUp;
