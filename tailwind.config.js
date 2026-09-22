/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: { DEFAULT: '#0A0A0B', card: '#141415', hover: '#1C1C1E' },
        gold: { DEFAULT: '#D4A853', light: '#E8C87A', dark: '#B8923E' },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
