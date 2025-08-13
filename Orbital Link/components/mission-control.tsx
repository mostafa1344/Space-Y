"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Shield, Zap, Database, Radio, Battery, Globe } from "lucide-react"

export function MissionControl() {
  const [emergencyMode, setEmergencyMode] = useState(false)
  const [emergencyActions, setEmergencyActions] = useState<string[]>([])
  const [systemStatus, setSystemStatus] = useState({
    status: "OPERATIONAL",
    dataFlow: "2.4 GB/s",
    activeMissions: 12,
    alerts: 3,
  })

  const handleEmergencyProtocol = () => {
    setEmergencyMode(!emergencyMode)

    if (!emergencyMode) {
      // Activate emergency protocol
      const actions = [
        "🛰️ All satellites switching to safe mode",
        "📡 Ground stations alerted - Priority Alpha",
        "🔒 Autonomous systems locked down",
        "⚠️ All active missions suspended",
        "👥 Emergency response team notified",
        "📊 Critical telemetry data archived",
        "🔋 Power systems optimized for emergency",
        "🌍 Manual ground control override enabled",
        "🚨 NASA headquarters notified",
        "📞 International space agencies contacted",
        "🛡️ Backup communication channels activated",
        "⏰ Emergency timeline initiated",
      ]

      setEmergencyActions(actions)
      setSystemStatus({
        status: "EMERGENCY",
        dataFlow: "0.8 GB/s",
        activeMissions: 0,
        alerts: 15,
      })

      console.log("🚨 EMERGENCY PROTOCOL ACTIVATED")
      actions.forEach((action) => console.log(action))

      // Show system-wide notification
      const notification = document.createElement("div")
      notification.className =
        "fixed top-0 left-0 right-0 bg-red-500/20 border-b border-red-500/30 text-red-400 px-6 py-3 z-50 text-center font-bold"
      notification.textContent = "🚨 EMERGENCY PROTOCOL ACTIVE - ALL SYSTEMS IN SAFE MODE"
      document.body.appendChild(notification)
    } else {
      // Deactivate emergency protocol
      setEmergencyActions([])
      setSystemStatus({
        status: "OPERATIONAL",
        dataFlow: "2.4 GB/s",
        activeMissions: 12,
        alerts: 3,
      })

      console.log("✅ Emergency Protocol Deactivated - Systems returning to normal")

      // Remove notification
      const notification = document.querySelector(".fixed.top-0")
      if (notification) {
        notification.remove()
      }

      // Show deactivation feedback
      const feedback = document.createElement("div")
      feedback.className =
        "fixed top-4 right-4 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg z-50"
      feedback.textContent = "✅ Emergency Protocol Deactivated"
      document.body.appendChild(feedback)
      setTimeout(() => feedback.remove(), 3000)
    }
  }

  const handleAIAutoMode = () => {
    if (emergencyMode) {
      const feedback = document.createElement("div")
      feedback.className =
        "fixed top-4 right-4 bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg z-50"
      feedback.textContent = "❌ AI Auto-Mode disabled during emergency"
      document.body.appendChild(feedback)
      setTimeout(() => feedback.remove(), 3000)
      return
    }

    console.log("🤖 AI Auto-Mode activated")
    console.log("- Autonomous satellite management enabled")
    console.log("- Predictive maintenance scheduling active")
    console.log("- Optimal orbit calculations running")

    const feedback = document.createElement("div")
    feedback.className =
      "fixed top-4 right-4 bg-blue-500/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-lg z-50"
    feedback.textContent = "🤖 AI Auto-Mode Activated"
    document.body.appendChild(feedback)
    setTimeout(() => feedback.remove(), 2000)
  }

  return (
    <div className="glass-panel h-full">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-lg font-orbitron font-bold text-white mb-4">Mission Control</h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${emergencyMode ? "text-red-400" : "text-green-400"}`}>
              {systemStatus.status}
            </div>
            <div className="text-xs text-gray-400">System Status</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{systemStatus.dataFlow}</div>
            <div className="text-xs text-gray-400">Data Flow</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-400">{systemStatus.activeMissions}</div>
            <div className="text-xs text-gray-400">Active Missions</div>
          </div>
          <div className="text-center">
            <div className={`text-xl font-bold ${systemStatus.alerts > 10 ? "text-red-400" : "text-yellow-400"}`}>
              {systemStatus.alerts}
            </div>
            <div className="text-xs text-gray-400">System Alerts</div>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            onClick={handleEmergencyProtocol}
            className={`w-full ${
              emergencyMode
                ? "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            {emergencyMode ? "Deactivate Emergency" : "Emergency Protocol"}
          </Button>

          <Button
            onClick={handleAIAutoMode}
            disabled={emergencyMode}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-4 h-4 mr-2" />
            AI Auto-Mode
          </Button>
        </div>
      </div>

      {emergencyMode && (
        <div className="p-4 border-b border-red-500/30 bg-red-500/10">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="font-bold text-red-400">EMERGENCY ACTIONS TAKEN</span>
          </div>

          <ScrollArea className="h-32">
            <div className="space-y-1">
              {emergencyActions.map((action, index) => (
                <div key={index} className="text-xs text-red-300 flex items-center gap-2">
                  <div className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0" />
                  <span className="break-words">{action}</span>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-3 p-2 bg-red-500/20 rounded border border-red-500/30">
            <div className="text-xs text-red-400 font-medium">Emergency Status:</div>
            <div className="text-xs text-red-300">All satellites in safe mode • Ground stations alerted</div>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">System Health</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Security Systems
                </span>
                <span className="text-green-400">98%</span>
              </div>
              <Progress value={98} className="h-1" />

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  Data Integrity
                </span>
                <span className="text-green-400">99%</span>
              </div>
              <Progress value={99} className="h-1" />

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 flex items-center gap-1">
                  <Radio className="w-3 h-3" />
                  Communication
                </span>
                <span className={emergencyMode ? "text-yellow-400" : "text-green-400"}>
                  {emergencyMode ? "85%" : "96%"}
                </span>
              </div>
              <Progress value={emergencyMode ? 85 : 96} className="h-1" />

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 flex items-center gap-1">
                  <Battery className="w-3 h-3" />
                  Power Grid
                </span>
                <span className="text-green-400">94%</span>
              </div>
              <Progress value={94} className="h-1" />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">Ground Stations</h4>
            <div className="space-y-2">
              {[
                { name: "Houston", status: "online", signal: 98 },
                { name: "Kennedy", status: "online", signal: 95 },
                { name: "Goddard", status: emergencyMode ? "emergency" : "online", signal: emergencyMode ? 88 : 97 },
                { name: "JPL", status: "online", signal: 92 },
              ].map((station) => (
                <div key={station.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    <span className="text-gray-300">{station.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        station.status === "emergency"
                          ? "border-red-500/30 text-red-400"
                          : "border-green-500/30 text-green-400"
                      }
                    >
                      {station.status}
                    </Badge>
                    <span className="text-cyan-400 font-mono">{station.signal}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">Recent Activities</h4>
            <div className="space-y-2 text-xs">
              {emergencyMode ? (
                <>
                  <div className="text-red-400">🚨 Emergency protocol activated</div>
                  <div className="text-yellow-400">⚠️ All missions suspended</div>
                  <div className="text-red-400">🛰️ Satellites in safe mode</div>
                  <div className="text-yellow-400">📡 Ground control override active</div>
                </>
              ) : (
                <>
                  <div className="text-green-400">✅ TERRA-1 orbit adjustment completed</div>
                  <div className="text-blue-400">📡 Deep space communication established</div>
                  <div className="text-cyan-400">🔄 GPS constellation sync updated</div>
                  <div className="text-green-400">🌍 Weather data collection active</div>
                </>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
