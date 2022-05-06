import React from 'react';
import {Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import artistSyncHandler from '../../models/firebase/syncers/artist-syncer';

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

    const presetGenres = [
      'Alternative Rock',
      'Ambient',
      'Audiobooks',
      'Blues',
      'Business',
      'Classical',
      'Comedy',
      'Country',
      'Dance',
      'Dancehall',
      'Deep House',
      'Disco',
      'Drum and Bass',
      'Dubstep',
      'EDM',
      'Electronic',
      'Entertainment',
      'Hip Hop',
      'House',
      'Indie',
      'Jazz',
      'Latin',
      'Learning',
      'Metal',
      'Piano',
      'Pop',
      'Politics',
      'Rap',
      'RnB',
      'Reggae',
      'Reggaeton',
      'Religion',
      'Rock',
      'Science',
      'Singer-Songwriter',
      'Soul',
      'Soundtrack',
      'Sports',
      'Storytelling',
      'Techno',
      'Technology',
      'Trance',
      'Trap',
      'Trending Audio',
      'Trending Music',
      'Trip Hop',
      'World',
    ];

    this.state = {
      shouldRedirect: false,
      presetGenres: presetGenres,
      contactPhone: '',
      contactEmail: '',
      genres: [],
      biography: '',
      forFansOf: [],
      forFansOfBuffer: '',
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.removeGenreFromForm = this.removeGenreFromForm.bind(this);
    this.removeRelatedArtistFromForm =
      this.removeRelatedArtistFromForm.bind(this);
  }

  /**
   *
   * @param {Event} event
   */
  handleFormChange(event) {
    switch (event.target.name) {
      case 'contactPhone':
        this.setState((prevState) => {
          return {...prevState, contactPhone: event.target.value};
        });
        break;
      case 'contactEmail':
        this.setState((prevState) => {
          return {...prevState, contactEmail: event.target.value};
        });
        break;
      case 'biography':
        this.setState((prevState) => {
          return {...prevState, biography: event.target.value};
        });
        break;
      case 'forFansOf':
        const input = event.target.value;
        if (input.includes(',')) {
          const artist = input.replace(',', '');
          this.setState((prevState) => {
            if (prevState.forFansOf.includes(artist) ||
              prevState.forFansOf.length >= 5) {
              return {
                ...prevState,
                forFansOfBuffer: '',
              };
            } else {
              return {
                ...prevState,
                forFansOf: prevState.forFansOf.concat(artist),
                forFansOfBuffer: '',
              };
            }
          });
        } else {
          this.setState((prevState) => {
            return {...prevState, forFansOfBuffer: input};
          });
        }
        break;
      default:
        // From the preset genres dropdown menu.
        const genre = event.target.name;
        this.setState((prevState) => {
          return {...prevState, genres: prevState.genres.concat(genre)};
        });
        break;
    }
  }

  /**
   *
   * @param {Event} event
   */
  handleFormSubmit(event) {
    event.preventDefault();

    // TODO: Validate input data.
    const userUid = this.props.getCurrUser().uid;
    artistSyncHandler.getSyncer(userUid).then((artistSyncer) => {
      artistSyncer.getEpkSyncer().then((epkSyncer) => {
        epkSyncer.contactPhone = this.state.contactPhone;
        epkSyncer.contactEmail = this.state.contactEmail;
        epkSyncer.genres = this.state.genres;
        epkSyncer.biography = this.state.biography;
        epkSyncer.forFansOf = this.state.forFansOf;
        epkSyncer.push();
      });
    });

    this.setState((prevState) => {
      return {...prevState, shouldRedirect: true};
    });
  }

  /**
   *
   * @param {Event} event
   */
  removeGenreFromForm(event) {
    const genre = event.target.name;
    this.setState((prevState) => {
      return {
        ...prevState,
        genres: prevState.genres.filter((g) => g !== genre),
      };
    });
  }

  /**
   *
   * @param {Event} event
   */
  removeRelatedArtistFromForm(event) {
    const relatedArtist = event.target.name;
    this.setState((prevState) => {
      return {
        ...prevState,
        forFansOf: prevState.forFansOf.filter((r) => r !== relatedArtist),
      };
    });
  }

  /**
   *
   * @return {JSX.Element}
   */
  render() {
    if (this.state.shouldRedirect) {
      return <Navigate replace to={'/sign-up/connect-socials'}/>;
    }

    const presetGenreItems = this.state.presetGenres.map((presetGenre) =>
      <li key={presetGenre}>
        <button className="dropdown-item" type="button" name={presetGenre}
          onClick={this.handleFormChange}>
          {presetGenre}
        </button>
      </li>,
    );

    const genrePanelItems = this.state.genres.map((genre) =>
      <span key={genre} className='badge rounded-pill mx-1 mt-3 ps-3
      bg-amphere-red text-light font-weight-normal d-flex align-items-center'>
        {genre}
        <button type='button' className='btn-close btn-close-white ms-1'
          aria-label='Close' name={genre} onClick={this.removeGenreFromForm}/>
      </span>,
    );

    const forFansOfPanelItems = this.state.forFansOf.map((relatedArtist) =>
      <span key={relatedArtist} className='badge rounded-pill mx-1 mt-3 ps-3
      bg-amphere-red text-light font-weight-normal d-flex align-items-center'>
        {relatedArtist}
        <button type='button' className='btn-close btn-close-white ms-1'
          aria-label='Close' name={relatedArtist}
          onClick={this.removeRelatedArtistFromForm}/>
      </span>,
    );

    return (
      <div className={'container'}>
        <div className="my-4 text-center">
          <h1>Tell us about your act</h1>
        </div>
        <div className="container-narrow mx-auto">
          <form onSubmit={this.handleFormSubmit}>
            {/* Prevents implicit submission of the form.
            Effectively disables the "Enter" button. */}
            <button type="submit" className="d-none" disabled hidden/>
            {/* Start of visible area of form. */}
            <div className="form-group row my-3">
              <label htmlFor="contactPhone"
                className="col-sm-3 col-form-label">Phone:</label>
              <div className="col-sm-9">
                <input type="tel" className="form-control" id="contactPhone"
                  name="contactPhone"
                  placeholder="Enter your business phone number…"
                  value={this.state.contactPhone}
                  aria-describedby="contactPhoneHelp"
                  onChange={this.handleFormChange} required/>
                <span id="contactPhoneHelp" className="form-text">
            Must be a UK phone number starting with the number 0.
                </span>
              </div>
            </div>
            <div className="form-group row my-3">
              <label htmlFor="contactEmail" className="col-sm-3 col-form-label">
                Mgt. email:
              </label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="contactEmail"
                  name="contactEmail"
                  placeholder="Enter your management email…"
                  value={this.state.contactEmail}
                  aria-describedby="contactEmailHelp"
                  onChange={this.handleFormChange} required/>
                <span id="contactEmailHelp" className="form-text">
            This can be different from the email you used to sign in.
                </span>
              </div>
            </div>
            <div className="form-group row my-3">
              <label htmlFor="genres"
                className="col-sm-3 col-form-label">Genre(s):</label>
              <div className="col-sm-9">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle w-100
                    amphere-input-dropdown d-flex align-items-center"
                    type="button" id="dropdownMenu" data-bs-toggle="dropdown"
                    aria-expanded="false">
                  Select a genre and add it to your EPK…
                  </button>
                  <ul className="dropdown-menu overflow-auto"
                    aria-labelledby="dropdownMenu" style={{maxHeight: 480}}>
                    {presetGenreItems}
                  </ul>
                </div>
                <div className="d-flex justify-content-start align-items-center"
                  id="genrePanel">
                  {genrePanelItems}
                </div>
                <input type="text" className="form-control d-none" id="genres"
                  name="genres" value="" onChange={this.handleFormChange}/>
              </div>
            </div>
            <div className="form-group row my-3">
              <label htmlFor="biography" className="col-sm-3 col-form-label">
              Describe your act:
              </label>
              <div className="col-sm-9">
                <textarea className="form-control amphere-input-textarea"
                  id="biography" name="biography" rows="8" wrap="soft"
                  placeholder="Up to 300 characters…" maxLength="300"
                  onChange={this.handleFormChange} required>
                  {this.state.biography}
                </textarea>
              </div>
            </div>
            <div className="form-group row my-3">
              <label htmlFor="forFansOf" className="col-sm-3 col-form-label">For
              fans of:</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="forFansOf"
                  name="forFansOf"
                  placeholder="Up to 5 artists, separated with commas…"
                  value={this.state.forFansOfBuffer}
                  onChange={this.handleFormChange}/>
                <div className="d-flex justify-content-start align-items-center"
                  id="forFansOfPanel">
                  {forFansOfPanelItems}
                </div>
              </div>
            </div>
            {/* Prevents mobile browsers from submitting the form automatically
            when the user hits "Enter". */}
            <input type="text" className="form-control d-none"/>
            <div className="row my-5">
              <input type="submit" name="action" value="N E X T"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SetUpEpk.propTypes = {
  getCurrUser: PropTypes.func,
  onError: PropTypes.func,
};

export default SetUpEpk;
