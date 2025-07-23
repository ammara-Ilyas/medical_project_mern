/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        'custom-color': '#1F2B6C',
      },
    },
  },
  plugins: [],
  safelist: [
    'text-custom-color',
    'bg-custom-color',
  ],
}
  