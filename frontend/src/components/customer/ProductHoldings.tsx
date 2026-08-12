"use client";

import { useState } from "react";
import { CreditCard, Landmark, Wallet, Globe, Maximize2 } from "lucide-react";
import { CardModal, ModalData } from "@/components/common/CardModal";

export function ProductHoldings() {
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);

  const products = [
    {
      title: "Imperial Savings Account",
      type: "Deposit Account",
      val: "₹42.8 Lakhs",
      status: "Active",
      icon: Landmark,
      modal: {
        title: "Imperial Savings Account #9948201",
        category: "Primary Deposit Product",
        subtitle: "High-yield liquid savings account for Maya Iyer",
        badge: "Status: Active",
        badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        metrics: [
          { label: "Current Balance", value: "₹4,280,000", change: "Liquid Capital", color: "text-emerald-400" },
          { label: "Interest Rate", value: "4.50% p.a.", change: "Quarterly Credit" },
          { label: "Daily Transfer Limit", value: "₹25.0 Lakhs", change: "Online IMPS/RTGS" },
        ],
        description: "Primary deposit account linked to net banking and wealth management products. Unresolved ticket #8849 relates to international wire fee charges.",
        details: [
          "Opened: Jan 2020 • 6 Years Tenure",
          "Automated monthly SIP debits linked to wealth fund",
        ],
        actionLabel: "View Account Statements",
        actionHref: "/customer",
      },
    },
    {
      title: "Global Multi-Currency Forex Card",
      type: "Foreign Exchange",
      val: "$15,000 USD",
      status: "Active",
      icon: Globe,
      modal: {
        title: "Multi-Currency Forex Card *8812",
        category: "Foreign Currency Instrument",
        subtitle: "Pre-loaded international travel card",
        badge: "Status: Active",
        badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        metrics: [
          { label: "Card Balance", value: "$15,000 USD", change: "Multi-Currency", color: "text-blue-400" },
          { label: "Currencies Loaded", value: "USD, GBP, EUR", change: "Zero Markup" },
          { label: "Atm Limit", value: "$2,000 / Day", change: "Global Access" },
        ],
        description: "Primary travel wallet used for overseas business trips in Europe and UAE. Zero foreign transaction markup.",
        details: [
          "Last transaction: London UK retail merchant",
          "Emergency card block available via mobile app",
        ],
        actionLabel: "Manage Card Controls",
        actionHref: "/customer",
      },
    },
    {
      title: "Visa Infinite Credit Card",
      type: "Credit Instrument",
      val: "₹15.0L Limit",
      status: "Active",
      icon: CreditCard,
      modal: {
        title: "Visa Infinite Credit Card *4921",
        category: "Ultra-Premium Credit Card",
        subtitle: "Primary credit instrument for Maya Iyer",
        badge: "Status: Active",
        badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        metrics: [
          { label: "Total Limit", value: "₹1,500,000", change: "Clean Credit Record", color: "text-emerald-400" },
          { label: "Available Credit", value: "₹1,180,000", change: "₹3.2L Outstanding" },
          { label: "Reward Balance", value: "48,200 Points", change: "Concierge Active" },
        ],
        description: "Premium credit card with unlimited airport lounge access, 24/7 global concierge service, and zero liability fraud protection.",
        details: [
          "Issued: HDFC Wealth Banking • Primary Signatory",
          "Clean repayment record over 6 years",
        ],
        actionLabel: "View Credit Telemetry",
        actionHref: "/customer",
      },
    },
    {
      title: "HDFC Wealth Managed Equity Fund",
      type: "Wealth Portfolio",
      val: "₹1.26 Crore",
      status: "Partial Withdrawal",
      icon: Wallet,
      modal: {
        title: "Wealth Managed Equity Fund #WF-904",
        category: "Wealth Asset Holding",
        subtitle: "Diversified large-cap equity mutual fund portfolio",
        badge: "Status: Partial Outflow",
        badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        metrics: [
          { label: "Holding Value", value: "₹12,600,000", change: "-₹45L Redemption", color: "text-amber-400" },
          { label: "Annual Return", value: "+16.4% p.a.", change: "Outperforming Benchmark" },
          { label: "Asset Class", value: "Large-Cap Equity", change: "High Yield" },
        ],
        description: "Core investment portfolio. Experienced ₹45L redemption 14 days ago to an external ICICI wealth account following wire fee dispute.",
        details: [
          "Remaining balance: ₹1.26 Crore",
          "Recommendation: Present +0.75% rate bonus on liquid term deposits to retain remaining capital",
        ],
        actionLabel: "Inspect Wealth Terms",
        actionHref: "/customer",
      },
    },
  ];

  return (
    <>
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h3 className="text-base font-bold text-foreground tracking-tight">Active Product Holdings</h3>
          <span className="text-xs font-medium text-muted-foreground">6 Banking Products</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                onClick={() => setSelectedModal(p.modal)}
                className="group rounded-xl border border-border bg-muted/40 p-4 flex items-center gap-3.5 hover:border-blue-500/50 hover:bg-muted transition-all duration-150 cursor-pointer"
              >
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 group-hover:scale-105 transition shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-semibold text-xs text-foreground group-hover:text-blue-500 transition leading-snug line-clamp-1">{p.title}</h4>
                    <Maximize2 className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition shrink-0" />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{p.type}</p>
                  <p className="text-xs font-bold font-mono mt-1 text-foreground">{p.val}</p>
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