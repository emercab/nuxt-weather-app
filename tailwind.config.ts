import type { Config } from 'tailwindcss';

export default <Config>{
  darkMode: 'class', // Habilita el modo oscuro basado en clases
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#3b82f6',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
};
