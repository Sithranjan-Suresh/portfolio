import { sections } from '../data/sections'

function Ruler({ activeId }) {
  const activeIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === activeId),
  )
  const progress = (activeIndex / (sections.length - 1)) * 100

  return (
    <nav
      aria-label="Section progress"
      className="hidden lg:flex fixed left-10 top-0 h-screen w-16 flex-col items-start z-30"
    >
      <div
        className="relative flex-1 w-3 mt-8 mb-8"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(139,141,133,0.35) 0, rgba(139,141,133,0.35) 1px, transparent 1px, transparent 8px)',
        }}
      >
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-brass/0 via-brass/60 to-brass transition-[height] duration-500 ease-out motion-reduce:transition-none"
          style={{ height: `${progress}%` }}
        />

        {sections.map((section, index) => {
          const isActive = section.id === activeId
          const isPast = index <= activeIndex
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`${section.number} ${section.label}`}
              className="group absolute -left-2 flex items-center gap-2"
              style={{ top: `${(index / (sections.length - 1)) * 100}%` }}
            >
              <span
                className={`block h-px w-7 transition-colors duration-500 motion-reduce:transition-none ${
                  isActive ? 'bg-brass' : isPast ? 'bg-brass/70' : 'bg-muted/50 group-hover:bg-brass/70'
                }`}
              />
              <span
                className={`font-mono text-[10px] uppercase tracking-wide whitespace-nowrap max-w-[6.5rem] truncate transition-colors duration-500 motion-reduce:transition-none ${
                  isActive ? 'text-brass' : 'text-muted/70'
                }`}
              >
                {section.label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}

export default Ruler
