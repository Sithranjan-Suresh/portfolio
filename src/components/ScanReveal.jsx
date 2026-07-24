import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

/**
 * Wraps a block and, on scroll into view, sweeps a signal-colored scan bar
 * across it while the content resolves from blur/dim into full focus.
 */
function ScanReveal({ as: Tag = 'div', className = '', children, delay = 0, ...props }) {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const content = contentRef.current
    const bar = barRef.current
    if (!wrapper || !content) return

    if (prefersReducedMotion()) {
      gsap.set(content, { opacity: 1, filter: 'blur(0px)' })
      if (bar) gsap.set(bar, { opacity: 0 })
      return
    }

    gsap.set(content, { opacity: 0.15, filter: 'blur(4px)' })
    if (bar) gsap.set(bar, { xPercent: -100, opacity: 1 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 82%',
      },
      delay,
    })

    if (bar) {
      tl.to(bar, { xPercent: 220, duration: 0.7, ease: 'power2.inOut' }, 0)
      tl.to(bar, { opacity: 0, duration: 0.2 }, 0.5)
    }
    tl.to(content, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }, 0.15)

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [delay])

  return (
    <Tag ref={wrapperRef} className={`relative overflow-hidden ${className}`} {...props}>
      <div
        ref={barRef}
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1/3 pointer-events-none z-10 bg-gradient-to-r from-transparent via-signal/70 to-transparent"
      />
      <div ref={contentRef} className="will-change-[opacity,filter]">
        {children}
      </div>
    </Tag>
  )
}

export default ScanReveal
