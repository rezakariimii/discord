// import firebase from "firebase";
// const firebaseConfig = {
//   apiKey: "AIzaSyCcDZsyoAzMLdEJVGNDTv_BQPqB5FsqJic",
//   authDomain: "discord-e7fa8.firebaseapp.com",
//   projectId: "discord-e7fa8",
//   storageBucket: "discord-e7fa8.appspot.com",
//   messagingSenderId: "226450453052",
//   appId: "1:226450453052:web:ce6e8f09e5dd9e99f04939",
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

// export { auth, provider };
// export default db;

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCcDZsyoAzMLdEJVGNDTv_BQPqB5FsqJic",
  authDomain: "discord-e7fa8.firebaseapp.com",
  projectId: "discord-e7fa8",
  storageBucket: "discord-e7fa8.appspot.com",
  messagingSenderId: "226450453052",
  appId: "1:226450453052:web:ce6e8f09e5dd9e99f04939",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
