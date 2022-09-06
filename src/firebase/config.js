// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALs73KFGnSMk3j5Ohsfjdz5tzCY5MI414",
  authDomain: "react-curso-d5ddb.firebaseapp.com",
  projectId: "react-curso-d5ddb",
  storageBucket: "react-curso-d5ddb.appspot.com",
  messagingSenderId: "52228970248",
  appId: "1:52228970248:web:ab3f0131a2abe9bb323ebd"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );