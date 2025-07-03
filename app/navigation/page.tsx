"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const panelStyles = `
  .nav-panel-1 {
    clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%);
  }
  
  .nav-panel-2 {
    clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
  }
  
  .nav-panel-3 {
    clip-path: polygon(0 15px, 15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px));
  }
  
  .nav-panel-4 {
    clip-path: polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px);
  }

  .star-map {
    background: radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 20% 70%, rgba(255, 215, 0, 0.1) 0%, transparent 50%);
  }

  .course-line {
    stroke-dasharray: 5,5;
    animation: dash 2s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: -10;
    }
  }

  .autopilot-active {
    animation: autopilotPulse 2s ease-in-out infinite;
  }

  @keyframes autopilotPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); }
  50% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.8); }
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

export default function NavigationPage() {
  const [currentPosition, setCurrentPosition] = useState({ x: 150, y: 200 })
  const [targetPosition, setTargetPosition] = useState({ x: 300, y: 100 })
  const [autopilotActive, setAutopilotActive] = useState(false)
  const [courseProgress, setCourseProgress] = useState(0)
  const [navigationData, setNavigationData] = useState({
    currentSpeed: 2847,
    targetSpeed: 3200,
    bearing: 127.5,
    distance: 847.2,
    eta: "14:32:18",
    fuelConsumption: 12.4,
  })

  const [newWaypointName, setNewWaypointName] = useState("")
  const [showWaypointInput, setShowWaypointInput] = useState(false)

  const [starSystems] = useState([
    { id: 1, name: "ALPHA CENTAURI", x: 120, y: 80, type: "BINARY", distance: 4.37 },
    { id: 2, name: "PROXIMA", x: 280, y: 150, type: "RED DWARF", distance: 4.24 },
    { id: 3, name: "WOLF 359", x: 200, y: 250, type: "RED DWARF", distance: 7.86 },
    { id: 4, name: "SIRIUS", x: 350, y: 200, type: "BINARY", distance: 8.66 },
    { id: 5, name: "VEGA", x: 100, y: 300, type: "MAIN SEQ", distance: 25.04 },
  ])

  const [waypoints, setWaypoints] = useState([
    { id: 1, name: "CHECKPOINT ALPHA", x: 180, y: 160, status: "COMPLETED" },
    { id: 2, name: "CHECKPOINT BETA", x: 240, y: 130, status: "ACTIVE" },
    { id: 3, name: "CHECKPOINT GAMMA", x: 290, y: 110, status: "PENDING" },
  ])

  // Simulate navigation updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNavigationData((prev) => ({
        ...prev,
        currentSpeed: prev.currentSpeed + (Math.random() - 0.5) * 50,
        bearing: prev.bearing + (Math.random() - 0.5) * 2,
        distance: Math.max(0, prev.distance - Math.random() * 5),
        fuelConsumption: prev.fuelConsumption + (Math.random() - 0.5) * 0.5,
      }))

      if (autopilotActive) {
        setCourseProgress((prev) => Math.min(100, prev + Math.random() * 2))
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [autopilotActive])

  const handleStarMapClick = (event: React.MouseEvent<SVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setTargetPosition({ x, y })
  }

  const calculateDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }) => {
    return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2))
  }

  const addWaypoint = () => {
    if (newWaypointName.trim()) {
      const newWaypoint = {
        id: waypoints.length + 1,
        name: newWaypointName.toUpperCase(),
        x: Math.floor(Math.random() * 300) + 50,
        y: Math.floor(Math.random() * 200) + 50,
        status: "PENDING" as const,
      }
      setWaypoints([...waypoints, newWaypoint])
      setNewWaypointName("")
      setShowWaypointInput(false)
    }
  }

  return (
    <div className="min-h-screen bg-black p-4 font-mono">
      <style dangerouslySetInnerHTML={{ __html: panelStyles }} />

      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-cyan-400">NAVIGATION CONTROL SYSTEM</h1>
        </div>
        <div className="text-sm text-gray-400">Stellar Cartography • Course Plotting • Autopilot Management</div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Star Map - Large Panel */}
        <div className="lg:col-span-2 bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] nav-panel-4">
          <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">3D STAR MAP</div>

          <div className="star-map relative w-full h-96 bg-gray-900 rounded border border-cyan-500/30 overflow-hidden">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 300"
              className="cursor-crosshair"
              onClick={handleStarMapClick}
            >
              {/* Grid Lines */}
              <defs>
                <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Star Systems */}
              {starSystems.map((star) => (
                <g key={star.id}>
                  <circle cx={star.x} cy={star.y} r="4" fill="#06b6d4" className="animate-pulse cursor-pointer" />
                  <text x={star.x + 8} y={star.y - 8} fill="#06b6d4" fontSize="8" className="font-mono">
                    {star.name}
                  </text>
                  <text x={star.x + 8} y={star.y + 4} fill="#gray-400" fontSize="6" className="font-mono">
                    {star.distance} LY
                  </text>
                </g>
              ))}

              {/* Waypoints */}
              {waypoints.map((waypoint) => (
                <g key={waypoint.id}>
                  <polygon
                    points={`${waypoint.x},${waypoint.y - 6} ${waypoint.x + 5},${waypoint.y + 4} ${waypoint.x - 5},${waypoint.y + 4}`}
                    fill={
                      waypoint.status === "COMPLETED" ? "#22c55e" : waypoint.status === "ACTIVE" ? "#eab308" : "#6b7280"
                    }
                    stroke="white"
                    strokeWidth="1"
                  />
                  <text x={waypoint.x + 8} y={waypoint.y + 2} fill="white" fontSize="6" className="font-mono">
                    {waypoint.name}
                  </text>
                </g>
              ))}

              {/* Current Position */}
              <circle
                cx={currentPosition.x}
                cy={currentPosition.y}
                r="6"
                fill="#22c55e"
                stroke="white"
                strokeWidth="2"
                className="animate-pulse"
              />
              <text
                x={currentPosition.x + 10}
                y={currentPosition.y - 10}
                fill="#22c55e"
                fontSize="8"
                className="font-mono font-bold"
              >
                CURRENT POSITION
              </text>

              {/* Target Position */}
              <circle
                cx={targetPosition.x}
                cy={targetPosition.y}
                r="4"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="2,2"
                className="animate-pulse"
              />
              <text x={targetPosition.x + 8} y={targetPosition.y - 8} fill="#ef4444" fontSize="8" className="font-mono">
                TARGET
              </text>

              {/* Course Line */}
              <line
                x1={currentPosition.x}
                y1={currentPosition.y}
                x2={targetPosition.x}
                y2={targetPosition.y}
                stroke="#06b6d4"
                strokeWidth="2"
                className="course-line"
              />
            </svg>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
            <div className="text-center">
              <div className="text-cyan-400 font-bold">DISTANCE TO TARGET</div>
              <div className="text-white text-lg">
                {calculateDistance(currentPosition, targetPosition).toFixed(1)} AU
              </div>
            </div>
            <div className="text-center">
              <div className="text-cyan-400 font-bold">COURSE BEARING</div>
              <div className="text-white text-lg">{navigationData.bearing.toFixed(1)}°</div>
            </div>
            <div className="text-center">
              <div className="text-cyan-400 font-bold">ETA</div>
              <div className="text-white text-lg">{navigationData.eta}</div>
            </div>
          </div>
        </div>

        {/* Right Column - Controls */}
        <div className="space-y-4">
          {/* Autopilot Control */}
          <div
            className={`bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] nav-panel-1 ${autopilotActive ? "autopilot-active" : ""}`}
          >
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
              AUTOPILOT CONTROL
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-2xl font-bold mb-2 ${autopilotActive ? "text-green-400" : "text-cyan-400"}`}>
                  {autopilotActive ? "ENGAGED" : "STANDBY"}
                </div>
                <Button
                  onClick={() => setAutopilotActive(!autopilotActive)}
                  className={`w-full ${
                    autopilotActive
                      ? "bg-green-600 hover:bg-green-700 border-green-400"
                      : "bg-cyan-700 hover:bg-cyan-600 border-cyan-500"
                  } border-2 font-bold text-white`}
                >
                  {autopilotActive ? "DISENGAGE" : "ENGAGE"} AUTOPILOT
                </Button>
              </div>

              {autopilotActive && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-cyan-400">
                    <span>COURSE PROGRESS</span>
                    <span>{courseProgress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 border border-cyan-500/30">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-300 h-2 rounded-full transition-all duration-500 shadow-[0_0_8px_#22c55e]"
                      style={{ width: `${courseProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Data */}
          <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] nav-panel-2">
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">NAVIGATION DATA</div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">CURRENT SPEED:</span>
                <span className="text-cyan-400 font-bold">{navigationData.currentSpeed.toFixed(0)} KM/S</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">TARGET SPEED:</span>
                <span className="text-cyan-400 font-bold">{navigationData.targetSpeed} KM/S</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">BEARING:</span>
                <span className="text-cyan-400 font-bold">{navigationData.bearing.toFixed(1)}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">DISTANCE:</span>
                <span className="text-cyan-400 font-bold">{navigationData.distance.toFixed(1)} AU</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">FUEL RATE:</span>
                <span className="text-cyan-400 font-bold">{navigationData.fuelConsumption.toFixed(1)} L/MIN</span>
              </div>
            </div>
          </div>

          {/* Course Waypoints */}
          <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] nav-panel-3">
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
              COURSE WAYPOINTS
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
              {waypoints.map((waypoint) => (
                <div key={waypoint.id} className="bg-gray-800/50 p-2 rounded border border-cyan-500/30">
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-400 font-bold text-xs">{waypoint.name}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        waypoint.status === "COMPLETED"
                          ? "bg-green-600 text-white"
                          : waypoint.status === "ACTIVE"
                            ? "bg-yellow-600 text-white"
                            : "bg-gray-600 text-white"
                      }`}
                    >
                      {waypoint.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    COORDS: {waypoint.x}, {waypoint.y}
                  </div>
                </div>
              ))}
            </div>

            {showWaypointInput ? (
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  value={newWaypointName}
                  onChange={(e) => setNewWaypointName(e.target.value)}
                  placeholder="WAYPOINT NAME"
                  className="w-full bg-gray-800 border border-cyan-500/30 rounded px-3 py-2 text-cyan-400 text-xs font-mono placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  onKeyPress={(e) => e.key === "Enter" && addWaypoint()}
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    onClick={addWaypoint}
                    className="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white border border-cyan-500 text-xs"
                  >
                    ADD
                  </Button>
                  <Button
                    onClick={() => {
                      setShowWaypointInput(false)
                      setNewWaypointName("")
                    }}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white border border-gray-500 text-xs"
                  >
                    CANCEL
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setShowWaypointInput(true)}
                className="w-full mt-4 bg-cyan-700 hover:bg-cyan-600 text-white border border-cyan-500"
              >
                ADD WAYPOINT
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
