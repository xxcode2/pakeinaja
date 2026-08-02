/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        pine: {
          950: "#141d17",
          900: "#1c2a20",
          800: "#243529",
          700: "#33473a",
        },
        bone: {
          50: "#f8f5ec",
          100: "#f1ecdf",
          200: "#e6dfc9",
        },
        mustard: {
          400: "#e0b155",
          500: "#d9a441",
          600: "#b9862f",
        },
        brick: {
          500: "#b5482a",
          600: "#963a20",
        },
        sage: {
          400: "#8fa384",
          500: "#7c9070",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-tag)", "monospace"],
      },
      borderRadius: {
        tag: "4px",
      },
    },
  },
  plugins: [],
};
