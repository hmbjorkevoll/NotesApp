// TODO Make notes editable, update Firebase accordigly
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
    console.log(note.noteText);
  }

  async function handleDelete(note) {
    // Identify the correct note by the note ID, then delete it from firestore
    await deleteDoc(
      doc(firestore, `users/${auth.currentUser.uid}/notes/${note.id}`)
    );
    // Show a toast message on successfully deleting note
    toast.error("Succesfully deleted note");
  }
  return (
    <section>
      {notes &&
        notes.map((note) => (
          <div key={note.id}>
            <p value={note.noteText}>{note.noteText}</p>
            <p value={note.podcastTitle}>{note.podcastTitle}</p>
            <p value={note.podcastEpisode}>{note.podcastEpisode}</p>
            <li className={styles.dateAndButtons}>
              <p>
                {/* // TODO: THIS NEEDS TO CHANGE!!!! */}
                Last updated: {note.id}
              </p>
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button onClick={() => handleDelete(note)}>Delete</button>
            </li>
          </div>
        ))}
    </section>
  );
}
