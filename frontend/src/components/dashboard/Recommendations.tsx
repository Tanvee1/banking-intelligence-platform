"use client";

import { useState } from "react";
import { Check, PhoneCall, Lock, FileText, Maximize2 } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { CardModal, ModalData } from "@/components/common/CardModal";
import { ActionConfirmationModal } from "@/components/common/ActionConfirmationModal";

export function Recommendations() {
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

  const recs = [
    {
      id: "r1",
      title: "Schedule Retention Call with Maya Iyer",
      priority: "Immediate",
      impact: "Prevents potential ₹18.4M deposit churn to competing wealth firm.",
      icon: PhoneCall,
      action: "Initiate Call",
      modal: {
        title: "Retention Plan: Maya Iyer (CUST-40921)",
        category: "Relationship Management Directive",
        subtitle: "Proactive churn mitigation offer for ₹18.4M affluent account",
        badge: "Expected Retention Impact: High",
        metrics: [
          { label: "Target Account AUM", value: "₹18.4M", change: "6 Year Tenure" },
          { label: "Predicted Churn Score", value: "92%", change: "Deposit Outflows", color: "text-amber-400" },
          { label: "Interest Rate Offer", value: "+0.75%", change: "50L Liquid Term Bonus" },
          { label: "Fee Dispute Action", value: "Waive ₹2,500", change: "Unresolved Ticket #8849" },
        ],
        description: "Executing this action waives the disputed wire transfer fee and generates a customized +0.75% rate bonus proposal to retain liquid deposits.",
        details: [
          "1. Waive disputed ₹2,500 wire transfer fee on ticket #8849",
          "2. Extend +0.75% interest bonus on ₹50L liquid term deposit",
          "3. Increase online wire transfer limit to ₹50L with 3DS push auth",
        ],
        actionLabel: "Open Customer Profile Workspace",
        actionHref: "/customer",
      },
    },
    {
      id: "r2",
      title: "Confirm Cayman Islands SWIFT Hold for CASE-8945",
      priority: "Critical",
      impact: "Maintains emergency lock on ₹1.25 Cr corporate treasury transfer.",
      icon: Lock,
      action: "Confirm Lock",
      modal: {
        title: "Emergency Hold Confirmation: CASE-8945-TXN",
        category: "Financial Crime Countermeasure",
        subtitle: "Offshore SWIFT wire fraud interception on corporate treasury account",
        badge: "Risk Score: 99/100 (CRITICAL)",
        badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
        metrics: [
          { label: "Target Transfer", value: "₹1.25 Crore", change: "$150,000 USD", color: "text-red-400" },
          { label: "Corporate Client", value: "Karan Mehta", change: "GlobalCorp Treasury" },
          { label: "Beneficiary Entity", value: "Apex Offshore LLC", change: "Cayman Islands" },
          { label: "Authentication Vector", value: "RDP Compromise", change: "Phished SSO Session" },
        ],
        description: "Confirms emergency hold protocol blocking outbound SWIFT wire transmission. Revokes active SSO session tokens and triggers mandatory C-suite callback.",
        details: [
          "1. Immediately block outbound SWIFT ledger transfer",
          "2. Revoke active corporate SSO and Remote Desktop session tokens",
          "3. Initiate automated voice call to Corporate Treasurer Karan Mehta",
        ],
        actionLabel: "Open Fraud Workstation",
        actionHref: "/fraud",
      },
    },
    {
      id: "r3",
      title: "Submit FIU-IND SAR Disclosure for ATO Syndicate",
      priority: "High",
      impact: "Ensures compliance with anti-money laundering reporting deadline.",
      icon: FileText,
      action: "Draft SAR",
      modal: {
        title: "FIU-IND Regulatory Disclosure Draft",
        category: "Compliance SOP-2026-AML",
        subtitle: "24-Hour Mandatory Disclosure requirement for confirmed ATO wire hijack",
        badge: "Filing Window: <18 Hours Remaining",
        metrics: [
          { label: "Target Case", value: "CASE-8945-TXN", change: "Cayman Islands Wire", color: "text-red-400" },
          { label: "Regulatory Body", value: "FIU-IND", change: "Financial Intelligence Unit" },
          { label: "Mandatory Window", value: "24 Hours", change: "SOP-2026-AML Sec 2.4" },
          { label: "Sanctions Link", value: "3 SAR Matches", change: "Interpol ATO Syndicate" },
        ],
        description: "Generates electronic Suspicious Activity Report (SAR) payload with attached session telemetry, IP geolocation records, and device fingerprint hashes.",
        details: [
          "1. Attach Tor IP telemetry and RDP session compromise logs",
          "2. Cross-reference Apex Offshore LLC BIC against Interpol SAR database",
          "3. Submit encrypted JSON payload to FIU-IND compliance gateway",
        ],
        actionLabel: "Access Knowledge Policy Index",
        actionHref: "/knowledge",
      },
    },
  ];

  const handleOpenConfirm = (e: React.MouseEvent, r: (typeof recs)[0]) => {
    e.stopPropagation();
    setActionToConfirm({
      id: r.id,
      title: r.title,
      targetId: r.id === "r1" ? "Maya Iyer (CUST-40921)" : "CASE-8945-TXN",
      description: r.modal.description,
      expectedImpact: r.impact,
      priority: r.priority,
      actionKey: r.id,
    });
  };

  const handleConfirmAction = () => {
    if (!actionToConfirm) return;
    setCompleted((prev) => ({ ...prev, [actionToConfirm.id]: true }));
    setActionToConfirm(null);
  };

  return (
    <>
      <ScrollReveal direction="left" delay={150}>
        <section className="rounded-3xl border border-border bg-card p-8 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Prescriptive AI Recommendations</h3>
              <p className="text-sm text-muted-foreground">Priority Executive & RM Action Items</p>
            </div>
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              3 Items Requiring Action
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recs.map((r, rIdx) => {
              const Icon = r.icon;
              const isDone = completed[r.id];

              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedModal(r.modal)}
                  className="group rounded-2xl border border-border bg-background p-6 flex flex-col justify-between space-y-4 hover:border-blue-500/60 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 group-hover:scale-110 transition duration-300">
                        <Icon size={18} />
                      </div>
                      <span
                        className={`rounded-full px-3 py-0.5 text-xs font-extrabold ${
                          r.priority === "Critical" || r.priority === "Immediate"
                            ? "bg-red-500/15 text-red-400 border border-red-500/30"
                            : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {r.priority}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-foreground mt-3 group-hover:text-blue-400 transition">{r.title}</h4>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{r.impact}</p>
                  </div>

                  <div className="pt-4 border-t border-border/80 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center gap-1">
                      Expand <Maximize2 size={12} />
                    </span>
                    <button
                      onClick={(e) => handleOpenConfirm(e, r)}
                      disabled={isDone}
                      className={`rounded-xl px-5 py-2.5 font-bold text-xs transition ${
                        isDone
                          ? "bg-emerald-500/20 text-emerald-400 cursor-default border border-emerald-500/30"
                          : "bg-blue-600 text-white hover:bg-blue-700 shadow-xs cursor-pointer"
                      }`}
                    >
                      {isDone ? "Executed" : r.action}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

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