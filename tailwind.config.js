/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      blue: "#68BAF5",
      green: "#45CB85",
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
});
