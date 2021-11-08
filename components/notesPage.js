import NoteLayout from "./note-layout";
import { useEffect, useState } from "react";
import { auth, firestore } from "../lib/firebase";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import UpperSection from "./upperSection";
import AddNoteForm from "./add-note-form";
import SearchBox from "./searchbox";
import Loader from "./loader";

export default function Notes() {
  // Array of all notes to be displayed in the cards
  const [notes, setNotes] = useState([]);

  // Shared state for the form, used for creating and editing notes, and resetting the form
  const [note, setNote] = useState({
    noteText: "",
    podcastTitle: "",
    podcastEpisode: "",
    id: null,
  });

  // TODO: Show spinner on loading
  const [loading, setLoading] = useState(false);

  // Get all notes for the user from the database, update the array of all notes
  useEffect(() => {
    return onSnapshot(
      collection(firestore, `users/${auth.currentUser.uid}/notes`),
      (snapshot) => {
        setNotes(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      }
    );
  }, []);

  function signOut() {
    auth.signOut();
  }

  return (
    <>
      <main className="max-w-2xl xl:max-w-full">
        <UpperSection notes={notes} signOut={signOut} />
        <AddNoteForm auth={auth} note={note} setNote={setNote} notes={notes} />
        {/* <SearchBox /> */}
        <section className="flex flex-wrap max-w-2xl m-auto lg:max-w-full">
          {!notes ? (
            <Loader show />
          ) : (
            <NoteLayout
              notes={notes}
              setNotes={setNotes}
              note={note}
              setNote={setNote}
            />
          )}
        </section>
      </main>
    </>
  );
}
