import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDveJd9lqWXgmgUCtok_pF0M8lwcrrp-aA",
  authDomain: "gamecollection-2950f.firebaseapp.com",
  databaseURL: "https://gamecollection-2950f.firebaseio.com",
  projectId: "gamecollection-2950f",
  storageBucket: "gamecollection-2950f.appspot.com",
  messagingSenderId: "64549305771",
  appId: "1:64549305771:web:de77eb7e489b04d72866ee"
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const fire = firebase
export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const db = firebase.firestore()