import type { Note, TodoItem } from "~/types";
import { useNotesStore } from "~/stores/notes";
import { isDeepEqual } from "~/utils/clone";

export function useNoteEditor(initial?: Note) {
  const store = useNotesStore();

  const draft = ref<Note>(
    initial
      ? JSON.parse(JSON.stringify(initial))
      : { id: "", title: "", todos: [], createdAt: 0, updatedAt: 0 },
  );

  const { canUndo, canRedo, undo, redo, snapshotNow } = useDraftHistory(draft);

  const titleRef = ref<{ focus: () => void } | null>(null);
  const showCancelModal = ref(false);
  const showDeleteModal = ref(false);
  function addTodo() {
    snapshotNow();
    draft.value.todos.push({
      id: crypto.randomUUID(),
      text: "",
      completed: false,
    });
  }

  function updateTodo(updated: TodoItem) {
    const existing = draft.value.todos.find((t) => t.id === updated.id);

    if (existing?.completed !== updated.completed) snapshotNow();

    const idx = draft.value.todos.findIndex((t) => t.id === updated.id);

    if (idx !== -1) draft.value.todos[idx] = updated;
  }

  function deleteTodo(id: string) {
    snapshotNow();

    draft.value.todos = draft.value.todos.filter((t) => t.id !== id);
  }

  useEventListener("keydown", (e: KeyboardEvent) => {
    const mod = e.ctrlKey || e.metaKey;

    if (mod && !e.shiftKey && e.key.toLowerCase() === "z") {
      e.preventDefault();
      undo();
    }

    if (mod && e.shiftKey && e.key.toLowerCase() === "z") {
      e.preventDefault();
      redo();
    }
  });

  const canSave = computed(() => !!draft.value.title.trim());
  const hasContent = computed(
    () => !!draft.value.title.trim() || draft.value.todos.length > 0,
  );
  const isDirty = computed(() => !isDeepEqual(draft.value, initial));

  onMounted(() => titleRef.value?.focus());

  return {
    draft,
    titleRef,
    showCancelModal,
    showDeleteModal,
    store,
    canSave,
    hasContent,
    isDirty,
    canUndo,
    canRedo,
    undo,
    redo,
    addTodo,
    updateTodo,
    deleteTodo,
  };
}
