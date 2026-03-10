type Props = {
  note: string;
  setNote: (v: string) => void;
  addNote: () => void;
};

export default function NoteEditor({ note, setNote, addNote }: Props) {
  return (
    <>
      <textarea
        className="w-full border p-3 rounded mb-4"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        onClick={addNote}
        className="bg-black text-white px-4 py-2 my-2 rounded"
      >
        Add Note
      </button>
    </>
  );
}
