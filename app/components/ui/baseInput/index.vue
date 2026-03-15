<script setup lang="ts">
import { type BaseInputProps } from "./props";

withDefaults(defineProps<BaseInputProps>(), {
  placeholder: "",
  disabled: false,
  strikethrough: false,
});

const model = defineModel<string>({ default: "" });

const inputRef = ref<HTMLInputElement | null>(null);

defineExpose({ focus: () => inputRef.value?.focus() });
</script>

<template>
  <input
    ref="inputRef"
    v-model="model"
    type="text"
    class="base-input"
    :class="{ 'base-input--strikethrough': strikethrough }"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>

<style lang="scss" scoped>
@use "~/assets/scss/mixins" as *;

.base-input {
  flex: 1;
  border: none;
  border-bottom: 1px solid transparent;
  border-radius: 0;
  padding: $spacing-xs 2px;
  font-family: $font-family;
  font-size: $font-size-base;
  color: $color-text;
  background: transparent;
  transition: border-color $transition-base;
  outline: none;

  &::placeholder {
    color: $color-muted;
  }

  &:focus {
    border-bottom-color: $color-border-focus;
  }

  &--strikethrough {
    color: $color-muted;
    text-decoration: line-through;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
