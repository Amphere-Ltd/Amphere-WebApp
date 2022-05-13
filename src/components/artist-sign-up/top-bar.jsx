import React from 'react';
import PropTypes from 'prop-types';
import artistSyncHandler from '../../models/firebase/syncers/artist-syncer';

/**
 *
 */
class TopBar extends React.Component {
  timerID = undefined;

  /**
   *
   * @param {TopBar.propTypes} props
   */
  constructor(props) {
    super(props);
    this.state = {
      displayName: 'Unknown Artist',
      signUpCurrProg: 0,
    };
  }

  /**
   *
   */
  async componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 500);
  }

  /**
   *
   * @param {Object} prevProps
   * @param {Object} prevState
   * @param {Object} snapshot
   */
  async componentDidUpdate(prevProps, prevState, snapshot) {
  }

  /**
   *
   */
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  /**
   *
   * @return {Promise<void>}
   */
  async tick() {
    if (this.props.currUser) {
      const artistSyncer =
        await artistSyncHandler.getSyncer(this.props.currUser.uid);
      this.setState({
        displayName: artistSyncer.displayName,
        signUpCurrProg: artistSyncer.signUpProg,
      });
    }
  }

  /**
   *
   * @return {JSX.Element}
   */
  render() {
    const prog = (this.state.signUpCurrProg / this.props.signUpStageCount);
    const progFullWidth = 175;
    const progFillWidth = Math.floor(progFullWidth * prog);

    const shouldShowProg = prog !== 0;
    // Hide artist's name and progress bar if we are on root page.
    const progClass = shouldShowProg ? 'mw-45 ps-0 pe-4 py-2' : 'd-none';

    return (
      <div className="row mb-3">
        <div className="col mw-45 d-flex justify-content-start">
          <img src={require('../../assets/logo-text.png')} alt="Amphere"
            width="192" height="56"/>
        </div>
        <div className={`col ${progClass}`}>
          <div className="d-flex justify-content-end align-items center">
            <div className="text-end">{this.state.displayName}</div>
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <div className="progress" style={{width: progFullWidth, height: 5}}>
              <div
                className={`progress-bar progress-bar-animated bg-amphere-red`}
                style={{width: progFillWidth}}
                role="progressbar" aria-valuenow={Math.ceil(prog * 100)}
                aria-valuemin="0" aria-valuemax="100"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TopBar.propTypes = {
  currUser: PropTypes.object,
  signUpStageCount: PropTypes.number,
};

export default TopBar;
