import { useEffect, useRef } from 'react'
import { getNoiseDataUrl } from '../lib/noiseTexture'

// A quiet, constant paper-grain texture — like the tooth of real paper
// under print, not an animated effect.
function NoiseOverlay() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.backgroundImage = `url(${getNoiseDataUrl()})`
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-30 pointer-events-none opacity-[0.05]"
      style={{
        backgroundRepeat: 'repeat',
        backgroundSize: '160px 160px',
        mixBlendMode: 'overlay',
      }}
    />
  )
}

export default NoiseOverlay
