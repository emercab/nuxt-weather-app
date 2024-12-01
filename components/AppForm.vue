<template>
  <form @submit.prevent="onSubmit">
    <input
      ref="searchInput"
      v-model="localCity"
      type="text"
      placeholder="Enter city name"
      class="border p-2 rounded w-full text-gray-700"
      @focus="selectText"
      @click="selectText"
    />
    <button
      type="submit"
      class="bg-blue-500 text-white px-6 py-2 mt-3 rounded-md mx-auto"
    >
      Search
    </button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  // Recibi el estado actual del input desde el padre
  const props = defineProps<{
    city: string | undefined;
  }>();

  // Emitimos eventos al padre
  const emit = defineEmits<{
    (event: 'search-city', city: string): void,
  }>();

  const localCity = ref(props.city); // Mantener una copia local del valor
  const searchInput = ref<HTMLInputElement | null>(null);

  const selectText = () => {
    searchInput.value?.select();
  };

  const onSubmit = () => {
    if (!localCity.value?.trim()) {
      alert("Please enter a valid city name.");
      return;
    }
    emit("search-city", localCity.value.trim()); // Emitimos el evento con el valor actualizado
  };
</script>

<style scoped></style>
