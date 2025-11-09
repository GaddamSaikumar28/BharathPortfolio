/** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ... your other extensions
      
      // Add keyframes and animation for the ticker
      // keyframes: {
      //   'fade-in-out': {
      //     '0%, 100%': { opacity: '0', transform: 'translateY(8px)' },
      //     '10%, 90%': { opacity: '1', transform: 'translateY(0)' },
      //   }
      // },
      // animation: {
      //   'fade-in-out': 'fade-in-out 4s ease-in-out infinite', // 4s matches the interval
      // }
       animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'fade-in-fast': 'fadeIn 0.2s ease-out forwards',
        'slide-in-left': 'slideInFromLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInFromRight 0.5s ease-out forwards',
        'infinite-scroll': 'infinite-scroll 40s linear infinite',
      },
      spacing: {
        'headerHeightVariable': '4rem', // Or 'var(--header-height)' if it's a CSS var
      },
      height: {
        'headerHeightVariable': '4rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeInFast: {
          '0%': { opacity: '0', transform: 'scale(0.98)' }, // Slightly different scale
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        animation: {
        'fade-in-out': 'fadeInOut 4s ease-in-out infinite', // Match duration with JS interval
        },
        slideInFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'infinite-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }
    },
  },
  plugins: [],
}
