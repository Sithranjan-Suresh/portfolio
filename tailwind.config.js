/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#101215',
        panel: '#191C20',
        brass: '#D4A24C',
        measure: '#6FA0C4',
        paper: '#EDE6D6',
        primary: '#E8E4DC',
        muted: '#8B8D85',
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
