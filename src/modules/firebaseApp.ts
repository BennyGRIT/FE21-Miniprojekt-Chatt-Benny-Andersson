// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDD4yra5chJlaZ-XEggv5_9Fq8o2kwUsNc",
    authDomain: "bennychatt-1e905.firebaseapp.com",
    databaseURL: "https://bennychatt-1e905-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bennychatt-1e905",
    storageBucket: "bennychatt-1e905.appspot.com",
    messagingSenderId: "757177452204",
    appId: "1:757177452204:web:bd714c9293f0da70b74109"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);





