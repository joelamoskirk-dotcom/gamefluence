/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        gaming: '#6d28d9',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        background: '#f9fafb',
        card: '#ffffff',
        text: {
          primary: '#1f2937',
          secondary: '#4b5563',
          muted: '#9ca3af',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'marquee': 'marquee 15s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        glow: {
          '0%': { 
            textShadow: '0 0 5px #fbbf24, 0 0 10px #f59e0b, 0 0 15px #d97706',
            transform: 'scale(1)'
          },
          '100%': { 
            textShadow: '0 0 10px #fbbf24, 0 0 20px #f59e0b, 0 0 30px #d97706, 0 0 40px #b45309',
            transform: 'scale(1.05)'
          },
        },
      }
    },
  },
  plugins: [],
}