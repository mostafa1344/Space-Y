"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Zap, Brain, Search, AlertTriangle, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  category?: "query" | "anomaly" | "suggestion" | "summary"
}

interface AIAssistantProps {
  onClose: () => void
}

export function AIAssistant({ onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm ARIA (Autonomous Reconnaissance & Intelligence Assistant), your Space-Y AI companion. I'm connected to all satellite systems and can provide real-time analysis, predictions, and recommendations. How can I assist you today?",
      timestamp: new Date(),
      category: "summary",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const quickActions = [
    { label: "System health overview", query: "system health", icon: Brain },
    { label: "Critical alerts", query: "critical alerts", icon: AlertTriangle },
    { label: "Fuel status report", query: "fuel status", icon: Search },
    { label: "Maintenance schedule", query: "maintenance schedule", icon: Zap },
    { label: "Mission progress", query: "mission progress", icon: Search },
    { label: "Performance analysis", query: "performance analysis", icon: Brain },
  ]

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const generateAIResponse = (
    userQuery: string,
  ): { content: string; category: "query" | "anomaly" | "suggestion" | "summary" } => {
    const query = userQuery.toLowerCase()

    if (query.includes("system") && query.includes("health")) {
      return {
        content: `🔍 **Real-Time System Health Analysis**

**Fleet Status:** 87.3% Operational Efficiency
- **Operational:** 8 satellites (67%)
- **Maintenance:** 3 satellites (25%) 
- **Critical:** 1 satellite (8%)

**Key Metrics:**
- Average fuel level: 68.2%
- System health: 91.4%
- Communication quality: 94.7%
- Data throughput: 2.4 GB/s

**Current Issues:**
⚠️ AQUA-2: Fuel at 18% - requires immediate attention
🔧 HUBBLE: Solar panel efficiency at 87% - maintenance recommended
📡 TESS: Minor communication latency detected

**AI Recommendation:** Schedule AQUA-2 refueling within 24 hours. All other systems operating within normal parameters.`,
        category: "summary",
      }
    }

    if (query.includes("critical") || query.includes("alert")) {
      return {
        content: `🚨 **Critical Alerts Dashboard**

**IMMEDIATE ACTION REQUIRED:**
1. **AQUA-2 - FUEL CRITICAL**
   - Current level: 18%
   - Estimated depletion: 45 hours
   - Action: Schedule emergency refueling

**HIGH PRIORITY:**
2. **TESS - Communication Anomaly**
   - Latency increased by 340ms
   - Possible solar interference
   - Action: Monitor and adjust frequency

**MEDIUM PRIORITY:**
3. **HUBBLE - Performance Degradation**
   - Solar panel efficiency: 87%
   - Trending downward
   - Action: Schedule maintenance window

**Auto-Actions Taken:**
✅ Backup systems activated for AQUA-2
✅ Ground stations alerted
✅ Alternative communication protocols engaged for TESS

**Next Review:** 15 minutes`,
        category: "anomaly",
      }
    }

    if (query.includes("fuel")) {
      return {
        content: `⛽ **Fleet Fuel Status Report**

**Critical (< 30%):**
- AQUA-2: 18% ⚠️ URGENT
- JASON-3: 28% 

**Low (30-50%):**
- TERRA-1: 35%
- GOES-16: 42%

**Normal (> 50%):**
- HUBBLE: 67%
- ISS: 78%
- LANDSAT-8: 82%
- SENTINEL-2: 91%

**Fuel Consumption Analysis:**
- Average consumption: 2.3%/day
- Most efficient: SENTINEL-2 (1.8%/day)
- Highest consumption: AQUA-2 (4.1%/day)

**AI Predictions:**
- AQUA-2: Depletion in 45 hours
- JASON-3: Depletion in 12 days
- Next refueling window: Tomorrow 14:00 UTC

**Optimization Suggestion:** Adjust AQUA-2 orbit to reduce fuel consumption by 15%`,
        category: "suggestion",
      }
    }

    if (query.includes("maintenance")) {
      return {
        content: `🔧 **Maintenance Schedule & Predictions**

**Scheduled Maintenance:**
- **HUBBLE** - Solar panel service (7 days)
- **TERRA-1** - Attitude control calibration (14 days)
- **ISS** - Routine systems check (21 days)

**AI Predictive Maintenance:**
- **GOES-16** - Thermal regulation system (89% confidence, 18 days)
- **LANDSAT-8** - Battery replacement needed (76% confidence, 45 days)
- **SENTINEL-2** - Communication array service (65% confidence, 67 days)

**Maintenance Windows Available:**
- Tomorrow: 06:00-08:00 UTC
- Next week: Tuesday 14:00-16:00 UTC
- Month-end: Extended 12-hour window

**Resource Requirements:**
- Fuel for repositioning: 2.3 units
- Ground crew availability: 85%
- Spare parts inventory: Adequate

**Cost Optimization:** Combining HUBBLE and TERRA-1 maintenance could save $340K`,
        category: "suggestion",
      }
    }

    if (query.includes("mission") && query.includes("progress")) {
      return {
        content: `🎯 **Mission Progress Overview**

**Active Missions (12):**

**High Priority:**
- Arctic Ice Monitoring: 75% complete ✅
- Exoplanet Survey: 30% complete ⚠️ Behind schedule
- Hurricane Tracking: 95% complete ✅

**Medium Priority:**
- Ocean Temperature Mapping: 60% complete
- Deep Space Communication: 45% complete
- GPS Constellation Maintenance: 15% complete

**Mission Performance:**
- Success rate: 96.8%
- Average completion time: 127 days
- On-time delivery: 89%

**Upcoming Milestones:**
- Arctic Ice final data collection: 3 days
- Exoplanet Survey phase 2: 12 days
- Hurricane season wrap-up: 18 days

**AI Insights:**
- Exoplanet Survey delayed due to TESS communication issues
- Recommend prioritizing TESS repairs to get back on schedule
- Weather conditions favorable for next 2 weeks`,
        category: "summary",
      }
    }

    if (query.includes("performance")) {
      return {
        content: `📊 **Performance Analysis Report**

**Fleet Performance Metrics:**
- Overall efficiency: 87.3% (+2.1% from last week)
- Mission success rate: 96.8%
- System uptime: 99.2%
- Data quality score: 94.7%

**Top Performers:**
1. SENTINEL-2: 98.5% efficiency
2. LANDSAT-8: 96.2% efficiency  
3. ISS: 94.8% efficiency

**Needs Improvement:**
1. AQUA-2: 67.3% efficiency (fuel issues)
2. TESS: 78.9% efficiency (communication)
3. JASON-3: 82.1% efficiency (aging systems)

**Performance Trends:**
📈 Improving: HUBBLE (+5.2%), TERRA-1 (+3.1%)
📉 Declining: AQUA-2 (-8.7%), TESS (-4.3%)

**AI Recommendations:**
- Implement automated efficiency protocols
- Upgrade TESS communication systems
- Consider early retirement planning for JASON-3

**ROI Analysis:** Current optimizations saving $2.3M annually`,
        category: "summary",
      }
    }

    return {
      content: `I understand you're asking about "${userQuery}". Here's what I can help you with:

🛰️ **Real-Time Monitoring:**
- Live satellite health and status
- Fuel consumption tracking
- Communication quality analysis
- Orbital position monitoring

🔍 **Predictive Analytics:**
- Maintenance scheduling
- Failure prediction
- Performance optimization
- Cost analysis

🚨 **Alert Management:**
- Critical system alerts
- Anomaly detection
- Emergency protocols
- Risk assessment

💡 **Mission Support:**
- Progress tracking
- Resource optimization
- Timeline management
- Success probability analysis

Try asking me: "What's the current status of AQUA-2?" or "Show me upcoming maintenance schedules"`,
      category: "query",
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse = generateAIResponse(input)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse.content,
        timestamp: new Date(),
        category: aiResponse.category,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (query: string) => {
    setInput(query)
    setTimeout(() => handleSend(), 100)
  }

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true)
      setTimeout(() => {
        setInput("Show me system health status")
        setIsListening(false)
      }, 2000)
    } else {
      setIsListening(false)
    }
  }

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "anomaly":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      case "suggestion":
        return <Zap className="w-4 h-4 text-yellow-400" />
      case "summary":
        return <Brain className="w-4 h-4 text-blue-400" />
      default:
        return <Search className="w-4 h-4 text-gray-400" />
    }
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "anomaly":
        return "border-red-500/30 bg-red-500/10"
      case "suggestion":
        return "border-yellow-500/30 bg-yellow-500/10"
      case "summary":
        return "border-blue-500/30 bg-blue-500/10"
      default:
        return "border-gray-500/30 bg-gray-500/10"
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-4xl h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-orbitron font-bold text-white">ARIA AI Assistant</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-gray-400">Connected to all satellite systems</p>
              </div>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 border-b border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.query)}
                className="text-xs bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 justify-start"
              >
                <action.icon className="w-3 h-3 mr-2 flex-shrink-0" />
                <span className="truncate">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] p-4 rounded-lg ${
                    message.type === "user"
                      ? "bg-blue-500/20 text-blue-100 border border-blue-500/30"
                      : `glass-panel ${getCategoryColor(message.category)}`
                  }`}
                >
                  {message.type === "ai" && message.category && (
                    <div className="flex items-center gap-2 mb-2">
                      {getCategoryIcon(message.category)}
                      <Badge variant="outline" className="text-xs border-white/20">
                        {message.category.toUpperCase()}
                      </Badge>
                    </div>
                  )}
                  <ScrollArea className="max-h-64 overflow-hidden">
                    <div className="text-sm whitespace-pre-wrap text-white break-words overflow-wrap-anywhere word-break-break-word max-w-full pr-2">
                      {message.content}
                    </div>
                  </ScrollArea>
                  <div className="text-xs text-gray-400 mt-2">{message.timestamp.toLocaleTimeString()}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="glass-panel p-4 rounded-lg border-purple-500/30 bg-purple-500/10">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-purple-400">ARIA is analyzing real-time data...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleVoiceInput}
              className={`flex-shrink-0 ${
                isListening
                  ? "bg-red-500/20 border-red-500/30 text-red-400"
                  : "bg-white/5 border-white/20 text-gray-400"
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask ARIA about satellite status, missions, or system health..."
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-w-0 flex-1 overflow-hidden"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          {isListening && (
            <div className="text-xs text-red-400 mt-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              Listening... Speak now
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
