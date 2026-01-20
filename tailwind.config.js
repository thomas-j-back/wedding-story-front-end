// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: { extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50:  "#F4F7F5",
          100: "#E3ECE6",
          200: "#C9DCCF",
          300: "#A8C5B0",
          400: "#86AD92",
          500: "#6B8F71",
          600: "#5F7F65",
          700: "#4F6A55",
          800: "#3F5445",
          900: "#2F4035",
        },
      
        accent: {
          sand: "#C2B280",
          clay: "#B08968",
        },
      
        background: "#FFFFFF",
      
        text: {
          primary: "#1F2933",
          muted: "#6B7280",
        },
      
        border: "#E5E7EB",
      }
    } },
    plugins: [],
  };