/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-darking': '#1A1A1E'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}