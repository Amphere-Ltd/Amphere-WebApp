import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {ProfileCard.propTypes} props
 * @return {JSX.Element}
 * @constructor
 */
function ProfileCard(props) {
  useEffect(() => {
  });

  const genrePanelItems = props.genres.map((genre) =>
    <span key={genre} className='badge rounded-pill mt-1 bg-amphere-red
      text-light font-weight-bold d-flex align-items-center'>
      {genre}
    </span>,
  );

  const forFansOfItems = props.forFansOf.map((relatedArtist) =>
    <span key={relatedArtist} className='badge rounded-pill mt-1 bg-white
      text-dark font-weight-normal shadow d-flex align-items-center'>
      {relatedArtist}
    </span>,
  );

  return (
    <div className={`container-fluid px-0 h-100 text-dark rounded-fixed-25
      overflow-hidden ${props.className}`}>
      <img src={props.bannerUrl} alt={props.displayName}
        className={'w-100 mh-50'}
        style={{objectFit: 'cover'}}/>
      <div className={'px-5 pb-5'} style={{paddingTop: '10px'}}>
        <h4 className={'d-flex align-items-end'}>
          <img src={props.proPicUrl} alt={props.displayName}
            className={'me-3'} width={84} height={84}
            style={{
              position: 'absolute',
              marginBottom: '168px', // (84 * 2) px
              borderRadius: '50%',
              objectFit: 'cover',
            }}/>
          <div className={'d-flex align-items-center'}
            style={{marginLeft: '94px' /* (84 + 10) px */}}>
            {props.displayName}
            <img src={require('../../../assets/icon-share-dark.png')}
              alt={'Share'} className={'ms-2'} width={24} height={24}/>
          </div>
        </h4>
        <div className="mb-3 d-flex justify-content-start align-items-center">
          {genrePanelItems}
        </div>
        <p>
          <b>Description:</b>
          <br/>
          {props.description}
        </p>
        <p>
          <b>For fans of:</b>
          <div className="d-flex justify-content-start align-items-center">
            {forFansOfItems}
          </div>
        </p>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  className: PropTypes.string,
  proPicUrl: PropTypes.string,
  bannerUrl: PropTypes.string,
  displayName: PropTypes.string,
  genres: PropTypes.array,
  description: PropTypes.string,
  forFansOf: PropTypes.array,
};

export default ProfileCard;
