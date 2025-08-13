"use client"

import type { Satellite } from "@/types/satellite"

interface MiniMapProps {
  satellites: Satellite[]
}

export function MiniMap({ satellites }: MiniMapProps) {
  const statusCounts = satellites.reduce(
    (acc, sat) => {
      acc[sat.status] = (acc[sat.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="glass-panel p-4">
      <h3 className="font-orbitron text-lg font-semibold text-white mb-4">System Overview</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-400">{statusCounts.operational || 0}</div>
            <div className="text-xs text-gray-400">Operational</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-2xl font-bold text-red-400">{statusCounts.critical || 0}</div>
            <div className="text-xs text-gray-400">Critical</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Network Health</span>
            <span className="text-green-400">98.5%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-green-400 h-2 rounded-full" style={{ width: "98.5%" }}></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Data Throughput</span>
            <span className="text-blue-400">2.4 GB/s</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-blue-400 h-2 rounded-full animate-pulse" style={{ width: "75%" }}></div>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10">
          <div className="text-xs text-gray-400 mb-2">Recent Events</div>
          <div className="space-y-1 text-xs">
            <div className="text-green-400">✓ TERRA-1 orbit adjusted</div>
            <div className="text-yellow-400">⚠ AQUA-2 fuel low</div>
            <div className="text-blue-400">○ ISS communication restored</div>
          </div>
        </div>
      </div>
    </div>
  )
}
