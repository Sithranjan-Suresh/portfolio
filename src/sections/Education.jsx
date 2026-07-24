import FadeIn from '../components/FadeIn'

function Education() {
  return (
    <section id="education" className="py-10">
      <h2 className="sr-only">Education</h2>
      <FadeIn
        as="div"
        className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 border border-muted/25 px-5 py-3 font-mono text-xs text-muted"
      >
        <span className="text-brass uppercase tracking-wide">Credential</span>
        <span>&middot;</span>
        <span>UT Dallas, B.S. Computer Science, exp. Dec 2028</span>
        <span>&middot;</span>
        <span>Academic Excellence Scholar, full-ride, GPA 3.58</span>
        <span>&middot;</span>
        <span>Coursework: Data Structures &amp; Algorithms, Probability &amp; Statistics</span>
      </FadeIn>
    </section>
  )
}

export default Education
