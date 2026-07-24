import { useMemo } from 'react'
import { sections } from './data/sections'
import SignalLine from './components/SignalLine'
import { useActiveSection } from './hooks/useActiveSection'

function App() {
  const sectionIds = useMemo(() => sections.map((section) => section.id), [])
  const activeId = useActiveSection(sectionIds)

  return (
    <>
      <SignalLine activeId={activeId} />
      <main className="lg:pl-20 px-6 max-w-5xl mx-auto">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="min-h-[40vh] py-24">
            <span className="font-mono text-signal-amber text-sm">{section.number}</span>
          </section>
        ))}
      </main>
    </>
  )
}

export default App
