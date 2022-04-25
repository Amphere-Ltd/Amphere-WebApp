import {doc, setDoc} from 'firebase/firestore';
import service from '../service';

/**
 *
 */
class AbstractSyncer {
  /**
   *
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
   */
  async pull() {
    // TODO
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
