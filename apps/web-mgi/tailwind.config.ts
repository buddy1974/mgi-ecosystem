import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'mgi-purple': '#3a0ca3',
        'mgi-pink':   '#f72585',
        'mgi-dark':   '#0a0a0f',
        'mgi-card':   '#111118',
        'mgi-border': '#1f1f2e',
      },
    },
  },
  plugins: [],
}

export default config
