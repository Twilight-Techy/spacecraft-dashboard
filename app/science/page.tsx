"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const panelStyles = `
  .science-panel-1 {
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%);
  }
  
  .science-panel-2 {
    clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
  }
  
  .science-panel-3 {
    clip-path: polygon(0 15px, 15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px));
  }
  
  .science-panel-4 {
    clip-path: polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px);
  }

  .scanner-active {
    animation: scannerPulse 2s ease-in-out infinite;
  }

  @keyframes scannerPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); }
    50% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.8); }
  }

  .analysis-running {
    animation: analysisPulse 1.5s ease-in-out infinite;
  }

  @keyframes analysisPulse {
    0%, 100% { box-shadow: 0 0 15px rgba(6, 182, 212, 0.4); }
    50% { box-shadow: 0 0 25px rgba(6, 182, 212, 0.8); }
  }

  .discovery-highlight {
    animation: discoveryGlow 2s ease-in-out infinite;
  }

  @keyframes discoveryGlow {
    0%, 100% { background-color: rgba(255, 215, 0, 0.1); }
    50% { background-color: rgba(255, 215, 0, 0.3); }
  }

  .sensor-sweep {
    stroke-dasharray: 10,5;
    animation: sensorSweep 4s linear infinite;
  }

  @keyframes sensorSweep {
    to {
      stroke-dashoffset: -15;
    }
  }

  .spectral-line {
    animation: spectralShift 3s ease-in-out infinite;
  }

  @keyframes spectralShift {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
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

export default function SciencePage() {
  const [scannerActive, setScannerActive] = useState(false)
  const [analysisRunning, setAnalysisRunning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [spectralAngle, setSpectralAngle] = useState(0)

  const [sensorData, setSensorData] = useState({
    temperature: -273.15,
    radiation: 0.42,
    magneticField: 1.23,
    gravityWells: 3,
    energySignatures: 7,
    lifeSignsDetected: false,
  })

  const [discoveries, setDiscoveries] = useState([
    {
      id: 1,
      type: "MINERAL DEPOSIT",
      classification: "RARE EARTH METALS",
      location: "ASTEROID BELT SECTOR 7",
      significance: "HIGH",
      timestamp: "14:23:17",
    },
    {
      id: 2,
      type: "ENERGY ANOMALY",
      classification: "QUANTUM FLUCTUATION",
      location: "DEEP SPACE GRID 12-A",
      significance: "MEDIUM",
      timestamp: "14:18:42",
    },
    {
      id: 3,
      type: "BIOLOGICAL TRACES",
      classification: "ORGANIC COMPOUNDS",
      location: "PLANET SURFACE SCAN",
      significance: "CRITICAL",
      timestamp: "14:15:09",
    },
  ])

  const [stellarObjects, setStellarObjects] = useState([
    {
      id: 1,
      name: "KEPLER-442B",
      type: "EXOPLANET",
      distance: "1,206 LY",
      composition: "ROCKY",
      atmosphere: "THIN",
      x: 180,
      y: 120,
    },
    {
      id: 2,
      name: "HD 40307G",
      type: "SUPER-EARTH",
      distance: "42 LY",
      composition: "TERRESTRIAL",
      atmosphere: "DENSE",
      x: 280,
      y: 180,
    },
    {
      id: 3,
      name: "GLIESE 667CC",
      type: "EXOPLANET",
      distance: "24 LY",
      composition: "ROCKY",
      atmosphere: "MODERATE",
      x: 120,
      y: 220,
    },
    {
      id: 4,
      name: "PROXIMA B",
      type: "TERRESTRIAL",
      distance: "4.2 LY",
      composition: "ROCKY",
      atmosphere: "UNKNOWN",
      x: 320,
      y: 160,
    },
  ])

  const [spectralData] = useState([
    { element: "HYDROGEN", wavelength: 656.3, intensity: 85, color: "#ff6b6b" },
    { element: "HELIUM", wavelength: 587.6, intensity: 62, color: "#4ecdc4" },
    { element: "OXYGEN", wavelength: 630.0, intensity: 73, color: "#45b7d1" },
    { element: "CARBON", wavelength: 658.3, intensity: 41, color: "#96ceb4" },
    { element: "IRON", wavelength: 526.9, intensity: 29, color: "#feca57" },
  ])

  const [researchProjects] = useState([
    { name: "WARP FIELD ANALYSIS", progress: 67, priority: "HIGH", eta: "2.3 DAYS" },
    { name: "ALIEN ARTIFACT STUDY", progress: 34, priority: "CRITICAL", eta: "5.7 DAYS" },
    { name: "QUANTUM ENTANGLEMENT", progress: 89, priority: "MEDIUM", eta: "0.8 DAYS" },
    { name: "DARK MATTER DETECTION", progress: 12, priority: "LOW", eta: "12.4 DAYS" },
  ])

  // Animate spectral analysis
  useEffect(() => {
    const interval = setInterval(() => {
      setSpectralAngle((prev) => (prev + 1) % 360)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Handle scanner progress
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (scannerActive) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setScannerActive(false)
            return 0
          }
          return prev + Math.random() * 5
        })
      }, 200)
    }
    return () => clearInterval(interval)
  }, [scannerActive])

  // Handle analysis progress
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (analysisRunning) {
      interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            setAnalysisRunning(false)
            return 0
          }
          return prev + Math.random() * 3
        })
      }, 300)
    }
    return () => clearInterval(interval)
  }, [analysisRunning])

  // Simulate sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prev) => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 10,
        radiation: Math.max(0, prev.radiation + (Math.random() - 0.5) * 0.1),
        magneticField: Math.max(0, prev.magneticField + (Math.random() - 0.5) * 0.2),
        energySignatures: Math.max(0, prev.energySignatures + Math.floor((Math.random() - 0.5) * 3)),
        lifeSignsDetected: Math.random() > 0.8,
      }))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const ProgressBar = ({
    label,
    value,
    max = 100,
    color = "cyan",
  }: {
    label: string
    value: number
    max?: number
    color?: "cyan" | "green" | "red" | "yellow"
  }) => {
    const percentage = (value / max) * 100
    const colorClasses = {
      cyan: "from-cyan-500 to-cyan-300 shadow-[0_0_8px_#06b6d4]",
      green: "from-green-500 to-green-300 shadow-[0_0_8px_#22c55e]",
      red: "from-red-500 to-red-300 shadow-[0_0_8px_#ef4444]",
      yellow: "from-yellow-500 to-yellow-300 shadow-[0_0_8px_#eab308]",
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

      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-cyan-400">SCIENCE & RESEARCH STATION</h1>
        </div>
        <div className="text-sm text-gray-400">Sensor Analysis • Stellar Cartography • Research Projects</div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Stellar Cartography - Large Panel */}
        <div className="lg:col-span-2 bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] science-panel-4">
          <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
            STELLAR CARTOGRAPHY & ANALYSIS
          </div>

          <div className="flex">
            <div className="flex-1 flex flex-col items-center">
              <div className="relative w-64 h-64 bg-gray-900 rounded border border-cyan-500/30">
                <svg width="256" height="256" className="absolute inset-0">
                  {/* Grid */}
                  <defs>
                    <pattern id="scienceGrid" width="32" height="32" patternUnits="userSpaceOnUse">
                      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#scienceGrid)" />

                  {/* Sensor Sweep */}
                  <circle
                    cx="128"
                    cy="128"
                    r="100"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    fill="transparent"
                    className="sensor-sweep"
                  />

                  {/* Stellar Objects */}
                  {stellarObjects.map((object) => (
                    <g key={object.id}>
                      <circle
                        cx={object.x}
                        cy={object.y}
                        r="5"
                        fill={
                          object.type === "EXOPLANET"
                            ? "#4ade80"
                            : object.type === "SUPER-EARTH"
                              ? "#f59e0b"
                              : "#06b6d4"
                        }
                        stroke="white"
                        strokeWidth="1"
                        className="animate-pulse cursor-pointer"
                      />
                      <text x={object.x + 8} y={object.y - 8} fill="#06b6d4" fontSize="6" className="font-mono">
                        {object.name}
                      </text>
                    </g>
                  ))}

                  {/* Scanner Position */}
                  <circle cx="128" cy="128" r="8" fill="#06b6d4" stroke="white" strokeWidth="2" />
                  <text x="140" y="135" fill="#06b6d4" fontSize="8" className="font-mono font-bold">
                    SCANNER
                  </text>
                </svg>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                <div className="text-center">
                  <div className="text-cyan-400 font-bold">OBJECTS CATALOGED</div>
                  <div className="text-white text-lg">{stellarObjects.length}</div>
                </div>
                <div className="text-center">
                  <div className="text-cyan-400 font-bold">SCAN RANGE</div>
                  <div className="text-white text-lg">50 LY</div>
                </div>
              </div>
            </div>

            <div className="flex-1 pl-4">
              <div className="text-xs text-cyan-400 mb-2 font-bold">STELLAR OBJECTS:</div>
              <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                {stellarObjects.map((object) => (
                  <div key={object.id} className="bg-gray-800/50 p-3 rounded border border-cyan-500/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-cyan-400 font-bold text-xs">{object.name}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          object.type === "EXOPLANET"
                            ? "bg-green-600 text-white"
                            : object.type === "SUPER-EARTH"
                              ? "bg-yellow-600 text-white"
                              : "bg-cyan-600 text-white"
                        }`}
                      >
                        {object.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-300">
                      <div>DIST: {object.distance}</div>
                      <div>COMP: {object.composition}</div>
                      <div>ATM: {object.atmosphere}</div>
                      <div>ID: #{object.id}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Science Controls */}
        <div className="space-y-4">
          {/* Deep Space Scanner */}
          <div
            className={`bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] science-panel-1 ${scannerActive ? "scanner-active" : ""}`}
          >
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
              DEEP SPACE SCANNER
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-2xl font-bold mb-2 ${scannerActive ? "text-green-400" : "text-cyan-400"}`}>
                  {scannerActive ? "SCANNING" : "READY"}
                </div>
                <Button
                  onClick={() => setScannerActive(!scannerActive)}
                  disabled={scannerActive}
                  className={`w-full ${
                    scannerActive
                      ? "bg-green-600 border-green-400 cursor-not-allowed"
                      : "bg-cyan-700 hover:bg-cyan-600 border-cyan-500"
                  } border-2 font-bold text-white`}
                >
                  {scannerActive ? "SCANNING..." : "START SCAN"}
                </Button>
              </div>

              {scannerActive && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-cyan-400">
                    <span>SCAN PROGRESS</span>
                    <span>{scanProgress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 border border-cyan-500/30">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-300 h-2 rounded-full transition-all duration-500 shadow-[0_0_8px_#22c55e]"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">TEMPERATURE:</span>
                  <span className="text-cyan-400">{sensorData.temperature.toFixed(1)}°K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">RADIATION:</span>
                  <span className="text-cyan-400">{sensorData.radiation.toFixed(2)} mSv/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">MAGNETIC FIELD:</span>
                  <span className="text-cyan-400">{sensorData.magneticField.toFixed(2)} μT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ENERGY SIGNATURES:</span>
                  <span className="text-cyan-400">{sensorData.energySignatures}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">LIFE SIGNS:</span>
                  <span className={sensorData.lifeSignsDetected ? "text-green-400" : "text-red-400"}>
                    {sensorData.lifeSignsDetected ? "DETECTED" : "NONE"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Spectral Analysis */}
          <div
            className={`bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] science-panel-2 ${analysisRunning ? "analysis-running" : ""}`}
          >
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
              SPECTRAL ANALYSIS
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <Button
                  onClick={() => setAnalysisRunning(!analysisRunning)}
                  disabled={analysisRunning}
                  className={`w-full ${
                    analysisRunning
                      ? "bg-cyan-600 border-cyan-400 cursor-not-allowed"
                      : "bg-cyan-700 hover:bg-cyan-600 border-cyan-500"
                  } border-2 font-bold text-white text-xs`}
                >
                  {analysisRunning ? "ANALYZING..." : "START ANALYSIS"}
                </Button>
              </div>

              {analysisRunning && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-cyan-400">
                    <span>ANALYSIS PROGRESS</span>
                    <span>{analysisProgress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 border border-cyan-500/30">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-2 rounded-full transition-all duration-500 shadow-[0_0_8px_#06b6d4]"
                      style={{ width: `${analysisProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                {spectralData.map((element) => (
                  <div key={element.element} className="bg-gray-800/50 p-2 rounded border border-cyan-500/30">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-cyan-400 font-bold text-xs">{element.element}</span>
                      <span className="text-xs text-gray-400">{element.wavelength} nm</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div
                        className="h-1 rounded-full spectral-line"
                        style={{
                          width: `${element.intensity}%`,
                          backgroundColor: element.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Research Projects */}
          <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] science-panel-3">
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">ACTIVE RESEARCH</div>

            <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
              {researchProjects.map((project) => (
                <div key={project.name} className="bg-gray-800/50 p-3 rounded border border-cyan-500/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-cyan-400 font-bold text-xs">{project.name}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        project.priority === "CRITICAL"
                          ? "bg-red-600 text-white"
                          : project.priority === "HIGH"
                            ? "bg-yellow-600 text-white"
                            : project.priority === "MEDIUM"
                              ? "bg-cyan-600 text-white"
                              : "bg-gray-600 text-white"
                      }`}
                    >
                      {project.priority}
                    </span>
                  </div>
                  <ProgressBar
                    label="PROGRESS"
                    value={project.progress}
                    color={project.priority === "CRITICAL" ? "red" : project.priority === "HIGH" ? "yellow" : "cyan"}
                  />
                  <div className="text-xs text-gray-400">ETA: {project.eta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Discoveries Panel */}
      <div className="max-w-7xl mx-auto mt-4">
        <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] science-panel-2">
          <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
            RECENT DISCOVERIES
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {discoveries.map((discovery) => (
              <div
                key={discovery.id}
                className={`bg-gray-800/50 p-3 rounded border border-cyan-500/30 ${
                  discovery.significance === "CRITICAL" ? "discovery-highlight" : ""
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-cyan-400 font-bold text-xs">{discovery.type}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      discovery.significance === "CRITICAL"
                        ? "bg-yellow-600 text-white"
                        : discovery.significance === "HIGH"
                          ? "bg-green-600 text-white"
                          : "bg-cyan-600 text-white"
                    }`}
                  >
                    {discovery.significance}
                  </span>
                </div>
                <div className="text-xs text-gray-300 mb-2">{discovery.classification}</div>
                <div className="text-xs text-gray-400 mb-2">{discovery.location}</div>
                <div className="text-xs text-cyan-400">{discovery.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
