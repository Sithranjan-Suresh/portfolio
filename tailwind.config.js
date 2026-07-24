/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0A0A0E',
        panel: '#15151D',
        signal: '#FF3355',
        steel: '#7FA8FF',
        primary: '#F5F4F0',
        muted: '#8A8B95',
      },
      fontFamily: {
        display: ['Anton', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
