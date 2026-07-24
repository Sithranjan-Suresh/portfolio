import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'
import { getNoiseDataUrl } from '../lib/noiseTexture'

function NoiseOverlay() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.backgroundImage = `url(${getNoiseDataUrl()})`

    if (prefersReducedMotion()) {
      el.style.opacity = '0.06'
      return
    }

    const tween = gsap.to(el, {
      opacity: 0.03,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-40 pointer-events-none opacity-90 animate-grain-flicker motion-reduce:animate-none"
      style={{
        backgroundRepeat: 'repeat',
        backgroundSize: '160px 160px',
        mixBlendMode: 'overlay',
      }}
    />
  )
}

export default NoiseOverlay
