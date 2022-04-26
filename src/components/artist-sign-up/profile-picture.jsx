import React from 'react';
import {Redirect} from 'react-router-dom';

class ProfilePicture extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="my-4 text-center">
          <h1>Photos</h1>
        </div>
        <form encType="multipart/form-data" onload="hideSpinner();">
        <div class="container">
          <div class="row">
            <!-- Preview 1 -->
            <div class="col my-3">
              <div class="row-2 d-flex justify-content-center">
                <p>Icon</p>
              </div>
              <div class="row-8 d-flex justify-content-center">
                <img id="outputForIcon" alt="Preview your profile picture" src="../../static/content/bg-black.jpg"/>
              </div>
              <div class="row h-0">
                <input type="file" class="d-none" accept="image/*" name="imgForIcon" id="imgForIcon"
                       onchange="displayUpload(event, 'outputForIcon');">
              </div>
              <div class="row-2 d-flex justify-content-center">
                <label for="imgForIcon" style="cursor: pointer;">
                  <img alt="" src="../../static/content/icon-pencil.png" class="mx-auto my-3" width="32">
                </label>
              </div>
            </div>
            <!-- Preview 2 -->
            <div class="col my-3">
              <div class="row-2 d-flex justify-content-center">
                <p>4:3</p>
              </div>
              <div class="row-8 d-flex justify-content-center">
                <img id="outputFor4By3" alt="Preview your profile picture" src="../../static/content/bg-black.jpg"/>
              </div>
              <div class="row h-0">
                <input type="file" class="d-none" accept="image/*" name="imgFor4By3" id="imgFor4By3"
                       onchange="displayUpload(event, 'outputFor4By3');">
              </div>
              <div class="row-2 d-flex justify-content-center">
                <label for="imgFor4By3" style="cursor: pointer;">
                  <img alt="" src="../../static/content/icon-pencil.png" class="mx-auto my-3" width="32">
                </label>
              </div>
            </div>
            <!-- Preview 3 -->
            <div class="col my-3">
              <div class="row-2 d-flex justify-content-center">
                <p>Square</p>
              </div>
              <div class="row-8 d-flex justify-content-center">
                <img id="outputFor1By1" alt="Preview your profile picture" src="../../static/content/bg-black.jpg"/>
              </div>
              <div class="row h-0">
                <input type="file" class="d-none" accept="image/*" name="imgFor1By1" id="imgFor1By1"
                       onchange="displayUpload(event, 'outputFor1By1');">
              </div>
              <div class="row-2 d-flex justify-content-center">
                <label for="imgFor1By1" style="cursor: pointer;">
                  <img alt="" src="../../static/content/icon-pencil.png" class="mx-auto my-3" width="32">
                </label>
              </div>
            </div>
          </div>
          <!-- Upload button for all three images -->
          <div class="row text-center">
            <label for="imgForAllSizes" class="amphere-pill-button" style="cursor: pointer;">U P L O A D</label>
            <input type="file" class="d-none" accept="image/*" name="imgForAllSizes" id="imgForAllSizes"
                   onchange="displayForAllSizes(event);">
          </div>
          <!-- Submit button that redirects to next page -->
          <div class="row my-3" id="submitButton">
            <input type="submit" name="action" value="N E X T" onclick="displaySpinner();">
          </div>
          <div class="row my-3 justify-content-center align-items-center" id="spinner">
            <div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="my-1 text-center text-light">
              <small>
                We want every artist to be able to use the highest quality of profile pictures, media and graphics for all sizes.
                Please wait patiently whilst we upload your media to our servers.
              </small>
            </div>
          </div>
        </div>
      </form>

    <script>
      const addImgFileToInputElement = function (imgFile, elementID) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(imgFile);
      document.getElementById(elementID).files = dataTransfer.files;
    };
      const displayUpload = function (event, elementID) {
      document.getElementById(elementID).src = URL.createObjectURL(event.target.files[0]);
    };
      const displayForAllSizes = function (event) {
      const uploadIDs = ["imgForIcon", "imgFor4By3", "imgFor1By1"];
      const outputIDs = ["outputForIcon", "outputFor4By3", "outputFor1By1"];
      const imgFile = event.target.files[0];
      uploadIDs.forEach(uploadID => addImgFileToInputElement(imgFile, uploadID));
      outputIDs.forEach(outputID => displayUpload(event, outputID));
    };
      const displaySpinner = function () {
      document.getElementById("spinner").style.display = "flex";
      document.getElementById("submitButton").style.display = "none";
    };
    </script>
      </div>
    );
  }
}
