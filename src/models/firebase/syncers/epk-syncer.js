import AbstractSyncer from './abstract-syncer';

/**
 *
 */
class EpkSyncer extends AbstractSyncer {
  // Remember to add any new fields that need syncing here.
  accessToSpotify = {};
  biography = '';
  contactEmail = '';
  contactPhone = '';
  displayName = '';
  forFansOf = [];
  genres = [];
  isIndividual = '';
  linkToAppleMusic = '';
  linkToFacebook = '';
  linkToInstagram = '';
  linkToSpotify = '';
  linkToSoundCloud = '';
  proPicFilenames = [];

  /**
   *
   * @param {String} epkID
   */
  constructor(epkID) {
    super(
        'epks',
        epkID,
        (snapshot, options) => {
          const data = snapshot.data(options);
          const instance = new EpkSyncer(epkID);
          // Remember to add any new fields that need syncing here.
          instance.accessToSpotify = data.accessToSpotify;
          instance.biography = data.biography;
          instance.contactEmail = data.contactEmail;
          instance.contactPhone = data.contactPhone;
          instance.displayName = data.displayName;
          instance.forFansOf = data.forFansOf;
          instance.genres = data.genres;
          instance.isIndividual = data.isIndividual;
          instance.linkToAppleMusic = data.linkToAppleMusic;
          instance.linkToFacebook = data.linkToFacebook;
          instance.linkToInstagram = data.linkToInstagram;
          instance.linkToSpotify = data.linkToSpotify;
          instance.linkToSoundCloud = data.linkToSoundCloud;
          instance.proPicFilenames = data.proPicFilenames;
          return instance;
        },
        (epkSyncer) => {
          return {
            // Remember to add any new fields that need syncing here.
            accessToSpotify: epkSyncer.accessToSpotify,
            biography: epkSyncer.biography,
            contactEmail: epkSyncer.contactEmail,
            contactPhone: epkSyncer.contactPhone,
            displayName: epkSyncer.displayName,
            forFansOf: epkSyncer.forFansOf,
            genres: epkSyncer.genres,
            isIndividual: epkSyncer.isIndividual,
            linkToAppleMusic: epkSyncer.linkToAppleMusic,
            linkToFacebook: epkSyncer.linkToFacebook,
            linkToInstagram: epkSyncer.linkToInstagram,
            linkToSpotify: epkSyncer.linkToSpotify,
            linkToSoundCloud: epkSyncer.linkToSoundCloud,
            proPicFilenames: epkSyncer.proPicFilenames,
          };
        },
    );
  }
}

const syncers = new Map();

const epkSyncHandler = {
  /**
   *
   * @param {String} epkID
   * @return {Promise<EpkSyncer>}
   */
  getSyncer: async (epkID) => {
    if (syncers.has(epkID)) {
      // We have a locally-saved copy of the EpkSyncer.
      return syncers.get(epkID);
    }

    // We need to either create a new Syncer or pull from the cloud.
    const syncer = new EpkSyncer(epkID);
    const remoteSyncer = await syncer.pullInstanceOfSelf();

    let latestSyncer;
    if (remoteSyncer === null) {
      // This is a newly-created Syncer.
      latestSyncer = syncer;
      await latestSyncer.push();
    } else {
      latestSyncer = remoteSyncer;
    }

    // Save this copy locally.
    syncers.set(epkID, latestSyncer);
    return latestSyncer;
  },
};

export default epkSyncHandler;
