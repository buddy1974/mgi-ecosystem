interface Props {
  fromColor: string
  toColor: string
}

export function WaveDivider({ fromColor, toColor }: Props) {
  return (
    <div style={{ background: fromColor, lineHeight: 0, overflow: 'hidden' }}>
      <svg
        viewBox="0 0 1440 48"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 48 }}
      >
        <path d="M0,32 C360,0 1080,64 1440,16 L1440,48 L0,48 Z" fill={toColor} />
      </svg>
    </div>
  )
}
