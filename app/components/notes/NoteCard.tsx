import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <Card className="cursor-pointer hover:shadow-lg transition">
        <CardHeader>
          <CardTitle className="truncate">{title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {content}
          </p>

          <p className="text-xs text-gray-400 mt-4">{updatedAt}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
