import { motion } from 'framer-motion'
import { CONTINENTS, CONTINENT_META, type Continent } from '../types'

interface ContinentNavProps {
  active: Continent | 'All'
  onChange: (value: Continent | 'All') => void
  counts: Record<string, number>
}

export function ContinentNav({ active, onChange, counts }: ContinentNavProps) {
  const items: Array<Continent | 'All'> = ['All', ...CONTINENTS]

  return (
    <nav className="continent-nav" aria-label="Filter by continent">
      <div className="continent-scroll">
        {items.map((item) => {
          const isActive = active === item
          const count = item === 'All' ? counts.All : (counts[item] ?? 0)
          return (
            <button
              key={item}
              type="button"
              className={`continent-chip${isActive ? ' is-active' : ''}`}
              onClick={() => onChange(item)}
              aria-pressed={isActive}
            >
              {isActive && (
                <motion.span
                  layoutId="continent-pill"
                  className="continent-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <span className="continent-label">{item}</span>
              <span className="continent-count">{count}</span>
            </button>
          )
        })}
      </div>
      {active !== 'All' && (
        <p className="continent-blurb">{CONTINENT_META[active].blurb}</p>
      )}
    </nav>
  )
}
