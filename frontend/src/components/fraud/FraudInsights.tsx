"use client";

import { useState } from "react";
import { FraudCase } from "@/lib/fraud-data";
import { Maximize2 } from "lucide-react";
import { CardModal, ModalData } from "@/components/common/CardModal";

interface FraudInsightsProps {
  fraud: FraudCase;
}

export function FraudInsights({ fraud }: FraudInsightsProps) {
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);
  const paragraphs = fraud.aiSummary.split("\n\n").filter(Boolean);

  const handleExpandSummary = () => {
    setSelectedModal({
      title: `AI Synthesis Report: Case ${fraud.id}`,
      category: "Neural Multi-Agent Risk Breakdown",
      subtitle: `Customer: ${fraud.customer.name} (${fraud.customer.id})`,
      badge: `Risk Rating: ${fraud.risk} (${fraud.riskScore}/100)`,
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
      metrics: [
        { label: "Case ID", value: fraud.id, change: fraud.transactionType },
        { label: "Flagged Amount", value: fraud.amount, change: "100% Intercepted", color: "text-red-400" },
        { label: "Assigned Analyst", value: fraud.analyst, change: "Financial Crime Unit" },
      ],
      description: fraud.aiSummary,
      details: [
        `Device: ${fraud.device.name} (IP ${fraud.device.ip})`,
        `Location Anomaly: ${fraud.location.anomaly}`,
        `Merchant Target: ${fraud.merchant.name} (${fraud.merchant.country})`,
      ],
      actionLabel: "Export Investigation Report",
      actionHref: "/fraud",
    });
  };

  return (
    <>
      <section
        onClick={handleExpandSummary}
        className="group rounded-3xl border border-border bg-card p-8 shadow-md hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 hover:border-red-500/50 transition-all duration-300 ease-out cursor-pointer"
      >
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h3 className="font-bold text-xl tracking-tight group-hover:text-red-400 transition">AI Investigation Summary</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-red-400 opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
              Click to Expand <Maximize2 size={14} />
            </span>
            <span className="text-sm font-semibold font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Neural Score: {fraud.riskScore}/100
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-base text-foreground/90 leading-relaxed font-normal">
          {paragraphs.map((para, i) => (
            <p key={i} className="bg-background p-5 rounded-2xl border border-border/80 group-hover:border-red-500/30 transition">
              {para}
            </p>
          ))}
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
