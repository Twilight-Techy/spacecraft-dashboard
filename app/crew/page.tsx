"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const panelStyles = `
  .crew-panel-1 {
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%);
  }
  
  .crew-panel-2 {
    clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
  }
  
  .crew-panel-3 {
    clip-path: polygon(0 15px, 15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px));
  }
  
  .crew-panel-4 {
    clip-path: polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px);
  }

  .medical-alert {
    animation: medicalPulse 2s ease-in-out infinite;
  }

  @keyframes medicalPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.4); }
    50% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.8); }
  }

  .crew-active {
    animation: crewActive 2s ease-in-out infinite;
  }

  @keyframes crewActive {
    0%, 100% { box-shadow: 0 0 15px rgba(34, 197, 94, 0.4); }
    50% { box-shadow: 0 0 25px rgba(34, 197, 94, 0.8); }
  }

  .assignment-highlight {
    animation: assignmentGlow 1.5s ease-in-out infinite;
  }

  @keyframes assignmentGlow {
    0%, 100% { background-color: rgba(6, 182, 212, 0.1); }
    50% { background-color: rgba(6, 182, 212, 0.3); }
  }

  .vitals-critical {
    animation: vitalsCritical 1s ease-in-out infinite;
  }

  @keyframes vitalsCritical {
    0%, 100% { background-color: rgba(239, 68, 68, 0.1); }
    50% { background-color: rgba(239, 68, 68, 0.3); }
  }

  .duty-rotation {
    stroke-dasharray: 8,4;
    animation: dutyRotation 6s linear infinite;
  }

  @keyframes dutyRotation {
    to {
      stroke-dashoffset: -12;
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

export default function CrewPage() {
  const [selectedCrew, setSelectedCrew] = useState<number | null>(null)
  const [emergencyMode, setEmergencyMode] = useState(false)
  const [dutyRotationAngle, setDutyRotationAngle] = useState(0)

  const [showAssignmentModal, setShowAssignmentModal] = useState(false)
  const [newAssignment, setNewAssignment] = useState({
    task: "",
    assignedTo: "",
    priority: "MEDIUM" as "CRITICAL" | "HIGH" | "MEDIUM",
    duration: "",
  })

  const [crewMembers, setCrewMembers] = useState([
    {
      id: 1,
      name: "SARAH CHEN",
      rank: "COMMANDER",
      department: "COMMAND",
      status: "ON DUTY",
      location: "BRIDGE",
      vitals: {
        heartRate: 72,
        bloodPressure: "120/80",
        oxygenSat: 98,
        temperature: 98.6,
        stress: 25,
      },
      skills: ["LEADERSHIP", "TACTICAL", "DIPLOMACY"],
      assignment: "MISSION COMMAND",
      shiftEnd: "18:00",
      x: 200,
      y: 100,
    },
    {
      id: 2,
      name: "MARCUS WRIGHT",
      rank: "LT. COMMANDER",
      department: "ENGINEERING",
      status: "ON DUTY",
      location: "ENGINE ROOM",
      vitals: {
        heartRate: 85,
        bloodPressure: "135/85",
        oxygenSat: 97,
        temperature: 99.2,
        stress: 45,
      },
      skills: ["ENGINEERING", "REPAIR", "SYSTEMS"],
      assignment: "WARP CORE MAINTENANCE",
      shiftEnd: "20:00",
      x: 150,
      y: 200,
    },
    {
      id: 3,
      name: "DR. ELENA VASQUEZ",
      rank: "CHIEF MEDICAL",
      department: "MEDICAL",
      status: "ON DUTY",
      location: "SICKBAY",
      vitals: {
        heartRate: 68,
        bloodPressure: "115/75",
        oxygenSat: 99,
        temperature: 98.4,
        stress: 15,
      },
      skills: ["MEDICINE", "SURGERY", "XENOBIOLOGY"],
      assignment: "CREW HEALTH MONITORING",
      shiftEnd: "16:00",
      x: 300,
      y: 150,
    },
    {
      id: 4,
      name: "ALEX TORRES",
      rank: "LIEUTENANT",
      department: "SECURITY",
      status: "OFF DUTY",
      location: "QUARTERS",
      vitals: {
        heartRate: 60,
        bloodPressure: "110/70",
        oxygenSat: 98,
        temperature: 98.1,
        stress: 10,
      },
      skills: ["COMBAT", "TACTICS", "INVESTIGATION"],
      assignment: "SECURITY PATROL",
      shiftEnd: "08:00",
      x: 250,
      y: 220,
    },
    {
      id: 5,
      name: "YUKI TANAKA",
      rank: "ENSIGN",
      department: "SCIENCE",
      status: "ON DUTY",
      location: "SCIENCE LAB",
      vitals: {
        heartRate: 78,
        bloodPressure: "125/82",
        oxygenSat: 96,
        temperature: 99.8,
        stress: 55,
      },
      skills: ["RESEARCH", "ANALYSIS", "XENOARCHAEOLOGY"],
      assignment: "ARTIFACT ANALYSIS",
      shiftEnd: "22:00",
      x: 180,
      y: 160,
    },
    {
      id: 6,
      name: "JAMES OKAFOR",
      rank: "PETTY OFFICER",
      department: "OPERATIONS",
      status: "ON DUTY",
      location: "OPS CENTER",
      vitals: {
        heartRate: 74,
        bloodPressure: "118/78",
        oxygenSat: 97,
        temperature: 98.3,
        stress: 30,
      },
      skills: ["COMMUNICATIONS", "LOGISTICS", "COORDINATION"],
      assignment: "SUPPLY MANAGEMENT",
      shiftEnd: "14:00",
      x: 320,
      y: 180,
    },
  ])

  const [assignments, setAssignments] = useState([
    { id: 1, task: "BRIDGE DUTY", assignedTo: "SARAH CHEN", priority: "CRITICAL", duration: "8 HRS" },
    { id: 2, task: "ENGINE MAINTENANCE", assignedTo: "MARCUS WRIGHT", priority: "HIGH", duration: "6 HRS" },
    { id: 3, task: "MEDICAL CHECKUPS", assignedTo: "DR. ELENA VASQUEZ", priority: "MEDIUM", duration: "4 HRS" },
    { id: 4, task: "SECURITY SWEEP", assignedTo: "UNASSIGNED", priority: "HIGH", duration: "3 HRS" },
    { id: 5, task: "RESEARCH PROJECT", assignedTo: "YUKI TANAKA", priority: "MEDIUM", duration: "12 HRS" },
  ])

  const [medicalAlerts] = useState([
    {
      id: 1,
      crewMember: "YUKI TANAKA",
      alert: "ELEVATED STRESS LEVELS",
      severity: "MEDIUM",
      timestamp: "14:23:17",
    },
    {
      id: 2,
      crewMember: "MARCUS WRIGHT",
      alert: "ELEVATED TEMPERATURE",
      severity: "LOW",
      timestamp: "14:18:42",
    },
  ])

  const addAssignment = () => {
    if (newAssignment.task.trim() && newAssignment.duration.trim()) {
      const assignment = {
        id: assignments.length + 1,
        task: newAssignment.task.toUpperCase(),
        assignedTo: newAssignment.assignedTo || "UNASSIGNED",
        priority: newAssignment.priority,
        duration: newAssignment.duration.toUpperCase(),
      }
      setAssignments([...assignments, assignment])
      setNewAssignment({ task: "", assignedTo: "", priority: "MEDIUM", duration: "" })
      setShowAssignmentModal(false)
    }
  }

  const removeAssignment = (id: number) => {
    setAssignments(assignments.filter((a) => a.id !== id))
  }

  const reassignTask = (assignmentId: number, newAssignee: string) => {
    setAssignments(assignments.map((a) => (a.id === assignmentId ? { ...a, assignedTo: newAssignee } : a)))
  }

  // Animate duty rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setDutyRotationAngle((prev) => (prev + 2) % 360)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Simulate vital signs updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCrewMembers((prev) =>
        prev.map((member) => ({
          ...member,
          vitals: {
            ...member.vitals,
            heartRate: Math.max(60, Math.min(100, member.vitals.heartRate + (Math.random() - 0.5) * 6)),
            oxygenSat: Math.max(95, Math.min(100, member.vitals.oxygenSat + (Math.random() - 0.5) * 2)),
            temperature: Math.max(97, Math.min(101, member.vitals.temperature + (Math.random() - 0.5) * 0.5)),
            stress: Math.max(0, Math.min(100, member.vitals.stress + (Math.random() - 0.5) * 10)),
          },
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ON DUTY":
        return "text-green-400"
      case "OFF DUTY":
        return "text-cyan-400"
      case "MEDICAL":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "COMMAND":
        return "#fbbf24"
      case "ENGINEERING":
        return "#f59e0b"
      case "MEDICAL":
        return "#ef4444"
      case "SECURITY":
        return "#dc2626"
      case "SCIENCE":
        return "#06b6d4"
      case "OPERATIONS":
        return "#22c55e"
      default:
        return "#6b7280"
    }
  }

  const getVitalStatus = (vital: string, value: number) => {
    switch (vital) {
      case "heartRate":
        return value > 90 || value < 60 ? "critical" : value > 80 || value < 65 ? "warning" : "normal"
      case "oxygenSat":
        return value < 96 ? "critical" : value < 98 ? "warning" : "normal"
      case "temperature":
        return value > 100 || value < 97.5 ? "critical" : value > 99.5 || value < 98 ? "warning" : "normal"
      case "stress":
        return value > 70 ? "critical" : value > 50 ? "warning" : "normal"
      default:
        return "normal"
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
      <div className="mb-2">
        <div className="flex justify-between text-xs text-cyan-400 mb-1">
          <span>{label}</span>
          <span>{value}</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-1 border border-cyan-500/30">
          <div
            className={`bg-gradient-to-r ${colorClasses[color]} h-1 rounded-full transition-all duration-500`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
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
          <h1 className="text-2xl font-bold text-cyan-400">CREW MANAGEMENT SYSTEM</h1>
        </div>
        <div className="text-sm text-gray-400">Personnel Monitoring • Medical Status • Duty Assignments</div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Crew Location Map - Large Panel */}
        <div className="lg:col-span-2 bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] crew-panel-4">
          <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
            CREW LOCATION & STATUS
          </div>

          <div className="flex">
            <div className="flex-1 flex flex-col items-center">
              <div className="relative w-80 h-64 bg-gray-900 rounded border border-cyan-500/30">
                <svg width="320" height="256" className="absolute inset-0">
                  {/* Ship Layout */}
                  <defs>
                    <pattern id="shipGrid" width="40" height="32" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 32" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#shipGrid)" />

                  {/* Ship Sections */}
                  <rect x="50" y="50" width="220" height="40" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" />
                  <text x="160" y="75" fill="#06b6d4" fontSize="10" className="font-mono text-center">
                    BRIDGE
                  </text>

                  <rect x="50" y="100" width="100" height="60" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" />
                  <text x="100" y="135" fill="#22c55e" fontSize="8" className="font-mono text-center">
                    OPERATIONS
                  </text>

                  <rect x="170" y="100" width="100" height="60" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" />
                  <text x="220" y="135" fill="#06b6d4" fontSize="8" className="font-mono text-center">
                    SCIENCE LAB
                  </text>

                  <rect x="50" y="170" width="100" height="60" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" />
                  <text x="100" y="205" fill="#ef4444" fontSize="8" className="font-mono text-center">
                    SICKBAY
                  </text>

                  <rect x="170" y="170" width="100" height="60" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" />
                  <text x="220" y="205" fill="#f59e0b" fontSize="8" className="font-mono text-center">
                    ENGINE ROOM
                  </text>

                  {/* Crew Members */}
                  {crewMembers.map((member) => (
                    <g key={member.id}>
                      <circle
                        cx={member.x}
                        cy={member.y}
                        r="6"
                        fill={getDepartmentColor(member.department)}
                        stroke="white"
                        strokeWidth="2"
                        className={`cursor-pointer ${member.status === "ON DUTY" ? "animate-pulse" : ""}`}
                        onClick={() => setSelectedCrew(member.id)}
                      />
                      <text
                        x={member.x + 10}
                        y={member.y - 10}
                        fill={getDepartmentColor(member.department)}
                        fontSize="6"
                        className="font-mono cursor-pointer"
                        onClick={() => setSelectedCrew(member.id)}
                      >
                        {member.name.split(" ")[1]}
                      </text>
                    </g>
                  ))}

                  {/* Duty Rotation Indicator */}
                  <circle
                    cx="280"
                    cy="40"
                    r="15"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    fill="transparent"
                    className="duty-rotation"
                  />
                  <text x="275" y="45" fill="#06b6d4" fontSize="8" className="font-mono">
                    DUTY
                  </text>
                </svg>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
                <div className="text-center">
                  <div className="text-cyan-400 font-bold">CREW ON DUTY</div>
                  <div className="text-white text-lg">{crewMembers.filter((m) => m.status === "ON DUTY").length}</div>
                </div>
                <div className="text-center">
                  <div className="text-cyan-400 font-bold">TOTAL CREW</div>
                  <div className="text-white text-lg">{crewMembers.length}</div>
                </div>
                <div className="text-center">
                  <div className="text-cyan-400 font-bold">MEDICAL ALERTS</div>
                  <div className="text-white text-lg">{medicalAlerts.length}</div>
                </div>
              </div>
            </div>

            <div className="flex-1 pl-4">
              <div className="text-xs text-cyan-400 mb-2 font-bold">CREW ROSTER:</div>
              <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                {crewMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`bg-gray-800/50 p-3 rounded border border-cyan-500/30 cursor-pointer transition-all ${
                      selectedCrew === member.id ? "assignment-highlight" : ""
                    } ${member.vitals.stress > 70 || member.vitals.temperature > 100 ? "vitals-critical" : ""}`}
                    onClick={() => setSelectedCrew(member.id)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-cyan-400 font-bold text-xs">{member.name}</span>
                      <span className={`text-xs font-bold ${getStatusColor(member.status)}`}>{member.status}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-300">
                      <div>RANK: {member.rank}</div>
                      <div>DEPT: {member.department}</div>
                      <div>LOC: {member.location}</div>
                      <div>SHIFT: {member.shiftEnd}</div>
                    </div>
                    <div className="mt-2 text-xs">
                      <span className="text-gray-400">HR:</span>
                      <span
                        className={`ml-1 ${
                          getVitalStatus("heartRate", member.vitals.heartRate) === "critical"
                            ? "text-red-400"
                            : getVitalStatus("heartRate", member.vitals.heartRate) === "warning"
                              ? "text-yellow-400"
                              : "text-green-400"
                        }`}
                      >
                        {member.vitals.heartRate}
                      </span>
                      <span className="text-gray-400 ml-3">STRESS:</span>
                      <span
                        className={`ml-1 ${
                          getVitalStatus("stress", member.vitals.stress) === "critical"
                            ? "text-red-400"
                            : getVitalStatus("stress", member.vitals.stress) === "warning"
                              ? "text-yellow-400"
                              : "text-green-400"
                        }`}
                      >
                        {member.vitals.stress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Crew Details */}
        <div className="space-y-4">
          {/* Selected Crew Details */}
          <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] crew-panel-1">
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
              {selectedCrew ? "CREW DETAILS" : "SELECT CREW MEMBER"}
            </div>

            {selectedCrew ? (
              <div className="space-y-4">
                {(() => {
                  const member = crewMembers.find((m) => m.id === selectedCrew)
                  if (!member) return null

                  return (
                    <>
                      <div className="text-center">
                        <div className="text-lg font-bold text-cyan-400 mb-1">{member.name}</div>
                        <div className="text-sm text-gray-400 mb-2">
                          {member.rank} • {member.department}
                        </div>
                        <div className={`text-sm font-bold ${getStatusColor(member.status)}`}>{member.status}</div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-cyan-400 font-bold">VITAL SIGNS:</div>
                        <ProgressBar
                          label="HEART RATE"
                          value={member.vitals.heartRate}
                          max={120}
                          color={
                            getVitalStatus("heartRate", member.vitals.heartRate) === "critical"
                              ? "red"
                              : getVitalStatus("heartRate", member.vitals.heartRate) === "warning"
                                ? "yellow"
                                : "green"
                          }
                        />
                        <ProgressBar
                          label="OXYGEN SAT"
                          value={member.vitals.oxygenSat}
                          max={100}
                          color={
                            getVitalStatus("oxygenSat", member.vitals.oxygenSat) === "critical"
                              ? "red"
                              : getVitalStatus("oxygenSat", member.vitals.oxygenSat) === "warning"
                                ? "yellow"
                                : "green"
                          }
                        />
                        <ProgressBar
                          label="STRESS LEVEL"
                          value={member.vitals.stress}
                          max={100}
                          color={
                            getVitalStatus("stress", member.vitals.stress) === "critical"
                              ? "red"
                              : getVitalStatus("stress", member.vitals.stress) === "warning"
                                ? "yellow"
                                : "green"
                          }
                        />

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-400">TEMP:</span>
                            <span
                              className={`ml-1 ${
                                getVitalStatus("temperature", member.vitals.temperature) === "critical"
                                  ? "text-red-400"
                                  : getVitalStatus("temperature", member.vitals.temperature) === "warning"
                                    ? "text-yellow-400"
                                    : "text-green-400"
                              }`}
                            >
                              {member.vitals.temperature.toFixed(1)}°F
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">BP:</span>
                            <span className="text-cyan-400 ml-1">{member.vitals.bloodPressure}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-cyan-400 font-bold">SKILLS:</div>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.map((skill) => (
                            <span key={skill} className="text-xs px-2 py-1 bg-cyan-600 text-white rounded font-mono">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div>
                          <span className="text-gray-400">ASSIGNMENT:</span>
                          <span className="text-cyan-400 ml-1">{member.assignment}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">LOCATION:</span>
                          <span className="text-cyan-400 ml-1">{member.location}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">SHIFT ENDS:</span>
                          <span className="text-cyan-400 ml-1">{member.shiftEnd}</span>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <div className="text-4xl mb-4">👤</div>
                <div>Click on a crew member to view details</div>
              </div>
            )}
          </div>

          {/* Medical Alerts */}
          <div
            className={`bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] crew-panel-2 ${medicalAlerts.length > 0 ? "medical-alert" : ""}`}
          >
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">MEDICAL ALERTS</div>

            <div className="space-y-3 max-h-32 overflow-y-auto custom-scrollbar">
              {medicalAlerts.length > 0 ? (
                medicalAlerts.map((alert) => (
                  <div key={alert.id} className="bg-gray-800/50 p-3 rounded border border-red-500/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-red-400 font-bold text-xs">{alert.crewMember}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          alert.severity === "HIGH"
                            ? "bg-red-600 text-white"
                            : alert.severity === "MEDIUM"
                              ? "bg-yellow-600 text-white"
                              : "bg-cyan-600 text-white"
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </div>
                    <div className="text-xs text-gray-300 mb-1">{alert.alert}</div>
                    <div className="text-xs text-gray-400">{alert.timestamp}</div>
                  </div>
                ))
              ) : (
                <div className="text-center text-green-400 py-4">
                  <div className="text-2xl mb-2">✓</div>
                  <div className="text-xs">NO MEDICAL ALERTS</div>
                </div>
              )}
            </div>
          </div>

          {/* Duty Assignments */}
          <div className="bg-gray-900/50 border border-cyan-500/50 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] crew-panel-3">
            <div className="text-cyan-400 text-sm font-bold mb-4 border-b border-cyan-500/30 pb-2">
              DUTY ASSIGNMENTS
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="bg-gray-800/50 p-3 rounded border border-cyan-500/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-cyan-400 font-bold text-xs">{assignment.task}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        assignment.priority === "CRITICAL"
                          ? "bg-red-600 text-white"
                          : assignment.priority === "HIGH"
                            ? "bg-yellow-600 text-white"
                            : "bg-cyan-600 text-white"
                      }`}
                    >
                      {assignment.priority}
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 mb-1">ASSIGNED TO: {assignment.assignedTo || "UNASSIGNED"}</div>
                  <div className="text-xs text-gray-400">DURATION: {assignment.duration}</div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setShowAssignmentModal(true)}
              className="w-full mt-4 bg-cyan-700 hover:bg-cyan-600 text-white border border-cyan-500 text-xs"
            >
              MANAGE ASSIGNMENTS
            </Button>
          </div>
        </div>
      </div>

      {/* Assignment Management Modal */}
      {showAssignmentModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-cyan-500 rounded p-6 w-96 max-w-[90vw]">
            <div className="text-cyan-400 text-lg font-bold mb-4 border-b border-cyan-500/30 pb-2">
              ASSIGNMENT MANAGEMENT
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-cyan-400 text-xs font-bold block mb-1">TASK NAME:</label>
                <input
                  type="text"
                  value={newAssignment.task}
                  onChange={(e) => setNewAssignment({ ...newAssignment, task: e.target.value })}
                  className="w-full bg-gray-800 border border-cyan-500/30 rounded px-3 py-2 text-cyan-400 text-xs font-mono placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  placeholder="ENTER TASK NAME"
                />
              </div>

              <div>
                <label className="text-cyan-400 text-xs font-bold block mb-1">ASSIGN TO:</label>
                <select
                  value={newAssignment.assignedTo}
                  onChange={(e) => setNewAssignment({ ...newAssignment, assignedTo: e.target.value })}
                  className="w-full bg-gray-800 border border-cyan-500/30 rounded px-3 py-2 text-cyan-400 text-xs font-mono focus:outline-none focus:border-cyan-400"
                >
                  <option value="">UNASSIGNED</option>
                  {crewMembers.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-cyan-400 text-xs font-bold block mb-1">PRIORITY:</label>
                <select
                  value={newAssignment.priority}
                  onChange={(e) =>
                    setNewAssignment({ ...newAssignment, priority: e.target.value as "CRITICAL" | "HIGH" | "MEDIUM" })
                  }
                  className="w-full bg-gray-800 border border-cyan-500/30 rounded px-3 py-2 text-cyan-400 text-xs font-mono focus:outline-none focus:border-cyan-400"
                >
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>

              <div>
                <label className="text-cyan-400 text-xs font-bold block mb-1">DURATION:</label>
                <input
                  type="text"
                  value={newAssignment.duration}
                  onChange={(e) => setNewAssignment({ ...newAssignment, duration: e.target.value })}
                  className="w-full bg-gray-800 border border-cyan-500/30 rounded px-3 py-2 text-cyan-400 text-xs font-mono placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  placeholder="e.g., 4 HRS, 2 DAYS"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={addAssignment}
                className="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white border border-cyan-500 text-xs"
              >
                ADD ASSIGNMENT
              </Button>
              <Button
                onClick={() => {
                  setShowAssignmentModal(false)
                  setNewAssignment({ task: "", assignedTo: "", priority: "MEDIUM", duration: "" })
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white border border-gray-500 text-xs"
              >
                CANCEL
              </Button>
            </div>

            {assignments.length > 0 && (
              <div className="mt-6">
                <div className="text-cyan-400 text-xs font-bold mb-2 border-b border-cyan-500/30 pb-1">
                  CURRENT ASSIGNMENTS:
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                  {assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="bg-gray-800/50 p-2 rounded border border-cyan-500/30 flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <div className="text-cyan-400 font-bold text-xs">{assignment.task}</div>
                        <div className="text-gray-400 text-xs">
                          {assignment.assignedTo} • {assignment.duration}
                        </div>
                      </div>
                      <Button
                        onClick={() => removeAssignment(assignment.id)}
                        className="bg-red-700 hover:bg-red-600 text-white border border-red-500 text-xs px-2 py-1"
                      >
                        REMOVE
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
