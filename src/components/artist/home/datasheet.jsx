import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import ProfileCard from './profile-card';

/**
 *
 * @param {Datasheet.propTypes} props
 * @return {JSX.Element}
 * @constructor
 */
function Datasheet(props) {
  useEffect(() => {
  });

  return (
    <div className={'container'}>
      <div className={'row'}>
        <div className={'col'}>
          <ProfileCard
            proPicUrl={this.props.proPicUrl}
            bannerUrl={this.props.bannerUrl}
            displayName={this.props.displayName}
            genres={this.props.genres}
            description={this.props.description}
            forFansOf={this.props.forFansOf}/>
        </div>
        <div className={'col'}>
          <h2>Top Track</h2>
          <h2>Recent Gigs</h2>
          <button className={'amphere-pill-button'}
            value={'Check Availability'}/>
        </div>
      </div>
    </div>
  );
}

Datasheet.propTypes = {
  proPicUrl: PropTypes.string,
  bannerUrl: PropTypes.string,
  displayName: PropTypes.string,
  genres: PropTypes.array,
  description: PropTypes.string,
  forFansOf: PropTypes.array,
};

export default Datasheet;
