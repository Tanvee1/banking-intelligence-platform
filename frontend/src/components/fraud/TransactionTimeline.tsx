"use client";

import { FraudCase } from "@/lib/fraud-data";
import { Clock } from "lucide-react";

interface TransactionTimelineProps {
  fraud: FraudCase;
}

export function TransactionTimeline({ fraud }: TransactionTimelineProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-8 shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h3 className="font-bold text-xl tracking-tight">Timeline Audit Trail</h3>
          <span className="text-sm font-mono text-muted-foreground">{fraud.timeline.length} Events</span>
        </div>

        <div className="mt-6 relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
          {fraud.timeline.map((evt) => (
            <div key={evt.id} className="relative flex items-start gap-4">
              <span
                className={`absolute -left-6 top-2 h-3 w-3 rounded-full ${
                  evt.status === "critical"
                    ? "bg-red-500 ring-4 ring-red-500/20"
                    : evt.status === "warning"
                    ? "bg-amber-500 ring-4 ring-amber-500/20"
                    : "bg-emerald-500 ring-4 ring-emerald-500/20"
                }`}
              />

              <div className="flex-1 bg-background p-4 rounded-xl border border-border">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h4 className="font-bold text-base text-foreground">{evt.event}</h4>
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                    <Clock size={14} /> {evt.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{evt.details}</p>
                {evt.ip && (
                  <p className="text-xs font-mono text-muted-foreground/80 mt-2">
                    IP: {evt.ip} {evt.device && `• ${evt.device}`}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
