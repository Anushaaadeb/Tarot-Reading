import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { TarotReading } from './components/TarotReading'
import { ZodiacSection } from './components/ZodiacSection'
import { AstrologySection } from './components/AstrologySection'

export default function App() {
  return (
    <div className="app-shell">
      <div className="cosmic-bg" aria-hidden>
        <div className="gold-veil" />
      </div>
      <div className="app-content">
        <Nav />
        <Hero />
        <div className="divider" />
        <TarotReading />
        <div className="divider" />
        <ZodiacSection />
        <div className="divider" />
        <AstrologySection />
        <footer className="site-footer">
          <p className="brand">ARCANA VEIL</p>
          <p>For reflection and wonder — not medical, legal, or financial advice.</p>
        </footer>
      </div>
    </div>
  )
}
