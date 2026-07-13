import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from './ui/SectionHeader'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { ExternalLink, X, ArrowRight, HelpCircle } from 'lucide-react'
import { GithubIcon } from './ui/Icons'

const projects = [
  {
    id: 'careercraft',
    title: 'CareerCraft AI',
    tagline: 'AI-Powered Resume Analysis Platform',
    status: 'Verified',
    shortDesc: 'Built an AI-powered resume analysis platform that compares resumes against job descriptions, generates ATS-focused feedback, identifies missing keywords, and provides suggestions using OpenAI.',
    problem: 'Job seekers struggle to optimize their resumes for Automated Tracking Systems (ATS), leading to low callback rates.',
    solution: 'Engineered CareerCraft AI, matching resume text structures against job specifications. Leveraging OpenAI GPT models, it provides detailed feedback, missing keywords, and score rankings.',
    features: [
      'ATS score estimation and resume comparison algorithms',
      'Secure PDF file processing pipelines',
      'Secure authentication sessions managed via Clerk Auth',
      'Supabase database integration storing historical user scans'
    ],
    tech: ['Next.js', 'TypeScript', 'OpenAI API', 'Tailwind CSS', 'Clerk Auth', 'Supabase'],
    github: 'https://github.com/9140ayush/CareerCraft-AI',
    live: 'https://careercraft-ai.vercel.app',
    architecture: 'careercraft'
  },
  {
    id: 'regadget',
    title: 'ReGadget',
    tagline: 'Device Repair & Service Platform',
    status: 'Verified',
    shortDesc: 'Developed a full-stack repair service platform with Firebase Authentication, REST APIs, real-time request tracking, and an AI-powered repair assistant using Gemini API.',
    problem: 'Traditional hardware service shops lack real-time repair trackers and instant interactive diagnostic systems.',
    solution: 'Designed ReGadget, a centralized booking portal with automatic real-time ticket state updates. Integrated a custom Gemini-powered chat assistant to guide users through instant diagnostics.',
    features: [
      'Interactive diagnostic assistant using Google Gemini API',
      'Real-time status changes and ticket tracking triggers',
      'Firebase Authentication validation checks',
      'Dynamic Admin Panel managing requests, inventories, and states'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase Auth', 'Gemini API'],
    github: 'https://github.com/9140ayush/ReGadget',
    live: 'https://regadget.vercel.app',
    architecture: 'regadget'
  },
  {
    id: 'greencart',
    title: 'GreenCart',
    tagline: 'E-commerce Grocery Platform',
    status: 'Verified',
    shortDesc: 'Built a scalable grocery e-commerce platform featuring secure JWT authentication, Stripe payment integration, modular REST APIs, and optimized Redux state management.',
    problem: 'Modern e-commerce requires fast loading speeds, seamless payment checkout, and secure local cart cache operations.',
    solution: 'Created GreenCart, utilizing Redux Toolkit to maintain seamless client-side state. Designed a secure payment system with Stripe APIs, backed by token-based JWT validations.',
    features: [
      'Stripe Payment Gateway secure integrations',
      'Stateless JWT session authentication keys',
      'Optimized global store state caching using Redux Toolkit',
      'Product and order management dashboard panel for administrators'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Stripe API', 'Redux Toolkit', 'Tailwind CSS'],
    github: 'https://github.com/9140ayush/GreenCart',
    live: 'https://greencart.vercel.app',
    architecture: 'greencart'
  }
]

function ArchitectureDiagram({ type }) {
  if (type === 'careercraft') {
    return (
      <svg className="w-full max-w-lg mx-auto bg-surface-hover/50 border border-border-muted rounded-lg p-4 my-4" viewBox="0 0 400 200" fill="none" stroke="currentColor">
        <rect x="20" y="80" width="90" height="40" rx="6" fill="currentColor" fillOpacity="0.05" stroke="#0d9488" strokeWidth="1.5" />
        <text x="65" y="105" fill="#f6f6f7" fontSize="10" fontFamily="monospace" textAnchor="middle">Next.js Client</text>
        
        <rect x="160" y="80" width="90" height="40" rx="6" fill="currentColor" fillOpacity="0.05" stroke="#0d9488" strokeWidth="1.5" />
        <text x="205" y="105" fill="#f6f6f7" fontSize="10" fontFamily="monospace" textAnchor="middle">Serverless API</text>

        <rect x="300" y="30" width="80" height="40" rx="6" fill="currentColor" fillOpacity="0.05" stroke="#26292c" strokeWidth="1" />
        <text x="340" y="55" fill="#a2a6aa" fontSize="10" fontFamily="monospace" textAnchor="middle">OpenAI API</text>

        <rect x="300" y="130" width="80" height="40" rx="6" fill="currentColor" fillOpacity="0.05" stroke="#26292c" strokeWidth="1" />
        <text x="340" y="155" fill="#a2a6aa" fontSize="10" fontFamily="monospace" textAnchor="middle">Supabase DB</text>

        <path d="M110 100 H160" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="4" className="pulse-subtle" />
        <path d="M250 100 L300 50" stroke="#a2a6aa" strokeWidth="1" strokeDasharray="3" />
        <path d="M250 100 L300 150" stroke="#a2a6aa" strokeWidth="1" strokeDasharray="3" />
      </svg>
    )
  }

  if (type === 'regadget') {
    return (
      <svg className="w-full max-w-lg mx-auto bg-surface-hover/50 border border-border-muted rounded-lg p-4 my-4" viewBox="0 0 400 200" fill="none" stroke="currentColor">
        <rect x="15" y="80" width="80" height="40" rx="6" fill="currentColor" fillOpacity="0.05" stroke="#0d9488" strokeWidth="1.5" />
        <text x="55" y="105" fill="#f6f6f7" fontSize="10" fontFamily="monospace" textAnchor="middle">React SPA</text>

        <rect x="145" y="80" width="95" height="40" rx="6" fill="currentColor" fillOpacity="0.05" stroke="#0d9488" strokeWidth="1.5" />
        <text x="192.5" y="105" fill="#f6f6f7" fontSize="10" fontFamily="monospace" textAnchor="middle">Express Backend</text>

        <rect x="295" y="25" width="90" height="35" rx="6" fill="currentColor" fillOpacity="0.05" stroke="#26292c" strokeWidth="1" />
        <text x="340" y="47" fill="#a2a6aa" fontSize="9" fontFamily="monospace" textAnchor="middle">Gemini AI</text>

        <rect x="295" y="82" width="90" height="35" rx="6" fill="currentColor" fillOpacity="0.05" stroke="#26292c" strokeWidth="1" />
        <text x="340" y="104" fill="#a2a6aa" fontSize="9" fontFamily="monospace" textAnchor="middle">Firebase Auth</text>

        <rect x="295" y="140" width="90" height="35" rx="6" fill="currentColor" fillOpacity="0.05" stroke="#26292c" strokeWidth="1" />
        <text x="340" y="162" fill="#a2a6aa" fontSize="9" fontFamily="monospace" textAnchor="middle">MongoDB</text>

        <path d="M95 100 H145" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="4" className="pulse-subtle" />
        <path d="M240 100 L295 42" stroke="#a2a6aa" strokeWidth="1" strokeDasharray="3" />
        <path d="M240 100 L295 100" stroke="#a2a6aa" strokeWidth="1" strokeDasharray="3" />
        <path d="M240 100 L295 157" stroke="#a2a6aa" strokeWidth="1" strokeDasharray="3" />
      </svg>
    )
  }

  if (type === 'greencart') {
    return (
      <svg className="w-full max-w-lg mx-auto bg-surface-hover/50 border border-border-muted rounded-lg p-4 my-4" viewBox="0 0 400 200" fill="none" stroke="currentColor">
        <rect x="20" y="80" width="90" height="40" rx="6" fill="currentColor" fillOpacity="0.05" stroke="#0d9488" strokeWidth="1.5" />
        <text x="65" y="105" fill="#f6f6f7" fontSize="10" fontFamily="monospace" textAnchor="middle">React & Redux</text>
        
        <rect x="160" y="80" width="90" height="40" rx="6" fill="currentColor" fillOpacity="0.05" stroke="#0d9488" strokeWidth="1.5" />
        <text x="205" y="105" fill="#f6f6f7" fontSize="10" fontFamily="monospace" textAnchor="middle">Express Server</text>

        <rect x="300" y="30" width="80" height="40" rx="6" fill="currentColor" fillOpacity="0.05" stroke="#26292c" strokeWidth="1" />
        <text x="340" y="55" fill="#a2a6aa" fontSize="10" fontFamily="monospace" textAnchor="middle">Stripe API</text>

        <rect x="300" y="130" width="80" height="40" rx="6" fill="currentColor" fillOpacity="0.05" stroke="#26292c" strokeWidth="1" />
        <text x="340" y="155" fill="#a2a6aa" fontSize="10" fontFamily="monospace" textAnchor="middle">MongoDB</text>

        <path d="M110 100 H160" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="4" className="pulse-subtle" />
        <path d="M250 100 L300 50" stroke="#a2a6aa" strokeWidth="1" strokeDasharray="3" />
        <path d="M250 100 L300 150" stroke="#a2a6aa" strokeWidth="1" strokeDasharray="3" />
      </svg>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-surface-hover/50 border border-border-muted rounded-lg my-4 text-muted text-xs font-mono gap-2">
      <HelpCircle size={20} />
      <span>SPECIFICATIONS OUTLINE PENDING VERIFICATION</span>
    </div>
  )
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section id="projects" className="py-24 bg-base border-t border-border-muted">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          category="Featured Work"
          title="Project Showcase"
          subtitle="Explore verified builds covering full-stack apps, automated systems, and deep learning pipelines."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {projects.map((project) => {
            const isPlaceholder = project.status === 'Incoming'
            return (
              <Card 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`flex flex-col h-full hover:border-teal-accent/40 cursor-pointer ${isPlaceholder ? 'opacity-70 hover:opacity-90' : ''}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`font-mono text-[9px] tracking-wider font-semibold uppercase px-2 py-0.5 rounded border ${isPlaceholder ? 'text-muted border-border-muted bg-surface-hover' : 'text-teal-accent border-teal-accent/30 bg-teal-accent/5'}`}>
                    {project.status}
                  </span>
                  {!isPlaceholder && (
                    <span className="text-xs font-mono text-muted flex items-center gap-1 group-hover:text-primary transition-colors">
                      Details <ArrowRight size={12} />
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-primary mb-1">
                  {project.title}
                </h3>
                <span className="font-mono text-xs text-secondary mb-3 block">
                  {project.tagline}
                </span>
                
                <p className="text-body text-xs leading-relaxed mb-6 flex-grow">
                  {project.shortDesc}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-muted/50">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="font-mono text-[10px] text-muted bg-surface-hover px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Premium Slide-over Side Drawer */}
        <AnimatePresence>
          {selectedProject && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black z-50 backdrop-blur-sm cursor-pointer"
              />

              {/* Drawer Container */}
              <motion.div 
                initial={{ x: prefersReducedMotion ? 0 : '100%', opacity: prefersReducedMotion ? 0 : 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: prefersReducedMotion ? 0 : '100%', opacity: prefersReducedMotion ? 0 : 0 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-full w-full max-w-xl bg-surface border-l border-border-muted z-50 p-6 md:p-8 overflow-y-auto text-left shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className={`font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded border ${selectedProject.status === 'Incoming' ? 'text-muted border-border-muted' : 'text-teal-accent border-teal-accent/30 bg-teal-accent/5'}`}>
                    {selectedProject.status} Project
                  </span>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-2 text-secondary hover:text-primary bg-surface-hover border border-border-muted rounded-full transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <h3 className="text-3xl font-bold text-primary mb-1">
                  {selectedProject.title}
                </h3>
                <span className="font-mono text-sm text-teal-accent block mb-6">
                  {selectedProject.tagline}
                </span>

                <div className="space-y-6">
                  {/* Problem & Solution block */}
                  <div>
                    <h4 className="font-mono text-xs text-muted tracking-wider uppercase mb-2">// The Challenge</h4>
                    <p className="text-sm text-secondary leading-relaxed bg-base p-4 rounded-lg border border-border-muted/50">
                      {selectedProject.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs text-muted tracking-wider uppercase mb-2">// The Solution</h4>
                    <p className="text-sm text-secondary leading-relaxed bg-base p-4 rounded-lg border border-border-muted/50">
                      {selectedProject.solution}
                    </p>
                  </div>

                  {/* Architecture Diagram */}
                  <div>
                    <h4 className="font-mono text-xs text-muted tracking-wider uppercase mb-2">// System Architecture</h4>
                    <ArchitectureDiagram type={selectedProject.architecture} />
                  </div>

                  {/* Key Scope / Features */}
                  <div>
                    <h4 className="font-mono text-xs text-muted tracking-wider uppercase mb-3">// Technical Scope & Features</h4>
                    <ul className="space-y-2.5">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-2.5 text-sm text-secondary">
                          <span className="text-teal-accent font-semibold font-mono">→</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack badges */}
                  <div>
                    <h4 className="font-mono text-xs text-muted tracking-wider uppercase mb-3">// Integration Layer Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t, idx) => (
                        <Badge key={idx}>{t}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* External Links */}
                  {(selectedProject.github || selectedProject.live) && (
                    <div className="flex flex-wrap gap-4 pt-6 border-t border-border-muted/50">
                      {selectedProject.github && (
                        <Button href={selectedProject.github} variant="secondary" className="flex-1 py-2.5">
                          <GithubIcon size={14} /> Repository
                        </Button>
                      )}
                      {selectedProject.live && (
                        <Button href={selectedProject.live} variant="primary" className="flex-1 py-2.5">
                          <ExternalLink size={14} /> Live Release
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
