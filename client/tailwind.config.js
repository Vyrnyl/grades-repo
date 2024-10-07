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
        pageComponentShadow: '0 2px 5px 2px rgba(0, 0, 0, 0.2)',
        classShadow: '0 10px 10px 10px rgba(0, 0, 0, 0.5)'
      },
      screens: {
        'testScreen': {'max': '1300px'}
      },
      backgroundImage: {
        loginBg: "url(asset/images/background.jpg)"
      }
    },
  },
  plugins: [],
}