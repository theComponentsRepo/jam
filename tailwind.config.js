/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      screens: {
        'xs': {'min': '0px', 'max': '430px'},
        
        'sm': {'min': '431px', 'max': '767px'},
        // => @media (min-width: 640px and max-width: 767px) { ... }
  
        'md': {'min': '768px', 'max': '1023px'},
        // => @media (min-width: 768px and max-width: 1023px) { ... }
  
        'lg': {'min': '1024px'},
        // => @media (min-width: 1024px and max-width: 1279px) { ... }
  

      },
    },
    plugins: [],
  }
  
