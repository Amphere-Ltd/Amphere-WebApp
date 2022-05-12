import React from 'react';
import PropTypes from 'prop-types';
import artistSyncHandler from '../../models/firebase/syncers/artist-syncer';

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
    this.state = {displayName: 'user'};
  }

  /**
   *
   */
  async componentDidMount() {
    if (this.props.currUser) {
      const artistSyncer =
        await artistSyncHandler.getSyncer(this.props.currUser.uid);
      this.setState({displayName: artistSyncer.displayName});
    }
  }

  /**
   *
   * @param {Object} prevProps
   * @param {Object} prevState
   * @param {Object} snapshot
   */
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.currUser === prevProps.currUser) return;
    if (this.props.currUser) {
      const artistSyncer =
        await artistSyncHandler.getSyncer(this.props.currUser.uid);
      this.setState({displayName: artistSyncer.displayName});
    }
  }

  /**
   *
   * @return {JSX.Element}
   */
  render() {
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
            <p>Congratulations {this.state.displayName}, you have
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
  currUser: PropTypes.object,
};

export default Complete;
