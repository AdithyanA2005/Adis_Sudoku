/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        scaleJump: "scaleJump 0.5s ease-in-out",
      },
      fontFamily: {
        "bagel": ["Bagel Fat One", "cursive"],
        "glitch": ["Rubik Glitch", "cursive"],
      },
      keyframes: {
        scaleJump: {
          "0%": {transform: "scale(0)"},
          "50%": {transform: "scale(1.5)"},
          "100%": {transform: "scale(1)"},
        }
      }
    },
  },
  plugins: [],
}
