import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from './components/Header'
import { ContinentNav } from './components/ContinentNav'
import { CountryList } from './components/CountryList'
import { WorldMap } from './components/WorldMap'
import { CountrySidePanel } from './components/CountrySidePanel'
import { useCountries } from './hooks/useCountries'
import type { Continent, Country } from './types'

const EXPLORED_KEY = 'orbis-explored'

function loadExplored(): Set<string> {
  try {
    const raw = localStorage.getItem(EXPLORED_KEY)
    if (!raw) return new Set()
    return new Set(JSON.parse(raw) as string[])
  } catch {
    return new Set()
  }
}

export default function App() {
  const { countries, byId, byContinent, getNeighbors, search, total } = useCountries()
  const [continent, setContinent] = useState<Continent | 'All'>('All')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [explored, setExplored] = useState<Set<string>>(() => loadExplored())

  const selected = selectedId ? (byId.get(selectedId) ?? null) : null
  const neighbors = useMemo(
    () => (selected ? getNeighbors(selected) : []),
    [selected, getNeighbors],
  )
  const neighborIds = useMemo(
    () => new Set(neighbors.map((n) => n.id)),
    [neighbors],
  )

  const filtered = useMemo(
    () => search(query, continent),
    [search, query, continent],
  )

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: countries.length }
    for (const [key, list] of byContinent) map[key] = list.length
    return map
  }, [countries.length, byContinent])

  const countryIdsInFilter = useMemo(() => {
    if (continent === 'All') return new Set(countries.map((c) => c.id))
    return new Set((byContinent.get(continent) ?? []).map((c) => c.id))
  }, [continent, countries, byContinent])

  useEffect(() => {
    localStorage.setItem(EXPLORED_KEY, JSON.stringify([...explored]))
  }, [explored])

  const markExplored = useCallback((id: string) => {
    setExplored((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const selectCountry = useCallback(
    (country: Country) => {
      setSelectedId(country.id)
      setShowDetail(true)
      markExplored(country.id)
      setQuery((q) => {
        const needle = q.trim().toLowerCase()
        if (!needle) return q
        const matches =
          country.name.toLowerCase().includes(needle) ||
          (country.capital?.toLowerCase().includes(needle) ?? false) ||
          country.cca2.toLowerCase() === needle ||
          country.cca3.toLowerCase() === needle
        return matches ? q : ''
      })
      setContinent((current) =>
        current === 'All' || country.continent === current
          ? current
          : country.continent,
      )
    },
    [markExplored],
  )

  const selectById = useCallback(
    (id: string) => {
      const country = byId.get(id)
      if (country) selectCountry(country)
    },
    [byId, selectCountry],
  )

  const backToList = useCallback(() => {
    setShowDetail(false)
  }, [])

  return (
    <div className="app-shell">
      <div className="atmosphere" aria-hidden="true" />
      <Header total={total} learned={explored.size} />

      <ContinentNav active={continent} onChange={setContinent} counts={counts} />

      <main className="workspace">
        <WorldMap
          selected={selected}
          neighborIds={neighborIds}
          continentFilter={continent}
          countryIdsInFilter={countryIdsInFilter}
          onSelectId={selectById}
        />

        <div className="side-rail">
          <AnimatePresence mode="wait" initial={false}>
            {showDetail && selected ? (
              <CountrySidePanel
                key={`detail-${selected.cca3}`}
                country={selected}
                neighbors={neighbors}
                onBack={backToList}
                onSelectNeighbor={selectCountry}
              />
            ) : (
              <motion.div
                key="browse"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.22 }}
                className="side-panel-wrap"
              >
                <CountryList
                  countries={filtered}
                  selectedId={selectedId}
                  neighborIds={neighborIds}
                  explored={explored}
                  onSelect={selectCountry}
                  query={query}
                  onQueryChange={setQuery}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="site-footer">
        <p>
          Tap any country on the map or in the list. Selected lands glow green; neighbours
          turn red. Details open beside the map so you can keep studying both.
        </p>
      </footer>
    </div>
  )
}
