import type { Folder, Note } from './types';

// Function to get data from localStorage
const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    try {
      return JSON.parse(storedValue);
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return defaultValue;
    }
  } else {
    // If no value is found, set the default value in localStorage
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
};


// Function to set data in localStorage
export const setInLocalStorage = <T>(key: string, value: T) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const defaultFolders: Folder[] = [
  { id: '1', name: 'Meeting Notes' },
  { id: '2', name: 'Project Ideas' },
  { id: '3', name: 'Personal Reminders' },
];

const defaultNotes: Note[] = [
  {
    id: '101',
    folderId: '1',
    title: 'Q2 Planning Session',
    content: '- Review Q1 performance.\n- Set key objectives for Q2.\n- Brainstorm new marketing strategies.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: '102',
    folderId: '1',
    title: 'Client Call Follow-up',
    content: 'Send proposal to Acme Corp. Follow up on action items discussed during the call.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: '201',
    folderId: '2',
    title: 'New App Concept',
    content: 'A note-taking app that can export to PDF. Clean, minimal UI. Focus on user experience.',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '301',
    folderId: '3',
    title: 'Grocery List',
    content: '- Milk\n- Bread\n- Eggs\n- Coffee',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const initialFolders: Folder[] = getFromLocalStorage('folders', defaultFolders);
export const initialNotes: Note[] = getFromLocalStorage('notes', defaultNotes);
