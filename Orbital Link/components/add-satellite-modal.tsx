"use client"

import type React from "react"

import { useState } from "react"
import { X, Satellite } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Satellite as SatelliteType } from "@/types/satellite"

interface AddSatelliteModalProps {
  onClose: () => void
  onAdd: (satellite: Omit<SatelliteType, "id" | "x" | "y">) => void
}

export function AddSatelliteModal({ onClose, onAdd }: AddSatelliteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    orbit: "LEO" as "LEO" | "MEO" | "GEO",
    mission: "",
    status: "operational" as "operational" | "maintenance" | "critical" | "refueling" | "offline",
    fuel: 100,
    health: 100,
    speed: 1,
  })

  const missions = [
    "Earth Observation",
    "Communications",
    "Scientific Research",
    "Weather Monitoring",
    "Navigation",
    "Space Exploration",
    "Military Surveillance",
    "Asteroid Mining",
    "Deep Space Relay",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.mission.trim()) return

    onAdd(formData)
  }

  const generateRandomName = () => {
    const prefixes = ["TERRA", "AQUA", "COSMOS", "ATLAS", "PHOENIX", "ORION", "VEGA", "NOVA"]
    const suffix = Math.floor(Math.random() * 999) + 1
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    setFormData((prev) => ({ ...prev, name: `${randomPrefix}-${suffix}` }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <Satellite className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-orbitron font-bold text-white">Add New Satellite</h2>
          </div>
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Satellite Name
            </Label>
            <div className="flex gap-2">
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter satellite name"
                className="bg-white/5 border-white/10 text-white flex-1"
                required
              />
              <Button
                type="button"
                variant="outline"
                onClick={generateRandomName}
                className="text-cyan-400 border-cyan-500/30 bg-transparent hover:bg-cyan-500/20"
              >
                Random
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orbit" className="text-white">
                Orbit Type
              </Label>
              <Select
                value={formData.orbit}
                onValueChange={(value: "LEO" | "MEO" | "GEO") => setFormData((prev) => ({ ...prev, orbit: value }))}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  <SelectItem value="LEO" className="text-white">
                    LEO (Low Earth)
                  </SelectItem>
                  <SelectItem value="MEO" className="text-white">
                    MEO (Medium Earth)
                  </SelectItem>
                  <SelectItem value="GEO" className="text-white">
                    GEO (Geostationary)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-white">
                Initial Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  <SelectItem value="operational" className="text-white">
                    Operational
                  </SelectItem>
                  <SelectItem value="maintenance" className="text-white">
                    Maintenance
                  </SelectItem>
                  <SelectItem value="critical" className="text-white">
                    Critical
                  </SelectItem>
                  <SelectItem value="refueling" className="text-white">
                    Refueling
                  </SelectItem>
                  <SelectItem value="offline" className="text-white">
                    Offline
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mission" className="text-white">
              Mission Type
            </Label>
            <Select
              value={formData.mission}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, mission: value }))}
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select mission type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/10">
                {missions.map((mission) => (
                  <SelectItem key={mission} value={mission} className="text-white">
                    {mission}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fuel" className="text-white">
                Fuel (%)
              </Label>
              <Input
                id="fuel"
                type="number"
                min="0"
                max="100"
                value={formData.fuel}
                onChange={(e) => setFormData((prev) => ({ ...prev, fuel: Number.parseInt(e.target.value) || 0 }))}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="health" className="text-white">
                Health (%)
              </Label>
              <Input
                id="health"
                type="number"
                min="0"
                max="100"
                value={formData.health}
                onChange={(e) => setFormData((prev) => ({ ...prev, health: Number.parseInt(e.target.value) || 0 }))}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="speed" className="text-white">
                Speed
              </Label>
              <Input
                id="speed"
                type="number"
                min="0.1"
                max="3"
                step="0.1"
                value={formData.speed}
                onChange={(e) => setFormData((prev) => ({ ...prev, speed: Number.parseFloat(e.target.value) || 1 }))}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>

          <div className="glass-panel p-3 bg-blue-500/10 border-blue-500/20">
            <h4 className="text-sm font-medium text-blue-400 mb-2">Orbit Information</h4>
            <div className="text-xs text-gray-400 space-y-1">
              {formData.orbit === "LEO" && (
                <>
                  <div>• Altitude: 160-2,000 km</div>
                  <div>• Period: 90-120 minutes</div>
                  <div>• Best for: Earth observation, ISS</div>
                </>
              )}
              {formData.orbit === "MEO" && (
                <>
                  <div>• Altitude: 2,000-35,786 km</div>
                  <div>• Period: 2-24 hours</div>
                  <div>• Best for: Navigation, GPS</div>
                </>
              )}
              {formData.orbit === "GEO" && (
                <>
                  <div>• Altitude: 35,786 km</div>
                  <div>• Period: 24 hours (stationary)</div>
                  <div>• Best for: Communications, weather</div>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              disabled={!formData.name.trim() || !formData.mission.trim()}
            >
              Launch Satellite
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
