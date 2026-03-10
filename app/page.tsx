"use client";

import { useState, useEffect } from "react";

type Note = { id: number; text: string; summary?: string };

export default function Home() {
  const [note, setNote] = useState("");
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const addNote = () => {
    if (!note.trim()) return;

    const newNote = {
      id: Date.now(),
      text: note,
    };

    setNotes((prev) => [...prev, newNote]);

    setNote("");
  };

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };
  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };
  const saveEdit = (id: number) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, text: editingText } : n)),
    );

    setEditingId(null);
    setEditingText("");
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
      console.error("Summarize failed", error);
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
  const filteredNotes = notes.filter((n) =>
    n.text.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className={`${dark ? "dark" : ""} p-10 max-w-2xl mx-auto`}>
      <h1 className="text-4xl font-bold mb-8 text-center">🧠 AI Notes</h1>
      <button
        onClick={() => setDark(!dark)}
        className="mb-4 px-3 py-1 border rounded"
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>
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
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        {filteredNotes.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No notes yet. Add your first note.
          </p>
        )}
        {filteredNotes.map((n) => (
          <div
            key={n.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 space-y-2 border dark:border-gray-700 hover:shadow-lg transition"
          >
            {editingId === n.id ? (
              <textarea
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="w-full border p-2 rounded"
              />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">
                {n.text.length} characters
              </p>
            )}

            {n.summary && (
              <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700">
                <strong>Summary:</strong> {n.summary}
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => deleteNote(n.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

              {editingId === n.id ? (
                <button
                  onClick={() => saveEdit(n.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEdit(n.id, n.text)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => summarize(n.id, n.text)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                {loadingId === n.id ? "Summarizing..." : "Summarize"}
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(n.summary || "")}
                className="text-xs bg-gray-200 px-2 py-1 rounded"
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
