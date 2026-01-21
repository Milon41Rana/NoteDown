"use client";

import { useNoteContext } from "@/app/context/note-context";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { FilePlus, PlusCircle } from "lucide-react";

export function NoteList() {
  const { notes, activeFolderId, activeNoteId, selectNote, addNote } =
    useNoteContext();

  const filteredNotes = activeFolderId
    ? notes
        .filter((note) => note.folderId === activeFolderId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  const handleAddNote = () => {
    if (activeFolderId) {
      addNote(activeFolderId);
    }
  };

  if (!activeFolderId) {
    return (
        <div className="hidden md:flex h-full flex-col items-center justify-center bg-background border-r">
          <div className="text-center p-4">
              <h3 className="text-lg font-medium">No folder selected</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                  Select a folder to see your notes.
              </p>
          </div>
        </div>
    );
  }

  return (
    <aside className="h-full flex flex-col border-r bg-background">
      <div className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6">
        <h2 className="text-lg font-semibold">Notes</h2>
        <Button variant="ghost" size="icon" onClick={handleAddNote} aria-label="Add new note">
          <PlusCircle className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        {filteredNotes.length > 0 ? (
          <div className="flex flex-col gap-2 p-2">
            {filteredNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => selectNote(note.id)}
                className={cn(
                  "w-full rounded-lg border p-3 text-left transition-colors",
                  activeNoteId === note.id
                    ? "bg-primary/10 border-primary"
                    : "hover:bg-muted/50"
                )}
              >
                <h3 className="font-semibold truncate">{note.title || "Untitled Note"}</h3>
                <p className="text-sm text-muted-foreground truncate">{note.content || "No content"}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <FilePlus className="h-10 w-10 text-muted-foreground" />
            <h3 className="mt-4 text-md font-medium">No notes in this folder</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Create your first note to get started.
            </p>
            <Button onClick={handleAddNote} variant="outline" className="mt-4">
              Create Note
            </Button>
          </div>
        )}
      </ScrollArea>
    </aside>
  );
}
