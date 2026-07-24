import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

/**
 * Splits its text content into word-spans and snaps them into focus
 * (opacity + blur + slight scale overshoot) as the element scrolls into view.
 * Screen readers still get the plain text node structure, just wrapped in spans.
 */
function LockReveal({ as: Tag = 'div', className = '', children, stagger = 0.04, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const words = el.querySelectorAll('[data-lock-word]')

    if (prefersReducedMotion()) {
      gsap.set(words, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' })
      return
    }

    gsap.set(words, { opacity: 0, y: 24, scale: 0.94, filter: 'blur(6px)' })

    const tween = gsap.to(words, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: 'back.out(1.7)',
      stagger,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [stagger])

  const text = typeof children === 'string' ? children : ''
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className} {...props}>
      {words.map((word, i) => (
        <span key={i} data-lock-word className="inline-block will-change-transform">
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

export default LockReveal
