import { motion } from 'framer-motion'
import type { TarotCard } from '../data/tarot'

interface Props {
  card: TarotCard
  reversed?: boolean
  compact?: boolean
}

export function TarotCardFace({ card, reversed = false, compact = false }: Props) {
  const num =
    card.arcana === 'major'
      ? card.number === 0
        ? '0'
        : String(card.number).padStart(2, '0')
      : card.number
        ? String(card.number)
        : '·'

  return (
    <motion.div
      className={`tarot-face ${reversed ? 'reversed' : ''}`}
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      style={compact ? { maxWidth: 120 } : undefined}
    >
      <div className="face-number">{num}</div>
      <div className="face-symbol">{card.symbol}</div>
      <div>
        <div className="face-name">{card.name}</div>
        <div className="face-arcana">
          {card.arcana === 'major' ? 'Major Arcana' : card.suit}
        </div>
      </div>
      {!compact && (
        <div className="face-keywords">{card.keywords.slice(0, 2).join(' · ')}</div>
      )}
    </motion.div>
  )
}
