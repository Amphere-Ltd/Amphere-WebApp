import React from 'react';
import PropTypes from 'prop-types';
import {Navigate} from 'react-router-dom';
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import service from '../../../models/firebase/service';
import artistSyncHandler from '../../../models/firebase/syncers/artist-syncer';

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
   * @param {Object} prevProps
   * @param {Object} prevState
   * @param {Object} snapshot
   */
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.currUser !== null) {
      // Triggered by the sign-up or sign-in event in handleFormSubmit().

      /**
       *
       * @param {String} userUid
       */
      const setSyncersAndRedirect = async (userUid) => {
        if (this.props.currUser === null) return;

        const artistSyncer =
          await artistSyncHandler.getSyncer(this.props.currUser.uid);
        artistSyncer.displayName = this.state.displayName;
        artistSyncer.signUpProg = 1;
        await artistSyncer.push();

        const epkSyncer = await artistSyncer.getEpkSyncer();
        epkSyncer.displayName = this.state.displayName;
        epkSyncer.contactEmail = this.state.mgtEmail;
        await epkSyncer.push();

        this.setState((prevState) => {
          return {...prevState, shouldRedirect: true};
        });
      };

      const currUserUid = this.props.currUser.uid;
      await setSyncersAndRedirect(currUserUid);
    }
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
  async handleFormSubmit(event) {
    event.preventDefault();

    if (this.state.displayName === '' ||
      this.state.mgtEmail === '' ||
      this.state.password === '') {
      this.props.onError('Please fill in your details to continue.');
      return;
    }

    // TODO: Validate regex.

    try {
      await createUserWithEmailAndPassword(
          service.auth,
          this.state.mgtEmail,
          this.state.password,
      );
    } catch (error) {
      if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
        // This is an existing user continuing their sign-up flow.
        try {
          await signInWithEmailAndPassword(
              service.auth,
              this.state.mgtEmail,
              this.state.password,
          );
        } catch (error) {
          // There is something wrong.
          this.props.onError(error.message);
        }
      }
    }
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
              src={require('../../../assets/banner-empty-user-card.png')}
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
  currUser: PropTypes.object,
  onError: PropTypes.func,
};

export default Welcome;
