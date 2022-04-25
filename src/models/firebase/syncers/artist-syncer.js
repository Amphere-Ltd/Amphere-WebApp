import AbstractSyncer from './abstract-syncer';

/**
 *
 */
class ArtistSyncer extends AbstractSyncer {
  /**
   *
   * @param firebaseAuthUid
   */
  constructor(firebaseAuthUid) {
    super(
        'artists',
        firebaseAuthUid,
        (snapshot, options) => {
          const data = snapshot.data(options);
          const instance = new ArtistSyncer(firebaseAuthUid);
          // Remember to add any new fields that need syncing here.
          instance.dateOfBirth = data.dateOfBirth;
          instance.displayName = data.displayName;
          instance.epkID = data.epkID;
          instance.gender = data.gender;
          instance.isIndividual = data.isIndividual;
          instance.signUpProg = data.signUpProg;
          instance.username = data.username;
          return instance;
        },
        (artistSyncer) => {
          return {
            // Remember to add any new fields that need syncing here.
            dateOfBirth: artistSyncer.dateOfBirth,
            displayName: artistSyncer.displayName,
            epkID: artistSyncer.epkID,
            gender: artistSyncer.gender,
            isIndividual: artistSyncer.isIndividual,
            signUpProg: artistSyncer.signUpProg,
            username: artistSyncer.username,
          };
        },
    );

    // Remember to add any new fields that need syncing here.
    this.dateOfBirth = '\\null';
    this.displayName = '\\null';
    this.epkID = '\\null';
    this.gender = '\\null';
    this.isIndividual = '\\null';
    this.signUpProg = '\\null';
    this.username = '\\null';
  }
}

export default ArtistSyncer;
