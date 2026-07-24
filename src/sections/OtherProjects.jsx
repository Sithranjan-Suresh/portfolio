import underPressureDashboard from '../assets/under-pressure-dashboard.png'
import paletteDashboard from '../assets/palette-dashboard.png'
import vocaSlide from '../assets/voca.png'
import FadeIn from '../components/FadeIn'

const projects = [
  {
    name: 'Palette',
    placement: '1st Place, BeanHacks',
    description:
      'Modeled flavor chemistry as a vector space and used deterministic grid search with greedy farthest-point batch coordination to regenerate optimized drink recipes in under 2 seconds per iteration. Replaced heuristic pricing with a fully auditable costing pipeline. Deployed on Linux via a Dockerized FastAPI/Uvicorn setup with Groq for inference.',
    github: 'https://github.com/Sithranjan-Suresh/palette',
    image: paletteDashboard,
    frame: 'dark',
    size: 'hero',
  },
  {
    name: 'Under Pressure',
    placement: '2nd Place, AQX Data Bowl 1.0',
    description:
      'Applied VAEP to StatsBomb open event data from the 2018 and 2022 World Cups to quantify how team performance holds up, or degrades, under high-pressure game states — real event-level match data, not aggregated box scores.',
    github: 'https://github.com/Sithranjan-Suresh/under-pressure',
    image: underPressureDashboard,
    frame: 'dark',
    size: 'small',
  },
  {
    name: 'Voca',
    placement: 'Award Winner, Ctrl+V Hackathon',
    description:
      'Built for the 50M+ people worldwide living with aphasia. A tap on any of 49 concepts reconstructs into a full spoken sentence via Llama 3.3 70B on Groq, sub-1-second first token — shipped as an installable, offline-capable PWA with WCAG high-contrast mode.',
    github: 'https://github.com/Sithranjan-Suresh/voca',
    image: vocaSlide,
    frame: 'light',
    size: 'small',
  },
]

function ProjectCard({ project, className = '' }) {
  return (
    <article className={`bg-panel border border-muted/15 flex flex-col ${className}`}>
      <div className={`p-4 ${project.frame === 'light' ? 'bg-paper' : 'bg-canvas'}`}>
        <img
          src={project.image}
          alt={`${project.name} preview`}
          loading="lazy"
          className="w-full h-40 sm:h-48 object-contain"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display italic text-2xl">{project.name}</h3>
        <p className="font-mono text-brass text-xs uppercase tracking-wide mt-1">{project.placement}</p>
        <p className="mt-4 text-primary/85 leading-relaxed text-sm flex-1">{project.description}</p>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs text-measure mt-4 hover:underline"
        >
          GitHub &rarr;
        </a>
      </div>
    </article>
  )
}

function OtherProjects() {
  const [hero, ...rest] = projects

  return (
    <section id="projects" className="py-28">
      <div className="flex items-baseline gap-4 mb-16">
        <h2 className="font-display italic text-4xl sm:text-5xl">More specimens</h2>
        <span className="h-px flex-1 bg-muted/20" />
        <span className="font-mono text-xs text-muted uppercase tracking-widest">05</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FadeIn as="div">
          <ProjectCard project={hero} className="h-full" />
        </FadeIn>
        <div className="grid grid-cols-1 gap-6">
          {rest.map((project, i) => (
            <FadeIn key={project.name} as="div" delay={i * 0.1}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OtherProjects
