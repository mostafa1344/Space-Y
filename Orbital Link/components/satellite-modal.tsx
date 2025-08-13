"use client"

import { useState } from "react"
import { X, Zap, Fuel, Signal, Thermometer, Activity, Trash2, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Satellite } from "@/types/satellite"

interface SatelliteModalProps {
  satellite: Satellite
  onClose: () => void
  onUpdate: (updates: Partial<Satellite>) => void
}

export function SatelliteModal({ satellite, onClose, onUpdate }: SatelliteModalProps) {
  const [name, setName] = useState(satellite.name)
  const [speed, setSpeed] = useState(satellite.speed)
  const [isRefueling, setIsRefueling] = useState(false)
  const [isDiagnosing, setIsDiagnosing] = useState(false)

  const statusColors = {
    operational: "bg-green-500/20 text-green-400 border-green-500/30",
    maintenance: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    critical: "bg-red-500/20 text-red-400 border-red-500/30",
    refueling: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    offline: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }

  const sensorData = [
    { name: "Temperature", value: 23, unit: "°C", status: "normal", icon: Thermometer },
    { name: "Power", value: 87, unit: "%", status: "good", icon: Zap },
    { name: "Signal", value: 94, unit: "dBm", status: "excellent", icon: Signal },
    { name: "Fuel", value: satellite.fuel, unit: "%", status: satellite.fuel > 50 ? "good" : "low", icon: Fuel },
  ]

  const missionLog = [
    { time: "14:32:15", event: "Orbit adjustment completed", type: "success" },
    { time: "14:28:42", event: "Solar panel alignment optimized", type: "info" },
    { time: "14:15:33", event: "Data transmission to ground station", type: "info" },
    { time: "14:02:18", event: "Fuel consumption warning", type: "warning" },
    { time: "13:45:27", event: "System diagnostics passed", type: "success" },
  ]

  const handleManualControl = () => {
    console.log(`🎮 Manual control activated for ${satellite.name}`)
    onUpdate({ status: "maintenance" })

    // Show feedback
    const feedback = document.createElement("div")
    feedback.className =
      "fixed top-4 right-4 bg-blue-500/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-lg z-50"
    feedback.textContent = `🎮 Manual control activated for ${satellite.name}`
    document.body.appendChild(feedback)
    setTimeout(() => feedback.remove(), 3000)
  }

  const handleDiagnostics = () => {
    setIsDiagnosing(true)
    console.log(`🔍 Running diagnostics on ${satellite.name}`)

    setTimeout(() => {
      setIsDiagnosing(false)
      console.log(`✅ Diagnostics complete for ${satellite.name}`)
      onUpdate({ health: Math.min(100, satellite.health + 5) })

      // Show success feedback
      const feedback = document.createElement("div")
      feedback.className =
        "fixed top-4 right-4 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg z-50"
      feedback.textContent = `✅ Diagnostics complete for ${satellite.name}`
      document.body.appendChild(feedback)
      setTimeout(() => feedback.remove(), 3000)
    }, 3000)
  }

  const handleRefuel = () => {
    setIsRefueling(true)
    console.log(`⛽ Initiating refuel sequence for ${satellite.name}`)

    setTimeout(() => {
      setIsRefueling(false)
      console.log(`✅ Refuel complete for ${satellite.name}`)
      onUpdate({ fuel: 100, status: "operational" })

      // Show success feedback
      const feedback = document.createElement("div")
      feedback.className =
        "fixed top-4 right-4 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg z-50"
      feedback.textContent = `✅ Refuel complete for ${satellite.name}`
      document.body.appendChild(feedback)
      setTimeout(() => feedback.remove(), 3000)
    }, 5000)
  }

  const handleEmergencyRecall = () => {
    console.log(`🚨 Emergency recall initiated for ${satellite.name}`)
    onUpdate({ status: "offline" })
    onClose()
  }

  const handleDataDownload = () => {
    console.log(`📥 Downloading data from ${satellite.name}`)

    // Create downloadable data
    const data = {
      satellite: satellite.name,
      timestamp: new Date().toISOString(),
      telemetry: {
        fuel: satellite.fuel,
        health: satellite.health,
        orbit: satellite.orbit,
        mission: satellite.mission,
      },
    }

    const dataBlob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${satellite.name}-telemetry-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    // Show feedback
    const feedback = document.createElement("div")
    feedback.className =
      "fixed top-4 right-4 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg z-50"
    feedback.textContent = `📥 Data downloaded for ${satellite.name}`
    document.body.appendChild(feedback)
    setTimeout(() => feedback.remove(), 3000)
  }

  const handleFirmwareUpdate = () => {
    console.log(`📤 Uploading firmware update to ${satellite.name}`)
    onUpdate({ status: "maintenance" })

    // Show feedback
    const feedback = document.createElement("div")
    feedback.className =
      "fixed top-4 right-4 bg-purple-500/20 border border-purple-500/30 text-purple-400 px-4 py-2 rounded-lg z-50"
    feedback.textContent = `📤 Firmware update initiated for ${satellite.name}`
    document.body.appendChild(feedback)
    setTimeout(() => feedback.remove(), 3000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-orbitron font-bold text-white">{satellite.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={statusColors[satellite.status]}>{satellite.status}</Badge>
                <span className="text-sm text-gray-400">ID: {satellite.id}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="controls">Controls</TabsTrigger>
              <TabsTrigger value="sensors">Sensors</TabsTrigger>
              <TabsTrigger value="mission">Mission Log</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Orbital Parameters</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Orbit Type</span>
                      <span className="text-white font-mono">{satellite.orbit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Altitude</span>
                      <span className="text-white font-mono">
                        {satellite.orbit === "LEO" ? "400 km" : satellite.orbit === "MEO" ? "20,200 km" : "35,786 km"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Inclination</span>
                      <span className="text-white font-mono">98.2°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Period</span>
                      <span className="text-white font-mono">
                        {satellite.orbit === "LEO" ? "90 min" : satellite.orbit === "MEO" ? "12 hrs" : "24 hrs"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">System Status</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Fuel Level</span>
                        <span className="text-white font-mono">{satellite.fuel}%</span>
                      </div>
                      <Progress value={satellite.fuel} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Health Score</span>
                        <span className="text-white font-mono">{satellite.health}%</span>
                      </div>
                      <Progress value={satellite.health} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Signal Strength</span>
                        <span className="text-white font-mono">-67 dBm</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="controls" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Satellite Controls</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Satellite Name</label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Orbital Speed: {speed}x</label>
                      <Slider
                        value={[speed]}
                        onValueChange={(value) => setSpeed(value[0])}
                        min={0.5}
                        max={2}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="text-blue-400 border-blue-500/30 bg-transparent hover:bg-blue-500/20 btn-interactive"
                      onClick={handleManualControl}
                    >
                      Manual Control
                    </Button>
                    <Button
                      variant="outline"
                      className="text-green-400 border-green-500/30 bg-transparent hover:bg-green-500/20 btn-interactive"
                      onClick={handleDiagnostics}
                      disabled={isDiagnosing}
                    >
                      {isDiagnosing ? "Diagnosing..." : "Run Diagnostics"}
                    </Button>
                    <Button
                      variant="outline"
                      className="text-yellow-400 border-yellow-500/30 bg-transparent hover:bg-yellow-500/20 btn-interactive"
                      onClick={handleRefuel}
                      disabled={isRefueling}
                    >
                      {isRefueling ? "Refueling..." : "Refuel"}
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-400 border-red-500/30 bg-transparent hover:bg-red-500/20 btn-interactive"
                      onClick={handleEmergencyRecall}
                    >
                      Emergency Recall
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-semibold text-white mb-3">Data Management</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="text-cyan-400 border-cyan-500/30 bg-transparent hover:bg-cyan-500/20 btn-interactive"
                        onClick={handleDataDownload}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Data
                      </Button>
                      <Button
                        variant="outline"
                        className="text-purple-400 border-purple-500/30 bg-transparent hover:bg-purple-500/20 btn-interactive"
                        onClick={handleFirmwareUpdate}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Update Firmware
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sensors" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sensorData.map((sensor) => (
                  <div key={sensor.name} className="glass-panel p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <sensor.icon className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-medium">{sensor.name}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          sensor.status === "excellent"
                            ? "border-green-500/30 text-green-400"
                            : sensor.status === "good"
                              ? "border-blue-500/30 text-blue-400"
                              : sensor.status === "normal"
                                ? "border-yellow-500/30 text-yellow-400"
                                : "border-red-500/30 text-red-400"
                        }
                      >
                        {sensor.status}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {sensor.value}
                      {sensor.unit}
                    </div>
                    <Progress value={sensor.value} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mission" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Mission Activity Log</h3>
                <div className="space-y-3">
                  {missionLog.map((entry, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          entry.type === "success"
                            ? "bg-green-400"
                            : entry.type === "warning"
                              ? "bg-yellow-400"
                              : "bg-blue-400"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-medium">{entry.event}</span>
                          <span className="text-xs text-gray-400 font-mono">{entry.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex items-center justify-between gap-3 p-6 border-t border-white/10">
          <Button
            variant="outline"
            className="text-red-400 border-red-500/30 bg-transparent hover:bg-red-500/20"
            onClick={() => {
              console.log(`🗑️ Satellite ${satellite.name} marked for decommission`)
              onClose()
            }}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Decommission
          </Button>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => onUpdate({ name, speed })} className="bg-blue-500 hover:bg-blue-600 text-white">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
