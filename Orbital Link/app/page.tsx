"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { EarthVisualization } from "@/components/earth-visualization"
import { FleetPanel } from "@/components/fleet-panel"
import { MissionControl } from "@/components/mission-control"
import { StatusLegend } from "@/components/status-legend"
import { MiniMap } from "@/components/mini-map"
import { SatelliteModal } from "@/components/satellite-modal"
import { AddSatelliteModal } from "@/components/add-satellite-modal"
import { useSatellites } from "@/hooks/use-satellites"
import type { Satellite } from "@/types/satellite"

export default function Dashboard() {
  const { satellites, addSatellite, updateSatellite } = useSatellites()
  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(null)
  const [trackedSatellite, setTrackedSatellite] = useState<Satellite | null>(null)
  const [showSatelliteModal, setShowSatelliteModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [clickCount, setClickCount] = useState<{ [key: string]: number }>({})

  const handleSatelliteClick = (satellite: Satellite) => {
    const currentCount = clickCount[satellite.id] || 0
    const newCount = currentCount + 1

    setClickCount((prev) => ({
      ...prev,
      [satellite.id]: newCount,
    }))

    if (newCount === 1) {
      // First click - track satellite
      setTrackedSatellite(satellite)
      setSelectedSatellite(satellite)
      console.log(`🎯 Tracking satellite: ${satellite.name}`)

      // Show tracking feedback
      const feedback = document.createElement("div")
      feedback.className =
        "fixed top-4 right-4 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg z-50"
      feedback.textContent = `🎯 Now tracking ${satellite.name} - Click again for details`
      document.body.appendChild(feedback)
      setTimeout(() => feedback.remove(), 3000)

      // Reset click count after 3 seconds if no second click
      setTimeout(() => {
        setClickCount((prev) => ({
          ...prev,
          [satellite.id]: 0,
        }))
      }, 3000)
    } else if (newCount === 2) {
      // Second click - show details modal
      setShowSatelliteModal(true)
      console.log(`📋 Opening details for satellite: ${satellite.name}`)

      // Reset click count
      setClickCount((prev) => ({
        ...prev,
        [satellite.id]: 0,
      }))
    }
  }

  const handleSatelliteSelect = (satellite: Satellite | null) => {
    if (satellite) {
      setSelectedSatellite(satellite)
      setTrackedSatellite(satellite)
    } else {
      setSelectedSatellite(null)
      setTrackedSatellite(null)
      // Reset all click counts when deselecting
      setClickCount({})
    }
  }

  const handleSatelliteUpdate = (updates: Partial<Satellite>) => {
    if (selectedSatellite) {
      updateSatellite(selectedSatellite.id, updates)
      setSelectedSatellite({ ...selectedSatellite, ...updates })
    }
  }

  const handleAddSatellite = (satelliteData: Omit<Satellite, "id">) => {
    addSatellite(satelliteData)
    setShowAddModal(false)
  }

  const handleViewDetails = () => {
    if (selectedSatellite) {
      setShowSatelliteModal(true)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-white">Orbital Dashboard</h1>
            <p className="text-gray-400 mt-1">Real-time satellite tracking and mission control</p>
          </div>
          <div className="flex items-center gap-4">
            <StatusLegend />
            {selectedSatellite && (
              <button
                onClick={handleViewDetails}
                className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all duration-200 text-sm font-medium"
              >
                View Details
              </button>
            )}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-all duration-200 text-sm font-medium"
            >
              + Add Satellite
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-6">
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-orbitron font-semibold text-white">Earth Orbit Visualization</h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live Tracking</span>
                  {trackedSatellite && <span className="text-cyan-400 ml-2">Tracking: {trackedSatellite.name}</span>}
                </div>
              </div>
              <EarthVisualization
                satellites={satellites}
                selectedSatellite={selectedSatellite}
                onSatelliteClick={handleSatelliteClick}
                onSatelliteSelect={handleSatelliteSelect}
              />
            </div>

            <MissionControl
              satellites={satellites}
              selectedSatellite={selectedSatellite}
              onAddSatellite={() => setShowAddModal(true)}
            />
          </div>

          <div className="space-y-6">
            <FleetPanel
              satellites={satellites}
              selectedSatellite={selectedSatellite}
              onSatelliteSelect={handleSatelliteSelect}
            />
            <MiniMap satellites={satellites} selectedSatellite={selectedSatellite} />
          </div>
        </div>
      </div>

      {showSatelliteModal && selectedSatellite && (
        <SatelliteModal
          satellite={selectedSatellite}
          onClose={() => setShowSatelliteModal(false)}
          onUpdate={handleSatelliteUpdate}
        />
      )}

      {showAddModal && <AddSatelliteModal onClose={() => setShowAddModal(false)} onAdd={handleAddSatellite} />}
    </DashboardLayout>
  )
}
