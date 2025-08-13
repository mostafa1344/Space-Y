"use client"

import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

interface TelemetryMessage {
  id: string
  timestamp: string
  satellite: string
  type: "info" | "warning" | "error" | "success"
  message: string
}

export function TelemetryStream() {
  const [messages, setMessages] = useState<TelemetryMessage[]>([])

  useEffect(() => {
    const generateMessage = (): TelemetryMessage => {
      const satellites = ["TERRA-1", "AQUA-2", "LANDSAT-8", "HUBBLE", "ISS"]
      const types: Array<"info" | "warning" | "error" | "success"> = ["info", "warning", "error", "success"]
      const messageTemplates = {
        info: [
          "Telemetry data received",
          "Orbit adjustment complete",
          "Solar panel alignment optimal",
          "Communication link established",
        ],
        warning: [
          "Fuel level at 25%",
          "Temperature spike detected",
          "Signal strength degraded",
          "Battery charge below threshold",
        ],
        error: [
          "Communication timeout",
          "Sensor malfunction detected",
          "Attitude control error",
          "Power system anomaly",
        ],
        success: [
          "Mission objective completed",
          "Data transmission successful",
          "System diagnostics passed",
          "Orbit insertion confirmed",
        ],
      }

      const type = types[Math.floor(Math.random() * types.length)]
      const satellite = satellites[Math.floor(Math.random() * satellites.length)]
      const message = messageTemplates[type][Math.floor(Math.random() * messageTemplates[type].length)]

      return {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        satellite,
        type,
        message,
      }
    }

    const interval = setInterval(() => {
      setMessages((prev) => {
        const newMessage = generateMessage()
        const updated = [newMessage, ...prev].slice(0, 50)
        return updated
      })
    }, 2000)

    const initialMessages = Array.from({ length: 10 }, generateMessage)
    setMessages(initialMessages)

    return () => clearInterval(interval)
  }, [])

  const getMessageColor = (type: string) => {
    switch (type) {
      case "error":
        return "text-red-400"
      case "warning":
        return "text-yellow-400"
      case "success":
        return "text-green-400"
      default:
        return "text-blue-400"
    }
  }

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "error":
        return "●"
      case "warning":
        return "▲"
      case "success":
        return "✓"
      default:
        return "○"
    }
  }

  const handleClearLog = () => {
    setMessages([])
    console.log("📋 Telemetry log cleared")
  }

  return (
    <div className="glass-panel p-4 h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-orbitron text-lg font-semibold text-white truncate">Live Telemetry</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearLog}
          className="text-xs text-red-400 border-red-500/30 bg-transparent hover:bg-red-500/20 flex-shrink-0"
        >
          Clear
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {messages.map((message) => (
            <div key={message.id} className="text-xs font-mono">
              <div className="flex items-start gap-2">
                <span className={`${getMessageColor(message.type)} mt-0.5 flex-shrink-0`}>
                  {getMessageIcon(message.type)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-400 text-xs">{message.timestamp}</span>
                    <span className="text-cyan-400 font-semibold truncate text-xs">{message.satellite}</span>
                  </div>
                  <div className={`${getMessageColor(message.type)} leading-tight break-words text-xs`}>
                    {message.message}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
