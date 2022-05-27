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
    <div className={'container-fluid h-100 mb-3'}>
      <div className={'row'}>
        <div className={'col d-flex justify-content-start'}>
          <img src={require('../../../assets/logo-text.png')} alt="Amphere"
            width="192" height="56"/>
        </div>
        <div className={'col d-flex justify-content-center align-items-center'}>
          <div className="form-outline">
            <input type="search" className="form-control"
              placeholder="Search..." aria-label="Search"/>
          </div>
        </div>
        <div className={`col d-flex justify-content-end align-items-center`}>
          <div className="text-end">{props.displayName}</div>
        </div>
      </div>
    </div>
  );
}

TopBar.propTypes = {
  displayName: PropTypes.string,
};

export default TopBar;
