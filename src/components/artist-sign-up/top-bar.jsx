import React from 'react';

/**
 *
 */
class TopBar extends React.Component {
  /**
   *
   * @return {JSX.Element}
   */
  render() {
    return (
      <div className="row mb-3">
        <div className="col mw-45 d-flex justify-content-start">
          <img src={require('../../assets/logo-text.png')} alt="Amphere"
            width="192" height="56"/>
        </div>
        <div className="col mw-45 ps-0 pe-4 py-2">
          {/* Hide artist's name and progress bar if we are on root page. */}
          <div className="d-flex justify-content-end align-items center">
            <div className="text-end">Unknown Artist</div>
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <div className="progress" style={{width: 175, height: 5}}>
              <div className="progress-bar bg-amphere-red w-50"
                role="progressbar" aria-valuenow="50"
                aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;
