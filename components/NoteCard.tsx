type Note = {
  id: number;
  text: string;
  summary?: string;
  createdAt: number;
};

type NoteCardProps = {
  note: Note;
  onDelete: (id: number) => void;
  onEdit: (note: Note) => void;
  onSummarize: (id: number, text: string) => void;
};

export default function NoteCard({
  note,
  onDelete,
  onEdit,
  onSummarize,
}: NoteCardProps) {
  return (
    <div className="bg-white shadow rounded-xl p-4 space-y-2">
      <p>{note.text}</p>

      {note.summary && (
        <div className="bg-gray-100 p-2 rounded text-sm">
          <strong>Summary:</strong> {note.summary}
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={() => onDelete(note.id)}>Delete</button>
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onSummarize(note.id, note.text)}>
          Summarize
        </button>
      </div>
    </div>
  );
}
