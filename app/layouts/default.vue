<template>
  <div class="layout">
    <header class="layout__header">
      <div class="layout__header-inner">
        <NuxtLink to="/" class="layout__logo">
          <span class="layout__logo-icon">✎</span>
          <span class="layout__logo-text">Заметки</span>
        </NuxtLink>
      </div>
    </header>

    <main class="layout__main">
      <div class="layout__content">
        <slot />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/mixins" as *;

.layout {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;

  &__header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba($color-card, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-bottom: 1px solid $color-border;
  }

  &__header-inner {
    max-width: $bp-lg;
    margin: 0 auto;
    padding: 0 $spacing-md;
    height: 56px;
    @include flex-between;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    text-decoration: none;
    color: $color-text;

    &:hover {
      text-decoration: none;
    }
  }

  &__logo-icon {
    font-size: 20px;
    line-height: 1;
    color: $color-primary;
  }

  &__logo-text {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-text;
  }

  &__main {
    flex: 1;
  }

  &__content {
    max-width: $bp-lg;
    margin: 0 auto;
    padding: $spacing-xl $spacing-md;
  }
}
</style>
