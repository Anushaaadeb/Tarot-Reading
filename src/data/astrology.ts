export type Element = 'fire' | 'earth' | 'air' | 'water'
export type Modality = 'cardinal' | 'fixed' | 'mutable'

export interface ZodiacSign {
  id: string
  name: string
  symbol: string
  element: Element
  modality: Modality
  ruler: string
  dates: string
  traits: string[]
  strengths: string[]
  shadows: string[]
  reading: string
  love: string
  career: string
  color: string
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: 'aries', name: 'Aries', symbol: '♈', element: 'fire', modality: 'cardinal', ruler: 'Mars',
    dates: 'Mar 21 – Apr 19', color: '#e85d4c',
    traits: ['bold', 'pioneering', 'direct'], strengths: ['courage', 'initiative', 'honesty'],
    shadows: ['impatience', 'impulsiveness', 'temper'],
    reading: 'Aries season energy favors first moves. Start before you feel ready — momentum is your ally.',
    love: 'Lead with warmth, not conquest. Passion thrives when paired with listening.',
    career: 'Pitch the idea. Launch the project. Visibility rewards the brave.',
  },
  {
    id: 'taurus', name: 'Taurus', symbol: '♉', element: 'earth', modality: 'fixed', ruler: 'Venus',
    dates: 'Apr 20 – May 20', color: '#6bbf8a',
    traits: ['steady', 'sensual', 'loyal'], strengths: ['endurance', 'taste', 'reliability'],
    shadows: ['stubbornness', 'possessiveness', 'inertia'],
    reading: 'Build slowly and beautifully. What you touch with care becomes lasting wealth.',
    love: 'Affection through presence and pleasure. Consistency is your love language.',
    career: 'Compound effort. Mastery and material security grow from patient craft.',
  },
  {
    id: 'gemini', name: 'Gemini', symbol: '♊', element: 'air', modality: 'mutable', ruler: 'Mercury',
    dates: 'May 21 – Jun 20', color: '#f0d060',
    traits: ['curious', 'witty', 'versatile'], strengths: ['communication', 'adaptability', 'learning'],
    shadows: ['restlessness', 'inconsistency', 'superficiality'],
    reading: 'Follow the interesting thread. Conversations open doors that plans alone cannot.',
    love: 'Stimulate the mind and the bond stays alive. Share ideas as intimacy.',
    career: 'Network, write, teach, pivot. Your range is a feature, not a flaw.',
  },
  {
    id: 'cancer', name: 'Cancer', symbol: '♋', element: 'water', modality: 'cardinal', ruler: 'Moon',
    dates: 'Jun 21 – Jul 22', color: '#8ec5e8',
    traits: ['nurturing', 'intuitive', 'protective'], strengths: ['empathy', 'memory', 'loyalty'],
    shadows: ['moodiness', 'clinging', 'defensiveness'],
    reading: 'Home and heart lead. Protect your soft places while still letting the right ones in.',
    love: 'Emotional safety is sacred. Tend the nest you share.',
    career: 'Care-based work and legacy projects thrive. Trust gut timing.',
  },
  {
    id: 'leo', name: 'Leo', symbol: '♌', element: 'fire', modality: 'fixed', ruler: 'Sun',
    dates: 'Jul 23 – Aug 22', color: '#f5a623',
    traits: ['radiant', 'generous', 'proud'], strengths: ['creativity', 'leadership', 'warmth'],
    shadows: ['ego', 'drama', 'need for applause'],
    reading: 'Shine without apology. Your visibility lifts others when rooted in heart.',
    love: 'Romance as celebration. Give and receive admiration freely.',
    career: 'Take center stage on work that matters. Creative leadership is favored.',
  },
  {
    id: 'virgo', name: 'Virgo', symbol: '♍', element: 'earth', modality: 'mutable', ruler: 'Mercury',
    dates: 'Aug 23 – Sep 22', color: '#9cbf6b',
    traits: ['precise', 'devoted', 'analytical'], strengths: ['discernment', 'service', 'refinement'],
    shadows: ['criticism', 'worry', 'perfectionism'],
    reading: 'Refine the system. Small improvements compound into elegance.',
    love: 'Devotion shows in details. Soften critique with kindness.',
    career: 'Excellence in craft and process. Quality over spectacle.',
  },
  {
    id: 'libra', name: 'Libra', symbol: '♎', element: 'air', modality: 'cardinal', ruler: 'Venus',
    dates: 'Sep 23 – Oct 22', color: '#d4a0e8',
    traits: ['harmonizing', 'fair', 'aesthetic'], strengths: ['diplomacy', 'grace', 'partnership'],
    shadows: ['indecision', 'people-pleasing', 'avoidance'],
    reading: 'Seek balance without abandoning self. Beauty and justice want equal weight.',
    love: 'Partnership as art. Name your needs so harmony is real, not performed.',
    career: 'Collaborate, design, mediate. Fair deals open lasting doors.',
  },
  {
    id: 'scorpio', name: 'Scorpio', symbol: '♏', element: 'water', modality: 'fixed', ruler: 'Pluto',
    dates: 'Oct 23 – Nov 21', color: '#8b3a5c',
    traits: ['intense', 'transformative', 'loyal'], strengths: ['depth', 'resilience', 'insight'],
    shadows: ['jealousy', 'control', 'secrecy'],
    reading: 'Go deeper. What dies here fertilizes the next life.',
    love: 'Bond through honesty and trust. Surface charm will not satisfy.',
    career: 'Research, healing, strategy, power. Transformation is your métier.',
  },
  {
    id: 'sagittarius', name: 'Sagittarius', symbol: '♐', element: 'fire', modality: 'mutable', ruler: 'Jupiter',
    dates: 'Nov 22 – Dec 21', color: '#c45c26',
    traits: ['expansive', 'honest', 'adventurous'], strengths: ['optimism', 'vision', 'freedom'],
    shadows: ['bluntness', 'restlessness', 'excess'],
    reading: 'Widen the map. Truth and travel — literal or mental — expand you.',
    love: 'Freedom within commitment. Share the quest, not just the destination.',
    career: 'Teach, publish, explore, grow. Big-picture bets pay off.',
  },
  {
    id: 'capricorn', name: 'Capricorn', symbol: '♑', element: 'earth', modality: 'cardinal', ruler: 'Saturn',
    dates: 'Dec 22 – Jan 19', color: '#5a6a7a',
    traits: ['ambitious', 'disciplined', 'enduring'], strengths: ['structure', 'responsibility', 'mastery'],
    shadows: ['rigidity', 'pessimism', 'workaholism'],
    reading: 'Climb with patience. Reputation and results are built in stone, not sand.',
    love: 'Loyalty through action. Make time for tenderness inside the schedule.',
    career: 'Long games win. Authority comes from earned competence.',
  },
  {
    id: 'aquarius', name: 'Aquarius', symbol: '♒', element: 'air', modality: 'fixed', ruler: 'Uranus',
    dates: 'Jan 20 – Feb 18', color: '#5b8def',
    traits: ['visionary', 'independent', 'humanitarian'], strengths: ['innovation', 'community', 'originality'],
    shadows: ['detachment', 'rebellion for its own sake', 'aloofness'],
    reading: 'Invent the future. Belong to the collective without losing your edge.',
    love: 'Friendship as foundation. Space and ideals keep the spark electric.',
    career: 'Tech, reform, networks, ideas. Disrupt kindly and usefully.',
  },
  {
    id: 'pisces', name: 'Pisces', symbol: '♓', element: 'water', modality: 'mutable', ruler: 'Neptune',
    dates: 'Feb 19 – Mar 20', color: '#7a9ec8',
    traits: ['dreamy', 'compassionate', 'artistic'], strengths: ['imagination', 'empathy', 'spirituality'],
    shadows: ['escapism', 'boundaries', 'illusion'],
    reading: 'Dream and then ground. Intuition is accurate when you also touch earth.',
    love: 'Soulful merging. Keep a shoreline so you do not drown in the other.',
    career: 'Art, healing, film, music, service. Channel the unseen into form.',
  },
]

