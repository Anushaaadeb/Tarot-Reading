export function formatNumber(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return '—'
  return n.toLocaleString('en-US')
}

export function formatArea(km2: number | null | undefined): string {
  if (km2 == null || Number.isNaN(km2)) return '—'
  return `${formatNumber(Math.round(km2))} km²`
}

export function formatCoords(latlng: number[]): string {
  if (!latlng || latlng.length < 2) return '—'
  const [lat, lng] = latlng
  const ns = lat >= 0 ? 'N' : 'S'
  const ew = lng >= 0 ? 'E' : 'W'
  return `${Math.abs(lat).toFixed(2)}°${ns}, ${Math.abs(lng).toFixed(2)}°${ew}`
}
