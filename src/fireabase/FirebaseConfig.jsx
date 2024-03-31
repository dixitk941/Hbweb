// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD1PpIe8wgn4cNzE0yL4XMdnbCHlLaj5I",
  authDomain: "hitownbears-79d16.firebaseapp.com",
  projectId: "hitownbears-79d16",
  storageBucket: "hitownbears-79d16.appspot.com",
  messagingSenderId: "674455266041",
  appId: "1:674455266041:web:72338c0e987075beeef828",
  measurementId: "G-GSC4BDWSXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}
