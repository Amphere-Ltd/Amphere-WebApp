import React from 'react';
import PropTypes from 'prop-types';
import {Navigate} from 'react-router-dom';
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import artistSyncHandler from '../../models/firebase/syncers/artist-syncer';
import service from '../../models/firebase/service';

/**
 *
 */
class Welcome extends React.Component {
  /**
   *
   * @param {Welcome.propTypes} props
   */
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
      displayName: '',
      mgtEmail: '',
      password: '',
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

    if (this.state.displayName === '' ||
      this.state.mgtEmail === '' ||
      this.state.password === '') {
      this.props.onError('Please fill in your details to continue.');
      return;
    }

    // TODO: Validate regex.

    createUserWithEmailAndPassword(
        service.auth,
        this.state.mgtEmail,
        this.state.password,
    ).then((userCredential) => {
      const user = userCredential.user;

      artistSyncHandler.getSyncer(user.uid).then((artistSyncer) => {
        artistSyncer.displayName = this.state.displayName;
        artistSyncer.push();

        artistSyncer.getEpkSyncer().then((epkSyncer) => {
          epkSyncer.displayName = this.state.displayName;
          epkSyncer.mgtEmail = this.state.mgtEmail;
          epkSyncer.push();
        });
      });

      this.setState((prevState) => {
        return {...prevState, shouldRedirect: true};
      });
    }).catch((error) => {
      if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
        signInWithEmailAndPassword(
            service.auth,
            this.state.mgtEmail,
            this.state.password,
        ).then((userCredential) => {
          this.setState((prevState) => {
            return {...prevState, shouldRedirect: true};
          });
        }).catch((error) => {
          this.props.onError(error.message);
        });
      }
    });
  }

  /**
   *
   * @return {JSX.Element}
   */
  render() {
    // TODO: Redirect.

    if (this.state.shouldRedirect) {
      return <Navigate replace to={'/sign-up/profile-picture'}/>;
    }

    return (
      <div className="container">
        <div className="my-5 text-center">
          <h1><b>Thank you</b></h1>
          <h1 className="font-weight-light">for booking your night at NHAC</h1>
        </div>
        <div className="container-narrow mx-auto">
          <div className="my-5 text-center">
            <img className="img-fluid"
              src={require('../../assets/banner-empty-user-card.png')}
              alt="Amphere" width="412" height="132"/>
          </div>
          <div className="my-5 text-center">
            <p>We just need some information from you, we are working with
              Amphere to make sure you never have to send anything over ever
              again.</p>
          </div>
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group row my-3">
              <label htmlFor="displayName" className="col-sm-2 col-form-label">
                Act name:
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="displayName"
                  name="displayName" value={this.state.displayName}
                  placeholder="Enter your artist name or band name…"
                  onChange={this.handleFormChange}/>
              </div>
            </div>
            <div className="form-group row my-3">
              <label htmlFor="mgtEmail"
                className="col-sm-2 col-form-label">Email:</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" id="mgtEmail"
                  name="mgtEmail" value={this.state.mgtEmail}
                  placeholder="Enter your management email…"
                  onChange={this.handleFormChange}/>
              </div>
            </div>
            <div className="form-group row my-3">
              <label htmlFor="password"
                className="col-sm-2 col-form-label">Password:</label>
              <div className="col-sm-10">
                <input type="password" className="form-control" id="password"
                  name="password" value={this.state.password}
                  placeholder="Enter your password…"
                  onChange={this.handleFormChange}/>
              </div>
            </div>
            <input type="submit" className="my-5" value="S T A R T   N O W"/>
          </form>
        </div>
      </div>
    );
  }
}

Welcome.propTypes = {
  onError: PropTypes.func,
};

export default Welcome;
