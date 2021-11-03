import Head from "next/head";
import Notes from "../components/notesPage";
import SignIn from "../components/signin";
import { auth } from "../lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";

const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  return (
    <>
      <Head>
        <title>Thoughts from podcasts</title>
      </Head>
      {user ? <Notes auth={auth} /> : <SignIn signin={signInWithGoogle} />}
    </>
  );
}
