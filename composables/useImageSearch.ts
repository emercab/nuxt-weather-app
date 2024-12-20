import type { ImageResponse, Item } from '~/types/image.interface'

export const useImageSearch = async (): Promise<Item[]> => {
  const { city, country } = useFetchData()

  const config = useRuntimeConfig()
  const API_KEY = config.public.googleApiKey
  const CX = config.public.customSearchCx
  const url = 'https://www.googleapis.com/customsearch/v1'
  // set random number between 1 and 91 to avoid cache
  const num = Math.floor(Math.random() * 31) + 1
  const params = {
    q: `${city.value}+city+places+${country.value}`,
    searchType: 'image',
    cx: CX,
    key: API_KEY,
    imgType: 'photo',
    imgSize: 'medium',
    dateRestrict: 'y1',
    start: num,
  }

  console.log('Params:', params);

  try {
    const images = await $fetch<ImageResponse>(url, { params })
    console.log('Images:', images);

    if (!images.items || images.items.length === 0) {
      throw new Error('No images found.')
    }

    return images.items
  } catch (err: any) {
    if (err?.data?.error?.message) {
      throw new Error(err.data.error.message)
    }
    else {
      throw new Error('Failed to fetch image data.')
    }
  }
}
