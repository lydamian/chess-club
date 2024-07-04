/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    extend: {
      colors: {
        'midnightblue': '#151E3F',
      },
    },
  },
  plugins: [
    // Make sure you require daisyui AFTER @tailwindcss/typography in tailwind.config.js
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require('daisyui')
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "nord"],
  },
}

