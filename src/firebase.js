import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB2iGj7ogGu6kcfpPEcPbKc_WnEOyZlM_w",
  authDomain: "ultimatestickmanchampionship.firebaseapp.com",
  databaseURL: "https://ultimatestickmanchampionship.firebaseio.com",
  projectId: "ultimatestickmanchampionship",
  storageBucket: "ultimatestickmanchampionship.appspot.com",
  messagingSenderId: "552560255858",
  appId: "1:552560255858:web:0f1d04faf4730a9ebd33eb",
  measurementId: "G-RSMGRRZGYV"
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const fire = firebase
export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const db = firebase.firestore()