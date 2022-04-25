import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseTestConfig = {
  apiKey: 'AIzaSyDMATpKqOJ_FN4QwmbHfP0qSNwFY0YAJd0',
  authDomain: 'amphere-webapp-dev.firebaseapp.com',
  databaseURL: 'https://amphere-webapp-dev-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'amphere-webapp-dev',
  storageBucket: 'amphere-webapp-dev.appspot.com',
  messagingSenderId: '667164416597',
  appId: '1:667164416597:web:af591e43fd4426630292dc',
  measurementId: 'G-56KKY8ELFD',
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseProdConfig = {
  apiKey: 'AIzaSyBCI51W0YRD7DYTPClligstQ-eeLkhbE9Y',
  authDomain: 'amphere-webapp.firebaseapp.com',
  databaseURL: 'https://amphere-webapp-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'amphere-webapp',
  storageBucket: 'amphere-webapp.appspot.com',
  messagingSenderId: '166068372565',
  appId: '1:166068372565:web:e16ac93f1f0972ebd000dc',
  measurementId: 'G-3EYBGLJPBV',
};

const firebaseConfig = process.env.NODE_ENV == 'development' ?
    firebaseTestConfig : firebaseProdConfig;

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const service = {
  app: app,
  analytics: analytics,
  auth: auth,
  db: db,
};

export default service;
