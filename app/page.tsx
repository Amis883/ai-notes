"use client";

import { useState, useEffect } from "react";

type Note = { id: number; text: string; summary?: string };

export default function Home() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const addNote = () => {
    if (!note.trim()) return;

    setNotes((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: note,
      },
    ]);

    setNote("");
  };

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };
  const summarize = async (id: number, text: string) => {
    try {
      setLoadingId(id);

      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, summary: data.summary } : n)),
      );
    } catch (error) {
      console.error("Summarize error:", error);
    } finally {
      setLoadingId(null);
    }
  };

  // load notes from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(saved);
  }, []);

  // save notes
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
        {notes.map((n) => (
          <div key={n.id} className="border p-3 rounded space-y-2">
            <p>{n.text}</p>

            {n.summary && <p className="text-sm text-gray-600">{n.summary}</p>}

            <div className="flex gap-2">
              <button
                onClick={() => deleteNote(n.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

              <button
                onClick={() => summarize(n.id, n.text)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                {loadingId === n.id ? "Summarizing..." : "Summarize"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
