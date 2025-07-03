"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const panelStyles = `
.shuttle-health-panel {
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%);
}

.radar-panel {
  clip-path: polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px);
}

.life-support-panel {
  clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 10px, calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px));
}

.communication-panel {
  clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
}

.navigation-panel {
  clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px));
}

.fuel-panel {
  clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
}

.emergency-panel {
  clip-path: polygon(0 15px, 15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px));
}

.panic-mode-active .angular-panel {
  border-color: #ef4444 !important;
  box-shadow: 0 0 30px rgba(239, 68, 68, 0.6) !important;
  animation: panicFlash 1s infinite alternate;
}

@keyframes panicFlash {
  0% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.6); }
  100% { box-shadow: 0 0 50px rgba(239, 68, 68, 0.9); }
}

/* Navigation Tab Styles */
.nav-tab {
  clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px);
  transition: all 0.3s ease;
}

.nav-tab.active {
  background: rgba(6, 182, 212, 0.2);
  border-color: #06b6d4;
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
}

.nav-tab:hover {
  background: rgba(6, 182, 212, 0.1);
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.3);
}

/* Global Page Scrollbar Styles */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  border: 1px solid rgba(6, 182, 212, 0.2);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(6, 182, 212, 0.8) 0%, rgba(6, 182, 212, 0.4) 100%);
  border-radius: 4px;
  border: 1px solid rgba(6, 182, 212, 0.3);
  box-shadow: 0 0 6px rgba(6, 182, 212, 0.4);
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(6, 182, 212, 1) 0%, rgba(6, 182, 212, 0.6) 100%);
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.6);
}

/* Firefox global scrollbar */
html {
  scrollbar-width: thin;
  scrollbar-color: rgba(6, 182, 212, 0.8) rgba(0, 0, 0, 0.8);
}

/* Custom Scrollbar Styles for specific elements */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(6, 182, 212, 0.6);
  border-radius: 3px;
  border: 1px solid rgba(6, 182, 212, 0.3);
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(6, 182, 212, 0.8);
}

