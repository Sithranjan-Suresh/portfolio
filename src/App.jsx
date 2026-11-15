import { useMemo } from 'react'
import './original.css'
import { sections } from './data/sections'
import Ruler from './components/Ruler'
import NoiseOverlay from './components/NoiseOverlay'
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
  FeaturedProject,
  ProofStrip,
  Experience,
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
      <NoiseOverlay />
      <Ruler activeId={activeId} />
      <main className="lg:pl-32 px-6 max-w-6xl mx-auto">
        {orderedSections.map((SectionComponent, index) => (
          <SectionComponent key={sections[index].id} />
        ))}
      </main>
    </>
  )
}

export default App
