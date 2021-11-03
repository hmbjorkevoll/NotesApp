import toast from "react-hot-toast";
import {
  serverTimestamp,
  doc,
  addDoc,
  updateDoc,
  collection,
} from "firebase/firestore";
import styles from "../styles/AddNoteForm.module.css";
// import { useForm } from "../lib/useForm";
import { firestore } from "../lib/firebase";

export default function AddNoteForm({ auth, note, setNote, notes }) {
  // EXAMPLE OF API REQUEST FROM ITUNES:
  // SEARCH FOR TIM FERRISS, IN THE PODCAST NAME ONLY:
  // https://itunes.apple.com/search?term=tim+ferriss&media=podcast&attribute=titleTerm
  //
  // example gathered from https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#overview

  // React Select is an example of the functionality required from the form
  // https://react-select.com/home

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setNote((values) => ({ ...values, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(notes);
    if (notes.some((e) => e.id === note.id)) {
      updateNote();
    } else newNote();
    resetForm();
  }

  function resetForm() {
    setNote({
      noteText: "",
      podcastTitle: "",
      podcastEpisode: "",
    });
  }

  async function updateNote() {
    await updateDoc(
      doc(firestore, `users/${auth.currentUser.uid}/notes/${note.id}`),
      {
        noteText: note.noteText,
        podcastTitle: note.podcastTitle,
        podcastEpisode: note.podcastEpisode,
        id: !note.id ? timestamp : note.id,
      }
    );
  }

  async function newNote() {
    await addDoc(
      collection(firestore, `users/${auth.currentUser.uid}/notes/`),
      {
        noteText: note.noteText,
        podcastTitle: note.podcastTitle,
        podcastEpisode: note.podcastEpisode,
        id: !note.id ? timestamp : note.id,
      },
      { merge: true }
    );
    toast.success("Added new note!");
  }
  const timestamp = serverTimestamp();

  return (
    note,
    setNote,
    handleChange,
    (
      <div className={styles.noteInput}>
        <h2 className={styles.h2}>Write down thoughts from podcasts</h2>
        <form onSubmit={handleSubmit}>
          <fieldset className={styles.addNoteForm}>
            <label htmlFor="noteText">Thoughts</label>
            <textarea
              placeholder="Add thoughts here"
              autoFocus
              required
              name="noteText"
              value={note.noteText}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="podcastTitle">Podcast Show</label>
            <input
              type="text"
              placeholder="Add the Podcast Show"
              name="podcastTitle"
              value={note.podcastTitle}
              onChange={handleChange}
            />
            <label htmlFor="podcastEpisode">Podcast Episode</label>
            <input
              type="text"
              placeholder="Add the Podcast Episode"
              name="podcastEpisode"
              value={note.podcastEpisode}
              onChange={handleChange}
            />
            <button type="submit" className={styles.addNote}>
              Add note
            </button>
            <button className={styles.resetForm} onClick={resetForm}>
              Reset
            </button>
          </fieldset>
        </form>
      </div>
    )
  );
}
