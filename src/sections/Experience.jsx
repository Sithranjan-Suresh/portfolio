import acmResearchShowcase from '../assets/acm-research-showcase.webp'
import biotechClub from '../assets/biotech-club.webp'
import FadeIn from '../components/FadeIn'
import CountUp from '../components/CountUp'

const roles = [
  {
    org: 'ASCEND, ACM Research, UTD',
    title: 'Undergraduate AI Researcher, Variant Generation Lead',
    date: 'Feb – Apr 2026',
    metricCount: { value: 2.4, decimals: 1, suffix: '×' },
    metricLabel: 'pass@1 lift · 5.9% → 14.0%',
    subMetric: 'pass@10 6.0% → 16.0%',
    body: 'Led variant generation for a self-generated curriculum plus GRPO pipeline, fine-tuning a DeepSeek-Coder 1.3B model. Built a fault-tolerant pipeline with structured JSON schemas, retry logic, and regex-based recovery that eliminated malformed-output failures entirely, and iterated on error logs across a two-pass generation process to improve variant accuracy by 15%. Automated preprocessing and designed the output schema the downstream RL training pipeline consumed, cutting manual data-prep effort by 50% for the 4-person research team.',
    image: { src: acmResearchShowcase, alt: 'Presenting the ASCEND research poster at the ACM Research Showcase' },
  },
  {
    org: 'Biotech Club, UTD',
    title: 'ML Workshop Instructor and Curriculum Designer',
    date: 'Mar – May 2026 · Incoming CS Lead, Aug 2026',
    metricCount: { value: 30, suffix: '+' },
    metricLabel: 'students, zero → deployed',
    subMetric: 'AthleteIQ capstone',
    body: 'Designed a 4-week applied ML curriculum for a non-technical audience and took 30+ students from zero ML background to independently deploying live FastAPI prediction apps. Built AthleteIQ, a full-stack injury-risk classification app with a FastAPI backend and a live SVG gauge frontend, as the capstone project the whole curriculum was built around.',
    image: { src: biotechClub, alt: 'Teaching the AthleteIQ capstone during the Biotech Club ML workshop' },
  },
  {
    org: 'AFA CyberPatriot',
    title: 'Co-Captain',
    date: 'Oct 2023 – Jan 2025',
    metric: 'Top 200',
    metricLabel: 'of 3,000+ teams nationally',
    subMetric: null,
    body: 'Led a 6-member team to a Top 200 finish nationally out of 3,000+ teams, owning system hardening across Windows, Linux, and Cisco networking environments.',
    image: null,
  },
]

function Experience() {
  return (
    <section id="experience" className="py-28">
      <div className="flex items-baseline gap-4 mb-16">
        <h2 className="font-display italic text-4xl sm:text-5xl">Experience</h2>
        <span className="h-px flex-1 bg-muted/20" />
        <span className="font-mono text-xs text-muted uppercase tracking-widest">03 files</span>
      </div>

      <div className="flex flex-col gap-20 sm:gap-28">
        {roles.map((role, i) => {
          const reversed = i % 2 === 1
          return (
            <FadeIn
              key={role.org}
              as="article"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-start"
            >
              <div
                className={`lg:col-span-4 ${reversed ? 'lg:order-2 lg:text-right' : 'lg:order-1'}`}
              >
                <p className="font-mono text-xs text-muted uppercase tracking-wide">{role.org}</p>
                <p className="font-mono text-xs text-muted mt-1">{role.date}</p>
                <h3 className="font-semibold text-xl mt-3">{role.title}</h3>
                <p className="font-display italic text-5xl sm:text-6xl text-brass mt-6 leading-none">
                  {role.metricCount ? <CountUp {...role.metricCount} /> : role.metric}
                </p>
                <p className="font-mono text-xs text-muted uppercase tracking-wide mt-2">
                  {role.metricLabel}
                </p>
                {role.subMetric && (
                  <p className="font-mono text-xs text-measure mt-1">{role.subMetric}</p>
                )}
              </div>

              <div className={`lg:col-span-8 ${reversed ? 'lg:order-1' : 'lg:order-2'}`}>
                <p className="text-primary/90 leading-relaxed max-w-2xl">{role.body}</p>
                {role.image && (
                  <div
                    className={`relative mt-6 w-full max-w-md ${reversed ? 'lg:ml-auto' : ''} ${
                      reversed ? '-rotate-1' : 'rotate-1'
                    }`}
                  >
                    <img
                      src={role.image.src}
                      alt={role.image.alt}
                      loading="lazy"
                      className="w-full h-56 object-cover border-4 border-paper shadow-xl shadow-black/40"
                    />
                  </div>
                )}
              </div>
            </FadeIn>
          )
        })}
      </div>

      {/* Leadership & Activities — a marginal note, not another full card */}
      <FadeIn
        as="div"
        className="mt-20 max-w-xl border-l-2 border-brass/50 pl-6 py-1"
      >
        <p className="font-mono text-xs text-muted uppercase tracking-wide">
          Also &middot; Secretary, Roaring Speakers Club (Toastmasters Intl.) &middot; Jul 2026 &ndash;
        </p>
        <p className="mt-2 text-primary/80 leading-relaxed text-sm">
          Elected officer for a Distinguished-status Toastmasters club: official record-keeping,
          correspondence, and cross-organizational reporting with Toastmasters International.
        </p>
      </FadeIn>
    </section>
  )
}

export default Experience
