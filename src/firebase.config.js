// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMEVjFE4MEKw5_gZ7TRWiKSAngi4bOB9M",
  authDomain: "karticeicimeri.firebaseapp.com",
  projectId: "karticeicimeri",
  storageBucket: "karticeicimeri.appspot.com",
  messagingSenderId: "860425832402",
  appId: "1:860425832402:web:d8e848c877b8b3751cea0b",
  measurementId: "G-6TXQSDVGJJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()