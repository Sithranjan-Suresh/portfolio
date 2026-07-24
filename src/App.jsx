import { useMemo } from 'react'
import { sections } from './data/sections'
import SignalLine from './components/SignalLine'
import ConfidenceBand from './components/ConfidenceBand'
import { useActiveSection } from './hooks/useActiveSection'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Hero from './sections/Hero'
import ProofStrip from './sections/ProofStrip'
import Experience from './sections/Experience'
import FeaturedProject from './sections/FeaturedProject'
import OtherProjects from './sections/OtherProjects'
import Skills from './sections/Skills'
import About from './sections/About'
import Education from './sections/Education'
import CurrentlyBuilding from './sections/CurrentlyBuilding'
import Contact from './sections/Contact'

const orderedSections = [
  Hero,
  ProofStrip,
  Experience,
  FeaturedProject,
  OtherProjects,
  Skills,
  About,
  Education,
  CurrentlyBuilding,
  Contact,
]

function App() {
  useSmoothScroll()
  const sectionIds = useMemo(() => sections.map((section) => section.id), [])
  const activeId = useActiveSection(sectionIds)

  return (
    <>
      <SignalLine activeId={activeId} />
      <main className="lg:pl-20 px-6 max-w-5xl mx-auto">
        {orderedSections.map((SectionComponent, index) => (
          <div key={sections[index].id}>
            <SectionComponent />
            {index < orderedSections.length - 1 && <ConfidenceBand />}
          </div>
        ))}
      </main>
    </>
  )
}

export default App
