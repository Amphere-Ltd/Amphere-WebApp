import {addDoc, collection, doc, setDoc} from 'firebase/firestore';

/**
 *
 */
class AbstractSyncer {
  static converter = {
    fromFirestore: undefined,
    toFirestore: (childInstance) => {
      return childInstance.defaultFields;
    },
  };

  /**
   *
   * @return {Promise<void>}
   */
  static async create(childClass) {
    const docRef = await addDoc(
        collection(db, childClass.firestoreColName),
        childClass.defaultFields,
    );
  }

  /**
   *
   */
  constructor() {
    if (new.target === AbstractSyncer) {
      throw new TypeError('Cannot construct abstract instances directly');
    }

    this.firestoreColName = undefined;
    this.firestoreDocName = undefined;
    this.defaultFields = undefined;
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
    const ref = doc(db, this.firestoreColName, this.firestoreDocName)
        .withConverter(AbstractSyncer.converter);
    await setDoc(ref, this);
  }
}
