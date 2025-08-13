"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, AlertTriangle, Clock } from "lucide-react"

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  status: "completed" | "active" | "upcoming" | "critical"
  mission: string
  satellite: string
}

interface MissionTimelineProps {
  filter: string
}

export function MissionTimeline({ filter }: MissionTimelineProps) {
  const [events, setEvents] = useState<TimelineEvent[]>([])

  useEffect(() => {
    const mockEvents: TimelineEvent[] = [
      {
        id: "e1",
        date: "2024-01-15",
        title: "Arctic Ice Monitoring Started",
        description: "Initiated comprehensive Arctic ice sheet monitoring mission",
        status: "completed",
        mission: "Arctic Ice Monitoring",
        satellite: "TERRA-1",
      },
      {
        id: "e2",
        date: "2024-02-01",
        title: "Deep Space Relay Activated",
        description: "Communication relay system for deep space missions activated",
        status: "completed",
        mission: "Deep Space Communication",
        satellite: "HUBBLE",
      },
      {
        id: "e3",
        date: "2024-02-15",
        title: "Exoplanet Survey Phase 1",
        description: "First phase of exoplanet discovery mission completed",
        status: "active",
        mission: "Exoplanet Survey",
        satellite: "TESS",
      },
      {
        id: "e4",
        date: "2024-03-01",
        title: "GPS Maintenance Scheduled",
        description: "Routine maintenance of GPS constellation satellites",
        status: "upcoming",
        mission: "GPS Constellation Maintenance",
        satellite: "GPS-III",
      },
      {
        id: "e5",
        date: "2024-02-20",
        title: "Critical System Alert",
        description: "Anomaly detected in exoplanet survey instruments",
        status: "critical",
        mission: "Exoplanet Survey",
        satellite: "TESS",
      },
    ]

    setEvents(mockEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
  }, [filter])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "active":
        return <Circle className="w-5 h-5 text-blue-400 animate-pulse" />
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-400" />
      default:
        return <Clock className="w-5 h-5 text-yellow-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "active":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    }
  }

  return (
    <div className="glass-panel p-6">
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="relative">
            {index < events.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-16 bg-white/20"></div>}

            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">{getStatusIcon(event.status)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-white">{event.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{event.description}</p>
                  </div>
                  <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-400 mt-3">
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                  <span className="text-cyan-400">{event.satellite}</span>
                  <span>{event.mission}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
