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
    colors:{
      'primary': '#006590',
      'primary-accent': '#FFFFFF',
      'container': '#C8E6FF',
      'container-accent': '#001E2E',
      'error': '#BA1A1A',
      'error-accent': '#410002',
      'bg': '#FAFCFF',
      'bg-accent': '#001F2A',
      'f': 'black',
      'f-accent': 'white',

      'dark-primary': '#88CEFF',
      'dark-primary-accent': '#00344D',
      'dark-container': '#004C6D',
      'dark-container-accent': '#C8E6FF',
      'dark-error': '#FFB4AB',
      'dark-error-accent': '#690005',
      'dark-bg': '#001F2A',
      'dark-bg-accent': '#BFE9FF',
      'dark-f': 'white',
      'dark-f-accent': 'black',
    }
  },
  plugins: [],
}

