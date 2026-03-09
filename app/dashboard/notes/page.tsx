import NewNoteButton from "@/app/components/notes/NewNoteButton";
import NotesGrid from "@/app/components/notes/NotesGrid";

export default function NotesPage() {
  const notes = [
    {
      id: "1",
      title: "Meeting",
      content: "Discuss roadmap",
      updatedAt: "2h ago",
    },
    {
      id: "2",
      title: "Ideas",
      content: "AI startup ideas",
      updatedAt: "1d ago",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notes</h1>
        <NewNoteButton />
      </div>

      <NotesGrid notes={notes} />
    </div>
  );
}
