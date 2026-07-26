import { useEffect, useRef, useState } from 'react'
import avatarBase from '../assets/hero-avatar-base.png'
import avatarGlow from '../assets/hero-avatar-glow.png'

/**
 * Base voxel portrait always visible; the cyan-flame layer is masked to a
 * soft circle that eases toward the cursor, so the glow only ever reveals
 * near where the visitor is looking.
 */
function HeroAvatar() {
  const wrapRef = useRef(null)
  const glowRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    Promise.all(
      [avatarBase, avatarGlow].map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image()
            img.onload = resolve
            img.onerror = resolve
            img.src = src
          })
      )
    ).then(() => {
      if (!cancelled) setLoaded(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    const glow = glowRef.current
    if (!wrap || !glow) return

    let raf = null
    let targetX = 0.5
    let targetY = 0.5
    let smoothX = 0.5
    let smoothY = 0.5

    const setFromClient = (clientX, clientY) => {
      const rect = wrap.getBoundingClientRect()
      targetX = (clientX - rect.left) / rect.width
      targetY = (clientY - rect.top) / rect.height
    }

    const onMouseMove = (e) => setFromClient(e.clientX, e.clientY)
    const onTouchMove = (e) => {
      const touch = e.touches[0]
      if (touch) setFromClient(touch.clientX, touch.clientY)
    }

    const tick = () => {
      smoothX += (targetX - smoothX) * 0.1
      smoothY += (targetY - smoothY) * 0.1
      glow.style.setProperty('--x', `${smoothX * 100}%`)
      glow.style.setProperty('--y', `${smoothY * 100}%`)
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchstart', onTouchMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchstart', onTouchMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-full min-h-[22rem] flex items-center justify-center"
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-80 bg-panel animate-pulse" />
        </div>
      )}

      <div
        className={`relative w-full max-w-xs mx-auto transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          src={avatarBase}
          alt="Voxel portrait of Sithranjan Suresh"
          className="relative w-full h-auto select-none pointer-events-none"
          draggable={false}
        />
        <img
          ref={glowRef}
          src={avatarGlow}
          alt=""
          aria-hidden="true"
          className="hero-avatar-glow absolute inset-0 w-full h-auto select-none pointer-events-none"
          draggable={false}
        />
      </div>
    </div>
  )
}

export default HeroAvatar
