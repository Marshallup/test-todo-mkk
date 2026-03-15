<script setup lang="ts">
import type { EditorToolbarProps, EditorToolbarEmits } from "./props";

defineProps<EditorToolbarProps>();
defineEmits<EditorToolbarEmits>();
</script>

<template>
  <div class="editor-toolbar">
    <UiBaseButton variant="ghost" @click="$emit('cancel')">Отмена</UiBaseButton>
    <div class="editor-toolbar__controls">
      <div class="editor-toolbar__undo-group">
        <UiBaseButton
          variant="secondary"
          :disabled="!canUndo"
          @click="$emit('undo')"
        >
          ↩ Undo
        </UiBaseButton>
        <UiBaseButton
          variant="secondary"
          :disabled="!canRedo"
          @click="$emit('redo')"
        >
          Redo ↪
        </UiBaseButton>
      </div>
      <div class="editor-toolbar__save-group">
        <UiBaseButton
          v-if="showDelete"
          variant="danger"
          @click="$emit('delete')"
          >Удалить</UiBaseButton
        >
        <UiBaseButton
          variant="primary"
          :disabled="!canSave"
          @click="$emit('save')"
        >
          Сохранить
        </UiBaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/mixins" as *;

.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-xl;

  &__controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: $spacing-sm;
    width: 100%;
    justify-content: flex-end;

    @include respond-to(sm) {
      width: auto;
      margin-left: auto;
    }
  }

  &__undo-group {
    display: flex;
    gap: $spacing-xs;
  }

  &__save-group {
    display: flex;
    gap: $spacing-sm;
  }
}
</style>
