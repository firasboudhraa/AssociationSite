/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode : "class",
  theme: {
    extend: {
      container:{
        center: true,
        padding : {
          DEFAULT: '1rem' ,
          sm: '3rem' ,
        }
      },
      colors: {
        bg: '#151c2c',
        bgSoft: '#182237',
        text: 'white',
        textSoft: '#b7bac1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

