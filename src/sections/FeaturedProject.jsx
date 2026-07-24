import ConfidenceChart from '../components/ConfidenceChart'

const stackTags = ['Python', 'nflverse', 'empirical Bayes', 'pytest', 'React', 'Vite', 'Vercel']

function FeaturedProject() {
  return (
    <section id="featured-project" className="py-24">
      <span className="font-mono text-signal-amber text-sm">04</span>
      <h2 className="font-mono font-bold text-2xl sm:text-3xl mt-2 mb-1">FEATURED PROJECT</h2>

      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-8">
        <h3 className="font-mono font-bold text-xl">ICE IN HIS VEINS</h3>
        <span className="font-mono text-signal-amber text-sm">2nd &middot; AQX Data Bowl 2.0</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="order-1 bg-panel p-6 flex items-center">
          <ConfidenceChart />
        </div>

        <div className="order-2">
          <p className="text-lg leading-relaxed">
            A model that tells you which NFL quarterbacks actually get better under
            pressure, and by how much, instead of trusting the stat everyone already
            knows lies.
          </p>

          <p className="mt-6 text-primary/90 leading-relaxed">
            &ldquo;Clutch&rdquo; stats in football get thrown around constantly, but the
            numbers behind them are usually built on tiny samples. A quarterback might
            only face a dozen truly high-pressure dropbacks in a season, so a couple of
            good throws can make him look elite and a couple of bad ones can make him
            look like he chokes, when really you&rsquo;re just looking at noise dressed
            up as signal. I wanted to build something that corrects for that instead of
            reporting the noise like it means something.
          </p>

          <p className="mt-6 text-primary/90 leading-relaxed">
            I pulled 63,555 NFL QB dropbacks from 2023 to 2025 using nflverse and built
            a 5-tier leverage model that scores every play on how much pressure it
            actually carries: how close the game is, how tight the score is, urgency,
            and down-and-distance. Instead of trusting raw completion-percentage-over-
            expectation in the highest-leverage tier, which is exactly where the sample
            sizes are smallest and the noise is worst, I applied empirical Bayes
            shrinkage with 95% confidence intervals per tier. That correction is what
            mattered most: the raw &ldquo;clutch&rdquo; spread looked like an 8.2 point
            swing, but once you account for how little data actually backs the extreme
            cases, the real number shrinks to 4.0 points, a 2.03x overstatement in the
            naive version. I backed the whole analytics engine with an 8-test pytest
            suite before trusting any of it, then shipped a static React/Vite dashboard
            on Vercel with zero runtime dependencies so someone could actually explore
            the results themselves instead of just reading a write-up.
          </p>

          <div className="flex flex-wrap gap-2 mt-6 font-mono text-xs">
            {stackTags.map((tag) => (
              <span key={tag} className="text-muted border border-muted/30 px-2 py-1">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-6 mt-6 font-mono text-sm">
            <a href="#" className="text-data-teal hover:underline">
              {/* TODO: replace with real live dashboard link */}
              View dashboard [add link]
            </a>
            <a
              href="https://github.com/Sithranjan-Suresh/ice-in-his-veins"
              target="_blank"
              rel="noreferrer"
              className="text-data-teal hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProject
