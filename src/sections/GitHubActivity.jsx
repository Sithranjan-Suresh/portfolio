const GITHUB_USERNAME = 'Sithranjan-Suresh'

// TODO: replace with the two hackathon repos that have the cleanest README and commit history
const pinnedRepos = [
  { name: '[add pinned repo]', description: '[add a one-line description]', href: '#' },
  { name: '[add pinned repo]', description: '[add a one-line description]', href: '#' },
]

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
        className="hidden min-[400px]:block w-full h-auto"
        loading="lazy"
      />

      {/* Simplified fallback for viewports under 400px, where the full calendar grid is unreadable */}
      <a
        href={`https://github.com/${GITHUB_USERNAME}`}
        target="_blank"
        rel="noreferrer"
        className="min-[400px]:hidden block bg-panel p-6 font-mono text-sm text-data-teal hover:underline"
      >
        View contribution history on GitHub &rarr;
      </a>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        {pinnedRepos.map((repo, index) => (
          <a
            key={index}
            href={repo.href}
            className="bg-panel p-6 block hover:border-signal-amber border border-transparent transition-colors motion-reduce:transition-none"
          >
            <p className="font-mono font-semibold text-signal-amber">{repo.name}</p>
            <p className="text-muted text-sm mt-2">{repo.description}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

export default GitHubActivity
