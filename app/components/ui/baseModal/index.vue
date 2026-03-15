<script setup lang="ts">
import {
  type BaseModalProps,
  type BaseModalEmits,
  baseModalDefaults,
} from "./props";

const show = defineModel<boolean>("show", { required: true });
const props = withDefaults(defineProps<BaseModalProps>(), baseModalDefaults);
const emit = defineEmits<BaseModalEmits>();

const titleId = useId();

function handleCancel() {
  show.value = false;

  emit("cancel");
}

function handleConfirm() {
  show.value = false;

  emit("confirm");
}

useEventListener("keydown", (event: KeyboardEvent) => {
  if (show.value && event.key === "Escape") handleCancel();
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="modal-overlay"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        @click.self="handleCancel"
      >
        <div class="modal">
          <h2 :id="titleId" class="modal__title">{{ title }}</h2>
          <p v-if="message" class="modal__message">{{ message }}</p>
          <slot />
          <div class="modal__actions">
            <UiBaseButton variant="ghost" @click="handleCancel">
              {{ cancelLabel }}
            </UiBaseButton>
            <UiBaseButton :variant="confirmVariant" @click="handleConfirm">
              {{ confirmLabel }}
            </UiBaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/mixins" as *;

.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  @include flex-center;
  z-index: 100;
  padding: $spacing-md;
}

.modal {
  background: $color-card;
  border-radius: $border-radius;
  box-shadow: $shadow-modal;
  padding: $spacing-md;
  width: 100%;
  max-width: 420px;

  @include respond-to(sm) {
    padding: $spacing-xl;
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-text;
    margin: 0 0 $spacing-sm;
  }

  &__message {
    font-size: $font-size-base;
    color: $color-muted;
    margin: 0 0 $spacing-lg;
    line-height: $line-height;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: $spacing-sm;
    margin-top: $spacing-lg;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity $transition-slow;

  .modal {
    transition:
      transform $transition-slow,
      opacity $transition-slow;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal {
    transform: scale(0.92);
    opacity: 0;
  }
}
</style>
