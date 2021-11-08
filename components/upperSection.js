export default function UpperSection({ notes, signOut }) {
  return (
    <section className="flex flex-col justify-center text-center gap-2 mb-5">
      <h1 className="">Welcome back!</h1>
      <p>
        You have {notes.length} {notes.length == 1 ? "note" : "notes"}.
      </p>
      <div className="flex justify-center">
        <button
          className="w-30 mr-3 bg-gray-200 border border-gray-300 py-0.5 px-3 hover:bg-gray-400 hover:border-gray-500 active:scale-90"
          onClick={signOut}
        >
          Sign out
        </button>
      </div>
    </section>
  );
}
