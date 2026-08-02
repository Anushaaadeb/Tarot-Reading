import { AnimatePresence, motion } from 'framer-motion'
import type { Country } from '../types'

interface CountryListProps {
  countries: Country[]
  selectedId: string | null
  neighborIds: Set<string>
  explored: Set<string>
  onSelect: (country: Country) => void
  query: string
  onQueryChange: (q: string) => void
}

export function CountryList({
  countries,
  selectedId,
  neighborIds,
  explored,
  onSelect,
  query,
  onQueryChange,
}: CountryListProps) {
  return (
    <aside className="country-panel">
      <label className="search-field">
        <span className="sr-only">Search countries or capitals</span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search country or capital…"
          autoComplete="off"
        />
      </label>

      <div className="list-legend">
        <span>
          <i className="swatch selected" /> Selected
        </span>
        <span>
          <i className="swatch neighbor" /> Neighbors
        </span>
      </div>

      <ul className="country-list" role="listbox" aria-label="Countries">
        <AnimatePresence initial={false}>
          {countries.map((country) => {
            const selected = country.id === selectedId
            const neighbor = neighborIds.has(country.id)
            return (
              <motion.li
                key={country.cca3}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`country-row${selected ? ' is-selected' : ''}${neighbor ? ' is-neighbor' : ''}`}
                  onClick={() => onSelect(country)}
                >
                  <span className="country-flag" aria-hidden="true">
                    {country.flag}
                  </span>
                  <span className="country-text">
                    <span className="country-name">{country.name}</span>
                    <span className="country-capital">
                      {country.capital ? `Capital · ${country.capital}` : 'No capital listed'}
                    </span>
                  </span>
                  {explored.has(country.id) && (
                    <span className="explored-mark" title="Explored" aria-label="Explored">
                      ✓
                    </span>
                  )}
                </button>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>

      {countries.length === 0 && (
        <p className="empty-note">No countries match that search.</p>
      )}
    </aside>
  )
}
