"use client";

import { useState } from "react";
import { Sparkles, AlertTriangle, ArrowRight, Maximize2 } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { CardModal, ModalData } from "@/components/common/CardModal";

export function AIInsights() {
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);

  const insightModalMaya: ModalData = {
    title: "Executive Briefing: Maya Iyer (CUST-40921)",
    category: "Customer Churn Risk Synthesis",
    subtitle: "High-net-worth client showing severe balance attrition",
    badge: "Churn Probability: 92%",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    metrics: [
      { label: "Portfolio AUM", value: "₹18.4M", change: "-₹45L (30 Days)", color: "text-amber-500" },
      { label: "Client Segment", value: "Affluent Wealth", change: "6 Year Relationship" },
      { label: "Active Dispute", value: "#8849 Wire Limit", change: "Fee Friction" },
      { label: "Prescriptive Action", value: "+0.75% Bonus Rate", change: "Waive Fee" },
    ],
    description: "DeepRisk ML models flagged Maya Iyer's account after observing continuous liquid fund transfers to an external wealth manager. Prompt relationship manager engagement with term deposit interest incentives can retain ₹18.4M AUM.",
    details: [
      "Outflow destination: External wealth account (ICICI Prudential)",
      "Pending support ticket: Disputed ₹2,500 wire fee unresolved for 14 days",
      "Recommended RM action: Schedule retention call within 24 hours",
    ],
    actionLabel: "Open Customer Profile Workspace",
    actionHref: "/customer",
  };

  const insightModalSwift: ModalData = {
    title: "Executive Briefing: CASE-8945-TXN",
    category: "Corporate Wire Fraud Intercept",
    subtitle: "High-velocity SWIFT transfer intercepted prior to offshore release",
    badge: "Risk Score: 99/100 (CRITICAL)",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    metrics: [
      { label: "Intercepted Wire", value: "₹1.25 Crore", change: "$150,000 USD", color: "text-red-400" },
      { label: "Customer", value: "Karan Mehta", change: "GlobalCorp Treasury" },
      { label: "Beneficiary", value: "Apex Offshore LLC", change: "Cayman Islands" },
      { label: "Threat Vector", value: "RDP Compromise", change: "Phished CFO Session" },
    ],
    description: "Aegis Autonomous Risk Engine automatically placed an emergency hold on a ₹1.25 Crore international SWIFT wire after detecting a phished Remote Desktop Protocol (RDP) session routing from an unrecognized IP in the Cayman Islands.",
    details: [
      "Session route: Windows Server RDP compromise from IP 103.224.180.12",
      "Beneficiary account Apex Offshore LLC is flagged in 3 Interpol money laundering SARs",
      "Mandatory compliance directive: Prepare 24-hour FIU-IND SAR disclosure",
    ],
    actionLabel: "Open Fraud Investigation Workstation",
    actionHref: "/fraud",
  };

  return (
    <>
      <ScrollReveal direction="left" delay={150}>
        <section className="rounded-3xl border border-border bg-card p-8 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-xs">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">AI Executive Morning Briefing</h3>
                <p className="text-sm text-muted-foreground">Synthesized Multi-Agent Risk Reasoning</p>
              </div>
            </div>

            <span className="text-xs font-bold font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
              DeepRisk v4.2 Synthesis
            </span>
          </div>

          <div className="space-y-4 text-base text-foreground/90 leading-relaxed font-normal">
            {/* Item 1 */}
            <div
              onClick={() => setSelectedModal(insightModalMaya)}
              className="group p-5 rounded-2xl bg-background border border-border hover:border-amber-500/50 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-500 flex items-center gap-1.5">
                  <AlertTriangle size={16} /> High Churn Risk Identified
                </span>
                <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition">Maya Iyer (CUST-40921)</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Maya Iyer&apos;s predicted churn risk has reached <strong className="text-foreground font-bold">92%</strong> following sustained deposit declines (-₹45L in 30 days) and 2 unresolved service complaints regarding wire transfer limits.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition duration-300">
                  Click to Expand <Maximize2 size={12} />
                </span>
                <Link
                  href="/customer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-bold text-blue-500 hover:underline flex items-center gap-1"
                >
                  Inspect Customer Intelligence <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Item 2 */}
            <div
              onClick={() => setSelectedModal(insightModalSwift)}
              className="group p-5 rounded-2xl bg-background border border-border hover:border-red-500/50 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-red-500 flex items-center gap-1.5">
                  <AlertTriangle size={16} /> Critical Fraud Wire Intercepted
                </span>
                <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition">CASE-8945-TXN</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Aegis Interception Engine automatically froze a <strong className="text-foreground font-bold">₹1.25 Crore ($150k USD)</strong> SWIFT wire transfer targeted to Apex Offshore LLC in the Cayman Islands following an RDP session hijack.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-bold text-red-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition duration-300">
                  Click to Expand <Maximize2 size={12} />
                </span>
                <Link
                  href="/fraud"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-bold text-red-400 hover:underline flex items-center gap-1"
                >
                  Open Fraud Workstation <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <CardModal
        isOpen={!!selectedModal}
        onClose={() => setSelectedModal(null)}
        data={selectedModal}
      />
    </>
  );
}