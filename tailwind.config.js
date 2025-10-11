/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enables manual dark/light toggle
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
