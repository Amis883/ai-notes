type Props = {
  note: string;
  setNote: (v: string) => void;
  addNote: () => void;
};

export default function NoteEditor({ note, setNote, addNote }: Props) {
  return (
    <>
      <textarea
        placeholder="Write a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:text-white dark:bg-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={addNote}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 my-4 rounded-lg text-sm"
      >
        Add Note
      </button>
    </>
  );
}
