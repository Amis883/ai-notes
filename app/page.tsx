"use client";

import Header from "@/components/Header";
import NoteEditor from "@/components/NoteEditor";
import NoteList from "@/components/NoteList";
import SearchBar from "@/components/SearchBar";
import { Note } from "@/types/note";
import { useState } from "react";

export default function Home() {
  const [dark, setDark] = useState(false);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const filteredNotes: Note[] = notes.filter((n) =>
    n.text.toLowerCase().includes(search.toLowerCase()),
  );
  const addNote = () => {
    if (!note.trim()) return;

    const newNote: Note = {
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
  return (
    <div className={`${dark ? "dark" : ""} p-10 max-w-2xl mx-auto`}>
      <Header dark={dark} toggleDark={() => setDark(!dark)} />
      <NoteEditor note={note} setNote={setNote} addNote={addNote} />

      <SearchBar search={search} setSearch={setSearch} />

      <NoteList
        notes={filteredNotes}
        editingId={editingId}
        editingText={editingText}
        setEditingText={setEditingText}
        startEdit={startEdit}
        saveEdit={saveEdit}
        deleteNote={deleteNote}
        summarize={summarize}
        loadingId={loadingId}
      />
    </div>
  );
}
