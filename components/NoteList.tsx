import { Note } from "@/types/note";
import NoteCard from "./NoteCard";

type Props = {
  notes: Note[];
  editingId: number | null;
  editingText: string;
  setEditingText: (v: string) => void;
  startEdit: (id: number, text: string) => void;
  saveEdit: (id: number) => void;
  deleteNote: (id: number) => void;
  summarize: (id: number, text: string) => void;
  loadingId: number | null;
};

export default function NoteList(props: Props) {
  if (props.notes.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10">
        No notes yet. Add your first note.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {props.notes.map((n) => (
        <NoteCard key={n.id} note={n} {...props} />
      ))}
    </div>
  );
}
