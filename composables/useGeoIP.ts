import type { geoIPResponse, cityData } from '~/types/geoIP.interface'

export const useGeoIP = async (): Promise<cityData> => {
  try {
    const data = await $fetch<geoIPResponse>('http://ip-api.com/json/')

    if (data.status !== 'success') {
      throw new Error('Invalid GeoIP response.')
    }

    return {
      name: data.city,
      country: data.country
    }
  } catch (error) {
    console.error('Error fetching GeoIP data:', error)
    throw new Error('Failed to fetch GeoIP data')
  }
}
