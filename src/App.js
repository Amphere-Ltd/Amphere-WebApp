import React from 'react';
import {
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import {User} from 'firebase/auth';
import ArtistSignUp from './components/artist-sign-up/artist-sign-up';

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
   * @return {null|User}
   */
  getCurrUser = () => {
    return this.state.currUser;
  };

  /**
   *
   * @param {null|User} user
   */
  setCurrUser = (user) => {
    this.setState((prevState) => {
      return {...prevState, currUser: user};
    });
  };

  /**
   *
   * @return {JSX.Element}
   */
  render() {
    return (
      <Routes>
        <Route path={'*'} element={<Navigate replace to={'/sign-up'}/>}/>
        <Route path={'sign-up/*'} element={
          <ArtistSignUp
            getCurrUser={this.getCurrUser} setCurrUser={this.setCurrUser}/>
        }/>
      </Routes>
    );
  }
}

App.propTypes = {};

export default App;
