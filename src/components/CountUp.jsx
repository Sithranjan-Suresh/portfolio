import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

/** Animates a number from 0 to `value` once scrolled into view. */
function CountUp({ value, decimals = 0, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(prefersReducedMotion() ? value : 0)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const counter = { n: 0 }
    const tween = gsap.to(counter, {
      n: value,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => setDisplay(counter.n),
    })

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
