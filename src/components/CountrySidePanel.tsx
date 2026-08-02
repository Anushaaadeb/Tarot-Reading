import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { geoNaturalEarth1, geoPath, type GeoPermissibleObjects } from 'd3-geo'
import { feature } from 'topojson-client'
import type { FeatureCollection } from 'geojson'
import type { WorldTopology } from '../lib/geo'
import { formatArea, formatCoords, formatNumber } from '../lib/format'
import type { Country } from '../types'

interface CountrySidePanelProps {
  country: Country
  neighbors: Country[]
  onBack: () => void
  onSelectNeighbor: (country: Country) => void
}

const MINI_W = 320
const MINI_H = 180

export function CountrySidePanel({
  country,
  neighbors,
  onBack,
  onSelectNeighbor,
}: CountrySidePanelProps) {
  const [miniPath, setMiniPath] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBack()
    }
    window.addEventListener('keydown', onKey)

    let cancelled = false
    fetch('/data/countries-110m.json')
      .then((r) => r.json())
      .then((topo: WorldTopology) => {
        if (cancelled) return
        const fc = feature(topo, topo.objects.countries) as FeatureCollection
        const feat = fc.features.find((f) => String(f.id) === country.id)
        if (!feat) {
          setMiniPath(null)
          return
        }
        const projection = geoNaturalEarth1().fitExtent(
          [
            [14, 14],
            [MINI_W - 14, MINI_H - 14],
          ],
          feat as GeoPermissibleObjects,
        )
        const path = geoPath(projection)
        setMiniPath(path(feat as GeoPermissibleObjects))
      })
      .catch(() => {
        if (!cancelled) setMiniPath(null)
      })

    return () => {
      cancelled = true
      window.removeEventListener('keydown', onKey)
    }
  }, [country, onBack])

  const neighborNames = useMemo(
    () => neighbors.map((n) => n.name).join(', '),
    [neighbors],
  )

  return (
    <motion.aside
      className="side-panel country-detail"
      key={country.cca3}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      transition={{ type: 'spring', stiffness: 340, damping: 30 }}
      aria-labelledby="detail-title"
    >
      <div className="detail-toolbar">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Browse countries
        </button>
      </div>

      <header className="popup-header">
        <img
          className="popup-flag"
          src={country.flagPng}
          alt={`Flag of ${country.name}`}
          width={64}
          height={42}
          loading="lazy"
        />
        <div>
          <p className="popup-continent">{country.continent}</p>
          <h2 id="detail-title">
            <span aria-hidden="true">{country.flag} </span>
            {country.name}
          </h2>
          <p className="popup-official">{country.officialName}</p>
        </div>
      </header>

      <div className="popup-map-wrap">
        <svg
          className="popup-mini-map"
          viewBox={`0 0 ${MINI_W} ${MINI_H}`}
          role="img"
          aria-label={`Map outline of ${country.name}`}
        >
          <rect width={MINI_W} height={MINI_H} fill="var(--ocean-light)" rx="12" />
          {miniPath && (
            <motion.path
              key={country.cca3}
              d={miniPath}
              fill="var(--selected)"
              stroke="var(--selected-stroke)"
              strokeWidth={1.5}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              style={{ transformOrigin: '50% 50%' }}
            />
          )}
        </svg>
        <div className="popup-map-links">
          <a href={country.maps.google} target="_blank" rel="noreferrer">
            Google Maps
          </a>
          <a href={country.maps.osm} target="_blank" rel="noreferrer">
            OpenStreetMap
          </a>
        </div>
      </div>

      <dl className="geo-grid">
        <div>
          <dt>Capital</dt>
          <dd>{country.capital ?? '—'}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{formatCoords(country.latlng)}</dd>
        </div>
        <div>
          <dt>Area</dt>
          <dd>{formatArea(country.area)}</dd>
        </div>
        <div>
          <dt>Population</dt>
          <dd>{formatNumber(country.population)}</dd>
        </div>
        <div>
          <dt>Region</dt>
          <dd>
            {country.region}
            {country.subregion ? ` · ${country.subregion}` : ''}
          </dd>
        </div>
        <div>
          <dt>Geography</dt>
          <dd>{country.landlocked ? 'Landlocked' : 'Has coastline'}</dd>
        </div>
        <div className="span-2">
          <dt>Languages</dt>
          <dd>{country.languages.length ? country.languages.join(', ') : '—'}</dd>
        </div>
        <div className="span-2">
          <dt>Currencies</dt>
          <dd>
            {country.currencies.length
              ? country.currencies
                  .map((c) => `${c.name}${c.symbol ? ` (${c.symbol})` : ''}`)
                  .join(', ')
              : '—'}
          </dd>
        </div>
      </dl>

      <p className="popup-summary">{country.summary}</p>

      <section className="neighbor-section">
        <h3>Neighbouring countries</h3>
        {neighbors.length === 0 ? (
          <p className="neighbor-empty">
            No land borders — an island nation or remote territory.
          </p>
        ) : (
          <>
            <p className="neighbor-lead">
              Shown in red on the map: {neighborNames}.
            </p>
            <ul className="neighbor-chips">
              {neighbors.map((n) => (
                <li key={n.cca3}>
                  <button type="button" onClick={() => onSelectNeighbor(n)}>
                    <span aria-hidden="true">{n.flag}</span> {n.name}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </motion.aside>
  )
}
