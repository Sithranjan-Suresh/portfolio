import { sections } from '../data/sections'

function SignalLine({ activeId }) {
  const activeIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === activeId),
  )
  const progress = (activeIndex / (sections.length - 1)) * 100

  return (
    <nav
      aria-label="Section progress"
      className="hidden lg:flex fixed left-8 top-0 h-screen w-6 flex-col items-center z-10"
    >
      <span className="font-mono text-[10px] text-muted tabular-nums mb-2 mt-6">
        {Math.round(progress).toString().padStart(2, '0')}%
      </span>
      <div className="relative flex-1 w-px bg-muted/20">
        <div
          className="absolute top-0 left-0 w-px bg-signal transition-[height] duration-500 ease-out motion-reduce:transition-none"
          style={{ height: `${progress}%` }}
        />
        {sections.map((section, index) => {
          const isActive = section.id === activeId
          const isLocked = index <= activeIndex
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
                className={`block h-[11px] w-[11px] rounded-full border transition-colors duration-500 motion-reduce:transition-none ${
                  isActive
                    ? 'bg-signal border-signal shadow-[0_0_8px_theme(colors.signal)]'
                    : isLocked
                      ? 'bg-signal/60 border-signal/60'
                      : 'bg-canvas border-muted/60 group-hover:border-signal'
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
