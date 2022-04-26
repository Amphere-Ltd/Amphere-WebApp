import React from 'react';
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../common/base.css';
import './profile-picture.css';

class ProfilePicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
    };
  }

  handleFormChange(event) {
  }

  handleFormSubmit(event) {
    this.setState({shouldRedirect: true});
  }

  addImgFileToInputElement(imgFile, elementID) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(imgFile);
    document.getElementById(elementID).files = dataTransfer.files;
  }

  displayUpload(event, elementID) {
    document.getElementById(elementID).src =
      URL.createObjectURL(event.target.files[0]);
  }

  displayForAllSizes(event) {
    const uploadIDs = ['imgForIcon', 'imgFor4By3', 'imgFor1By1'];
    const outputIDs = ['outputForIcon', 'outputFor4By3', 'outputFor1By1'];
    const imgFile = event.target.files[0];
    uploadIDs.forEach((uploadID) =>
      this.addImgFileToInputElement(imgFile, uploadID));
    outputIDs.forEach((outputID) =>
      this.displayUpload(event, outputID));
  }

  displaySpinner() {
    document.getElementById('spinner').style.display = 'flex';
    document.getElementById('submitButton').style.display = 'none';
  }

  render() {
    if (this.state.shouldRedirect) return <Redirect to='/set-up-epk'/>;

    return (
      <div className="container">
        <div className="my-4 text-center">
          <h1>Photos</h1>
        </div>
        <form encType="multipart/form-data">
          <div className="container">
            <div className="row">
              {/* Preview 1 */}
              <div className="col my-3">
                <div className="row-2 d-flex justify-content-center">
                  <p>Icon</p>
                </div>
                <div className="row-8 d-flex justify-content-center">
                  <img id="outputForIcon" alt="Preview your profile picture"
                    src="../../assets/bg-black.jpg"/>
                </div>
                <div className="row h-0">
                  <input type="file" className="d-none" accept="image/*"
                    name="imgForIcon" id="imgForIcon"
                    onChange={this.displayUpload(event, 'outputForIcon')}/>
                </div>
                <div className="row-2 d-flex justify-content-center">
                  <label htmlFor="imgForIcon" style="cursor: pointer;">
                    <img alt="" src="../../assets/icon-pencil.png"
                      className="mx-auto my-3" width="32"/>
                  </label>
                </div>
              </div>
              {/* Preview 2 */}
              <div className="col my-3">
                <div className="row-2 d-flex justify-content-center">
                  <p>4:3</p>
                </div>
                <div className="row-8 d-flex justify-content-center">
                  <img id="outputFor4By3" alt="Preview your profile picture"
                    src="../../assets/bg-black.jpg"/>
                </div>
                <div className="row h-0">
                  <input type="file" className="d-none" accept="image/*"
                    name="imgFor4By3" id="imgFor4By3"
                    onChange={this.displayUpload(event, 'outputFor4By3')}/>
                </div>
                <div className="row-2 d-flex justify-content-center">
                  <label htmlFor="imgFor4By3" style="cursor: pointer;">
                    <img alt="" src="../../assets/icon-pencil.png"
                      className="mx-auto my-3" width="32"/>
                  </label>
                </div>
              </div>
              {/* Preview 3 */}
              <div className="col my-3">
                <div className="row-2 d-flex justify-content-center">
                  <p>Square</p>
                </div>
                <div className="row-8 d-flex justify-content-center">
                  <img id="outputFor1By1" alt="Preview your profile picture"
                    src="../../assets/bg-black.jpg"/>
                </div>
                <div className="row h-0">
                  <input type="file" className="d-none" accept="image/*"
                    name="imgFor1By1" id="imgFor1By1"
                    onChange={this.displayUpload(event, 'outputFor1By1')}/>
                </div>
                <div className="row-2 d-flex justify-content-center">
                  <label htmlFor="imgFor1By1" style="cursor: pointer;">
                    <img alt="" src="../../assets/icon-pencil.png"
                      className="mx-auto my-3" width="32"/>
                  </label>
                </div>
              </div>
            </div>
            {/* Upload button for all three images */}
            <div className="row text-center">
              <label htmlFor="imgForAllSizes" className="amphere-pill-button"
                style="cursor: pointer;">
                U P L O A D
              </label>
              <input type="file" className="d-none" accept="image/*"
                name="imgForAllSizes" id="imgForAllSizes"
                onChange={this.displayForAllSizes(event)}/>
            </div>
            {/* Submit button that redirects to next page */}
            <div className="row my-3" id="submitButton">
              <input type="submit" name="action" value="N E X T"
                onClick="displaySpinner();"/>
            </div>
            <div className="row my-3 justify-content-center align-items-center"
              id="spinner">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="my-1 text-center text-light">
                <small>
                We want every artist to be able to use the highest quality of
                  profile pictures, media and graphics for all sizes. Please
                  wait patiently whilst we upload your media to our servers.
                </small>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ProfilePicture;
