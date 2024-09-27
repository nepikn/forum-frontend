import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{js,jsx,ts,tsx,vue,html}",
    "./auth/**/*.{js,jsx,ts,tsx,vue,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#224957",
        success: "#20DF7F",
        light: "#f5f5f5",
      },
    },
  },
  plugins: [],
};
