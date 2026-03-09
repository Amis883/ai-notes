"use client";
import { useState } from "react";

export default function Home() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  const addNote = () => {
    setNotes([...notes, note]);
    setNote("");
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">AI Notes</h1>

      <textarea
        className="w-full border p-3 rounded mb-4"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        onClick={addNote}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Add Note
      </button>

      <div className="mt-6 space-y-3">
        {notes.map((n, i) => (
          <div key={i} className="border p-3 rounded">
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}
