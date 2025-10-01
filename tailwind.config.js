const tailwindcolors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        ...tailwindcolors
      }
    }
  },
  plugins: []
};
