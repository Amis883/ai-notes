"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  // load notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("notes");

    if (!saved) return;

    const parsed: string[] = JSON.parse(saved);
    setNotes(parsed);
  }, []);
  // save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!note.trim()) return;
    setNotes([...notes, note]);
    setNote("");
  };

  const deleteNote = (index: number) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
  };
  const summarizeNote = async (text: string) => {
    const res = await fetch("/api/summarize", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    alert(data.summary);
  };
  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">AI Notes</h1>

      <textarea
        placeholder="Write your note..."
        className="w-full border p-3 rounded mb-4"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        onClick={addNote}
        disabled={!note.trim()}
        className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        Add Note
      </button>

      <div className="mt-6 space-y-3">
        {notes.map((n, i) => (
          <div
            key={i}
            className="border p-3 rounded flex justify-between items-center"
          >
            <span>{n}</span>

            <div className="flex gap-2">
              <button
                onClick={() => summarizeNote(n)}
                className="text-blue-500 text-sm"
              >
                Summarize
              </button>

              <button
                onClick={() => deleteNote(i)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
