import NoteCard from "./NoteCard";
type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
};
export default function NotesGrid({ notes }: { notes: Note[] }) {
  return (
    <div className="p-4 rounded-xl border hover:shadow-lg transition bg-white">
      {notes.map((note) => (
        <NoteCard key={note.id} {...note} />
      ))}
    </div>
  );
}
