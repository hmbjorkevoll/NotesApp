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
import Toggle from "../components/switch";

const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

export default function Home() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  // TODO store theme in localstorage, use system settings as default
  return (
    <div className="p-3 max-w-2xl m-auto xl:max-w-6xl">
      <Head>
        <title>Thoughts from podcasts</title>
      </Head>
      {/* <div className="flex justify-end">
        <Toggle theme={theme} setTheme={setTheme} className="">
          {theme === true ? true : false}
        </Toggle>
      </div> */}
      {user ? <Notes auth={auth} /> : <SignIn signin={signInWithGoogle} />}
    </div>
  );
}
