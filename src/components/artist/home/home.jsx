import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import artistSyncHandler from '../../../models/firebase/syncers/artist-syncer';
import LoadingScreen from '../../common/loading-screen';
import TopBar from './top-bar';
import Datasheet from './datasheet';

/**
 *
 * @param {Home.propTypes} props
 * @return {JSX.Element}
 * @constructor
 */
function Home(props) {
  const [artistSyncer, setArtistSyncer] = useState(null);
  const [epkSyncer, setEpkSyncer] = useState(null);

  useEffect(async () => {
    if (this.props.currUser) {
      const userUid = this.props.currUser.uid;
      const foundArtistSyncer = await artistSyncHandler.getSyncer(userUid);
      const foundEpkSyncer = await foundArtistSyncer.getEpkSyncer();
      setArtistSyncer(foundArtistSyncer);
      setEpkSyncer(foundEpkSyncer);
    }
  });

  if (artistSyncer === null || epkSyncer === null) {
    return <LoadingScreen/>;
  } else {
    return (
      <div className={'container'}>
        <TopBar/>
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
}

Home.propTypes = {
  currUser: PropTypes.object,
};

export default Home;
