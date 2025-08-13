"use client"

import { useEffect, useRef } from "react"

interface AnalyticsChartProps {
  title: string
  data: any
  timeRange: string
  type: "performance" | "missions" | "costs"
}

export function AnalyticsChart({ title, data, timeRange, type }: AnalyticsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = rect.width
    const height = rect.height

    ctx.clearRect(0, 0, width, height)

    // Generate mock data based on type
    const generateChartData = () => {
      const points = timeRange === "24h" ? 24 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90

      switch (type) {
        case "performance":
          return Array.from({ length: points }, (_, i) => ({
            x: (width / (points - 1)) * i,
            y: height - height * (0.7 + Math.random() * 0.25),
            value: 70 + Math.random() * 25,
          }))
        case "missions":
          return Array.from({ length: points }, (_, i) => ({
            x: (width / (points - 1)) * i,
            y: height - height * (0.85 + Math.random() * 0.1),
            value: 85 + Math.random() * 10,
          }))
        case "costs":
          return Array.from({ length: points }, (_, i) => ({
            x: (width / (points - 1)) * i,
            y: height - height * (0.3 + Math.random() * 0.4),
            value: 30 + Math.random() * 40,
          }))
        default:
          return []
      }
    }

    const chartData = generateChartData()

    // Draw grid
    ctx.strokeStyle = "#ffffff10"
    ctx.lineWidth = 1

    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = (width / 10) * i
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = (height / 5) * i
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw chart line
    if (chartData.length > 1) {
      const colors = {
        performance: "#10b981",
        missions: "#3b82f6",
        costs: "#f59e0b",
      }

      ctx.strokeStyle = colors[type]
      ctx.lineWidth = 3
      ctx.beginPath()

      chartData.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      })

      ctx.stroke()

      // Draw area under curve
      ctx.fillStyle = colors[type] + "20"
      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fill()

      // Draw data points
      ctx.fillStyle = colors[type]
      chartData.forEach((point) => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Draw labels
    ctx.fillStyle = "#9ca3af"
    ctx.font = "12px monospace"
    ctx.textAlign = "left"
    ctx.fillText("0", 5, height - 5)
    ctx.textAlign = "right"
    ctx.fillText("100", width - 5, 15)
  }, [data, timeRange, type])

  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="relative">
        <canvas ref={canvasRef} className="w-full h-[300px] rounded" style={{ width: "100%", height: "300px" }} />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>{timeRange === "24h" ? "24h ago" : `${timeRange} ago`}</span>
        <span>Now</span>
      </div>
    </div>
  )
}
