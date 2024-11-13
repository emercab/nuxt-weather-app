<template>
  <header
    class="flex items-center justify-between p-4 bg-blue-500 dark:bg-blue-700"
  >
    <div class="flex items-center">
      <img
        src="https://emersoncabrera.com/img/logo.png"
        alt="Logo"
        class="h-12 w-12 mr-3"
      />
      <h1 class="text-2xl font-bold text-white">Weather & Image Search</h1>
    </div>
    <button @click="toggleTheme" class="text-white">
      <span v-if="theme === 'light'" class="text-xl">🌞</span>
      <span v-else class="text-xl">🌙</span>
    </button>
  </header>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";

  const theme = ref("light");

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", theme.value === "dark");

    // Usamos import.meta.client en lugar de process.client
    if (import.meta.client) {
      localStorage.setItem("theme", theme.value);
    }
  };

  onMounted(() => {
    if (import.meta.client) {
      theme.value = localStorage.getItem("theme") || "light";
      if (theme.value === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
  });
</script>
