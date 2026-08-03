/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        ink: {
          950: 'var(--ink-950)',
          900: 'var(--ink-900)',
          850: 'var(--ink-850)',
          800: 'var(--ink-800)',
          700: 'var(--ink-700)',
          600: 'var(--ink-600)',
        },
        line: {
          DEFAULT: 'var(--line)',
          hi: 'var(--line-hi)',
        },
        accent: {
          indigo: {
            600: 'var(--indigo-600)',
            DEFAULT: 'var(--indigo)',
          },
          violet: 'var(--violet)',
          magenta: 'var(--magenta)',
          pink: 'var(--pink)',
          rose: 'var(--rose)',
        },
        t: {
          hi: 'var(--t-hi)',
          mid: 'var(--t-mid)',
          lo: 'var(--t-lo)',
          dim: 'var(--t-dim)',
        },
        label: 'var(--label)',
        action: {
          DEFAULT: 'var(--action)',
          hover: 'var(--action-hover)',
          active: 'var(--action-active)',
        },
      },
      spacing: {
        'sp-1': '4px',
        'sp-2': '8px',
        'sp-3': '12px',
        'sp-4': '16px',
        'sp-6': '24px',
        'sp-8': '32px',
        'sp-12': '48px',
        'sp-16': '64px',
        'sp-24': '96px',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '18px',
        full: '9999px',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(.2, .85, .3, 1)',
      },
      transitionDuration: {
        micro: '180ms',
        transition: '300ms',
        hero: '900ms',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
