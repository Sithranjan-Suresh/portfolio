import sajjadKhader from '../assets/sajjad-khader.jpg'
import cscPodcast from '../assets/csc-podcast.jpg'
import FadeIn from '../components/FadeIn'

const funFacts = [
  {
    image: sajjadKhader,
    alt: 'Meeting tech YouTuber Sajjad Khader',
    caption: <>Met Sajjad Khader, one of my favorite tech YouTubers.</>,
    rotate: '-rotate-2',
  },
  {
    image: cscPodcast,
    alt: 'Guest appearance on the CSC podcast',
    caption: (
      <>
        Guested on the{' '}
        <a
          href="https://www.youtube.com/watch?v=gmdQzlSkZLM"
          target="_blank"
          rel="noreferrer"
          className="text-brass hover:underline"
        >
          CSC podcast
        </a>
        .
      </>
    ),
    rotate: 'rotate-2',
  },
]

function About() {
  return (
    <section id="about" className="py-28">
      <div className="flex items-baseline gap-4 mb-16">
        <h2 className="font-display italic text-4xl sm:text-5xl">About the researcher</h2>
        <span className="h-px flex-1 bg-muted/20" />
        <span className="font-mono text-xs text-muted uppercase tracking-widest">07</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <FadeIn as="p" className="font-display italic text-3xl sm:text-4xl leading-tight text-brass max-w-xl">
            &ldquo;I failed the final in my first CS class, freshman year of high
            school. Not a close call, an actual fail.&rdquo;
          </FadeIn>

          <FadeIn as="div" delay={0.1} className="space-y-5 leading-relaxed text-primary/85 mt-8 max-w-xl">
            <p>
              I could have taken that as a sign I&rsquo;d chosen the wrong path.
              Instead it became the thing that made me take the subject seriously for
              the first time, and it&rsquo;s still the story I tell when people ask why
              I do this.
            </p>
            <p>
              I ended up specifically in AI, not just CS, because it&rsquo;s the first
              area where the code running without errors doesn&rsquo;t mean it&rsquo;s
              right. A model can be confidently, convincingly wrong, and the failure
              mode is silent. That&rsquo;s a harder problem than a stack trace, and
              it&rsquo;s the same problem Ice in His Veins is built around: catching the
              cases where a system sounds sure of itself and shouldn&rsquo;t be.
            </p>
            <p>
              I&rsquo;m working through the stack in order, on purpose: Python, then
              classical ML, then deep learning, then NLP, then generative AI, each one
              a prerequisite for actually understanding the next instead of skipping
              ahead and faking it. Next up is landing an AI internship. I&rsquo;m also
              part of Toastmasters, working on public speaking deliberately, because
              half of shipping a technical project is being able to explain it clearly
              to someone who wasn&rsquo;t in the room while you built it.
            </p>
            <p>
              I read a lot about discipline and habit-building, run a consistent
              morning routine, and try to ship something new most weeks. I&rsquo;m not
              trying to collect a resume. I&rsquo;m trying to get good enough at this
              that the resume stops being the interesting part.
            </p>
          </FadeIn>
        </div>

        <div className="lg:col-span-5 relative">
          <p className="font-mono text-xs text-muted uppercase tracking-wide mb-6">
            Margin notes
          </p>
          <div className="relative h-[27rem] sm:h-96">
            {funFacts.map((fact, i) => (
              <FadeIn
                key={fact.alt}
                as="div"
                delay={i * 0.12}
                className={`absolute w-48 sm:w-56 bg-paper text-canvas p-3 shadow-xl shadow-black/40 ${fact.rotate} hover:rotate-0 hover:z-10 transition-transform motion-reduce:transition-none ${
                  i === 0 ? 'top-0 left-0' : 'top-52 left-4 sm:top-40 sm:left-28'
                }`}
              >
                <img
                  src={fact.image}
                  alt={fact.alt}
                  loading="lazy"
                  className="w-full h-32 object-cover object-top"
                />
                <p className="text-xs leading-snug mt-2">{fact.caption}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
