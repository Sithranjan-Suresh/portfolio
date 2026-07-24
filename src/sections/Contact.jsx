function Contact() {
  return (
    <section id="contact" className="py-24 pb-32">
      <span className="font-mono text-signal-amber text-sm">11</span>
      <h2 className="font-mono font-bold text-2xl sm:text-3xl mt-2 mb-8">LET&rsquo;S TALK</h2>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-sm">
        <a
          href="/resume.pdf"
          download
          className="bg-signal-amber text-base font-semibold px-6 py-3 hover:brightness-110 transition-colors motion-reduce:transition-none"
        >
          Download resume
        </a>
        <a href="mailto:sithranjan.suresh@gmail.com" className="text-primary/90 hover:text-signal-amber transition-colors motion-reduce:transition-none">
          Email
        </a>
        <a
          href="#"
          className="text-primary/90 hover:text-signal-amber transition-colors motion-reduce:transition-none"
        >
          {/* TODO: replace with real LinkedIn profile URL */}
          LinkedIn [add link]
        </a>
        <a
          href="https://github.com/Sithranjan-Suresh"
          target="_blank"
          rel="noreferrer"
          className="text-primary/90 hover:text-signal-amber transition-colors motion-reduce:transition-none"
        >
          GitHub
        </a>
      </div>
    </section>
  )
}

export default Contact
