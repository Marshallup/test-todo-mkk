import type { Note } from "~/types";

export interface NoteCardProps {
  note: Note;
  previewCount?: number;
}

export const noteCardDefaults = {
  previewCount: 3,
} satisfies Partial<NoteCardProps>;

export interface NoteCardEmits {
  edit: [];
  delete: [];
}
