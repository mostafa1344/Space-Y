"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Satellite, Signal, Battery, Zap, Filter, X } from "lucide-react"

interface Station {
  id: string
  name: string
  type: "communication" | "observation" | "navigation" | "weather"
  status: "active" | "maintenance" | "offline"
  altitude: number
  battery: number
  signal: number
  lastContact: string
  mission: string
}

export function FleetPanel() {
  const [stations, setStations] = useState<Station[]>([])
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [filterOptions, setFilterOptions] = useState({
    type: "all",
    status: "all",
    battery: "all",
    signal: "all",
  })
  const [filteredStations, setFilteredStations] = useState<Station[]>([])

  useEffect(() => {
    const mockStations: Station[] = [
      {
        id: "sat-001",
        name: "TERRA-1",
        type: "observation",
        status: "active",
        altitude: 705,
        battery: 87,
        signal: 95,
        lastContact: "2024-01-15T10:30:00Z",
        mission: "Arctic Ice Monitoring",
      },
      {
        id: "sat-002",
        name: "HUBBLE",
        type: "observation",
        status: "active",
        altitude: 547,
        battery: 92,
        signal: 88,
        lastContact: "2024-01-15T10:28:00Z",
        mission: "Deep Space Communication",
      },
      {
        id: "sat-003",
        name: "TESS",
        type: "observation",
        status: "active",
        altitude: 375000,
        battery: 78,
        signal: 82,
        lastContact: "2024-01-15T10:25:00Z",
        mission: "Exoplanet Survey",
      },
      {
        id: "sat-004",
        name: "GOES-16",
        type: "weather",
        status: "active",
        altitude: 35786,
        battery: 94,
        signal: 97,
        lastContact: "2024-01-15T10:32:00Z",
        mission: "Hurricane Tracking",
      },
      {
        id: "sat-005",
        name: "GPS-III",
        type: "navigation",
        status: "maintenance",
        altitude: 20200,
        battery: 65,
        signal: 45,
        lastContact: "2024-01-15T09:15:00Z",
        mission: "GPS Constellation Maintenance",
      },
      {
        id: "sat-006",
        name: "AQUA-2",
        type: "observation",
        status: "active",
        altitude: 705,
        battery: 89,
        signal: 91,
        lastContact: "2024-01-15T10:31:00Z",
        mission: "Ocean Temperature Mapping",
      },
      {
        id: "sat-007",
        name: "COMM-SAT-5",
        type: "communication",
        status: "offline",
        altitude: 35786,
        battery: 23,
        signal: 0,
        lastContact: "2024-01-14T22:45:00Z",
        mission: "Global Communications",
      },
      {
        id: "sat-008",
        name: "WEATHER-3",
        type: "weather",
        status: "active",
        altitude: 833,
        battery: 91,
        signal: 93,
        lastContact: "2024-01-15T10:29:00Z",
        mission: "Climate Monitoring",
      },
    ]

    setStations(mockStations)
    setFilteredStations(mockStations)
  }, [])

  useEffect(() => {
    let filtered = stations

    if (filterOptions.type !== "all") {
      filtered = filtered.filter((station) => station.type === filterOptions.type)
    }

    if (filterOptions.status !== "all") {
      filtered = filtered.filter((station) => station.status === filterOptions.status)
    }

    if (filterOptions.battery !== "all") {
      if (filterOptions.battery === "high") {
        filtered = filtered.filter((station) => station.battery >= 80)
      } else if (filterOptions.battery === "medium") {
        filtered = filtered.filter((station) => station.battery >= 50 && station.battery < 80)
      } else if (filterOptions.battery === "low") {
        filtered = filtered.filter((station) => station.battery < 50)
      }
    }

    if (filterOptions.signal !== "all") {
      if (filterOptions.signal === "strong") {
        filtered = filtered.filter((station) => station.signal >= 80)
      } else if (filterOptions.signal === "medium") {
        filtered = filtered.filter((station) => station.signal >= 50 && station.signal < 80)
      } else if (filterOptions.signal === "weak") {
        filtered = filtered.filter((station) => station.signal < 50)
      }
    }

    setFilteredStations(filtered)
  }, [filterOptions, stations])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "maintenance":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "offline":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "communication":
        return <Signal className="w-4 h-4" />
      case "observation":
        return <Satellite className="w-4 h-4" />
      case "navigation":
        return <Zap className="w-4 h-4" />
      case "weather":
        return <Battery className="w-4 h-4" />
      default:
        return <Satellite className="w-4 h-4" />
    }
  }

  const getBatteryColor = (battery: number) => {
    if (battery >= 80) return "text-green-400"
    if (battery >= 50) return "text-yellow-400"
    return "text-red-400"
  }

  const getSignalColor = (signal: number) => {
    if (signal >= 80) return "text-green-400"
    if (signal >= 50) return "text-yellow-400"
    return "text-red-400"
  }

  const handleFilterApply = () => {
    console.log("🔍 Applying station filters:", filterOptions)

    // Show feedback
    const feedback = document.createElement("div")
    feedback.className =
      "fixed top-4 right-4 bg-blue-500/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-lg z-50"
    feedback.textContent = `🔍 Filters applied - ${filteredStations.length} stations found`
    document.body.appendChild(feedback)
    setTimeout(() => feedback.remove(), 2000)

    setShowFilterModal(false)
  }

  const handleFilterReset = () => {
    setFilterOptions({
      type: "all",
      status: "all",
      battery: "all",
      signal: "all",
    })
    console.log("🔄 Station filters reset")
  }

  const formatLastContact = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }

  return (
    <>
      <div className="glass-panel h-full">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-orbitron font-bold text-white">Fleet Status</h3>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white/20 bg-transparent hover:bg-white/10"
              onClick={() => setShowFilterModal(true)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">
                {filteredStations.filter((s) => s.status === "active").length}
              </div>
              <div className="text-xs text-gray-400">Active</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                {filteredStations.filter((s) => s.status === "maintenance").length}
              </div>
              <div className="text-xs text-gray-400">Maintenance</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">
                {filteredStations.filter((s) => s.status === "offline").length}
              </div>
              <div className="text-xs text-gray-400">Offline</div>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {filteredStations.map((station) => (
              <div
                key={station.id}
                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(station.type)}
                    <span className="font-medium text-white text-sm">{station.name}</span>
                  </div>
                  <Badge className={getStatusColor(station.status)} variant="outline">
                    {station.status}
                  </Badge>
                </div>

                <div className="text-xs text-gray-400 mb-2 capitalize">
                  {station.type} • {station.mission}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Battery</span>
                    <span className={getBatteryColor(station.battery)}>{station.battery}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Signal</span>
                    <span className={getSignalColor(station.signal)}>{station.signal}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Altitude</span>
                    <span className="text-white">{station.altitude.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Contact</span>
                    <span className="text-cyan-400">{formatLastContact(station.lastContact)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-orbitron font-bold text-white">Filter Stations</h2>
              <Button
                variant="ghost"
                onClick={() => setShowFilterModal(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <Label className="text-white mb-2 block">Station Type</Label>
                <Select
                  value={filterOptions.type}
                  onValueChange={(value) => setFilterOptions({ ...filterOptions, type: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                    <SelectItem value="observation">Observation</SelectItem>
                    <SelectItem value="navigation">Navigation</SelectItem>
                    <SelectItem value="weather">Weather</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white mb-2 block">Status</Label>
                <Select
                  value={filterOptions.status}
                  onValueChange={(value) => setFilterOptions({ ...filterOptions, status: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white mb-2 block">Battery Level</Label>
                <Select
                  value={filterOptions.battery}
                  onValueChange={(value) => setFilterOptions({ ...filterOptions, battery: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="high">High (80%+)</SelectItem>
                    <SelectItem value="medium">Medium (50-79%)</SelectItem>
                    <SelectItem value="low">Low (&lt;50%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white mb-2 block">Signal Strength</Label>
                <Select
                  value={filterOptions.signal}
                  onValueChange={(value) => setFilterOptions({ ...filterOptions, signal: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Strengths</SelectItem>
                    <SelectItem value="strong">Strong (80%+)</SelectItem>
                    <SelectItem value="medium">Medium (50-79%)</SelectItem>
                    <SelectItem value="weak">Weak (&lt;50%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-white/10">
              <Button variant="outline" onClick={handleFilterReset} className="flex-1 bg-transparent">
                Reset
              </Button>
              <Button onClick={handleFilterApply} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
