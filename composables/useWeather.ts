import type { WeatherResponse } from '~/types/weather.interface'

export const useWeather = async (city: string): Promise<WeatherResponse> => {
  const config = useRuntimeConfig()
  const API_KEY = config.public.weatherApiKey

  try {
    const url = 'http://api.weatherapi.com/v1/current.json'
    const params = {
      key: API_KEY,
      q: city,
    }
    const response = await $fetch<WeatherResponse>(url, { params })

    return response

  } catch (err: any) {
    if (err?.data?.error?.message) {
      throw new Error(err.data.error.message); // Mensaje específico de la API
    }
    throw new Error('Failed to fetch weather data.');
  }
}
