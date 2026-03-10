import { Note } from "../types/note";
import { Trash2, Pencil, Sparkles, Copy, Check } from "lucide-react";

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
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-lg transition space-y-3">

      {/* NOTE TEXT */}
      {editingId === note.id ? (
        <textarea
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
          {note.text}
        </p>
      )}

      {/* SUMMARY */}
      {note.summary && (
        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-200">
          <div className="flex justify-between items-center mb-1">
            <strong className="text-gray-600 dark:text-gray-300">
              AI Summary
            </strong>

            <button
              onClick={() =>
                navigator.clipboard.writeText(note.summary || "")
              }
              className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>

          {note.summary}
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-2 pt-1">

        {/* DELETE */}
        <button
          onClick={() => deleteNote(note.id)}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          <Trash2 size={16} />
          Delete
        </button>

        {/* EDIT / SAVE */}
        {editingId === note.id ? (
          <button
            onClick={() => saveEdit(note.id)}
            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            <Check size={16} />
            Save
          </button>
        ) : (
          <button
            onClick={() => startEdit(note.id, note.text)}
            className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
          >
            <Pencil size={16} />
            Edit
          </button>
        )}

        {/* SUMMARIZE */}
        <button
          onClick={() => summarize(note.id, note.text)}
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          <Sparkles size={16} />
          {loadingId === note.id ? "Summarizing..." : "Summarize"}
        </button>

      </div>
    </div>
  );
}