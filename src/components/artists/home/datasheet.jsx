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
    <div className={`h-100 ${props.className}`}>
      <div className={'h-100 d-flex flex-column bg-amphere-beige ' +
        'rounded-fixed-25'}>
        <div className={'row flex-grow-1'}>
          <div className={'col pe-lg-0'}>
            <ProfileCard
              className={'bg-white shadow'}
              proPicUrl={props.proPicUrl}
              bannerUrl={props.bannerUrl}
              displayName={props.displayName}
              genres={props.genres}
              description={props.description}
              forFansOf={props.forFansOf}/>
          </div>
          <div className={'col text-dark'}>
            <div className={'h-100 px-3 pt-4 pb-3 d-flex flex-column'}>
              <h4 className={'font-weight-bold'}>Top Track</h4>
              <div className={'row pb-3'}>
                <iframe style={{borderRadius: '12px'}}
                  src={'https://open.spotify.com/embed/track/' +
                    '27L8sESb3KR79asDUBu8nW?utm_source=generator'}
                  width="100%" height="80" frameBorder="0"
                  allowFullScreen=""
                  allow={'autoplay; clipboard-write; encrypted-media; ' +
                    'fullscreen; picture-in-picture'}/>
                {/* TODO: Replace this with the artist's top track. */}
              </div>
              <h4 className={'font-weight-bold'}>Recent Gigs</h4>
              <div className={'row pb-3 flex-grow-1'}>
                <p>Nothing to show.</p>
              </div>
              <button className={'my-3 amphere-pill-button bg-amphere-brown'}
                type={'button'}>
              Check Availability
              </button>
            </div>
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
