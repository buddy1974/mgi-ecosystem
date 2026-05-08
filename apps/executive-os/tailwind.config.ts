import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'mgi-bg':        '#0C0F1A',
        'mgi-sidebar':   '#111827',
        'mgi-card':      '#1E293B',
        'mgi-card-hover':'#243047',
        'mgi-border':    '#1F2D40',
        'mgi-input':     '#1A2332',
        'mgi-text':      '#FFFFFF',
        'mgi-muted':     '#94A3B8',
        'mgi-label':     '#4B6070',
        'mgi-dim':       '#64748B',
        'rogers-violet': '#3a0ca3',
        'rogers-blue':   '#4361ee',
        'rogers-pink':   '#f72585',
        'status-active':       '#10B981',
        'status-active-bg':    '#064E3B',
        'status-attention':    '#F59E0B',
        'status-attention-bg': '#451A03',
        'status-risk':         '#EF4444',
        'status-risk-bg':      '#450A0A',
        'status-build':        '#3B82F6',
        'status-build-bg':     '#1E3A5F',
        'delta-up':   '#10B981',
        'delta-down': '#EF4444',
        'delta-flat': '#94A3B8',
        'spark-gold': '#D4AF37',
      },
      borderRadius: {
        'card':  '10px',
        'badge': '5px',
      },
    },
  },
  plugins: [],
}

export default config
