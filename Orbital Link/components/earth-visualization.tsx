"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import type { Satellite } from "@/types/satellite"

interface EarthVisualizationProps {
  satellites: Satellite[]
  selectedSatellite: Satellite | null
  onSatelliteClick: (satellite: Satellite) => void
  onSatelliteSelect: (satellite: Satellite | null) => void
}

export function EarthVisualization({
  satellites,
  selectedSatellite,
  onSatelliteClick,
  onSatelliteSelect,
}: EarthVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [rotation, setRotation] = useState(0)
  const [hoveredSatellite, setHoveredSatellite] = useState<Satellite | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = rect.width
    const height = rect.height
    const centerX = width / 2
    const centerY = height / 2
    const earthRadius = Math.min(width, height) * 0.15

    let animationId: number

    const animate = (currentRotation: number) => {
      ctx.clearRect(0, 0, width, height)

      // Draw orbital rings
      const rings = [
        { radius: earthRadius + 60, color: "#3b82f6" },
        { radius: earthRadius + 120, color: "#06b6d4" },
        { radius: earthRadius + 180, color: "#8b5cf6" },
      ]

      rings.forEach((ring) => {
        ctx.strokeStyle = ring.color + "40"
        ctx.lineWidth = 2
        ctx.setLineDash([10, 5])
        ctx.beginPath()
        ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])

        ctx.strokeStyle = ring.color + "20"
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2)
        ctx.stroke()
      })

      // Draw realistic Earth with continents and oceans
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(currentRotation * 0.002) // Slower, more realistic rotation

      // Ocean base (blue)
      const oceanGradient = ctx.createRadialGradient(-earthRadius / 3, -earthRadius / 3, 0, 0, 0, earthRadius)
      oceanGradient.addColorStop(0, "#4a90e2")
      oceanGradient.addColorStop(0.3, "#357abd")
      oceanGradient.addColorStop(0.7, "#2563eb")
      oceanGradient.addColorStop(1, "#1e40af")

      ctx.fillStyle = oceanGradient
      ctx.beginPath()
      ctx.arc(0, 0, earthRadius, 0, Math.PI * 2)
      ctx.fill()

      // Draw continents (simplified shapes)
      ctx.fillStyle = "#22c55e"

      // North America
      ctx.beginPath()
      ctx.ellipse(-earthRadius * 0.4, -earthRadius * 0.3, earthRadius * 0.25, earthRadius * 0.4, 0.2, 0, Math.PI * 2)
      ctx.fill()

      // South America
      ctx.beginPath()
      ctx.ellipse(-earthRadius * 0.3, earthRadius * 0.4, earthRadius * 0.15, earthRadius * 0.35, 0.1, 0, Math.PI * 2)
      ctx.fill()

      // Europe/Africa
      ctx.beginPath()
      ctx.ellipse(earthRadius * 0.1, -earthRadius * 0.1, earthRadius * 0.2, earthRadius * 0.5, -0.1, 0, Math.PI * 2)
      ctx.fill()

      // Asia
      ctx.beginPath()
      ctx.ellipse(earthRadius * 0.4, -earthRadius * 0.2, earthRadius * 0.3, earthRadius * 0.3, 0, 0, Math.PI * 2)
      ctx.fill()

      // Australia
      ctx.beginPath()
      ctx.ellipse(earthRadius * 0.5, earthRadius * 0.4, earthRadius * 0.12, earthRadius * 0.08, 0, 0, Math.PI * 2)
      ctx.fill()

      // Add mountain ranges (darker green)
      ctx.fillStyle = "#16a34a"

      // Rocky Mountains
      ctx.beginPath()
      ctx.ellipse(-earthRadius * 0.45, -earthRadius * 0.2, earthRadius * 0.05, earthRadius * 0.25, 0.3, 0, Math.PI * 2)
      ctx.fill()

      // Andes
      ctx.beginPath()
      ctx.ellipse(-earthRadius * 0.32, earthRadius * 0.3, earthRadius * 0.03, earthRadius * 0.3, 0.1, 0, Math.PI * 2)
      ctx.fill()

      // Himalayas
      ctx.beginPath()
      ctx.ellipse(earthRadius * 0.35, -earthRadius * 0.15, earthRadius * 0.08, earthRadius * 0.04, 0, 0, Math.PI * 2)
      ctx.fill()

      // Add ice caps
      ctx.fillStyle = "#f0f9ff"

      // North pole
      ctx.beginPath()
      ctx.ellipse(0, -earthRadius * 0.85, earthRadius * 0.3, earthRadius * 0.15, 0, 0, Math.PI * 2)
      ctx.fill()

      // South pole
      ctx.beginPath()
      ctx.ellipse(0, earthRadius * 0.85, earthRadius * 0.25, earthRadius * 0.15, 0, 0, Math.PI * 2)
      ctx.fill()

      // Add cloud patterns
      ctx.fillStyle = "#ffffff40"

      // Cloud swirls
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8 + currentRotation * 0.001
        const cloudX = Math.cos(angle) * earthRadius * 0.6
        const cloudY = Math.sin(angle) * earthRadius * 0.6
        ctx.beginPath()
        ctx.ellipse(cloudX, cloudY, earthRadius * 0.1, earthRadius * 0.05, angle, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()

      // Atmospheric glow
      const atmosphereGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        earthRadius,
        centerX,
        centerY,
        earthRadius + 25,
      )
      atmosphereGradient.addColorStop(0, "#87ceeb40")
      atmosphereGradient.addColorStop(0.5, "#87ceeb20")
      atmosphereGradient.addColorStop(1, "transparent")
      ctx.fillStyle = atmosphereGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, earthRadius + 25, 0, Math.PI * 2)
      ctx.fill()

      // Day/night terminator (more subtle)
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(currentRotation * 0.003)

      const terminatorGradient = ctx.createLinearGradient(-earthRadius, 0, earthRadius, 0)
      terminatorGradient.addColorStop(0, "#00000040")
      terminatorGradient.addColorStop(0.1, "#00000030")
      terminatorGradient.addColorStop(0.5, "#00000010")
      terminatorGradient.addColorStop(1, "transparent")

      ctx.fillStyle = terminatorGradient
      ctx.beginPath()
      ctx.arc(0, 0, earthRadius, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Draw satellites
      satellites.forEach((satellite, index) => {
        const orbitRadius =
          satellite.orbit === "LEO"
            ? earthRadius + 60
            : satellite.orbit === "MEO"
              ? earthRadius + 120
              : earthRadius + 180
        const orbitSpeed = satellite.orbit === "LEO" ? 1.2 : satellite.orbit === "MEO" ? 0.8 : 0.3
        const angle =
          ((currentRotation * orbitSpeed * satellite.speed + index * (360 / satellites.length)) * Math.PI) / 180
        const x = centerX + Math.cos(angle) * orbitRadius
        const y = centerY + Math.sin(angle) * orbitRadius

        // Satellite trail
        const trailLength = satellite.orbit === "LEO" ? 20 : satellite.orbit === "MEO" ? 15 : 10
        const trailOpacity = satellite.status === "operational" ? "40" : "20"

        ctx.strokeStyle = getStatusColor(satellite.status) + trailOpacity
        ctx.lineWidth = 2
        ctx.beginPath()

        for (let i = 0; i < trailLength; i++) {
          const trailAngle = angle - i * 0.05
          const trailX = centerX + Math.cos(trailAngle) * orbitRadius
          const trailY = centerY + Math.sin(trailAngle) * orbitRadius
          const opacity = (1 - i / trailLength) * 0.8

          if (i === 0) {
            ctx.moveTo(trailX, trailY)
          } else {
            ctx.globalAlpha = opacity
            ctx.lineTo(trailX, trailY)
          }
        }
        ctx.stroke()
        ctx.globalAlpha = 1

        // Satellite rendering
        const isSelected = selectedSatellite?.id === satellite.id
        const isHovered = hoveredSatellite?.id === satellite.id
        const satelliteSize = isSelected ? 6 : isHovered ? 5 : 3
        const glowSize = isSelected ? 15 : isHovered ? 12 : 8

        // Satellite glow
        const satGlow = ctx.createRadialGradient(x, y, 0, x, y, glowSize)
        satGlow.addColorStop(0, getStatusColor(satellite.status) + "80")
        satGlow.addColorStop(0.5, getStatusColor(satellite.status) + "40")
        satGlow.addColorStop(1, "transparent")
        ctx.fillStyle = satGlow
        ctx.beginPath()
        ctx.arc(x, y, glowSize, 0, Math.PI * 2)
        ctx.fill()

        // Satellite body
        ctx.fillStyle = getStatusColor(satellite.status)
        ctx.beginPath()
        ctx.arc(x, y, satelliteSize, 0, Math.PI * 2)
        ctx.fill()

        // Selection ring
        if (isSelected) {
          ctx.strokeStyle = "#ffffff80"
          ctx.lineWidth = 2
          ctx.setLineDash([4, 4])
          ctx.beginPath()
          ctx.arc(x, y, satelliteSize + 4, 0, Math.PI * 2)
          ctx.stroke()
          ctx.setLineDash([])
        }

        // Solar panels for selected satellite
        if (isSelected || isHovered) {
          ctx.fillStyle = "#3b82f680"
          ctx.fillRect(x - 8, y - 1, 6, 2)
          ctx.fillRect(x + 2, y - 1, 6, 2)
        }

        satellite.x = x
        satellite.y = y

        // Satellite label on hover/selection
        if (isSelected || isHovered) {
          ctx.fillStyle = "#ffffff"
          ctx.font = "10px monospace"
          ctx.textAlign = "center"
          ctx.fillText(satellite.name, x, y - 20)

          ctx.font = "8px monospace"
          ctx.fillStyle = getStatusColor(satellite.status)
          ctx.fillText(`${satellite.status.toUpperCase()}`, x, y - 10)

          // Show click instruction for selected satellite
          if (isSelected) {
            ctx.font = "7px monospace"
            ctx.fillStyle = "#ffffff80"
            ctx.fillText("Click again for details", x, y + 25)
          }
        }
      })

      const newRotation = currentRotation + 0.3 // Slower, more realistic rotation
      animationId = requestAnimationFrame(() => animate(newRotation))
    }

    animate(rotation)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [satellites, selectedSatellite, hoveredSatellite])

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.3) // Slower rotation
    }, 16)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    const colors = {
      operational: "#10b981",
      maintenance: "#3b82f6",
      critical: "#ef4444",
      refueling: "#f59e0b",
      offline: "#6b7280",
    }
    return colors[status as keyof typeof colors] || "#6b7280"
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const clickY = event.clientY - rect.top

    let clickedSatellite: Satellite | null = null

    satellites.forEach((satellite) => {
      if (satellite.x && satellite.y) {
        const distance = Math.sqrt(Math.pow(clickX - satellite.x, 2) + Math.pow(clickY - satellite.y, 2))
        if (distance <= 15) {
          clickedSatellite = satellite
        }
      }
    })

    if (clickedSatellite) {
      onSatelliteClick(clickedSatellite)
    } else {
      onSatelliteSelect(null)
    }
  }

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    let hoveredSat: Satellite | null = null

    satellites.forEach((satellite) => {
      if (satellite.x && satellite.y) {
        const distance = Math.sqrt(Math.pow(mouseX - satellite.x, 2) + Math.pow(mouseY - satellite.y, 2))
        if (distance <= 15) {
          hoveredSat = satellite
        }
      }
    })

    setHoveredSatellite(hoveredSat)
    canvas.style.cursor = hoveredSat ? "pointer" : "default"
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="cursor-default"
        style={{ width: "100%", height: "600px" }}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
      />

      {/* Orbit indicators */}
      <div className="absolute top-4 right-4 glass-panel p-3 space-y-2">
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2 text-blue-400">
            <div className="w-3 h-0.5 bg-blue-400"></div>
            <span>LEO (400km)</span>
          </div>
          <div className="flex items-center gap-2 text-cyan-400">
            <div className="w-3 h-0.5 bg-cyan-400"></div>
            <span>MEO (20,000km)</span>
          </div>
          <div className="flex items-center gap-2 text-purple-400">
            <div className="w-3 h-0.5 bg-purple-400"></div>
            <span>GEO (35,786km)</span>
          </div>
        </div>
      </div>

      {/* Live status panel */}
      <div className="absolute bottom-4 left-4 glass-panel p-3">
        <div className="text-xs text-gray-400 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">LIVE</span>
          </div>
          <div>Active Satellites: {satellites.length}</div>
          {selectedSatellite && <div className="text-cyan-400 font-medium">Tracking: {selectedSatellite.name}</div>}
        </div>
      </div>

      {/* Click instruction overlay */}
      <div className="absolute top-4 left-4 glass-panel p-3">
        <div className="text-xs text-gray-400 space-y-1">
          <div className="text-white font-medium">Satellite Controls:</div>
          <div>• Click once to track</div>
          <div>• Click twice for details</div>
        </div>
      </div>
    </div>
  )
}
