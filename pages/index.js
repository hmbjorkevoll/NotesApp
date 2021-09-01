import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import NoteLayout from "../components/note-layout";
import ShowNotes from "../components/note";
import AddNoteForm from "../components/add-note-form";
import { useState, useEffect } from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Thoughts from podcasts</title>
      </Head>
      <h1>Write down thoughts from podcasts</h1>

      <AddNoteForm />
      <p className="edit">
        To edit, press edit note, change what you want directly in the note,
        then press the save button
      </p>
      <NoteLayout />
    </>
  );
}
