import toast from "react-hot-toast";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore, auth } from "../lib/firebase";

export default function NoteLayout({ notes, setNote }) {
  function handleEdit(note) {
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
    if (note.createdAt !== null || undefined) {
      let time = note.createdAt.toDate();
      let timestring = time.toLocaleString().split(",");
      return timestring;
    } else {
      <p>No record of when this note was created!</p>;
    }
  }

  return (
    <section className="flex flex-wrap m-auto gap-10 justify-center">
      {notes.length === 0 ? (
        <p>You have no notes! Add one to see it appear here.</p>
      ) : (
        notes &&
        notes.map((note) => (
          <div
            key={note.id}
            className="min-w-full border border-gray-100 p-2 shadow-lg"
          >
            <p className="break-all xl:break-words mb-2">{note.noteText}</p>
            <p className="break-all xl:break-words mb-2">{note.podcastTitle}</p>
            <p className="break-all xl:break-words">{note.podcastEpisode}</p>
            <li className="list-none text-right mt-5">
              <p className="mb-2">Created at: {timestampToString(note)}</p>
              <button
                className="bg-blue-500 text-white px-2"
                onClick={() => handleEdit(note)}
              >
                Edit
              </button>
              <button
                className="bg-red-800 text-white px-2"
                onClick={() => handleDelete(note)}
              >
                Delete
              </button>
            </li>
          </div>
        ))
      )}
    </section>
  );
}
