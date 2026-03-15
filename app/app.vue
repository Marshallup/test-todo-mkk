<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useNotesStore } from "~/stores/notes";

const store = useNotesStore();

store.loadFromStorage();
</script>
