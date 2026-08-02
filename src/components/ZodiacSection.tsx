import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ZODIAC_SIGNS,
  getDailyHoroscope,
  getSunSign,
  type ZodiacSign,
} from '../data/astrology'

export function ZodiacSection() {
  const [selected, setSelected] = useState<ZodiacSign>(ZODIAC_SIGNS[4])
  const horoscope = useMemo(() => getDailyHoroscope(selected), [selected])

  return (
    <section className="section" id="zodiac">
      <div className="section-head">
        <p className="section-eyebrow">Zodiac · Twelve Signs</p>
        <h2 className="section-title">
          Read your <em>sign</em>
        </h2>
        <p className="section-desc">
          Element, modality, love, and career — plus a daily thread of guidance.
        </p>
      </div>

      <div className="zodiac-grid">
        {ZODIAC_SIGNS.map((sign) => (
          <button
            key={sign.id}
            type="button"
            className={`zodiac-chip ${selected.id === sign.id ? 'selected' : ''}`}
            onClick={() => setSelected(sign)}
            aria-pressed={selected.id === sign.id}
          >
            <span className="z-symbol" style={{ color: sign.color }}>
              {sign.symbol}
            </span>
            <span className="z-name">{sign.name}</span>
            <span className="z-dates">{sign.dates}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          className="sign-panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="sign-hero-block">
            <span className="sign-big-symbol" style={{ color: selected.color }}>
              {selected.symbol}
            </span>
            <h3>{selected.name}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{selected.dates}</p>
            <div className="sign-meta">
              <span className="tag">{selected.element}</span>
              <span className="tag">{selected.modality}</span>
              <span className="tag">Ruled by {selected.ruler}</span>
            </div>
            <div className="trait-list">
              {selected.traits.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="sign-copy">
            <h4>Reading</h4>
            <p>{selected.reading}</p>
            <h4>Love</h4>
            <p>{selected.love}</p>
            <h4>Career</h4>
            <p>{selected.career}</p>
            <h4>Today</h4>
            <p className="horoscope-result" style={{ marginTop: '0.5rem' }}>
              {horoscope}
            </p>
            <h4>Strengths</h4>
            <div className="trait-list">
              {selected.strengths.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <h4>Shadows</h4>
            <div className="trait-list">
              {selected.shadows.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <SunSignFinder onFound={setSelected} />
    </section>
  )
}

function SunSignFinder({ onFound }: { onFound: (s: ZodiacSign) => void }) {
  const [date, setDate] = useState('')

  function find() {
    if (!date) return
    const d = new Date(date + 'T12:00:00')
    onFound(getSunSign(d.getMonth() + 1, d.getDate()))
  }

  return (
    <div className="tool-panel" style={{ marginTop: '2rem' }}>
      <h3>Find your sun sign</h3>
      <p>Enter a birth date to highlight your solar sign in the wheel above.</p>
      <div className="field">
        <label htmlFor="birth-date">Birth date</label>
        <input
          id="birth-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="button" className="btn btn-gold" onClick={find} disabled={!date}>
        Reveal sun sign
      </button>
    </div>
  )
}
