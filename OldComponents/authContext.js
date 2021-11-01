import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "@firebase/auth";
import router from "next/router";

const provider = new GoogleAuthProvider();
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [signedIn, setSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  // Auth state listener
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      setSignedIn(true);
      setIsLoading(false);
    } else {
      // No user signed in
      setSignedIn(false);
      setIsLoading(true);
    }
  });

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      setCurrentUser(user);
      // Redirect to user's notes
      router.push("/notes");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // Console.log out error messages
      console.log(errorCode, errorMessage, email, credential);
    });

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        isLoading,
        currentUser,
        signInWithPopup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
