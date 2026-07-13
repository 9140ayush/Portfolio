import { motion } from 'framer-motion'
import { SectionHeader } from './ui/SectionHeader'
import { Card } from './ui/Card'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { ShieldCheck, Award, Layers, Target } from 'lucide-react'

const credentials = [
  {
    title: 'Google Arcade Champion',
    issuer: 'Google Cloud Platform',
    level: 'Legend Tier',
    desc: 'Completed Google Cloud hands-on labs and skill challenges. Awarded official Google Swags for qualifying in the Legend Tier.',
    icon: Award
  },
  {
    title: 'Deviathon Round 2 Qualifier',
    issuer: 'Deviathon Hackathon Board',
    level: 'Hackathon Competitor',
    desc: 'Qualified for Round 2 among 500+ participants in a highly competitive software development hackathon.',
    icon: ShieldCheck
  },
  {
    title: '350+ Coding Problems Completed',
    issuer: 'LeetCode & SQL Platforms',
    level: 'Active Problem Solver',
    desc: 'Solved over 300+ DSA problems and 50+ SQL database queries, mastering complexity optimization and search algorithms.',
    icon: Target
  },
  {
    title: 'Freelance Full Stack Developer',
    issuer: 'First Bridge School of Business',
    level: 'Systems Developer',
    desc: 'Engineered a production-ready Admin Dashboard reducing manual administrative workload by nearly 40% using PostgreSQL schemas.',
    icon: Layers
  }
]

export function Certifications() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section id="certifications" className="py-24 bg-base border-t border-border-muted">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          category="Credentials & Metrics"
          title="Achievements & Certifications"
          subtitle="Academic credentials, professional internship validations, and technical challenges completed."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="h-full flex items-start gap-4 border-border-muted hover:border-teal-accent/30 bg-surface-hover/30">
                  <div className="p-3 bg-surface border border-border-muted rounded-lg text-teal-accent shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded border border-teal-accent/20 bg-teal-accent/5 text-teal-accent mb-2.5 inline-block">
                      {cred.level}
                    </span>
                    <h3 className="text-lg font-bold text-primary mb-1">
                      {cred.title}
                    </h3>
                    <span className="font-mono text-xs text-secondary mb-3 block">
                      {cred.issuer}
                    </span>
                    <p className="text-xs md:text-sm text-secondary leading-relaxed">
                      {cred.desc}
                    </p>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
