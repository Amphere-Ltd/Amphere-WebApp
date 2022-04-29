import {addDoc, collection} from 'firebase/firestore';
import service from '../service';
import AbstractSyncer from './abstract-syncer';

/**
 *
 */
class EpkSyncer extends AbstractSyncer {
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

          if (data === {}) {
            // This is a newly-created document.
            return instance;
          }

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

    // Remember to add any new fields that need syncing here.
    this.accessToSpotify = {};
    this.biography = '\\null';
    this.contactEmail = '\\null';
    this.contactPhone = '\\null';
    this.displayName = '\\null';
    this.forFansOf = [];
    this.genres = [];
    this.isIndividual = '\\null';
    this.linkToAppleMusic = '\\null';
    this.linkToFacebook = '\\null';
    this.linkToInstagram = '\\null';
    this.linkToSpotify = '\\null';
    this.linkToSoundCloud = '\\null';
    this.proPicFilenames = '\\null';
  }
}

const syncers = new Map();

const epkSyncHandler = {
  newSyncer: async () => {
    const docRef = await addDoc(collection(service.db, 'epks'), {});
    return new EpkSyncer(docRef.id);
  },
  getSyncer: async (epkID) => {
    if (syncers.has(epkID)) {
      return syncers.get(epkID);
    }

    const syncer = new EpkSyncer(epkID);
    const remoteSyncer = await syncer.pullInstanceOfSelf();
    const latestSyncer = remoteSyncer === null ? syncer : remoteSyncer;

    syncers.set(epkID, latestSyncer);
    return latestSyncer;
  },
};

export default epkSyncHandler;