export interface Planet {
  id: string
  name: string
  symbol: string
  domain: string
  influence: string
}

export const PLANETS: Planet[] = [
  { id: 'sun', name: 'Sun', symbol: '☉', domain: 'Identity & vitality', influence: 'Core self, purpose, creative life force.' },
  { id: 'moon', name: 'Moon', symbol: '☽', domain: 'Emotion & instinct', influence: 'Needs, moods, memory, and the inner child.' },
  { id: 'mercury', name: 'Mercury', symbol: '☿', domain: 'Mind & message', influence: 'Thought, speech, learning, and short journeys.' },
  { id: 'venus', name: 'Venus', symbol: '♀', domain: 'Love & beauty', influence: 'Attraction, values, art, and pleasure.' },
  { id: 'mars', name: 'Mars', symbol: '♂', domain: 'Drive & desire', influence: 'Action, courage, conflict, and appetite.' },
  { id: 'jupiter', name: 'Jupiter', symbol: '♃', domain: 'Growth & fortune', influence: 'Expansion, belief, luck, and generosity.' },
  { id: 'saturn', name: 'Saturn', symbol: '♄', domain: 'Structure & time', influence: 'Discipline, limits, maturity, and legacy.' },
  { id: 'uranus', name: 'Uranus', symbol: '♅', domain: 'Awakening & change', influence: 'Breakthroughs, rebellion, and sudden truth.' },
  { id: 'neptune', name: 'Neptune', symbol: '♆', domain: 'Dream & spirit', influence: 'Imagination, mysticism, and dissolution of edges.' },
  { id: 'pluto', name: 'Pluto', symbol: '♇', domain: 'Power & rebirth', influence: 'Transformation, shadow work, and deep renewal.' },
]

