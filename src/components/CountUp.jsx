import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

/**
 * Renders the real final value immediately (never a placeholder zero, so
 * fast scrolls / find-in-page / broken JS timing can never show a wrong
 * number) and, if motion is allowed, plays a brief count-up flourish once
 * scrolled into view starting from a value close to the target, not zero.
 */
function CountUp({ value, decimals = 0, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const counter = { n: value }
    const startFrom = value * 0.6

    const tween = gsap.fromTo(
      counter,
      { n: startFrom },
      {
        n: value,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => setDisplay(counter.n),
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [value])

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString()

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

export default CountUp
