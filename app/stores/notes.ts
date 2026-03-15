import { defineStore } from "pinia";
import type { Note } from "~/types";

const STORAGE_KEY = "notes-app-data";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref<Note[]>([]);

  const getNoteById = (id: string) => notes.value.find((n) => n.id === id);

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) notes.value = JSON.parse(raw);
    } catch {
      notes.value = [];
    }
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes.value));
  }

  function createNote(note: Note) {
    notes.value.push(note);
  }

  function updateNote(id: string, patch: Partial<Note>) {
    const idx = notes.value.findIndex((n) => n.id === id);
    const existing = notes.value[idx];
    if (idx !== -1 && existing) {
      notes.value[idx] = { ...existing, ...patch, updatedAt: Date.now() };
    }
  }

  function deleteNote(id: string) {
    notes.value = notes.value.filter((n) => n.id !== id);
  }

  watch(notes, saveToStorage, { deep: true });

  return {
    notes,
    getNoteById,
    loadFromStorage,
    saveToStorage,
    createNote,
    updateNote,
    deleteNote,
  };
});
