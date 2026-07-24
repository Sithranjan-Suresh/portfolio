import { useMemo } from 'react'
import { sections } from './data/sections'
import SignalLine from './components/SignalLine'
import ConfidenceBand from './components/ConfidenceBand'
import { useActiveSection } from './hooks/useActiveSection'

function App() {
  const sectionIds = useMemo(() => sections.map((section) => section.id), [])
  const activeId = useActiveSection(sectionIds)

  return (
    <>
      <SignalLine activeId={activeId} />
      <main className="lg:pl-20 px-6 max-w-5xl mx-auto">
        {sections.map((section, index) => (
          <div key={section.id}>
            <section id={section.id} className="min-h-[40vh] py-24">
              <span className="font-mono text-signal-amber text-sm">{section.number}</span>
            </section>
            {index < sections.length - 1 && <ConfidenceBand />}
          </div>
        ))}
      </main>
    </>
  )
}

export default App
