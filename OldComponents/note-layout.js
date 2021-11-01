
let date = new Date().toLocaleString().split("-")[0];

export default function NoteLayout({ ShowNotes }) {
  return (
    <div className="notes-list" id="notes-list">
      <div className="note-card">
        <p className="note-show">Example Podcast Show</p>
        <p className="note-episode">Example Podcast Episode</p>
        <p className="note-content">Example note text goes in here</p>
        <ul>
          <li className="date">Date added: {date}</li>
          <li className="card-button-main edit-note">Edit note</li>
          <li className="card-button-secondary">Delete note</li>
        </ul>
      </div>
      {ShowNotes}
    </div>
  );
}
