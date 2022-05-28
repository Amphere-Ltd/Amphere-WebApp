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
    <div className={`container-fluid d-flex flex-column bg-amphere-beige 
      rounded-fixed-25 ${props.className}`}>
      <div className={'row px-0 flex-grow-1'}>
        <div className={'col px-0'}>
          <ProfileCard
            className={'bg-white shadow'}
            proPicUrl={props.proPicUrl}
            bannerUrl={props.bannerUrl}
            displayName={props.displayName}
            genres={props.genres}
            description={props.description}
            forFansOf={props.forFansOf}/>
        </div>
        <div className={'col px-0 text-dark'}>
          <div className={'container-fluid h-100 p-5 d-flex flex-column'}>
            <h4 className={'font-weight-bold'}>Top Track</h4>
            <p>Nothing to show.</p>
            <h4 className={'font-weight-bold'}>Recent Gigs</h4>
            <div className={'row flex-grow-1'}>
              <GoogleMapsWrapper/>
            </div>
            <button className={'my-3 amphere-pill-button bg-amphere-brown'}
              type={'button'}>
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Datasheet.propTypes = {
  className: PropTypes.string,
  proPicUrl: PropTypes.string,
  bannerUrl: PropTypes.string,
  displayName: PropTypes.string,
  genres: PropTypes.array,
  description: PropTypes.string,
  forFansOf: PropTypes.array,
};

export default Datasheet;
