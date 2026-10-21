/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#050507',
          900: '#090a0f',
          850: '#0f1118',
          800: '#151722',
          750: '#1c1f2e',
          700: '#25293d',
        },
        lime: {
          DEFAULT: '#ccff00',
          hover: '#b8ee00',
          muted: '#8aa600',
          glow: 'rgba(204, 255, 0, 0.22)',
          glowStrong: 'rgba(204, 255, 0, 0.45)',
        },
        surface: {
          card: 'rgba(12, 13, 19, 0.72)',
          hover: 'rgba(18, 20, 30, 0.85)',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(204, 255, 0, 0.35)',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
