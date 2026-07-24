import { useMemo } from 'react'
import { sections } from './data/sections'
import SignalLine from './components/SignalLine'
import ConfidenceBand from './components/ConfidenceBand'
import { useActiveSection } from './hooks/useActiveSection'
import Hero from './sections/Hero'
import Placeholder from './sections/Placeholder'

const builtSections = {
  hero: Hero,
}

function App() {
  const sectionIds = useMemo(() => sections.map((section) => section.id), [])
  const activeId = useActiveSection(sectionIds)

  return (
    <>
      <SignalLine activeId={activeId} />
      <main className="lg:pl-20 px-6 max-w-5xl mx-auto">
        {sections.map((section, index) => {
          const SectionComponent = builtSections[section.id] ?? Placeholder
          return (
            <div key={section.id}>
              <SectionComponent id={section.id} number={section.number} label={section.label} />
              {index < sections.length - 1 && <ConfidenceBand />}
            </div>
          )
        })}
      </main>
    </>
  )
}

export default App
