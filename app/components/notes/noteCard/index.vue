<script setup lang="ts">
import {
  type NoteCardProps,
  type NoteCardEmits,
  noteCardDefaults,
} from "./props";

const props = withDefaults(defineProps<NoteCardProps>(), noteCardDefaults);
const emit = defineEmits<NoteCardEmits>();

const previewTodos = computed(() =>
  props.note.todos.slice(0, props.previewCount),
);
const remaining = computed(() =>
  Math.max(0, props.note.todos.length - props.previewCount!),
);
</script>

<template>
  <article class="note-card">
    <div class="note-card__body">
      <h3 class="note-card__title">{{ note.title || "Без названия" }}</h3>

      <ul v-if="previewTodos.length" class="note-card__todos">
        <li
          v-for="item in previewTodos"
          :key="item.id"
          class="note-card__todo-item"
          :class="{ 'note-card__todo-item--done': item.completed }"
        >
          <span
            class="note-card__todo-dot"
            :class="{ 'note-card__todo-dot--done': item.completed }"
          />
          <span class="note-card__todo-text">{{ item.text }}</span>
        </li>
        <li v-if="remaining > 0" class="note-card__more">
          +{{ remaining }} ещё
        </li>
      </ul>

      <p v-else class="note-card__empty">Нет пунктов</p>
    </div>

    <div class="note-card__footer">
      <UiBaseButton
        variant="ghost"
        size="sm"
        class="note-card__edit"
        @click.stop="emit('edit')"
      >
        Редактировать
      </UiBaseButton>
      <UiBaseButton
        variant="ghost"
        size="sm"
        class="note-card__delete"
        @click.stop="emit('delete')"
      >
        Удалить
      </UiBaseButton>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/mixins" as *;

.note-card {
  background: $color-card;
  border: 1px solid $color-border;
  border-radius: $border-radius;
  box-shadow: $shadow-card;
  display: flex;
  flex-direction: column;
  transition:
    box-shadow $transition-base,
    transform $transition-base;
  cursor: default;

  &:hover {
    box-shadow: $shadow-hover;
    transform: translateY(-1px);
  }

  &__body {
    flex: 1;
    padding: $spacing-lg;
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-text;
    margin: 0 0 $spacing-md;
    @include truncate;
  }

  &__todos {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }

  &__todo-item {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    font-size: $font-size-sm;
    color: $color-text;

    &--done {
      color: $color-muted;
    }
  }

  &__todo-dot {
    flex-shrink: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: $color-primary;

    &--done {
      background-color: $color-muted;
    }
  }

  &__todo-text {
    @include truncate;

    .note-card__todo-item--done & {
      text-decoration: line-through;
    }
  }

  &__more {
    font-size: $font-size-sm;
    color: $color-muted;
    padding-left: 14px;
  }

  &__empty {
    font-size: $font-size-sm;
    color: $color-muted;
    margin: 0;
    font-style: italic;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: $spacing-xs;
    padding: $spacing-sm $spacing-md;
    border-top: 1px solid $color-border;
    cursor: pointer;
  }

  &__edit {
    &:hover {
      color: $color-primary !important;
    }
  }

  &__delete {
    &:hover {
      color: $color-danger !important;
    }
  }
}
</style>
