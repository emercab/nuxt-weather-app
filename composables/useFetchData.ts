import type { WeatherResponse } from '~/types/weather.interface';

import { useWeather } from './useWeather'
import { useImageSearch } from './useImageSearch'
import type { Item } from '~/types/image.interface';

const city = ref<string | undefined>("");
const country = ref<string | undefined>('')
const weather = ref<WeatherResponse | null>(null);
const images = ref<Item[] | undefined>([])
const loading = ref<boolean>(false)
const errorMessage = ref<string | null>(null)

const fetchData = async () => {
  if (!city.value) {
    errorMessage.value = 'City name is required.'
    return
  }

  loading.value = true
  city.value = capitalize(city.value.trim()) // Capitalize the city name
  errorMessage.value = null

  try {
    const [weatherData, imagesData] = await Promise.all([
      useWeather(city.value),
      useImageSearch(city.value)
    ])
    weather.value = weatherData
    city.value = weatherData.location?.name
    country.value = weatherData.location?.country

    images.value = imagesData

  } catch (err: any) {
    errorMessage.value = err.message; // Asigna el mensaje de error capturado
  } finally {
    loading.value = false
  }
}

export const useFetchData = () => {
  return {
    city,
    country,
    weather,
    images,
    loading,
    errorMessage,
    fetchData
  }
}
