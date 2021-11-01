import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

export function NoteWrapper({ children }) {
  const [note, setNote] = useState({
    noteText: "",
    podcastTitle: "",
    podcastEpisode: "",
  });
  const [notes, setNotes] = useState([]);

  return (
    <NoteContext.Provider value={(note, notes)}>
      {children}
    </NoteContext.Provider>
  );
}

export function useNoteContext() {
  return useContext(NoteContext);
}
