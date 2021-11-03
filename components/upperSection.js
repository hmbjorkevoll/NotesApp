import styles from "../styles/UpperSection.module.css";

export default function UpperSection({ notes, signOut }) {
  return (
    <section className={styles.upperSection}>
      <h1 className={styles.h1}>Welcome back!</h1>
      <p>
        You have {notes.length} {notes.length == 1 ? "note" : "notes"}.
      </p>
      <button className={styles.signoutButton} onClick={signOut}>
        Sign out
      </button>
    </section>
  );
}
