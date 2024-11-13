<template>
  <section class="p-6">
    <h1 class="text-2xl font-bold mb-4">Weather & Image Search</h1>

    <p v-if="city && country" class="mb-4">
      Your Approximate Location:
      <strong>{{ clientCity }}, {{ clientCountry }}</strong>
    </p>

    <form @submit.prevent="fetchData" class="mb-6">
      <input
        ref="searchInput"
        v-model="city"
        type="text"
        placeholder="Enter city name"
        class="border p-2 rounded w-full"
        @focus="selectText"
        @click="selectText"
      />
      <button
        type="submit"
        class="bg-blue-500 text-white p-2 mt-2 rounded w-full"
      >
        Search
      </button>
    </form>

    <div v-if="loading" class="text-center">Loading...</div>

    <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>

    <div v-if="weather && !errorMessage" class="w-full">
      <h2 class="text-xl font-semibold">
        Weather in {{ city }}, {{ country }}
      </h2>
      <p>Temperature: {{ weather.current?.temp_c }} °C</p>
      <div class="flex items-center">
        <p>Condition: {{ weather.current?.condition.text }}</p>
        <img
          :src="weather.current?.condition.icon"
          class="inline ml-1"
          alt="Icon weather"
        />
      </div>

      <div class="w-full">
        <h2 v-if="images" class="text-xl font-semibold mt-4 text-center">
          City Images
        </h2>
        <div
          class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          <img
            v-for="(img, index) in images"
            :key="index"
            :src="img.link"
            alt="City image"
            class="w-80 h-60 object-cover mt-2"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useFetchData } from "~/composables/useFetchData";
  import { useGeoIP } from "~/composables/useGeoIP";

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
      clientCity.value = capitalize(location.name);
      clientCountry.value = location.country;
      city.value = clientCity.value;
      country.value = clientCountry.value;
      await fetchData();
    } catch (error) {
      console.error(error);
      errorMessage.value = "Failed to detect location.";
    }
  };

  const selectText = () => {
    searchInput.value?.select();
  };
</script>
