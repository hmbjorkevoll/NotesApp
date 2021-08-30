const noteValue = document.getElementById("note-value");
const showValue = document.getElementById("show-value");
const episodeValue = document.getElementById("episode-value");
const submitForm = document.getElementsByClassName("add-note-form")[0];

let notes = JSON.parse(localStorage.getItem("notes") || "[]");
let date = new Date().toLocaleString().split(",")[0];

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

//On load
addNoteToDOM();

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

const noteShow = document.getElementsByClassName("note-show");
const noteEpisode = document.getElementsByClassName("note-episode");
const noteContent = document.getElementsByClassName("note-text");

// Make individual note editable, toggle save button visible, hide edit button
function editNote(event, id) {
  const thisNote = this.event.target;
  if (thisNote.textContent === "Edit note") {
    thisNote.value = "Save note";
    thisNote.textContent = "Save note";
    noteShow[event].contentEditable = "True";
    noteShow[event].classList.add("editing");
    noteEpisode[event].contentEditable = "True";
    noteEpisode[event].classList.add("editing");
    noteContent[event].contentEditable = "True";
    noteContent[event].classList.add("editing");
  } else if (thisNote.textContent === "Save note") {
    thisNote.value = "Edit note";
    thisNote.textContent = "Edit note";
    saveUpdatedNote(id);
  }
}

// Save edited note to localStorage
function saveUpdatedNote(id) {
  const parentOfTarget = this.event.target.parentNode.parentNode;
  let podcastNameOnNote =
    parentOfTarget.getElementsByClassName("note-show")[0].innerHTML;
  let podcastEpisodeOnNote =
    parentOfTarget.getElementsByClassName("note-episode")[0].innerHTML;
  let contentOnNote =
    parentOfTarget.getElementsByClassName("note-text")[0].innerHTML;
  const thisNote = this.event.target;
  if (thisNote) {
    (thisNote.noteText = contentOnNote),
      (thisNote.podcastShow = podcastNameOnNote),
      (thisNote.podcastEpisode = podcastEpisodeOnNote);
    let noteIndex = thisNote.id;
    notes.splice(noteIndex, 1);
    notes.unshift(thisNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    addNoteToDOM();
  } else return;
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
