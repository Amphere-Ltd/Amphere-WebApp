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

    const genrePanelItems = this.state.presetGenres.map((presetGenre) =>
      <li>
        <button className="dropdown-item" type="button"
                onClick={addToGenrePanel(presetGenre)}>
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
          <form>
            {/* Prevents implicit submission of the form.
            Effectively disables the "Enter" button. */}
          <button type="submit" className="d-none" disabled hidden></button>
            {/* Start of visible area of form. */}
          <div className="form-group row my-3">
            <label htmlFor="contactPhone"
                   className="col-sm-3 col-form-label">Phone:</label>
            <div className="col-sm-9">
              <input type="tel" className="form-control" id="contactPhone"
                     name="contactPhone"
                     placeholder="Enter your business phone number…"
                     value={this.state.contactPhone}
                     aria-describedby="contactPhoneHelp" required/>
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
                     aria-describedby="contactEmailHelp" required/>
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
                  {genrePanelItems}
                </ul>
              </div>
              <div className="d-flex justify-content-start align-items-center"
                   id="genrePanel">
                {/* See <script> section below. */}
              </div>
              <input type="text" className="form-control d-none" id="genres"
                     name="genres" value=""/>
            </div>
          </div>
          <div className="form-group row my-3">
            <label htmlFor="biography" className="col-sm-3 col-form-label">Describe
              your act:</label>
            <div className="col-sm-9">
          <textarea className="form-control amphere-input-textarea"
                    id="biography" name="biography" rows="8" wrap="soft"
                    placeholder="Up to 300 characters…" maxLength="300"
                    required>{this.state.biography}</textarea>
            </div>
          </div>
          <div className="form-group row my-3">
            <label htmlFor="forFansOf" className="col-sm-3 col-form-label">For
              fans of:</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="forFansOfDummy"
                     name="forFansOfDummy"
                     placeholder="Up to 5 artists…" maxLength="3000" value=""
                     onChange="handleForFansOfInput(event);"/>
                <div className="d-flex justify-content-start align-items-center"
                     id="forFansOfPanel">
                  {/* See <script> section below. */}
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

        <script>
          const removeGenreFromForm = function (genre) {
          // See artist_sign_up.py => set_up_epk().
          document.getElementById("genres").value = document.getElementById("genres").value.replace(`${genre}/`, "");
        }

          const addToGenrePanel = function (genre) {
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
        </script>
      </div>
    );
  }
}

SetUpEpk.propTypes = {
  getCurrUser: PropTypes.func,
  onError: PropTypes.func,
};

export default SetUpEpk;
