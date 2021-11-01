import Head from "next/head";
import NoteLayout from "./note-layout";
import { useEffect, useState } from "react";
import { auth, firestore } from "../lib/firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  serverTimestamp,
  doc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

const timestamp = serverTimestamp();

export default function Notes() {
  // Individual note
  const [note, setNote] = useState({
    noteText: "",
    podcastTitle: "",
    podcastEpisode: "",
    id: null,
  });

  // Array of all notes to be displayed in the cards
  const [notes, setNotes] = useState([]);

  // Form logic
  function handleSubmit(event) {
    event.preventDefault();
  }

  function onTextChange(event) {
    setNote(event.target.value);
  }

  function resetForm(event) {
    event.preventDefault();
  }

  // Test of writing to database
  async function writeTest() {
    await addDoc(
      collection(firestore, `users/${auth.currentUser.uid}/notes/`),
      {
        noteText:
          "This is an example of a note. The text goes here. Lorem ipsum and all that good stuff. As an example, it is always good to have real data.",
        podcastTitle: "The Podcast Show Extraordinaire",
        podcastEpisode: "Episode #1 of the best podcast",
        id: timestamp,
      },
      { merge: true }
    );
  }

  // Get all notes for the user from the database, update the array of all notes
  useEffect(() => {
    return onSnapshot(
      collection(firestore, `users/${auth.currentUser.uid}/notes`),
      (snapshot) => {
        setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );
  }, []);

  const signOut = () => auth.signOut();

  return (
    <main>
      <Head>
        <title>Thoughts from podcasts</title>
      </Head>
      <section className="upperSection">
        <h1>Welcome back!</h1>
        <p>
          {/* TODO:  ADD DYNAMIC CHANGE OF TEXT BASED ON NUMBER OF NOTES*/}
          You have {notes.length} notes.
        </p>
        <button className="signoutButton" onClick={signOut}>
          Sign out
        </button>
        <div>
          <h2>Write down thoughts from podcasts</h2>
          <form>
            <fieldset className="add-note-form" onSubmit={handleSubmit}>
              <label htmlFor="note-value">Thoughts</label>
              <br />
              <textarea
                className="form-control"
                id="note-value"
                placeholder="Add thoughts here"
                autoFocus
                required
                pattern="\S+.*"
              ></textarea>
              <br />
              <label htmlFor="show-value">Podcast Show</label>
              <br />
              <input
                type="text"
                className="form-control"
                id="show-value"
                placeholder="Add the Podcast Show"
              />
              <br />
              <label htmlFor="episode-value">Podcast Episode</label>
              <br />
              <input
                type="text"
                className="form-control"
                id="episode-value"
                placeholder="Add the Podcast Episode"
              />
              <br />
              <br />
              <button type="submit" id="submit-form" onClick={handleSubmit}>
                Add note
              </button>
              <button onClick={resetForm}>Reset</button>
            </fieldset>
          </form>
        </div>
      </section>

      <section>
        <NoteLayout notes={notes} />
      </section>
    </main>
  );
}
