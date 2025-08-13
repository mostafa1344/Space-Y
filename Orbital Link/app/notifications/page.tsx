"use client"

import { useState, useEffect, useCallback } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  Trash2,
  BookMarkedIcon as MarkAsUnread,
  Filter,
  RefreshCw,
} from "lucide-react"

interface Notification {
  id: string
  type: "critical" | "warning" | "info" | "success"
  title: string
  message: string
  timestamp: Date
  read: boolean
  satellite?: string
  category: "system" | "mission" | "maintenance" | "communication"
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<"all" | "unread" | "critical">("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [refreshing, setRefreshing] = useState(false)

  const [isProcessing, setIsProcessing] = useState(false)

  const debouncedMarkAsRead = useCallback(
    (id: string) => {
      if (isProcessing) return
      setIsProcessing(true)
      setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
      setTimeout(() => setIsProcessing(false), 100)
    },
    [isProcessing],
  )

  const debouncedMarkAsUnread = useCallback(
    (id: string) => {
      if (isProcessing) return
      setIsProcessing(true)
      setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: false } : notif)))
      setTimeout(() => setIsProcessing(false), 100)
    },
    [isProcessing],
  )

  const debouncedDelete = useCallback(
    (id: string) => {
      if (isProcessing) return
      setIsProcessing(true)
      setNotifications((prev) => prev.filter((notif) => notif.id !== id))
      setTimeout(() => setIsProcessing(false), 100)
    },
    [isProcessing],
  )

  useEffect(() => {
    const generateNotifications = (): Notification[] => {
      const types: Array<"critical" | "warning" | "info" | "success"> = ["critical", "warning", "info", "success"]
      const categories: Array<"system" | "mission" | "maintenance" | "communication"> = [
        "system",
        "mission",
        "maintenance",
        "communication",
      ]
      const satellites = ["TERRA-1", "AQUA-2", "LANDSAT-8", "HUBBLE", "ISS", "TESS", "GOES-16"]

      const templates = {
        critical: [
          { title: "Fuel Critical", message: "Satellite fuel level below 20%" },
          { title: "Communication Lost", message: "Lost contact with satellite" },
          { title: "System Failure", message: "Critical system component failure detected" },
        ],
        warning: [
          { title: "Low Battery", message: "Battery charge below optimal threshold" },
          { title: "Temperature Alert", message: "Operating temperature outside normal range" },
          { title: "Signal Degradation", message: "Communication signal strength declining" },
        ],
        info: [
          { title: "Orbit Adjustment", message: "Scheduled orbit correction completed" },
          { title: "Data Download", message: "Telemetry data successfully received" },
          { title: "System Update", message: "Software update installed successfully" },
        ],
        success: [
          { title: "Mission Complete", message: "Mission objective successfully achieved" },
          { title: "Maintenance Done", message: "Scheduled maintenance completed" },
          { title: "Connection Restored", message: "Communication link re-established" },
        ],
      }

      return Array.from({ length: 25 }, (_, i) => {
        const type = types[Math.floor(Math.random() * types.length)]
        const category = categories[Math.floor(Math.random() * categories.length)]
        const template = templates[type][Math.floor(Math.random() * templates[type].length)]
        const satellite = satellites[Math.floor(Math.random() * satellites.length)]

        return {
          id: `notif-${i}`,
          type,
          title: template.title,
          message: template.message,
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          read: Math.random() > 0.4,
          satellite: Math.random() > 0.3 ? satellite : undefined,
          category,
        }
      }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    }

    setNotifications(generateNotifications())
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      const generateNotifications = (): Notification[] => {
        const types: Array<"critical" | "warning" | "info" | "success"> = ["critical", "warning", "info", "success"]
        const categories: Array<"system" | "mission" | "maintenance" | "communication"> = [
          "system",
          "mission",
          "maintenance",
          "communication",
        ]
        const satellites = ["TERRA-1", "AQUA-2", "LANDSAT-8", "HUBBLE", "ISS", "TESS", "GOES-16"]

        const templates = {
          critical: [
            { title: "Fuel Critical", message: "Satellite fuel level below 20%" },
            { title: "Communication Lost", message: "Lost contact with satellite" },
            { title: "System Failure", message: "Critical system component failure detected" },
          ],
          warning: [
            { title: "Low Battery", message: "Battery charge below optimal threshold" },
            { title: "Temperature Alert", message: "Operating temperature outside normal range" },
            { title: "Signal Degradation", message: "Communication signal strength declining" },
          ],
          info: [
            { title: "Orbit Adjustment", message: "Scheduled orbit correction completed" },
            { title: "Data Download", message: "Telemetry data successfully received" },
            { title: "System Update", message: "Software update installed successfully" },
          ],
          success: [
            { title: "Mission Complete", message: "Mission objective successfully achieved" },
            { title: "Maintenance Done", message: "Scheduled maintenance completed" },
            { title: "Connection Restored", message: "Communication link re-established" },
          ],
        }

        return Array.from({ length: 25 }, (_, i) => {
          const type = types[Math.floor(Math.random() * types.length)]
          const category = categories[Math.floor(Math.random() * categories.length)]
          const template = templates[type][Math.floor(Math.random() * templates[type].length)]
          const satellite = satellites[Math.floor(Math.random() * satellites.length)]

          return {
            id: `notif-${i}`,
            type,
            title: template.title,
            message: template.message,
            timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
            read: Math.random() > 0.4,
            satellite: Math.random() > 0.3 ? satellite : undefined,
            category,
          }
        }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      }

      setNotifications(generateNotifications())
      setRefreshing(false)
    }, 1000)
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread" && notification.read) return false
    if (filter === "critical" && notification.type !== "critical") return false
    if (categoryFilter !== "all" && notification.category !== categoryFilter) return false
    return true
  })

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAsUnread = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: false } : notif)))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const optimizedMarkAllAsRead = useCallback(() => {
    if (isProcessing) return
    setIsProcessing(true)
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
    setTimeout(() => setIsProcessing(false), 200)
  }, [isProcessing])

  const optimizedClearAll = useCallback(() => {
    if (isProcessing) return
    setIsProcessing(true)
    setNotifications([])
    setTimeout(() => setIsProcessing(false), 200)
  }, [isProcessing])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-400" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      default:
        return <Info className="w-5 h-5 text-blue-400" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-red-500/30 bg-red-500/10"
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/10"
      case "success":
        return "border-green-500/30 bg-green-500/10"
      default:
        return "border-blue-500/30 bg-blue-500/10"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const criticalCount = notifications.filter((n) => n.type === "critical").length

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-orbitron font-bold text-white truncate">Notifications</h1>
            <p className="text-gray-400 mt-1 truncate">
              {unreadCount} unread, {criticalCount} critical alerts
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="text-white border-white/20 bg-transparent hover:bg-white/10"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={optimizedMarkAllAsRead}
              className="text-blue-400 border-blue-500/30 bg-transparent hover:bg-blue-500/20"
              disabled={isProcessing}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={optimizedClearAll}
              className="text-red-400 border-red-500/30 bg-transparent hover:bg-red-500/20"
              disabled={isProcessing}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
              <SelectTrigger className="w-32 bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/10">
                <SelectItem value="all" className="text-white">
                  All
                </SelectItem>
                <SelectItem value="unread" className="text-white">
                  Unread
                </SelectItem>
                <SelectItem value="critical" className="text-white">
                  Critical
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40 bg-white/5 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-white/10">
              <SelectItem value="all" className="text-white">
                All Categories
              </SelectItem>
              <SelectItem value="system" className="text-white">
                System
              </SelectItem>
              <SelectItem value="mission" className="text-white">
                Mission
              </SelectItem>
              <SelectItem value="maintenance" className="text-white">
                Maintenance
              </SelectItem>
              <SelectItem value="communication" className="text-white">
                Communication
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="grouped">Grouped View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            <div className="glass-panel p-6">
              <ScrollArea className="h-[600px]">
                <div className="space-y-4 pr-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`glass-panel p-4 ${getNotificationColor(notification.type)} ${
                        !notification.read ? "border-l-4 border-l-blue-400" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3
                                className={`font-semibold truncate ${!notification.read ? "text-white" : "text-gray-300"}`}
                              >
                                {notification.title}
                              </h3>
                              {notification.satellite && (
                                <Badge variant="outline" className="border-white/20 text-xs flex-shrink-0">
                                  {notification.satellite}
                                </Badge>
                              )}
                              <Badge variant="outline" className="border-white/20 text-xs flex-shrink-0">
                                {notification.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400 break-words">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.timestamp.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              notification.read
                                ? debouncedMarkAsUnread(notification.id)
                                : debouncedMarkAsRead(notification.id)
                            }
                            disabled={isProcessing}
                            className="text-gray-400 hover:text-white disabled:opacity-50"
                          >
                            {notification.read ? (
                              <MarkAsUnread className="w-4 h-4" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => debouncedDelete(notification.id)}
                            disabled={isProcessing}
                            className="text-red-400 hover:text-red-300 disabled:opacity-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredNotifications.length === 0 && (
                    <div className="text-center py-12">
                      <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">No notifications found</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="grouped" className="mt-6">
            <div className="space-y-6">
              {["critical", "warning", "info", "success"].map((type) => {
                const typeNotifications = filteredNotifications.filter((n) => n.type === type)
                if (typeNotifications.length === 0) return null

                return (
                  <div key={type} className="glass-panel p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {getNotificationIcon(type)}
                      <h3 className="text-lg font-semibold text-white capitalize">{type}</h3>
                      <Badge variant="outline" className="border-white/20">
                        {typeNotifications.length}
                      </Badge>
                    </div>

                    <ScrollArea className="h-[300px]">
                      <div className="space-y-3 pr-4">
                        {typeNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg border ${getNotificationColor(notification.type)} ${
                              !notification.read ? "border-l-4 border-l-blue-400" : ""
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4
                                    className={`font-medium truncate ${!notification.read ? "text-white" : "text-gray-300"}`}
                                  >
                                    {notification.title}
                                  </h4>
                                  {notification.satellite && (
                                    <Badge variant="outline" className="border-white/20 text-xs flex-shrink-0">
                                      {notification.satellite}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-400 break-words">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.timestamp.toLocaleString()}</p>
                              </div>

                              <div className="flex items-center gap-1 flex-shrink-0 ml-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    notification.read
                                      ? debouncedMarkAsUnread(notification.id)
                                      : debouncedMarkAsRead(notification.id)
                                  }
                                  disabled={isProcessing}
                                  className="text-gray-400 hover:text-white"
                                >
                                  {notification.read ? (
                                    <MarkAsUnread className="w-3 h-3" />
                                  ) : (
                                    <CheckCircle className="w-3 h-3" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => debouncedDelete(notification.id)}
                                  disabled={isProcessing}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
