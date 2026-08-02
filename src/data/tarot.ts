export type Arcana = 'major' | 'minor'
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles' | null

export interface TarotCard {
  id: string
  name: string
  arcana: Arcana
  suit: Suit
  number: number | null
  upright: string
  reversed: string
  keywords: string[]
  symbol: string
}

const major: Omit<TarotCard, 'arcana' | 'suit'>[] = [
  { id: 'major-0', name: 'The Fool', number: 0, symbol: '☆', keywords: ['beginnings', 'innocence', 'leap of faith'], upright: 'A fresh start and radical trust. The universe is opening a door — step through with curiosity rather than fear.', reversed: 'Hesitation or reckless abandon. Pause before leaping; check whether fear or impulsiveness is steering you.' },
  { id: 'major-1', name: 'The Magician', number: 1, symbol: '✦', keywords: ['will', 'manifestation', 'skill'], upright: 'You have every tool you need. Focus your will and the outcome bends toward you.', reversed: 'Scattered energy or manipulation. Gather your resources before acting; integrity matters.' },
  { id: 'major-2', name: 'The High Priestess', number: 2, symbol: '☾', keywords: ['intuition', 'mystery', 'inner knowing'], upright: 'Listen beneath the noise. Answers live in silence and dream — trust what you already sense.', reversed: 'Blocked intuition or secrets kept too long. Still the mind; what is hidden wants light.' },
  { id: 'major-3', name: 'The Empress', number: 3, symbol: '❀', keywords: ['abundance', 'nurture', 'creation'], upright: 'Creativity and care are fertile now. Tend what you love and it will multiply.', reversed: 'Creative drought or over-giving. Restore yourself so you can nurture again.' },
  { id: 'major-4', name: 'The Emperor', number: 4, symbol: '♛', keywords: ['structure', 'authority', 'stability'], upright: 'Build the framework. Discipline and clear boundaries create lasting power.', reversed: 'Rigidity or loss of control. Soften the grip without abandoning the throne.' },
  { id: 'major-5', name: 'The Hierophant', number: 5, symbol: '✝', keywords: ['tradition', 'teaching', 'belief'], upright: 'Seek wisdom in lineage and shared ritual. A mentor or system can guide your next step.', reversed: 'Question inherited dogma. Your own path may diverge from the expected one.' },
  { id: 'major-6', name: 'The Lovers', number: 6, symbol: '♡', keywords: ['union', 'choice', 'alignment'], upright: 'A meaningful bond or a values-based choice. Align heart and mind before you commit.', reversed: 'Misalignment or avoided choice. Name what you truly want; harmony cannot be faked.' },
  { id: 'major-7', name: 'The Chariot', number: 7, symbol: '⚔', keywords: ['drive', 'victory', 'direction'], upright: 'Harness opposing forces and charge forward. Victory comes through focused will.', reversed: 'Lost direction or force without purpose. Recalibrate before you push harder.' },
  { id: 'major-8', name: 'Strength', number: 8, symbol: '♌', keywords: ['courage', 'compassion', 'inner power'], upright: 'Gentle mastery over fear. Soft strength outlasts brute force.', reversed: 'Self-doubt or unchecked impulse. Meet the beast within with patience, not shame.' },
  { id: 'major-9', name: 'The Hermit', number: 9, symbol: '⬡', keywords: ['solitude', 'wisdom', 'retreat'], upright: 'Withdraw to find the lantern. Solitude clarifies what crowds obscure.', reversed: 'Isolation turned lonely, or advice ignored. Reconnect when the insight is ready to share.' },
  { id: 'major-10', name: 'Wheel of Fortune', number: 10, symbol: '☸', keywords: ['cycles', 'fate', 'turning point'], upright: 'The wheel turns in your favor. Embrace change; luck rides the current.', reversed: 'Resistance to necessary change. What feels like bad luck may be a course correction.' },
  { id: 'major-11', name: 'Justice', number: 11, symbol: '⚖', keywords: ['truth', 'balance', 'accountability'], upright: 'Fairness arrives. Cause and effect are clear — own your part and receive what is due.', reversed: 'Imbalance or denial. Honesty restores the scales; evasion tips them further.' },
  { id: 'major-12', name: 'The Hanged Man', number: 12, symbol: '∇', keywords: ['surrender', 'perspective', 'pause'], upright: 'Hang upside down to see anew. Surrender is not defeat — it is a different kind of progress.', reversed: 'Stalling or martyrdom. Release the pose when the lesson is learned.' },
  { id: 'major-13', name: 'Death', number: 13, symbol: '☠', keywords: ['ending', 'transformation', 'rebirth'], upright: 'Something ends so something truer can begin. Let go cleanly; transformation needs space.', reversed: 'Clinging to what has expired. Resistance only prolongs the dying.' },
  { id: 'major-14', name: 'Temperance', number: 14, symbol: '⚗', keywords: ['balance', 'alchemy', 'moderation'], upright: 'Blend opposites into gold. Patience and proportion create lasting harmony.', reversed: 'Excess or impatience. Find the middle path before extremes fracture what you are building.' },
  { id: 'major-15', name: 'The Devil', number: 15, symbol: '⛓', keywords: ['bondage', 'shadow', 'desire'], upright: 'Name the chain that binds you. Awareness is the first cut toward freedom.', reversed: 'Breaking free. The shadow loses power when brought into the light.' },
  { id: 'major-16', name: 'The Tower', number: 16, symbol: '⚡', keywords: ['upheaval', 'revelation', 'collapse'], upright: 'False structures fall. Shocking as it is, the lightning clears what could not stand.', reversed: 'Delayed collapse or fear of change. Better a controlled demolition than a sudden crash.' },
  { id: 'major-17', name: 'The Star', number: 17, symbol: '✧', keywords: ['hope', 'healing', 'guidance'], upright: 'After the storm, quiet light. Trust the long game of healing and inspiration.', reversed: 'Dimmed hope or cynicism. Look up — the stars are still there even when clouds cover them.' },
  { id: 'major-18', name: 'The Moon', number: 18, symbol: '☽', keywords: ['illusion', 'emotion', 'dreams'], upright: 'Things are not as they seem. Navigate by feeling, but verify before you leap.', reversed: 'Clarity returning. Illusions dissolve; trust your clearer sight.' },
  { id: 'major-19', name: 'The Sun', number: 19, symbol: '☀', keywords: ['joy', 'vitality', 'success'], upright: 'Warmth, clarity, and celebration. Success is illuminated — bask and share it.', reversed: 'Temporary cloud over joy. The sun has not left; wait for the weather to shift.' },
  { id: 'major-20', name: 'Judgement', number: 20, symbol: '🎺', keywords: ['awakening', 'reckoning', 'calling'], upright: 'A call to rise. Answer with honesty; this is a rebirth, not a trial alone.', reversed: 'Self-judgment or ignored calling. Forgive the past so you can hear the trumpet.' },
  { id: 'major-21', name: 'The World', number: 21, symbol: '◎', keywords: ['completion', 'wholeness', 'integration'], upright: 'A cycle completes in beauty. Celebrate the journey and prepare for the next spiral.', reversed: 'Almost there. Tie loose ends; incomplete closure blocks the next beginning.' },
]

