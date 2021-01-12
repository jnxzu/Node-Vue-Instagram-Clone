import firebase from 'firebase';

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
};

firebase.initializeApp(config);

const db = firebase.firestore();

export default db;
