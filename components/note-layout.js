import toast from "react-hot-toast";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore, auth } from "../lib/firebase";
import styles from "../styles/NoteLayout.module.css";

export default function NoteLayout({ notes, setNote }) {
  function handleEdit(note) {
    // Take contents from note to the form, wait for the submit to update rendered note,
    // otherwise it can be lost by editing and then reseting the form
    setNote({
      noteText: note.noteText,
      podcastTitle: note.podcastTitle,
      podcastEpisode: note.podcastEpisode,
      id: note.id,
    });
  }

  async function handleDelete(note) {
    // Identify the correct note by the note ID, then delete it from firestore
    await deleteDoc(
      doc(firestore, `users/${auth.currentUser.uid}/notes/${note.id}`)
    );
    // Show a toast message on successfully deleting note
    toast.error("Succesfully deleted note");
  }

  function timestampToString(note) {
    if (note.createdAt !== null) {
      let time = note.createdAt.toDate();
      let timestring = time.toLocaleString().split(",");
      return timestring;
    }
  }

  return (
    <section>
      {notes.length === 0 ? (
        <p>You have no notes! Add one to see it appear here.</p>
      ) : (
        notes &&
        notes.map((note) => (
          <div key={note.id}>
            <p>{note.noteText}</p>
            <p>{note.podcastTitle}</p>
            <p>{note.podcastEpisode}</p>
            <li className={styles.dateAndButtons}>
              <p>
                {/* // TODO: THIS NEEDS TO CHANGE!!!! */}
                Created at: {timestampToString(note)}
              </p>
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button onClick={() => handleDelete(note)}>Delete</button>
            </li>
          </div>
        ))
      )}
    </section>
  );
}
