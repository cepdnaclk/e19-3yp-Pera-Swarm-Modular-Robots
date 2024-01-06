/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: 'class', // Enable dark mode variant
  
  theme: {
    extend: {},
    colors: {
      // Light theme color palette
      'primary': '#006590',
      'primary-accent': '#FFFFFF',
      'container': '#C8E6FF',
      'container-accent': '#001E2E',
      'error': '#BA1A1A',
      'error-accent': '#410002',
      'bgd': '#FAFCFF',
      'bg-accent': '#001F2A',
      'f': 'black',
      'f-accent': 'white',
      'transparent': 'transparent',


      // Dark theme color palette
      dark: {
        'primary': '#88CEFF',
        'primary-accent': '#00344D',
        'container': '#004C6D',
        'container-accent': '#C8E6FF',
        'error': '#FFB4AB',
        'error-accent': '#690005',
        'bgd': '#001F2A',
        'bg-accent': '#BFE9FF',
        'f': 'white',
        'f-accent': 'black',
        'transparent': 'transparent',

      },
    },
  },
  plugins: [],
}
