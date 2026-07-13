import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from './ui/SectionHeader'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'

import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'

const experiences = [
  {
    id: 'first-bridge',
    role: 'Full Stack Web Developer (Freelance)',
    company: 'First Bridge School of Business',
    period: 'NOV 2025 - MAY 2026 (6 MONTHS)',
    description: 'Developed scalable web applications and administrative dashboards, designing relational databases and configuring secure authentication workflows to reduce administrative overhead.',
    stats: [
      { label: 'Applications Built', value: '6+ Scalable' },
      { label: 'Performance', value: '~30% SSR Boost' },
      { label: 'Workload Reduction', value: '~40% Saved' }
    ],
    skills: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase Auth', 'RBAC', 'REST APIs', 'Admin Dashboard'],
    contributions: [
      {
        title: 'Full Stack Engineering',
        desc: 'Developed 6+ scalable and responsive web applications using Next.js and TypeScript.'
      },
      {
        title: 'Performance Optimization',
        desc: 'Improved page rendering performance by approximately 30% utilizing Server Side Rendering (SSR) and code splitting.'
      },
      {
        title: 'Authentication & Security',
        desc: 'Implemented Supabase Authentication integrated with custom Role Based Access Control (RBAC) schemas.'
      },
      {
        title: 'Relational Database Design',
        desc: 'Designed PostgreSQL database schemas and built a production-ready Admin Dashboard that reduced manual administrative workload by nearly 40%.'
      }
    ]
  },
  {
    id: 'cosmoversity',
    role: 'Frontend Developer (Freelance)',
    company: 'Cosmoversity (UK-based)',
    period: 'AUG 2025 - NOV 2025 (3 MONTHS)',
    description: 'Developed reusable UI component libraries and responsive views for a UK student admissions portal, focus on code reusability and SEO/Lighthouse scoring.',
    stats: [
      { label: 'Responsive Pages', value: '10+ Built' },
      { label: 'Reusable Assets', value: '20+ Components' },
      { label: 'Duplicate Code', value: '35% Reduced' }
    ],
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Image Optimization', 'Lazy Loading', 'Lighthouse SEO'],
    contributions: [
      {
        title: 'Interactive Frontend Views',
        desc: 'Built 10+ responsive and accessible Next.js pages integrated into the core platform routing.'
      },
      {
        title: 'Reusable UI Frameworks',
        desc: 'Developed 20+ reusable UI components, decreasing duplicate code modules by nearly 35% and improving layout uniformity.'
      },
      {
        title: 'Speed & SEO Optimization',
        desc: 'Improved Lighthouse Performance score from 68 to 91 by integrating image optimizations, lazy loading, and refining the frontend client architecture.'
      }
    ]
  }
]

export function Experience() {
  const [expandedId, setExpandedId] = useState(null)


  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="experience" className="py-24 bg-base border-t border-border-muted">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          category="Professional Experience"
          title="Experience Showcase"
          subtitle="Direct contributions to live production systems, designing modular layouts and writing optimized interfaces."
        />

        <div className="max-w-3xl mx-auto text-left space-y-6">
          {experiences.map((exp) => {
            const isExpanded = expandedId === exp.id
            return (
              <Card 
                key={exp.id}
                onClick={() => handleToggle(exp.id)}
                className="group relative cursor-pointer overflow-hidden border-border-muted hover:border-teal-accent/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <span className="font-mono text-xs text-teal-accent font-semibold block mb-1">
                      {exp.period}
                    </span>
                    <h3 className="text-2xl font-bold text-primary group-hover:text-teal-accent transition-colors flex items-center gap-2">
                      {exp.role}
                    </h3>
                    <span className="text-base text-secondary font-mono">
                      {exp.company}
                    </span>
                  </div>
                </div>

                <p className="text-body text-sm mb-6 leading-relaxed">
                  {exp.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {exp.stats.map((stat, idx) => (
                    <div key={idx} className="bg-surface-hover border border-border-muted/50 p-3 rounded-lg">
                      <span className="text-xs text-muted block mb-1 font-mono uppercase">{stat.label}</span>
                      <span className="text-sm font-bold text-primary font-mono">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {exp.skills.map((skill, idx) => (
                    <Badge key={idx}>{skill}</Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t border-border-muted/50 pt-4 text-muted hover:text-primary transition-colors text-xs font-mono">
                  <span>{isExpanded ? 'CLICK TO COLLAPSE DETAILS' : 'CLICK TO EXPAND DETAILS'}</span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: 'auto', 
                        opacity: 1,
                        transition: { height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.3 } }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: { height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.2 } }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 border-t border-border-muted/30 mt-4 space-y-4">
                        <h4 className="font-mono text-xs text-teal-accent font-semibold tracking-wider uppercase mb-3">
                          // CORE CONTRIBUTIONS & ARCHITECTURAL IMPACT
                        </h4>
                        
                        <ul className="space-y-3.5 text-sm text-secondary">
                          {exp.contributions.map((ctb, idx) => (
                            <li key={idx} className="flex gap-3">
                              <CheckCircle size={16} className="text-teal-accent shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-primary block font-sans">{ctb.title}</strong>
                                {ctb.desc}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
