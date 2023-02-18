/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Josefin Sans', 'sans-serif']
      },
      backgroundImage: {
        'background1': "url('/bg1.jpg')",
        'background2': "url('/bg2.jpg')",
        'background3': "url('/bg3.jpg')",
        'card_vip': "url('/card_vip.jpeg')",
        'card_simples': "url('/card_simples.jpeg')"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
