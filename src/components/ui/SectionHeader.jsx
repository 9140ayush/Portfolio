import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function SectionHeader({ title, subtitle, category, className = '', ...props }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  
  const revealVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={revealVariants}
      className={`mb-12 md:mb-16 text-left ${className}`}
      {...props}
    >
      {category && (
        <span className="font-mono text-xs uppercase tracking-widest text-teal-accent font-semibold mb-2 block">
          // {category}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-secondary max-w-2xl font-sans font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
