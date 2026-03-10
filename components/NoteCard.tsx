import { Note } from "../types/note";

type Props = {
  note: Note;
  editingId: number | null;
  editingText: string;
  setEditingText: (v: string) => void;
  startEdit: (id: number, text: string) => void;
  saveEdit: (id: number) => void;
  deleteNote: (id: number) => void;
  summarize: (id: number, text: string) => void;
  loadingId: number | null;
};

export default function NoteCard({
  note,
  editingId,
  editingText,
  setEditingText,
  startEdit,
  saveEdit,
  deleteNote,
  summarize,
  loadingId,
}: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 space-y-2 border dark:border-gray-700">
      {editingId === note.id ? (
        <textarea
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
          className="w-full border p-2 rounded"
        />
      ) : (
        <p className="text-gray-800 dark:text-gray-200">{note.text}</p>
      )}

      {note.summary && (
        <div className="bg-gray-100 p-3 rounded text-sm">
          <strong>Summary:</strong> {note.summary}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => deleteNote(note.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>

        {editingId === note.id ? (
          <button
            onClick={() => saveEdit(note.id)}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => startEdit(note.id, note.text)}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => summarize(note.id, note.text)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          {loadingId === note.id ? "Summarizing..." : "Summarize"}
        </button>
      </div>
    </div>
  );
}
