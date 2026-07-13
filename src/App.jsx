import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Timeline } from './components/Timeline'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { ArchitectureMap } from './components/ArchitectureMap'
import { CodingProfile } from './components/CodingProfile'
import { Certifications } from './components/Certifications'
import { Playground } from './components/Playground'
import { Contact } from './components/Contact'

function App() {
  return (
    <div className="bg-base min-h-screen text-primary relative selection:bg-teal-accent selection:text-base font-sans overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <Experience />
        <Projects />
        <ArchitectureMap />
        <CodingProfile />
        <Certifications />
        <Playground />
        <Contact />
      </main>
    </div>
  )
}

export default App
