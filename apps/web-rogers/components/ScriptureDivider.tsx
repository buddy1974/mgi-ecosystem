const hl = "var(--font-headline, 'Nunito', system-ui, sans-serif)"

interface Props {
  verse: string
  citation: string
}

export function ScriptureDivider({ verse, citation }: Props) {
  return (
    <div style={{
      textAlign: 'center', padding: '48px 20px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: '#0d0120',
    }}>
      <p style={{
        fontFamily: hl, fontStyle: 'italic', fontSize: '1.05rem',
        color: 'rgba(255,255,255,0.60)', maxWidth: 520, margin: '0 auto 8px', lineHeight: 1.7,
      }}>
        &ldquo;{verse}&rdquo;
      </p>
      <p style={{
        fontFamily: hl, fontWeight: 600, fontSize: '0.72rem',
        color: '#7b90f3', letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
        — {citation}
      </p>
    </div>
  )
}
