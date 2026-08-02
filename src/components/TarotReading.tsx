import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TAROT_DECK, shuffleDeck, getCardMeaning, type Arcana, type Suit, type TarotCard } from '../data/tarot'
import { SPREADS, answerFromCards, type Spread } from '../data/spreads'
import { TarotCardFace } from './TarotCardFace'

type Filter = 'all' | Arcana | Exclude<Suit, null>
type Step = 'spread' | 'question' | 'pick' | 'reveal'

interface Draw {
  card: TarotCard
  reversed: boolean
  positionIndex: number
}

export function TarotReading() {
  const [step, setStep] = useState<Step>('spread')
  const [spread, setSpread] = useState<Spread>(SPREADS[1])
  const [question, setQuestion] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [deckOrder, setDeckOrder] = useState(() => shuffleDeck())
  const [draws, setDraws] = useState<Draw[]>([])
  const [answer, setAnswer] = useState('')

  const filteredDeck = useMemo(() => {
    return deckOrder.filter((c) => {
      if (filter === 'all') return true
      if (filter === 'major' || filter === 'minor') return c.arcana === filter
      return c.suit === filter
    })
  }, [deckOrder, filter])

  const remaining = spread.cardCount - draws.length
  const pickedIds = new Set(draws.map((d) => d.card.id))

  function selectSpread(s: Spread) {
    setSpread(s)
    setDraws([])
    setAnswer('')
    setQuestion(s.questionHint)
    setStep('question')
  }

  function startPicking() {
    setDeckOrder(shuffleDeck())
    setDraws([])
    setAnswer('')
    setStep('pick')
  }

  function pickCard(card: TarotCard) {
    if (pickedIds.has(card.id) || draws.length >= spread.cardCount) return
    const reversed = Math.random() < 0.28
    const next = [...draws, { card, reversed, positionIndex: draws.length }]
    setDraws(next)
    if (next.length === spread.cardCount) {
      const payload = next.map((d) => ({
        cardName: d.card.name,
        reversed: d.reversed,
        meaning: getCardMeaning(d.card, d.reversed),
        positionLabel: spread.positions[d.positionIndex].label,
        keywords: d.card.keywords,
      }))
      setAnswer(answerFromCards(question, spread, payload))
      setStep('reveal')
    }
  }

  function resetReading() {
    setDraws([])
    setAnswer('')
    setDeckOrder(shuffleDeck())
    setStep('spread')
  }

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'Full deck' },
    { id: 'major', label: 'Major' },
    { id: 'minor', label: 'Minor' },
    { id: 'wands', label: 'Wands' },
    { id: 'cups', label: 'Cups' },
    { id: 'swords', label: 'Swords' },
    { id: 'pentacles', label: 'Pentacles' },
  ]

  return (
    <section className="section" id="reading">
      <div className="section-head">
        <p className="section-eyebrow">Tarot · Major & Minor Arcana</p>
        <h2 className="section-title">
          Choose your <em>spread</em>
        </h2>
        <p className="section-desc">
          Ask a precise question, then pick each card yourself from the shuffled veil.
        </p>
      </div>

      <div className="step-bar" aria-label="Reading steps">
        {(
          [
            ['spread', '1 · Spread'],
            ['question', '2 · Question'],
            ['pick', '3 · Pick cards'],
            ['reveal', '4 · Reading'],
          ] as const
        ).map(([id, label]) => (
          <span
            key={id}
            className={`step ${step === id ? 'active' : ''} ${
              (id === 'spread' && step !== 'spread') ||
              (id === 'question' && (step === 'pick' || step === 'reveal')) ||
              (id === 'pick' && step === 'reveal')
                ? 'done'
                : ''
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {(step === 'spread' || step === 'question') && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <div className="spread-grid">
              {SPREADS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`spread-option ${spread.id === s.id && step !== 'spread' ? 'selected' : ''} ${
                    spread.id === s.id && step === 'spread' ? 'selected' : ''
                  }`}
                  onClick={() => selectSpread(s)}
                >
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                  <span className="spread-meta">{s.cardCount} card{s.cardCount > 1 ? 's' : ''}</span>
                </button>
              ))}
            </div>

            {step === 'question' && (
              <motion.div
                className="question-panel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label htmlFor="tarot-question">Your question — be specific</label>
                <textarea
                  id="tarot-question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={spread.questionHint}
                />
                <div className="cta-row" style={{ marginTop: '1.25rem' }}>
                  <button type="button" className="btn btn-gold" onClick={startPicking}>
                    Shuffle & pick cards
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={() => setStep('spread')}>
                    Change spread
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === 'pick' && (
          <motion.div
            key="pick"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="picker-status">
              <p>
                Selecting for <strong>{spread.positions[draws.length]?.label ?? '…'}</strong>
                {' — '}
                {remaining} card{remaining === 1 ? '' : 's'} remaining
              </p>
              <button type="button" className="btn btn-ghost" onClick={resetReading}>
                Start over
              </button>
            </div>

            {draws.length > 0 && (
              <div className="positions-row">
                {draws.map((d) => (
                  <div key={d.card.id} className="position-slot">
                    <span className="position-label">{spread.positions[d.positionIndex].label}</span>
                    <TarotCardFace card={d.card} reversed={d.reversed} compact />
                    {d.reversed && <span className="rev-badge">Reversed</span>}
                  </div>
                ))}
              </div>
            )}

            <div className="filter-row">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`chip ${filter === f.id ? 'active' : ''}`}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>
              {TAROT_DECK.length} cards in the veil · filter to focus major or a suit · tap to draw
            </p>

            <div className="deck-grid" role="listbox" aria-label="Shuffled tarot deck">
              {filteredDeck.map((card, i) => {
                const selected = pickedIds.has(card.id)
                const disabled = selected || draws.length >= spread.cardCount
                return (
                  <motion.button
                    key={card.id}
                    type="button"
                    className={`deck-card ${selected ? 'selected' : ''} ${disabled && !selected ? 'disabled' : ''}`}
                    onClick={() => pickCard(card)}
                    disabled={disabled}
                    role="option"
                    aria-selected={selected}
                    aria-label={selected ? `${card.name} selected` : `Draw face-down card ${i + 1}`}
                    whileHover={disabled ? undefined : { scale: 1.04 }}
                    whileTap={disabled ? undefined : { scale: 0.96 }}
                  >
                    <div className="deck-card-inner">
                      <span className="sigil">✦</span>
                      <span className="back-mark">{selected ? 'DRAWN' : 'ARCANA'}</span>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}

        {step === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="picker-status">
              <p>
                <strong>{spread.name}</strong> for your question
              </p>
              <div className="cta-row">
                <button type="button" className="btn btn-purple" onClick={startPicking}>
                  Draw again
                </button>
                <button type="button" className="btn btn-ghost" onClick={resetReading}>
                  New spread
                </button>
              </div>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontStyle: 'italic',
                color: 'var(--muted)',
                marginBottom: '1.5rem',
              }}
            >
              “{question.trim() || spread.questionHint}”
            </p>

            <div className="positions-row">
              {draws.map((d) => (
                <div key={d.card.id} className="position-slot">
                  <span className="position-label">{spread.positions[d.positionIndex].label}</span>
                  <TarotCardFace card={d.card} reversed={d.reversed} />
                  {d.reversed && <span className="rev-badge">Reversed</span>}
                </div>
              ))}
            </div>

            <div className="reading-answer">
              <h3>The cards answer</h3>
              <p className="answer-body">{answer}</p>
              <div className="card-detail-list">
                {draws.map((d) => (
                  <div key={`detail-${d.card.id}`} className="card-detail">
                    <h4>
                      {spread.positions[d.positionIndex].label} · {d.card.name}
                      {d.reversed ? ' (reversed)' : ''}
                    </h4>
                    <p>{spread.positions[d.positionIndex].prompt}</p>
                    <p style={{ marginTop: '0.4rem', color: 'var(--cream)' }}>
                      {getCardMeaning(d.card, d.reversed)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
