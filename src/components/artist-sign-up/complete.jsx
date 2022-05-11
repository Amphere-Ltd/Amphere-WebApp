import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 */
class Complete extends React.Component {
  /**
   *
   * @param {Complete.propTypes} props
   */
  constructor(props) {
    super(props);
  }

  /**
   *
   */
  componentDidMount() {
    this.props.onFlowProgression(5);
  }

  /**
   *
   * @return {JSX.Element}
   */
  render() {
    const displayName = this.props.epkSyncer ?
      this.props.epkSyncer.displayName : 'user';

    return (
      <div className={'container'}>
        <div className="my-5 text-center">
          <h1><b>Thank you</b></h1>
        </div>
        <div className="container-narrow mx-auto">
          <div className="my-5 text-center">
            <img className="img-fluid"
              src={require('../../assets/banner-empty-user-card.png')}
              alt="Amphere" width="412" height="132"/>
          </div>
          <div className="my-5 text-center">
            <p>Congratulations {displayName}, you have
              successfully created your EPK! You will hear from us soon as we
              work with Notting Hill Arts Club in the meantime. Welcome to
              Amphere!</p>
          </div>
        </div>
      </div>
    );
  }
}

Complete.propTypes = {
  artistSyncer: PropTypes.any,
  epkSyncer: PropTypes.any,
  onFlowProgression: PropTypes.func,
};

export default Complete;
