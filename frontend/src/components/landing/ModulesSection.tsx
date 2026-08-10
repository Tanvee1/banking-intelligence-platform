"use client";

import Link from "next/link";
import { Users, ShieldAlert, BookOpen, Bot, ArrowRight, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function ModulesSection() {
  const modules = [
    {
      id: "customer",
      title: "Customer Intelligence",
      subtitle: "Client Health & Churn Risk Prediction",
      description: "Machine learning models monitor deposit flow, service tickets, and account engagement to identify churn risks before funds leave the bank.",
      features: [
        "92% Churn Risk Alerting with root-cause analysis",
        "12-Month deposit attrition time-series telemetry",
        "Prescriptive rate bonus & fee waiver offer generators",
      ],
      link: "/customer",
      icon: Users,
      badge: "Wealth Management Tier",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    {
      id: "fraud",
      title: "Fraud Intelligence",
      subtitle: "Autonomous Wire Intercept & Workstation",
      description: "Real-time threat detection analyzing session device fingerprints, Tor IP exit nodes, and SWIFT velocity anomalies.",
      features: [
        "Immediate emergency account & wire transfer freezes",
        "Interactive transaction graph & session velocity timelines",
        "Automated FIU-IND Suspicious Activity Report (SAR) drafts",
      ],
      link: "/fraud",
      icon: ShieldAlert,
      badge: "Financial Crime Defense",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
    },
    {
      id: "knowledge",
      title: "Knowledge Intelligence",
      subtitle: "RAG Policy Search & Regulatory SOP Retrieval",
      description: "Retrieval-Augmented Generation (RAG) engine over RBI Master Directions, KYC mandates, and internal banking compliance SOPs.",
      features: [
        "Cited policy answers with section-level accuracy",
        "24-Hour mandatory SAR filing window audit tracker",
        "10% UBO equity ownership EDD compliance verification",
      ],
      link: "/knowledge",
      icon: BookOpen,
      badge: "Regulatory RAG Engine",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    },
    {
      id: "copilot",
      title: "Multi-Agent AI Copilot",
      subtitle: "Cross-Domain Natural Language Assistant",
      description: "Autonomous AI agents collaborate across customer metrics, fraud cases, and regulatory documents to resolve complex queries instantly.",
      features: [
        "Global slide-over assistant accessible from any screen",
        "Evidence citations linking customers, cases & SOPs",
        "Google Gemini LLM orchestration with offline resilience",
      ],
      link: "/dashboard",
      icon: Bot,
      badge: "Multi-Agent Architecture",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    },
  ];

  return (
    <section id="modules" className="py-20 lg:py-28 bg-muted/20 border-y border-border/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 space-y-16">
        {/* Section Header */}
        <ScrollReveal direction="left" delay={50} className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-black uppercase tracking-widest text-blue-400">
            Unified Enterprise Architecture
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
            Four Specialized Intelligence Modules
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-semibold leading-relaxed">
            Eliminate siloed banking applications. Aegis brings customer relationships, fraud investigation, regulatory policies, and AI reasoning into a single workspace.
          </p>
        </ScrollReveal>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <ScrollReveal key={m.id} direction="left" delay={idx * 100}>
                <div className="group h-full rounded-3xl border border-border bg-card p-8 shadow-md hover:shadow-2xl hover:border-blue-500/60 transition-all duration-300 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3.5 rounded-2xl bg-blue-600/10 border border-blue-500/30 text-blue-400 group-hover:scale-110 transition duration-300">
                        <Icon size={24} />
                      </div>
                      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${m.badgeColor}`}>
                        {m.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-foreground group-hover:text-blue-400 transition">{m.title}</h3>
                      <p className="text-xs font-bold text-muted-foreground mt-0.5">{m.subtitle}</p>
                    </div>

                    <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
                      {m.description}
                    </p>

                    {/* Features List */}
                    <div className="pt-2 space-y-2">
                      {m.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-bold text-foreground">
                          <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Link
                      href={m.link}
                      className="inline-flex items-center gap-2 text-xs font-black text-blue-400 group-hover:text-blue-300 transition"
                    >
                      Explore {m.title} Module <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
