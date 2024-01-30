module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],

  
  theme: {
    extend: {
      colors: {
        primary : "rgba(var(--primary-color))",
        secondary : "rgba(var(--secondary-color))",
        ternary : "rgba(var(--ternary-color))",
        mainText : "rgba(var(--text-color))",
        swarm : "rgba(var(--swarm-color))",
      }
    },

  },
  plugins: [],

  variants: {
    extend: {
      opacity: ['group-hover'],
    },
  },
}


