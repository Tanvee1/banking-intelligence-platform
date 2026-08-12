"use client";

import { PhoneCall, Gift, ShieldAlert, Maximize2 } from "lucide-react";
import { useState } from "react";
import { CardModal, ModalData } from "@/components/common/CardModal";
import { ActionConfirmationModal } from "@/components/common/ActionConfirmationModal";

export function NextBestActions() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);
  const [actionToConfirm, setActionToConfirm] = useState<{
    id: string;
    title: string;
    targetId: string;
    description: string;
    expectedImpact: string;
    priority: string;
    actionKey: string;
  } | null>(null);

  const actions = [
    {
      id: "c-act-1",
      title: "Schedule Relationship Review Meeting",
      priority: "Immediate",
      impact: "Address complaint #8849 & present tailored Wealth Management portfolio terms.",
      icon: PhoneCall,
      modal: {
        title: "Action Plan: Schedule Relationship Review",
        category: "Client Engagement Directive",
        subtitle: "Executive outreach for Maya Iyer (CUST-40921)",
        badge: "Priority: Immediate",
        badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
        metrics: [
          { label: "Target Client", value: "Maya Iyer", change: "CUST-40921" },
          { label: "Channel", value: "Direct RM Voice Call", change: "+91 98765 43210" },
          { label: "Meeting Objective", value: "Fee Resolution & Rate Bonus", color: "text-blue-400" },
        ],
        description: "Schedule a dedicated 30-minute relationship review meeting with Maya Iyer to present waiving the disputed wire fee and extending preferred term deposit rates.",
        details: [
          "1. Review ticket #8849 history with Lead Specialist Tanvee",
          "2. Present +0.75% deposit bonus proposal",
          "3. Increase online wire limit to ₹50L",
        ],
        actionLabel: "Initiate Call Workflow",
        actionHref: "/customer",
      },
    },
    {
      id: "c-act-2",
      title: "Offer Premium Term Deposit (+0.75% Rate Bonus)",
      priority: "High",
      impact: "Incentivize retention of ₹50L liquid capital in high-yield account.",
      icon: Gift,
      modal: {
        title: "Offer Plan: Term Deposit Rate Bonus",
        category: "Wealth Product Incentive",
        subtitle: "+0.75% Interest Yield Extension on ₹50L Liquid Capital",
        badge: "Yield Enhancement",
        badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        metrics: [
          { label: "Deposit Value", value: "₹50,000,000", change: "Liquid Wealth" },
          { label: "Bonus Rate", value: "+0.75% p.a.", change: "Special Offer", color: "text-emerald-400" },
          { label: "Maturity", value: "12 Months", change: "Locked Retention" },
        ],
        description: "Generate a formal rate bonus agreement offering 8.00% p.a. on a 12-month fixed deposit, neutralizing external competitive yield offers.",
        details: [
          "1. Lock ₹50L liquid deposits under 12-month term",
          "2. Automated monthly interest payouts to primary wealth account",
        ],
        actionLabel: "Generate Offer Agreement",
        actionHref: "/customer",
      },
    },
    {
      id: "c-act-3",
      title: "Approve Disputed Wire Fee Reversal (₹2,500)",
      priority: "High",
      impact: "Resolves open complaint friction & restores positive interaction sentiment.",
      icon: ShieldAlert,
      modal: {
        title: "Fee Waiver: Reversal of ₹2,500 Wire Fee",
        category: "Customer Experience Resolution",
        subtitle: "Resolution of complaint ticket #8849",
        badge: "Instant Approval Ready",
        metrics: [
          { label: "Reversal Value", value: "₹2,500", change: "Full Waiver", color: "text-emerald-400" },
          { label: "Ticket ID", value: "#8849", change: "Open 14 Days" },
          { label: "Expected Impact", value: "+3.2 Sentiment", change: "Restores Trust" },
        ],
        description: "Approving this fee waiver immediately credits ₹2,500 to Maya Iyer's primary account and closes complaint ticket #8849.",
        details: [
          "1. Credit ₹2,500 to Savings Account #9948201",
          "2. Send confirmation SMS to +91 98765 43210",
        ],
        actionLabel: "Approve Fee Reversal",
        actionHref: "/customer",
      },
    },
  ];

  const handleOpenConfirm = (e: React.MouseEvent, act: (typeof actions)[0]) => {
    e.stopPropagation();
    setActionToConfirm({
      id: act.id,
      title: act.title,
      targetId: "Maya Iyer (CUST-40921)",
      description: act.modal.description,
      expectedImpact: act.impact,
      priority: act.priority,
      actionKey: act.id,
    });
  };

  const handleConfirmAction = () => {
    if (!actionToConfirm) return;
    setCompleted((prev) => ({ ...prev, [actionToConfirm.id]: true }));
    setActionToConfirm(null);
  };

  return (
    <>
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-foreground tracking-tight">RM Next Best Actions</h3>
            <p className="text-xs text-muted-foreground">AI Prescriptive Relationship Engagement</p>
          </div>
          <span className="text-xs font-semibold text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
            3 Actions
          </span>
        </div>

        <div className="space-y-3">
          {actions.map((act) => {
            const Icon = act.icon;
            const isDone = completed[act.id];

            return (
              <div
                key={act.id}
                onClick={() => setSelectedModal(act.modal)}
                className="group rounded-xl border border-border bg-muted/40 p-3.5 hover:border-blue-500/50 hover:bg-muted transition duration-150 cursor-pointer space-y-2"
              >
                {/* Header Row: Icon + Priority + Action Button */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 group-hover:scale-105 transition shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold border shrink-0 ${
                        act.priority === "Immediate"
                          ? "bg-red-500/10 text-red-500 border-red-500/20"
                          : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }`}
                    >
                      {act.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold text-blue-500 opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                      Expand <Maximize2 className="w-3 h-3" />
                    </span>
                    <button
                      onClick={(e) => handleOpenConfirm(e, act)}
                      disabled={isDone}
                      className={`rounded-lg px-3 py-1 font-bold text-xs transition ${
                        isDone
                          ? "bg-emerald-500/20 text-emerald-500 cursor-default border border-emerald-500/30"
                          : "bg-blue-600 text-white hover:bg-blue-500 shadow-xs cursor-pointer"
                      }`}
                    >
                      {isDone ? "Executed" : "Execute Action"}
                    </button>
                  </div>
                </div>

                {/* Title Line: Full Width, No Truncation */}
                <h4 className="font-bold text-xs text-foreground group-hover:text-blue-500 transition leading-snug">
                  {act.title}
                </h4>

                {/* Impact Description Line */}
                <p className="text-xs text-muted-foreground leading-relaxed">{act.impact}</p>
              </div>
            );
          })}
        </div>
      </section>

      <CardModal
        isOpen={!!selectedModal}
        onClose={() => setSelectedModal(null)}
        data={selectedModal}
      />

      <ActionConfirmationModal
        isOpen={!!actionToConfirm}
        onClose={() => setActionToConfirm(null)}
        action={actionToConfirm}
        onConfirm={handleConfirmAction}
      />
    </>
  );
}