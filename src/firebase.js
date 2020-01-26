import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
var firebaseConfig = {
    apiKey: "AIzaSyAQH6WKGNVgBSIJSvQpzhj5PQBUkp3Kddw",
    authDomain: "think-piece-8bf56.firebaseapp.com",
    databaseURL: "https://think-piece-8bf56.firebaseio.com",
    projectId: "think-piece-8bf56",
    storageBucket: "think-piece-8bf56.appspot.com",
    messagingSenderId: "245326394634",
    appId: "1:245326394634:web:81809d27042ecee1d4f6f3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const firestore=firebase.firestore();
  export const auth =firebase.auth();
  export const provider= new firebase.auth.GoogleAuthProvider();
  export const signInWithGoogle=()=>auth.signInWithPopup(provider);
  export const signOut=()=>auth.signOut()
firestore.settings({timestampsInSnapshots:true})

  window.firebase=firebase;
  export default firebase;