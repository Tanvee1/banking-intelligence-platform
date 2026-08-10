"use client";

import { useState } from "react";
import { FraudCase } from "@/lib/fraud-data";
import { Maximize2 } from "lucide-react";
import { CardModal, ModalData } from "@/components/common/CardModal";

interface FraudCaseProfileProps {
  fraud: FraudCase;
  onUpdateStatus?: (caseId: string, newStatus: FraudCase["status"]) => void;
}

export function FraudCaseProfile({ fraud, onUpdateStatus }: FraudCaseProfileProps) {
  const [selectedModal, setSelectedModal] = useState<ModalData | null>(null);

  const openMerchantModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedModal({
      title: `Merchant: ${fraud.merchant.name}`,
      category: "Entity Risk Intelligence",
      subtitle: `Category: ${fraud.merchant.category}`,
      badge: `Merchant ID: ${fraud.merchant.merchantId}`,
      metrics: [
        { label: "Merchant Country", value: fraud.merchant.country, change: "MCC High Risk" },
        { label: "Flagged SARs", value: "3 Cross-Bank Matches", color: "text-red-400" },
        { label: "Transaction Value", value: fraud.amount, change: fraud.transactionType },
      ],
      description: `Target merchant ${fraud.merchant.name} in ${fraud.merchant.country} operates under MCC 6051 (High Risk Crypto/Currency Exchange). Intercepted due to 0-minute beneficiary cooldown bypass.`,
      details: [
        "Wallet address associated with 3 recent cross-bank SAR disclosures",
        "Recommended action: Block merchant MCC 6051 transfers",
      ],
      actionLabel: "View Fraud Workstation",
      actionHref: "/fraud",
    });
  };

  const openDeviceModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedModal({
      title: `Device Telemetry: ${fraud.device.name}`,
      category: "Device Fingerprint & Session Audit",
      subtitle: `IP: ${fraud.device.ip} (${fraud.device.trustScore})`,
      badge: fraud.device.isVpnOrTor ? "Tor Exit Relay Flagged" : "Standard IP",
      badgeColor: fraud.device.isVpnOrTor ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20",
      metrics: [
        { label: "Device Trust", value: fraud.device.trustScore, change: "UNTRUSTED", color: "text-red-400" },
        { label: "IP Geolocation", value: fraud.device.ip, change: fraud.device.vpnName },
        { label: "Hardware MAC", value: fraud.device.mac, change: "Unrecognized Binding" },
      ],
      description: `Unrecognized device (${fraud.device.name}) initiated an un-biometric password reset via Tor proxy IP ${fraud.device.ip}. Session tokens invalidated.`,
      details: [
        "Device Trust Score: 12/100 (High-risk Tor relay)",
        "Invalidate active SSO session tokens & require hardware key MFA",
      ],
      actionLabel: "Inspect Network Graph",
      actionHref: "/fraud",
    });
  };

  const openLocationModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedModal({
      title: `Velocity Anomaly: ${fraud.location.city}, ${fraud.location.country}`,
      category: "Physical Location Telemetry",
      subtitle: fraud.location.anomaly,
      badge: "Velocity Anomaly Flagged",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
      metrics: [
        { label: "Location", value: `${fraud.location.city}, ${fraud.location.country}`, change: "Non-Resident" },
        { label: "Travel Anomaly", value: "1,920 km in 42 mins", color: "text-red-400" },
        { label: "Primary Base", value: "Mumbai, IN", change: "Mobile Session 11:00 UTC" },
      ],
      description: `Impossible travel velocity detected: Customer authenticated via FaceID in Mumbai at 11:00 UTC, followed 42 minutes later by a session in Dubai, UAE.`,
      details: [
        "Primary mobile hardware session remains active in Mumbai",
        "Secondary web portal login attempted from Dubai Tor exit node",
      ],
      actionLabel: "Review Case Timeline",
      actionHref: "/fraud",
    });
  };

  return (
    <>
      <section className="rounded-3xl border border-border bg-card p-8 shadow-md space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-3xl font-extrabold tracking-tight">{fraud.customer.name}</h2>
              <span
                className={`rounded-full px-3.5 py-1 text-sm font-bold ${
                  fraud.risk === "Critical" || fraud.risk === "High"
                    ? "bg-red-500/15 text-red-400 border border-red-500/30"
                    : fraud.risk === "Medium"
                    ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                    : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                }`}
              >
                {fraud.risk} Risk ({fraud.riskScore}/100)
              </span>
              <span className="text-sm text-muted-foreground font-mono bg-muted px-2.5 py-0.5 rounded-md font-semibold">
                {fraud.id}
              </span>
            </div>

            <p className="text-base text-muted-foreground mt-2">
              {fraud.customer.id} • {fraud.customer.tier} • {fraud.transactionType}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                Transaction Amount
              </span>
              <p className="text-4xl font-black font-mono mt-0.5 text-foreground">{fraud.amount}</p>
            </div>

            <select
              value={fraud.status}
              onChange={(e) => onUpdateStatus && onUpdateStatus(fraud.id, e.target.value as FraudCase["status"])}
              className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-bold outline-none cursor-pointer hover:border-blue-500 transition"
            >
              <option value="Under Review">Status: Under Review</option>
              <option value="Escalated">Status: Escalated</option>
              <option value="Frozen">Status: Frozen</option>
              <option value="Cleared">Status: Cleared</option>
            </select>
          </div>
        </div>

        {/* Primary Attributes Grid (Sub-cards with hover pop & dedicated click expand) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {/* Card 1: Merchant */}
          <div
            onClick={openMerchantModal}
            className="group rounded-2xl border border-border bg-background p-5 hover:border-red-500/60 hover:shadow-2xl hover:scale-[1.04] hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider block group-hover:text-red-400 transition">
                Merchant & Category
              </span>
              <Maximize2 size={12} className="text-red-400 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="font-bold text-base mt-2 text-foreground group-hover:text-red-400 transition">{fraud.merchant.name}</p>
            <p className="text-xs text-muted-foreground truncate">{fraud.merchant.category}</p>
          </div>

          {/* Card 2: Device */}
          <div
            onClick={openDeviceModal}
            className="group rounded-2xl border border-border bg-background p-5 hover:border-blue-500/60 hover:shadow-2xl hover:scale-[1.04] hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider block group-hover:text-blue-400 transition">
                Device & IP
              </span>
              <Maximize2 size={12} className="text-blue-400 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="font-bold text-base mt-2 text-foreground group-hover:text-blue-400 transition">{fraud.device.name}</p>
            <p className="text-xs text-muted-foreground font-mono truncate">{fraud.device.ip}</p>
          </div>

          {/* Card 3: Location */}
          <div
            onClick={openLocationModal}
            className="group rounded-2xl border border-border bg-background p-5 hover:border-red-500/60 hover:shadow-2xl hover:scale-[1.04] hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider block group-hover:text-red-400 transition">
                Location & Velocity
              </span>
              <Maximize2 size={12} className="text-red-400 opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="font-bold text-base mt-2 text-foreground group-hover:text-red-400 transition">
              {fraud.location.city}, {fraud.location.country}
            </p>
            <p className="text-xs text-red-400 font-medium truncate">{fraud.location.anomaly}</p>
          </div>

          {/* Card 4: Specialist */}
          <div className="rounded-2xl border border-border bg-background p-5">
            <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider block">
              Assigned Specialist
            </span>
            <p className="font-bold text-base mt-2 text-foreground">{fraud.analyst}</p>
            <p className="text-xs text-muted-foreground mt-1">Lead Financial Crime Desk</p>
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
