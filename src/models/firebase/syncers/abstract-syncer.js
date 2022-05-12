import {doc, getDoc, setDoc} from 'firebase/firestore';
import service from '../service';

/**
 *
 */
class AbstractSyncer {
  firestoreColName = undefined;
  firestoreDocName = undefined;

  converter = undefined;

  /**
   *
   * @param {String} firestoreColName
   * @param {String} firestoreDocName
   * @param {Function} fromFirestore
   * @param {Function} toFirestore
   */
  constructor(
      firestoreColName,
      firestoreDocName,
      fromFirestore,
      toFirestore,
  ) {
    if (new.target === AbstractSyncer) {
      throw new TypeError('Cannot construct abstract instances directly');
    }

    this.firestoreColName = firestoreColName;
    this.firestoreDocName = firestoreDocName;

    this.converter = {
      fromFirestore: fromFirestore,
      toFirestore: toFirestore,
    };
  }

  /**
   *
   * @return {Promise<null|AbstractSyncer>}
   */
  async pullInstanceOfSelf() {
    const ref = doc(service.db, this.firestoreColName, this.firestoreDocName)
        .withConverter(this.converter);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      return docSnap.data();
    }

    return null;
  }

  /**
   *
   */
  async push() {
    const ref = doc(service.db, this.firestoreColName, this.firestoreDocName)
        .withConverter(this.converter);
    await setDoc(ref, this);
  }
}

export default AbstractSyncer;
