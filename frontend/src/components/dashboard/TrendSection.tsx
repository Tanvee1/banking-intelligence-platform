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
      <ScrollReveal direction="left" delay={200} className="h-full">
        <section
          onClick={() => setSelectedModal(trendModal)}
          className="group rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition duration-150 cursor-pointer flex flex-col justify-between space-y-4 h-full"
        >
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <h3 className="text-base font-bold text-foreground tracking-tight group-hover:text-blue-500 transition">
                Portfolio AUM & Risk Exposure Trend
              </h3>
              <p className="text-xs text-muted-foreground">12-Month Trailing Performance & Risk Index</p>
            </div>

            <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> AUM (₹M)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Risk Score
              </span>
            </div>
          </div>

          <div className="h-[210px] w-full pt-2">
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
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                    color: "var(--foreground)",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="aum"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
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