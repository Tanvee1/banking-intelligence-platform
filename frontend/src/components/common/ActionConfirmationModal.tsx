"use client";

import { useState } from "react";
import { ShieldAlert, AlertTriangle, CheckCircle2, X } from "lucide-react";

interface ActionDetails {
  title: string;
  targetId: string;
  description: string;
  expectedImpact: string;
  priority: string;
  actionKey: string;
}

interface ActionConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: ActionDetails | null;
  onConfirm: () => void;
}

export function ActionConfirmationModal({
  isOpen,
  onClose,
  action,
  onConfirm,
}: ActionConfirmationModalProps) {
  const [reason, setReason] = useState("");
  const [understood, setUnderstood] = useState(false);

  if (!isOpen || !action) return null;

  const handleConfirm = () => {
    onConfirm();
    setReason("");
    setUnderstood(false);
    onClose();
  };

  const isCritical = action.priority === "Immediate" || action.priority === "High";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-2xl border ${
                isCritical
                  ? "bg-red-500/10 border-red-500/30 text-red-400"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-400"
              }`}
            >
              {isCritical ? <ShieldAlert size={24} /> : <AlertTriangle size={24} />}
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                Human-in-the-Loop Safeguard (SOP-RBAC-2026)
              </span>
              <h3 className="text-xl font-black text-foreground tracking-tight">Confirm Action Execution</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Action Details Summary Card */}
        <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-muted-foreground">Target Subject:</span>
            <span className="font-mono font-black text-blue-400">{action.targetId}</span>
          </div>

          <div>
            <h4 className="font-black text-foreground text-sm">{action.title}</h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{action.description}</p>
          </div>

          <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-bold">Expected Financial Impact:</span>
            <span className="font-black text-emerald-400">{action.expectedImpact}</span>
          </div>
        </div>

        {/* Confirmation Reason Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground block">
            Execution Rationale / Supervisory Audit Note:
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Verified device location anomaly with customer via phone auth"
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Safety Acknowledgement Checkbox */}
        <label className="flex items-start gap-3 text-xs font-semibold text-muted-foreground cursor-pointer select-none">
          <input
            type="checkbox"
            checked={understood}
            onChange={(e) => setUnderstood(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border bg-background text-blue-600 focus:ring-blue-500"
          />
          <span>
            I confirm that I have reviewed the AI recommendation and authorize this operational banking action.
          </span>
        </label>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-border text-xs font-bold text-muted-foreground hover:bg-muted transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={!understood}
            className={`px-6 py-2.5 rounded-xl text-xs font-black text-white transition flex items-center gap-2 shadow-md cursor-pointer ${
              !understood
                ? "bg-blue-600/40 opacity-50 cursor-not-allowed"
                : isCritical
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <CheckCircle2 size={16} /> Confirm & Execute Action
          </button>
        </div>
      </div>
    </div>
  );
}
