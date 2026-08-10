"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { Maximize2, Calendar, Tag, ShieldAlert, Sparkles, TrendingDown } from "lucide-react";
import { CardModal, ModalData } from "@/components/common/CardModal";

export interface TimeSeriesPoint {
  month: string;
  val: number;
  event?: {
    title: string;
    category: "macro" | "customer" | "competitor" | "fraud";
    severity: "high" | "medium" | "low";
    description: string;
  };
}

const data: TimeSeriesPoint[] = [
  { month: "Sep", val: 22.8 },
  { month: "Oct", val: 23.4 },
  {
    month: "Nov",
    val: 24.1,
    event: {
      title: "Peak Portfolio Balance",
      category: "customer",
      severity: "low",
      description: "Wealth management deposit peak at ₹24.1M",
    },
  },
  { month: "Dec", val: 23.8 },
  { month: "Jan", val: 22.9 },
  { month: "Feb", val: 22.1 },
  {
    month: "Mar",
    val: 21.5,
    event: {
      title: "RBI Repo Rate +50 bps",
      category: "macro",
      severity: "medium",
      description: "Central bank rate hike; liquidity tightening across wealth tier",
    },
  },
  { month: "Apr", val: 20.8 },
  {
    month: "May",
    val: 19.9,
    event: {
      title: "Wire Fee Dispute Ticket #8849",
      category: "customer",
      severity: "high",
      description: "Disputed ₹2,500 wire fee; customer expressed service dissatisfaction",
    },
  },
  { month: "Jun", val: 19.2 },
  {
    month: "Jul",
    val: 18.8,
    event: {
      title: "Competitor 8.5% FD Launch",
      category: "competitor",
      severity: "medium",
      description: "Peer bank aggressively poached deposits with promotional rate",
    },
  },
  {
    month: "Aug",
    val: 18.4,
    event: {
      title: "High Risk Churn Alert (92%)",
      category: "fraud",
      severity: "high",
      description: "Emergency retention bonus (+0.75%) recommended by AI Copilot",
    },
  },
];

const categoryColors = {
  macro: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  customer: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  competitor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  fraud: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function PortfolioTrend() {
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("ALL");
  const [activeEvent, setActiveEvent] = useState<TimeSeriesPoint["event"] | null>(
    data.find((d) => d.month === "May")?.event || null
  );

  const eventsList = data.filter((d) => d.event);

  const trendModal: ModalData = {
    title: "12-Month Event-Correlated Attrition Telemetry — Maya Iyer",
    category: "Trailing Portfolio & Real-World Event Series",
    subtitle: "Historical correlation between macro market events, service touchpoints, and deposit flow",
    badge: "YoY Decline: -19.3%",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    metrics: [
      { label: "Peak Balance", value: "₹24.1M", change: "November 2025" },
      { label: "Current Balance", value: "₹18.4M", change: "August 2026", color: "text-red-400" },
      { label: "Primary Outflow Trigger", value: "Ticket #8849", change: "May Wire Fee Dispute" },
      { label: "AI Rate Bonus Uplift", value: "+₹5.0M", change: "Expected Retention" },
    ],
    description: "Multi-agent time series reasoning correlates the ₹5.7M deposit outflow directly to two major events: the March 2026 RBI repo rate hike and an unhandled wire fee dispute in May 2026.",
    details: [
      "Nov 2025: Peak balance at ₹24.1M prior to rate environment changes",
      "Mar 2026: RBI repo rate hike (+50 bps) initiated yield chasing across accounts",
      "May 2026: Disputed ₹2,500 wire fee ticket #8849 triggered accelerated deposit drain",
      "Jul 2026: Competitor bank launched 8.5% FD campaign targeting wealth tier",
    ],
    actionLabel: "Generate Retention Offer Proposal",
    actionHref: "/customer",
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload as TimeSeriesPoint;
      return (
        <div className="rounded-2xl border border-border bg-slate-950 p-4 shadow-2xl space-y-2 max-w-xs text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label} 2026</span>
            <span className="text-sm font-black text-red-400 font-mono">₹{point.val}M</span>
          </div>
          {point.event ? (
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-400">
                <Tag size={12} /> {point.event.title}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{point.event.description}</p>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No major real-world event logged for this month</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <section className="rounded-3xl border border-border bg-card p-8 shadow-md hover:shadow-xl transition-all duration-300 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-red-400 mb-1">
              <TrendingDown size={14} /> Real-World Event Time Series Telemetry
            </div>
            <h3 className="text-2xl font-black tracking-tight text-foreground">
              Maya Iyer — Portfolio AUM & Event Correlation
            </h3>
            <p className="text-sm text-muted-foreground">
              Correlate deposit fluctuations with macro interest rates, support tickets & competitor actions
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedModal(trendModal)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 text-xs font-bold hover:bg-muted hover:border-blue-500/50 transition cursor-pointer text-foreground"
            >
              <Maximize2 size={14} className="text-blue-500" /> Deep Telemetry Modal
            </button>
            <span className="text-xs font-extrabold text-red-400 bg-red-500/10 border border-red-500/20 px-3.5 py-1.5 rounded-xl">
              -19.3% YoY Decline
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-muted/30 p-3 rounded-2xl border border-border/60">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-muted-foreground">
            <Calendar size={14} /> Filter Event Overlays:
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "ALL", label: "All Events" },
              { id: "customer", label: "Customer Tickets" },
              { id: "macro", label: "Macro Rates" },
              { id: "competitor", label: "Competitor Offers" },
              { id: "fraud", label: "Risk Signals" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeCategoryFilter === cat.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Time-Series Area Chart with Event Markers */}
        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="custGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[15, 26]} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="val"
                stroke="#ef4444"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#custGrad)"
              />
              {data
                .filter(
                  (d) =>
                    d.event &&
                    (activeCategoryFilter === "ALL" || d.event.category === activeCategoryFilter)
                )
                .map((d, i) => (
                  <ReferenceDot
                    key={i}
                    x={d.month}
                    y={d.val}
                    r={6}
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth={2}
                    onClick={() => setActiveEvent(d.event || null)}
                    className="cursor-pointer hover:scale-150 transition"
                  />
                ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Real-World Event Inspection Cards */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400" /> Correlated Real-World Events Log
            </span>
            <span className="text-xs text-muted-foreground">Click any event marker above to inspect impact</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {eventsList.map((item, idx) => {
              const evt = item.event!;
              const isSelected = activeEvent?.title === evt.title;
              const badgeStyle = categoryColors[evt.category];

              return (
                <div
                  key={idx}
                  onClick={() => setActiveEvent(evt)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer space-y-2 ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/10 shadow-lg scale-[1.02]"
                      : "border-border bg-card hover:border-blue-500/40 hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-muted-foreground">{item.month} 2026</span>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${badgeStyle}`}>
                      {evt.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground line-clamp-1">{evt.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{evt.description}</p>
                </div>
              );
            })}
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