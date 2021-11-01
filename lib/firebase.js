// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCkjpYIu7LUXw3yr-dx-wCtTvhMVAj8Kv4",
  authDomain: "podcast-notes-738e3.firebaseapp.com",
  databaseURL:
    "https://podcast-notes-738e3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "podcast-notes-738e3",
  storageBucket: "podcast-notes-738e3.appspot.com",
  messagingSenderId: "644129013488",
  appId: "1:644129013488:web:e2c1147bf73b27afa20c35",
  measurementId: "G-KD4F7SXL68",
});

export default firebaseApp;

// Auth exports
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const functions = getFunctions(firebaseApp);
