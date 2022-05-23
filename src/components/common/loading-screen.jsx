import React from 'react';
import './loading-screen.css';

/**
 *
 */
class LoadingScreen extends React.Component {
  /**
   *
   * @return {JSX.Element}
   */
  render() {
    return (
      <div className={'overlay'}>
        <div className="spinner-grow mx-auto my-auto text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
}

export default LoadingScreen;
