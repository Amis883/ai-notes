import NoteCard from "./NoteCard";
type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
};
export default function NotesGrid({ notes }: { notes: Note[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteCard key={note.id} {...note} />
      ))}
    </div>
  );
}
