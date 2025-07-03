"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const panelStyles = `
  .defense-panel-1 {
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%);
  }
  
  .defense-panel-2 {
    clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
  }
  
  .defense-panel-3 {
    clip-path: polygon(0 15px, 15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px));
  }
  
  .defense-panel-4 {
    clip-path: polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px);
  }

  .shield-active {
    animation: shieldPulse 2s ease-in-out infinite;
  }

  @keyframes shieldPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); }
    50% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.8); }
  }

  .weapon-charging {
    animation: weaponCharge 1.5s ease-in-out infinite;
  }

  @keyframes weaponCharge {
    0%, 100% { box-shadow: 0 0 15px rgba(239, 68, 68, 0.4); }
    50% { box-shadow: 0 0 25px rgba(239, 68, 68, 0.8); }
  }

  .threat-high {
    animation: threatAlert 1s ease-in-out infinite;
  }

  @keyframes threatAlert {
    0%, 100% { background-color: rgba(239, 68, 68, 0.1); }
    50% { background-color: rgba(239, 68, 68, 0.3); }
  }

  .radar-sweep {
    stroke-dasharray: 5,5;
    animation: radarSweep 3s linear infinite;
  }

  @keyframes radarSweep {
    to {
      stroke-dashoffset: -10;
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

export default function DefensePage() {
  const [shieldsActive, setShieldsActive] = useState(true)
  const [weaponsArmed, setWeaponsArmed] = useState(false)
  const [radarAngle, setRadarAngle] = useState(0)
  const [shieldStrength, setShieldStrength] = useState(87)
  const [weaponCharge, setWeaponCharge] = useState(45)
  const [defenseMode, setDefenseMode] = useState<"PASSIVE" | "ACTIVE" | "COMBAT">("PASSIVE")

  const [threats, setThreats] = useState([
    {
      id: 1,
      type: "HOSTILE VESSEL",
      distance: "15.2 KM",
      bearing: "047°",
      threat: "HIGH",
      speed: "3.2 KM/S",
      weapons: "ARMED",
      x: 320,
      y: 80,
    },
    {
      id: 2,
      type: "DEBRIS FIELD",
      distance: "8.7 KM",
      bearing: "134°",
      threat: "MEDIUM",
      speed: "0.8 KM/S",
      weapons: "N/A",
      x: 180,
      y: 200,
    },
    {
      id: 3,
      type: "UNKNOWN CRAFT",
      distance: "22.1 KM",
      bearing: "289°",
      threat: "LOW",
      speed: "1.1 KM/S",
      weapons: "UNKNOWN",
      x: 100,
      y: 150,
    },
  ])

  const [weaponSystems] = useState([
    { name: "PLASMA CANNONS", status: "READY", charge: 100, temperature: 23 },
    { name: "MISSILE PODS", status: "ARMED", charge: 85, temperature: 18 },
    { name: "LASER ARRAY", status: "CHARGING", charge: 67, temperature: 45 },
    { name: "EMP TORPEDOES", status: "STANDBY", charge: 30, temperature: 12 },
  ])

  const [shieldSectors] = useState([
    { name: "FORWARD", strength: 92, status: "OPTIMAL" },
    { name: "AFT", strength: 78, status: "STABLE" },
    { name: "PORT", strength: 85, status: "OPTIMAL" },
    { name: "STARBOARD", strength: 88, status: "OPTIMAL" },
  ])

  // Animate radar sweep
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarAngle((prev) => (prev + 3) % 360)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Simulate defense system updates
  useEffect(() => {
    const interval = setInterval(() => {
      setShieldStrength((prev) => Math.max(75, Math.min(95, prev + (Math.random() - 0.5) * 5)))
      setWeaponCharge((prev) => {
        if (weaponsArmed) {
          return Math.min(100, prev + Math.random() * 10)
        }
        return Math.max(30, prev - Math.random() * 5)
      })

      setThreats((prev) =>
        prev.map((threat) => ({
          ...threat,
          distance: `${(Number.parseFloat(threat.distance) + (Math.random() - 0.5) * 2).toFixed(1)} KM`,
          bearing: `${(Number.parseFloat(threat.bearing.replace("°", "")) + (Math.random() - 0.5) * 5).toFixed(0)}°`,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [weaponsArmed])

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
          <h1 className="text-2xl font-bold text-cyan-400">DEFENSE CONTROL SYSTEM</h1>
        </div>
        <div className="text-sm text-gray-400">Shield Management • Weapon Systems • Threat Assessment</div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Threat Detection Radar - Large Panel */}
        <div className="lg:col-span-2 bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] defense-panel-4">
          <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
            THREAT DETECTION RADAR
          </div>

          <div className="flex">
            <div className="flex-1 flex flex-col items-center">
              <div className="relative w-64 h-64 bg-gray-900 rounded border border-cyan-500/30">
                <svg width="256" height="256" className="absolute inset-0">
                  {/* Radar Grid */}
                  {[1, 2, 3, 4].map((i) => (
                    <circle
                      key={i}
                      cx="128"
                      cy="128"
                      r={i * 30}
                      stroke="rgba(6, 182, 212, 0.3)"
                      strokeWidth="1"
                      fill="transparent"
                    />
                  ))}
                  <line x1="128" y1="8" x2="128" y2="248" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
                  <line x1="8" y1="128" x2="248" y2="128" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />

                  {/* Radar Sweep */}
                  <line
                    x1="128"
                    y1="128"
                    x2={128 + 120 * Math.cos((radarAngle * Math.PI) / 180)}
                    y2={128 + 120 * Math.sin((radarAngle * Math.PI) / 180)}
                    stroke="#06b6d4"
                    strokeWidth="2"
                    className="drop-shadow-[0_0_8px_#06b6d4]"
                  />

                  {/* Threats */}
                  {threats.map((threat) => (
                    <g key={threat.id}>
                      <circle
                        cx={threat.x}
                        cy={threat.y}
                        r="6"
                        fill={threat.threat === "HIGH" ? "#ef4444" : threat.threat === "MEDIUM" ? "#eab308" : "#22c55e"}
                        stroke="white"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                      <text
                        x={threat.x + 10}
                        y={threat.y - 10}
                        fill={threat.threat === "HIGH" ? "#ef4444" : threat.threat === "MEDIUM" ? "#eab308" : "#22c55e"}
                        fontSize="8"
                        className="font-mono"
                      >
                        T{threat.id}
                      </text>
                    </g>
                  ))}

                  {/* Ship Position */}
                  <circle cx="128" cy="128" r="8" fill="#06b6d4" stroke="white" strokeWidth="2" />
                  <text x="140" y="135" fill="#06b6d4" fontSize="8" className="font-mono font-bold">
                    SHIP
                  </text>
                </svg>
              </div>
              <div className="text-xs text-cyan-400 mt-2 text-center">
                <div>SCAN RANGE: 25KM</div>
                <div>THREATS: {threats.length}</div>
                <div
                  className={`font-bold ${defenseMode === "COMBAT" ? "text-red-400" : defenseMode === "ACTIVE" ? "text-yellow-400" : "text-green-400"}`}
                >
                  MODE: {defenseMode}
                </div>
              </div>
            </div>

            <div className="flex-1 pl-4">
              <div className="text-xs text-cyan-400 mb-2 font-bold">DETECTED THREATS:</div>
              <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                {threats.map((threat) => (
                  <div
                    key={threat.id}
                    className={`bg-gray-800/50 p-3 rounded border border-cyan-500/30 ${
                      threat.threat === "HIGH" ? "threat-high" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-cyan-400 font-bold text-xs">{threat.type}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded font-bold ${
                          threat.threat === "HIGH"
                            ? "bg-red-600 text-white"
                            : threat.threat === "MEDIUM"
                              ? "bg-yellow-600 text-white"
                              : "bg-green-600 text-white"
                        }`}
                      >
                        {threat.threat}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-300">
                      <div>DIST: {threat.distance}</div>
                      <div>BEAR: {threat.bearing}</div>
                      <div>SPEED: {threat.speed}</div>
                      <div>WPNS: {threat.weapons}</div>
                    </div>
                    {threat.threat === "HIGH" && (
                      <div className="mt-2 text-xs text-red-400 font-bold animate-pulse">⚠ IMMEDIATE THREAT ⚠</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Defense Controls */}
        <div className="space-y-4">
          {/* Shield Control */}
          <div
            className={`bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] defense-panel-1 ${shieldsActive ? "shield-active" : ""}`}
          >
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">SHIELD CONTROL</div>

            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-2xl font-bold mb-2 ${shieldsActive ? "text-green-400" : "text-red-400"}`}>
                  {shieldsActive ? "ACTIVE" : "OFFLINE"}
                </div>
                <div className="text-lg text-cyan-400 mb-3">{shieldStrength}% STRENGTH</div>
                <Button
                  onClick={() => setShieldsActive(!shieldsActive)}
                  className={`w-full ${
                    shieldsActive
                      ? "bg-green-600 hover:bg-green-700 border-green-400"
                      : "bg-red-700 hover:bg-red-600 border-red-500"
                  } border-2 font-bold text-white`}
                >
                  {shieldsActive ? "DEACTIVATE" : "ACTIVATE"} SHIELDS
                </Button>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-cyan-400 font-bold">SECTOR STATUS:</div>
                {shieldSectors.map((sector) => (
                  <div key={sector.name} className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">{sector.name}:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400">{sector.strength}%</span>
                      <span
                        className={`px-1 rounded text-xs ${
                          sector.status === "OPTIMAL" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"
                        }`}
                      >
                        {sector.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weapon Systems */}
          <div
            className={`bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] defense-panel-2 ${weaponsArmed ? "weapon-charging" : ""}`}
          >
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">WEAPON SYSTEMS</div>

            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-lg font-bold mb-2 ${weaponsArmed ? "text-red-400" : "text-cyan-400"}`}>
                  {weaponsArmed ? "ARMED" : "STANDBY"}
                </div>
                <div className="text-sm text-cyan-400 mb-3">CHARGE: {weaponCharge.toFixed(0)}%</div>
                <Button
                  onClick={() => setWeaponsArmed(!weaponsArmed)}
                  className={`w-full ${
                    weaponsArmed
                      ? "bg-red-600 hover:bg-red-700 border-red-400"
                      : "bg-gray-700 hover:bg-gray-600 border-cyan-500"
                  } border-2 font-bold text-white`}
                >
                  {weaponsArmed ? "DISARM" : "ARM"} WEAPONS
                </Button>
              </div>

              <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                {weaponSystems.map((weapon) => (
                  <div key={weapon.name} className="bg-gray-800/50 p-2 rounded border border-cyan-500/30">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-cyan-400 font-bold text-xs">{weapon.name}</span>
                      <span
                        className={`text-xs px-1 rounded ${
                          weapon.status === "READY"
                            ? "bg-green-600 text-white"
                            : weapon.status === "ARMED"
                              ? "bg-red-600 text-white"
                              : weapon.status === "CHARGING"
                                ? "bg-yellow-600 text-white"
                                : "bg-gray-600 text-white"
                        }`}
                      >
                        {weapon.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>CHARGE: {weapon.charge}%</span>
                      <span>TEMP: {weapon.temperature}°C</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Defense Mode */}
          <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] defense-panel-3">
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">DEFENSE MODE</div>

            <div className="space-y-3">
              {(["PASSIVE", "ACTIVE", "COMBAT"] as const).map((mode) => (
                <Button
                  key={mode}
                  onClick={() => setDefenseMode(mode)}
                  className={`w-full text-xs font-bold border-2 ${
                    defenseMode === mode
                      ? mode === "COMBAT"
                        ? "bg-red-600 border-red-400 text-white"
                        : mode === "ACTIVE"
                          ? "bg-yellow-600 border-yellow-400 text-white"
                          : "bg-green-600 border-green-400 text-white"
                      : "bg-gray-700 border-gray-500 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {mode}
                </Button>
              ))}
            </div>

            <div className="mt-4 text-xs text-gray-400">
              <div className="mb-2">
                <span className="text-cyan-400 font-bold">CURRENT MODE:</span>
              </div>
              <div className="text-xs">
                {defenseMode === "PASSIVE" && "Shields active, weapons on standby"}
                {defenseMode === "ACTIVE" && "Enhanced scanning, weapons ready"}
                {defenseMode === "COMBAT" && "All systems armed, auto-engage threats"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
