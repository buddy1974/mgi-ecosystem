import type { Config } from 'tailwindcss'

// MGI Design System — extracted from Claude Design v2.4 (LEITSTELLE)
const config: Omit<Config, 'content'> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'mgi-bg':        '#0C0F1A',
        'mgi-sidebar':   '#111827',
        'mgi-card':      '#1E293B',
        'mgi-card-hover':'#243047',
        'mgi-border':    '#1F2D40',
        'mgi-input':     '#1A2332',
        // Text
        'mgi-text':      '#FFFFFF',
        'mgi-muted':     '#94A3B8',
        'mgi-label':     '#4B6070',
        // Status
        'mgi-active':    '#10B981',
        'mgi-attention': '#F59E0B',
        'mgi-risk':      '#EF4444',
        'mgi-build':     '#3B82F6',
        // Delta
        'mgi-up':        '#10B981',
        'mgi-down':      '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'mgi': '10px',
        'mgi-sm': '6px',
        'mgi-badge': '4px',
      },
    },
  },
}

export default config
