import { motion } from 'framer-motion'

const links = [
  { href: '#reading', label: 'Reading' },
  { href: '#zodiac', label: 'Zodiac' },
  { href: '#astrology', label: 'Astrology' },
]

export function Nav() {
  return (
    <motion.nav
      className="site-nav"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <a href="#top" className="nav-brand">
        <span>✦</span> Arcana Veil
      </a>
      <div className="nav-links">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
    </motion.nav>
  )
}
