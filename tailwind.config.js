/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sogang: {
          50: "#fef2f1",
          100: "#fde6e4",
          200: "#fbcfc9",
          300: "#f7a9a1",
          400: "#f17a6c",
          500: "#e84336",
          600: "#d4271a",
          700: "#b11f15",
          800: "#921d14",
          900: "#791e16",
          950: "#420b08",
          "blue-light": "#4A90E2",
          blue: "#1E3A8A",
          gray: "#6B7280",
          "gray-light": "#F3F4F6",
        },
      },
      fontFamily: {
        sans: [
          "KarrotSans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
