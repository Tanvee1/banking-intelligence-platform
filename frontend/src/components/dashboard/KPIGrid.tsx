"use client";

import { useState } from "react";
import { TrendingUp, Users, ShieldAlert, CheckCircle2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar } from "recharts";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { CardModal, ModalData } from "@/components/common/CardModal";

export function KPIGrid() {
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);

  // Sparkline data for visual combo
  const aumSparkline = [{ v: 380 }, { v: 395 }, { v: 410 }, { v: 405 }, { v: 425 }, { v: 440 }, { v: 460 }, { v: 480 }];
  const churnSparkline = [{ v: 3 }, { v: 4 }, { v: 5 }, { v: 7 }, { v: 6 }, { v: 8 }, { v: 7 }, { v: 9 }];
  const fraudSparkline = [{ v: 0.2 }, { v: 0.5 }, { v: 0.8 }, { v: 1.1 }, { v: 0.9 }, { v: 1.25 }, { v: 1.31 }];

  const kpis = [
    {
      title: "Total Portfolio AUM",
      value: "₹480.5M",
      badge: "+12.4%",
      isPositive: true,
      subtext: "128 Accounts",
      icon: TrendingUp,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      visualType: "sparkline",
      sparklineData: aumSparkline,
      sparklineColor: "#3b82f6",
      progressPct: 96.1,
      progressLabel: "96.1% of ₹500M Goal",
      modal: {
        title: "Total Portfolio AUM — ₹480.5 Million",
        category: "Portfolio Telemetry",
        subtitle: "Comprehensive wealth management balance across 128 high-net-worth customer relationships",
        badge: "Growth Target Exceeded (+12.4%)",
        metrics: [
          { label: "Total Assets", value: "₹480,500,000", change: "+₹53.1M YTD", color: "text-emerald-400" },
          { label: "Active Accounts", value: "128 Clients", change: "94% Retention", color: "text-blue-400" },
          { label: "Average AUM / Client", value: "₹3.75M", change: "Affluent Tier" },
          { label: "Quarterly Inflows", value: "₹42.8M", change: "Net Positive" },
        ],
        description: "Portfolio growth remains strong driven by term deposit renewals (+0.75% rate bonus campaign) and affluent wealth expansion. 92% of top-tier accounts show active digital banking engagement.",
        details: [
          "Wealth Segment AUM: ₹310.2M (64.5% total)",
          "Commercial Accounts: ₹115.8M (24.1% total)",
          "Retail Accounts: ₹54.5M (11.4% total)",
        ],
        actionLabel: "View Customer Intelligence Workspace",
        actionHref: "/customer",
      },
    },
    {
      title: "High Churn Risk Clients",
      value: "9 Clients",
      badge: "+2 New",
      isPositive: false,
      subtext: "₹64.2M Exposed",
      icon: Users,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      visualType: "bar",
      sparklineData: churnSparkline,
      sparklineColor: "#f59e0b",
      progressPct: 7.0,
      progressLabel: "7.0% Portfolio Flagged",
      modal: {
        title: "High Churn Risk Telemetry — 9 Accounts",
        category: "Client Retention Alert",
        subtitle: "Identified ₹64.2M portfolio balance requiring immediate relationship manager intervention",
        badge: "Action Urgency: High",
        badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        metrics: [
          { label: "At-Risk Accounts", value: "9 Clients", change: "+2 This Month", color: "text-amber-400" },
          { label: "Exposed Portfolio", value: "₹64.2M", change: "13.3% of Total AUM", color: "text-amber-400" },
          { label: "Primary Outflow Driver", value: "Wire Limit Disputes", change: "Fee Friction" },
          { label: "Recommended Retention", value: "+0.75% Yield Bonus", change: "Waive Transfer Fees" },
        ],
        description: "DeepRisk ML models flagged Maya Iyer (CUST-40921) at 92% churn probability following -₹45L deposit outflows in 30 days. Proactive rate bonus outreach is scheduled.",
        details: [
          "Maya Iyer (CUST-40921): ₹18.4M AUM • Churn Risk 92%",
          "Anand Shah (CUST-39102): ₹14.1M AUM • Churn Risk 84%",
          "Pooja Hegde (CUST-19204): ₹9.8M AUM • Churn Risk 79%",
        ],
        actionLabel: "Inspect Client Churn Workspace",
        actionHref: "/customer",
      },
    },
    {
      title: "Flagged Fraud Volume",
      value: "₹1.31 Cr",
      badge: "4 Cases",
      isPositive: false,
      subtext: "100% Intercepted",
      icon: ShieldAlert,
      color: "text-red-400 bg-red-500/10 border-red-500/20",
      visualType: "sparkline",
      sparklineData: fraudSparkline,
      sparklineColor: "#ef4444",
      progressPct: 100,
      progressLabel: "100% Volume Held (0 Loss)",
      modal: {
        title: "Fraud Intercept Telemetry — ₹1.31 Crore",
        category: "Financial Crime Alert",
        subtitle: "Autonomous AI Interception active across 4 live suspicious transaction cases",
        badge: "100% Interception Efficiency",
        badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
        metrics: [
          { label: "Intercepted Volume", value: "₹13,100,000", change: "100% Protected", color: "text-emerald-400" },
          { label: "Active Fraud Cases", value: "4 Alerts", change: "1 Critical SWIFT", color: "text-red-400" },
          { label: "Primary Vector", value: "Tor IP / RDP Session", change: "ATO Spear-Phishing" },
          { label: "Avg Response Time", value: "0.4 Seconds", change: "Real-Time Hold" },
        ],
        description: "Aegis Interception Engine automatically placed a ₹1.25 Cr SWIFT transfer to Cayman Islands offshore accounts on hold due to severe velocity and device fingerprint anomalies.",
        details: [
          "CASE-8945-TXN: ₹1.25 Cr SWIFT Wire • RDP Compromise (Critical)",
          "CASE-8942-TXN: ₹4.2L IMPS Wire • Tor Exit Node in Dubai (High)",
          "CASE-8943-TXN: ₹1.85L E-comm • Early Travel Timing (Medium)",
          "CASE-8944-TXN: ₹58k UPI • Festival Shopping Audit (Low)",
        ],
        actionLabel: "Open Fraud Workstation",
        actionHref: "/fraud",
      },
    },
    {
      title: "Compliance Audit Score",
      value: "99.4%",
      badge: "0 Overdue",
      isPositive: true,
      subtext: "FIU-IND Compliant",
      icon: CheckCircle2,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      visualType: "gauge",
      progressPct: 99.4,
      progressLabel: "99.4% Audit Standard",
      modal: {
        title: "Compliance & Audit Alignment — 99.4%",
        category: "Regulatory Standing",
        subtitle: "Real-time automated compliance verification against RBI Master Directions & FIU-IND standards",
        badge: "Zero Overdue Disclosures",
        metrics: [
          { label: "Regulatory Compliance", value: "99.4%", change: "+1.2% Target", color: "text-emerald-400" },
          { label: "Overdue SARs", value: "0 Reports", change: "100% On Time", color: "text-emerald-400" },
          { label: "KYC UBO Clearance", value: "98.8%", change: "10% Ownership Threshold" },
          { label: "Average Filing Time", value: "4.2 Hours", change: "Well within 24h limit" },
        ],
        description: "All high-value wire transfers and un-biometric device logins comply with mandatory 24-hour FIU-IND disclosure timelines under internal SOP-2026-AML directives.",
        details: [
          "SOP-2026-KYC: 10% UBO verification enforced on accounts >₹1 Cr",
          "SOP-2026-WIRE: Dual-control sign-off active on transfers >₹2.5 Cr",
          "SOP-2026-AML: 24-hour mandatory SAR disclosure window operational",
        ],
        actionLabel: "Access Knowledge Policy Index",
        actionHref: "/knowledge",
      },
    },
  ];

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <ScrollReveal key={idx} direction="left" delay={idx * 60}>
              <div
                onClick={() => setSelectedModal(kpi.modal)}
                className="group relative rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-lg hover:border-blue-500/50 transition duration-150 cursor-pointer flex flex-col justify-between space-y-3.5 overflow-hidden"
              >
                {/* Header Row: Title & Icon */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    {kpi.title}
                  </span>
                  <div className={`p-1.5 rounded-lg border ${kpi.color} shrink-0`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Middle Row: Value & Mini Sparkline (Compact w-14) */}
                <div className="flex items-center justify-between gap-2">
                  <p className="text-2xl font-black font-mono tracking-tight text-foreground group-hover:text-blue-500 transition whitespace-nowrap">
                    {kpi.value}
                  </p>

                  {/* Sparkline / Bar Visualization */}
                  {kpi.sparklineData && (
                    <div className="h-8 w-14 shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        {kpi.visualType === "bar" ? (
                          <BarChart data={kpi.sparklineData}>
                            <Bar dataKey="v" fill={kpi.sparklineColor} radius={[2, 2, 0, 0]} />
                          </BarChart>
                        ) : (
                          <AreaChart data={kpi.sparklineData}>
                            <defs>
                              <linearGradient id={`grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={kpi.sparklineColor} stopOpacity={0.5} />
                                <stop offset="95%" stopColor={kpi.sparklineColor} stopOpacity={0.0} />
                              </linearGradient>
                            </defs>
                            <Area
                              type="monotone"
                              dataKey="v"
                              stroke={kpi.sparklineColor}
                              strokeWidth={1.5}
                              fillOpacity={1}
                              fill={`url(#grad-${idx})`}
                            />
                          </AreaChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Radial Gauge */}
                  {kpi.visualType === "gauge" && (
                    <div className="relative h-8 w-8 shrink-0 flex items-center justify-center">
                      <svg className="h-8 w-8 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-muted/60"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-emerald-400"
                          strokeDasharray={`${kpi.progressPct}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute text-[8px] font-bold text-emerald-400 font-mono">99%</span>
                    </div>
                  )}
                </div>

                {/* Subtext Row: Badge Pill + Subtext */}
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[11px] font-bold border shrink-0 ${
                      kpi.isPositive
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    }`}
                  >
                    {kpi.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {kpi.badge}
                  </span>
                  <span className="text-muted-foreground text-[11px] font-medium truncate">{kpi.subtext}</span>
                </div>

                {/* Bottom Progress Bar & Label (Clean 1-line label) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-mono text-foreground font-medium truncate">{kpi.progressLabel}</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        kpi.visualType === "gauge" || kpi.isPositive ? "bg-emerald-400" : kpi.progressPct > 50 ? "bg-red-400" : "bg-amber-400"
                      }`}
                      style={{ width: `${kpi.progressPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </section>

      {/* Expanded Modal */}
      <CardModal
        isOpen={!!selectedModal}
        onClose={() => setSelectedModal(null)}
        data={selectedModal}
      />
    </>
  );
}