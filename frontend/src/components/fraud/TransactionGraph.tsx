"use client";

import { FraudCase } from "@/lib/fraud-data";
import { User, CreditCard, Building, Smartphone, MapPin, ChevronRight } from "lucide-react";

interface TransactionGraphProps {
  fraud: FraudCase;
}

export function TransactionGraph({ fraud }: TransactionGraphProps) {
  const steps = [
    {
      icon: <User size={18} className="text-blue-500" />,
      label: "Customer",
      value: fraud.customer.name,
      sub: fraud.customer.id,
      stepNum: 1,
    },
    {
      icon: <CreditCard size={18} className="text-emerald-500" />,
      label: "Financial Instrument",
      value: "Debit Account",
      sub: fraud.amount,
      stepNum: 2,
    },
    {
      icon: <Building size={18} className="text-purple-500" />,
      label: "Merchant Recipient",
      value: fraud.merchant.name,
      sub: fraud.merchant.category,
      stepNum: 3,
    },
    {
      icon: <Smartphone size={18} className="text-amber-500" />,
      label: "Originating Device",
      value: fraud.device.name,
      sub: fraud.device.ip,
      stepNum: 4,
    },
    {
      icon: <MapPin size={18} className="text-red-500" />,
      label: "Geolocation Proxy",
      value: `${fraud.location.city}, ${fraud.location.country}`,
      sub: fraud.location.anomaly,
      stepNum: 5,
    },
  ];

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <h3 className="font-bold text-lg text-foreground tracking-tight">Transaction Network Flow</h3>
          <p className="text-xs text-muted-foreground">Entity Path Telemetry & Network Hop Sequence</p>
        </div>
        <span className="text-xs font-semibold text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
          5 Network Hops
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-1">
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex flex-col justify-between rounded-xl border border-border bg-muted/40 p-4 text-left space-y-2 min-w-0 group hover:border-blue-500/50 transition">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider truncate">
                Hop 0{step.stepNum} • {step.label}
              </span>
              <div className="p-1 rounded-md bg-background border border-border shrink-0">
                {step.icon}
              </div>
            </div>

            <div className="min-w-0 space-y-0.5 pt-1">
              <p className="font-extrabold text-sm text-foreground truncate group-hover:text-blue-500 transition" title={step.value}>
                {step.value}
              </p>
              <p className="text-[11px] text-muted-foreground truncate font-mono" title={step.sub}>
                {step.sub}
              </p>
            </div>

            {idx < steps.length - 1 && (
              <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 h-5 w-5 items-center justify-center rounded-full bg-card border border-border text-muted-foreground shadow-xs">
                <ChevronRight size={12} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
