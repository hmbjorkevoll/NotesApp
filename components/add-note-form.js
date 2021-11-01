import { Box, FormControl, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";

export default function AddNoteForm(event) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  // EXAMPLE OF API REQUEST FROM ITUNES:
  // SEARCH FOR TIM FERRISS, IN THE PODCAST NAME ONLY:
  // https://itunes.apple.com/search?term=tim+ferriss&media=podcast&attribute=titleTerm
  //
  // example gathered from https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#overview

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <FormControl className="add-note-form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Add your note here"
          variant="outlined"
          multiline
          rows={5}
          className="form-control"
          id="note-value"
          autoFocus
          required
          pattern="\S+.*"
          margin="normal"
        ></TextField>
        <TextField
          margin="normal"
          label="Add the podcast show"
          variant="outlined"
          type="text"
          className="form-control"
          id="show-value"
          placeholder="Add the podcast show"
          name="podcastName"
        />
        <TextField
          label="Add the podcast episode"
          variant="outlined"
          type="text"
          className="form-control"
          id="episode-value"
          placeholder="Add the podcast episode"
          name="podcastEpisode"
          margin="normal"
        />
        <br />
        <Button
          variant="contained"
          type="submit"
          className="submit"
          id="submit-form"
          onClick={handleSubmit}
        >
          Add note
        </Button>
      </FormControl>
    </Box>
  );
}
