export default function SignIn({ signin }) {
  return (
    <main>
      <section>
        <h1>Take notes from you favourite podcasts!</h1>
        <p>
          You can log in with your Google account. If you sign in later, all
          your notes will be stored for you. No other user information than the
          email address you use in the Google login is stored.
        </p>
      </section>
      <div>
        <button onClick={signin} className="loginbutton">
          {"Log in with Google"}
        </button>
      </div>
    </main>
  );
}
