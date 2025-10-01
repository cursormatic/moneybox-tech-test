const colors = require('tailwindcss/colors');
const borderRadius = require('tailwindcss/borderRadius');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        ...colors
      },
      borders: {
        ...borderRadius
      }
    }
  },
  plugins: []
};
