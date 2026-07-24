import LockReveal from '../components/LockReveal'
import Reticle from '../components/Reticle'

function Hero() {
  return (
    <section id="hero" className="relative py-24 lg:py-32 overflow-hidden">
      <Reticle className="absolute -top-10 -right-10 sm:right-0 lg:right-20 w-64 h-64 sm:w-80 sm:h-80 text-signal/30 -z-10" />

      <p className="font-mono text-signal text-sm tracking-widest">
        <span className="text-muted mr-2">01</span>
        ACQUIRING SIGNAL
      </p>

      <h1 className="font-display uppercase text-5xl sm:text-6xl lg:text-8xl leading-[0.95] mt-4 max-w-4xl">
        <LockReveal as="span" className="block">SITHRANJAN SURESH.</LockReveal>
        <LockReveal as="span" className="block">I BUILD AI SYSTEMS THAT</LockReveal>
        <LockReveal as="span" className="block">ACTUALLY HAVE TO WORK.</LockReveal>
      </h1>

      <p className="text-muted text-base lg:text-lg mt-6 max-w-xl">
        CS student at UT Dallas. Four hackathons, four placements, including 1st at
        BeanHacks. Aiming for Summer 2027 AI/ML internships.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <a
          href="#experience"
          className="w-full sm:w-auto bg-signal text-canvas font-mono font-semibold px-6 py-3 text-center hover:brightness-110 transition-colors motion-reduce:transition-none"
        >
          See my work
        </a>
        <a
          href="/resume.pdf"
          download
          className="w-full sm:w-auto border border-muted/60 text-primary font-mono font-semibold px-6 py-3 text-center hover:border-signal transition-colors motion-reduce:transition-none"
        >
          Download resume
        </a>
      </div>
    </section>
  )
}

export default Hero
