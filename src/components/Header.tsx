import { motion } from 'framer-motion'

interface HeaderProps {
  total: number
  learned: number
}

export function Header({ total, learned }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="brand-block">
        <motion.p
          className="brand-mark"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          ORBIS
        </motion.p>
        <motion.h1
          className="brand-tagline"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          Learn every country on Earth
        </motion.h1>
      </div>
      <div className="header-meta" aria-live="polite">
        <span>
          <strong>{total}</strong> countries
        </span>
        <span className="meta-dot" aria-hidden="true" />
        <span>
          <strong>{learned}</strong> explored
        </span>
      </div>
    </header>
  )
}
