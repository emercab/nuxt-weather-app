// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  imports: {
    dirs: ['utils']
  },
  runtimeConfig: {
    public: {
      weatherApiKey: process.env.WEATHER_API_API_KEY,
      googleApiKey: process.env.GOOGLE_API_KEY,
      customSearchCx: process.env.CUSTOM_SEARCH_CX
    }
  },
  typescript: {
    strict: true
  }
})