/* Firefox scrollbar for custom elements */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(6, 182, 212, 0.6) rgba(31, 41, 55, 0.5);
}
`

export default function SpacecraftDashboard() {
  const [radarAngle, setRadarAngle] = useState(0)
  const [radarTrail, setRadarTrail] = useState<number[]>([])
  const [temperature, setTemperature] = useState(125)
  const [oxygenLevel, setOxygenLevel] = useState(75)
  const [velocity, setVelocity] = useState(200)
  const [altitude, setAltitude] = useState(1200)
  const [fuelLevel, setFuelLevel] = useState(85)
  const [thrustLevel, setThrustLevel] = useState(65)
  const [energyLevel, setEnergyLevel] = useState(78)
  const [systemStatus, setSystemStatus] = useState("ALL SYSTEMS WORKING PERFECTLY")
  const [panicMode, setPanicMode] = useState(false)
  const [detectedObjects, setDetectedObjects] = useState([
    { id: 1, type: "DEBRIS", size: "SMALL", speed: "2.3 KM/S", distance: "12.4 KM", threat: "LOW" },
    { id: 2, type: "ASTEROID", size: "MEDIUM", speed: "0.8 KM/S", distance: "28.7 KM", threat: "MEDIUM" },
  ])
  const [messages, setMessages] = useState([
    { time: "14:32", sender: "COMMAND", message: "Mission parameters confirmed. Proceed with course correction." },
    { time: "14:35", sender: "PILOT", message: "Roger that, Command. Initiating course correction sequence." },
    { time: "14:38", sender: "COMMAND", message: "Telemetry looks good. All systems nominal." },
    { time: "14:41", sender: "PILOT", message: "Course correction complete. New heading locked in." },
  ])

  const navigationTabs = [
    {
      id: "main",
      label: "MAIN",
      href: "/",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
      ),
    },
    {
      id: "navigation",
      label: "NAV",
      href: "/navigation",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="3,11 22,2 13,21 11,13 3,11" />
        </svg>
      ),
    },
    {
      id: "defense",
      label: "DEF",
      href: "/defense",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      id: "science",
      label: "SCI",
      href: "/science",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
          <path d="M17.5 17.5L22 22" />
          <path d="M2 2L6.5 6.5" />
        </svg>
      ),
    },
    {
      id: "crew",
      label: "CREW",
      href: "/crew",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: "engineering",
      label: "ENG",
      href: "/engineering",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
        </svg>
      ),
    },
    {
      id: "communications",
      label: "COMM",
      href: "/communications",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 3L19 12L5 21L12 12L5 3Z" />
          <path d="M12 12L22 2" />
          <path d="M12 12L2 22" />
        </svg>
      ),
    },
  ]

  // Animate radar sweep with trail
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarAngle((prev) => {
        const newAngle = (prev + 2) % 360
        setRadarTrail((prevTrail) => {
          const newTrail = [...prevTrail, prev]
          return newTrail.slice(-30)
        })
        return newAngle
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Simulate data fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature((prev) => prev + (Math.random() - 0.5) * 2)
      setOxygenLevel((prev) => Math.max(70, Math.min(80, prev + (Math.random() - 0.5) * 3)))
      setVelocity((prev) => Math.max(180, Math.min(220, prev + (Math.random() - 0.5) * 10)))
      setAltitude((prev) => Math.max(1100, Math.min(1300, prev + (Math.random() - 0.5) * 20)))
      setFuelLevel((prev) => Math.max(80, Math.min(90, prev + (Math.random() - 0.5) * 2)))
      setThrustLevel((prev) => Math.max(60, Math.min(75, prev + (Math.random() - 0.5) * 5)))
      setEnergyLevel((prev) => Math.max(70, Math.min(85, prev + (Math.random() - 0.5) * 3)))

      setDetectedObjects((prev) =>
        prev.map((obj) => ({
          ...obj,
          speed: `${(Number.parseFloat(obj.speed) + (Math.random() - 0.5) * 0.2).toFixed(1)} KM/S`,
          distance: `${(Number.parseFloat(obj.distance) + (Math.random() - 0.5) * 2).toFixed(1)} KM`,
        })),
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Add new messages periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newMessages = [
        { sender: "COMMAND", message: "Status report requested." },
        { sender: "PILOT", message: "All systems green. Continuing mission." },
        { sender: "COMMAND", message: "Weather update: Clear conditions ahead." },
        { sender: "PILOT", message: "Copy that. Maintaining current trajectory." },
      ]

      const randomMessage = newMessages[Math.floor(Math.random() * newMessages.length)]
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })

      setMessages((prev) => [
        ...prev.slice(-3),
        {
          time: currentTime,
          sender: randomMessage.sender,
          message: randomMessage.message,
        },
      ])
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const CircularGauge = ({
    value,
    max,
    label,
    unit,
    size = 120,
  }: {
    value: number
    max: number
    label: string
    unit: string
    size?: number
  }) => {
    const percentage = (value / max) * 100
    const circumference = 2 * Math.PI * 45
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r="45"
              stroke="rgba(6, 182, 212, 0.2)"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r="45"
              stroke="#06b6d4"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500 drop-shadow-[0_0_8px_#06b6d4]"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-cyan-400">
            <span className="text-2xl font-bold">{Math.round(value)}</span>
            <span className="text-xs">{unit}</span>
          </div>
        </div>
        <span className="text-cyan-400 text-sm mt-2 font-mono">{label}</span>
      </div>
    )
  }

  const ProgressBar = ({
    label,
    value,
    max = 100,
  }: {
    label: string
    value: number
    max?: number
  }) => {
    const percentage = (value / max) * 100
    return (
      <div className="mb-3">
        <div className="flex justify-between text-xs text-cyan-400 mb-1">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2 border border-cyan-500/30">
          <div
            className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-2 rounded-full transition-all duration-500 shadow-[0_0_8px_#06b6d4]"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-4 font-mono">
      <style dangerouslySetInnerHTML={{ __html: panelStyles }} />
      <div className={`max-w-7xl mx-auto ${panicMode ? "panic-mode-active" : ""}`}>
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-cyan-400 mb-4">SPACECRAFT CONTROL INTERFACE</h1>

          {/* Navigation Tabs */}
          <div className="flex justify-center space-x-2 mb-4">
            {navigationTabs.map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                className={`nav-tab px-4 py-2 border border-cyan-500/30 text-xs font-bold transition-all duration-300 ${
                  tab.id === "main" ? "active" : ""
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-cyan-400 mb-1">{tab.icon}</span>
                  <span className="text-cyan-400">{tab.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Screen Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Shuttle Health */}
          <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] angular-panel shuttle-health-panel">
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">SHUTTLE HEALTH</div>
            <div className="flex flex-col items-center mb-4">
              <svg width="80" height="60" viewBox="0 0 80 60" className="text-cyan-400 mb-4">
                <path
                  d="M40 10 L20 50 L25 45 L40 20 L55 45 L60 50 Z"
                  fill="currentColor"
                  className="drop-shadow-[0_0_8px_#06b6d4]"
                />
                <path d="M15 45 L25 40 M65 45 L55 40" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <ProgressBar label="STRUCTURAL INTEGRITY" value={95} />
            <ProgressBar label="HULL TEMPERATURE" value={78} />
            <ProgressBar label="SHIELD EFFICIENCY" value={88} />
            <ProgressBar label="ENGINE STATUS" value={92} />
          </div>

          {/* Projectile Detector */}
          <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] angular-panel radar-panel lg:col-span-2">
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
              PROJECTILE DETECTOR
            </div>
            <div className="flex">
              <div className="flex-1 flex flex-col items-center">
                <div className="relative w-48 h-48">
                  <svg width="192" height="192" className="absolute inset-0">
                    {[1, 2, 3, 4].map((i) => (
                      <circle
                        key={i}
                        cx="96"
                        cy="96"
                        r={i * 22}
                        stroke="rgba(6, 182, 212, 0.3)"
                        strokeWidth="1"
                        fill="transparent"
                      />
                    ))}
                    <line x1="96" y1="8" x2="96" y2="184" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
                    <line x1="8" y1="96" x2="184" y2="96" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />

                    {radarTrail.map((angle, index) => {
                      const opacity = Math.pow((index + 1) / radarTrail.length, 2) * 0.6
                      const strokeWidth = 1 + (index / radarTrail.length) * 1
                      return (
                        <line
                          key={index}
                          x1="96"
                          y1="96"
                          x2={96 + 88 * Math.cos((angle * Math.PI) / 180)}
                          y2={96 + 88 * Math.sin((angle * Math.PI) / 180)}
                          stroke="#06b6d4"
                          strokeWidth={strokeWidth}
                          opacity={opacity}
                          className="transition-opacity duration-100"
                        />
                      )
                    })}

                    <line
                      x1="96"
                      y1="96"
                      x2={96 + 88 * Math.cos((radarAngle * Math.PI) / 180)}
                      y2={96 + 88 * Math.sin((radarAngle * Math.PI) / 180)}
                      stroke="#06b6d4"
                      strokeWidth="2"
                      className="drop-shadow-[0_0_8px_#06b6d4]"
                    />
                    <circle cx="130" cy="70" r="3" fill="#06b6d4" className="animate-pulse" />
                    <circle cx="70" cy="120" r="2" fill="#06b6d4" className="animate-pulse" />
                  </svg>
                </div>
                <div className="text-xs text-cyan-400 mt-2 text-center">
                  <div>RANGE: 50KM</div>
                  <div>OBJECTS: {detectedObjects.length}</div>
                </div>
              </div>
              <div className="flex-1 pl-4">
                <div className="text-xs text-cyan-400 mb-2 font-bold">DETECTED OBJECTS:</div>
                <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                  {detectedObjects.map((obj) => (
                    <div key={obj.id} className="bg-gray-800/50 p-2 rounded border border-cyan-500/30">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-cyan-400 font-bold text-xs">{obj.type}</span>
                        <span
                          className={`text-xs px-1 rounded ${
                            obj.threat === "HIGH"
                              ? "bg-red-600 text-white"
                              : obj.threat === "MEDIUM"
                                ? "bg-yellow-600 text-white"
                                : "bg-green-600 text-white"
                          }`}
                        >
                          {obj.threat}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-xs text-gray-300">
                        <div>SIZE: {obj.size}</div>
                        <div>SPEED: {obj.speed}</div>
                        <div>DIST: {obj.distance}</div>
                        <div>ID: #{obj.id}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Combined Life Support */}
          <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] angular-panel life-support-panel">
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">LIFE SUPPORT</div>
            <div className="space-y-4">
              <div className="text-center">
                <CircularGauge value={temperature} max={200} label="TEMPERATURE" unit="°F" size={100} />
              </div>
              <div className="text-center">
                <CircularGauge value={oxygenLevel} max={100} label="OXYGEN LEVELS" unit="%" size={100} />
              </div>
              <div className="text-xs text-cyan-400 text-center">
                <div>TEMP RANGE: 68-78°F</div>
                <div>O2 STATUS: NORMAL</div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="lg:col-span-4 grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
            {/* Pilot-Command Communication */}
            <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] angular-panel communication-panel">
              <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
                PILOT ↔ COMMAND
              </div>
              <div className="space-y-2 text-xs max-h-32 overflow-y-auto custom-scrollbar">
                {messages.map((msg, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between text-gray-400">
                      <span className={msg.sender === "COMMAND" ? "text-yellow-400" : "text-green-400"}>
                        {msg.sender}
                      </span>
                      <span>{msg.time}</span>
                    </div>
                    <div className="text-cyan-400 text-xs mt-1">{msg.message}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-2 bg-gray-800 rounded text-green-400 text-xs">{"> COMM STATUS: ACTIVE"}</div>
            </div>

            {/* Navigation */}
            <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] angular-panel navigation-panel">
              <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">NAVIGATION</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">{Math.round(velocity)}</div>
                  <div className="text-xs text-cyan-400">VELOCITY</div>
                  <div className="text-xs text-gray-400">KM/H</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">{Math.round(altitude)}</div>
                  <div className="text-xs text-cyan-400">ALTITUDE</div>
                  <div className="text-xs text-gray-400">KM</div>
                </div>
              </div>
            </div>

            {/* Enhanced Fuel & Power Performance */}
            <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] angular-panel fuel-panel">
              <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">FUEL & POWER</div>
              <div className="space-y-3">
                <ProgressBar label="FUEL LEVEL" value={fuelLevel} />
                <ProgressBar label="THRUST OUTPUT" value={thrustLevel} />
                <ProgressBar label="ENERGY RESERVES" value={energyLevel} />
                <div className="flex justify-between text-xs text-cyan-400">
                  <span>EFFICIENCY: 92%</span>
                  <span className="text-green-400">GRADE: A</span>
                </div>
              </div>
            </div>

            {/* Emergency Controls */}
            <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] angular-panel emergency-panel">
              <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">EMERGENCY</div>
              <div className="text-center">
                <div className="text-green-400 text-xs mb-4 font-bold">{systemStatus}</div>
                <Button
                  onClick={() => setPanicMode(!panicMode)}
                  className={`w-full ${
                    panicMode
                      ? "bg-red-600 hover:bg-red-700 animate-pulse border-2 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.8)]"
                      : "bg-red-800 hover:bg-red-700 border border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                  } text-white font-bold`}
                >
                  {panicMode ? "🚨 PANIC MODE ACTIVE 🚨" : "ACTIVATE PANIC MODE"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panic Mode Red Flashing Overlay */}
      {panicMode && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 bg-red-600/20 animate-pulse" />
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-ping" />
            <div className="w-4 h-4 bg-red-500 rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
            <div className="w-4 h-4 bg-red-500 rounded-full animate-ping" style={{ animationDelay: "1.5s" }} />
          </div>
          <div className="absolute top-1/2 left-4 right-4 flex justify-center">
            <div className="text-red-500 text-2xl font-bold animate-pulse">⚠ PANIC MODE ACTIVE ⚠</div>
          </div>
        </div>
      )}
    </div>
  )
}
