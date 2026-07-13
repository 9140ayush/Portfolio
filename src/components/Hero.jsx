import { useEffect, useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/Button'
import { ArrowRight, Download } from 'lucide-react'

const HeroCanvas = lazy(() => import('./HeroCanvas').then(module => ({ default: module.HeroCanvas })))

const roles = [
  "Full Stack Developer",
  "AI Applications Developer",
  "Software Engineer"
]

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-base">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full z-10">
        
        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs tracking-widest text-teal-accent font-semibold mb-3 block">
              // DESIGNED & ENGINEERED FOR IMPACT
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-primary leading-[1.1] mb-4 tracking-tight">
              Ayush Lohiya
            </h1>
          </motion.div>

          <div className="h-10 md:h-12 overflow-hidden mb-6 flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl md:text-3xl font-mono text-teal-accent font-bold tracking-tight block"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="text-base md:text-lg text-secondary max-w-xl mb-8 leading-relaxed font-sans"
          >
            Building scalable web applications with modern technologies, AI integrations, and clean user experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Button 
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById('projects')
                if (el) {
                  window.scrollTo({
                    top: el.offsetTop - 90,
                    behavior: 'smooth'
                  })
                }
              }}
              variant="primary"
            >
              Explore Work <ArrowRight size={16} />
            </Button>
            <Button 
              href="/Ayush_Lohiya_Resume.pdf"
              download="Ayush_Lohiya_Resume.pdf"
              variant="secondary"
            >
              Get Resume <Download size={16} />
            </Button>
          </motion.div>
        </div>

        {/* Right Side 3D Scene */}
        <div className="lg:col-span-5 h-[350px] lg:h-[500px] relative w-full flex items-center justify-center">
          <Suspense fallback={<div className="text-secondary font-mono text-xs opacity-50">Loading 3D Visualizer...</div>}>
            <HeroCanvas />
          </Suspense>
        </div>
      </div>

      {/* Minimal Scroll Affordance Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-mono text-[10px] tracking-widest text-muted">SCROLL</span>
        <div className="w-[1px] h-10 bg-border-muted relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-3 bg-teal-accent"
            animate={{
              y: [0, 28, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </section>
  )
}
