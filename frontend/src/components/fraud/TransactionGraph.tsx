"use client";

import { FraudCase } from "@/lib/fraud-data";
import { ArrowRight, User, CreditCard, Building, Smartphone, MapPin } from "lucide-react";

interface TransactionGraphProps {
  fraud: FraudCase;
}

export function TransactionGraph({ fraud }: TransactionGraphProps) {
  const steps = [
    {
      icon: <User size={22} className="text-blue-400" />,
      label: "Customer",
      value: fraud.customer.name,
      sub: fraud.customer.id,
    },
    {
      icon: <CreditCard size={22} className="text-emerald-400" />,
      label: "Financial Instrument",
      value: "Debit Account",
      sub: fraud.amount,
    },
    {
      icon: <Building size={22} className="text-purple-400" />,
      label: "Merchant Recipient",
      value: fraud.merchant.name,
      sub: fraud.merchant.category,
    },
    {
      icon: <Smartphone size={22} className="text-amber-400" />,
      label: "Originating Device",
      value: fraud.device.name,
      sub: fraud.device.ip,
    },
    {
      icon: <MapPin size={22} className="text-red-400" />,
      label: "Geolocation Proxy",
      value: `${fraud.location.city}, ${fraud.location.country}`,
      sub: fraud.location.anomaly,
    },
  ];

  return (
    <section className="rounded-2xl border border-border bg-card p-8 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h3 className="font-bold text-xl tracking-tight">Transaction Network Flow</h3>
        <span className="text-sm font-semibold text-muted-foreground">Entity Path Telemetry</span>
      </div>

      <div className="mt-6 flex flex-col xl:flex-row items-center justify-between gap-4">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-4 w-full xl:w-auto">
            <div className="flex-1 xl:w-56 rounded-xl border border-border bg-background p-5 text-left flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {step.label}
                </span>
                {step.icon}
              </div>
              <p className="font-extrabold text-base text-foreground truncate">{step.value}</p>
              <p className="text-xs text-muted-foreground truncate font-mono">{step.sub}</p>
            </div>

            {idx < steps.length - 1 && (
              <ArrowRight size={22} className="text-muted-foreground hidden xl:block shrink-0" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
