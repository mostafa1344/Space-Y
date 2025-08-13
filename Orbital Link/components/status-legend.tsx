"use client"

import { Activity, Zap, Wrench, Fuel, WifiOff } from "lucide-react"

export function StatusLegend() {
  const statuses = [
    {
      name: "Operational",
      color: "bg-green-500",
      icon: Activity,
      count: 8,
      description: "Normal operations",
    },
    {
      name: "Maintenance",
      color: "bg-blue-500",
      icon: Wrench,
      count: 3,
      description: "Scheduled maintenance",
    },
    {
      name: "Critical",
      color: "bg-red-500",
      icon: Zap,
      count: 2,
      description: "Requires attention",
    },
    {
      name: "Refueling",
      color: "bg-yellow-500",
      icon: Fuel,
      count: 1,
      description: "Fuel replenishment",
    },
    {
      name: "Offline",
      color: "bg-gray-500",
      icon: WifiOff,
      count: 1,
      description: "No communication",
    },
  ]

  return (
    <div className="glass-panel p-4">
      <h3 className="font-orbitron text-lg font-semibold text-white mb-4">Status Legend</h3>

      <div className="space-y-3">
        {statuses.map((status) => (
          <div key={status.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 ${status.color} rounded-full animate-pulse`} />
              <status.icon className="w-4 h-4 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-white">{status.name}</div>
                <div className="text-xs text-gray-400">{status.description}</div>
              </div>
            </div>
            <div className="text-sm font-bold text-white">{status.count}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Weather Status</span>
          <span className="text-green-400 font-medium">Clear</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-400">Solar Activity</span>
          <span className="text-yellow-400 font-medium">Moderate</span>
        </div>
      </div>
    </div>
  )
}
