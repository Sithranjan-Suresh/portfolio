import sajjadKhader from '../assets/sajjad-khader.jpg'
import cscPodcast from '../assets/csc-podcast.jpg'
import FadeIn from '../components/FadeIn'

const funFacts = [
  {
    image: sajjadKhader,
    alt: 'Meeting tech YouTuber Sajjad Khader',
    caption: (
      <>I got to meet Sajjad Khader, one of my favorite tech YouTubers.</>
    ),
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
          className="text-signal hover:underline"
        >
          CSC podcast
        </a>
        , talking through some of this in more detail.
      </>
    ),
  },
]

function About() {
  return (
    <section id="about" className="py-24">
      <span className="font-mono text-signal text-sm">07</span>
      <h2 className="font-mono font-bold text-2xl sm:text-3xl mt-2 mb-8">ABOUT</h2>
      <FadeIn as="div" className="max-w-[38rem] space-y-6 leading-relaxed text-primary/90">
        <p>
          I got into computer science the hard way. I failed the final in my first CS
          class freshman year. Not a close call, an actual fail. I could have taken
          that as a sign I picked the wrong major. Instead it became the thing that
          made me take the subject seriously for the first time, and it&rsquo;s still
          the story I tell when people ask why I do this.
        </p>
        <p>
          I&rsquo;m working through the stack in order, on purpose: Python, then
          classical ML, then deep learning, then NLP, then generative AI, each one a
          prerequisite for actually understanding the next instead of skipping ahead
          and faking it. Next up is landing an AI internship. I&rsquo;m also part of
          Toastmasters, working on public speaking deliberately instead of hoping it
          improves on its own, because half of shipping a technical project is being
          able to explain it clearly to someone who wasn&rsquo;t in the room while
          you built it, whether that&rsquo;s a hackathon judge or an interviewer.
        </p>
        <p>
          I read a lot about discipline and habit-building, run a consistent
          morning routine, and try to ship something new most weeks. I&rsquo;m not
          trying to collect a resume. I&rsquo;m trying to get good enough at this
          that the resume stops being the interesting part.
        </p>
      </FadeIn>

      <FadeIn as="div" delay={0.1} className="max-w-[38rem] mt-10">
        <p className="font-mono text-xs text-muted uppercase tracking-wide mb-4">Fun facts</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {funFacts.map((fact) => (
            <div key={fact.alt} className="bg-panel">
              <img
                src={fact.image}
                alt={fact.alt}
                loading="lazy"
                className="w-full h-40 object-cover"
              />
              <p className="p-5 text-primary/90 leading-relaxed text-sm">{fact.caption}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  )
}

export default About
