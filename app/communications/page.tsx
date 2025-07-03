"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const panelStyles = `
  .comm-panel-1 {
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%);
  }
  
  .comm-panel-2 {
    clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
  }
  
  .comm-panel-3 {
    clip-path: polygon(0 15px, 15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px));
  }
  
  .comm-panel-4 {
    clip-path: polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px);
  }

  .signal-active {
    animation: signalPulse 2s ease-in-out infinite;
  }

  @keyframes signalPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); }
    50% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.8); }
  }

  .emergency-active {
    animation: emergencyFlash 1s ease-in-out infinite;
  }

  @keyframes emergencyFlash {
    0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.4); }
    50% { box-shadow: 0 0 40px rgba(239, 68, 68, 0.8); }
  }

  .encrypted-channel {
    animation: encryptedGlow 2s ease-in-out infinite;
  }

  @keyframes encryptedGlow {
    0%, 100% { background-color: rgba(234, 179, 8, 0.1); }
    50% { background-color: rgba(234, 179, 8, 0.3); }
  }

  .signal-wave {
    stroke-dasharray: 6,3;
    animation: signalWave 2s linear infinite;
  }

  @keyframes signalWave {
    to {
      stroke-dashoffset: -9;
    }
  }

  .frequency-scan {
    animation: frequencyScan 4s ease-in-out infinite;
  }

  @keyframes frequencyScan {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  .transmission-active {
    animation: transmissionPulse 1.5s ease-in-out infinite;
  }

  @keyframes transmissionPulse {
    0%, 100% { background-color: rgba(6, 182, 212, 0.1); }
    50% { background-color: rgba(6, 182, 212, 0.3); }
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

export default function CommunicationsPage() {
  const [emergencyMode, setEmergencyMode] = useState(false)
  const [signalStrength, setSignalStrength] = useState(87)
  const [activeChannels, setActiveChannels] = useState(3)
  const [encryptionActive, setEncryptionActive] = useState(true)
  const [subspaceRelay, setSubspaceRelay] = useState(true)
  const [scanningFrequencies, setScanningFrequencies] = useState(false)

  const [newMessage, setNewMessage] = useState("")
  const [selectedChannel, setSelectedChannel] = useState("COMMAND")
  const [showMessageInput, setShowMessageInput] = useState(false)

  const [communicationChannels, setCommunicationChannels] = useState([
    {
      id: 1,
      name: "STARFLEET COMMAND",
      frequency: "147.52 MHz",
      status: "ACTIVE",
      encryption: "AES-256",
      range: "UNLIMITED",
      signalStrength: 92,
      lastContact: "14:23:17",
    },
    {
      id: 2,
      name: "DEEP SPACE NINE",
      frequency: "223.84 MHz",
      status: "STANDBY",
      encryption: "QUANTUM",
      range: "50 LY",
      signalStrength: 78,
      lastContact: "14:18:42",
    },
    {
      id: 3,
      name: "EMERGENCY BEACON",
      frequency: "121.50 MHz",
      status: "MONITORING",
      encryption: "NONE",
      range: "SYSTEM-WIDE",
      signalStrength: 95,
      lastContact: "14:15:09",
    },
    {
      id: 4,
      name: "MERCHANT VESSEL",
      frequency: "189.73 MHz",
      status: "INACTIVE",
      encryption: "BASIC",
      range: "5 LY",
      signalStrength: 34,
      lastContact: "13:47:23",
    },
  ])

  const [communicationLog, setCommunicationLog] = useState([
    {
      id: 1,
      timestamp: "14:32:15",
      channel: "STARFLEET COMMAND",
      sender: "ADM. ROSS",
      message: "Mission parameters updated. Proceed to Sector 7 for rendezvous.",
      priority: "HIGH",
      encrypted: true,
    },
    {
      id: 2,
      timestamp: "14:28:43",
      channel: "DEEP SPACE NINE",
      sender: "OPS",
      message: "Docking bay 3 reserved for your arrival. ETA confirmed.",
      priority: "MEDIUM",
      encrypted: false,
    },
    {
      id: 3,
      timestamp: "14:25:17",
      channel: "STARFLEET COMMAND",
      sender: "TACTICAL",
      message: "Threat assessment complete. All clear for current trajectory.",
      priority: "LOW",
      encrypted: true,
    },
    {
      id: 4,
      timestamp: "14:21:09",
      channel: "MERCHANT VESSEL",
      sender: "CAPT. TORRES",
      message: "Thanks for the escort through the asteroid field. Safe travels.",
      priority: "LOW",
      encrypted: false,
    },
  ])

  const [signalAnalysis, setSignalAnalysis] = useState([
    { frequency: 147.52, amplitude: 85, noise: 12, quality: "EXCELLENT" },
    { frequency: 223.84, amplitude: 67, noise: 23, quality: "GOOD" },
    { frequency: 121.5, amplitude: 92, noise: 8, quality: "EXCELLENT" },
    { frequency: 189.73, amplitude: 34, noise: 45, quality: "POOR" },
    { frequency: 456.12, amplitude: 15, noise: 67, quality: "WEAK" },
  ])

  const [knownContacts] = useState([
    { name: "STARFLEET COMMAND", type: "COMMAND", status: "ALLIED", distance: "∞" },
    { name: "DEEP SPACE NINE", type: "STATION", status: "ALLIED", distance: "12.4 LY" },
    { name: "USS ENTERPRISE", type: "STARSHIP", status: "ALLIED", distance: "8.7 LY" },
    { name: "KLINGON VESSEL", type: "WARSHIP", status: "NEUTRAL", distance: "23.1 LY" },
    { name: "ROMULAN SCOUT", type: "SCOUT", status: "HOSTILE", distance: "45.6 LY" },
    { name: "TRADING POST", type: "CIVILIAN", status: "NEUTRAL", distance: "15.3 LY" },
  ])

  // Simulate signal strength fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength((prev) => Math.max(70, Math.min(95, prev + (Math.random() - 0.5) * 8)))

      setCommunicationChannels((prev) =>
        prev.map((channel) => ({
          ...channel,
          signalStrength: Math.max(20, Math.min(100, channel.signalStrength + (Math.random() - 0.5) * 10)),
        })),
      )

      setSignalAnalysis((prev) =>
        prev.map((signal) => ({
          ...signal,
          amplitude: Math.max(10, Math.min(100, signal.amplitude + (Math.random() - 0.5) * 15)),
          noise: Math.max(5, Math.min(80, signal.noise + (Math.random() - 0.5) * 10)),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Add new messages periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newMessages = [
        {
          channel: "STARFLEET COMMAND",
          sender: "FLEET OPS",
          message: "Routine status check. Please confirm all systems operational.",
          priority: "LOW",
        },
        {
          channel: "DEEP SPACE NINE",
          sender: "SECURITY",
          message: "Security alert lifted. All vessels cleared for normal operations.",
          priority: "MEDIUM",
        },
        {
          channel: "EMERGENCY BEACON",
          sender: "AUTO-BEACON",
          message: "Emergency frequency test. This is a scheduled transmission.",
          priority: "LOW",
        },
      ]

      const randomMessage = newMessages[Math.floor(Math.random() * newMessages.length)]
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })

      setCommunicationLog((prev) => [
        {
          id: prev.length + 1,
          timestamp: currentTime,
          channel: randomMessage.channel,
          sender: randomMessage.sender,
          message: randomMessage.message,
          priority: randomMessage.priority as "HIGH" | "MEDIUM" | "LOW",
          encrypted: Math.random() > 0.5,
        },
        ...prev.slice(0, 9), // Keep only last 10 messages
      ])
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })

      setCommunicationLog((prev) => [
        {
          id: prev.length + 1,
          timestamp: currentTime,
          channel: selectedChannel,
          sender: "SHIP COMM",
          message: newMessage,
          priority: "MEDIUM" as const,
          encrypted: encryptionActive,
        },
        ...prev.slice(0, 9),
      ])

      setNewMessage("")
      setShowMessageInput(false)
    }
  }

  const toggleChannelStatus = (channelId: number) => {
    setCommunicationChannels((prev) =>
      prev.map((channel) =>
        channel.id === channelId
          ? {
              ...channel,
              status: channel.status === "ACTIVE" ? "STANDBY" : "ACTIVE",
            }
          : channel,
      ),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-green-400"
      case "STANDBY":
        return "text-yellow-400"
      case "MONITORING":
        return "text-cyan-400"
      case "INACTIVE":
        return "text-gray-400"
      default:
        return "text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-600 text-white"
      case "MEDIUM":
        return "bg-yellow-600 text-white"
      case "LOW":
        return "bg-cyan-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getContactStatusColor = (status: string) => {
    switch (status) {
      case "ALLIED":
        return "text-green-400"
      case "NEUTRAL":
        return "text-yellow-400"
      case "HOSTILE":
        return "text-red-400"
      default:
        return "text-gray-400"
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
          <h1 className="text-2xl font-bold text-cyan-400">COMMUNICATIONS CONTROL SYSTEM</h1>
        </div>
        <div className="text-sm text-gray-400">Subspace Communications • Signal Analysis • Channel Management</div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Communications Display - Large Panel */}
        <div
          className={`lg:col-span-2 bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] comm-panel-4 ${emergencyMode ? "emergency-active" : ""}`}
        >
          <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
            COMMUNICATION CHANNELS & SIGNAL ANALYSIS
          </div>

          <div className="flex">
            <div className="flex-1 flex flex-col items-center">
              <div className="relative w-64 h-64 bg-gray-900 rounded border border-cyan-500/30">
                <svg width="256" height="256" className="absolute inset-0">
                  {/* Signal Analysis Grid */}
                  <defs>
                    <pattern id="commGrid" width="32" height="32" patternUnits="userSpaceOnUse">
                      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#commGrid)" />

                  {/* Signal Strength Visualization */}
                  {signalAnalysis.map((signal, index) => (
                    <g key={index}>
                      <line
                        x1={40 + index * 35}
                        y1={200}
                        x2={40 + index * 35}
                        y2={200 - signal.amplitude * 1.5}
                        stroke={
                          signal.quality === "EXCELLENT"
                            ? "#22c55e"
                            : signal.quality === "GOOD"
                              ? "#eab308"
                              : signal.quality === "POOR"
                                ? "#f97316"
                                : "#ef4444"
                        }
                        strokeWidth="4"
                        className="frequency-scan"
                      />
                      <text
                        x={40 + index * 35}
                        y={220}
                        fill="#06b6d4"
                        fontSize="8"
                        className="font-mono"
                        textAnchor="middle"
                      >
                        {signal.frequency}
                      </text>
                    </g>
                  ))}

                  {/* Signal Waves */}
                  <path
                    d="M 20 128 Q 60 100 100 128 T 180 128 T 240 128"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    fill="none"
                    className="signal-wave"
                  />
                  <path
                    d="M 20 140 Q 60 160 100 140 T 180 140 T 240 140"
                    stroke="#22c55e"
                    strokeWidth="2"
                    fill="none"
                    className="signal-wave"
                    style={{ animationDelay: "0.5s" }}
                  />

                  {/* Central Communication Hub */}
                  <circle cx="128" cy="80" r="20" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2" />
                  <text x="128" y="85" fill="#06b6d4" fontSize="8" className="font-mono" textAnchor="middle">
                    COMM HUB
                  </text>
                </svg>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
                <div className="text-center">
                  <div className="text-cyan-400 font-bold">SIGNAL STRENGTH</div>
                  <div className="text-white text-lg">{signalStrength.toFixed(2)}%</div>
                </div>
                <div className="text-center">
                  <div className="text-cyan-400 font-bold">ACTIVE CHANNELS</div>
                  <div className="text-white text-lg">{activeChannels}</div>
                </div>
                <div className="text-center">
                  <div className="text-cyan-400 font-bold">ENCRYPTION</div>
                  <div className={`text-lg ${encryptionActive ? "text-green-400" : "text-red-400"}`}>
                    {encryptionActive ? "ACTIVE" : "OFF"}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 pl-4">
              <div className="text-xs text-cyan-400 mb-2 font-bold">COMMUNICATION LOG:</div>
              <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                {communicationLog.map((log) => (
                  <div
                    key={log.id}
                    className={`bg-gray-800/50 p-3 rounded border border-cyan-500/30 ${
                      log.priority === "HIGH" ? "transmission-active" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-cyan-400 font-bold text-xs">{log.sender}</span>
                      <div className="flex items-center gap-2">
                        {log.encrypted && <span className="text-yellow-400 text-xs">🔒</span>}
                        <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(log.priority)}`}>
                          {log.priority}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-300 mb-1">{log.message}</div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{log.channel}</span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Communication Controls */}
        <div className="space-y-4">
          {/* Channel Management */}
          <div
            className={`bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] comm-panel-1 ${subspaceRelay ? "signal-active" : ""}`}
          >
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
              CHANNEL MANAGEMENT
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-lg font-bold mb-2 ${subspaceRelay ? "text-green-400" : "text-red-400"}`}>
                  SUBSPACE RELAY
                </div>
                <div className="text-sm text-cyan-400 mb-3">{subspaceRelay ? "ONLINE" : "OFFLINE"}</div>
                <Button
                  onClick={() => setSubspaceRelay(!subspaceRelay)}
                  className={`w-full ${
                    subspaceRelay
                      ? "bg-green-600 hover:bg-green-700 border-green-400"
                      : "bg-red-700 hover:bg-red-600 border-red-500"
                  } border-2 font-bold text-white text-xs`}
                >
                  {subspaceRelay ? "DISABLE" : "ENABLE"} RELAY
                </Button>
              </div>

              <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                {communicationChannels.slice(0, 3).map((channel) => (
                  <div key={channel.id} className="bg-gray-800/50 p-2 rounded border border-cyan-500/30">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-cyan-400 font-bold text-xs">{channel.name}</span>
                      <Button
                        onClick={() => toggleChannelStatus(channel.id)}
                        className={`text-xs px-2 py-1 ${
                          channel.status === "ACTIVE"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-600 hover:bg-gray-500"
                        } text-white`}
                      >
                        {channel.status}
                      </Button>
                    </div>
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>{channel.frequency}</span>
                      <span>{channel.signalStrength.toFixed(2)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Message Composer */}
          <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] comm-panel-2">
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
              MESSAGE COMPOSER
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-cyan-400 text-xs font-bold block mb-1">CHANNEL:</label>
                <select
                  value={selectedChannel}
                  onChange={(e) => setSelectedChannel(e.target.value)}
                  className="w-full bg-gray-800 border border-cyan-500/30 rounded px-3 py-2 text-cyan-400 text-xs font-mono focus:outline-none focus:border-cyan-400"
                >
                  {communicationChannels.map((channel) => (
                    <option key={channel.id} value={channel.name}>
                      {channel.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="encryption"
                  checked={encryptionActive}
                  onChange={(e) => setEncryptionActive(e.target.checked)}
                  className="text-cyan-400"
                />
                <label htmlFor="encryption" className="text-cyan-400 text-xs">
                  ENCRYPT MESSAGE
                </label>
              </div>

              {showMessageInput ? (
                <div className="space-y-2">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="ENTER MESSAGE..."
                    className="w-full bg-gray-800 border border-cyan-500/30 rounded px-3 py-2 text-cyan-400 text-xs font-mono placeholder-gray-500 focus:outline-none focus:border-cyan-400 h-20 resize-none"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={sendMessage}
                      className="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white border border-cyan-500 text-xs"
                    >
                      SEND
                    </Button>
                    <Button
                      onClick={() => {
                        setShowMessageInput(false)
                        setNewMessage("")
                      }}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white border border-gray-500 text-xs"
                    >
                      CANCEL
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setShowMessageInput(true)}
                  className="w-full bg-cyan-700 hover:bg-cyan-600 text-white border border-cyan-500 text-xs"
                >
                  COMPOSE MESSAGE
                </Button>
              )}

              <Button
                onClick={() => setEmergencyMode(!emergencyMode)}
                className={`w-full ${
                  emergencyMode
                    ? "bg-red-600 hover:bg-red-700 border-red-400 animate-pulse"
                    : "bg-red-800 hover:bg-red-700 border-red-500"
                } border-2 font-bold text-white text-xs`}
              >
                {emergencyMode ? "🚨 EMERGENCY ACTIVE 🚨" : "EMERGENCY BROADCAST"}
              </Button>
            </div>
          </div>

          {/* Known Contacts */}
          <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] comm-panel-3">
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">KNOWN CONTACTS</div>

            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
              {knownContacts.map((contact, index) => (
                <div key={index} className="bg-gray-800/50 p-2 rounded border border-cyan-500/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-cyan-400 font-bold text-xs">{contact.name}</span>
                    <span className={`text-xs font-bold ${getContactStatusColor(contact.status)}`}>
                      {contact.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-300">
                    <span>{contact.type}</span>
                    <span>{contact.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
