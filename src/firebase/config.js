// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRPYGkLD3RnLjI-KMRXCRCNf4RXKptU5s",
  authDomain: "daily-app-b92db.firebaseapp.com",
  projectId: "daily-app-b92db",
  storageBucket: "daily-app-b92db.appspot.com",
  messagingSenderId: "654374217429",
  appId: "1:654374217429:web:7dd2c8ee7da19f5e12645c"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);