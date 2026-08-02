import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ELEMENTS,
  MOON_PHASES,
  PLANETS,
  getMoonPhase,
  type MoonPhaseId,
} from '../data/astrology'

export function AstrologySection() {
  const liveMoon = useMemo(() => getMoonPhase(new Date()), [])
  const [manualPhase, setManualPhase] = useState<MoonPhaseId | 'live'>('live')

  const moon = manualPhase === 'live'
    ? liveMoon
    : MOON_PHASES.find((m) => m.id === manualPhase)!

  return (
    <section className="section" id="astrology">
      <div className="section-head">
        <p className="section-eyebrow">Astrology · Sky Craft</p>
        <h2 className="section-title">
          Moon, planets &amp; <em>elements</em>
        </h2>
        <p className="section-desc">
          Lunar timing, planetary domains, and the four elemental currents behind every chart.
        </p>
      </div>

      <div className="astro-tools">
        <motion.div
          className="tool-panel"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <h3>Moon phase</h3>
          <p>Work with the current lunar weather — or explore any phase of the cycle.</p>
          <div className="field">
            <label htmlFor="moon-select">Phase</label>
            <select
              id="moon-select"
              value={manualPhase}
              onChange={(e) => setManualPhase(e.target.value as MoonPhaseId | 'live')}
            >
              <option value="live">Tonight’s moon (approx.)</option>
              {MOON_PHASES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div className="moon-display">
            <div className="moon-glyph" aria-hidden>
              {moon.symbol}
            </div>
            <div>
              <h4>{moon.name}</h4>
              <p>{moon.guidance}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="tool-panel"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3>Planetary domains</h3>
          <p>Each planet colors a different layer of life — from identity to rebirth.</p>
          <div className="planet-list">
            {PLANETS.map((p) => (
              <div key={p.id} className="planet-row">
                <span className="planet-sym" aria-hidden>
                  {p.symbol}
                </span>
                <div>
                  <strong>{p.name}</strong>
                  <span>{p.domain}</span>
                  <p>{p.influence}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{ marginTop: '2rem' }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
      >
        <h3
          style={{
            fontSize: '1rem',
            color: 'var(--gold-bright)',
            marginBottom: '0.75rem',
          }}
        >
          The four elements
        </h3>
        <p style={{ color: 'var(--muted)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
          Every sign and every suit of the minor arcana burns, roots, breathes, or flows.
        </p>
        <div className="element-row">
          {(Object.keys(ELEMENTS) as (keyof typeof ELEMENTS)[]).map((key) => {
            const el = ELEMENTS[key]
            return (
              <div key={key} className="element-tile">
                <span className="el-sym">{el.symbol}</span>
                <strong>{el.name}</strong>
                <p>{el.description}</p>
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
