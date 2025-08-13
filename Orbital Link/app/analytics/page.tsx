"use client"

import { useState, useEffect, useMemo } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AnalyticsChart } from "@/components/analytics-chart"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { PredictiveInsights } from "@/components/predictive-insights"
import { FleetOverview } from "@/components/fleet-overview"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, TrendingUp, Zap, AlertTriangle, Target } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [refreshing, setRefreshing] = useState(false)
  const [analyticsData, setAnalyticsData] = useState<any>(null)

  const generateAnalyticsData = useMemo(() => {
    return {
      fleetPerformance: {
        totalSatellites: 12,
        operational: 8,
        maintenance: 3,
        critical: 1,
        averageHealth: 87.3,
        averageFuel: 68.2,
        uptime: 99.2,
        dataTransmitted: 2847.5,
      },
      missionSuccess: {
        completed: 156,
        active: 12,
        planned: 8,
        successRate: 96.8,
        averageDuration: 127,
      },
      costAnalysis: {
        operational: 2.4,
        maintenance: 0.8,
        fuel: 1.2,
        total: 4.4,
        savings: 0.6,
      },
      predictions: {
        nextMaintenance: [
          { satellite: "HUBBLE", days: 7, confidence: 94 },
          { satellite: "TERRA-1", days: 14, confidence: 87 },
          { satellite: "AQUA-2", days: 3, confidence: 98 },
        ],
        fuelDepletion: [
          { satellite: "AQUA-2", days: 45, confidence: 92 },
          { satellite: "JASON-3", days: 67, confidence: 89 },
        ],
        anomalyRisk: [
          { satellite: "TESS", risk: "medium", confidence: 76 },
          { satellite: "GOES-16", risk: "low", confidence: 91 },
        ],
      },
    }
  }, [timeRange])

  useEffect(() => {
    setAnalyticsData(generateAnalyticsData)
  }, [generateAnalyticsData])

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setAnalyticsData(generateAnalyticsData)
      setRefreshing(false)
    }, 1500)
  }

  const generateReport = async () => {
    console.log("📋 Generating comprehensive analytics report...")

    // Show loading state
    const reportButton = document.querySelector("[data-report-button]") as HTMLButtonElement
    if (reportButton) {
      reportButton.disabled = true
      reportButton.textContent = "Generating..."
    }

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const report = {
      timestamp: new Date().toISOString(),
      summary: "Fleet operating at 87.3% efficiency with 99.2% uptime",
      fleetStatus: {
        totalSatellites: analyticsData.fleetPerformance.totalSatellites,
        operational: analyticsData.fleetPerformance.operational,
        maintenance: analyticsData.fleetPerformance.maintenance,
        critical: analyticsData.fleetPerformance.critical,
      },
      recommendations: [
        "Schedule maintenance for HUBBLE within 7 days",
        "Monitor AQUA-2 fuel levels closely",
        "Optimize orbital paths for 12% fuel savings",
        "Implement automated efficiency protocols",
      ],
      alerts: analyticsData?.predictions.nextMaintenance.filter((item: any) => item.days <= 7).length || 0,
      costSavings: `$${analyticsData.costAnalysis.savings}M`,
      missionSuccessRate: `${analyticsData.missionSuccess.successRate}%`,
    }

    // Create downloadable report
    const reportBlob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(reportBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = `space-y-fleet-report-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    console.log("✅ Report generated and downloaded:", report)

    // Reset button state
    if (reportButton) {
      reportButton.disabled = false
      reportButton.innerHTML =
        '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>AI Report'
    }
  }

  if (!analyticsData) {
    return (
      <DashboardLayout>
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading analytics data...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-orbitron font-bold text-white truncate">Fleet Analytics</h1>
            <p className="text-gray-400 mt-1 truncate">AI-powered insights and performance analysis</p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/10">
                <SelectItem value="24h" className="text-white">
                  24 Hours
                </SelectItem>
                <SelectItem value="7d" className="text-white">
                  7 Days
                </SelectItem>
                <SelectItem value="30d" className="text-white">
                  30 Days
                </SelectItem>
                <SelectItem value="90d" className="text-white">
                  90 Days
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="text-white border-white/20 bg-transparent hover:bg-white/10"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={generateReport}
              data-report-button
              className="text-purple-400 border-purple-500/30 bg-transparent hover:bg-purple-500/20"
            >
              <Zap className="w-4 h-4 mr-2" />
              AI Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-400 truncate">Fleet Health</div>
              <TrendingUp className="w-4 h-4 text-green-400 flex-shrink-0" />
            </div>
            <div className="text-2xl font-bold text-white">{analyticsData.fleetPerformance.averageHealth}%</div>
            <div className="text-xs text-green-400">+2.3% from last week</div>
          </div>

          <div className="glass-panel p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-400 truncate">Mission Success</div>
              <Target className="w-4 h-4 text-blue-400 flex-shrink-0" />
            </div>
            <div className="text-2xl font-bold text-white">{analyticsData.missionSuccess.successRate}%</div>
            <div className="text-xs text-blue-400">Industry leading</div>
          </div>

          <div className="glass-panel p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-400 truncate">Cost Efficiency</div>
              <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            </div>
            <div className="text-2xl font-bold text-white">${analyticsData.costAnalysis.total}M</div>
            <div className="text-xs text-green-400">-12% optimized</div>
          </div>

          <div className="glass-panel p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-400 truncate">Active Alerts</div>
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
            </div>
            <div className="text-2xl font-bold text-white">
              {analyticsData.predictions.nextMaintenance.filter((item: any) => item.days <= 7).length}
            </div>
            <div className="text-xs text-yellow-400">Requires attention</div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FleetOverview data={analyticsData.fleetPerformance} />
              <AnalyticsChart
                title="Fleet Performance Trend"
                data={analyticsData}
                timeRange={timeRange}
                type="performance"
              />
            </div>
            <AnalyticsChart title="Mission Success Rate" data={analyticsData} timeRange={timeRange} type="missions" />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6 mt-6">
            <PerformanceMetrics data={analyticsData} timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6 mt-6">
            <PredictiveInsights data={analyticsData.predictions} />
          </TabsContent>

          <TabsContent value="costs" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsChart title="Cost Breakdown" data={analyticsData} timeRange={timeRange} type="costs" />
              <div className="glass-panel p-6">
                <h3 className="text-lg font-semibold text-white mb-4 truncate">Cost Optimization</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 truncate">AI Savings</span>
                    <span className="text-green-400 font-bold flex-shrink-0">
                      ${analyticsData.costAnalysis.savings}M
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 truncate">Efficiency Gain</span>
                    <span className="text-blue-400 font-bold flex-shrink-0">12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 truncate">ROI</span>
                    <span className="text-purple-400 font-bold flex-shrink-0">340%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
