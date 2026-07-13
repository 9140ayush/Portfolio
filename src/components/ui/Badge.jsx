export function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 bg-surface-hover border border-border-muted rounded-full font-mono text-xs text-secondary font-medium tracking-wide ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-teal-accent" />
      {children}
    </span>
  )
}
