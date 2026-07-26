import { useRef } from 'react'

/**
 * Card whose border/background glow tracks the cursor, via a CSS radial
 * gradient positioned with --mx/--my — same spotlight mechanism as the
 * hero avatar reveal, just driven by hover instead of always-on tracking.
 */
function GlowCard({ className = '', children }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className={`glow-card ${className}`}>
      <div className="glow-card-sheen" aria-hidden="true" />
      {children}
    </div>
  )
}

export default GlowCard
