import Firebase from 'firebase';

import storage from '@react-native-firebase/storage';


var config = {
  apiKey: "AIzaSyAm2TVblc9Ynl6QbDw3QvWpjj5QiVkoO3o",
    authDomain: "logindemo-61677.firebaseapp.com",
    databaseURL: "https://logindemo-61677.firebaseio.com",
    projectId: "logindemo-61677",
    storageBucket: "logindemo-61677.appspot.com",
    messagingSenderId: "608783527911",
    appId: "1:608783527911:web:01f90c3b6dfd5be073d742"
};

let app = Firebase.initializeApp(config);  
// Firebase.auth().signInAnonymously().catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;

//     if(! error){
//     Firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in.
//       var isAnonymous = user.isAnonymous;
//       var uid = user.uid;
//       // ...
//     } else {
//       // User is signed out.
//       // ...
//     }
//     // ...
//       });
//   }else{
//       console.log("Firebase error")
//   }
// });
export const fb = app.database();
export const Store = app.storage();
export const fire = app;

