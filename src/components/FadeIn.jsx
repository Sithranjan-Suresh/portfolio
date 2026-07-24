import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

/**
 * A quiet fade-up, used once the page has resolved past its "signal lock"
 * peak — no scan bar, no blur, just a calm settle into place.
 */
function FadeIn({ as: Tag = 'div', className = '', children, delay = 0, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    gsap.set(el, { opacity: 0, y: 16 })

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [delay])

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  )
}

export default FadeIn
