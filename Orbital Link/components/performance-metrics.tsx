"use client"

import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface PerformanceMetricsProps {
  data: any
  timeRange: string
}

export function PerformanceMetrics({ data, timeRange }: PerformanceMetricsProps) {
  const metrics = [
    {
      name: "System Uptime",
      value: data.fleetPerformance.uptime,
      target: 99.5,
      unit: "%",
      trend: "up",
      change: 0.3,
    },
    {
      name: "Average Health",
      value: data.fleetPerformance.averageHealth,
      target: 85,
      unit: "%",
      trend: "up",
      change: 2.3,
    },
    {
      name: "Fuel Efficiency",
      value: data.fleetPerformance.averageFuel,
      target: 70,
      unit: "%",
      trend: "down",
      change: -1.2,
    },
    {
      name: "Data Throughput",
      value: 94.2,
      target: 90,
      unit: "%",
      trend: "up",
      change: 4.8,
    },
    {
      name: "Mission Success Rate",
      value: data.missionSuccess.successRate,
      target: 95,
      unit: "%",
      trend: "stable",
      change: 0.1,
    },
    {
      name: "Response Time",
      value: 98.7,
      target: 95,
      unit: "%",
      trend: "up",
      change: 1.4,
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-400" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-400" />
      default:
        return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-400"
      case "down":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div key={metric.name} className="glass-panel p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-400">{metric.name}</h3>
              <div className="flex items-center gap-2">
                {getTrendIcon(metric.trend)}
                <span className={`text-xs font-medium ${getTrendColor(metric.trend)}`}>
                  {metric.change > 0 ? "+" : ""}
                  {metric.change}%
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{metric.value}</span>
                <span className="text-sm text-gray-400">{metric.unit}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">
                    Target: {metric.target}
                    {metric.unit}
                  </span>
                  <Badge
                    variant="outline"
                    className={
                      metric.value >= metric.target
                        ? "border-green-500/30 text-green-400"
                        : "border-yellow-500/30 text-yellow-400"
                    }
                  >
                    {metric.value >= metric.target ? "On Target" : "Below Target"}
                  </Badge>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Performance Analysis */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Performance Analysis</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-400">Top Performers</h4>
            <div className="space-y-2">
              {["TERRA-1", "HUBBLE", "ISS"].map((satellite, index) => (
                <div key={satellite} className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span className="text-white text-sm">{satellite}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={95 - index * 3} className="w-20 h-2" />
                    <span className="text-xs text-green-400">{95 - index * 3}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-400">Needs Attention</h4>
            <div className="space-y-2">
              {["AQUA-2", "JASON-3", "TESS"].map((satellite, index) => (
                <div key={satellite} className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span className="text-white text-sm">{satellite}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={75 - index * 5} className="w-20 h-2" />
                    <span className="text-xs text-yellow-400">{75 - index * 5}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
