import type { Note } from "~/types";

const DEBOUNCE_MS = 300;

export function useDraftHistory(draft: Ref<Note>) {
  const history = ref<Note[]>([]);
  const future = ref<Note[]>([]);

  const canUndo = computed(() => history.value.length > 0);
  const canRedo = computed(() => future.value.length > 0);

  let _pendingEntry: Note | null = null;

  const { isPaused, pauseWatch, resumeWatch } = useWatchPause();

  function commit() {
    if (_pendingEntry !== null) {
      history.value.push(_pendingEntry);
      future.value = [];
      _pendingEntry = null;
    }
  }

  const { start: scheduleCommit, stop: cancelCommit } = useTimeoutFn(
    commit,
    DEBOUNCE_MS,
    { immediate: false },
  );

  function snapshotNow() {
    cancelCommit();

    history.value.push(_pendingEntry ?? deepClone(draft.value));

    future.value = [];

    _pendingEntry = null;

    pauseWatch();

    resumeWatch();
  }

  function undo() {
    cancelCommit();
    commit();

    if (!history.value.length) return;

    pauseWatch();

    future.value.push(deepClone(draft.value));
    draft.value = history.value.pop()!;

    resumeWatch();
  }

  function redo() {
    cancelCommit();
    commit();

    if (!future.value.length) return;

    pauseWatch();

    history.value.push(deepClone(draft.value));
    draft.value = future.value.pop()!;

    resumeWatch();
  }

  watch(
    () => JSON.stringify(draft.value),
    (_, old) => {
      if (isPaused()) return;
      if (_pendingEntry === null) _pendingEntry = JSON.parse(old);

      scheduleCommit();
    },
  );

  return { canUndo, canRedo, undo, redo, snapshotNow };
}
