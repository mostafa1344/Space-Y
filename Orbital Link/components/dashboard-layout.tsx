"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Satellite, BarChart3, Target, TrendingUp, Menu, X, Settings, Bell, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AIAssistant } from "@/components/ai-assistant"

const navigation = [
  { name: "Dashboard", href: "/", icon: Satellite },
  { name: "Telemetry", href: "/telemetry", icon: BarChart3 },
  { name: "Missions", href: "/missions", icon: Target },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="glass-panel h-full border-r border-white/10">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Satellite className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-orbitron text-xl font-bold text-white">Space-Y</span>
                <div className="text-xs text-cyan-400">Mission Control</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <nav className="mt-8 px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                  {isActive && <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse" />}
                </Link>
              )
            })}
          </nav>

          {/* AI Assistant Button */}
          <div className="absolute bottom-20 left-4 right-4">
            <Button
              onClick={() => setShowAI(true)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
            >
              <Zap className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="glass-panel p-3 border border-green-500/30">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-medium">All Systems Nominal</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">Space-Y Operations Center</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="glass-panel border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white hover:bg-white/10"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-orbitron text-xl font-bold text-white">Space-Y Mission Control</h1>
                <p className="text-sm text-gray-400">
                  {new Date().toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZoneName: "short",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse" />3 Alerts
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => (window.location.href = "/notifications")}
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => (window.location.href = "/settings")}
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main>{children}</main>
      </div>

      {/* AI Assistant Modal */}
      {showAI && <AIAssistant onClose={() => setShowAI(false)} />}
    </div>
  )
}
