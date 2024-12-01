<template>
  <h1 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-blue-100">
    {{ props.title }}
  </h1>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title: string;
  }>();
</script>

<style scoped></style>
