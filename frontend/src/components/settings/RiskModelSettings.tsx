"use client";

import { useState } from "react";
import { Save, Maximize2 } from "lucide-react";
import { CardModal, ModalData } from "@/components/common/CardModal";

export function RiskModelSettings() {
  const [sensitivity, setSensitivity] = useState(85);
  const [velocityKm, setVelocityKm] = useState(800);
  const [autoFreezeTor, setAutoFreezeTor] = useState(true);
  const [saved, setSaved] = useState(false);
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExpandSettings = () => {
    setSelectedModal({
      title: "DeepRisk Neural Model Configurations",
      category: "Risk Model Parameters",
      subtitle: "Active anomaly scoring weights & autonomous defense triggers",
      badge: "DeepRisk Engine v4.2 Active",
      metrics: [
        { label: "Model Sensitivity", value: `${sensitivity}%`, change: "High Precision" },
        { label: "Velocity Limit", value: `${velocityKm} km/h`, change: "Impossible Travel" },
        { label: "Tor Quarantine", value: autoFreezeTor ? "ENABLED" : "DISABLED", color: autoFreezeTor ? "text-emerald-400" : "text-amber-400" },
        { label: "Real-Time Hold", value: "0.4s Latency", change: "Auto Intercept" },
      ],
      description: "DeepRisk v4.2 continuous neural learning engine evaluates physical velocity mismatches, device fingerprinting MAC hashes, and Tor exit node IP routing in real time.",
      details: [
        `Risk Engine Sensitivity: ${sensitivity}% (Triggers early alerts on untrusted user-agents)`,
        `Velocity Travel Threshold: ${velocityKm} km/h (Flags session geographic jumps)`,
        `Autonomous Tor IP Quarantine: ${autoFreezeTor ? "ACTIVE (Instant SWIFT hold)" : "INACTIVE"}`,
      ],
      actionLabel: "View System Security Settings",
      actionHref: "/settings",
    });
  };

  return (
    <>
      <section
        onClick={handleExpandSettings}
        className="group rounded-3xl border border-border bg-card p-8 shadow-md hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 hover:border-blue-500/50 transition-all duration-300 ease-out cursor-pointer space-y-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="text-xl font-bold tracking-tight group-hover:text-blue-400 transition">
              AI Risk Model & Neural Thresholds
            </h3>
            <p className="text-sm text-muted-foreground">Configure DeepRisk v4.2 sensitivity & autonomous interception rules</p>
          </div>

          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
              Click to Expand <Maximize2 size={14} />
            </span>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition shadow-xs"
            >
              <Save size={16} /> {saved ? "Rules Saved!" : "Save Configuration"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" onClick={(e) => e.stopPropagation()}>
          <div className="space-y-4 rounded-2xl border border-border bg-background p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-base text-foreground">Risk Engine Sensitivity</span>
              <span className="font-mono text-sm font-extrabold text-blue-400">{sensitivity}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="99"
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
              className="w-full cursor-pointer accent-blue-600"
            />
            <p className="text-sm text-muted-foreground">
              Higher sensitivity increases risk scoring weight on velocity anomalies and untrusted user-agents.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-border bg-background p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-base text-foreground">Velocity Travel Threshold</span>
              <span className="font-mono text-sm font-extrabold text-blue-400">{velocityKm} km/h</span>
            </div>
            <input
              type="range"
              min="200"
              max="1500"
              step="50"
              value={velocityKm}
              onChange={(e) => setVelocityKm(Number(e.target.value))}
              className="w-full cursor-pointer accent-blue-600"
            />
            <p className="text-sm text-muted-foreground">
              Intercept transactions when session physical movement velocity exceeds this threshold.
            </p>
          </div>

          <div className="md:col-span-2 rounded-2xl border border-border bg-background p-6 flex items-center justify-between">
            <div>
              <span className="font-bold text-base text-foreground block">Autonomous Tor IP Quarantine</span>
              <p className="text-sm text-muted-foreground mt-1">
                Instantly hold outbound wire transfers originating from documented Tor exit relays.
              </p>
            </div>

            <button
              onClick={() => setAutoFreezeTor(!autoFreezeTor)}
              className={`rounded-full w-14 h-8 p-1 transition duration-200 ${
                autoFreezeTor ? "bg-blue-600" : "bg-muted"
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition duration-200 ${
                  autoFreezeTor ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      <CardModal
        isOpen={!!selectedModal}
        onClose={() => setSelectedModal(null)}
        data={selectedModal}
      />
    </>
  );
}
