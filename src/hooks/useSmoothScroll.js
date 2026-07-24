import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const main = document.querySelector('main')
    let skewTween = null

    lenis.on('scroll', ({ velocity }) => {
      if (!main) return
      const clamped = gsap.utils.clamp(-2.5, 2.5, velocity * 0.12)
      skewTween?.kill()
      skewTween = gsap.to(main, {
        skewY: clamped,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: true,
      })
    })

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
      skewTween?.kill()
      if (main) gsap.set(main, { skewY: 0 })
    }
  }, [])
}
