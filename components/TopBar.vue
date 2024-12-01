<template>
  <header
    class="flex items-center justify-between px-3 py-3 md:px-6 bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700"
  >
    <!-- Logo y Título -->
    <div class="flex items-center">
      <TopBarLogo />
      <TopBarTitle title="Weather & Image Search" />
    </div>

    <!-- Botón de cambio de tema -->
    <button
      @click="toggleTheme"
      class="flex items-center justify-center text-blue-500"
    >
      <AppIcon :name="themeIcon" size="24px" />
    </button>
  </header>
</template>

<script setup lang="ts">
  import { ref, computed } from "vue";
  import AppIcon from "~/components/AppIcon.vue";

  const theme = ref("light");

  // Computed Property para el icono dinámico
  const themeIcon = computed(() => {
    console.log(
      "Computed themeIcon:",
      theme.value === "light" ? "moon" : "sun"
    ); // Log de depuración
    return theme.value === "light" ? "moon" : "sun";
  });

  // Alternar tema
  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", theme.value === "dark");

    // Guardar preferencia en LocalStorage
    if (import.meta.client) {
      localStorage.setItem("theme", theme.value);
    }
  };

  // Inicializar el tema al montar
  if (import.meta.client) {
    const savedTheme = localStorage.getItem("theme");
    theme.value = savedTheme || "light";
    document.documentElement.classList.toggle("dark", theme.value === "dark");
  }
</script>
