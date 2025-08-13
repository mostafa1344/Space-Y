"use client"

import { useState, useCallback } from "react"

export function useSimulation() {
  const [isRunning, setIsRunning] = useState(true)
  const [speed, setSpeed] = useState(1)

  const toggleSimulation = useCallback(() => {
    setIsRunning((prev) => !prev)
  }, [])

  const updateSpeed = useCallback((newSpeed: number) => {
    setSpeed(newSpeed)
  }, [])

  return {
    isRunning,
    speed,
    toggleSimulation,
    setSpeed: updateSpeed,
  }
}
