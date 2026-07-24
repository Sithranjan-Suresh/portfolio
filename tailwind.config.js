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
      keyframes: {
        'grain-flicker': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '30%': { transform: 'translate(3%, 2%)' },
          '50%': { transform: 'translate(-1%, 3%)' },
          '70%': { transform: 'translate(2%, -1%)' },
          '90%': { transform: 'translate(-3%, 1%)' },
        },
      },
      animation: {
        'grain-flicker': 'grain-flicker 0.5s steps(2) infinite',
      },
    },
  },
  plugins: [],
}
