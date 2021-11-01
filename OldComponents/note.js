import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import toast from "react-hot-toast";

let date = new Date().toLocaleString().split(",")[0];

export default function Note() {
  const handleEdit = (event) => {
    event.preventDefault();
  };

  const handleSave = (event) => {
    event.preventDefault();
    toast.success("Saved edited note");
  };

  const handleDelete = (event) => {
    event.preventDefault();
    toast.error("Succesfully deleted note");
  };
  // Example note
  return (
    <Card
      sx={{
        minWidth: "300",
        maxWidth: "500px",
        backgroundColor: "#f1f1f1",
        margin: "1rem",
      }}
    >
      <CardContent>
        <Typography variant="body1" mb={2}>
          This is an example of a note. The text goes here. Lorem ipsum and all
          that good stuff!
        </Typography>
        <Typography variant="body1" mb={1}>
          The podcast show
        </Typography>
        <Typography variant="body1" mb={2}>
          The podcast episode
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{
              width: "60%",
            }}
            color="text.secondary"
          >
            Last updated: {date}
          </Typography>
          <Button onClick={handleEdit} variant="contained">
            Edit
          </Button>
          <Button
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
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

/* 
export default function ShowNotes() {
  const notes = window.localStorage.getItem("notes");
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
 */
