"use client"

import { useState, useEffect, useCallback } from "react"
import type { Satellite } from "@/types/satellite"

const generateMockSatellites = (): Satellite[] => {
  const names = [
    "TERRA-1",
    "AQUA-2",
    "LANDSAT-8",
    "HUBBLE",
    "ISS",
    "GOES-16",
    "SENTINEL-2",
    "NOAA-20",
    "JASON-3",
    "GRACE-FO",
    "TESS",
    "KEPLER",
  ]

  const missions = [
    "Earth Observation",
    "Communications",
    "Scientific Research",
    "Weather Monitoring",
    "Navigation",
    "Space Exploration",
  ]

  const orbits: Array<"LEO" | "MEO" | "GEO"> = ["LEO", "MEO", "GEO"]
  const statuses: Array<"operational" | "maintenance" | "critical" | "refueling" | "offline"> = [
    "operational",
    "maintenance",
    "critical",
    "refueling",
    "offline",
  ]

  return names.map((name, index) => ({
    id: `sat-${index + 1}`,
    name,
    status: index < 8 ? "operational" : statuses[Math.floor(Math.random() * statuses.length)],
    orbit: orbits[Math.floor(Math.random() * orbits.length)],
    mission: missions[Math.floor(Math.random() * missions.length)],
    fuel: Math.floor(Math.random() * 80) + 20, // 20-100%
    health: Math.floor(Math.random() * 30) + 70, // 70-100%
    speed: 0.5 + Math.random() * 1.5,
  }))
}

export function useSatellites() {
  const [satellites, setSatellites] = useState<Satellite[]>([])
  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(null)

  useEffect(() => {
    setSatellites(generateMockSatellites())
  }, [])

  const addSatellite = useCallback((satelliteData: Omit<Satellite, "id" | "x" | "y">) => {
    const newSatellite: Satellite = {
      ...satelliteData,
      id: `sat-${Date.now()}`,
    }
    setSatellites((prev) => [...prev, newSatellite])
  }, [])

  const updateSatellite = useCallback((id: string, updates: Partial<Satellite>) => {
    setSatellites((prev) => prev.map((sat) => (sat.id === id ? { ...sat, ...updates } : sat)))

    // Update selected satellite if it's the one being updated
    setSelectedSatellite((prev) => (prev?.id === id ? { ...prev, ...updates } : prev))
  }, [])

  const removeSatellite = useCallback((id: string) => {
    setSatellites((prev) => prev.filter((sat) => sat.id !== id))
    setSelectedSatellite((prev) => (prev?.id === id ? null : prev))
  }, [])

  return {
    satellites,
    selectedSatellite,
    setSelectedSatellite,
    setSatellites,
    addSatellite,
    updateSatellite,
    removeSatellite,
  }
}
