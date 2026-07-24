const GITHUB_USERNAME = 'Sithranjan-Suresh'

const pinnedRepos = [
  {
    name: 'ice-in-his-veins',
    description: 'NFL pressure-performance modeling with empirical Bayes shrinkage. 2nd, AQX Data Bowl 2.0.',
    href: 'https://github.com/Sithranjan-Suresh/ice-in-his-veins',
  },
  {
    name: 'voca',
    description: 'Assistive communication PWA for aphasia patients, powered by Llama 3.3 70B on Groq.',
    href: 'https://github.com/Sithranjan-Suresh/voca',
  },
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
            target="_blank"
            rel="noreferrer"
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
