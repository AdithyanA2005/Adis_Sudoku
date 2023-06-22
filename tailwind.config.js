/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "bagel": ["Bagel Fat One", "cursive"],
      }
    },
  },
  plugins: [],
}
