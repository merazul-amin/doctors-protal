/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#0FCFEC",

          "secondary": "#19D3AE",

          "accent": "#3A4256",

          "neutral": "#141A24",

          "base-100": "#FFFFFF",

          "info": "#3871C7",

          "success": "#4DE099",

          "warning": "#FCA140",

          "error": "#E53449",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}