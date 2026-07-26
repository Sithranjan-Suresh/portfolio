import HeroAvatar from '../components/HeroAvatar'

const ticks = Array.from({ length: 25 }, (_, i) => i)

function Hero() {
  return (
    <section id="hero" className="relative pt-20 sm:pt-28 pb-16">
      <p className="font-mono text-xs text-muted uppercase tracking-[0.3em]">
        Field notes &middot; Entry 01
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 mt-6">
        <div className="relative pl-6 border-l border-muted/30">
          <h1 className="font-display leading-[0.98] text-4xl sm:text-5xl lg:text-7xl">
            <span className="block font-light italic text-muted text-3xl sm:text-4xl lg:text-5xl mb-1">Sithranjan Suresh,</span>
            <span className="block font-black">I build AI systems</span>
            <span className="block font-black">
              that <span className="italic text-brass">actually</span> work.
            </span>
          </h1>

          <p className="text-primary/80 text-lg lg:text-xl mt-8 max-w-lg leading-relaxed">
            CS student at UT Dallas. Four hackathons, four placements, including 1st at
            BeanHacks. Aiming for Summer 2027 AI/ML internships.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-9">
            <a
              href="#featured-project"
              className="w-full sm:w-auto bg-brass text-canvas font-mono text-sm uppercase tracking-wider font-semibold px-7 py-3.5 text-center hover:brightness-110 transition-colors motion-reduce:transition-none"
            >
              See my work
            </a>
            <a
              href="/resume.pdf"
              download
              className="w-full sm:w-auto border border-muted/50 text-primary font-mono text-sm uppercase tracking-wider font-semibold px-7 py-3.5 text-center hover:border-brass transition-colors motion-reduce:transition-none"
            >
              Download resume
            </a>
            <a
              href="https://github.com/Sithranjan-Suresh"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-muted hover:text-brass transition-colors motion-reduce:transition-none"
            >
              GitHub &rarr;
            </a>
          </div>
        </div>

        <div className="hidden lg:block relative h-full min-h-[22rem]">
          <HeroAvatar />
        </div>
      </div>

      {/* Calibration baseline — first appearance of the ruler motif */}
      <div className="mt-16 sm:mt-20 relative h-6 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 flex justify-between">
          {ticks.map((i) => (
            <span
              key={i}
              className={`w-px bg-muted/40 ${i % 6 === 0 ? 'h-5' : i % 2 === 0 ? 'h-3' : 'h-1.5'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
