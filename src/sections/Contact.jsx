import FadeIn from '../components/FadeIn'

const ticks = Array.from({ length: 25 }, (_, i) => i)

function Contact() {
  return (
    <section id="contact" className="pt-16 pb-28">
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

      <FadeIn as="div">
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Entry closed &middot; 10</p>
        <h2 className="font-display italic font-black text-5xl sm:text-7xl leading-none">
          Let&rsquo;s talk.
        </h2>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-sm mt-10">
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
      </FadeIn>
    </section>
  )
}

export default Contact
