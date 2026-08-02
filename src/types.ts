export type Continent =
  | 'Africa'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'South America'
  | 'Oceania'
  | 'Antarctica'

export interface Currency {
  code: string
  name: string
  symbol: string
}

export interface Country {
  id: string
  cca2: string
  cca3: string
  ccn3: string
  name: string
  officialName: string
  capital: string | null
  capitals: string[]
  region: string
  subregion: string | null
  continent: Continent
  borders: string[]
  area: number
  population: number | null
  latlng: number[]
  landlocked: boolean
  languages: string[]
  currencies: Currency[]
  flag: string
  flagPng: string
  maps: {
    google: string
    osm: string
  }
  summary: string
}

export const CONTINENTS: Continent[] = [
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
  'Antarctica',
]

export const CONTINENT_META: Record<
  Continent,
  { blurb: string; hue: string }
> = {
  Africa: {
    blurb: 'Deserts, savannas, coastlines, and ancient trade routes across the continent.',
    hue: '#c4a35a',
  },
  Asia: {
    blurb: 'The largest continent — from Siberia to the islands of the Pacific rim.',
    hue: '#d4784a',
  },
  Europe: {
    blurb: 'A dense mosaic of languages, capitals, and shared borders.',
    hue: '#6a8fbf',
  },
  'North America': {
    blurb: 'From the Arctic to the Caribbean — vast lands and island chains.',
    hue: '#5aa88a',
  },
  'South America': {
    blurb: 'Andes spine, Amazon basin, and Atlantic coasts.',
    hue: '#c45d5d',
  },
  Oceania: {
    blurb: 'Australia, New Zealand, and the scattered Pacific island nations.',
    hue: '#4a9bb8',
  },
  Antarctica: {
    blurb: 'The frozen south — claimed territories and research stations.',
    hue: '#9bb0c0',
  },
}
