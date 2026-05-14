interface Props {
  color?: string
}

export function SquareBars({ color = '#f72585' }: Props) {
  return (
    <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
      <div style={{ width: 20, height: 6, background: color, borderRadius: 1 }} />
      <div style={{ width: 12, height: 6, background: color, borderRadius: 1 }} />
      <div style={{ width: 8, height: 6, background: color, borderRadius: 1 }} />
    </div>
  )
}
