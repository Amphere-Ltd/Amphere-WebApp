import React from 'react';

/**
 *
 * @param {ContextMenu.propTypes} props
 * @return {JSX.Element}
 * @constructor
 */
function ContextMenu(props) {
  return (
    <div className={'container-fluid h-100 d-flex flex-column'}>
      <button type={'button'}>Schedule</button>
      <button type={'button'}>Inbox Requests</button>
      <button type={'button'}>Ratings & Feedback</button>
      <button type={'button'}>Tour</button>
      <button type={'button'}>Explore Venues</button>
    </div>
  );
}

ContextMenu.propTypes = {};

export default ContextMenu;
