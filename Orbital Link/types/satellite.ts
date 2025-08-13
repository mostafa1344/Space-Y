export interface Satellite {
  id: string
  name: string
  status: "operational" | "maintenance" | "critical" | "refueling" | "offline"
  orbit: "LEO" | "MEO" | "GEO"
  mission: string
  fuel: number
  health: number
  speed: number
  x?: number
  y?: number
}
