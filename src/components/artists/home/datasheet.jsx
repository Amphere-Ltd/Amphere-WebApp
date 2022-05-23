import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import GoogleMapsWrapper from '../../common/google-maps-wrapper';
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
    <div className={'container bg-amphere-beige text-dark'}>
      <div className={'row'}>
        <div className={'col'}>
          <ProfileCard
            proPicUrl={props.proPicUrl}
            bannerUrl={props.bannerUrl}
            displayName={props.displayName}
            genres={props.genres}
            description={props.description}
            forFansOf={props.forFansOf}/>
        </div>
        <div className={'col'}>
          <h4>Top Track</h4>
          <h4>Recent Gigs</h4>
          <GoogleMapsWrapper/>
          <button className={'amphere-pill-button'} type={'button'}>
            Check Availability
          </button>
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
