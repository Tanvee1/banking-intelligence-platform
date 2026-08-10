"use client";

import { Clock, Maximize2 } from "lucide-react";
import { FraudCase } from "@/lib/fraud-data";
import { useState } from "react";

interface FraudQueueProps {
  cases: FraudCase[];
  selectedCaseId: string;
  onSelectCase: (fraud: FraudCase) => void;
}

export function FraudQueue({
  cases,
  selectedCaseId,
  onSelectCase,
}: FraudQueueProps) {
  const [riskTab, setRiskTab] = useState<"ALL" | "High" | "Medium" | "Low">("ALL");

  const filteredCases = cases.filter((c) => {
    if (riskTab === "High") return c.risk === "High" || c.risk === "Critical";
    if (riskTab === "Medium") return c.risk === "Medium";
    if (riskTab === "Low") return c.risk === "Low";
    return true;
  });

  return (
    <aside className="rounded-3xl border border-border bg-card overflow-hidden shadow-md">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h2 className="text-xl font-bold">Fraud Queue</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {cases.length} Open investigation cases
        </p>

        {/* Risk Level Tabs */}
        <div className="mt-4 flex gap-1.5 bg-background p-1.5 rounded-xl border border-border text-sm font-semibold">
          {(["ALL", "High", "Medium", "Low"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setRiskTab(tab)}
              className={`flex-1 py-2 rounded-lg font-bold transition ${
                riskTab === tab
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Case List */}
      <div className="divide-y divide-border overflow-y-auto max-h-[750px]">
        {filteredCases.map((fraud) => {
          const isSelected = fraud.id === selectedCaseId;

          return (
            <button
              key={fraud.id}
              onClick={() => onSelectCase(fraud)}
              className={`w-full p-6 text-left hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out ${
                isSelected
                  ? "bg-muted/90 border-l-4 border-l-blue-500 font-medium"
                  : "hover:bg-muted/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                    {fraud.transactionId}
                    {isSelected && <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">Active</span>}
                  </h3>
                  <p className="text-sm font-medium text-foreground/90 mt-1">{fraud.customer.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{fraud.merchant.name}</p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold shrink-0 ${
                    fraud.risk === "Critical" || fraud.risk === "High"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : fraud.risk === "Medium"
                      ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                      : "bg-green-500/15 text-green-400 border border-green-500/30"
                  }`}
                >
                  {fraud.risk}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-extrabold font-mono">{fraud.amount}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Clock size={14} /> {fraud.time}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}