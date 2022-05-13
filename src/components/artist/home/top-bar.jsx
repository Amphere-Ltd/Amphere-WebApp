import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {TopBar.propTypes} props
 * @return {JSX.Element}
 * @constructor
 */
function TopBar(props) {
  return (
    <div className="row mb-3">
      <div className={'col d-flex justify-content-start'}>
        <img src={require('../../../assets/logo-text.png')} alt="Amphere"
          width="192" height="56"/>
      </div>
      <div className={'col d-flex justify-content-start'}>
        <div className="input-group">
          <div className="form-outline">
            <input type="search" id="form1" className="form-control"/>
            <label className="form-label" htmlFor="form1">Search</label>
          </div>
          <button type="button" className="btn btn-primary">
            <i className="fas fa-search"></i>
          </button>
        </div>
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

TopBar.propTypes = {};

export default TopBar;
