// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAmArcMKfNsMRIpQIT23otEAZOz5oMKqkQ",
  authDomain: "hbweb-a7934.firebaseapp.com",
  databaseURL: "https://hbweb-a7934-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hbweb-a7934",
  storageBucket: "hbweb-a7934.appspot.com",
  messagingSenderId: "318118672051",
  appId: "1:318118672051:web:5e5b5618fcbac1e89c62c6",
  measurementId: "G-8HTBH5FC5R"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}
