/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0CAFFF",

          secondary: "#007FFF",

          "base-100": "#f3f4f6",

          info: "#3abff8",

          success: "#36d399",

          warning: "#fbbd23",

          error: "#f87272",
        },
      },
    ],
  },

  plugins: [require("daisyui"), require('flowbite/plugin')],
};
