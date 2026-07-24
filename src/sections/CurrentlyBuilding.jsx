import FadeIn from '../components/FadeIn'

// Set to a short description once something is actively in progress.
// Per the content draft: leave this section's "Right now" line out entirely
// while nothing is mid-build, rather than showing a fake placeholder.
const currentlyBuilding = null

function CurrentlyBuilding() {
  return (
    <section id="building" className="py-10">
      <FadeIn as="div" className="flex items-center gap-3">
        <span className="h-2 w-2 bg-brass animate-pulse" aria-hidden="true" />
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          Status &mdash; recording now
        </h2>
      </FadeIn>

      {currentlyBuilding && (
        <p className="text-primary/90 leading-relaxed mt-4">{currentlyBuilding}</p>
      )}

      <p className="font-display italic text-2xl sm:text-3xl mt-4">
        Open to Summer 2027 AI/ML &amp; Data Engineering internships.
      </p>
      <p className="font-mono text-xs text-muted mt-2">Based in Texas &middot; open to relocation</p>
    </section>
  )
}

export default CurrentlyBuilding
