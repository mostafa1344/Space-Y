"use client"

import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Satellite, Zap, Shield, TrendingUp } from "lucide-react"

interface FleetOverviewProps {
  data: {
    totalSatellites: number
    operational: number
    maintenance: number
    critical: number
    averageHealth: number
    averageFuel: number
    uptime: number
    dataTransmitted: number
  }
}

export function FleetOverview({ data }: FleetOverviewProps) {
  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-green-400"
    if (health >= 70) return "text-yellow-400"
    return "text-red-400"
  }

  const getFuelColor = (fuel: number) => {
    if (fuel >= 70) return "text-green-400"
    if (fuel >= 30) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-2 mb-6">
        <Satellite className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Fleet Overview</h3>
      </div>

      <div className="space-y-6">
        {/* Status Distribution */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-400">Status Distribution</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Operational</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{data.operational}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Maintenance</span>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{data.maintenance}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Critical</span>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">{data.critical}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Total</span>
              <Badge className="bg-white/10 text-white border-white/20">{data.totalSatellites}</Badge>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-400">Key Metrics</h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Average Health</span>
              </div>
              <span className={`font-bold ${getHealthColor(data.averageHealth)}`}>{data.averageHealth}%</span>
            </div>
            <Progress value={data.averageHealth} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">Average Fuel</span>
              </div>
              <span className={`font-bold ${getFuelColor(data.averageFuel)}`}>{data.averageFuel}%</span>
            </div>
            <Progress value={data.averageFuel} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">System Uptime</span>
              </div>
              <span className="font-bold text-green-400">{data.uptime}%</span>
            </div>
            <Progress value={data.uptime} className="h-2" />
          </div>
        </div>

        {/* Data Statistics */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Data Transmitted</span>
            <span className="text-lg font-bold text-cyan-400">{data.dataTransmitted} GB</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Last 24 hours</div>
        </div>
      </div>
    </div>
  )
}
