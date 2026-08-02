import { useMemo } from 'react'
import countriesData from '../data/countries.json'
import type { Continent, Country } from '../types'

const countries = countriesData as Country[]

export function useCountries() {
  const byCca3 = useMemo(() => {
    const map = new Map<string, Country>()
    for (const c of countries) map.set(c.cca3, c)
    return map
  }, [])

  const byId = useMemo(() => {
    const map = new Map<string, Country>()
    for (const c of countries) map.set(c.id, c)
    return map
  }, [])

  const byContinent = useMemo(() => {
    const map = new Map<Continent, Country[]>()
    for (const c of countries) {
      const list = map.get(c.continent) ?? []
      list.push(c)
      map.set(c.continent, list)
    }
    return map
  }, [])

  function getNeighbors(country: Country): Country[] {
    return country.borders
      .map((code) => byCca3.get(code))
      .filter((c): c is Country => Boolean(c))
  }

  function search(query: string, continent?: Continent | 'All'): Country[] {
    const q = query.trim().toLowerCase()
    return countries.filter((c) => {
      if (continent && continent !== 'All' && c.continent !== continent) return false
      if (!q) return true
      return (
        c.name.toLowerCase().includes(q) ||
        c.officialName.toLowerCase().includes(q) ||
        (c.capital?.toLowerCase().includes(q) ?? false) ||
        c.cca2.toLowerCase() === q ||
        c.cca3.toLowerCase() === q
      )
    })
  }

  return {
    countries,
    byCca3,
    byId,
    byContinent,
    getNeighbors,
    search,
    total: countries.length,
  }
}
