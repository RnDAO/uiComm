/** @type {import('tailwindcss').Config} */

const colors = {
  primary: {
    DEFAULT: "#5E4F96",
    50: "#F8F6FF",
    100: "#E4DCFF",
    200: "#BBA9FF",
    300: "#8D7CD0",
    400: "#7564B3",
  },
  secondary: {
    DEFAULT: "#225262",
    50: "#F6FDFF",
    100: "#E3F8FF",
    200: "#BCEEFF",
    300: "#8CD3EA",
    400: "#4E90A6",
  },
  info: {
    DEFAULT: "#69A7A4",
    50: "#F7FFFE",
    100: "#D0FBF8",
    200: "#A7F3F0",
    300: "#92DAD6",
    400: "#7DC0BD",
    500: "#39C2C0",
  },
  error: {
    DEFAULT: "#B6435B",
    50: "#FFF0F3",
    100: "#FFC5D1",
    200: "#FD98AE",
    300: "#F06885",
    400: "#D3546F",
  },
  warning: {
    DEFAULT: "#BB6842",
    50: "#FFF5F0",
    100: "#FFD6C3",
    200: "#FFB897",
    300: "#F59467",
    400: "#D87D53",
  },
  yellow: {
    DEFAULT: "#DDAD21",
    50: "#FFFAEA",
    100: "#FFEEBD",
    200: "#FFE28F",
    300: "#FFD761",
    400: "#FFCB33",
  },
  "gray-background": "#EDEDED",
};

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  plugins: [],
};
