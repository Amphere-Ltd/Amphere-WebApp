import React from 'react';
import {Redirect} from 'react-router-dom';

/**
 *
 */
class Welcome extends React.Component {
  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
    };
  }

  /**
   *
   * @param event
   */
  handleFormChange(event) {
    switch (event.target.name) {
      case 'displayName':
        break;
      case 'mgtEmail':
        break;
      case 'password':
        break;
      default:
        break;
    }
  }

  /**
   *
   * @param event
   */
  handleFormSubmit(event) {
    this.setState({shouldRedirect: true});
  }

  /**
   *
   * @return {JSX.Element}
   */
  render() {
    if (this.state.shouldRedirect) return <Redirect to='/profile-picture'/>;

    return (
      <div className="container">
        <div className="my-5 text-center">
          <h1><b>Thank you</b></h1>
          <h1 className="font-weight-light">for booking your night at NHAC</h1>
        </div>
        <div className="container-narrow mx-auto">
          <div className="my-5 text-center">
            <img className="img-fluid"
              src="../../assets/banner-empty-user-card.png"
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
                  name="displayName"
                  placeholder="Enter your artist name or band name…"
                  onChange={this.handleFormChange}/>
              </div>
            </div>
            <div className="form-group row my-3">
              <label htmlFor="mgtEmail"
                className="col-sm-2 col-form-label">Email:</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" id="mgtEmail"
                  name="mgtEmail"
                  placeholder="Enter your management email…"
                  onChange={this.handleFormChange}/>
              </div>
            </div>
            <div className="form-group row my-3">
              <label htmlFor="password"
                className="col-sm-2 col-form-label">Password:</label>
              <div className="col-sm-10">
                <input type="password" className="form-control" id="password"
                  name="password" placeholder="Enter your password…"
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

export default Welcome;
