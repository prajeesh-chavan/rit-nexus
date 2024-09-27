/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFD539", // Using a CSS variable
        secondary: "#000080",
        tertiary: "#07294D",
        success: "#5CB85C",
      },
    },
  },
  plugins: [],
};
