/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#12141C',
        panel: '#1B1E29',
        'signal-amber': '#F2A93C',
        'data-teal': '#3ED9C7',
        primary: '#F3F1EA',
        muted: '#878B9E',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
