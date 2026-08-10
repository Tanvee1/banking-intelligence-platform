"use client";

import { useState } from "react";
import { Clock, Phone, AlertCircle, FileText, Maximize2 } from "lucide-react";
import { CardModal, ModalData } from "@/components/common/CardModal";

export function RelationshipTimeline() {
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);

  const events = [
    {
      title: "Outbound Service Call",
      desc: "RM Tanvee discussed wealth portfolio performance & addressed ticket #8849.",
      time: "2 Days ago",
      icon: Phone,
      modal: {
        title: "Touchpoint Audit: Outbound Phone Call",
        category: "Client Communication Log",
        subtitle: "15-Minute phone consultation by Lead RM Tanvee",
        badge: "Status: Follow-Up Pending",
        metrics: [
          { label: "Date & Time", value: "2 Days Ago", change: "Duration: 14m 20s" },
          { label: "Assigned RM", value: "Tanvee Bhangale", change: "Lead Specialist" },
          { label: "Client Sentiment", value: "Friction Noted", color: "text-amber-400" },
        ],
        description: "Discussed liquid deposit holdings and wire fee dispute. Customer expressed frustration over wire limit caps. Recommended waiving ₹2,500 fee.",
        details: [
          "1. Action item: Issue fee reversal for ticket #8849",
          "2. Send revised term deposit rate bonus schedule (+0.75%)",
        ],
        actionLabel: "View Interaction Log",
        actionHref: "/customer",
      },
    },
    {
      title: "Disputed Wire Transfer Fee Complaint",
      desc: "Customer logged Ticket #8849 regarding ₹2,500 international wire surcharge.",
      time: "5 Days ago",
      icon: AlertCircle,
      modal: {
        title: "Support Incident: Complaint Ticket #8849",
        category: "Customer Service Friction",
        subtitle: "Unresolved ₹2,500 wire fee charge dispute",
        badge: "Status: Open (14 Days)",
        badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        metrics: [
          { label: "Disputed Value", value: "₹2,500", change: "International Wire" },
          { label: "Ticket ID", value: "#8849", change: "Open 14 Days", color: "text-amber-400" },
          { label: "Impact Risk", value: "Accelerated Churn", color: "text-red-400" },
        ],
        description: "Maya Iyer logged a formal complaint regarding an unannounced ₹2,500 fee charged on an international remittance wire transfer.",
        details: [
          "Resolution path: Full fee waiver approved by RM Desk",
          "Credit timing: Instant reversal to Savings Account #9948201",
        ],
        actionLabel: "Execute Fee Reversal",
        actionHref: "/customer",
      },
    },
    {
      title: "Mutual Fund Redemption Executed",
      desc: "Redeemed ₹45L equity fund units to external HDFC Bank account.",
      time: "14 Days ago",
      icon: FileText,
      modal: {
        title: "Ledger Event: ₹45 Lakh Redemption Outflow",
        category: "Portfolio Capital Attrition",
        subtitle: "Major liquid fund transfer to external ICICI wealth account",
        badge: "Outflow Event: ₹45.0L",
        badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
        metrics: [
          { label: "Redemption Value", value: "₹4,500,000", change: "Equity Mutual Fund", color: "text-red-400" },
          { label: "Destination", value: "ICICI Wealth", change: "External Competitor" },
          { label: "Churn Impact", value: "92% Churn Score", color: "text-red-400" },
        ],
        description: "Redeemed ₹45 Lakhs from HDFC Wealth Managed Equity Fund following wire fee dispute. Sparked ML model churn alert.",
        details: [
          "Immediate counter-measure: Propose +0.75% rate bonus on remaining ₹50L liquid deposits",
        ],
        actionLabel: "Inspect Outflow Ledger",
        actionHref: "/customer",
      },
    },
  ];

  return (
    <>
      <section className="rounded-3xl border border-border bg-card p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h3 className="text-xl font-bold tracking-tight">Relationship Timeline</h3>
          <span className="text-sm font-semibold text-muted-foreground">Audit Log</span>
        </div>

        <div className="space-y-4">
          {events.map((evt, i) => {
            const Icon = evt.icon;
            return (
              <div
                key={i}
                onClick={() => setSelectedModal(evt.modal)}
                className="group rounded-2xl border border-border bg-background p-5 flex items-start gap-4 hover:border-blue-500/60 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 group-hover:scale-110 transition duration-300 shrink-0">
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base text-foreground group-hover:text-blue-400 transition">{evt.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                        Expand <Maximize2 size={12} />
                      </span>
                      <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                        <Clock size={12} /> {evt.time}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{evt.desc}</p>
                </div>
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
    </>
  );
}