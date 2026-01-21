"use client";

import { initialFolders, initialNotes } from "@/lib/data";
import type { Folder, Note } from "@/lib/types";
import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
  useEffect,
} from "react";

// State
interface NoteState {
  folders: Folder[];
  notes: Note[];
  activeFolderId: string | null;
  activeNoteId: string | null;
}

// Actions
type NoteAction =
  | { type: "SELECT_FOLDER"; payload: string }
  | { type: "SELECT_NOTE"; payload: string | null }
  | { type: "ADD_FOLDER"; payload: string }
  | { type: "ADD_NOTE"; payload: { folderId: string } }
  | {
      type: "UPDATE_NOTE";
      payload: { noteId: string; data: Partial<Omit<Note, "id" | "updatedAt">> };
    }
  | { type: "DELETE_NOTE"; payload: string };

// Reducer
const noteReducer = (state: NoteState, action: NoteAction): NoteState => {
  switch (action.type) {
    case "SELECT_FOLDER": {
      const notesInFolder = state.notes
        .filter((note) => note.folderId === action.payload)
        .sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      return {
        ...state,
        activeFolderId: action.payload,
        activeNoteId: notesInFolder.length > 0 ? notesInFolder[0].id : null,
      };
    }
    case "SELECT_NOTE":
      return { ...state, activeNoteId: action.payload };
    case "ADD_FOLDER":
      const newFolder: Folder = {
        id: crypto.randomUUID(),
        name: action.payload,
      };
      return { ...state, folders: [...state.folders, newFolder] };
    case "ADD_NOTE":
      const newNote: Note = {
        id: crypto.randomUUID(),
        folderId: action.payload.folderId,
        title: "Untitled Note",
        content: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return {
        ...state,
        notes: [newNote, ...state.notes],
        activeNoteId: newNote.id,
      };
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.noteId
            ? { ...note, ...action.payload.data, updatedAt: new Date().toISOString() }
            : note
        ),
      };
    case "DELETE_NOTE": {
      const notesAfterDelete = state.notes.filter(
        (note) => note.id !== action.payload
      );
      let newActiveNoteId = state.activeNoteId;
      if (state.activeNoteId === action.payload) {
        const notesInSameFolder = notesAfterDelete
          .filter((note) => note.folderId === state.activeFolderId)
          .sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        newActiveNoteId = notesInSameFolder.length > 0 ? notesInSameFolder[0].id : null;
      }
      return {
        ...state,
        notes: notesAfterDelete,
        activeNoteId: newActiveNoteId,
      };
    }
    default:
      return state;
  }
};

// Context
interface NoteContextType {
  state: NoteState;
  dispatch: Dispatch<NoteAction>;
  activeNote: Note | undefined;
  selectFolder: (folderId: string) => void;
  selectNote: (noteId: string | null) => void;
  addFolder: (name: string) => void;
  addNote: (folderId: string) => void;
  updateNote: (noteId: string, data: Partial<Omit<Note, "id" | "updatedAt">>) => void;
  deleteNote: (noteId: string) => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

// Provider
export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(noteReducer, {
    folders: initialFolders,
    notes: initialNotes,
    activeFolderId: null,
    activeNoteId: null,
  });

  useEffect(() => {
    // Select first folder and first note on initial load
    if (state.folders.length > 0 && !state.activeFolderId) {
      dispatch({ type: "SELECT_FOLDER", payload: state.folders[0].id });
    }
  }, [state.folders, state.activeFolderId]);

  const activeNote = state.notes.find(
    (note) => note.id === state.activeNoteId
  );

  const selectFolder = (folderId: string) => {
    dispatch({ type: "SELECT_FOLDER", payload: folderId });
  };

  const selectNote = (noteId: string | null) => {
    dispatch({ type: "SELECT_NOTE", payload: noteId });
  };

  const addFolder = (name: string) => {
    dispatch({ type: "ADD_FOLDER", payload: name });
  };

  const addNote = (folderId: string) => {
    dispatch({ type: "ADD_NOTE", payload: { folderId } });
  };

  const updateNote = (noteId: string, data: Partial<Omit<Note, "id" | "updatedAt">>) => {
    dispatch({ type: "UPDATE_NOTE", payload: { noteId, data } });
  };

  const deleteNote = (noteId: string) => {
    dispatch({ type: "DELETE_NOTE", payload: noteId });
  };

  const value = {
    state,
    dispatch,
    folders: state.folders,
    notes: state.notes,
    activeFolderId: state.activeFolderId,
    activeNoteId: state.activeNoteId,
    activeNote,
    selectFolder,
    selectNote,
    addFolder,
    addNote,
    updateNote,
    deleteNote,
  };

  return (
    <NoteContext.Provider value={value}>{children}</NoteContext.Provider>
  );
};

// Hook
export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error("useNoteContext must be used within a NoteProvider");
  }
  return { ...context, ...context.state };
};
