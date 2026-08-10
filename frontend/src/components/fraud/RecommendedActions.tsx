"use client";

import { FraudCase, RecommendedAction } from "@/lib/fraud-data";
import { useState } from "react";
import { ActionConfirmationModal } from "@/components/common/ActionConfirmationModal";

interface RecommendedActionsProps {
  fraud: FraudCase;
}

export function RecommendedActions({ fraud, onExecuteAction }: RecommendedActionsProps & { onExecuteAction?: (key: string) => void }) {
  const [executed, setExecuted] = useState<Record<string, boolean>>({});
  const [selectedAction, setSelectedAction] = useState<RecommendedAction | null>(null);

  const handleConfirmAction = () => {
    if (!selectedAction) return;
    setExecuted((prev) => ({ ...prev, [selectedAction.id]: true }));
    if (onExecuteAction) onExecuteAction(selectedAction.actionKey);
    setSelectedAction(null);
  };

  return (
    <>
      <section className="rounded-2xl border border-border bg-card p-8 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h3 className="font-bold text-xl tracking-tight">Recommended Actions</h3>
          <span className="text-sm font-semibold text-muted-foreground">
            {fraud.actions.length} Available Protocol Actions
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {fraud.actions.map((act) => {
            const isDone = executed[act.id];

            return (
              <div
                key={act.id}
                className="rounded-xl border border-border bg-background p-6 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-base text-foreground">{act.title}</h4>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                        act.priority === "Immediate" || act.priority === "High"
                          ? "bg-red-500/15 text-red-400 border border-red-500/30"
                          : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {act.priority}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{act.description}</p>
                </div>

                <div className="pt-4 border-t border-border/80 flex items-center justify-between gap-3 text-sm">
                  <div>
                    <span className="text-xs text-muted-foreground font-bold uppercase block">Impact</span>
                    <span className="font-semibold text-foreground text-sm leading-tight block mt-0.5">
                      {act.expectedImpact}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedAction(act)}
                    disabled={isDone}
                    className={`rounded-xl px-5 py-2.5 font-bold text-sm transition shrink-0 cursor-pointer ${
                      isDone
                        ? "bg-emerald-500/20 text-emerald-400 cursor-default border border-emerald-500/30"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
                    }`}
                  >
                    {isDone ? "Executed" : "Execute Action"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ActionConfirmationModal
        isOpen={!!selectedAction}
        onClose={() => setSelectedAction(null)}
        action={
          selectedAction
            ? {
                title: selectedAction.title,
                targetId: fraud.id,
                description: selectedAction.description,
                expectedImpact: selectedAction.expectedImpact,
                priority: selectedAction.priority,
                actionKey: selectedAction.actionKey,
              }
            : null
        }

        onConfirm={handleConfirmAction}
      />
    </>
  );
}

