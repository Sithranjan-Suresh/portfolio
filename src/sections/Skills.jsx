import { useEffect, useRef } from 'react'
import FadeIn from '../components/FadeIn'
import { gsap, prefersReducedMotion } from '../lib/gsap'

const skillGroups = [
  {
    title: 'Building AI systems',
    items: ['Python', 'Groq', 'LangChain', 'RAG', 'LLMs', 'NLP', 'LLM quantization', 'model evaluation', 'prompt/context engineering'],
  },
  {
    title: 'Data & classical ML',
    items: ['Pandas', 'NumPy', 'scikit-learn', 'feature engineering', 'empirical Bayes methods', 'data pipelines'],
  },
  {
    title: 'Backend & infrastructure',
    items: ['FastAPI', 'Flask', 'Docker', 'REST APIs', 'SSE streaming', 'SQLite', 'Supabase', 'Vercel', 'Git', 'Linux'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Vite', 'HTML/CSS', 'JavaScript'],
  },
  {
    title: 'Languages',
    items: ['Python', 'Java', 'C++', 'JavaScript', 'SQL'],
  },
]

const learningPath = [
  { label: 'PYTHON', status: 'solid' },
  { label: 'ML', status: 'solid' },
  { label: 'DL', status: 'solid' },
  { label: 'NLP', status: 'solid' },
  { label: 'GEN AI', status: 'solid' },
  { label: 'AI INTERNSHIP', status: 'current' },
]

function Skills() {
  const pathRef = useRef(null)

  useEffect(() => {
    const el = pathRef.current
    if (!el) return

    const dots = el.querySelectorAll('[data-lp-dot]')
    const lines = el.querySelectorAll('[data-lp-line]')

    if (prefersReducedMotion()) {
      gsap.set(dots, { scale: 1 })
      gsap.set(lines, { scaleX: 1 })
      return
    }

    gsap.set(dots, { scale: 0 })
    gsap.set(lines, { scaleX: 0, transformOrigin: 'left center' })

    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 80%' } })
    learningPath.forEach((_, i) => {
      tl.to(dots[i], { scale: 1, duration: 0.3, ease: 'back.out(3)' }, i * 0.15)
      if (lines[i]) {
        tl.to(lines[i], { scaleX: 1, duration: 0.25, ease: 'power2.out' }, i * 0.15 + 0.1)
      }
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section id="skills" className="py-28">
      <div className="flex items-baseline gap-4 mb-16">
        <h2 className="font-display italic text-4xl sm:text-5xl">Instrument case</h2>
        <span className="h-px flex-1 bg-muted/20" />
        <span className="font-mono text-xs text-muted uppercase tracking-widest">06</span>
      </div>

      {/* Learning path as a calibration ruler with a "you are here" flag */}
      <div ref={pathRef} className="mb-20">
        <p className="font-mono text-xs text-muted uppercase tracking-wide mb-6">Calibration &middot; skill acquisition order</p>
        <div className="flex items-start justify-between max-w-3xl">
          {learningPath.map((step, index) => (
            <div key={step.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2 relative">
                {step.status === 'current' && (
                  <span className="absolute -top-7 font-mono text-[10px] text-brass whitespace-nowrap">
                    you are here
                  </span>
                )}
                <span
                  data-lp-dot
                  className={`block h-3 w-3 border ${
                    step.status === 'solid'
                      ? 'bg-brass border-brass rotate-45'
                      : 'bg-canvas border-brass rotate-45 animate-pulse'
                  }`}
                />
                <span className="font-mono text-[10px] text-muted whitespace-nowrap">{step.label}</span>
              </div>
              {index < learningPath.length - 1 && (
                <span data-lp-line className="h-px flex-1 bg-muted/30 mx-2 mb-5" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skill inventory as specimen cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillGroups.map((group, i) => (
          <FadeIn
            key={group.title}
            as="div"
            delay={i * 0.06}
            className="border border-muted/20 p-5"
          >
            <p className="font-mono text-[10px] text-brass uppercase tracking-widest mb-3">
              {String(i + 1).padStart(2, '0')} &middot; {group.title}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="font-mono text-xs text-primary/85 border border-muted/25 px-2 py-1"
                >
                  {item}
                </span>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

export default Skills
