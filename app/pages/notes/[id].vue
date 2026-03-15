<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

const store = useNotesStore();
const note = store.getNoteById(id);

if (!note) {
  await navigateTo("/");
}

const {
  draft,
  titleRef,
  addTodo,
  updateTodo,
  deleteTodo,
  showCancelModal,
  showDeleteModal,
  canSave,
  isDirty,
  canUndo,
  canRedo,
  undo,
  redo,
} = useNoteEditor(note);

const todoRowRefs = ref<{ focus: () => void }[]>([]);

async function handleAddTodo() {
  addTodo();
  await nextTick();
  todoRowRefs.value.at(-1)?.focus();
}

function save() {
  draft.value.updatedAt = Date.now();
  store.updateNote(id, draft.value);
  navigateTo("/");
}

function confirmDelete() {
  store.deleteNote(id);
  navigateTo("/");
}

function cancel() {
  if (showCancelModal.value || showDeleteModal.value) {
    showCancelModal.value = false;
    showDeleteModal.value = false;
    return;
  }
  if (isDirty.value) {
    showCancelModal.value = true;
  } else {
    navigateTo("/");
  }
}

useEditorShortcuts({ onSave: save, onCancel: cancel, canSave });
</script>

<template>
  <div class="editor">
    <NotesEditorToolbar
      :can-undo="canUndo"
      :can-redo="canRedo"
      :can-save="canSave"
      :show-delete="true"
      @cancel="cancel"
      @undo="undo"
      @redo="redo"
      @delete="showDeleteModal = true"
      @save="save"
    />

    <UiBaseInput
      ref="titleRef"
      v-model="draft.title"
      class="editor__title"
      placeholder="Заголовок заметки..."
    />

    <ul v-if="draft.todos.length" class="editor__list">
      <li v-for="item in draft.todos" :key="item.id">
        <NotesTodoItemRow
          ref="todoRowRefs"
          :item="item"
          @update="updateTodo"
          @delete="deleteTodo(item.id)"
        />
      </li>
    </ul>

    <UiBaseButton variant="ghost" class="editor__add" @click="handleAddTodo"
      >+ Добавить пункт</UiBaseButton
    >

    <UiBaseModal
      v-model:show="showCancelModal"
      title="Отменить изменения?"
      message="Несохранённые изменения будут потеряны."
      confirm-label="Да, отменить"
      cancel-label="Продолжить"
      @confirm="navigateTo('/')"
    />

    <UiBaseModal
      v-model:show="showDeleteModal"
      title="Удалить заметку?"
      :message="`«${draft.title || 'Без названия'}» будет удалена безвозвратно.`"
      confirm-label="Удалить"
      cancel-label="Отмена"
      confirm-variant="danger"
      @confirm="confirmDelete"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/mixins" as *;

.editor {
  max-width: 720px;
  margin: 0 auto;

  &__title {
    width: 100%;
    border: none;
    border-bottom: 2px solid $color-border;
    border-radius: 0;
    padding: $spacing-sm 0;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    font-family: $font-family;
    color: $color-text;
    background: transparent;
    outline: none;
    margin-bottom: $spacing-lg;
    transition: border-color $transition-base;

    &::placeholder {
      color: $color-muted;
      font-weight: $font-weight-normal;
    }

    &:focus {
      border-bottom-color: $color-primary;
    }
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0 0 $spacing-md;
  }

  &__add {
    margin-top: $spacing-sm;
  }
}
</style>
