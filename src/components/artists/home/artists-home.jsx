import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getDownloadURL, ref} from 'firebase/storage';
import service from '../../../models/firebase/service';
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
  const [proPicUrl, setProPicUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');

  const setSyncers = async () => {
    if (props.currUser) {
      const userUid = props.currUser.uid;

      const foundArtistSyncer = await artistSyncHandler.getSyncer(userUid);
      const foundEpkSyncer = await foundArtistSyncer.getEpkSyncer();

      const proPicFilename = foundEpkSyncer.proPicFilenames
          .filter((filename) => {
            return filename.includes('ProfilePicture-1By1');
          })[0];
      const bannerFilename = foundEpkSyncer.proPicFilenames
          .filter((filename) => {
            return filename.includes('ProfilePicture-4By3');
          })[0];

      const proPicUploadPath = `epkMedia/${props.currUser.uid}/${
        proPicFilename
      }`;
      const proPicStorageRef = ref(service.storage, proPicUploadPath);
      const proPicStorageUrl = await getDownloadURL(proPicStorageRef);

      const bannerUploadPath = `epkMedia/${props.currUser.uid}/${
        bannerFilename
      }`;
      const bannerStorageRef = ref(service.storage, bannerUploadPath);
      const bannerStorageUrl = await getDownloadURL(bannerStorageRef);

      setProPicUrl(proPicStorageUrl);
      setBannerUrl(bannerStorageUrl);
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
    <div className={'container min-vh-100 d-flex flex-column'}>
      <div className={'row'}>
        <TopBar
          displayName={epkSyncer.displayName}/>
      </div>
      <div className={'row pb-5 flex-grow-1'}>
        <Datasheet
          proPicUrl={proPicUrl}
          bannerUrl={bannerUrl}
          displayName={epkSyncer.displayName}
          genres={epkSyncer.genres}
          description={epkSyncer.biography}
          forFansOf={epkSyncer.forFansOf}/>
      </div>
    </div>
  );
}

ArtistsHome.propTypes = {
  currUser: PropTypes.object,
};

export default ArtistsHome;
