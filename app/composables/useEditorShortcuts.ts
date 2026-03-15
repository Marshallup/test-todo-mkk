interface EditorShortcutsOptions {
  onSave: () => void;
  onCancel: () => void;
  canSave: Ref<boolean> | ComputedRef<boolean>;
}

export function useEditorShortcuts({
  onSave,
  onCancel,
  canSave,
}: EditorShortcutsOptions) {
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      e.stopImmediatePropagation();
      onCancel();
    } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      if (canSave.value) {
        onSave();
      }
    }
  }

  useEventListener("keydown", handleKeydown, { capture: true });
}
