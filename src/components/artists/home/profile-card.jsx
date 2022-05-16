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

  const genrePanelItems = this.props.genres.map((genre) =>
    <span key={genre} className='badge rounded-pill mx-1 mt-3 ps-3
      bg-amphere-red text-light font-weight-normal d-flex align-items-center'>
      {genre}
    </span>,
  );

  const forFansOfItems = this.props.forFansOf.map((relatedArtist) =>
    <span key={relatedArtist} className='badge rounded-pill mx-1 mt-3 ps-3
      bg-light text-dark font-weight-normal d-flex align-items-center'>
      {relatedArtist}
    </span>,
  );

  return (
    <div className="card" style="width: 18rem;">
      <img src={this.props.bannerUrl} className="card-img-top"
        alt={this.props.displayName}/>
      <div className="card-body">
        <h5 className="card-title">{this.props.displayName}</h5>
        <div className="d-flex justify-content-start align-items-center">
          {genrePanelItems}
        </div>
        <h6 className="card-subtitle mb-2 text-muted">Description:</h6>
        <p className="card-text">{this.props.description}</p>
        <h6 className="card-subtitle mb-2 text-muted">For fans of:</h6>
        <div className="d-flex justify-content-start align-items-center">
          {forFansOfItems}
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  proPicUrl: PropTypes.string,
  bannerUrl: PropTypes.string,
  displayName: PropTypes.string,
  genres: PropTypes.array,
  description: PropTypes.string,
  forFansOf: PropTypes.array,
};

export default ProfileCard;
