"use client";

import { useState } from "react";
import { ShieldCheck, Download, CheckCircle, Maximize2 } from "lucide-react";
import { CardModal, ModalData } from "@/components/common/CardModal";

export interface PolicyDoc {
  id: string;
  title: string;
  category: string;
  effectiveDate: string;
  version: string;
  clause: string;
  content: string[];
  mandatorySteps: string[];
}

export const mockPolicies: PolicyDoc[] = [
  {
    id: "SOP-2026-KYC",
    title: "High Net-Worth Individual (HNWI) Enhanced Due Diligence & Beneficial Ownership Policy",
    category: "KYC & AML",
    effectiveDate: "2026-01-15",
    version: "v4.2",
    clause: "Section 4.2 — Ultimate Beneficial Owner (UBO) Verification",
    content: [
      "All customers classified under Affluent, HNI, or Private Banking segments with aggregate portfolio AUM exceeding ₹1 Crore ($120k USD equivalent) are subject to mandatory Enhanced Due Diligence (EDD) upon onboarding and triennially thereafter.",
      "Relationship Managers must independently verify Ultimate Beneficial Ownership (UBO) controlling interest down to a 10% natural person threshold for all connected corporate holding entities, offshore trusts, or shell structures.",
      "Any un-biometric session initiation or login from non-standard FATF high-risk jurisdictions (e.g. Cayman Islands, Panama, Seychelles) requires immediate out-of-band identity re-verification before processing outbound capital transfers.",
    ],
    mandatorySteps: [
      "Obtain certified passport copy & tax residency declaration.",
      "Verify source of wealth via audited financial statements or dividend tax returns.",
      "Cross-check UBO individuals against OFAC, EU, UN, and RBI Interpol sanctions lists.",
    ],
  },
  {
    id: "SOP-2026-WIRE",
    title: "High-Value SWIFT & IMPS Outbound Wire Transfer Escalation Protocol",
    category: "Wire Transfers",
    effectiveDate: "2026-03-01",
    version: "v3.8",
    clause: "Section 7.1 — Dual-Control Approval & Cooldown Bypass Controls",
    content: [
      "Outbound wire transfers exceeding ₹25,000,000 (2.5 Crore) or single international transfers over $50,000 USD mandate dual-control sign-off by a Senior Relationship Manager and the Financial Crime Compliance Desk.",
      "Newly added beneficiary accounts are subjected to a mandatory 24-hour cooling-off period during which maximum single transfer caps are restricted to ₹50,000 unless explicit 3DS push biometric authorization is verified on primary registered hardware.",
    ],
    mandatorySteps: [
      "Verify primary device hardware fingerprint match.",
      "Perform voice biometric callback to primary registered phone.",
      "Confirm destination account SWIFT BIC code against cross-bank SAR database.",
    ],
  },
  {
    id: "SOP-2026-AML",
    title: "Suspicious Activity Reporting (SAR) & FIU-IND Disclosure Standard Operating Procedure",
    category: "Fraud SOPs",
    effectiveDate: "2026-02-10",
    version: "v5.0",
    clause: "Section 2.4 — 24-Hour Mandatory FIU Disclosure Window",
    content: [
      "Upon intercepting confirmed account takeover (ATO), remote access trojan (RAT) unauthorized access, or money mule routing, the lead analyst must draft an FIU-IND Suspicious Activity Report within 24 hours.",
    ],
    mandatorySteps: [
      "Freeze target ledger debit functionality.",
      "Export full device IP, MAC, and session audit logs.",
      "Submit electronic SAR draft to Chief Compliance Officer.",
    ],
  },
];

interface DocumentViewerProps {
  selectedDocId: string;
  onSelectDoc: (id: string) => void;
}

export function DocumentViewer({ selectedDocId, onSelectDoc }: DocumentViewerProps) {
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);
  const currentDoc = mockPolicies.find((p) => p.id === selectedDocId) || mockPolicies[0];

  const handleExpandDoc = () => {
    setSelectedModal({
      title: `${currentDoc.id}: ${currentDoc.title}`,
      category: `Regulatory Standard — ${currentDoc.category}`,
      subtitle: `${currentDoc.clause} (${currentDoc.version})`,
      badge: `Effective ${currentDoc.effectiveDate}`,
      metrics: [
        { label: "Document ID", value: currentDoc.id, change: currentDoc.category },
        { label: "Audit Standard", value: "RBI Master Direction", change: "2026 Edition" },
        { label: "Compliance Status", value: "100% Aligned", color: "text-emerald-400" },
      ],
      description: currentDoc.content.join("\n\n"),
      details: currentDoc.mandatorySteps.map((s, idx) => `Step ${idx + 1}: ${s}`),
      actionLabel: "Export Regulatory Audit Package",
      actionHref: "/knowledge",
    });
  };

  return (
    <>
      <section
        onClick={handleExpandDoc}
        className="group rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition duration-150 cursor-pointer space-y-5"
      >
        {/* Policy Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-border text-xs scrollbar-none">
          {mockPolicies.map((p) => (
            <button
              key={p.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectDoc(p.id);
              }}
              className={`px-3 py-2 rounded-lg font-bold transition whitespace-nowrap ${
                currentDoc.id === p.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "border border-border bg-muted/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.id} — {p.category}
            </button>
          ))}
        </div>

        {/* Policy Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[11px] font-bold text-blue-500 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
              {currentDoc.version} • Effective {currentDoc.effectiveDate}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                Expand SOP <Maximize2 className="w-3.5 h-3.5" />
              </span>
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-foreground group-hover:text-blue-500 transition leading-snug">{currentDoc.title}</h2>
          <p className="text-xs font-semibold text-blue-500">{currentDoc.clause}</p>
        </div>

        {/* Main Content Paragraphs */}
        <div className="space-y-3 text-sm text-foreground/90 leading-relaxed">
          {currentDoc.content.map((para, idx) => (
            <p key={idx} className="bg-muted/40 p-4 rounded-xl border border-border">
              {para}
            </p>
          ))}
        </div>

        {/* Mandatory Compliance Steps */}
        <div className="pt-3 border-t border-border space-y-2.5">
          <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Mandatory Compliance Protocol Checklist
          </h4>
          <div className="space-y-1.5 text-xs text-foreground/90">
            {currentDoc.mandatorySteps.map((step, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-muted/40 p-3 rounded-lg border border-border">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-foreground font-medium">{step}</span>
              </div>
            ))}
          </div>
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
