<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
    <TopBar />

    <section class="p-6">
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Formulario en CardApp -->
        <CardApp>
          <form @submit.prevent="fetchData">
            <input
              ref="searchInput"
              v-model="city"
              type="text"
              placeholder="Enter city name"
              class="border p-2 rounded w-full"
              @focus="selectText"
            />
            <button type="submit" class="bg-blue-500 text-white p-2 mt-2 rounded w-full">
              Search
            </button>
          </form>
        </CardApp>

        <!-- Resultados del clima en CardApp -->
        <CardApp>
          <div v-if="loading" class="text-center">Loading...</div>
          <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>

          <div v-if="weather && !errorMessage">
            <h2 class="text-xl font-semibold">Weather in {{ city }}, {{ country }}</h2>
            <p>Temperature: {{ weather.current?.temp_c }} °C</p>
            <div class="flex items-center">
              <p>Condition: {{ weather.current?.condition.text }}</p>
              <img
                :src="weather.current?.condition.icon"
                class="inline ml-1"
                alt="Icon weather"
              />
            </div>
          </div>
        </CardApp>
      </div>

      <!-- Imágenes de la ciudad -->
      <div v-if="images && !errorMessage" class="mt-8">
        <h2 class="text-xl font-semibold mb-4 text-center">City Images</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <img
            v-for="(img, index) in images"
            :key="index"
            :src="img.link"
            alt="City image"
            class="w-full h-60 object-cover rounded"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useFetchData } from '~/composables/useFetchData';
import { useGeoIP } from '~/composables/useGeoIP';
import TopBar from '~/components/TopBar.vue';
import CardApp from '~/components/CardApp.vue';

const {
  clientCity,
  clientCountry,
  city,
  country,
  weather,
  images,
  loading,
  errorMessage,
  fetchData,
} = useFetchData();

const searchInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  getGeoIP();
});

const getGeoIP = async () => {
  try {
    const location = await useGeoIP();
    clientCity.value = location.name;
    clientCountry.value = location.country;
    city.value = clientCity.value;
    country.value = clientCountry.value;
    await fetchData();
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Failed to detect location.';
  }
};

const selectText = () => {
  searchInput.value?.select();
};
</script>
