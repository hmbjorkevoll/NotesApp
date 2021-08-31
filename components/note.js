export default function Note() {
  const notes = localStorage.getItem("notes");
  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = " ";
  notesObj.forEach(function (element, index) {
    html += `
    <div class="note-card">
    <p class="note-show" contenteditable="false">${
      element.podcastShow.length > 0 ? element.podcastShow : "No Podcast Show!"
    }</p>
    <p class="note-episode" contenteditable="false">${
      element.podcastEpisode.length > 0
        ? element.podcastEpisode
        : "No Podcast Episode!"
    }</p>
    <p class="note-text" contenteditable="false">${element.noteText}</p>
    <ul>
    <li class="date">Last updated: ${date}</li>
    <li class="card-button-secondary" id="${index}" onClick="deleteNote(this.id)">Delete note</li>
    <li class="card-button-main edit-note" id="${index}" onClick="editNote(this.id)">Edit note</li>
    </ul>
    </div>`;
  });
  let notesList = document.getElementById("notes-list");
  if (notesObj.length != 0) {
    notesList.innerHTML = html;
  } else {
    notesList.innerHTML = `<p class="no-notes">No notes added! Add a note with the form above</p>`;
  }
}
