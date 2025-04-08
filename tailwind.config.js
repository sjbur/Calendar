/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'calendar-blue': '#1a73e8',
        'calendar-hover': '#f1f3f4',
        'calendar-border': '#dadce0',
      },
    },
  },
  plugins: [],
} 