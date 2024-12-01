<template>
  <div
    class="min-h-screen bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
  >
    <TopBar />

    <section class="container px-3 py-6 md:p-8 mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Formulario en CardApp -->
        <AppCard>
          <AppForm :city="city" @search-city="handleSearchCity" />
        </AppCard>

        <!-- Resultados del clima en CardApp -->
        <AppCard>
          <div v-if="loading" class="text-center">Loading...</div>

          <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>

          <div v-if="weather && !errorMessage">
            <h2 class="text-xl font-semibold text-blue-400">
              Weather in {{ city }}, {{ country }}
            </h2>

            <div class="flex justify-start items-center gap-x-4 mt-2">
              <div class="space-y-2">
                <p>
                  <span
                    class="text-amber-500 dark:text-amber-300 mr-1 font-semibold"
                    >Temperature:</span
                  >
                  {{ weather.current?.temp_c.toLocaleString() }} °C
                </p>
                <p>
                  <span
                    class="text-amber-500 dark:text-amber-300 mr-1 font-semibold"
                    >Condition:</span
                  >
                  {{ weather.current?.condition.text }}
                </p>
              </div>

              <img
                :src="weather.current?.condition.icon"
                class="inline ml-1"
                alt="Icon weather"
              />
            </div>
          </div>
        </AppCard>
      </div>

      <div class="flex gap-x-2 text-blue-500">
        <AppIcon name="location" size="24px" />
        <AppIcon name="sun" size="24px" />
        <AppIcon name="moon" size="24px" />
        <AppIcon name="search" size="24px" />
      </div>

      <!-- Imágenes de la ciudad -->
      <div v-if="images && !errorMessage" class="mt-8">
        <h2 class="text-3xl font-semibold mb-4 text-center">City Images</h2>
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
      errorMessage.value = "Failed to detect location.";
    }
  };

  const handleSearchCity = async (searchCity: string) => {
    city.value = searchCity; // Actualizo el estado global
    await fetchData(); // Hago la búsqueda
  };
</script>
