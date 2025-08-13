"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Bell, Shield, Palette, Database, Wifi, Save, RefreshCw } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    organizationName: "Space-Y Mission Control",
    timezone: "UTC",
    language: "English",
    emailNotifications: true,
    pushNotifications: true,
    criticalAlerts: true,
    maintenanceAlerts: true,
    missionUpdates: false,
    theme: "dark",
    animationSpeed: [1],
    refreshRate: [5],
    showTrails: true,
    showLabels: true,
    twoFactorAuth: false,
    sessionTimeout: [30],
    apiAccess: true,
    dataRetention: [90],
    autoBackup: true,
    exportFormat: "json",
    maxSatellites: [50],
    renderQuality: "high",
    enableGPU: true,
  })

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    console.log("💾 Saving settings:", settings)

    // Show success feedback
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      console.log("✅ Settings saved successfully")

      // Show success toast (visual feedback)
      const successMessage = document.createElement("div")
      successMessage.className =
        "fixed top-4 right-4 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg z-50 animate-in slide-in-from-right"
      successMessage.textContent = "✅ Settings saved successfully!"
      document.body.appendChild(successMessage)

      setTimeout(() => {
        successMessage.remove()
      }, 3000)
    } catch (error) {
      console.error("❌ Failed to save settings:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    const confirmed = window.confirm("Are you sure you want to reset all settings to default values?")
    if (!confirmed) return

    console.log("🔄 Resetting to default settings")
    setSettings({
      organizationName: "Space-Y Mission Control",
      timezone: "UTC",
      language: "English",
      emailNotifications: true,
      pushNotifications: true,
      criticalAlerts: true,
      maintenanceAlerts: true,
      missionUpdates: false,
      theme: "dark",
      animationSpeed: [1],
      refreshRate: [5],
      showTrails: true,
      showLabels: true,
      twoFactorAuth: false,
      sessionTimeout: [30],
      apiAccess: true,
      dataRetention: [90],
      autoBackup: true,
      exportFormat: "json",
      maxSatellites: [50],
      renderQuality: "high",
      enableGPU: true,
    })

    // Show reset feedback
    const resetMessage = document.createElement("div")
    resetMessage.className =
      "fixed top-4 right-4 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg z-50 animate-in slide-in-from-right"
    resetMessage.textContent = "🔄 Settings reset to defaults"
    document.body.appendChild(resetMessage)

    setTimeout(() => {
      resetMessage.remove()
    }, 3000)
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-orbitron font-bold text-white truncate">Settings</h1>
            <p className="text-gray-400 mt-1 truncate">Configure your Space-Y mission control system</p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              variant="outline"
              onClick={handleReset}
              className="text-yellow-400 border-yellow-500/30 bg-transparent hover:bg-yellow-500/20"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-white/5">
            <TabsTrigger value="general" className="text-xs">
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="display" className="text-xs">
              Display
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs">
              Security
            </TabsTrigger>
            <TabsTrigger value="data" className="text-xs">
              Data
            </TabsTrigger>
            <TabsTrigger value="performance" className="text-xs">
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 mt-6">
            <div className="glass-panel p-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">General Settings</h3>
              </div>

              <ScrollArea className="h-[400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-4">
                  <div className="space-y-2">
                    <Label htmlFor="orgName" className="text-white">
                      Organization Name
                    </Label>
                    <Input
                      id="orgName"
                      value={settings.organizationName}
                      onChange={(e) => setSettings((prev) => ({ ...prev, organizationName: e.target.value }))}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-white">
                      Timezone
                    </Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, timezone: value }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/10">
                        <SelectItem value="UTC" className="text-white">
                          UTC
                        </SelectItem>
                        <SelectItem value="EST" className="text-white">
                          Eastern Time
                        </SelectItem>
                        <SelectItem value="PST" className="text-white">
                          Pacific Time
                        </SelectItem>
                        <SelectItem value="GMT" className="text-white">
                          Greenwich Mean Time
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-white">
                      Language
                    </Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/10">
                        <SelectItem value="English" className="text-white">
                          English
                        </SelectItem>
                        <SelectItem value="Spanish" className="text-white">
                          Español
                        </SelectItem>
                        <SelectItem value="French" className="text-white">
                          Français
                        </SelectItem>
                        <SelectItem value="German" className="text-white">
                          Deutsch
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <div className="glass-panel p-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
              </div>

              <ScrollArea className="h-[400px]">
                <div className="space-y-6 pr-4">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-medium truncate">Email Notifications</div>
                      <div className="text-sm text-gray-400 truncate">Receive notifications via email</div>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emailNotifications: checked }))}
                      className="flex-shrink-0"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-medium truncate">Push Notifications</div>
                      <div className="text-sm text-gray-400 truncate">Browser push notifications</div>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, pushNotifications: checked }))}
                      className="flex-shrink-0"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-medium truncate">Critical Alerts</div>
                      <div className="text-sm text-gray-400 truncate">Immediate alerts for critical issues</div>
                    </div>
                    <Switch
                      checked={settings.criticalAlerts}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, criticalAlerts: checked }))}
                      className="flex-shrink-0"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-medium truncate">Maintenance Alerts</div>
                      <div className="text-sm text-gray-400 truncate">Scheduled maintenance notifications</div>
                    </div>
                    <Switch
                      checked={settings.maintenanceAlerts}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, maintenanceAlerts: checked }))}
                      className="flex-shrink-0"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-medium truncate">Mission Updates</div>
                      <div className="text-sm text-gray-400 truncate">Regular mission progress updates</div>
                    </div>
                    <Switch
                      checked={settings.missionUpdates}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, missionUpdates: checked }))}
                      className="flex-shrink-0"
                    />
                  </div>
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="display" className="space-y-6 mt-6">
            <div className="glass-panel p-6">
              <div className="flex items-center gap-2 mb-6">
                <Palette className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Display Settings</h3>
              </div>

              <ScrollArea className="h-[400px]">
                <div className="space-y-6 pr-4">
                  <div className="space-y-2">
                    <Label className="text-white">Animation Speed: {settings.animationSpeed[0]}x</Label>
                    <Slider
                      value={settings.animationSpeed}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, animationSpeed: value }))}
                      min={0.5}
                      max={3}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Refresh Rate: {settings.refreshRate[0]}s</Label>
                    <Slider
                      value={settings.refreshRate}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, refreshRate: value }))}
                      min={1}
                      max={30}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-medium truncate">Show Satellite Trails</div>
                      <div className="text-sm text-gray-400 truncate">Display orbital trails</div>
                    </div>
                    <Switch
                      checked={settings.showTrails}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, showTrails: checked }))}
                      className="flex-shrink-0"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-medium truncate">Show Labels</div>
                      <div className="text-sm text-gray-400 truncate">Display satellite names</div>
                    </div>
                    <Switch
                      checked={settings.showLabels}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, showLabels: checked }))}
                      className="flex-shrink-0"
                    />
                  </div>
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6 mt-6">
            <div className="glass-panel p-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Security Settings</h3>
              </div>

              <ScrollArea className="h-[400px]">
                <div className="space-y-6 pr-4">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-medium truncate">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-400 truncate">Enhanced account security</div>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, twoFactorAuth: checked }))}
                      className="flex-shrink-0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Session Timeout: {settings.sessionTimeout[0]} minutes</Label>
                    <Slider
                      value={settings.sessionTimeout}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, sessionTimeout: value }))}
                      min={5}
                      max={120}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-medium truncate">API Access</div>
                      <div className="text-sm text-gray-400 truncate">Allow external API connections</div>
                    </div>
                    <Switch
                      checked={settings.apiAccess}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, apiAccess: checked }))}
                      className="flex-shrink-0"
                    />
                  </div>
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-6 mt-6">
            <div className="glass-panel p-6">
              <div className="flex items-center gap-2 mb-6">
                <Database className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-white">Data Management</h3>
              </div>

              <ScrollArea className="h-[400px]">
                <div className="space-y-6 pr-4">
                  <div className="space-y-2">
                    <Label className="text-white">Data Retention: {settings.dataRetention[0]} days</Label>
                    <Slider
                      value={settings.dataRetention}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, dataRetention: value }))}
                      min={30}
                      max={365}
                      step={30}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-medium truncate">Auto Backup</div>
                      <div className="text-sm text-gray-400 truncate">Automatic daily backups</div>
                    </div>
                    <Switch
                      checked={settings.autoBackup}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoBackup: checked }))}
                      className="flex-shrink-0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Export Format</Label>
                    <Select
                      value={settings.exportFormat}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, exportFormat: value }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/10">
                        <SelectItem value="json" className="text-white">
                          JSON
                        </SelectItem>
                        <SelectItem value="csv" className="text-white">
                          CSV
                        </SelectItem>
                        <SelectItem value="xml" className="text-white">
                          XML
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6 mt-6">
            <div className="glass-panel p-6">
              <div className="flex items-center gap-2 mb-6">
                <Wifi className="w-5 h-5 text-red-400" />
                <h3 className="text-lg font-semibold text-white">Performance Settings</h3>
              </div>

              <ScrollArea className="h-[400px]">
                <div className="space-y-6 pr-4">
                  <div className="space-y-2">
                    <Label className="text-white">Max Satellites: {settings.maxSatellites[0]}</Label>
                    <Slider
                      value={settings.maxSatellites}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, maxSatellites: value }))}
                      min={10}
                      max={100}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Render Quality</Label>
                    <Select
                      value={settings.renderQuality}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, renderQuality: value }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/10">
                        <SelectItem value="low" className="text-white">
                          Low
                        </SelectItem>
                        <SelectItem value="medium" className="text-white">
                          Medium
                        </SelectItem>
                        <SelectItem value="high" className="text-white">
                          High
                        </SelectItem>
                        <SelectItem value="ultra" className="text-white">
                          Ultra
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-medium truncate">GPU Acceleration</div>
                      <div className="text-sm text-gray-400 truncate">Use hardware acceleration</div>
                    </div>
                    <Switch
                      checked={settings.enableGPU}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, enableGPU: checked }))}
                      className="flex-shrink-0"
                    />
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-medium text-gray-400 mb-3">System Status</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm truncate">Memory Usage</span>
                        <Badge className="bg-green-500/20 text-green-400 flex-shrink-0">67%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm truncate">CPU Usage</span>
                        <Badge className="bg-blue-500/20 text-blue-400 flex-shrink-0">23%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm truncate">Network</span>
                        <Badge className="bg-green-500/20 text-green-400 flex-shrink-0">Online</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm truncate">Storage</span>
                        <Badge className="bg-yellow-500/20 text-yellow-400 flex-shrink-0">78%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
