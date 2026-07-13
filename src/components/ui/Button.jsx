import { useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function Button({ children, onClick, className = '', variant = 'primary', href, download, ...props }) {
  const ref = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.8 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    
    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    const maxPull = 8
    const pullX = (distanceX / (width / 2)) * maxPull
    const pullY = (distanceY / (height / 2)) * maxPull

    x.set(pullX)
    y.set(pullY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  const baseStyles = 'relative inline-flex items-center justify-center font-sans font-medium rounded-lg transition-all duration-200 overflow-hidden focus:outline-none'
  const variants = {
    primary: 'bg-teal-accent hover:bg-teal-accent-light text-base text-white border border-teal-accent hover:border-teal-accent-light px-6 py-3 cursor-pointer shadow-md shadow-teal-accent/10',
    secondary: 'bg-transparent text-primary border border-border-muted hover:border-teal-accent hover:bg-surface px-6 py-3 cursor-pointer',
    tertiary: 'bg-transparent text-secondary hover:text-primary px-4 py-2 text-sm border border-transparent hover:border-border-muted hover:bg-surface cursor-pointer'
  }

  const btnContent = (
    <motion.span 
      className="relative z-10 flex items-center gap-2"
      style={{ x: prefersReducedMotion ? 0 : springX, y: prefersReducedMotion ? 0 : springY }}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <motion.a 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        href={href}
        download={download}
        target={download ? undefined : "_blank"}
        rel={download ? undefined : "noopener noreferrer"}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        {...props}
      >
        {btnContent}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      {...props}
    >
      {btnContent}
    </motion.button>
  )
}
