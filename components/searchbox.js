import { useState } from "react";
import { firestore } from "../lib/firebase";

export default function SearchBox() {
  const [search, setSearch] = useState([]);

  return (
    <>
      <input placeholder="Search for a specific note" />
    </>
  );
}
