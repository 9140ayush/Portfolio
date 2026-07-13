import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function Card({ children, className = '', onClick, hoverEffect = true, ...props }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  const hoverAnimation = hoverEffect && !prefersReducedMotion
    ? { y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }
    : {}

  return (
    <motion.div
      onClick={onClick}
      className={`bg-surface border border-border-muted rounded-xl p-6 glow-effect transition-colors duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      whileHover={hoverAnimation}
      {...props}
    >
      {children}
    </motion.div>
  )
}
