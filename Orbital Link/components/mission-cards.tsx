"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Target, AlertTriangle, CheckCircle, X, Edit, Eye } from "lucide-react"

interface Mission {
  id: string
  name: string
  category: string
  status: "active" | "completed" | "pending" | "critical"
  progress: number
  priority: "high" | "medium" | "low"
  startDate: string
  endDate: string
  satellite: string
  description: string
}

interface MissionCardsProps {
  filter: string
}

export function MissionCards({ filter }: MissionCardsProps) {
  const [missions, setMissions] = useState<Mission[]>([])
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showModifyModal, setShowModifyModal] = useState(false)
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)
  const [modifyData, setModifyData] = useState<Mission | null>(null)

  useEffect(() => {
    // Generate mock missions
    const mockMissions: Mission[] = [
      {
        id: "m1",
        name: "Arctic Ice Monitoring",
        category: "earth",
        status: "active",
        progress: 75,
        priority: "high",
        startDate: "2024-01-15",
        endDate: "2024-06-15",
        satellite: "TERRA-1",
        description:
          "Monitor Arctic ice sheet changes and melting patterns using advanced thermal imaging and radar technology.",
      },
      {
        id: "m2",
        name: "Deep Space Communication",
        category: "comms",
        status: "active",
        progress: 45,
        priority: "medium",
        startDate: "2024-02-01",
        endDate: "2024-12-01",
        satellite: "HUBBLE",
        description:
          "Establish communication relay for deep space missions and maintain contact with outer solar system probes.",
      },
      {
        id: "m3",
        name: "Exoplanet Survey",
        category: "science",
        status: "critical",
        progress: 30,
        priority: "high",
        startDate: "2024-01-01",
        endDate: "2024-08-01",
        satellite: "TESS",
        description: "Search for potentially habitable exoplanets in nearby star systems using transit photometry.",
      },
      {
        id: "m4",
        name: "Hurricane Tracking",
        category: "weather",
        status: "completed",
        progress: 100,
        priority: "high",
        startDate: "2023-06-01",
        endDate: "2023-11-30",
        satellite: "GOES-16",
        description: "Track and predict hurricane paths during storm season to provide early warning systems.",
      },
      {
        id: "m5",
        name: "GPS Constellation Maintenance",
        category: "nav",
        status: "pending",
        progress: 0,
        priority: "medium",
        startDate: "2024-03-01",
        endDate: "2024-09-01",
        satellite: "GPS-III",
        description:
          "Routine maintenance of GPS satellite constellation including orbit corrections and system updates.",
      },
      {
        id: "m6",
        name: "Ocean Temperature Mapping",
        category: "earth",
        status: "active",
        progress: 60,
        priority: "medium",
        startDate: "2024-01-20",
        endDate: "2024-07-20",
        satellite: "AQUA-2",
        description: "Map global ocean temperature variations to study climate change patterns and marine ecosystems.",
      },
    ]

    const filteredMissions =
      filter === "all" ? mockMissions : mockMissions.filter((mission) => mission.category === filter)

    setMissions(filteredMissions)
  }, [filter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Target className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "critical":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const handleViewDetails = (mission: Mission) => {
    setSelectedMission(mission)
    setShowDetailsModal(true)
    console.log(`📋 Viewing details for mission: ${mission.name}`)
  }

  const handleModifyMission = (mission: Mission) => {
    setSelectedMission(mission)
    setModifyData({ ...mission })
    setShowModifyModal(true)
    console.log(`✏️ Modifying mission: ${mission.name}`)
  }

  const handleSaveModifications = () => {
    if (!modifyData) return

    // Update the mission in the list
    setMissions((prev) => prev.map((m) => (m.id === modifyData.id ? modifyData : m)))

    console.log(`✅ Mission ${modifyData.name} updated successfully`)

    // Show feedback
    const feedback = document.createElement("div")
    feedback.className =
      "fixed top-4 right-4 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg z-50"
    feedback.textContent = `✅ Mission "${modifyData.name}" updated successfully`
    document.body.appendChild(feedback)
    setTimeout(() => feedback.remove(), 3000)

    setShowModifyModal(false)
    setModifyData(null)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {missions.map((mission) => (
          <div key={mission.id} className="glass-panel p-6 hover:border-blue-500/30 transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                {getStatusIcon(mission.status)}
                <h3 className="font-semibold text-white">{mission.name}</h3>
              </div>
              <Badge className={getStatusColor(mission.status)}>{mission.status}</Badge>
            </div>

            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{mission.description}</p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Progress</span>
                <span className="text-white font-mono">{mission.progress}%</span>
              </div>
              <Progress value={mission.progress} className="h-2" />

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-400">Satellite</span>
                  <div className="text-cyan-400 font-medium">{mission.satellite}</div>
                </div>
                <div>
                  <span className="text-gray-400">Priority</span>
                  <div className={`font-medium capitalize ${getPriorityColor(mission.priority)}`}>
                    {mission.priority}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(mission.startDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(mission.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs bg-transparent hover:bg-blue-500/20 border-blue-500/30 text-blue-400"
                onClick={() => handleViewDetails(mission)}
              >
                <Eye className="w-3 h-3 mr-1" />
                View Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs bg-transparent hover:bg-yellow-500/20 border-yellow-500/30 text-yellow-400"
                onClick={() => handleModifyMission(mission)}
              >
                <Edit className="w-3 h-3 mr-1" />
                Modify
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedMission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-orbitron font-bold text-white">Mission Details</h2>
              <Button
                variant="ghost"
                onClick={() => setShowDetailsModal(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  {getStatusIcon(selectedMission.status)}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedMission.name}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={getStatusColor(selectedMission.status)}>{selectedMission.status}</Badge>
                    <span className={`text-sm font-medium capitalize ${getPriorityColor(selectedMission.priority)}`}>
                      {selectedMission.priority} Priority
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Mission Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category</span>
                      <span className="text-white capitalize">{selectedMission.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Assigned Satellite</span>
                      <span className="text-cyan-400 font-mono">{selectedMission.satellite}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Start Date</span>
                      <span className="text-white">{new Date(selectedMission.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">End Date</span>
                      <span className="text-white">{new Date(selectedMission.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Progress</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Completion</span>
                      <span className="text-white font-mono">{selectedMission.progress}%</span>
                    </div>
                    <Progress value={selectedMission.progress} className="h-3" />
                    <div className="text-sm text-gray-400">
                      {selectedMission.progress === 100
                        ? "Mission completed successfully"
                        : selectedMission.progress > 75
                          ? "Nearing completion"
                          : selectedMission.progress > 50
                            ? "Good progress"
                            : selectedMission.progress > 25
                              ? "Early stages"
                              : "Just started"}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
                <p className="text-gray-300 leading-relaxed">{selectedMission.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modify Modal */}
      {showModifyModal && modifyData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-orbitron font-bold text-white">Modify Mission</h2>
              <Button
                variant="ghost"
                onClick={() => setShowModifyModal(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white mb-2 block">Mission Name</Label>
                  <Input
                    value={modifyData.name}
                    onChange={(e) => setModifyData({ ...modifyData, name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Status</Label>
                  <Select
                    value={modifyData.status}
                    onValueChange={(value: any) => setModifyData({ ...modifyData, status: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Priority</Label>
                  <Select
                    value={modifyData.priority}
                    onValueChange={(value: any) => setModifyData({ ...modifyData, priority: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Progress (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={modifyData.progress}
                    onChange={(e) => setModifyData({ ...modifyData, progress: Number.parseInt(e.target.value) || 0 })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Assigned Satellite</Label>
                  <Input
                    value={modifyData.satellite}
                    onChange={(e) => setModifyData({ ...modifyData, satellite: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">End Date</Label>
                  <Input
                    type="date"
                    value={modifyData.endDate}
                    onChange={(e) => setModifyData({ ...modifyData, endDate: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white mb-2 block">Description</Label>
                <textarea
                  value={modifyData.description}
                  onChange={(e) => setModifyData({ ...modifyData, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-gray-400 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-white/10">
              <Button variant="outline" onClick={() => setShowModifyModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSaveModifications} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
