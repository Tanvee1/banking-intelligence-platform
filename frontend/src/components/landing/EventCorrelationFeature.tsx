"use client";

import { Calendar, Tag, Sparkles, TrendingDown, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function EventCorrelationFeature() {
  const events = [
    { month: "Nov 2025", title: "Peak Wealth Portfolio", category: "Deposit Peak", desc: "AUM reached peak ₹24.1M across wealth management holdings." },
    { month: "Mar 2026", title: "RBI Repo Rate Hike (+50 bps)", category: "Macro Event", desc: "Central bank rate increase triggered yield-chasing behavior." },
    { month: "May 2026", title: "Disputed Wire Fee Ticket #8849", category: "Customer Touchpoint", desc: "Disputed ₹2,500 fee initiated accelerated -₹45L outflow." },
    { month: "Jul 2026", title: "Competitor 8.5% FD Offer", category: "Competitor Campaign", desc: "Peer bank targeted high-net-worth deposit balance." },
  ];

  return (
    <section id="event-telemetry" className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 space-y-16">
        <ScrollReveal direction="left" delay={50} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-black uppercase tracking-widest text-amber-400">
              <Sparkles size={14} /> Root-Cause Predictive Intelligence
            </div>

            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
              Real-World Event Overlays on Time-Series Data
            </h2>

            <p className="text-base text-muted-foreground font-semibold leading-relaxed">
              Financial metrics never move in isolation. Aegis overlays real-world macroeconomic shifts, customer support disputes, and market campaigns directly onto portfolio time-series charts.
            </p>

            <div className="space-y-3">
              {[
                "Macro interest rate & central bank policy correlation",
                "Customer dispute ticket & fee friction tracking",
                "Competitor rate campaign impact analysis",
                "AI-generated cause-and-effect narrative summaries",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs font-bold text-foreground">
                  <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Log */}
          <div className="lg:col-span-6 rounded-3xl border border-border bg-card p-8 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <Calendar size={14} className="text-blue-400" /> Correlated Real-World Event Stream
              </span>
              <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20">
                Live Data Link
              </span>
            </div>

            <div className="space-y-3">
              {events.map((evt, i) => (
                <div key={i} className="p-4 rounded-2xl border border-border bg-background space-y-1 hover:border-blue-500/50 transition">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-muted-foreground">{evt.month}</span>
                    <span className="font-black text-[10px] uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {evt.category}
                    </span>
                  </div>
                  <p className="text-sm font-black text-foreground">{evt.title}</p>
                  <p className="text-xs text-muted-foreground font-medium">{evt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
