"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface TelemetryChartProps {
  config: {
    id: string
    title: string
    color: string
    unit: string
  }
  timeRange: string
  refreshing: boolean
}

export function TelemetryChart({ config, timeRange, refreshing }: TelemetryChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const generateData = () => {
      const points = timeRange === "1H" ? 12 : timeRange === "24H" ? 24 : 168
      const baseValue = Math.random() * 100

      return Array.from({ length: points }, (_, i) => ({
        time: i,
        value: Math.max(0, Math.min(100, baseValue + (Math.random() - 0.5) * 20)),
      }))
    }

    setData(generateData())
  }, [timeRange, refreshing])

  return (
    <div className="h-32 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis hide />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              color: "white",
            }}
            formatter={(value: any) => [`${value.toFixed(1)}${config.unit}`, config.title]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={config.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: config.color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
