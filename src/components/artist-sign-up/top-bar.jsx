import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 */
class TopBar extends React.Component {
  /**
   *
   * @param {TopBar.propTypes} props
   */
  constructor(props) {
    super(props);
  }

  /**
   *
   * @return {JSX.Element}
   */
  render() {
    const prog = (this.props.signUpCurrProg / this.props.signUpCompleteProg);
    const progPercentage = Math.floor(prog * 100);

    const shouldShowProg = progPercentage !== 0;
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
            <div className="text-end">{this.props.displayName}</div>
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <div className="progress" style={{width: 175, height: 5}}>
              <div className={`progress-bar bg-amphere-red w-${progPercentage}`}
                role="progressbar" aria-valuenow={progPercentage}
                aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TopBar.propTypes = {
  displayName: PropTypes.string,
  signUpCurrProg: PropTypes.number,
  signUpCompleteProg: PropTypes.number,
};

export default TopBar;
