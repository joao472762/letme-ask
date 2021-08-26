import firebase from "firebase";

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBeH8MCNrdkvIvpG9CVmiuQO2c9zTRP7TY",
    authDomain: "letme-ask-one.firebaseapp.com",
    projectId: "letme-ask-one",
    storageBucket: "letme-ask-one.appspot.com",
    messagingSenderId: "797737670819",
    appId: "1:797737670819:web:061912de07769cb28a8716"
  };
  

const app = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const database = firebase.database()

export {firebase,auth,database}
