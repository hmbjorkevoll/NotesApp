import Head from "next/head";
import styles from "../styles/Home.module.css";
import NoteLayout from "../components/note-layout";

import AddNoteForm from "./add-note-form";
import Loader from "../components/loader";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Thoughts from podcasts</title>
      </Head>
      <Loader hide />
      <section className="upperSection">
        <h1>Write down thoughts from podcasts</h1>
        <AddNoteForm />
      </section>
      <p className="edit">
        To edit, press edit note, change what you want directly in the note,
        then press the save button
      </p>
      <NoteLayout className="lowerSection" />
    </div>
  );
}
