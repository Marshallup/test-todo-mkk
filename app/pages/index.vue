<script setup lang="ts">
const store = useNotesStore();
const notes = computed(() => store.notes);

const deleteTargetId = ref<string | null>(null);
const isDeleteModalOpen = ref(false);

const deleteTargetTitle = computed(() => {
  const note = store.getNoteById(deleteTargetId.value ?? "");
  return note?.title || "Без названия";
});

function onEdit(id: string) {
  navigateTo(`/notes/${id}`);
}
function onDeleteRequest(id: string) {
  deleteTargetId.value = id;
  isDeleteModalOpen.value = true;
}
function onDeleteConfirm() {
  if (deleteTargetId.value) store.deleteNote(deleteTargetId.value);
  deleteTargetId.value = null;
  isDeleteModalOpen.value = false;
}
function onDeleteCancel() {
  deleteTargetId.value = null;
  isDeleteModalOpen.value = false;
}
</script>

<template>
  <div class="notes-page">
    <div class="notes-page__header">
      <h1 class="notes-page__title">Мои заметки</h1>
      <UiBaseButton @click="navigateTo('/notes/new')"> + Создать </UiBaseButton>
    </div>

    <div>
      <ul v-if="notes.length" class="notes-page__grid">
        <li v-for="note in notes" :key="note.id">
          <NotesNoteCard
            :note="note"
            @edit="onEdit(note.id)"
            @delete="onDeleteRequest(note.id)"
          />
        </li>
      </ul>

      <div v-else class="notes-page__empty">
        <p class="notes-page__empty-text">Заметок пока нет</p>
        <UiBaseButton @click="navigateTo('/notes/new')">
          Создать первую заметку
        </UiBaseButton>
      </div>
    </div>

    <UiBaseModal
      v-model:show="isDeleteModalOpen"
      title="Удалить заметку?"
      :message="`«${deleteTargetTitle}» будет удалена безвозвратно.`"
      confirm-label="Удалить"
      cancel-label="Отмена"
      confirm-variant="danger"
      @confirm="onDeleteConfirm"
      @cancel="onDeleteCancel"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/mixins" as *;

.notes-page {
  &__header {
    @include flex-between;
    margin-bottom: $spacing-xl;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-text;
    margin: 0;
  }

  &__grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-md;

    @include respond-to(sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__empty {
    @include flex-center;
    flex-direction: column;
    gap: $spacing-lg;
    padding: $spacing-2xl $spacing-md;
    text-align: center;
  }

  &__empty-text {
    font-size: $font-size-lg;
    color: $color-muted;
    margin: 0;
  }
}
</style>
