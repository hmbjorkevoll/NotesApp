import Notes from "../components/notesPage";
import { auth } from "../lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";

const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

const SignIn = () => {
  return (
    <main>
      <section>
        <p>Take notes from you favourite podcasts!</p>
        <p>
          You can log in with your Google account, no user information is stored
          in the app. If you sign in later, all your notes will be stored for
          you.
        </p>
      </section>
      <div>
        <button onClick={signInWithGoogle} className="loginbutton">
          {"Log in with Google"}
        </button>
      </div>
    </main>
  );
};

export default function Home(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  return user ? <Notes /> : <SignIn />;
}
