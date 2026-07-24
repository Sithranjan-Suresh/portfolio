import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

function Reticle({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const tween = gsap.to(el, {
      x: 24,
      y: -16,
      rotation: 6,
      duration: 6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    return () => tween.kill()
  }, [])

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={`pointer-events-none ${className}`}
    >
      <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="100" y1="0" x2="100" y2="55" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="100" y1="145" x2="100" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="0" y1="100" x2="55" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="145" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="100" cy="100" r="3" fill="currentColor" />
    </svg>
  )
}

export default Reticle
