function ConfidenceBand({ className = '' }) {
  const tickCount = 7
  const ticks = Array.from({ length: tickCount }, (_, i) => (i / (tickCount - 1)) * 100)

  return (
    <svg
      role="presentation"
      aria-hidden="true"
      viewBox="0 0 400 12"
      preserveAspectRatio="none"
      className={`w-full h-3 text-muted/40 ${className}`}
    >
      {/* end brackets */}
      <path d="M4 2 L1 2 L1 10 L4 10" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M396 2 L399 2 L399 10 L396 10" fill="none" stroke="currentColor" strokeWidth="1" />
      {/* horizontal band */}
      <line x1="1" y1="6" x2="399" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
      {/* tick marks */}
      {ticks.map((percent) => {
        const x = 1 + (percent / 100) * 398
        return <line key={percent} x1={x} y1="3" x2={x} y2="9" stroke="currentColor" strokeWidth="1" />
      })}
    </svg>
  )
}

export default ConfidenceBand
