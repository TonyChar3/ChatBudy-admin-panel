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
        'settings-section-bg': 'url(https://ik.imagekit.io/bqofr3ncj/tr:w-600/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_22_cx5u7u.png?updatedAt=1704919570769)',
        'settings-custom-bg-top': 'url(https://ik.imagekit.io/bqofr3ncj/tr:w-600/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_15_beduui.png?updatedAt=1704919571002)',
        'settings-custom-bg-bottom':'url(https://ik.imagekit.io/bqofr3ncj/tr:w-600/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_12_ajcnua.png?updatedAt=1704919570479)',
        'chatroom-custom-bg':'url(https://ik.imagekit.io/bqofr3ncj/tr:w-200/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_10_ixotpm.png?updatedAt=1704919570913)',
        'main-logo': 'url(https://ik.imagekit.io/bqofr3ncj/tr:w-600/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_5_wv9ifc.png?updatedAt=1704919570304)',
        'register-mobile-top-right': 'url(https://ik.imagekit.io/bqofr3ncj/tr:w-600/ChatBudy.io_2024-01-10_15_24/3_beymhi.png?updatedAt=1704919570272)',
        'register-mobile-bottom-left': 'url(https://ik.imagekit.io/bqofr3ncj/tr:w-600/ChatBudy.io_2024-01-10_15_24/4_zocacb.png?updatedAt=1704919570127)',
        'login-mobile-top-left': 'url(https://ik.imagekit.io/bqofr3ncj/tr:w-600/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_8_trbrpi.png?updatedAt=1704919570721)',
        'login-top-right': 'url(https://ik.imagekit.io/bqofr3ncj/tr:w-600/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_3_m9c4hv.png?updatedAt=1704919570892)',
        'login-bottom-left': 'url(https://ik.imagekit.io/bqofr3ncj/tr:w-600/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_4_qwzrz1.png?updatedAt=1704919570629)',
        'reset-verify-dollar-sign': 'url(https://ik.imagekit.io/bqofr3ncj/tr:w-600/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_9_pkfjm8.png?updatedAt=1704919570843)',
        'website-company-section': 'url(https://ik.imagekit.io/bqofr3ncj/tr:w-600/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_25_yqxvac.png?updatedAt=1704919570518)',
        'mock-widget-bg': 'url(https://ik.imagekit.io/bqofr3ncj/tr:w-600/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_25_yqxvac.png?updatedAt=1704919570518)'
      },
      animation: {
        swing: 'swing 1s ease-in-out',
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-out-up': 'fade-out-up 0.5s ease-out',
        'growAndShrink': 'growAndShrink 2s ease-in-out infinite',
        'float': 'floating 3s ease-in-out infinite'
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

