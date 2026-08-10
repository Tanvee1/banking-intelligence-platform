"use client";

import { ShieldCheck, UserCheck, Lock, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function RolePersonaSection() {
  const personas = [
    {
      role: "Relationship Manager",
      badge: "Wealth & Commercial Tier",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      description: "Manage client health, prevent high-net-worth deposit attrition, and generate automated rate bonus proposals.",
      permitted: ["/dashboard", "/customer", "/settings"],
    },
    {
      role: "Fraud Analyst",
      badge: "Financial Crime & Intercept",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
      description: "Investigate high-risk wire transfers, inspect RDP/Tor session velocity, and execute emergency account freezes.",
      permitted: ["/dashboard", "/fraud", "/settings"],
    },
    {
      role: "Compliance Officer",
      badge: "Regulatory & Audit",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      description: "Perform RAG policy search over RBI master directions and audit 24-hour FIU-IND SAR filing compliance.",
      permitted: ["/dashboard", "/knowledge", "/settings"],
    },
  ];

  return (
    <section id="personas" className="py-20 lg:py-28 bg-muted/20 border-t border-border/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 space-y-16">
        <ScrollReveal direction="left" delay={50} className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-xs font-black uppercase tracking-widest text-purple-400">
            Role-Based Workstations
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
            Tailored Experiences for Every Banking Persona
          </h2>
          <p className="text-base text-muted-foreground font-semibold leading-relaxed">
            Role-Based Access Control (RBAC) ensures each banking team member sees relevant telemetry and controls appropriate for their mandate.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personas.map((p, i) => (
            <ScrollReveal key={i} direction="left" delay={i * 100}>
              <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <UserCheck className="h-6 w-6 text-blue-400" />
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-foreground">{p.role}</h3>
                  <p className="text-xs text-muted-foreground font-semibold leading-relaxed">{p.description}</p>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Authorized Modules:</p>
                  <div className="flex flex-wrap gap-2">
                    {p.permitted.map((route, rIdx) => (
                      <span key={rIdx} className="text-[11px] font-mono font-bold text-foreground bg-background border border-border px-2.5 py-1 rounded-xl">
                        {route}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
