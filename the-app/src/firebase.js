import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDAoZMA50Ti4q82TH6tSSwHt6fJb-B1SPM",
  authDomain: "project1-38a2b.firebaseapp.com",
  databaseURL: "https://project1-38a2b.firebaseio.com",
  projectId: "project1-38a2b",
  storageBucket: "project1-38a2b.appspot.com",
  messagingSenderId: "375541646537",
  appId: "1:375541646537:web:f50a8161b5dd48d9f53918"
};

firebase.initializeApp(firebaseConfig)

var database = firebase.database()

export {database as default}