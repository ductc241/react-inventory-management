/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      screens: {
        "dark-mode": { raw: "(prefers-color-scheme: dark)" }
      }
    }
  },
  plugins: []
};
