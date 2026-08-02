export interface SpreadPosition {
  id: string
  label: string
  prompt: string
}

export interface Spread {
  id: string
  name: string
  description: string
  cardCount: number
  positions: SpreadPosition[]
  questionHint: string
}

export const SPREADS: Spread[] = [
  {
    id: 'single',
    name: 'Single Card',
    description: 'One clear answer for a focused question.',
    cardCount: 1,
    questionHint: 'What do I most need to know right now?',
    positions: [
      { id: 'answer', label: 'The Answer', prompt: 'Direct response to your question' },
    ],
  },
  {
    id: 'three-card',
    name: 'Past · Present · Future',
    description: 'A classic three-card arc through time.',
    cardCount: 3,
    questionHint: 'Where am I coming from, and where am I headed?',
    positions: [
      { id: 'past', label: 'Past', prompt: 'What shaped this situation' },
      { id: 'present', label: 'Present', prompt: 'What is active now' },
      { id: 'future', label: 'Future', prompt: 'Where this path leads' },
    ],
  },
  {
    id: 'situation',
    name: 'Situation · Action · Outcome',
    description: 'Clarify the problem, the move, and the result.',
    cardCount: 3,
    questionHint: 'What should I do about this situation?',
    positions: [
      { id: 'situation', label: 'Situation', prompt: 'The heart of the matter' },
      { id: 'action', label: 'Action', prompt: 'What you are called to do' },
      { id: 'outcome', label: 'Outcome', prompt: 'Likely result of that action' },
    ],
  },
  {
    id: 'relationship',
    name: 'Relationship Cross',
    description: 'Five cards mapping you, them, and the bond.',
    cardCount: 5,
    questionHint: 'What is the true nature of this connection?',
    positions: [
      { id: 'you', label: 'You', prompt: 'Your energy in the bond' },
      { id: 'them', label: 'Them', prompt: 'Their energy in the bond' },
      { id: 'bond', label: 'The Bond', prompt: 'What connects you' },
      { id: 'challenge', label: 'Challenge', prompt: 'What strains the connection' },
      { id: 'potential', label: 'Potential', prompt: 'Where this can grow' },
    ],
  },
  {
    id: 'horseshoe',
    name: 'Horseshoe',
    description: 'Seven positions for a full narrative reading.',
    cardCount: 7,
    questionHint: 'What is the full story around this question?',
    positions: [
      { id: 'past', label: 'Past Influence', prompt: 'Root of the matter' },
      { id: 'present', label: 'Present', prompt: 'Current climate' },
      { id: 'hidden', label: 'Hidden', prompt: 'What you cannot yet see' },
      { id: 'obstacles', label: 'Obstacles', prompt: 'What stands in the way' },
      { id: 'environment', label: 'Environment', prompt: 'People and forces around you' },
      { id: 'advice', label: 'Advice', prompt: 'Guidance from the cards' },
      { id: 'outcome', label: 'Outcome', prompt: 'Most likely resolution' },
    ],
  },
  {
    id: 'celtic-cross',
    name: 'Celtic Cross',
    description: 'The classic ten-card deep dive.',
    cardCount: 10,
    questionHint: 'What do I need to understand about this chapter of my life?',
    positions: [
      { id: 'present', label: 'Present', prompt: 'The situation as it stands' },
      { id: 'challenge', label: 'Challenge', prompt: 'Crossing influence' },
      { id: 'foundation', label: 'Foundation', prompt: 'Deep root of the matter' },
      { id: 'recent-past', label: 'Recent Past', prompt: 'What is fading' },
      { id: 'crown', label: 'Crown', prompt: 'Possible best outcome' },
      { id: 'near-future', label: 'Near Future', prompt: 'What approaches' },
      { id: 'self', label: 'Self', prompt: 'How you show up' },
      { id: 'environment', label: 'Environment', prompt: 'External influences' },
      { id: 'hopes-fears', label: 'Hopes & Fears', prompt: 'Inner weather' },
      { id: 'outcome', label: 'Outcome', prompt: 'Culmination of the path' },
    ],
  },
  {
    id: 'yes-no',
    name: 'Yes / No Oracle',
    description: 'One card weighted toward a clear yes, no, or maybe.',
    cardCount: 1,
    questionHint: 'Ask a question that can be answered yes or no.',
    positions: [
      { id: 'oracle', label: 'Oracle', prompt: 'Yes, no, or not yet' },
    ],
  },
]

export function answerFromCards(
  question: string,
  spread: Spread,
  draws: { cardName: string; reversed: boolean; meaning: string; positionLabel: string; keywords: string[] }[],
): string {
  const q = question.trim() || spread.questionHint
  const lines: string[] = []

  lines.push(`Regarding “${q}”, the ${spread.name} spread speaks clearly.`)

  if (spread.id === 'yes-no' && draws[0]) {
    const d = draws[0]
    const positive = !d.reversed && !/loss|death|devil|tower|five|ten of swords|three of swords/i.test(d.cardName)
    const lean = d.reversed ? 'leaning no / not yet' : positive ? 'leaning yes' : 'leaning caution'
    lines.push(`The oracle draws ${d.cardName}${d.reversed ? ' (reversed)' : ''}: ${lean}. ${d.meaning}`)
    return lines.join(' ')
  }

  for (const d of draws) {
    lines.push(
      `${d.positionLabel}: ${d.cardName}${d.reversed ? ' reversed' : ''} — ${d.meaning}`,
    )
  }

  const themes = draws.flatMap((d) => d.keywords).slice(0, 6)
  if (themes.length) {
    lines.push(`Thread through the reading: ${themes.join(', ')}. Hold these as the living answer to your question.`)
  }

  return lines.join(' ')
}