export type MoonPhaseId = 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'last-quarter' | 'waning-crescent'

export interface MoonPhase {
  id: MoonPhaseId
  name: string
  symbol: string
  guidance: string
}

export const MOON_PHASES: MoonPhase[] = [
  { id: 'new', name: 'New Moon', symbol: '●', guidance: 'Plant intentions in the dark. Begin quietly.' },
  { id: 'waxing-crescent', name: 'Waxing Crescent', symbol: '☽', guidance: 'Nurture the seed. Take the first visible step.' },
  { id: 'first-quarter', name: 'First Quarter', symbol: '◐', guidance: 'Meet resistance with decisive action.' },
  { id: 'waxing-gibbous', name: 'Waxing Gibbous', symbol: '◕', guidance: 'Refine and commit. Almost there.' },
  { id: 'full', name: 'Full Moon', symbol: '○', guidance: 'Illuminate and release. Celebrate clarity.' },
  { id: 'waning-gibbous', name: 'Waning Gibbous', symbol: '◔', guidance: 'Share wisdom. Give back what you have learned.' },
  { id: 'last-quarter', name: 'Last Quarter', symbol: '◑', guidance: 'Release what no longer serves. Clear the field.' },
  { id: 'waning-crescent', name: 'Waning Crescent', symbol: '☾', guidance: 'Rest and dream. Integration before the next cycle.' },
]

/** Approximate sun sign from month/day (tropical). */
export function getSunSign(month: number, day: number): ZodiacSign {
  const md = month * 100 + day
  const ranges: [number, number, string][] = [
    [321, 419, 'aries'],
    [420, 520, 'taurus'],
    [521, 620, 'gemini'],
    [621, 722, 'cancer'],
    [723, 822, 'leo'],
    [823, 922, 'virgo'],
    [923, 1022, 'libra'],
    [1023, 1121, 'scorpio'],
    [1122, 1221, 'sagittarius'],
    [1222, 1231, 'capricorn'],
    [101, 119, 'capricorn'],
    [120, 218, 'aquarius'],
    [219, 320, 'pisces'],
  ]
  for (const [start, end, id] of ranges) {
    if (md >= start && md <= end) {
      return ZODIAC_SIGNS.find((s) => s.id === id)!
    }
  }
  return ZODIAC_SIGNS[0]
}

/** Simple moon phase approximation from date. */
export function getMoonPhase(date: Date = new Date()): MoonPhase {
  const synodic = 29.53058867
  const knownNew = Date.UTC(2000, 0, 6, 18, 14)
  const days = (date.getTime() - knownNew) / 86400000
  const age = ((days % synodic) + synodic) % synodic
  const idx = Math.floor((age / synodic) * 8) % 8
  return MOON_PHASES[idx]
}

export function getDailyHoroscope(sign: ZodiacSign, date: Date = new Date()): string {
  const day = date.getDate()
  const seeds = [
    `${sign.name}, the sky asks for ${sign.traits[day % 3]} action today. ${sign.reading}`,
    `Under ${sign.ruler}'s watch, lean into ${sign.strengths[day % 3]}. ${sign.career}`,
    `Mind the shadow of ${sign.shadows[day % 3]}, then return to ${sign.strengths[(day + 1) % 3]}. ${sign.love}`,
  ]
  return seeds[day % 3]
}

export const ELEMENTS: Record<Element, { name: string; symbol: string; description: string }> = {
  fire: { name: 'Fire', symbol: '🜂', description: 'Spirit, will, and creative spark. Aries, Leo, Sagittarius.' },
  earth: { name: 'Earth', symbol: '🜃', description: 'Body, matter, and lasting form. Taurus, Virgo, Capricorn.' },
  air: { name: 'Air', symbol: '🜁', description: 'Mind, word, and connection. Gemini, Libra, Aquarius.' },
  water: { name: 'Water', symbol: '🜄', description: 'Feeling, intuition, and depth. Cancer, Scorpio, Pisces.' },
}
