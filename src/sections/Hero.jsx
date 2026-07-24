function Hero() {
  return (
    <section id="hero" className="py-24 lg:py-32">
      <span className="font-mono text-signal-amber text-sm">01</span>
      <h1 className="font-mono font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-[1.05] mt-4 max-w-3xl">
        SITHRANJAN SURESH.
        <br />
        I BUILD AI SYSTEMS THAT
        <br />
        ACTUALLY HAVE TO WORK.
      </h1>
      <p className="text-muted text-base lg:text-lg mt-6 max-w-xl">
        CS student at UT Dallas. Four hackathons, four placements, including 1st at
        BeanHacks. Aiming for Summer 2027 AI/ML internships.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <a
          href="#experience"
          className="w-full sm:w-auto bg-signal-amber text-canvas font-mono font-semibold px-6 py-3 text-center hover:brightness-110 transition-colors motion-reduce:transition-none"
        >
          See my work
        </a>
        <a
          href="/resume.pdf"
          download
          className="w-full sm:w-auto border border-muted/60 text-primary font-mono font-semibold px-6 py-3 text-center hover:border-signal-amber transition-colors motion-reduce:transition-none"
        >
          Download resume
        </a>
      </div>
    </section>
  )
}

export default Hero
