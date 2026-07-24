import { useEffect, useRef } from 'react'
import ScanReveal from '../components/ScanReveal'
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
    <section id="skills" className="py-24">
      <span className="font-mono text-signal text-sm">06</span>
      <h2 className="font-mono font-bold text-2xl sm:text-3xl mt-2 mb-8">STACK</h2>

      <ScanReveal as="div" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 font-mono text-sm">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-muted uppercase tracking-wide mb-3">{group.title}</h3>
            <ul className="space-y-1.5">
              {group.items.map((item) => (
                <li key={item} className="text-primary/90">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ScanReveal>

      <div ref={pathRef} className="bg-panel p-6 sm:p-8 mt-10">
        <h3 className="font-mono text-xs text-muted uppercase tracking-wide mb-4">Learning Path</h3>
        <div className="flex items-center justify-between max-w-2xl">
          {learningPath.map((step, index) => (
            <div key={step.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <span
                  data-lp-dot
                  className={`block h-3 w-3 rounded-full border ${
                    step.status === 'solid'
                      ? 'bg-signal border-signal'
                      : step.status === 'current'
                        ? 'bg-canvas border-signal'
                        : 'bg-canvas border-muted/60'
                  }`}
                />
                <span className="font-mono text-xs text-muted whitespace-nowrap">{step.label}</span>
              </div>
              {index < learningPath.length - 1 && (
                <span data-lp-line className="h-px flex-1 bg-muted/30 mx-2 mb-5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
