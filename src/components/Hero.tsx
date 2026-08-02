import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-visual" aria-hidden>
        <div className="hero-orb" />
        <div className="hero-ring" />
      </div>
      <div className="hero-copy">
        <motion.h1
          className="hero-brand"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Arcana Veil
        </motion.h1>
        <motion.p
          className="hero-line"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Draw the cards. Read the stars. Ask what only you can ask.
        </motion.p>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Major and minor arcana, living spreads, zodiac guidance, and lunar astrology — in violet, gold, and night.
        </motion.p>
        <motion.div
          className="cta-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <a className="btn btn-gold" href="#reading">
            Begin a reading
          </a>
          <a className="btn btn-ghost" href="#zodiac">
            Explore the zodiac
          </a>
        </motion.div>
      </div>
    </section>
  )
}
