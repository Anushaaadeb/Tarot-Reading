import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { geoNaturalEarth1, geoPath, type GeoPermissibleObjects } from 'd3-geo'
import { feature } from 'topojson-client'
import type { FeatureCollection } from 'geojson'
import type { WorldTopology } from '../lib/geo'
import { formatArea, formatCoords, formatNumber } from '../lib/format'
import type { Country } from '../types'

interface CountryPopupProps {
  country: Country | null
  neighbors: Country[]
  onClose: () => void
  onSelectNeighbor: (country: Country) => void
}

const MINI_W = 360
const MINI_H = 220

export function CountryPopup({
  country,
  neighbors,
  onClose,
  onSelectNeighbor,
}: CountryPopupProps) {
  const [miniPath, setMiniPath] = useState<string | null>(null)

  useEffect(() => {
    if (!country) {
      setMiniPath(null)
      return
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
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
            [18, 18],
            [MINI_W - 18, MINI_H - 18],
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
  }, [country, onClose])

  const neighborNames = useMemo(
    () => neighbors.map((n) => n.name).join(', '),
    [neighbors],
  )

  return (
    <AnimatePresence>
      {country && (
        <motion.div
          className="popup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.article
            className="country-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="popup-close" onClick={onClose} aria-label="Close">
              ×
            </button>

            <header className="popup-header">
              <img
                className="popup-flag"
                src={country.flagPng}
                alt={`Flag of ${country.name}`}
                width={72}
                height={48}
                loading="lazy"
              />
              <div>
                <p className="popup-continent">{country.continent}</p>
                <h2 id="popup-title">
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
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                    style={{ transformOrigin: '50% 50%' }}
                  />
                )}
              </svg>
              <div className="popup-map-links">
                <a href={country.maps.google} target="_blank" rel="noreferrer">
                  Open in Google Maps
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
                    Highlighted in red on the map: {neighborNames}.
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
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
