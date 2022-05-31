import React from 'react';

/**
 *
 * @param {ContextMenu.propTypes} props
 * @return {JSX.Element}
 * @constructor
 */
function ContextMenu(props) {
  return (
    <div className={'h-100 d-flex flex-column'}>
      <button type={'button'} className={'amphere-hollow-button my-1'}>
        Schedule
      </button>
      <button type={'button'} className={'amphere-hollow-button my-1'}>
        Inbox Requests
      </button>
      <button type={'button'} className={'amphere-hollow-button my-1'}>
        Ratings & Feedback
      </button>
      <button type={'button'} className={'amphere-hollow-button my-1'}>
        Tour
      </button>
      <button type={'button'} className={'amphere-hollow-button my-1'}>
        Explore Venues
      </button>
    </div>
  );
}

ContextMenu.propTypes = {};

export default ContextMenu;
