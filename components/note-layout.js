// TODO Make notes editable and deletable, update Firebase accordigly
import toast from "react-hot-toast";

let date = new Date().toLocaleString().split(",")[0];

const handleEdit = (event) => {
  event.preventDefault();
};

const handleDelete = (event) => {
  event.preventDefault();
  toast.error("Succesfully deleted note");
};

export default function NoteLayout({ notes }) {
  return (
    <section>
      {notes &&
        notes.map((note) => (
          <div key={note.id}>
            <section>
              <p>{note.noteText}</p>
              <p>{note.podcastTitle}</p>
              <p>{note.podcastEpisode}</p>
              <div>
                <p>
                  {/* // TODO: THIS NEEDS TO CHANGE!!!! */}
                  Last updated: {note.id}
                </p>
                <button onClick={handleEdit} variant="contained">
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  sx={{
                    float: "right",
                    color: "white",
                    margin: "5px",
                    backgroundColor: "#5a5a5a",
                    ":hover": {
                      color: "white",
                      backgroundColor: "#5a5a5a",
                      filter: "brightness(80%)",
                    },
                  }}
                >
                  Delete
                </button>
              </div>
            </section>
          </div>
        ))}
    </section>
  );
}
