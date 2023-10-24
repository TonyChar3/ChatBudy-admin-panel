/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    fontFamily:{
      sans: ['Fira sans','sans-serif'],
      Noto: ['Noto sans', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'settings-custom-bg-top': 'url(https://res.cloudinary.com/dskpbps9l/image/upload/v1698102776/ChatBudy.io/7_otb9vc.png)',
        'settings-custom-bg-bottom':'url(https://res.cloudinary.com/dskpbps9l/image/upload/v1698103338/ChatBudy.io/Increase_Your_Sales_12_ajcnua.png)',
        'chatroom-custom-bg':'url(https://res.cloudinary.com/dskpbps9l/image/upload/v1698100122/ChatBudy.io/Increase_Your_Sales_10_ixotpm.png)',
        'main-logo': 'url(https://res.cloudinary.com/dskpbps9l/image/upload/v1698064004/ChatBudy.io/Increase_Your_Sales_5_wv9ifc.png)',
        'register-mobile-top-right': 'url(https://res.cloudinary.com/dskpbps9l/image/upload/v1698072791/ChatBudy.io/3_beymhi.png)',
        'register-mobile-bottom-left': 'url(https://res.cloudinary.com/dskpbps9l/image/upload/v1698072802/ChatBudy.io/4_zocacb.png)',
        'login-mobile-top-left': 'url(https://res.cloudinary.com/dskpbps9l/image/upload/v1698067445/ChatBudy.io/Increase_Your_Sales_8_trbrpi.png)',
        'login-top-right': 'url(https://res.cloudinary.com/dskpbps9l/image/upload/v1698063576/ChatBudy.io/Increase_Your_Sales_3_m9c4hv.png)',
        'login-bottom-left': 'url(https://res.cloudinary.com/dskpbps9l/image/upload/v1698063634/ChatBudy.io/Increase_Your_Sales_4_qwzrz1.png)'
      },
      animation: {
        swing: 'swing 1s ease-in-out',
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-out-up': 'fade-out-up 0.5s ease-out',
        'growAndShrink': 'growAndShrink 2s ease-in-out infinite',
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out-up': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'custom-shadow-input': '0px 7px 10px 0px rgba(168,129,212,0.25)',
        'custom-shadow-widget-content': '-3px 0px 19px -3px rgba(0,0,0,0.4)',
        'custom-shadow-widhet-header': 'inset 0px -26px 31px -30px rgba(255,255,255,0.9)'
      }
    },
  },
  plugins: [],
}

