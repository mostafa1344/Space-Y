"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { TelemetryChart } from "@/components/telemetry-chart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw } from "lucide-react"

const chartConfigs = [
  { id: "fuel", title: "Fuel Consumption", color: "#f59e0b", unit: "%" },
  { id: "health", title: "System Health", color: "#10b981", unit: "%" },
  { id: "signal", title: "Signal Strength", color: "#3b82f6", unit: "dBm" },
  { id: "temperature", title: "Temperature", color: "#ef4444", unit: "°C" },
  { id: "data", title: "Data Transmission", color: "#06b6d4", unit: "Mbps" },
  { id: "velocity", title: "Orbital Velocity", color: "#8b5cf6", unit: "km/s" },
  { id: "power", title: "Power Systems", color: "#84cc16", unit: "W" },
  { id: "attitude", title: "Attitude Stability", color: "#f97316", unit: "°" },
  { id: "communication", title: "Communication Quality", color: "#ec4899", unit: "%" },
]

export default function TelemetryPage() {
  const [timeRange, setTimeRange] = useState("24H")
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-white">Telemetry Analysis</h1>
            <p className="text-gray-400 mt-1">Real-time satellite performance monitoring</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {["1H", "24H", "7D"].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className="text-xs"
                >
                  {range}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="text-white border-white/20 bg-transparent"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {chartConfigs.map((config) => (
            <div key={config.id} className="glass-panel p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white truncate">{config.title}</h3>
                <Badge variant="outline" className="border-white/20 text-gray-400 flex-shrink-0">
                  {timeRange}
                </Badge>
              </div>
              <TelemetryChart config={config} timeRange={timeRange} refreshing={refreshing} />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
