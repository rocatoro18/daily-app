// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers/getEnvironments';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//console.log(import.meta.env);
//console.log(process.env);
const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_DATABASEURL,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID
} = getEnvironments();
//console.log(env);
// Your web app's Firebase configuration
// DEV/PRODUCTION
/*
const firebaseConfig = {
  apiKey: "AIzaSyDRPYGkLD3RnLjI-KMRXCRCNf4RXKptU5s",
  authDomain: "daily-app-b92db.firebaseapp.com",
  projectId: "daily-app-b92db",
  storageBucket: "daily-app-b92db.appspot.com",
  messagingSenderId: "654374217429",
  appId: "1:654374217429:web:7dd2c8ee7da19f5e12645c"
};
*/
// TESTING
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  databaseURL: VITE_DATABASEURL,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID
};

//console.log(firebaseConfig);


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);