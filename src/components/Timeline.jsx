import { motion } from 'framer-motion'
import { SectionHeader } from './ui/SectionHeader'
import { Card } from './ui/Card'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { GraduationCap, Briefcase, Award, Code } from 'lucide-react'

const timelineItems = [
  {
    year: '2023 - 2027',
    title: 'B.Tech in Computer Science Engineering',
    institution: 'GLA University, Mathura',
    description: 'Pursuing B.Tech in CSE. Focus on Full Stack development, AI integrations, scalable backend databases, and software engineering. Currently maintaining a CGPA of 8.01/10.',
    focus: 'Full Stack Development, AI Applications, Scalable Backend Systems, Software Engineering',
    icon: GraduationCap,
    category: 'Education'
  },
  {
    year: 'Nov 2025 - May 2026',
    title: 'Full Stack Web Developer (Freelance)',
    institution: 'First Bridge School of Business',
    description: 'Developed 6+ scalable and responsive web applications using Next.js and TypeScript. Implemented Supabase Auth with Role Based Access Control (RBAC) and designed PostgreSQL database schemas.',
    focus: 'Next.js, TypeScript, Supabase Auth, PostgreSQL, Admin Dashboard',
    icon: Briefcase,
    category: 'Experience'
  },
  {
    year: 'Aug - Nov 2025',
    title: 'Frontend Developer (Freelance)',
    institution: 'Cosmoversity (UK-based)',
    description: 'Built 10+ responsive Next.js pages and developed 20+ reusable UI components. Reduced duplicate code by ~35% and optimized images/lazy loading to boost Lighthouse score from 68 to 91.',
    focus: 'React, Next.js, UI Architecture, Performance Optimization',
    icon: Briefcase,
    category: 'Experience'
  },
  {
    year: 'Ongoing',
    title: '350+ Coding Problems Solved',
    institution: 'LeetCode & SQL Platforms',
    description: 'Regular practice building efficient solutions across fundamental topics. Solved 300+ DSA problems and 50+ SQL queries optimizing for time and space complexities.',
    focus: 'Data Structures, Algorithms, SQL Queries, Time Complexity Optimization',
    icon: Code,
    category: 'Coding'
  },
  {
    year: '2025',
    title: 'Google Arcade Champion (Legend Tier)',
    institution: 'Google Cloud Platform',
    description: 'Completed Google Cloud hands-on labs and skill challenges. Awarded official Google Swags for qualifying in the Legend Tier.',
    focus: 'Google Cloud Platform, Cloud Operations, Serverless Labs',
    icon: Award,
    category: 'Achievement'
  },
  {
    year: '2025',
    title: 'Deviathon Round 2 Qualifier',
    institution: 'Deviathon Hackathon',
    description: 'Qualified for Round 2 among 500+ participants in a highly competitive development hackathon.',
    focus: 'Competitive Coding, Rapid Prototyping, Systems Engineering',
    icon: Award,
    category: 'Achievement'
  }
]

export function Timeline() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section id="about" className="py-24 bg-base border-t border-border-muted">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          category="Journey & Credentials"
          title="Interactive Timeline"
          subtitle="Academic milestones, industrial internship role, project achievements, and specialized certificates."
        />

        <div className="relative border-l border-border-muted ml-4 md:ml-12 pl-8 md:pl-16 space-y-12 max-w-4xl text-left">
          
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-border-muted" />

          {timelineItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group animate-reveal"
              >
                <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full bg-surface border border-border-muted flex items-center justify-center transition-colors group-hover:border-teal-accent z-10 shadow-sm">
                  <Icon size={12} className="text-secondary group-hover:text-teal-accent transition-colors" />
                </div>

                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  
                  <div className="md:w-32 flex-shrink-0 pt-1">
                    <span className="font-mono text-xs font-semibold text-teal-accent bg-teal-accent/5 border border-teal-accent/20 px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                      {item.year}
                    </span>
                  </div>

                  <Card className="flex-1 hover:border-border-muted/80">
                    <span className="font-mono text-[10px] text-muted tracking-widest uppercase block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-primary mb-1">
                      {item.title}
                    </h3>
                    <h4 className="text-sm font-mono text-secondary mb-4">
                      {item.institution}
                    </h4>
                    <p className="text-body text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    {item.focus && (
                      <div className="border-t border-border-muted/50 pt-3 mt-3">
                        <span className="font-mono text-[10px] text-muted block mb-1.5 uppercase">Focus Areas:</span>
                        <span className="text-xs text-secondary bg-surface-hover border border-border-muted/50 px-2.5 py-1 rounded-md font-sans">
                          {item.focus}
                        </span>
                      </div>
                    )}
                  </Card>

                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
