/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#212121'
      },
      boxShadow: {
        pageComponentShadow: '0 2px 5px 2px rgba(0, 0, 0, 0.2)'
      },
      screens: {
        'testScreen': {'max': '1300px'}
      }
    },
  },
  plugins: [],
}