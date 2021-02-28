import firebase from 'firebase'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "project1-38a2b.firebaseapp.com",
    databaseURL: "https://project1-38a2b.firebaseio.com",
    projectId: "project1-38a2b",
    storageBucket: "project1-38a2b.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID
  };

firebase.initializeApp(firebaseConfig)

var database = firebase.database()

export {database as default}