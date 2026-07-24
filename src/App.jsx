import { sections } from './data/sections'
import SignalLine from './components/SignalLine'

function App() {
  return (
    <>
      <SignalLine activeId={null} />
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