const suitMeta: Record<Exclude<Suit, null>, { symbol: string; theme: string }> = {
  wands: { symbol: '🜂', theme: 'fire, will, creativity' },
  cups: { symbol: '🜄', theme: 'water, emotion, relationships' },
  swords: { symbol: '🜁', theme: 'air, intellect, conflict' },
  pentacles: { symbol: '🜃', theme: 'earth, body, material' },
}

const courtNames = ['Page', 'Knight', 'Queen', 'King'] as const
const pipNames = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'] as const

const suitMeanings: Record<Exclude<Suit, null>, { upright: string[]; reversed: string[]; keywords: string[][] }> = {
  wands: {
    keywords: [
      ['inspiration', 'potential', 'spark'], ['planning', 'vision', 'choice'], ['expansion', 'foresight', 'leadership'],
      ['celebration', 'home', 'harmony'], ['conflict', 'rivalry', 'tension'], ['victory', 'recognition', 'progress'],
      ['defense', 'perseverance', 'challenge'], ['speed', 'news', 'movement'], ['resilience', 'boundaries', 'last stand'],
      ['burden', 'responsibility', 'ambition'], ['explore', 'messages', 'study'], ['action', 'adventure', 'pursuit'],
      ['confidence', 'passion', 'magnetism'], ['vision', 'enterprise', 'authority'],
    ],
    upright: [
      'A creative spark ignites. Seize the opening before the flame cools.',
      'Two paths of ambition appear. Choose the vision that truly fires you.',
      'Your plans expand into the distance. Lead with foresight and courage.',
      'A moment of warmth and belonging. Celebrate what you have built.',
      'Competition stirs. Channel rivalry into clearer purpose, not chaos.',
      'Public recognition arrives. Ride the momentum of hard-won success.',
      'Stand your ground. Perseverance under pressure reveals true grit.',
      'Swift movement and messages. Act while the window is open.',
      'You have come far under fire. Guard your energy; you are nearly through.',
      'Heavy loads of ambition. Delegate or release what is no longer yours to carry.',
      'Curious messenger of fire. Study, travel, or a bold idea seeks an apprentice.',
      'Charge toward the quest. Adventure favors the decisive.',
      'Magnetic creative force. Lead with warmth and unapologetic passion.',
      'Visionary authority. Build empires of meaning, not merely of power.',
    ],
    reversed: [
      'Blocked inspiration. Clear the clutter so the spark can catch.',
      'Indecision or fear of choosing wrong. Either path teaches — pick one.',
      'Delays in expansion. Recheck the foundation before building higher.',
      'Tension at home or premature celebration. Restore harmony first.',
      'Avoidable conflict. Step back from ego battles that drain everyone.',
      'Hollow victory or delayed recognition. Define success on your terms.',
      'Feeling overwhelmed. You need not defend every front at once.',
      'Scattered energy or missed messages. Slow down enough to aim.',
      'Exhaustion. Rest is strategy, not surrender.',
      'Oppressive responsibility. Put some burdens down without guilt.',
      'Immature enthusiasm or bad news. Refine the idea before launching.',
      'Reckless haste. Passion without direction burns out fast.',
      'Jealousy or dimmed fire. Reclaim your creative sovereignty.',
      'Tyranny of vision. Soften control; invite collaboration.',
    ],
  },
  cups: {
    keywords: [
      ['love', 'intuition', 'offering'], ['partnership', 'union', 'attraction'], ['friendship', 'celebration', 'community'],
      ['apathy', 'contemplation', 'withdrawal'], ['loss', 'grief', 'regret'], ['nostalgia', 'innocence', 'reunion'],
      ['fantasy', 'choices', 'illusion'], ['departure', 'seeking', 'discernment'], ['wish', 'satisfaction', 'emotion'],
      ['fulfillment', 'family', 'harmony'], ['sensitivity', 'messages', 'dreams'], ['romance', 'invitation', 'idealism'],
      ['compassion', 'intuition', 'nurture'], ['emotional mastery', 'diplomacy', 'generosity'],
    ],
    upright: [
      'The heart opens. Receive love, intuition, or a creative offering with grace.',
      'A meaningful bond deepens. Mutual care asks for equal presence.',
      'Friendship and celebration. Gather your people; joy multiplies in company.',
      'Emotional pause. Contemplation is useful — do not mistake it for permanent withdrawal.',
      'Grief asks to be felt. Honor the loss so healing can begin.',
      'Sweet nostalgia or innocent reunion. Let kindness lead.',
      'Many options glitter. Discern which cup is real and which is fantasy.',
      'Walking away from what no longer nourishes. Seek deeper waters.',
      'A wish fulfilled. Emotional satisfaction is within reach — receive it.',
      'Emotional fulfillment and family harmony. Share the abundance of the heart.',
      'Sensitive messenger. Dreams and feelings carry important news.',
      'Romantic invitation or idealistic quest. Lead with sincerity.',
      'Deep compassion and intuition. Nurture others without abandoning yourself.',
      'Emotional mastery and generous leadership. Rule the heart with wisdom.',
    ],
    reversed: [
      'Blocked feelings or refused offering. Soften enough to receive.',
      'Imbalance in partnership. Rebalance give and take.',
      'Overindulgence or social friction. Celebrate with awareness.',
      'Stuck apathy. Gently re-engage with life when ready.',
      'Clinging to regret. Release what cannot be rewritten.',
      'Living in the past. Bring sweetness into the present.',
      'Delusion or overwhelm of choices. Ground before deciding.',
      'Avoiding necessary departure. Staying may cost more than leaving.',
      'Wish deferred or emotional dissatisfaction. Clarify what you truly want.',
      'Family tension or empty fulfillment. Repair the emotional foundation.',
      'Emotional immaturity or ignored intuition. Listen inward.',
      'Moodiness or unrealistic romance. Temper idealism with honesty.',
      'Emotional manipulation or drained empathy. Restore your boundaries.',
      'Emotional coldness or volatility. Reconnect with feeling skillfully.',
    ],
  },
  swords: {
    keywords: [
      ['clarity', 'truth', 'breakthrough'], ['stalemate', 'choice', 'truce'], ['heartbreak', 'sorrow', 'release'],
      ['rest', 'recovery', 'meditation'], ['conflict', 'defeat', 'humiliation'], ['transition', 'rite', 'leaving'],
      ['deception', 'strategy', 'theft'], ['restriction', 'mind-prison', 'isolation'], ['anxiety', 'worry', 'nightmares'],
      ['ending', 'ruin', 'closure'], ['curiosity', 'vigilance', 'ideas'], ['ambition', 'action', 'intellect'],
      ['truth', 'clarity', 'independence'], ['authority', 'ethics', 'intellect'],
    ],
    upright: [
      'A blade of clarity cuts through confusion. Speak and act from truth.',
      'A stalemate of ideas. Choose, or negotiate a conscious truce.',
      'Heartbreak or sorrow. Let the pain move through; release is coming.',
      'Needed rest after mental battle. Recover before the next decision.',
      'Conflict and defeat. Learn from the wound rather than denying it.',
      'A necessary leaving. Honor the passage; transition is sacred.',
      'Strategy or deception in the air. Protect what is yours; stay sharp.',
      'Feeling bound by thought. The prison is often mental — seek a wider view.',
      'Anxiety peaks. Name the fears; most lose power in daylight.',
      'A difficult ending. Closure, however sharp, clears the field.',
      'Alert mind and curious messenger. Ideas want disciplined attention.',
      'Intellectual charge into action. Ambition rides a sharp mind.',
      'Clear-eyed truth-teller. Independence and honesty are your sword.',
      'Ethical authority. Rule with reason, fairness, and firm principle.',
    ],
    reversed: [
      'Confusion returns. Do not force clarity — wait for the fog to lift.',
      'Prolonged indecision. A choice deferred becomes a choice made.',
      'Recovery from heartbreak beginning. Soften the armor carefully.',
      'Restlessness during recovery. Stillness is productive now.',
      'Escaping conflict or clinging to victimhood. Own your agency.',
      'Resisting a needed ending. Completion frees you.',
      'Caught in schemes or paranoia. Return to clean intention.',
      'Opening the mental cage. Freedom starts with one new thought.',
      'Anxiety easing. Keep practices that quiet the mind.',
      'Avoiding finality. Finish what is already over.',
      'Gossip or scattered ideas. Focus the mind before speaking.',
      'Aggression without wisdom. Temper speed with ethics.',
      'Coldness or bitter truth. Soften delivery without abandoning honesty.',
      'Abuse of power or rigid intellect. Temper justice with mercy.',
    ],
  },
  pentacles: {
    keywords: [
      ['opportunity', 'prosperity', 'seed'], ['balance', 'juggling', 'adapt'], ['collaboration', 'skill', 'craft'],
      ['conservation', 'control', 'security'], ['hardship', 'loss', 'worry'], ['generosity', 'charity', 'sharing'],
      ['investment', 'patience', 'assessment'], ['craft', 'diligence', 'mastery'], ['abundance', 'luxury', 'self-sufficiency'],
      ['legacy', 'wealth', 'family'], ['study', 'opportunity', 'manifestation'], ['reliable', 'hardworking', 'steady'],
      ['nurture', 'practicality', 'abundance'], ['prosperity', 'stability', 'enterprise'],
    ],
    upright: [
      'A tangible opportunity seeds. Plant it with care and patience.',
      'Juggling priorities. Stay adaptable; balance is an active skill.',
      'Skilled collaboration. Craftsmanship and teamwork build lasting value.',
      'Conserve resources. Security comes from wise stewardship, not fear.',
      'Material hardship. Practical steps and mutual aid ease the load.',
      'Generosity flows. Share what you have; abundance recirculates.',
      'Long-term investment. Patience assesses what is worth waiting for.',
      'Diligent craft. Mastery grows one careful repetition at a time.',
      'Self-sufficient abundance. Enjoy luxury without losing gratitude.',
      'Legacy and lasting wealth. Build for those who come after you.',
      'Student of the material world. Opportunity favors the prepared apprentice.',
      'Steady, reliable progress. Hard work compounds into trust.',
      'Practical nurture. Abundance is tended like a garden.',
      'Prosperous leadership. Build enterprises that endure and feed many.',
    ],
    reversed: [
      'Missed opportunity or poor planting. Reassess timing and soil.',
      'Overcommitted juggling. Drop what you cannot hold.',
      'Group friction or mediocre craft. Raise the standard together.',
      'Greed or fearful clinging. Security without trust becomes a cage.',
      'Recovery from loss beginning. Rebuild slowly and wisely.',
      'Strings attached to giving, or inability to receive. Clean the exchange.',
      'Impatience with growth. Forcing harvest ruins the crop.',
      'Perfectionism or cut corners. Find the honest middle of craft.',
      'Over-attachment to wealth or false independence. Soften the grip.',
      'Family money stress or unstable legacy. Repair the foundation.',
      'Laziness or wasted talent. Apply yourself to one real skill.',
      'Stubbornness or workaholism. Rest is part of reliability.',
      'Smothering care or neglect of practical needs. Rebalance nurture.',
      'Greed or failed enterprise. Realign power with purpose.',
    ],
  },
}

function buildMinor(): TarotCard[] {
  const suits = Object.keys(suitMeta) as Exclude<Suit, null>[]
  const cards: TarotCard[] = []

  for (const suit of suits) {
    const meta = suitMeta[suit]
    const meanings = suitMeanings[suit]
    for (let i = 0; i < 14; i++) {
      const isCourt = i >= 10
      const name = isCourt
        ? `${courtNames[i - 10]} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`
        : `${pipNames[i]} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`
      cards.push({
        id: `minor-${suit}-${i}`,
        name,
        arcana: 'minor',
        suit,
        number: isCourt ? null : i + 1,
        symbol: meta.symbol,
        keywords: meanings.keywords[i],
        upright: meanings.upright[i],
        reversed: meanings.reversed[i],
      })
    }
  }
  return cards
}

export const TAROT_DECK: TarotCard[] = [
  ...major.map((c) => ({ ...c, arcana: 'major' as const, suit: null })),
  ...buildMinor(),
]

export function shuffleDeck(deck: TarotCard[] = TAROT_DECK): TarotCard[] {
  const copy = [...deck]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function getCardMeaning(card: TarotCard, reversed: boolean): string {
  return reversed ? card.reversed : card.upright
}
