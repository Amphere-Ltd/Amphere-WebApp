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
      <div className={'col d-flex justify-content-center align-items-center'}>
        <div className="input-group">
          <div className="form-outline">
            <input type="search" id="search" className="form-control"/>
            <label className="form-label" htmlFor="search">Search</label>
          </div>
          <button type="button" className="btn btn-primary">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div className={`col d-flex justify-content-end align-items-center`}>
        <div className="text-end">{props.displayName}</div>
      </div>
    </div>
  );
}

TopBar.propTypes = {
  displayName: PropTypes.string,
};

export default TopBar;
