"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Maximize2 } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { CardModal, ModalData } from "@/components/common/CardModal";

const data = [
  { month: "Jan", aum: 380, risk: 42 },
  { month: "Feb", aum: 395, risk: 38 },
  { month: "Mar", aum: 410, risk: 45 },
  { month: "Apr", aum: 405, risk: 52 },
  { month: "May", aum: 425, risk: 48 },
  { month: "Jun", aum: 440, risk: 36 },
  { month: "Jul", aum: 460, risk: 40 },
  { month: "Aug", aum: 480, risk: 32 },
];

export function TrendSection() {
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);

  const trendModal: ModalData = {
    title: "Trailing Portfolio & Risk Exposure Dynamics",
    category: "12-Month Telemetry Trend",
    subtitle: "Historical correlation between total AUM expansion and composite risk scoring",
    badge: "Risk Score Reduction (-23.8%)",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    metrics: [
      { label: "Current AUM", value: "₹480.5M", change: "+₹100.5M YTD", color: "text-blue-400" },
      { label: "Composite Risk Index", value: "32/100", change: "-10 Points vs Jan", color: "text-emerald-400" },
      { label: "Peak Risk Month", value: "April (52)", change: "Wire Fee Spike" },
      { label: "Forecast Next Month", value: "₹505M AUM", change: "+5.1% Expected" },
    ],
    description: "Multi-agent risk telemetry indicates that while total portfolio AUM expanded from ₹380M to ₹480.5M, composite risk indices dropped significantly due to autonomous fraud interception rules and proactive RM retention campaigns.",
    details: [
      "January to April: Risk index rose to 52 following wire transfer fee disputes",
      "May to August: Rate bonus campaign stabilized deposit churn, dropping risk to 32",
      "Model forecast: Continued AUM growth to ₹505M expected by end of Q3 2026",
    ],
    actionLabel: "Inspect Customer Intelligence Workspace",
    actionHref: "/customer",
  };

  return (
    <>
      <ScrollReveal direction="left" delay={200}>
        <section
          onClick={() => setSelectedModal(trendModal)}
          className="group rounded-3xl border border-border bg-card p-8 shadow-md hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 hover:border-blue-500/50 transition-all duration-300 ease-out cursor-pointer space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <h3 className="text-xl font-bold tracking-tight group-hover:text-blue-400 transition">
                Portfolio AUM & Risk Exposure Trend
              </h3>
              <p className="text-sm text-muted-foreground">12-Month Trailing Performance & Risk Index</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-blue-500" /> Portfolio AUM (₹M)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-amber-500" /> Risk Index Score
              </span>
              <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                <Maximize2 size={14} /> Expand
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="aumGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    borderRadius: "12px",
                    color: "#f8fafc",
                    fontSize: "13px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="aum"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#aumGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="risk"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#riskGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      </ScrollReveal>

      <CardModal
        isOpen={!!selectedModal}
        onClose={() => setSelectedModal(null)}
        data={selectedModal}
      />
    </>
  );
}