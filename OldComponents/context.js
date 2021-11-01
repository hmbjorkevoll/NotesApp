import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../lib/firebase";

const auth = getAuth(firebaseApp);

export const AuthContext = createContext({});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth(), setUser);
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user }} {...props} />;
};

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.user != null };
};

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });

//     return unsubscribe;
//   }, []);

//   const login = async () => {
//     try {
//       await signInWithPopup(auth, new GoogleAuthProvider());
//       console.log("pressed login button");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={(user, login, logout)}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// export { AuthProvider, useAuth };
