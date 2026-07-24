import acmResearchShowcase from '../assets/acm-research-showcase.webp'
import biotechClub from '../assets/biotech-club.webp'

const roles = [
  {
    org: 'ASCEND, ACM Research, UTD',
    title: 'Undergraduate AI Researcher, Variant Generation Lead',
    date: 'Feb – Apr 2026',
    metric: 'pass@1 5.9% → 14.0%  [2.4x]',
    subMetric: 'pass@10 6.0% → 16.0%',
    body: 'Led variant generation for a self-generated curriculum plus GRPO pipeline, fine-tuning a DeepSeek-Coder 1.3B model and raising pass@1 on Microsoft’s P3 benchmark from 5.9% to 14.0%, a 2.4x improvement, with pass@10 climbing from 6.0% to 16.0%. Built a fault-tolerant pipeline with structured JSON schemas, retry logic, and regex-based recovery that eliminated malformed-output failures entirely, and iterated on error logs across a two-pass generation process with 4-bit quantized DeepSeek-Coder to improve variant accuracy by 15%. Automated preprocessing and designed the output schema the downstream RL training pipeline consumed, cutting manual data-prep effort by 50% for the 4-person research team.',
    image: { src: acmResearchShowcase, alt: 'Presenting the ASCEND research poster at the ACM Research Showcase' },
  },
  {
    org: 'Biotech Club, UTD',
    title: 'ML Workshop Instructor and Curriculum Designer',
    date: 'Mar – May 2026 (incoming CS Lead, Aug 2026)',
    metric: '30+ students',
    subMetric: 'AthleteIQ capstone',
    body: 'Designed a 4-week applied ML curriculum for a non-technical audience and took 30+ students from zero ML background to independently deploying live FastAPI prediction apps. Built AthleteIQ, a full-stack injury-risk classification app with a FastAPI backend and a live SVG gauge frontend, as the capstone project the whole curriculum was built around.',
    image: { src: biotechClub, alt: 'Teaching the AthleteIQ capstone during the Biotech Club ML workshop' },
  },
  {
    org: 'AFA CyberPatriot',
    title: 'Co-Captain',
    date: 'Oct 2023 – Jan 2025',
    metric: 'Top 200 of 3,000+ teams',
    subMetric: null,
    body: 'Led a 6-member team to a Top 200 finish nationally out of 3,000+ teams, owning system hardening across Windows, Linux, and Cisco networking environments.',
    image: null,
  },
]

function Experience() {
  return (
    <section id="experience" className="py-24">
      <span className="font-mono text-signal text-sm">03</span>
      <h2 className="font-mono font-bold text-2xl sm:text-3xl mt-2 mb-8">EXPERIENCE</h2>
      <div className="flex flex-col gap-6">
        {roles.map((role) => (
          <article key={role.org} className="bg-panel p-6 sm:p-8 relative">
            <span className="font-mono text-muted text-xs sm:absolute sm:top-6 sm:right-8 block mb-2 sm:mb-0">
              {role.date}
            </span>
            <p className="text-muted text-sm">{role.org}</p>
            <h3 className="font-semibold text-lg sm:text-xl mt-1">{role.title}</h3>
            <p className="font-mono text-signal text-xl sm:text-2xl mt-4">{role.metric}</p>
            {role.subMetric && <p className="font-mono text-muted text-sm mt-1">{role.subMetric}</p>}
            <p className="mt-4 text-primary/90 leading-relaxed">{role.body}</p>
            {role.image && (
              <img
                src={role.image.src}
                alt={role.image.alt}
                loading="lazy"
                className="mt-6 w-full max-w-md h-56 object-cover"
              />
            )}
          </article>
        ))}
      </div>

      {/* 3.5 Leadership & Activities */}
      <div className="mt-6 bg-panel p-6 sm:p-8">
        <p className="text-muted text-sm">Secretary, Roaring Speakers Club (Toastmasters International) &middot; Jul 2026 – Present</p>
        <p className="mt-3 text-primary/90 leading-relaxed">
          Elected officer for Roaring Speakers, a Distinguished-status Toastmasters club, responsible
          for official record-keeping, correspondence, and cross-organizational reporting. Maintain
          meeting minutes and club records, manage the membership roster and officer records with
          Toastmasters International, and apply parliamentary procedure to formal meeting governance,
          contributing to the club&rsquo;s Distinguished Club status.
        </p>
      </div>
    </section>
  )
}

export default Experience
