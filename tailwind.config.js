/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  daisyui: {
    themes: ["emerald"]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

