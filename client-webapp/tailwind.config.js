/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

