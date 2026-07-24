import ConfidenceChart from '../components/ConfidenceChart'
import dashboardScreenshot from '../assets/ice-in-his-veins-dashboard.png'
import FadeIn from '../components/FadeIn'

const stackTags = ['Python', 'nflverse', 'empirical Bayes', 'pytest', 'React', 'Vite', 'Vercel']

function FeaturedProject() {
  return (
    <section id="featured-project" className="py-28">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
        <p className="font-mono text-xs text-muted uppercase tracking-widest">
          Featured specimen &middot; 02
        </p>
        <span className="font-mono text-xs text-brass border border-brass/40 px-3 py-1">
          2nd &middot; AQX Data Bowl 2.0
        </span>
      </div>

      <h2 className="font-display italic font-black text-5xl sm:text-7xl leading-[0.95] max-w-3xl">
        Ice in His Veins
      </h2>
      <p className="text-lg text-primary/90 mt-6 max-w-xl leading-relaxed">
        A model that tells you which NFL quarterbacks actually get better under
        pressure, and by how much, instead of trusting the stat everyone already
        knows lies.
      </p>

      {/* Pinboard collage */}
      <FadeIn as="div" className="relative mt-16 mb-16 h-[420px] sm:h-[480px]">
        <div className="absolute left-0 top-4 w-[70%] sm:w-[62%] -rotate-1">
          <a href="https://iceinhisveins.vercel.app/" target="_blank" rel="noreferrer">
            <img
              src={dashboardScreenshot}
              alt="Ice in His Veins live dashboard, showing the confidence-band correction for Caleb Williams and Josh Allen"
              loading="lazy"
              className="w-full h-auto border-4 border-paper shadow-2xl shadow-black/50 hover:rotate-0 transition-transform motion-reduce:transition-none"
            />
          </a>
        </div>

        <div className="absolute right-0 bottom-0 w-[62%] sm:w-[46%] rotate-2 bg-paper text-canvas p-4 shadow-2xl shadow-black/50 hover:rotate-0 transition-transform motion-reduce:transition-none">
          <ConfidenceChart />
        </div>

        <p className="absolute -left-2 sm:left-8 bottom-0 sm:-bottom-6 font-display italic font-black text-6xl sm:text-8xl text-brass leading-none pointer-events-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
          8.2&rarr;4.0
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-20">
        <div className="lg:col-span-7">
          <p className="text-primary/90 leading-relaxed">
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
        </div>

        <div className="lg:col-span-5">
          <p className="font-mono text-xs text-muted uppercase tracking-wide mb-3">Stack</p>
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {stackTags.map((tag) => (
              <span key={tag} className="text-muted border border-muted/30 px-2 py-1">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col items-start gap-3 mt-8 font-mono text-sm">
            <a
              href="https://iceinhisveins.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-measure hover:underline"
            >
              View dashboard &rarr;
            </a>
            <a
              href="https://github.com/Sithranjan-Suresh/ice-in-his-veins"
              target="_blank"
              rel="noreferrer"
              className="text-measure hover:underline"
            >
              View on GitHub &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProject
