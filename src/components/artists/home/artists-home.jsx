import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import artistSyncHandler from '../../../models/firebase/syncers/artist-syncer';
import TopBar from './top-bar';
import Datasheet from './datasheet';

/**
 *
 * @param {ArtistsHome.propTypes} props
 * @return {JSX.Element}
 * @constructor
 */
function ArtistsHome(props) {
  const {userUid} = useParams();

  const [artistSyncer, setArtistSyncer] = useState(null);
  const [epkSyncer, setEpkSyncer] = useState(null);

  const setSyncers = async () => {
    if (props.currUser) {
      const userUid = props.currUser.uid;
      const foundArtistSyncer = await artistSyncHandler.getSyncer(userUid);
      const foundEpkSyncer = await foundArtistSyncer.getEpkSyncer();
      setArtistSyncer(foundArtistSyncer);
      setEpkSyncer(foundEpkSyncer);
    }
  };

  useEffect(() => {
    setSyncers();
  });

  if (artistSyncer === null || epkSyncer === null) {
    return null;
  }

  if (userUid !== props.currUser.uid) {
    return <p>Invalid Request</p>;
  }

  return (
    <div className={'container'}>
      <TopBar
        displayName={epkSyncer.displayName}/>
      <Datasheet
        proPicUrl={'' /* TODO */}
        bannerUrl={'' /* TODO */}
        displayName={epkSyncer.displayName}
        genres={epkSyncer.genres}
        description={epkSyncer.description}
        forFansOf={epkSyncer.forFansOf}/>
    </div>
  );
}

ArtistsHome.propTypes = {
  currUser: PropTypes.object,
};

export default ArtistsHome;
