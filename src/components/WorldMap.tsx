import { useEffect, useMemo, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { geoPath, type GeoPermissibleObjects } from 'd3-geo'
import {
  buildProjection,
  countriesFromTopo,
  featureCentroid,
  type CountryFeature,
  type WorldTopology,
} from '../lib/geo'
import type { Country } from '../types'

const MAP_W = 960
const MAP_H = 480

interface WorldMapProps {
  selected: Country | null
  neighborIds: Set<string>
  continentFilter: string
  countryIdsInFilter: Set<string>
  onSelectId: (id: string) => void
}

export function WorldMap({
  selected,
  neighborIds,
  continentFilter,
  countryIdsInFilter,
  onSelectId,
}: WorldMapProps) {
  const [features, setFeatures] = useState<CountryFeature[]>([])
  const [hovered, setHovered] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const viewX = useMotionValue(0)
  const viewY = useMotionValue(0)
  const viewW = useMotionValue(MAP_W)
  const viewH = useMotionValue(MAP_H)
  const viewBox = useTransform(
    [viewX, viewY, viewW, viewH],
    ([x, y, w, h]) => `${x} ${y} ${w} ${h}`,
  )

  useEffect(() => {
    let cancelled = false
    fetch('/data/countries-110m.json')
      .then((r) => {
        if (!r.ok) throw new Error('Could not load world map')
        return r.json()
      })
      .then((topo: WorldTopology) => {
        if (cancelled) return
        setFeatures(countriesFromTopo(topo))
      })
      .catch((err: Error) => {
        if (!cancelled) setLoadError(err.message)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const projection = useMemo(() => buildProjection(MAP_W, MAP_H), [])
  const path = useMemo(() => geoPath(projection), [projection])

  const featureById = useMemo(() => {
    const map = new Map<string, CountryFeature>()
    for (const f of features) {
      if (f.id != null) map.set(String(f.id), f)
    }
    return map
  }, [features])

  useEffect(() => {
    if (!selected) {
      void animate(viewX, 0, { duration: 0.55, ease: [0.22, 1, 0.36, 1] })
      void animate(viewY, 0, { duration: 0.55, ease: [0.22, 1, 0.36, 1] })
      void animate(viewW, MAP_W, { duration: 0.55, ease: [0.22, 1, 0.36, 1] })
      void animate(viewH, MAP_H, { duration: 0.55, ease: [0.22, 1, 0.36, 1] })
      return
    }
    const feat = featureById.get(selected.id)
    if (!feat) return
    const bounds = path.bounds(feat as GeoPermissibleObjects)
    const [[x0, y0], [x1, y1]] = bounds
    const pad = 36
    let w = Math.max(x1 - x0, 24) + pad * 2
    let h = Math.max(y1 - y0, 24) + pad * 2
    const aspect = MAP_W / MAP_H
    if (w / h > aspect) h = w / aspect
    else w = h * aspect
    // Cap zoom so tiny countries don't explode
    const maxZoom = 8
    if (MAP_W / w > maxZoom) {
      w = MAP_W / maxZoom
      h = MAP_H / maxZoom
    }
    const cx = (x0 + x1) / 2
    const cy = (y0 + y1) / 2
    void animate(viewX, cx - w / 2, { type: 'spring', stiffness: 160, damping: 24 })
    void animate(viewY, cy - h / 2, { type: 'spring', stiffness: 160, damping: 24 })
    void animate(viewW, w, { type: 'spring', stiffness: 160, damping: 24 })
    void animate(viewH, h, { type: 'spring', stiffness: 160, damping: 24 })
  }, [selected, featureById, path, viewX, viewY, viewW, viewH])

  function fillFor(id: string | undefined): string {
    if (!id) return 'var(--land)'
    if (selected?.id === id) return 'var(--selected)'
    if (neighborIds.has(id)) return 'var(--neighbor)'
    if (continentFilter !== 'All' && !countryIdsInFilter.has(id)) {
      return 'var(--land-muted)'
    }
    if (hovered === id) return 'var(--land-hover)'
    return 'var(--land)'
  }

  return (
    <section className="map-stage" aria-label="Interactive world map">
      <div className="map-frame">
        {loadError && <p className="map-error">{loadError}</p>}
        <motion.svg
          ref={svgRef}
          className="world-map"
          viewBox={viewBox as unknown as string}
          role="img"
          aria-label="World map. Click a country to learn about it."
        >
          <defs>
            <radialGradient id="ocean-glow" cx="50%" cy="45%" r="65%">
              <stop offset="0%" stopColor="var(--ocean-light)" />
              <stop offset="100%" stopColor="var(--ocean)" />
            </radialGradient>
            <filter id="soft-pop" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodOpacity="0.28" />
            </filter>
          </defs>

          <rect x={-MAP_W} y={-MAP_H} width={MAP_W * 3} height={MAP_H * 3} fill="url(#ocean-glow)" />

          <path
            d={path({ type: 'Sphere' }) ?? undefined}
            fill="url(#ocean-glow)"
            stroke="var(--ocean-edge)"
            strokeWidth={1.2}
          />

          {features.map((feat) => {
            const id = feat.id != null ? String(feat.id) : undefined
            const d = path(feat as GeoPermissibleObjects)
            if (!d || !id) return null
            const isSelected = selected?.id === id
            const isNeighbor = neighborIds.has(id)
            const [cx, cy] = featureCentroid(feat, MAP_W, MAP_H)

            return (
              <motion.path
                key={id}
                d={d}
                className={`country-path${isSelected ? ' is-selected' : ''}${isNeighbor ? ' is-neighbor' : ''}`}
                fill={fillFor(id)}
                stroke={isSelected ? 'var(--selected-stroke)' : isNeighbor ? 'var(--neighbor-stroke)' : 'var(--land-stroke)'}
                strokeWidth={isSelected ? 1.35 : isNeighbor ? 1.05 : 0.45}
                style={{
                  transformOrigin: `${cx}px ${cy}px`,
                  cursor: 'pointer',
                  filter: isSelected ? 'url(#soft-pop)' : undefined,
                }}
                initial={false}
                animate={{
                  scale: isSelected ? 1.045 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 22,
                  mass: 0.55,
                }}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelectId(id)}
              >
                <title>{feat.properties.name}</title>
              </motion.path>
            )
          })}
        </motion.svg>

        {selected && (
          <motion.div
            key={selected.cca3}
            className="map-pin"
            initial={{ opacity: 0, scale: 0.6, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
          >
            <span className="map-pin-flag">{selected.flag}</span>
            <span>
              <strong>{selected.name}</strong>
              <em>{selected.capital ? `Capital: ${selected.capital}` : selected.continent}</em>
            </span>
          </motion.div>
        )}
      </div>

      <div className="map-legend" aria-hidden="true">
        <span>
          <i className="swatch selected" /> Selected
        </span>
        <span>
          <i className="swatch neighbor" /> Neighbouring countries
        </span>
        <span>
          <i className="swatch land" /> Other lands
        </span>
      </div>
    </section>
  )
}
