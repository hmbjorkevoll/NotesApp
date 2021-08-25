import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCgfPmlDY_yFnKaQXTREmQJvSBvtIgHWtw",
  authDomain: "podcast-notes-738e3.firebaseapp.com",
  projectId: "podcast-notes-738e3",
  storageBucket: "podcast-notes-738e3.appspot.com",
  messagingSenderId: "644129013488",
  appId: "1:644129013488:web:e2c1147bf73b27afa20c35",
  measurementId: "G-KD4F7SXL68",
};

export const createUserProfileDocument = async (userAuth, userProfile) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...userProfile,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
