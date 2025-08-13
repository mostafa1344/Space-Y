"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Wrench, Fuel, TrendingUp, Brain } from "lucide-react"

interface PredictiveInsightsProps {
  data: {
    nextMaintenance: Array<{ satellite: string; days: number; confidence: number }>
    fuelDepletion: Array<{ satellite: string; days: number; confidence: number }>
    anomalyRisk: Array<{ satellite: string; risk: string; confidence: number }>
  }
}

export function PredictiveInsights({ data }: PredictiveInsightsProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "border-red-500/30 text-red-400"
      case "medium":
        return "border-yellow-500/30 text-yellow-400"
      case "low":
        return "border-green-500/30 text-green-400"
      default:
        return "border-gray-500/30 text-gray-400"
    }
  }

  const getUrgencyColor = (days: number) => {
    if (days <= 7) return "text-red-400"
    if (days <= 30) return "text-yellow-400"
    return "text-green-400"
  }

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <div className="glass-panel p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-orbitron font-bold text-white">AI Predictive Insights</h2>
        </div>
        <p className="text-gray-300">
          Advanced machine learning algorithms analyze satellite telemetry, historical patterns, and environmental
          factors to predict future maintenance needs and potential issues.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Maintenance Predictions */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Maintenance Schedule</h3>
          </div>
          <div className="space-y-4">
            {data.nextMaintenance.map((item) => (
              <div key={item.satellite} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{item.satellite}</span>
                  <Badge
                    variant="outline"
                    className={item.days <= 7 ? "border-red-500/30 text-red-400" : "border-blue-500/30 text-blue-400"}
                  >
                    {item.days} days
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={item.confidence} className="flex-1 h-2" />
                  <span className="text-xs text-gray-400">{item.confidence}% confidence</span>
                </div>
                <div className={`text-xs ${getUrgencyColor(item.days)}`}>
                  {item.days <= 7 ? "🚨 Urgent" : item.days <= 30 ? "⚠️ Soon" : "✅ Scheduled"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fuel Depletion */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <Fuel className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Fuel Analysis</h3>
          </div>
          <div className="space-y-4">
            {data.fuelDepletion.map((item) => (
              <div key={item.satellite} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{item.satellite}</span>
                  <Badge
                    variant="outline"
                    className={
                      item.days <= 30 ? "border-red-500/30 text-red-400" : "border-yellow-500/30 text-yellow-400"
                    }
                  >
                    {item.days} days
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={item.confidence} className="flex-1 h-2" />
                  <span className="text-xs text-gray-400">{item.confidence}% confidence</span>
                </div>
                <div className={`text-xs ${getUrgencyColor(item.days)}`}>Estimated depletion in {item.days} days</div>
              </div>
            ))}
          </div>
        </div>

        {/* Anomaly Risk */}
        <div className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Risk Assessment</h3>
          </div>
          <div className="space-y-4">
            {data.anomalyRisk.map((item) => (
              <div key={item.satellite} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{item.satellite}</span>
                  <Badge variant="outline" className={getRiskColor(item.risk)}>
                    {item.risk} risk
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={item.confidence} className="flex-1 h-2" />
                  <span className="text-xs text-gray-400">{item.confidence}% confidence</span>
                </div>
                <div className="text-xs text-gray-400">
                  {item.risk === "high"
                    ? "🔴 Monitor closely"
                    : item.risk === "medium"
                      ? "🟡 Watch for changes"
                      : "🟢 Normal operation"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-400">Immediate Actions</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
                <div>
                  <div className="text-sm text-white font-medium">Schedule AQUA-2 refuel</div>
                  <div className="text-xs text-gray-400">Critical fuel level detected</div>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <Wrench className="w-4 h-4 text-yellow-400 mt-0.5" />
                <div>
                  <div className="text-sm text-white font-medium">HUBBLE maintenance window</div>
                  <div className="text-xs text-gray-400">Solar panel efficiency declining</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-400">Optimization Opportunities</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <TrendingUp className="w-4 h-4 text-blue-400 mt-0.5" />
                <div>
                  <div className="text-sm text-white font-medium">Orbital path optimization</div>
                  <div className="text-xs text-gray-400">12% fuel savings potential</div>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <Brain className="w-4 h-4 text-green-400 mt-0.5" />
                <div>
                  <div className="text-sm text-white font-medium">Auto-management mode</div>
                  <div className="text-xs text-gray-400">Enable AI fleet optimization</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
