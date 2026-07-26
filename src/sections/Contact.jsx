import FadeIn from '../components/FadeIn'
import GlowCard from '../components/GlowCard'
import ctaBackground from '../assets/cta-background.png'
import ctaFox from '../assets/cta-fox.png'

const ticks = Array.from({ length: 25 }, (_, i) => i)

function Contact() {
  return (
    <section id="contact" className="pt-16">
      {/* Calibration baseline — closes the loop opened in the hero */}
      <div className="relative h-6 overflow-hidden mb-16" aria-hidden="true">
        <div className="absolute inset-x-0 bottom-0 flex justify-between">
          {ticks.map((i) => (
            <span
              key={i}
              className={`w-px bg-muted/40 ${i % 6 === 0 ? 'h-5' : i % 2 === 0 ? 'h-3' : 'h-1.5'}`}
            />
          ))}
        </div>
      </div>

      <div className="relative pt-16 pb-28 px-4 sm:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ctaBackground})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/70 to-canvas/50"
          aria-hidden="true"
        />

        <div className="relative flex justify-center mb-3">
          <span className="inline-flex items-center gap-2 font-mono text-xs text-muted uppercase tracking-[0.3em]">
            <span className="w-1.5 h-1.5 bg-brass" />
            Status: recording now
          </span>
        </div>

        <FadeIn as="div" className="relative max-w-2xl mx-auto">
          <GlowCard className="bg-panel/90 backdrop-blur-sm border border-muted/20 px-8 py-12 sm:px-12 text-center shadow-2xl shadow-black/50">
            <img
              src={ctaFox}
              alt=""
              aria-hidden="true"
              className="absolute -top-24 sm:-top-28 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-auto drop-shadow-[0_16px_20px_rgba(0,0,0,0.6)] select-none pointer-events-none"
              draggable={false}
            />

            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
              Entry closed &middot; 10
            </p>
            <h2 className="font-display italic font-black text-5xl sm:text-7xl leading-none">
              Let&rsquo;s talk.
            </h2>

            <p className="text-primary/90 text-lg mt-6 max-w-lg mx-auto leading-relaxed">
              Open to Summer 2027 AI/ML &amp; Data Engineering internships.
            </p>
            <p className="font-mono text-xs text-muted uppercase tracking-wide mt-2">
              Based in Texas &middot; open to relocation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 font-mono text-sm mt-10">
              <a
                href="/resume.pdf"
                download
                className="bg-brass text-canvas font-semibold px-7 py-3.5 hover:brightness-110 transition-colors motion-reduce:transition-none"
              >
                Download resume
              </a>
              <a href="mailto:sithranjan.suresh@gmail.com" className="text-primary/90 hover:text-brass transition-colors motion-reduce:transition-none">
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/sithranjansuresh/"
                target="_blank"
                rel="noreferrer"
                className="text-primary/90 hover:text-brass transition-colors motion-reduce:transition-none"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Sithranjan-Suresh"
                target="_blank"
                rel="noreferrer"
                className="text-primary/90 hover:text-brass transition-colors motion-reduce:transition-none"
              >
                GitHub
              </a>
            </div>
          </GlowCard>
        </FadeIn>
      </div>
    </section>
  )
}

export default Contact
