"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const panelStyles = `
  .eng-panel-1 {
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%);
  }
  
  .eng-panel-2 {
    clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
  }
  
  .eng-panel-3 {
    clip-path: polygon(0 15px, 15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px));
  }
  
  .eng-panel-4 {
    clip-path: polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px);
  }

  .warp-core-active {
    animation: warpCorePulse 2s ease-in-out infinite;
  }

  @keyframes warpCorePulse {
    0%, 100% { box-shadow: 0 0 30px rgba(245, 158, 11, 0.4); }
    50% { box-shadow: 0 0 50px rgba(245, 158, 11, 0.8); }
  }

  .power-critical {
    animation: powerAlert 1s ease-in-out infinite;
  }

  @keyframes powerAlert {
    0%, 100% { background-color: rgba(239, 68, 68, 0.1); }
    50% { background-color: rgba(239, 68, 68, 0.3); }
  }

  .system-optimal {
    animation: systemGlow 2s ease-in-out infinite;
  }

  @keyframes systemGlow {
    0%, 100% { box-shadow: 0 0 15px rgba(34, 197, 94, 0.4); }
    50% { box-shadow: 0 0 25px rgba(34, 197, 94, 0.8); }
  }

  .maintenance-alert {
    animation: maintenanceFlash 1.5s ease-in-out infinite;
  }

  @keyframes maintenanceFlash {
    0%, 100% { background-color: rgba(234, 179, 8, 0.1); }
    50% { background-color: rgba(234, 179, 8, 0.3); }
  }

  .power-flow {
    stroke-dasharray: 8,4;
    animation: powerFlow 2s linear infinite;
  }

  @keyframes powerFlow {
    to {
      stroke-dashoffset: -12;
    }
  }

  .core-rotation {
    animation: coreRotation 10s linear infinite;
  }

  @keyframes coreRotation {
    to {
      transform: rotate(360deg);
    }
  }

  /* Custom Scrollbar Styles */
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
`

export default function EngineeringPage() {
  const [warpCoreActive, setWarpCoreActive] = useState(true)
  const [emergencyShutdown, setEmergencyShutdown] = useState(false)
  const [coreRotation, setCoreRotation] = useState(0)
  const [powerOutput, setPowerOutput] = useState(87)
  const [coreTemperature, setCoreTemperature] = useState(2847)
  const [coolantFlow, setCoolantFlow] = useState(94)

  const [powerDistribution, setPowerDistribution] = useState({
    shields: 25,
    weapons: 15,
    lifesupport: 20,
    propulsion: 30,
    sensors: 10,
  })

  const [systemStatus, setSystemStatus] = useState([
    { name: "WARP CORE", status: "OPTIMAL", temperature: 2847, pressure: 145, efficiency: 94 },
    { name: "IMPULSE ENGINES", status: "OPTIMAL", temperature: 1234, pressure: 89, efficiency: 91 },
    { name: "LIFE SUPPORT", status: "OPTIMAL", temperature: 23, pressure: 101, efficiency: 98 },
    { name: "SHIELD GENERATORS", status: "STABLE", temperature: 567, pressure: 67, efficiency: 87 },
    { name: "WEAPON SYSTEMS", status: "STANDBY", temperature: 45, pressure: 23, efficiency: 85 },
    { name: "SENSOR ARRAY", status: "OPTIMAL", temperature: 34, pressure: 12, efficiency: 96 },
  ])

  const [maintenanceAlerts, setMaintenanceAlerts] = useState([
    {
      id: 1,
      system: "PLASMA CONDUIT 7",
      priority: "HIGH",
      issue: "MICRO-FRACTURE DETECTED",
      eta: "2.3 HOURS",
      timestamp: "14:23:17",
    },
    {
      id: 2,
      system: "COOLANT PUMP 3",
      priority: "MEDIUM",
      issue: "EFFICIENCY DEGRADATION",
      eta: "8.7 HOURS",
      timestamp: "14:18:42",
    },
    {
      id: 3,
      system: "POWER RELAY 12",
      priority: "LOW",
      issue: "ROUTINE INSPECTION DUE",
      eta: "24.0 HOURS",
      timestamp: "14:15:09",
    },
  ])

  const [diagnostics, setDiagnostics] = useState({
    totalPowerGeneration: 1247,
    totalPowerConsumption: 1089,
    systemEfficiency: 94,
    coreStability: 98,
    coolantTemperature: 45,
    plasmaPressure: 145,
  })

  // Animate warp core rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCoreRotation((prev) => (prev + 2) % 360)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Simulate engineering data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (!emergencyShutdown) {
        setPowerOutput((prev) => Math.max(80, Math.min(95, prev + (Math.random() - 0.5) * 5)))
        setCoreTemperature((prev) => Math.max(2800, Math.min(2900, prev + (Math.random() - 0.5) * 20)))
        setCoolantFlow((prev) => Math.max(90, Math.min(98, prev + (Math.random() - 0.5) * 3)))

        setDiagnostics((prev) => ({
          ...prev,
          totalPowerGeneration: Math.max(1200, Math.min(1300, prev.totalPowerGeneration + (Math.random() - 0.5) * 30)),
          totalPowerConsumption: Math.max(
            1000,
            Math.min(1150, prev.totalPowerConsumption + (Math.random() - 0.5) * 25),
          ),
          systemEfficiency: Math.max(90, Math.min(98, prev.systemEfficiency + (Math.random() - 0.5) * 2)),
          coreStability: Math.max(95, Math.min(100, prev.coreStability + (Math.random() - 0.5) * 1)),
          coolantTemperature: Math.max(40, Math.min(50, prev.coolantTemperature + (Math.random() - 0.5) * 2)),
          plasmaPressure: Math.max(140, Math.min(150, prev.plasmaPressure + (Math.random() - 0.5) * 3)),
        }))

        setSystemStatus((prev) =>
          prev.map((system) => ({
            ...system,
            temperature: Math.max(0, system.temperature + (Math.random() - 0.5) * 10),
            pressure: Math.max(0, system.pressure + (Math.random() - 0.5) * 5),
            efficiency: Math.max(80, Math.min(100, system.efficiency + (Math.random() - 0.5) * 2)),
          })),
        )
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [emergencyShutdown])

  const handleEmergencyShutdown = () => {
    setEmergencyShutdown(!emergencyShutdown)
    if (!emergencyShutdown) {
      setWarpCoreActive(false)
      setPowerOutput(0)
      setCoreTemperature(0)
      setCoolantFlow(0)
      setDiagnostics({
        totalPowerGeneration: 0,
        totalPowerConsumption: 0,
        systemEfficiency: 0,
        coreStability: 0,
        coolantTemperature: 0,
        plasmaPressure: 0,
      })
      setSystemStatus((prev) =>
        prev.map((system) => ({
          ...system,
          status: "OFFLINE",
          temperature: 0,
          pressure: 0,
          efficiency: 0,
        })),
      )
    } else {
      // Restart sequence - redirect to main page
      window.location.href = "/"
    }
  }

  const adjustPowerDistribution = (system: string, change: number) => {
    setPowerDistribution((prev) => {
      const newDistribution = { ...prev }
      const currentValue = newDistribution[system as keyof typeof newDistribution]
      const newValue = Math.max(5, Math.min(50, currentValue + change))
      newDistribution[system as keyof typeof newDistribution] = newValue
      return newDistribution
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPTIMAL":
        return "text-green-400"
      case "STABLE":
        return "text-cyan-400"
      case "WARNING":
        return "text-yellow-400"
      case "CRITICAL":
        return "text-red-400"
      case "STANDBY":
        return "text-gray-400"
      default:
        return "text-gray-400"
    }
  }

  const ProgressBar = ({
    label,
    value,
    max = 100,
    color = "cyan",
  }: {
    label: string
    value: number
    max?: number
    color?: "cyan" | "green" | "red" | "yellow" | "orange"
  }) => {
    const percentage = (value / max) * 100
    const colorClasses = {
      cyan: "from-cyan-500 to-cyan-300 shadow-[0_0_8px_#06b6d4]",
      green: "from-green-500 to-green-300 shadow-[0_0_8px_#22c55e]",
      red: "from-red-500 to-red-300 shadow-[0_0_8px_#ef4444]",
      yellow: "from-yellow-500 to-yellow-300 shadow-[0_0_8px_#eab308]",
      orange: "from-orange-500 to-orange-300 shadow-[0_0_8px_#f97316]",
    }

    return (
      <div className="mb-3">
        <div className="flex justify-between text-xs text-cyan-400 mb-1">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2 border border-cyan-500/30">
          <div
            className={`bg-gradient-to-r ${colorClasses[color]} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-4 font-mono">
      <style dangerouslySetInnerHTML={{ __html: panelStyles }} />

      {emergencyShutdown ? (
        // Emergency Shutdown Screen
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl text-red-500 mb-8 animate-pulse">⚠</div>
            <h1 className="text-4xl font-bold text-red-500 mb-4 animate-pulse">EMERGENCY SHUTDOWN ACTIVE</h1>
            <div className="text-xl text-gray-400 mb-8">ALL SYSTEMS OFFLINE</div>
            <div className="text-sm text-gray-500 mb-8">
              <div>WARP CORE: OFFLINE</div>
              <div>LIFE SUPPORT: EMERGENCY POWER</div>
              <div>ALL SUBSYSTEMS: DISABLED</div>
            </div>
            <Button
              onClick={handleEmergencyShutdown}
              className="bg-green-600 hover:bg-green-700 border-green-400 border-2 font-bold text-white text-lg px-8 py-4"
            >
              RESTART SYSTEMS
            </Button>
          </div>
        </div>
      ) : (
        // Normal Engineering Interface
        <>
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-cyan-400">ENGINEERING CONTROL SYSTEM</h1>
            </div>
            <div className="text-sm text-gray-400">Warp Core Management • Power Distribution • System Diagnostics</div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Engineering Display - Large Panel */}
            <div
              className={`lg:col-span-2 bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] eng-panel-4 ${warpCoreActive ? "warp-core-active" : ""}`}
            >
              <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
                WARP CORE & POWER DISTRIBUTION
              </div>

              <div className="flex">
                <div className="flex-1 flex flex-col items-center">
                  <div className="relative w-64 h-64 bg-gray-900 rounded border border-cyan-500/30">
                    <svg width="256" height="256" className="absolute inset-0">
                      {/* Power Grid */}
                      <defs>
                        <pattern id="powerGrid" width="32" height="32" patternUnits="userSpaceOnUse">
                          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#powerGrid)" />

                      {/* Warp Core */}
                      <g transform={`translate(128, 128)`}>
                        <circle
                          r="40"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="3"
                          className={warpCoreActive ? "core-rotation" : ""}
                        />
                        <circle
                          r="25"
                          fill="rgba(245, 158, 11, 0.3)"
                          stroke="#f59e0b"
                          strokeWidth="2"
                          className="animate-pulse"
                        />
                        <circle r="10" fill="#f59e0b" className="animate-pulse" />
                        <text y="5" fill="#f59e0b" fontSize="8" className="font-mono text-center" textAnchor="middle">
                          CORE
                        </text>
                      </g>

                      {/* Power Distribution Lines */}
                      <line
                        x1="128"
                        y1="88"
                        x2="128"
                        y2="20"
                        stroke="#06b6d4"
                        strokeWidth="3"
                        className={warpCoreActive ? "power-flow" : ""}
                      />
                      <line
                        x1="168"
                        y1="128"
                        x2="236"
                        y2="128"
                        stroke="#22c55e"
                        strokeWidth="3"
                        className={warpCoreActive ? "power-flow" : ""}
                      />
                      <line
                        x1="128"
                        y1="168"
                        x2="128"
                        y2="236"
                        stroke="#eab308"
                        strokeWidth="3"
                        className={warpCoreActive ? "power-flow" : ""}
                      />
                      <line
                        x1="88"
                        y1="128"
                        x2="20"
                        y2="128"
                        stroke="#ef4444"
                        strokeWidth="3"
                        className={warpCoreActive ? "power-flow" : ""}
                      />

                      {/* System Nodes */}
                      <circle cx="128" cy="20" r="8" fill="#06b6d4" stroke="white" strokeWidth="2" />
                      <text x="128" y="12" fill="#06b6d4" fontSize="6" className="font-mono" textAnchor="middle">
                        SHIELDS
                      </text>

                      <circle cx="236" cy="128" r="8" fill="#22c55e" stroke="white" strokeWidth="2" />
                      <text x="236" y="145" fill="#22c55e" fontSize="6" className="font-mono" textAnchor="middle">
                        LIFE SUP
                      </text>

                      <circle cx="128" cy="236" r="8" fill="#eab308" stroke="white" strokeWidth="2" />
                      <text x="128" y="250" fill="#eab308" fontSize="6" className="font-mono" textAnchor="middle">
                        PROPULSION
                      </text>

                      <circle cx="20" cy="128" r="8" fill="#ef4444" stroke="white" strokeWidth="2" />
                      <text x="20" y="120" fill="#ef4444" fontSize="6" className="font-mono" textAnchor="middle">
                        WEAPONS
                      </text>
                    </svg>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
                    <div className="text-center">
                      <div className="text-cyan-400 font-bold">POWER OUTPUT</div>
                      <div className={`text-lg ${warpCoreActive ? "text-orange-400" : "text-red-400"}`}>
                        {powerOutput.toFixed(0)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-cyan-400 font-bold">CORE TEMP</div>
                      <div className="text-white text-lg">{coreTemperature.toFixed(0)}°K</div>
                    </div>
                    <div className="text-center">
                      <div className="text-cyan-400 font-bold">COOLANT FLOW</div>
                      <div className="text-white text-lg">{coolantFlow.toFixed(0)}%</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 pl-4">
                  <div className="text-xs text-cyan-400 mb-2 font-bold">POWER DISTRIBUTION:</div>
                  <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                    {Object.entries(powerDistribution).map(([system, value]) => (
                      <div key={system} className="bg-gray-800/50 p-3 rounded border border-cyan-500/30">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-cyan-400 font-bold text-xs">{system.toUpperCase()}</span>
                          <span className="text-white text-xs">{value}%</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => adjustPowerDistribution(system, -5)}
                            className="bg-red-700 hover:bg-red-600 text-white border border-red-500 text-xs px-2 py-1"
                          >
                            -
                          </Button>
                          <div className="flex-1">
                            <ProgressBar
                              label=""
                              value={value}
                              max={50}
                              color={
                                system === "shields"
                                  ? "cyan"
                                  : system === "weapons"
                                    ? "red"
                                    : system === "lifesupport"
                                      ? "green"
                                      : system === "propulsion"
                                        ? "yellow"
                                        : "cyan"
                              }
                            />
                          </div>
                          <Button
                            onClick={() => adjustPowerDistribution(system, 5)}
                            className="bg-green-700 hover:bg-green-600 text-white border border-green-500 text-xs px-2 py-1"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Engineering Controls */}
            <div className="space-y-4">
              {/* System Diagnostics */}
              <div
                className={`bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] eng-panel-1 ${diagnostics.systemEfficiency > 95 ? "system-optimal" : ""}`}
              >
                <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
                  SYSTEM DIAGNOSTICS
                </div>

                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-2">{diagnostics.systemEfficiency}%</div>
                    <div className="text-xs text-gray-400 mb-3">OVERALL EFFICIENCY</div>
                    <Button
                      onClick={handleEmergencyShutdown}
                      className={`w-full ${
                        emergencyShutdown
                          ? "bg-green-600 hover:bg-green-700 border-green-400"
                          : "bg-red-700 hover:bg-red-600 border-red-500"
                      } border-2 font-bold text-white text-xs`}
                    >
                      {emergencyShutdown ? "RESTART SYSTEMS" : "EMERGENCY SHUTDOWN"}
                    </Button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">POWER GEN:</span>
                      <span className="text-cyan-400">{diagnostics.totalPowerGeneration} MW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">POWER USAGE:</span>
                      <span className="text-cyan-400">{diagnostics.totalPowerConsumption} MW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">CORE STABILITY:</span>
                      <span className="text-green-400">{diagnostics.coreStability}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">COOLANT TEMP:</span>
                      <span className="text-cyan-400">{diagnostics.coolantTemperature}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">PLASMA PRESSURE:</span>
                      <span className="text-orange-400">{diagnostics.plasmaPressure} kPa</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] eng-panel-2">
                <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
                  SYSTEM STATUS
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                  {systemStatus.map((system) => (
                    <div key={system.name} className="bg-gray-800/50 p-2 rounded border border-cyan-500/30">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-cyan-400 font-bold text-xs">{system.name}</span>
                        <span className={`text-xs font-bold ${getStatusColor(system.status)}`}>{system.status}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1 text-xs text-gray-300">
                        <div>TEMP: {system.temperature.toFixed(0)}°</div>
                        <div>PRESS: {system.pressure.toFixed(0)}</div>
                        <div>EFF: {system.efficiency.toFixed(0)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maintenance Alerts */}
              <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] eng-panel-3">
                <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
                  MAINTENANCE ALERTS
                </div>

                <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
                  {maintenanceAlerts.length > 0 ? (
                    maintenanceAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`bg-gray-800/50 p-3 rounded border border-cyan-500/30 ${
                          alert.priority === "HIGH" ? "maintenance-alert" : ""
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-cyan-400 font-bold text-xs">{alert.system}</span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              alert.priority === "HIGH"
                                ? "bg-red-600 text-white"
                                : alert.priority === "MEDIUM"
                                  ? "bg-yellow-600 text-white"
                                  : "bg-cyan-600 text-white"
                            }`}
                          >
                            {alert.priority}
                          </span>
                        </div>
                        <div className="text-xs text-gray-300 mb-1">{alert.issue}</div>
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>ETA: {alert.eta}</span>
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-green-400 py-4">
                      <div className="text-2xl mb-2">✓</div>
                      <div className="text-xs">ALL SYSTEMS NOMINAL</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
