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
    description: (
      <>
        Modeled soccer players&rsquo; resilience under pressure using real match data.{' '}
        <span className="text-signal-amber">
          {/* TODO: add concrete numbers once available, matching the Ice in His Veins treatment */}
          [add concrete numbers]
        </span>
      </>
    ),
    mobileOrder: 2,
    desktopOrder: 1,
  },
  {
    name: 'Voca',
    placement: 'Award Winner, Ctrl+V Hackathon',
    description:
      'Built for the 50M+ people worldwide living with aphasia. A tap on any of 49 concepts reconstructs into a full spoken sentence, powered by Llama 3.3 70B on Groq with sub-1-second first token. Shipped as an installable, offline-capable PWA with service-worker emergency phrases, dual persona profiles, and a WCAG high-contrast mode.',
    mobileOrder: 3,
    desktopOrder: 2,
  },
  {
    name: 'Palette',
    placement: '1st Place, BeanHacks',
    description:
      'Modeled flavor chemistry as a vector space and used deterministic grid search with greedy farthest-point batch coordination to regenerate optimized drink recipes in under 2 seconds per iteration. Replaced heuristic pricing with a fully auditable costing pipeline. Deployed on Linux via a Dockerized FastAPI/Uvicorn setup with Groq for inference.',
    mobileOrder: 1,
    desktopOrder: 3,
  },
]

function OtherProjects() {
  return (
    <section id="projects" className="py-24">
      <span className="font-mono text-signal-amber text-sm">05</span>
      <h2 className="font-mono font-bold text-2xl sm:text-3xl mt-2 mb-8">
        MORE FROM THE HACKATHON CIRCUIT
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <article
            key={project.name}
            className={`bg-panel p-6 flex flex-col ${orderClasses[project.mobileOrder]} ${desktopOrderClasses[project.desktopOrder]}`}
          >
            <h3 className="font-mono font-bold text-lg">{project.name.toUpperCase()}</h3>
            <p className="font-mono text-signal-amber text-sm mt-1">{project.placement}</p>
            <p className="mt-4 text-primary/90 leading-relaxed flex-1">{project.description}</p>
            <a href="#" className="font-mono text-sm text-data-teal mt-4 hover:underline">
              {/* TODO: replace with real GitHub repo link */}
              GitHub &rarr; [add link]
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default OtherProjects
