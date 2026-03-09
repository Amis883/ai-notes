export default function NotePage() {
  return (
    <div>
      <input
        className="text-2xl font-bold w-full mb-4 outline-none"
        placeholder="Title"
      />

      <textarea
        className="w-full h-96 outline-none"
        placeholder="Start writing..."
      />
    </div>
  );
}
