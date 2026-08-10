"use client";

import { useState } from "react";
import { Sparkles, Maximize2 } from "lucide-react";
import { CardModal, ModalData } from "@/components/common/CardModal";

export function AISummary() {
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);

  const aiModal: ModalData = {
    title: "AI Retention & Health Synthesis — Maya Iyer",
    category: "Relationship Intelligence Analysis",
    subtitle: "Multi-agent model forecast for CUST-40921",
    badge: "92% Churn Risk",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    metrics: [
      { label: "Predicted Churn Window", value: "60 Days", change: "Accelerating Risk", color: "text-red-400" },
      { label: "Primary Outflow Vector", value: "₹45L Outflow", change: "External ICICI Wealth" },
      { label: "Tenure Standing", value: "6 Years", change: "6 Active Products", color: "text-emerald-400" },
      { label: "Dispute Ticket", value: "#8849", change: "₹2,500 Fee Friction" },
    ],
    description: "DeepRisk ML models indicate Maya Iyer's churn risk accelerated after experiencing unresolved friction on wire transfer limit caps and disputed fees. Extending rate bonuses and fee waivers converts a high-risk relationship into a long-term deposit holder.",
    details: [
      "28% cumulative reduction in term deposit balances over 90 days",
      "Historical sentiment score dropped from 8.4 to 5.2 out of 10",
      "Waiving disputed wire fee restores positive interaction sentiment",
    ],
    actionLabel: "Generate Retention Terms Offer",
    actionHref: "/customer",
  };

  return (
    <>
      <section
        onClick={() => setSelectedModal(aiModal)}
        className="group rounded-3xl border border-border bg-card p-8 shadow-md hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1.5 hover:border-blue-500/50 transition-all duration-300 ease-out cursor-pointer space-y-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-xs group-hover:scale-110 transition duration-300">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight group-hover:text-blue-400 transition">
                AI Retention & Health Briefing
              </h3>
              <p className="text-sm text-muted-foreground">Synthesized Relationship Intelligence</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              92% Churn Risk
            </span>
            <span className="text-xs font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
              <Maximize2 size={14} />
            </span>
          </div>
        </div>

        <div className="space-y-4 text-base text-foreground/90 leading-relaxed">
          <p className="bg-background p-5 rounded-2xl border border-border/80 group-hover:border-blue-500/30 transition">
            Aegis Churn Analytics flags Maya Iyer at a <strong className="text-foreground font-bold">92% probability of relationship attrition</strong> within 60 days. The risk acceleration is driven by a cumulative 28% reduction in term deposits and a transfer of ₹45 Lakhs to an external wealth competitor following a disputed wire transfer fee.
          </p>
          <p className="bg-background p-5 rounded-2xl border border-border/80 group-hover:border-blue-500/30 transition">
            Historical interaction sentiment analysis reveals dissatisfaction regarding digital wire transfer limits and delayed complaint resolution (Ticket #8849). However, Maya maintains strong tenure (6 years) and holds 6 active banking products, indicating high potential for retention if fee waivers and preferred wealth terms are extended promptly.
          </p>
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