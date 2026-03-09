import Link from "next/link";

type NoteCardProps = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
};

export default function NoteCard({
  id,
  title,
  content,
  updatedAt,
}: NoteCardProps) {
  return (
    <Link href={`/dashboard/notes/${id}`}>
      <div className="border rounded-xl p-4 hover:shadow-md transition cursor-pointer">
        <h3 className="font-semibold text-lg truncate">{title}</h3>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{content}</p>

        <div className="mt-4 text-xs text-gray-400">{updatedAt}</div>
      </div>
    </Link>
  );
}
