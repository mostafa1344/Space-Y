"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { MissionTimeline } from "@/components/mission-timeline"
import { MissionCards } from "@/components/mission-cards"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Filter, X } from "lucide-react"

export default function MissionsPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showNewMissionModal, setShowNewMissionModal] = useState(false)
  const [filterOptions, setFilterOptions] = useState({
    status: "all",
    priority: "all",
    satellite: "all",
    dateRange: "all",
  })
  const [newMission, setNewMission] = useState({
    name: "",
    category: "earth",
    priority: "medium",
    satellite: "",
    description: "",
    startDate: "",
    endDate: "",
  })

  const handleFilterApply = () => {
    console.log("🔍 Applying filters:", filterOptions)

    // Show feedback
    const feedback = document.createElement("div")
    feedback.className =
      "fixed top-4 right-4 bg-blue-500/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-lg z-50"
    feedback.textContent = "🔍 Filters applied successfully"
    document.body.appendChild(feedback)
    setTimeout(() => feedback.remove(), 2000)

    setShowFilterModal(false)
  }

  const handleFilterReset = () => {
    setFilterOptions({
      status: "all",
      priority: "all",
      satellite: "all",
      dateRange: "all",
    })
    console.log("🔄 Filters reset")
  }

  const handleNewMissionSubmit = () => {
    if (!newMission.name || !newMission.satellite || !newMission.startDate || !newMission.endDate) {
      const feedback = document.createElement("div")
      feedback.className =
        "fixed top-4 right-4 bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg z-50"
      feedback.textContent = "❌ Please fill in all required fields"
      document.body.appendChild(feedback)
      setTimeout(() => feedback.remove(), 3000)
      return
    }

    console.log("➕ Creating new mission:", newMission)

    // Show success feedback
    const feedback = document.createElement("div")
    feedback.className =
      "fixed top-4 right-4 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg z-50"
    feedback.textContent = `✅ Mission "${newMission.name}" created successfully`
    document.body.appendChild(feedback)
    setTimeout(() => feedback.remove(), 3000)

    // Reset form
    setNewMission({
      name: "",
      category: "earth",
      priority: "medium",
      satellite: "",
      description: "",
      startDate: "",
      endDate: "",
    })
    setShowNewMissionModal(false)
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-white">Mission Control</h1>
            <p className="text-gray-400 mt-1">Active missions and timeline overview</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="text-white border-white/20 bg-transparent hover:bg-white/10"
              onClick={() => setShowFilterModal(true)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => setShowNewMissionModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Mission
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="glass-panel p-4 space-y-4">
              <h3 className="font-semibold text-white">Mission Categories</h3>
              <div className="space-y-2">
                {[
                  { name: "All Missions", count: 24, key: "all" },
                  { name: "Earth Observation", count: 8, key: "earth" },
                  { name: "Communications", count: 6, key: "comms" },
                  { name: "Scientific Research", count: 5, key: "science" },
                  { name: "Weather Monitoring", count: 3, key: "weather" },
                  { name: "Navigation", count: 2, key: "nav" },
                ].map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setActiveFilter(category.key)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                      activeFilter === category.key
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    <span>{category.name}</span>
                    <Badge variant="outline" className="border-white/20 text-gray-400">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="cards" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5">
                <TabsTrigger value="cards">Mission Cards</TabsTrigger>
                <TabsTrigger value="timeline">Timeline View</TabsTrigger>
              </TabsList>

              <TabsContent value="cards" className="mt-6">
                <MissionCards filter={activeFilter} />
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <MissionTimeline filter={activeFilter} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-orbitron font-bold text-white">Filter Missions</h2>
              <Button
                variant="ghost"
                onClick={() => setShowFilterModal(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <Label className="text-white mb-2 block">Status</Label>
                <Select
                  value={filterOptions.status}
                  onValueChange={(value) => setFilterOptions({ ...filterOptions, status: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
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
                  value={filterOptions.priority}
                  onValueChange={(value) => setFilterOptions({ ...filterOptions, priority: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white mb-2 block">Satellite</Label>
                <Select
                  value={filterOptions.satellite}
                  onValueChange={(value) => setFilterOptions({ ...filterOptions, satellite: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Satellites</SelectItem>
                    <SelectItem value="TERRA-1">TERRA-1</SelectItem>
                    <SelectItem value="HUBBLE">HUBBLE</SelectItem>
                    <SelectItem value="TESS">TESS</SelectItem>
                    <SelectItem value="GOES-16">GOES-16</SelectItem>
                    <SelectItem value="GPS-III">GPS-III</SelectItem>
                    <SelectItem value="AQUA-2">AQUA-2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-white/10">
              <Button variant="outline" onClick={handleFilterReset} className="flex-1 bg-transparent">
                Reset
              </Button>
              <Button onClick={handleFilterApply} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* New Mission Modal */}
      {showNewMissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-orbitron font-bold text-white">Create New Mission</h2>
              <Button
                variant="ghost"
                onClick={() => setShowNewMissionModal(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white mb-2 block">Mission Name *</Label>
                  <Input
                    value={newMission.name}
                    onChange={(e) => setNewMission({ ...newMission, name: e.target.value })}
                    placeholder="Enter mission name"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Category</Label>
                  <Select
                    value={newMission.category}
                    onValueChange={(value) => setNewMission({ ...newMission, category: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="earth">Earth Observation</SelectItem>
                      <SelectItem value="comms">Communications</SelectItem>
                      <SelectItem value="science">Scientific Research</SelectItem>
                      <SelectItem value="weather">Weather Monitoring</SelectItem>
                      <SelectItem value="nav">Navigation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Priority</Label>
                  <Select
                    value={newMission.priority}
                    onValueChange={(value) => setNewMission({ ...newMission, priority: value })}
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
                  <Label className="text-white mb-2 block">Assigned Satellite *</Label>
                  <Input
                    value={newMission.satellite}
                    onChange={(e) => setNewMission({ ...newMission, satellite: e.target.value })}
                    placeholder="e.g., TERRA-1"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">Start Date *</Label>
                  <Input
                    type="date"
                    value={newMission.startDate}
                    onChange={(e) => setNewMission({ ...newMission, startDate: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">End Date *</Label>
                  <Input
                    type="date"
                    value={newMission.endDate}
                    onChange={(e) => setNewMission({ ...newMission, endDate: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white mb-2 block">Description</Label>
                <textarea
                  value={newMission.description}
                  onChange={(e) => setNewMission({ ...newMission, description: e.target.value })}
                  placeholder="Enter mission description..."
                  rows={3}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-gray-400 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-white/10">
              <Button variant="outline" onClick={() => setShowNewMissionModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleNewMissionSubmit} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                Create Mission
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
