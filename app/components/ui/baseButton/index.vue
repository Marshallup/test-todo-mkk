<script setup lang="ts">
import { type BaseButtonProps, baseButtonDefaults } from "./props";

withDefaults(defineProps<BaseButtonProps>(), baseButtonDefaults);
</script>

<template>
  <button
    class="btn"
    :class="[`btn--${variant}`, { 'btn--loading': loading }]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="btn__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/mixins" as *;

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-xs;
  padding: $spacing-sm $spacing-md;
  border: 1px solid transparent;
  border-radius: $border-radius-sm;
  font-family: $font-family;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color $transition-base,
    color $transition-base,
    border-color $transition-base,
    box-shadow $transition-base,
    opacity $transition-base,
    transform $transition-base;
  white-space: nowrap;
  user-select: none;

  &:focus-visible {
    @include focus-ring;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }

  &--primary {
    background-color: $color-primary;
    color: #fff;

    &:hover:not(:disabled) {
      background-color: $color-primary-hover;
      box-shadow: 0 2px 8px rgba($color-primary, 0.25);
    }
  }

  &--secondary {
    background-color: transparent;
    color: $color-primary;
    border-color: $color-primary;

    &:hover:not(:disabled) {
      background-color: rgba($color-primary, 0.06);
      box-shadow: 0 4px 12px rgba($color-primary, 0.15);
    }
  }

  &--danger {
    background-color: $color-danger;
    color: #fff;

    &:hover:not(:disabled) {
      background-color: $color-danger-hover;
      box-shadow: 0 4px 12px rgba($color-danger, 0.35);
    }
  }

  &--ghost {
    background-color: transparent;
    color: $color-muted;
    border-color: transparent;

    &:hover:not(:disabled) {
      background-color: rgba($color-primary, 0.06);
      color: $color-primary;
    }
  }

  &__spinner {
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: btn-spin 0.6s linear infinite;
  }
}

@keyframes btn-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
