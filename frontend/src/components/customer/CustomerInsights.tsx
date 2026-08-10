"use client";

import {
  TrendingDown,
  AlertTriangle,
  ShieldCheck,
  Wallet,
  ArrowUpRight,
} from "lucide-react";

const insights = [
  {
    title: "Deposit Trend",
    value: "-17%",
    desc: "Average deposits have steadily declined over the last 90 days.",
    icon: TrendingDown,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    title: "Fraud Risk",
    value: "Low",
    desc: "No suspicious transactions detected in the past 6 months.",
    icon: ShieldCheck,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Customer Sentiment",
    value: "Negative",
    desc: "Recent complaint and reduced engagement impacted sentiment.",
    icon: AlertTriangle,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Cross-Sell Opportunity",
    value: "High",
    desc: "Eligible for Wealth Advisory and Premium Investment Products.",
    icon: Wallet,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
];

export function CustomerInsights() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Customer Intelligence Snapshot
          </h2>
          <p className="text-sm text-muted-foreground">
            AI-generated overview across relationship, fraud and portfolio.
          </p>
        </div>

        <button className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          View Details
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-border p-5 hover:bg-muted/40 transition"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-3 ${item.bg}`}>
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    {item.title}
                  </p>

                  <p className="text-xl font-bold">
                    {item.value}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted-foreground leading-6">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}