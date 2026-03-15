<script setup lang="ts">
import { type TodoItemRowProps, type TodoItemRowEmits } from "./props";

const props = defineProps<TodoItemRowProps>();
const emit = defineEmits<TodoItemRowEmits>();

const checkboxId = useId();
const text = computed({
  get: () => props.item.text,
  set: (val) => emit("update", { ...props.item, text: val }),
});

const inputRef = ref<{ focus: () => void } | null>(null);
defineExpose({ focus: () => inputRef.value?.focus() });
</script>

<template>
  <div class="todo-row">
    <input
      :id="checkboxId"
      type="checkbox"
      class="todo-row__checkbox"
      :checked="item.completed"
      @change="
        emit('update', {
          ...item,
          completed: ($event.target as HTMLInputElement).checked,
        })
      "
    />
    <label :for="checkboxId" class="sr-only">{{ item.text || "Пункт" }}</label>
    <UiBaseInput
      ref="inputRef"
      v-model="text"
      placeholder="Текст пункта..."
      :strikethrough="item.completed"
    />
    <button
      type="button"
      class="todo-row__delete"
      title="Удалить пункт"
      aria-label="Удалить пункт"
      @click="emit('delete')"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1 1l12 12M13 1L1 13"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/mixins" as *;

.todo-row {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-xs 0;

  &__checkbox {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    accent-color: $color-primary;
    cursor: pointer;
  }

  &__delete {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    border-radius: $border-radius-sm;
    background: transparent;
    color: $color-muted;
    cursor: pointer;
    transition:
      background-color $transition-base,
      color $transition-base;
    padding: 0;

    &:hover {
      background-color: rgba($color-danger, 0.1);
      color: $color-danger;
    }

    &:focus-visible {
      @include focus-ring;
    }
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
