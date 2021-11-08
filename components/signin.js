export default function SignIn({ signin }) {
  return (
    <main>
      <section className="p-2">
        <h1 className="py-2">Take notes from you favourite podcasts!</h1>
        <h3 className="py-3">
          You can log in with your Google account. If you sign in later, all
          your notes will be stored for you. No other user information than the
          email address you use in the Google login is stored.
        </h3>
      </section>
      <div className="flex justify-center m-3">
        <button
          onClick={signin}
          className="mr-3 bg-gray-200 border border-gray-300 py-2 px-4 hover:bg-gray-400 hover:border-gray-500 active:scale-90"
        >
          Login
        </button>
      </div>
    </main>
  );
}
