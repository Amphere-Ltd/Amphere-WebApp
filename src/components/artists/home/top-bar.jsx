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
          <div className="form-outline w-100">
            <input type="search" className="form-control amphere-input-dropdown"
              placeholder="Search..." aria-label="Search"/>
          </div>
        </div>
        <div className={`col d-flex justify-content-end align-items-center`}>
          <div className="dropdown">
            <button className={'btn dropdown-toggle bg-white ps-0 pe-2 py-0'}
              type="button" id="userDropdown" data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{height: '40px', borderRadius: '20px'}}>
              <img src={props.proPicUrl} alt={props.displayName}
                className={'me-2'} width={36} height={36}
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}/>
              {props.displayName}
            </button>
            <ul className="dropdown-menu" aria-labelledby="userDropdown">
              <li>
                <a className="dropdown-item" onClick={props.signOutCurrUser}>
                Sign Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

TopBar.propTypes = {
  proPicUrl: PropTypes.string,
  displayName: PropTypes.string,
  signOutCurrUser: PropTypes.func,
};

export default TopBar;
