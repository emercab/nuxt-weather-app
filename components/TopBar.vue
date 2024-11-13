<template>
  <header
    class="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800"
  >
    <div class="flex items-center">
      <img
        src="https://emersoncabrera.com/img/logo.png"
        alt="Logo"
        class="h-12 w-12 mr-3"
      />
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Weather & Image Search
      </h1>
    </div>
    <button @click="toggleTheme" class="text-gray-800 dark:text-gray-200">
      <span v-if="theme === 'light'" class="text-xl">🌞</span>
      <span v-else class="text-xl">🌙</span>
    </button>
  </header>
</template>

<script setup lang="ts">
  const theme = ref("light");

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", theme.value === "dark");
  };
</script>

<style scoped>
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
  }
</style>
