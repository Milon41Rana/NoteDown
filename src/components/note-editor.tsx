"use client";
import { useNoteContext } from "@/app/context/note-context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { FilePlus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export function NoteEditor() {
  const { activeNote, updateNote, deleteNote, addNote, activeFolderId } =
    useNoteContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [activeNote]);

  useEffect(() => {
    if (!activeNote) return;

    const handler = setTimeout(() => {
      if (title !== activeNote.title || content !== activeNote.content) {
        updateNote(activeNote.id, { title, content });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [title, content, activeNote, updateNote]);

  const handleDelete = () => {
    if (activeNote) {
      deleteNote(activeNote.id);
    }
  };
  
  const handleNewNote = () => {
    if(activeFolderId) {
      addNote(activeFolderId);
    }
  }

  if (!activeNote) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/20 p-4">
        <div className="text-center">
            <FilePlus className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No note selected</h3>
            <p className="mt-1 text-sm text-muted-foreground">
                Select a note from the list or create a new one.
            </p>
            <Button onClick={handleNewNote} variant="outline" className="mt-6" disabled={!activeFolderId}>
                Create New Note
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col p-4 md:p-6">
      <div className="flex items-center justify-between pb-4">
        <Input
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold border-0 shadow-none focus-visible:ring-0 px-0"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          aria-label="Delete note"
        >
          <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
        </Button>
      </div>
      <Textarea
        placeholder="Start writing your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 resize-none border-0 shadow-none focus-visible:ring-0 p-0 text-base"
      />
    </div>
  );
}
