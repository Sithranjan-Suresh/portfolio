import { useEffect, useRef, useState } from 'react'
import ConfidenceChart from '../components/ConfidenceChart'
import dashboardScreenshot from '../assets/ice-in-his-veins-dashboard.png'
import ScanReveal from '../components/ScanReveal'
import LockReveal from '../components/LockReveal'
import { gsap, prefersReducedMotion } from '../lib/gsap'

const stackTags = ['Python', 'nflverse', 'empirical Bayes', 'pytest', 'React', 'Vite', 'Vercel']

function FeaturedProject() {
  const panelRef = useRef(null)
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    if (prefersReducedMotion()) {
      setLocked(true)
      return
    }

    gsap.set(panel, { opacity: 0, scale: 0.88 })

    const tween = gsap.to(panel, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(2)',
      scrollTrigger: { trigger: panel, start: 'top 78%' },
      onComplete: () => setLocked(true),
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section id="featured-project" className="py-24">
      <span className="font-mono text-signal text-sm">04</span>
      <h2 className="font-mono font-bold text-2xl sm:text-3xl mt-2 mb-1">FEATURED PROJECT</h2>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-8">
        <LockReveal as="h3" className="font-mono font-bold text-xl">ICE IN HIS VEINS</LockReveal>
        <span className="font-mono text-sm flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full bg-signal transition-opacity duration-500 ${locked ? 'opacity-100' : 'opacity-0'}`}
          />
          <span className="text-signal">2nd &middot; AQX Data Bowl 2.0</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div
          ref={panelRef}
          className={`order-1 bg-panel p-6 flex flex-col gap-6 transition-shadow duration-700 ${
            locked ? 'shadow-[0_0_40px_-8px_rgba(255,51,85,0.5)]' : ''
          }`}
        >
          <ConfidenceChart />
          <a href="https://iceinhisveins.vercel.app/" target="_blank" rel="noreferrer">
            <img
              src={dashboardScreenshot}
              alt="Ice in His Veins live dashboard, showing the confidence-band correction for Caleb Williams and Josh Allen"
              loading="lazy"
              className="w-full h-auto border border-muted/20 hover:border-signal transition-colors motion-reduce:transition-none"
            />
          </a>
        </div>

        <ScanReveal as="div" className="order-2">
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
            <a
              href="https://iceinhisveins.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-steel hover:underline"
            >
              View dashboard
            </a>
            <a
              href="https://github.com/Sithranjan-Suresh/ice-in-his-veins"
              target="_blank"
              rel="noreferrer"
              className="text-steel hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </ScanReveal>
      </div>
    </section>
  )
}

export default FeaturedProject
