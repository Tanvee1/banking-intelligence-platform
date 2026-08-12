"use client";

import { useState } from "react";
import { Building2, TrendingUp, Activity, Phone, Mail, ShieldAlert, Maximize2 } from "lucide-react";
import { CardModal, ModalData } from "@/components/common/CardModal";

export function CustomerProfile() {
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);

  const openAumModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedModal({
      title: "Portfolio AUM — Maya Iyer (CUST-40921)",
      category: "Affluent Wealth Assets",
      subtitle: "Managed balance breakdown & 30-day outflow tracking",
      badge: "₹18.4 Million Portfolio",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      metrics: [
        { label: "Total AUM", value: "₹18,400,000", change: "-₹45L (30 Days)", color: "text-amber-400" },
        { label: "Term Deposit", value: "₹50,000,000", change: "Renewal Due" },
        { label: "Mutual Funds", value: "₹8,200,000", change: "Equity Blend" },
        { label: "Savings Balance", value: "₹5,200,000", change: "Liquid Funds" },
      ],
      description: "Net outflow of ₹45L observed over the trailing 30 days due to competitive yield migration. Recommended action: Extend +0.75% term deposit rate bonus.",
      details: [
        "Primary account: Affluent Savings #9948201",
        "Outflow destination: External ICICI Wealth Account",
        "Unresolved dispute: ₹2,500 wire fee charged on international transfer",
      ],
      actionLabel: "View Portfolio Trend Analytics",
      actionHref: "/customer",
    });
  };

  const openHealthModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedModal({
      title: "Relationship Health Score — 68%",
      category: "Client Risk & Satisfaction Audit",
      subtitle: "Composite rating evaluated by DeepRisk ML engines",
      badge: "92% Predicted Churn Risk",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
      metrics: [
        { label: "Health Rating", value: "68%", change: "-14% vs Last Quarter", color: "text-amber-500" },
        { label: "Churn Probability", value: "92%", change: "HIGH RISK", color: "text-red-400" },
        { label: "Service Ticket", value: "#8849 Open", change: "Wire Limit Friction" },
        { label: "NPS Score", value: "6 / 10", change: "Detractor Risk" },
      ],
      description: "Health score dropped from 82% to 68% following 2 unresolved service tickets regarding wire transfer caps and international remittance fees.",
      details: [
        "1. Resolve open ticket #8849 by waiving disputed transfer fee",
        "2. Increase daily online wire limit to ₹50L with biometric push auth",
        "3. Executive RM callback scheduled within 24 hours",
      ],
      actionLabel: "Launch Retention Workflow",
      actionHref: "/customer",
    });
  };

  const openProductsModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedModal({
      title: "Active Products — 6 Holdings",
      category: "Product Coverage Analysis",
      subtitle: "Maya Iyer (CUST-40921) cross-product penetration",
      badge: "6 Active Products",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      metrics: [
        { label: "Wealth Savings", value: "₹5.2M", change: "Active" },
        { label: "Term Deposit", value: "₹5.0M", change: "Matures Sep 2026" },
        { label: "Visa Infinite Card", value: "₹1.5M Limit", change: "Primary Card" },
        { label: "Forex Wallet", value: "$25,000 USD", change: "Active Travel" },
      ],
      description: "Holds 6 active products spanning Savings, Wealth Management, Fixed Deposits, Credit Cards, and Multi-Currency Forex accounts.",
      details: [
        "Savings Account #9948: Active • Average balance ₹5.2M",
        "Wealth Term Deposit #1102: Active • Yield 7.25%",
        "Visa Infinite Card *4921: Active • Clean repayment record",
      ],
      actionLabel: "Inspect Product Holdings",
      actionHref: "/customer",
    });
  };

  const openContactModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedModal({
      title: "Relationship Touchpoints & Log",
      category: "Client Engagement Telemetry",
      subtitle: "Last direct RM outreach: 2 Days ago",
      badge: "Lead Specialist Assigned",
      metrics: [
        { label: "Last Contact", value: "2 Days Ago", change: "Phone Call" },
        { label: "Assigned Specialist", value: "Tanvee", change: "Lead Relationship Specialist" },
        { label: "Preferred Channel", value: "Phone / Direct Email", change: "m.iyer@corporate.com" },
        { label: "Next Scheduled Action", value: "Retention Meeting", change: "In 24 Hours" },
      ],
      description: "Tanvee conducted a 15-minute phone review 2 days ago. Customer expressed frustration over wire limit caps. Immediate follow-up with fee waiver proposal is recommended.",
      details: [
        "Aug 7, 2026: Phone call regarding wire limit increase request",
        "Jul 20, 2026: Email update on quarterly portfolio performance",
        "Jun 12, 2026: In-person wealth planning session in Mumbai branch",
      ],
      actionLabel: "Schedule Out-of-Band Call",
      actionHref: "/customer",
    });
  };

  return (
    <>
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-5">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-4 border-b border-border">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 font-black text-white text-xl shadow-md shrink-0">
              MI
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Maya Iyer</h1>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-muted font-bold text-muted-foreground">
                  CUST-40921
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-bold border border-blue-500/20">
                  Affluent Wealth Segment
                </span>
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                m.iyer@corporate.com • +91 98765 43210 • Primary RM: Tanvee
              </p>

              <div className="mt-2.5 flex gap-2 flex-wrap">
                <span className="rounded-full bg-red-500/10 text-red-500 border border-red-500/20 px-2.5 py-0.5 text-xs font-bold flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> High Churn Risk (92%)
                </span>
                <span className="rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2.5 py-0.5 text-xs font-bold">
                  Complaint Ticket #8849 Open
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button className="rounded-xl border border-border bg-muted/50 px-3.5 py-2 text-xs font-bold text-foreground hover:bg-muted transition flex items-center gap-1.5 cursor-pointer">
              <Mail className="w-3.5 h-3.5" /> Email
            </button>
            <button className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 transition flex items-center gap-1.5 shadow-xs cursor-pointer">
              <Phone className="w-3.5 h-3.5" /> Schedule Call
            </button>
          </div>
        </div>

        {/* Sub KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: AUM */}
          <div
            onClick={openAumModal}
            className="group rounded-xl border border-border bg-muted/40 p-4 hover:border-blue-500/50 hover:bg-muted transition duration-150 cursor-pointer space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-muted-foreground font-bold text-xs uppercase tracking-wider group-hover:text-blue-500 transition">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span>Total Portfolio AUM</span>
              </div>
              <Maximize2 className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="mt-1 text-2xl font-black font-mono text-foreground group-hover:text-blue-500 transition whitespace-nowrap">₹18.4M</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">-₹45L net outflow in last 30d</p>
          </div>

          {/* Card 2: Health Score */}
          <div
            onClick={openHealthModal}
            className="group rounded-xl border border-border bg-muted/40 p-4 hover:border-amber-500/50 hover:bg-muted transition duration-150 cursor-pointer space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-muted-foreground font-bold text-xs uppercase tracking-wider group-hover:text-amber-500 transition">
                <Activity className="w-4 h-4 text-amber-500" />
                <span>Health Score</span>
              </div>
              <Maximize2 className="w-3 h-3 text-amber-500 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="mt-1 text-2xl font-black font-mono text-amber-500 whitespace-nowrap">68%</p>
            <p className="text-[11px] text-amber-500 mt-0.5">Requires RM Retention Action</p>
          </div>

          {/* Card 3: Active Products */}
          <div
            onClick={openProductsModal}
            className="group rounded-xl border border-border bg-muted/40 p-4 hover:border-emerald-500/50 hover:bg-muted transition duration-150 cursor-pointer space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-muted-foreground font-bold text-xs uppercase tracking-wider group-hover:text-emerald-500 transition">
                <Building2 className="w-4 h-4 text-emerald-500" />
                <span>Active Products</span>
              </div>
              <Maximize2 className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="mt-1 text-2xl font-black font-mono text-foreground group-hover:text-emerald-500 transition whitespace-nowrap">6</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Savings, Wealth, Forex, Cards</p>
          </div>

          {/* Card 4: Last Contact */}
          <div
            onClick={openContactModal}
            className="group rounded-xl border border-border bg-muted/40 p-4 hover:border-purple-500/50 hover:bg-muted transition duration-150 cursor-pointer space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-muted-foreground font-bold text-xs uppercase tracking-wider group-hover:text-purple-500 transition">
                <Phone className="w-4 h-4 text-purple-500" />
                <span>Last Contact</span>
              </div>
              <Maximize2 className="w-3 h-3 text-purple-500 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="mt-1 text-2xl font-black font-mono text-foreground group-hover:text-purple-500 transition whitespace-nowrap">2 Days</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Via Primary Phone Call</p>
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