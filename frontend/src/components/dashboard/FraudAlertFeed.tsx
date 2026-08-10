"use client";

import { useState } from "react";
import { ShieldAlert, Clock, ExternalLink, Maximize2 } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { CardModal, ModalData } from "@/components/common/CardModal";

export function FraudAlertFeed() {
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);

  const alerts = [
    {
      id: "CASE-8942-TXN",
      customer: "Maya Iyer",
      amount: "₹4,20,000",
      risk: "High Risk (94)",
      desc: "Velocity Anomaly: Dubai Tor Exit Node 42m after Mumbai active session",
      time: "2 mins ago",
      modal: {
        title: "Fraud Case Intercept: CASE-8942-TXN",
        category: "Device & Geolocation Anomaly",
        subtitle: "High-value outbound IMPS wire transfer flagged in Dubai",
        badge: "Risk Score: 94/100 (HIGH)",
        badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
        metrics: [
          { label: "Transfer Value", value: "₹4,20,000", change: "14x Daily Average", color: "text-red-400" },
          { label: "Customer", value: "Maya Iyer", change: "CUST-40921 (Affluent)" },
          { label: "Beneficiary", value: "LuxPay Global Exch", change: "Dubai, UAE" },
          { label: "Session Route", value: "Tor Exit Node", change: "185.220.101.5" },
        ],
        description: "Aegis Risk Engine flagged this transaction due to a composite velocity anomaly: customer authenticated via FaceID in Mumbai at 11:00 UTC, followed 42 minutes later by a password reset request from a Linux user-agent in Dubai.",
        details: [
          "Beneficiary added less than 3 minutes prior to wire execution",
          "Wallet address flagged in 3 cross-institutional SAR disclosures",
          "Recommended action: Mandatory 3DS push challenge & account freeze",
        ],
        actionLabel: "Open Fraud Workstation",
        actionHref: "/fraud",
      },
    },
    {
      id: "CASE-8945-TXN",
      customer: "Karan Mehta",
      amount: "₹1,25,00,000",
      risk: "Critical (99)",
      desc: "RDP Exploit & Phished SSO Session targeting Cayman Islands offshore entity",
      time: "3 mins ago",
      modal: {
        title: "Fraud Case Intercept: CASE-8945-TXN",
        category: "Corporate Treasury Wire Hijack",
        subtitle: "High-value SWIFT international transfer targeted to Cayman Islands",
        badge: "Risk Score: 99/100 (CRITICAL)",
        badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
        metrics: [
          { label: "Wire Transfer Value", value: "₹1.25 Crore", change: "$150,000 USD", color: "text-red-500" },
          { label: "Corporate Account", value: "Karan Mehta", change: "GlobalCorp Treasury" },
          { label: "Offshore Beneficiary", value: "Apex Offshore LLC", change: "Cayman Islands" },
          { label: "Threat Vector", value: "RDP Session Hijack", change: "Stolen SSO Tokens" },
        ],
        description: "Emergency auto-freeze triggered prior to SWIFT release. Session established via Windows Server RDP compromise following spear-phishing attack on corporate CFO assistant.",
        details: [
          "Beneficiary Apex Offshore LLC linked to Interpol money laundering syndicate",
          "Dual-control approval rules bypassed by reusing hijacked session tokens",
          "Mandatory compliance window: Draft FIU-IND SAR within 24 hours",
        ],
        actionLabel: "Open Fraud Workstation",
        actionHref: "/fraud",
      },
    },
    {
      id: "CASE-8943-TXN",
      customer: "Arjun Sharma",
      amount: "₹1,85,000",
      risk: "Medium Risk (68)",
      desc: "Card-Not-Present transaction in London 24 hours prior to travel notice date",
      time: "18 mins ago",
      modal: {
        title: "Fraud Case Intercept: CASE-8943-TXN",
        category: "International CNP E-commerce",
        subtitle: "Luxury electronics purchase in London matching early flight arrival",
        badge: "Risk Score: 68/100 (MEDIUM)",
        badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        metrics: [
          { label: "Purchase Value", value: "₹1,85,000", change: "£1,750 GBP", color: "text-amber-400" },
          { label: "Customer", value: "Arjun Sharma", change: "CUST-38104 (Private)" },
          { label: "Merchant", value: "Apple Store London", change: "United Kingdom" },
          { label: "Travel Plan Mismatch", value: "-24 Hours", change: "Departure Aug 10" },
        ],
        description: "Moderate anomaly triggered due to early travel timing. Billing address and device profile match historical records. Soft-challenge via 3DS Push recommended.",
        details: [
          "Registered travel notice on file for UK & EU starting August 10",
          "Residential UK broadband IP address (Virgin Media UK)",
          "Recommended action: Issue soft 3DS push notification",
        ],
        actionLabel: "Open Fraud Workstation",
        actionHref: "/fraud",
      },
    },
  ];

  return (
    <>
      <ScrollReveal direction="left" delay={250}>
        <section className="rounded-3xl border border-border bg-card p-8 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">Live Fraud Intercept Feed</h3>
                <p className="text-sm text-muted-foreground">Real-Time Aegis Autonomous Defense Events</p>
              </div>
            </div>

            <Link
              href="/fraud"
              className="text-sm font-bold text-blue-500 hover:underline flex items-center gap-1.5"
            >
              Open Fraud Workstation <ExternalLink size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            {alerts.map((a, aIdx) => (
              <div
                key={a.id}
                onClick={() => setSelectedModal(a.modal)}
                className="group rounded-2xl border border-border bg-background p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-red-500/50 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-base text-foreground group-hover:text-red-400 transition">{a.id}</span>
                    <span className="text-sm font-semibold text-foreground">• {a.customer}</span>
                    <span className="rounded-full bg-red-500/15 text-red-400 border border-red-500/30 px-2.5 py-0.5 text-xs font-extrabold">
                      {a.risk}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{a.desc}</p>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-2 shrink-0">
                  <span className="font-black font-mono text-xl text-foreground group-hover:text-red-400 transition">{a.amount}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-red-400 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center gap-1">
                      Expand <Maximize2 size={12} />
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={12} /> {a.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
