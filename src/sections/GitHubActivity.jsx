const GITHUB_USERNAME = 'Sithranjan-Suresh'

function GitHubActivity() {
  return (
    <section id="github" className="py-24">
      <span className="font-mono text-signal-amber text-sm">07</span>
      <h2 className="font-mono font-bold text-2xl sm:text-3xl mt-2 mb-4">GITHUB</h2>
      <p className="text-muted mb-8">
        I try to keep something in progress most weeks. Below is what that
        actually looks like.
      </p>

      <img
        src={`https://ghchart.rshah.org/3ED9C7/${GITHUB_USERNAME}`}
        alt={`GitHub contribution graph for ${GITHUB_USERNAME}`}
        className="w-full h-auto"
        loading="lazy"
      />
    </section>
  )
}

export default GitHubActivity
