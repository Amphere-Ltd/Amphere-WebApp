import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import './review.css';

/**
 *
 */
class Review extends React.Component {
  /**
   *
   * @param {Review.propTypes} props
   */
  constructor(props) {
    super(props);

    this.state = {
      shouldRedirect: false,
      displayName: '',
      genres: [],
      biography: '',
      linkToInstagram: '',
      linkToSpotify: '',
      linkToAppleMusic: '',
      linkToSoundCloud: '',
      linkToFacebook: '',
      contactPhone: '',
      contactEmail: '',
      proPicFiles: [],
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   *
   */
  componentDidMount() {
    if (this.props.artistSyncer) {
      this.props.artistSyncer.signUpProg = 4;
      this.props.artistSyncer.push();
    }

    if (this.props.epkSyncer) {
      this.setState((prevState) => {
        return {
          ...prevState,
          displayName: this.props.epkSyncer.displayName,
          genres: this.props.epkSyncer.genres,
          biography: this.props.epkSyncer.biography,
          linkToInstagram: this.props.epkSyncer.linkToInstagram,
          linkToSpotify: this.props.epkSyncer.linkToSpotify,
          linkToAppleMusic: this.props.epkSyncer.linkToAppleMusic,
          linkToSoundCloud: this.props.epkSyncer.linkToSoundCloud,
          linkToFacebook: this.props.epkSyncer.linkToFacebook,
          contactPhone: this.props.epkSyncer.contactPhone,
          contactEmail: this.props.epkSyncer.contactEmail,
          proPicFiles: [] /* TODO */,
        };
      });
    } else {
      this.props.onError('Connection with database has been lost.');
    }
  }

  /**
   *
   * @param {Object} prevProps
   * @param {Object} prevState
   * @param {Object} snapshot
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.epkSyncer === prevProps.epkSyncer) return;
    if (this.props.epkSyncer) {
      this.setState((prevState) => {
        return {
          ...prevState,
          displayName: this.props.epkSyncer.displayName,
          genres: this.props.epkSyncer.genres,
          biography: this.props.epkSyncer.biography,
          linkToInstagram: this.props.epkSyncer.linkToInstagram,
          linkToSpotify: this.props.epkSyncer.linkToSpotify,
          linkToAppleMusic: this.props.epkSyncer.linkToAppleMusic,
          linkToSoundCloud: this.props.epkSyncer.linkToSoundCloud,
          linkToFacebook: this.props.epkSyncer.linkToFacebook,
          contactPhone: this.props.epkSyncer.contactPhone,
          contactEmail: this.props.epkSyncer.contactEmail,
          proPicFiles: [] /* TODO */,
        };
      });
    } else {
      this.props.onError('Connection with database has been lost.');
    }
  }

  /**
   *
   * @param {Event} event
   */
  handleFormSubmit(event) {
    event.preventDefault();
    this.setState((prevState) => {
      return {...prevState, shouldRedirect: true};
    });
  }

  /**
   *
   * @return {JSX.Element}
   */
  render() {
    if (this.state.shouldRedirect) {
      return <Navigate replace to={'/sign-up/thank-you'}/>;
    }

    const socialLinksToIcons = {
      linkToInstagram: 'icon-instagram-dark.png',
      linkToSpotify: 'icon-spotify-dark.png',
      linkToAppleMusic: 'icon-apple-music-dark.png',
      linkToSoundCloud: 'icon-soundcloud-dark.png',
      linkToFacebook: 'icon-facebook-dark',
    };
    const socialsConnectedIcons = Object.keys(socialLinksToIcons)
        .filter((key) => {
          return this.state[key] !== '' && this.state[key] !== '\\null';
        })
        .map((key) => {
          const val = socialLinksToIcons[key];
          return <img key={key} src={require(`../../assets/${val}`)}
            alt="Error" className="m-1" width="64" height="64"/>;
        });

    const proPicImages = this.state.proPicFiles.map((file) => {
      return <img key={file.name}
        src={`data:image/jpeg;base64,${file}`}
        alt="Unknown Item" className="m-1 rounded" height="180"/>;
    });

    return (
      <div className={'container'}>
        <div className="my-4 text-center">
          <h1>{this.state.displayName}</h1>
        </div>
        <div className="container text-left text-dark">
          <div className="row g-3">
            <div className="col-xl-6 col-md-12">
              <Link to={'/sign-up/set-up-epk'}>
                <div className="h-65 p-3 bg-light rounded zoomable">
                  <h2>Details</h2>
                  <form>
                    <div className="form-group my-1">
                      <label htmlFor="genres">Genres:</label>
                      <input type="text" readOnly
                        className="form-control-plaintext" id="genres"
                        name="genres" value={this.state.genres.join(', ')}/>
                    </div>
                    <div className="form-group my-1">
                      <label htmlFor="biography">Description:</label>
                      <textarea className="form-control-plaintext
                    amphere-input-textarea" id="biography" name="biography"
                      rows="6" wrap="soft" maxLength="300"
                      value={this.state.biography} readOnly/>
                    </div>
                  </form>
                </div>
              </Link>
              <Link to={'/sign-up/connect-socials'}>
                <div className="h-35 mt-3 p-3 bg-light rounded zoomable">
                  <h2>Socials Connected</h2>
                  <div className="d-flex justify-content-start overflow-auto">
                    {socialsConnectedIcons}
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-xl-6 col-md-12">
              <Link to={'/sign-up/set-up-epk'}>
                <div className="h-45 p-3 bg-light rounded zoomable">
                  <h2>Contact Details</h2>
                  <form>
                    <div className="form-group row">
                      <label htmlFor="contactPhone"
                        className="col-sm-3 col-form-label">
                      Phone:
                      </label>
                      <div className="col-sm-9">
                        <input type="text" readOnly
                          className="form-control-plaintext" id="contactPhone"
                          name="contactPhone" value={this.state.contactPhone}/>
                      </div>
                      <label htmlFor="contactEmail"
                        className="col-sm-3 col-form-label">
                      Mgt. Email:
                      </label>
                      <div className="col-sm-9">
                        <input type="text" readOnly
                          className="form-control-plaintext" id="contactEmail"
                          name="contactEmail" value={this.state.contactEmail}/>
                      </div>
                    </div>
                  </form>
                </div>
              </Link>
              <Link to={'/sign-up/profile-picture'}>
                <div className="h-55 mt-3 p-3 bg-light rounded zoomable">
                  <h2>Photos</h2>
                  <div className="d-flex justify-content-start overflow-auto">
                    {proPicImages}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <form className="my-5" onSubmit={this.handleFormSubmit}>
          <input type="submit" name="action" value="S U B M I T"/>
        </form>
      </div>
    );
  }
}

Review.propTypes = {
  artistSyncer: PropTypes.any,
  epkSyncer: PropTypes.any,
  onError: PropTypes.func,
};

export default Review;
