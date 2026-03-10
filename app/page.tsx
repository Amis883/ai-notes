"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [note, setNote] = useState("");

  const [notes, setNotes] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];

    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const addNote = () => {
    if (!note.trim()) return;

    setNotes((prev) => [...prev, note]);
    setNote("");
  };

  const deleteNote = (index: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };

  const summarize = (text: string) => {
    alert("AI summary for: " + text.slice(0, 50));
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

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
          <div key={i} className="border p-3 rounded space-y-2">
            <p>{n}</p>

            <div className="flex gap-2">
              <button
                onClick={() => deleteNote(i)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

              <button
                onClick={() => summarize(n)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Summarize
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
