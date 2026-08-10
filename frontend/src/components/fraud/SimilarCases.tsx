"use client";

import { FraudCase } from "@/lib/fraud-data";

interface SimilarCasesProps {
  fraud: FraudCase;
}

export function SimilarCases({ fraud }: SimilarCasesProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-8 shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h3 className="font-bold text-xl tracking-tight">Similar Historical Cases</h3>
          <span className="text-sm text-muted-foreground">{fraud.similarCases.length} Precedents</span>
        </div>

        <div className="mt-6 space-y-4">
          {fraud.similarCases.map((sc, i) => (
            <div key={i} className="rounded-xl border border-border bg-background p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base font-mono">{sc.caseId}</span>
                <span className="text-sm font-extrabold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                  {sc.similarity} Match
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                Customer: <span className="font-medium text-foreground">{sc.customer}</span> • Date: {sc.date}
              </p>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Outcome: <strong className="text-foreground font-semibold">{sc.outcome}</strong>
                </span>
                <span className="text-emerald-400 font-extrabold font-mono">{sc.recovery}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
