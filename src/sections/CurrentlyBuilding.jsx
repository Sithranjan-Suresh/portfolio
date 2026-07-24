// Set to a short description once something is actively in progress.
// Per the content draft: leave this section's "Right now" line out entirely
// while nothing is mid-build, rather than showing a fake placeholder.
const currentlyBuilding = null

function CurrentlyBuilding() {
  return (
    <section id="building" className="py-16">
      <span className="font-mono text-signal-amber text-sm">09</span>
      <h2 className="font-mono font-bold text-2xl sm:text-3xl mt-2 mb-6 flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-signal-amber" aria-hidden="true" />
        RIGHT NOW
      </h2>

      {currentlyBuilding && (
        <p className="text-primary/90 leading-relaxed mb-6">{currentlyBuilding}</p>
      )}

      <div className="font-mono text-sm space-y-1">
        <p className="text-signal-amber">
          OPEN TO: Summer 2027 AI/ML &amp; Data Engineering internships
        </p>
        <p className="text-muted">Based in Texas &middot; open to relocation</p>
      </div>
    </section>
  )
}

export default CurrentlyBuilding
