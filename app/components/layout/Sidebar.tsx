import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r p-6">
      <h2 className="text-xl font-bold mb-6">AI Notes</h2>

      <nav className="space-y-3">
        <Link href="/notes">Notes</Link>

        <Link href="/settings">Settings</Link>
      </nav>
    </aside>
  );
}
