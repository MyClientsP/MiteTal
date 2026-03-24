/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primarymitetal: {
          50: '#f0fdff',
          100: '#b9eaff',
          200: '#11cbf4',
          300: '#0BA2C3',
          400: '#089bb8',
          500: '#067a94',
          600: '#035568',
          700: '#01323e',
          800: '#00131a',
          900: '#000a0d',
        },
      },
    },
  },
  plugins: [],
};
