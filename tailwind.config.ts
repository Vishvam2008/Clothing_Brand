import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      fontFamily: {
        display: ['Outfit', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        bg: {
          primary: '#0a0a0f',
          secondary: '#0f0f18'
        },
        surface: {
          primary: '#12121a',
          secondary: '#1a1a26'
        },
        accent: {
          primary: '#7c3aed',
          secondary: '#06b6d4',
          purple: '#a78bfa',
          cyan: '#22d3ee'
        },
        text: {
          primary: '#e2e8f0',
          secondary: '#94a3b8'
        }
      },
      boxShadow: {
        glow: '0 0 24px rgba(124,58,237,0.22)',
        'glass': '0 10px 30px rgba(0,0,0,0.45)'
      },
      borderColor: {
        glass: 'rgba(124,58,237,0.22)'
      }
    }
  },
  plugins: []
} satisfies Config;

