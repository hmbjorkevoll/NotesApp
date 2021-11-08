import toast from "react-hot-toast";
import {
  doc,
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
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
        updatedAt: serverTimestamp(),
      }
    );
    toast.success("Updated note!");
  }

  async function newNote() {
    const timestamp = Date.now();
    await addDoc(
      collection(firestore, `users/${auth.currentUser.uid}/notes/`),
      {
        noteText: note.noteText,
        podcastTitle: note.podcastTitle,
        podcastEpisode: note.podcastEpisode,
        id: timestamp,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
    toast.success("Added new note!");
  }

  return (
    note,
    setNote,
    handleChange,
    (
      <div className="flex flex-col m-auto mb-20">
        <h2 className="text-center m-5">Write down thoughts from podcasts</h2>

        <form onSubmit={handleSubmit}>
          <fieldset className="flex flex-col p-2">
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
            <div className="flex justify-between mt-5">
              <button
                type="submit"
                className="inline-flex bg-green-500 border border-green-500 text-white py-2 px-4 hover:bg-green-600 hover:border-green-800 active:scale-90"
              >
                Save note
              </button>
              <button
                className="inline-flex bg-gray-200  border border-gray-300 text-gray-800 py-2 px-4 hover:bg-gray-400 hover:border-gray-500 active:scale-90"
                onClick={resetForm}
              >
                Reset form
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    )
  );
}
