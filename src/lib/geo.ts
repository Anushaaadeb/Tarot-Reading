import { geoNaturalEarth1, geoPath, type GeoPermissibleObjects } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { FeatureCollection, Geometry } from 'geojson'

export type CountryFeature = {
  type: 'Feature'
  id?: string | number
  properties: { name: string }
  geometry: Geometry
}

export type WorldTopology = Topology<{
  countries: GeometryCollection<{ name: string }>
  land: GeometryCollection
}>

export function buildProjection(width: number, height: number) {
  return geoNaturalEarth1().fitExtent(
    [
      [8, 8],
      [width - 8, height - 8],
    ],
    { type: 'Sphere' },
  )
}

export function pathGenerator(width: number, height: number) {
  const projection = buildProjection(width, height)
  return geoPath(projection)
}

export function countriesFromTopo(topo: WorldTopology): CountryFeature[] {
  const fc = feature(topo, topo.objects.countries) as FeatureCollection
  return fc.features.map((f) => ({
    type: 'Feature' as const,
    id: f.id != null ? String(f.id) : undefined,
    properties: { name: (f.properties as { name?: string })?.name ?? 'Unknown' },
    geometry: f.geometry as Geometry,
  }))
}

export function featureCentroid(
  feat: CountryFeature,
  width: number,
  height: number,
): [number, number] {
  const path = pathGenerator(width, height)
  const c = path.centroid(feat as GeoPermissibleObjects)
  if (!c || Number.isNaN(c[0]) || Number.isNaN(c[1])) return [width / 2, height / 2]
  return c as [number, number]
}

export function featureBounds(
  feat: CountryFeature,
  width: number,
  height: number,
): [[number, number], [number, number]] | null {
  const path = pathGenerator(width, height)
  const b = path.bounds(feat as GeoPermissibleObjects)
  if (!b || Number.isNaN(b[0][0])) return null
  return b
}
