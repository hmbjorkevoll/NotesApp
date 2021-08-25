const noteValue = document.getElementById("note-value");
const showValue = document.getElementById("show-value");
const episodeValue = document.getElementById("episode-value");
const submitForm = document.getElementsByClassName("add-note-form")[0];

let notes = JSON.parse(localStorage.getItem("notes") || "[]");
let date = new Date().toLocaleString().split(',')[0]

function addNoteToDOM() {
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
    <p class="note-show" contenteditable="true">${
      element.podcastShow.length > 0 ? element.podcastShow : "No Podcast Show!"
    }</p>
    <p class="note-episode" contenteditable="true">${
      element.podcastEpisode.length > 0
        ? element.podcastEpisode
        : "No Podcast Episode!"
    }</p>
    <p class="note-text" contenteditable="true">${element.noteText}</p>
    <ul>
        <li class="date">Date added: ${date}</li>
        <li class="delete" id="${index}" onClick="deleteNote(this.id)">Delete note</li>
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

// Delete individual note, re-populate notes-list
function deleteNote(id) {
  // Loop through the bookmarks array
  if (notes[id]) {
    notes.splice(id, 1);
  }
  // Update notes array in localStorage, re-populate DOM
  localStorage.setItem("notes", JSON.stringify(notes));
  addNoteToDOM();
}

// Get data from form, prevent default, only allow if there is a note added
function getFormData(event) {
  event.preventDefault();
  let podcastNameValue = showValue.value;
  let podcastEpisodeValue = episodeValue.value;
  let noteTextValue = noteValue.value;

  const note = {
    noteText: noteTextValue,
    podcastShow: podcastNameValue,
    podcastEpisode: podcastEpisodeValue,
  };
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  addNoteToDOM();
  submitForm.reset();
}

submitForm.addEventListener("submit", getFormData);

//On load
addNoteToDOM();
