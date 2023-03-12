/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Josefin Sans', 'sans-serif'],
        'slab': ['Josefin Slab', 'sans-serif'],
      },
      backgroundImage: {
        'background1': "url('/bg1.jpg')",
        'background2': "url('/bg2.jpg')",
        'background3': "url('/bg3.jpg')",
        'card_vip': "url('/card_vip.jpeg')",
        'card_simples': "url('/card_simples.jpeg')",
        'animation': "url('/img2.png')",
        'firstCloud': "url('/cloud_1.png')",
        'secondCloud': "url('/cloud_2.png')",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
  ],
}
