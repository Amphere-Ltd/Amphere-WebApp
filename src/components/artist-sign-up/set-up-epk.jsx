import React from 'react';
import {Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 *
 */
class SetUpEpk extends React.Component {
  /**
   *
   * @param {SetUpEpk.propTypes} props
   */
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
    };
  }

  /**
   *
   * @param {Event} event
   */
  handleFormChange(event) {
    switch (event.target.name) {
      case 'displayName':
        this.setState((prevState) => {
          return {...prevState, displayName: event.target.value};
        });
        break;
      case 'mgtEmail':
        this.setState((prevState) => {
          return {...prevState, mgtEmail: event.target.value};
        });
        break;
      case 'password':
        this.setState((prevState) => {
          return {...prevState, password: event.target.value};
        });
        break;
      default:
        break;
    }
  }

  /**
   *
   * @param {Event} event
   */
  handleFormSubmit(event) {
    event.preventDefault();
  }

  /**
   *
   * @return {JSX.Element}
   */
  render() {
    if (this.state.shouldRedirect) {
      return <Navigate replace to={'/sign-up/connect-socials'}/>;
    }
  }
}

SetUpEpk.propTypes = {
  getCurrUser: PropTypes.func,
  onError: PropTypes.func,
};

export default SetUpEpk;
