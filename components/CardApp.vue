<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white dark:bg-gray-900 shadow p-4 rounded">
      <slot name="form"></slot>
    </div>
    <div class="bg-white dark:bg-gray-900 shadow p-4 rounded">
      <slot name="results"></slot>
    </div>
  </div>
</template>

<style scoped>
  /* Puedes agregar estilos personalizados aquí si lo deseas */
</style>
