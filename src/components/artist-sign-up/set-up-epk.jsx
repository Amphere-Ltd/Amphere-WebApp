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

    const fs = require('fs');
    const presetGenresFile = fs.readFileSync('~/src/data/preset-music-genres.txt')
      .toString('utf-8');
    const presetGenres = presetGenresFile.split('\n');

    this.state = {
      shouldRedirect: false,
      presetGenres: presetGenres,
      contactPhone: null,
      contactEmail: null,
      genres: null,
      biography: null,
      forFansOf: null,
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
      case 'genres':
        break;
      case 'biography':
        this.setState((prevState) => {
          return {...prevState, biography: event.target.value};
        });
        break;
      case 'forFansOf':
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

  removeGenreFromForm(genre) {
    // See artist_sign_up.py => set_up_epk().
    this.setState((prevState) => {
      return {...prevState, genres: prevState.genres.replace(`${genre}/`, "")};
    })
  }

  addToGenrePanel(genre) {
    const funcRemoveFromForm = `removeGenreFromForm("${genre}");`;
    const funcRemoveFromPage = `document.getElementById("${genre}").remove();`;
    const funcRemoveGenre = `${funcRemoveFromForm}${funcRemoveFromPage}`;
    const removeElemButton =
      `<button type='button' class='btn-close btn-close-white ms-1' aria-label='Close' onclick='${funcRemoveGenre}'></button>`;
    const genreBadge =
      `<span class='badge rounded-pill mx-1 mt-3 ps-3 bg-amphere-red text-light font-weight-normal d-flex align-items-center' id='${genre}'>` +
      genre +
      removeElemButton +
      `</span>`;
    // See artist_sign_up.py => set_up_epk().
    document.getElementById("genres").value += `${genre}/`;
    document.getElementById("genrePanel").innerHTML += genreBadge;
  };

  const removeRelatedArtistFromForm = function (relArt) {
    // See artist_sign_up.py => set_up_epk().
    document.getElementById("forFansOf").value =
      document.getElementById("forFansOf").value.replace(`${relArt}/`, "");
    document.getElementById("forFansOfDummy").disabled = false;
  }

  const addToForFansOfPanel = function (relArt) {
    const funcRemoveFromForm = `removeRelatedArtistFromForm("${relArt}");`;
    const funcRemoveFromPage = `document.getElementById("${relArt}").remove();`;
    const funcRemoveRelArt = `${funcRemoveFromForm}${funcRemoveFromPage}`;
    const removeElemButton =
      `<button type='button' class='btn-close btn-close-white ms-1' aria-label='Close' onclick='${funcRemoveRelArt}'></button>`;
    const relArtBadge =
      `<span class='badge rounded-pill mx-1 mt-3 ps-3 bg-amphere-red text-light font-weight-normal d-flex align-items-center' id='${relArt}'>` +
      relArt +
      removeElemButton +
      `</span>`;
    // See artist_sign_up.py => set_up_epk().
    document.getElementById("forFansOf").value += `${relArt}/`;
    document.getElementById("forFansOfPanel").innerHTML += relArtBadge;
    document.getElementById("forFansOfDummy").disabled =
      (document.getElementById("forFansOf").value.match(/\//g) || []).length === 5;
  };

  const handleForFansOfInput = function (event) {
    addToForFansOfPanel(event.target.value);
    event.target.value = "";
  }

  // Code that runs when page first loads.
  // See artist_sign_up.py => set_up_epk().
  "{{genres}}".split("/").filter(s => s).forEach(genre =>
  addToGenrePanel(genre));
  "{{for_fans_of}}".split("/").filter(s => s).forEach(relArt =>
  addToForFansOfPanel(relArt));

  /**
   *
   * @return {JSX.Element}
   */
  render() {
    if (this.state.shouldRedirect) {
      return <Navigate replace to={'/sign-up/connect-socials'}/>;
    }

    const presetGenreItems = this.state.presetGenres.map((presetGenre) =>
      <li>
        <button className="dropdown-item" type="button" name={presetGenre} onClick={this.handleFormChange}>
          {presetGenre}
        </button>
      </li>
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
            <label htmlFor="contactEmail" className="col-sm-3 col-form-label">Mgt.
              email:</label>
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
                  className="btn btn-secondary dropdown-toggle w-100 amphere-input-dropdown d-flex align-items-center"
                  type="button" id="dropdownMenu" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Select a genre and add it to your EPK…
                </button>
                <ul className="dropdown-menu overflow-auto"
                    aria-labelledby="dropdownMenu" style="max-height: 480px;">
                  {presetGenreItems}
                </ul>
              </div>
              <div className="d-flex justify-content-start align-items-center"
                   id="genrePanel">
                {/* Added dynamically by code. */}
              </div>
              <input type="text" className="form-control d-none" id="genres"
                     name="genres" value="" onChange={this.handleFormChange}/>
            </div>
          </div>
          <div className="form-group row my-3">
            <label htmlFor="biography" className="col-sm-3 col-form-label">Describe
              your act:</label>
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
              <input type="text" className="form-control" id="forFansOfDummy"
                     name="forFansOfDummy"
                     placeholder="Up to 5 artists…" value=""
                     onChange={this.handleFormChange}/>
                <div className="d-flex justify-content-start align-items-center"
                     id="forFansOfPanel">
                  {/* Added dynamically by code. */}
                </div>
                <input type="text" className="form-control d-none"
                       id="forFansOf" name="forFansOf" value=""/>
            </div>
          </div>
            {/* Prevents mobile browsers from submitting the form automatically when the user hits "Enter". */}
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
