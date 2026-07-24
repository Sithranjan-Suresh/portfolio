import FadeIn from '../components/FadeIn'

function Contact() {
  return (
    <section id="contact" className="py-24 pb-32">
      <span className="font-mono text-signal text-sm">10</span>
      <h2 className="font-mono font-bold text-2xl sm:text-3xl mt-2 mb-8">LET&rsquo;S TALK</h2>

      <FadeIn as="div" className="flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-sm">
        <a
          href="/resume.pdf"
          download
          className="bg-signal text-canvas font-semibold px-6 py-3 hover:brightness-110 transition-colors motion-reduce:transition-none"
        >
          Download resume
        </a>
        <a href="mailto:sithranjan.suresh@gmail.com" className="text-primary/90 hover:text-signal transition-colors motion-reduce:transition-none">
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/sithranjansuresh/"
          target="_blank"
          rel="noreferrer"
          className="text-primary/90 hover:text-signal transition-colors motion-reduce:transition-none"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/Sithranjan-Suresh"
          target="_blank"
          rel="noreferrer"
          className="text-primary/90 hover:text-signal transition-colors motion-reduce:transition-none"
        >
          GitHub
        </a>
      </FadeIn>
    </section>
  )
}

export default Contact
