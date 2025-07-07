module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
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
  