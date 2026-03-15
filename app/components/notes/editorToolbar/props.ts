export interface EditorToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  canSave: boolean;
  showDelete?: boolean;
}

export interface EditorToolbarEmits {
  cancel: [];
  undo: [];
  redo: [];
  delete: [];
  save: [];
}
