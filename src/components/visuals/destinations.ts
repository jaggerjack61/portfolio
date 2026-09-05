export type Destination = { id: string; position: [number, number, number] }
export type DestinationRequest = { id: string; revision: number }
export type TravelPhase = 'retreat' | 'rotate' | 'approach' | 'focused' | 'overview'
export type PanelProjection = { x: number; y: number; scale: number; visible: boolean; depth: number }
export type WorldUpdate = DestinationRequest & {
  phase: TravelPhase
  dot: { x: number; y: number }
  panels: Record<string, PanelProjection>
  anchor: { x: number; y: number }
}

// Fibonacci sphere: stable, evenly spaced destinations, independent of scene type.
export function createDestinations(ids: string[]): Destination[] {
  return ids.map((id, index) => {
    const y = 1 - (2 * (index + 0.5)) / ids.length
    const radius = Math.sqrt(1 - y * y)
    const angle = index * Math.PI * (3 - Math.sqrt(5))
    return { id, position: [radius * Math.cos(angle), y, radius * Math.sin(angle)] }
  })
}
