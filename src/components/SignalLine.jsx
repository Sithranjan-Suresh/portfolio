import { sections } from '../data/sections'

function SignalLine({ activeId }) {
  return (
    <nav
      aria-label="Section progress"
      className="hidden lg:flex fixed left-8 top-0 h-screen w-6 flex-col items-center z-10"
    >
      <div className="relative h-full w-px bg-muted/30">
        {sections.map((section, index) => {
          const isActive = section.id === activeId
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`${section.number} ${section.label}`}
              className="group absolute -left-[5px] flex items-center"
              style={{ top: `${(index / (sections.length - 1)) * 100}%` }}
            >
              <span
                className={`block h-[11px] w-[11px] rounded-full border transition-colors motion-reduce:transition-none ${
                  isActive
                    ? 'bg-signal-amber border-signal-amber'
                    : 'bg-canvas border-muted/60 group-hover:border-signal-amber'
                }`}
              />
            </a>
          )
        })}
      </div>
    </nav>
  )
}

export default SignalLine
