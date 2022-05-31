import React from 'react';
import {Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {ref, uploadBytes} from 'firebase/storage';
import service from '../../../models/firebase/service';
import './profile-picture.css';
import artistSyncHandler from '../../../models/firebase/syncers/artist-syncer';

/**
 *
 */
class ProfilePicture extends React.Component {
  /**
   *
   * @param {ProfilePicture.propTypes} props
   */
  constructor(props) {
    super(props);
    this.state = {
      unauthorised: false,
      shouldRedirect: false,
      imgForIcon: null, // See handleFormSubmit().
      imgFor4By3: null, // See handleFormSubmit().
      imgFor1By1: null, // See handleFormSubmit().
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   *
   */
  componentDidMount() {
    if (this.props.currUser === null) {
      this.setState((prevState) => {
        return {...prevState, unauthorised: true};
      });
    }
  }

  /**
   *
   * @param {Event} event
   */
  handleFormChange(event) {
    switch (event.target.name) {
      case 'imgForIcon':
        this.setState((prevState) => {
          return {...prevState, imgForIcon: event.target.files[0]};
        });
        this.displayUpload(event, 'outputForIcon');
        break;
      case 'imgFor4By3':
        this.setState((prevState) => {
          return {...prevState, imgFor4By3: event.target.files[0]};
        });
        this.displayUpload(event, 'outputFor4By3');
        break;
      case 'imgFor1By1':
        this.setState((prevState) => {
          return {...prevState, imgFor1By1: event.target.files[0]};
        });
        this.displayUpload(event, 'outputFor1By1');
        break;
      case 'imgForAllSizes':
        this.setState((prevState) => {
          return {
            ...prevState,
            imgForIcon: event.target.files[0],
            imgFor4By3: event.target.files[0],
            imgFor1By1: event.target.files[0],
          };
        });
        this.displayForAllSizes(event);
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

    if (!this.state.imgForIcon ||
      !this.state.imgFor4By3 ||
      !this.state.imgFor4By3) {
      this.props.onError('You cannot leave your EPK media empty.');
      return;
    }

    this.displaySpinner(true);

    const sizeIDs = ['imgForIcon', 'imgFor4By3', 'imgFor1By1'];
    const proPicFilenames = [];

    const artistSyncer =
      await artistSyncHandler.getSyncer(this.props.currUser.uid);
    const epkSyncer = await artistSyncer.getEpkSyncer();

    for (const sizeID of sizeIDs) {
      const picture = this.state[sizeID];
      const fileExt = picture.name.split('.').pop();
      const newFileName = `ProfilePicture-${sizeID.substring(6)}.${fileExt}`;
      proPicFilenames.push(newFileName);

      // TODO: Reusable code.
      const artistUid = artistSyncer.firestoreDocName;
      const uploadPath = `epkMedia/${artistUid}/${newFileName}`;
      const storageRef = ref(service.storage, uploadPath);
      try {
        await uploadBytes(storageRef, picture);
      } catch (error) {
        this.props.onError(error.message);
      }
    }

    artistSyncer.signUpProg = 2;
    await artistSyncer.push();

    epkSyncer.proPicFilenames = proPicFilenames;
    await epkSyncer.push();

    this.setState((prevState) => {
      return {...prevState, shouldRedirect: true};
    });
  }

  /**
   *
   * @param {File} imgFile
   * @param {String} elementID
   */
  addImgFileToInputElement(imgFile, elementID) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(imgFile);
    document.getElementById(elementID).files = dataTransfer.files;
  }

  /**
   *
   * @param {Event} event
   * @param {String} elementID
   */
  displayUpload(event, elementID) {
    document.getElementById(elementID).src =
      URL.createObjectURL(event.target.files[0]);
  }

  /**
   *
   * @param {Event} event
   */
  displayForAllSizes(event) {
    const uploadIDs = ['imgForIcon', 'imgFor4By3', 'imgFor1By1'];
    const outputIDs = ['outputForIcon', 'outputFor4By3', 'outputFor1By1'];
    const imgFile = event.target.files[0];
    uploadIDs.forEach((uploadID) =>
      this.addImgFileToInputElement(imgFile, uploadID));
    outputIDs.forEach((outputID) =>
      this.displayUpload(event, outputID));
  }

  /**
   *
   * @param {boolean} shouldDisplay
   */
  displaySpinner(shouldDisplay) {
    document.getElementById('spinner').style.display =
      shouldDisplay ? 'flex' : 'none';
    document.getElementById('uploadButton').style.display =
      shouldDisplay ? 'none' : 'block';
    document.getElementById('submitButton').style.display =
      shouldDisplay ? 'none' : 'block';
  }

  /**
   *
   * @return {JSX.Element}
   */
  render() {
    if (this.state.unauthorised) {
      return <Navigate replace to={'/sign-up/artists'}/>;
    }

    if (this.state.shouldRedirect) {
      return <Navigate replace to={'/sign-up/artists/set-up-epk'}/>;
    }

    return (
      <div className="container">
        <div className="my-4 text-center">
          <h1>Photos</h1>
        </div>
        <form encType="multipart/form-data" onSubmit={this.handleFormSubmit}>
          <div className="container">
            <div className="row">
              {/* Preview 1 */}
              <div className="col my-3">
                <div className="row-2 d-flex justify-content-center">
                  <p>Icon</p>
                </div>
                <div className="row-8 d-flex justify-content-center">
                  <img id="outputForIcon" alt="Preview your profile picture"
                    src={require('../../../assets/bg-black.jpg')}/>
                </div>
                <div className="row h-0">
                  <input type="file" className="d-none" accept="image/*"
                    name="imgForIcon" id="imgForIcon"
                    onChange={this.handleFormChange}/>
                </div>
                <div className="row-2 d-flex justify-content-center">
                  <label htmlFor="imgForIcon" style={{cursor: 'pointer'}}>
                    <img alt="" src={require('../../../assets/icon-pencil.png')}
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
                    src={require('../../../assets/bg-black.jpg')}/>
                </div>
                <div className="row h-0">
                  <input type="file" className="d-none" accept="image/*"
                    name="imgFor4By3" id="imgFor4By3"
                    onChange={this.handleFormChange}/>
                </div>
                <div className="row-2 d-flex justify-content-center">
                  <label htmlFor="imgFor4By3" style={{cursor: 'pointer'}}>
                    <img alt="" src={require('../../../assets/icon-pencil.png')}
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
                    src={require('../../../assets/bg-black.jpg')}/>
                </div>
                <div className="row h-0">
                  <input type="file" className="d-none" accept="image/*"
                    name="imgFor1By1" id="imgFor1By1"
                    onChange={this.handleFormChange}/>
                </div>
                <div className="row-2 d-flex justify-content-center">
                  <label htmlFor="imgFor1By1" style={{cursor: 'pointer'}}>
                    <img alt="" src={require('../../../assets/icon-pencil.png')}
                      className="mx-auto my-3" width="32"/>
                  </label>
                </div>
              </div>
            </div>
            {/* Upload button for all three images */}
            <div className="row text-center" id={'uploadButton'}>
              <label htmlFor="imgForAllSizes" className="amphere-pill-button"
                style={{cursor: 'pointer'}}>
                U P L O A D
              </label>
              <input type="file" className="d-none" accept="image/*"
                name="imgForAllSizes" id="imgForAllSizes"
                onChange={this.handleFormChange}/>
            </div>
            {/* Submit button that redirects to next page */}
            <div className="row my-3" id="submitButton">
              <input type="submit" name="action" value="N E X T"/>
            </div>
            <div className="row my-3 justify-content-center align-items-center"
              id="spinner">
              <div className="spinner-grow text-light" role="status">
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

ProfilePicture.propTypes = {
  currUser: PropTypes.object,
  onError: PropTypes.func,
};

export default ProfilePicture;
