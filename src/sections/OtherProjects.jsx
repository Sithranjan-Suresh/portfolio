import underPressureDashboard from '../assets/under-pressure-dashboard.png'
import paletteDashboard from '../assets/palette-dashboard.png'
import ScanReveal from '../components/ScanReveal'

const orderClasses = {
  1: 'order-1',
  2: 'order-2',
  3: 'order-3',
}
const desktopOrderClasses = {
  1: 'lg:order-1',
  2: 'lg:order-2',
  3: 'lg:order-3',
}

const projects = [
  {
    name: 'Under Pressure',
    placement: '2nd Place, AQX Data Bowl 1.0',
    description:
      'Applied VAEP (Valuing Actions by Estimating Probabilities) to StatsBomb open event data from the 2018 and 2022 World Cups to quantify how team performance holds up, or degrades, under high-pressure game states, built on real event-level match data rather than aggregated box scores.',
    github: 'https://github.com/Sithranjan-Suresh/under-pressure',
    image: underPressureDashboard,
    mobileOrder: 2,
    desktopOrder: 1,
  },
  {
    name: 'Voca',
    placement: 'Award Winner, Ctrl+V Hackathon',
    description:
      'Built for the 50M+ people worldwide living with aphasia. A tap on any of 49 concepts reconstructs into a full spoken sentence, powered by Llama 3.3 70B on Groq with sub-1-second first token. Shipped as an installable, offline-capable PWA with service-worker emergency phrases, dual persona profiles, and a WCAG high-contrast mode.',
    github: 'https://github.com/Sithranjan-Suresh/voca',
    image: null,
    mobileOrder: 3,
    desktopOrder: 2,
  },
  {
    name: 'Palette',
    placement: '1st Place, BeanHacks',
    description:
      'Modeled flavor chemistry as a vector space and used deterministic grid search with greedy farthest-point batch coordination to regenerate optimized drink recipes in under 2 seconds per iteration. Replaced heuristic pricing with a fully auditable costing pipeline. Deployed on Linux via a Dockerized FastAPI/Uvicorn setup with Groq for inference.',
    github: 'https://github.com/Sithranjan-Suresh/palette',
    image: paletteDashboard,
    mobileOrder: 1,
    desktopOrder: 3,
  },
]

function OtherProjects() {
  return (
    <section id="projects" className="py-24">
      <span className="font-mono text-brass text-sm">05</span>
      <h2 className="font-mono font-bold text-2xl sm:text-3xl mt-2 mb-8">
        MORE FROM THE HACKATHON CIRCUIT
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ScanReveal
            key={project.name}
            as="article"
            delay={(project.desktopOrder - 1) * 0.15}
            className={`bg-panel flex flex-col ${orderClasses[project.mobileOrder]} ${desktopOrderClasses[project.desktopOrder]}`}
          >
            {project.image && (
              <img
                src={project.image}
                alt={`${project.name} dashboard screenshot`}
                loading="lazy"
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-mono font-bold text-lg">{project.name.toUpperCase()}</h3>
              <p className="font-mono text-brass text-sm mt-1">{project.placement}</p>
              <p className="mt-4 text-primary/90 leading-relaxed flex-1">{project.description}</p>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm text-measure mt-4 hover:underline"
              >
                GitHub &rarr;
              </a>
            </div>
          </ScanReveal>
        ))}
      </div>
    </section>
  )
}

export default OtherProjects
