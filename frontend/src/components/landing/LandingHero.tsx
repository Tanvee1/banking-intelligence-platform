"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Cpu, Users, BookOpen, Maximize2, Sparkles, AlertTriangle, TrendingUp, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { CardModal, ModalData } from "@/components/common/CardModal";
import { useAuth } from "@/providers/AuthProvider";

export function LandingHero() {
  const { exploreAsGuest } = useAuth();
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);

  const heroModal: ModalData = {
    title: "Aegis Enterprise Risk Telemetry Overview",
    category: "Real-Time Interception Telemetry",
    subtitle: "Live financial crime defense & client churn intelligence",
    badge: "100% Intercept Accuracy",
    metrics: [
      { label: "Active Monitored Portfolio", value: "₹480.5M", change: "128 Accounts" },
      { label: "Critical Wire Intercepted", value: "₹1.25 Cr", change: "CASE-8945-TXN", color: "text-red-400" },
      { label: "Top Churn Risk Alert", value: "92%", change: "Maya Iyer (CUST-40921)", color: "text-amber-400" },
      { label: "Regulatory Compliance", value: "99.4%", change: "Zero Overdue SARs" },
    ],
    description: "Aegis AI Banking Platform combines multi-agent risk reasoning, real-time device graph analysis, and RAG regulatory policy retrieval to protect tier-1 financial institutions against high-velocity fraud and deposit attrition.",
    details: [
      "Autonomous fraud interception: Emergency holds triggered on SWIFT wire anomalies",
      "Predictive customer intelligence: Early churn detection with prescriptive rate bonus recommendations",
      "Regulatory SOP engine: Cited compliance answers with 24-hour FIU-IND SAR filing tracking",
    ],
    actionLabel: "Launch Enterprise Intelligence Workspace",
    actionHref: "/dashboard",
  };

  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
        {/* Glowing Background Radial Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/10 to-purple-600/20 blur-[120px] pointer-events-none rounded-full" />

        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column */}
          <ScrollReveal direction="left" delay={50} className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-blue-400 shadow-xs">
              <ShieldCheck size={16} /> Aegis Enterprise AI v4.2 Platform
            </div>

            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] text-foreground">
              Autonomous AI Banking <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Intelligence</span>
            </h1>

            <p className="text-xl sm:text-2xl font-bold leading-relaxed text-muted-foreground">
              Empowering Relationship Managers, Fraud Analysts & Compliance Officers with real-time customer churn prediction, autonomous wire fraud interception, and RAG policy retrieval.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/login"
                className="group inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-base font-black text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 hover:scale-[1.03] cursor-pointer"
              >
                Sign In to Workspace
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() => exploreAsGuest()}
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-7 py-4 text-base font-black hover:bg-muted hover:scale-[1.02] transition shadow-md cursor-pointer text-foreground"
              >
                <Sparkles size={18} className="text-amber-400" /> Explore Demo (Read-Only)
              </button>
            </div>

            {/* Core Modules Quick Grid */}
            <div className="pt-6 border-t border-border/80 space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                Unified Core Modules:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-extrabold">
                {[
                  { title: "Dashboard", href: "/dashboard", icon: Cpu, color: "text-blue-400" },
                  { title: "Customer", href: "/customer", icon: Users, color: "text-emerald-400" },
                  { title: "Fraud", href: "/fraud", icon: AlertTriangle, color: "text-red-400" },
                  { title: "Knowledge", href: "/knowledge", icon: BookOpen, color: "text-purple-400" },
                ].map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <Link
                      key={idx}
                      href={m.href}
                      className="p-3.5 rounded-2xl bg-card border border-border flex items-center gap-2.5 hover:border-blue-500 hover:scale-[1.04] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-foreground"
                    >
                      <Icon size={18} className={m.color} /> {m.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Right Live Telemetry Card Showcase */}
          <ScrollReveal direction="left" delay={150} className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              onClick={() => setSelectedModal(heroModal)}
              className="group w-full max-w-lg rounded-3xl border border-border bg-card p-8 shadow-2xl space-y-6 hover:scale-[1.02] hover:-translate-y-2 hover:border-blue-500/70 transition-all duration-300 ease-out cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">Aegis Neural Workspace</p>
                  <h3 className="text-2xl font-black mt-1 text-foreground group-hover:text-blue-400 transition">Real-Time Risk Telemetry</h3>
                </div>
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Critical Wire Intercept Box */}
              <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-black text-red-400">
                  <span className="flex items-center gap-1.5"><AlertTriangle size={14} /> CRITICAL WIRE INTERCEPT</span>
                  <span className="font-mono">CASE-8945-TXN</span>
                </div>
                <p className="text-lg font-black text-foreground">₹1.25 Crore ($150k USD) SWIFT Wire Held</p>
                <p className="text-xs font-semibold text-muted-foreground">Target: Apex Offshore LLC (Cayman Islands) • Session RDP Compromise</p>
              </div>

              {/* Metrics Pair */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-xs text-muted-foreground font-black uppercase">Managed Portfolio</p>
                  <p className="text-3xl font-black mt-1 font-mono text-foreground">₹480.5M</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-xs text-muted-foreground font-black uppercase">Max Churn Alert</p>
                  <p className="text-3xl font-black mt-1 font-mono text-amber-400">92%</p>
                </div>
              </div>

              {/* RM Action Suggestion Box */}
              <div className="rounded-2xl border border-border bg-background p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black uppercase text-muted-foreground">RM Prescriptive Recommendation</p>
                  <span className="text-[11px] font-black text-blue-400 opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                    Click to Expand <Maximize2 size={12} />
                  </span>
                </div>
                <p className="text-xs text-foreground font-bold leading-relaxed">
                  Offer Maya Iyer +0.75% deposit rate bonus within 48 hours to retain ₹18.4M liquid wealth portfolio.
                </p>
              </div>
            </div>
          </ScrollReveal>
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
