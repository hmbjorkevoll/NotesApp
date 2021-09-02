import { useLocalStorage } from "./localStorage";

// let notes = JSON.parse(window.localStorage.getItem("notes") || "[]");

export default function AddNoteForm() {
  const addNewNote = (event) => {
    event.preventDefault();
    let podcastNameValue = event.target.podcastName.value;
    let podcastEpisodeValue = event.target.podcastEpisode.value;
    let noteTextValue = event.target.podcastThoughts.value;

    const Note = () => {
      const [podcastNameValue, setPodcastNameValue] = useLocalStorage(
        "podcastName",
        ""
      );
      const [podcastEpisodeValue, setPodcastEpisodeValue] = useLocalStorage(
        "podcastEpisode",
        ""
      );
      const [noteTextValue, setNoteTextValue] = useLocalStorage("noteText", "");
    };
    /* const note = {
      noteText: noteTextValue,
      podcastShow: podcastNameValue,
      podcastEpisode: podcastEpisodeValue,
    };
    notes.unshift(note);
    window.localStorage.setItem("notes", JSON.stringify(notes)); */
    // event.target.reset();
  };

  return (
    <div className="input-area">
      <form className="add-note-form" onSubmit={AddNoteForm}>
        <label htmlFor="note-value">Thoughts</label>
        <br />
        <textarea
          className="form-control"
          id="note-value"
          placeholder="Add thoughts here"
          name="podcastThoughts"
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
          placeholder="Add the podcast show"
          name="podcastName"
        />
        <br />
        <label htmlFor="episode-value">Podcast Episode</label>
        <br />
        <input
          type="text"
          className="form-control"
          id="episode-value"
          placeholder="Add the podcast episode"
          name="podcastEpisode"
        />
        <br />
        <button type="submit" className="submit" id="submit-form">
          Add note
        </button>
      </form>
    </div>
  );
}
