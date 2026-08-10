"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  fraudCases,
  FraudCase,
} from "@/lib/fraud-data";
import {
  FraudSearch,
  FraudQueue,
  FraudCaseProfile,
  FraudInsights,
  RecommendedActions,
  TransactionGraph,
  TransactionTimeline,
  SimilarCases,
  FraudCopilot,
} from "@/components/fraud";

export default function FraudPage() {
  const [allCases, setAllCases] = useState<FraudCase[]>(fraudCases);
  const [selectedCaseId, setSelectedCaseId] = useState<string>(fraudCases[0].id);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRiskFilter, setSelectedRiskFilter] = useState("ALL");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");

  const displayedCases = allCases.filter((c) => {
    if (selectedRiskFilter !== "ALL") {
      if (selectedRiskFilter === "High" && c.risk !== "Critical" && c.risk !== "High") return false;
      if (selectedRiskFilter !== "High" && c.risk !== selectedRiskFilter) return false;
    }

    if (selectedStatusFilter !== "ALL" && c.status !== selectedStatusFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = c.id.toLowerCase().includes(q) || c.transactionId.toLowerCase().includes(q);
      const matchCustomer = c.customer.name.toLowerCase().includes(q);
      const matchMerchant = c.merchant.name.toLowerCase().includes(q);
      return matchId || matchCustomer || matchMerchant;
    }

    return true;
  });

  const selectedCase =
    allCases.find((c) => c.id === selectedCaseId) || displayedCases[0] || allCases[0];

  const handleUpdateStatus = (caseId: string, newStatus: FraudCase["status"]) => {
    setAllCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, status: newStatus } : c))
    );
  };

  return (
    <AppLayout>
      <main className="space-y-8 max-w-[1600px] mx-auto pb-16">
        {/* Top Search & Filter Bar */}
        <ScrollReveal direction="left" delay={50}>
          <FraudSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedRiskFilter={selectedRiskFilter}
            setSelectedRiskFilter={setSelectedRiskFilter}
            selectedStatusFilter={selectedStatusFilter}
            setSelectedStatusFilter={setSelectedStatusFilter}
            allCases={allCases}
          />
        </ScrollReveal>

        {/* 2-Column Workstation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Queue */}
          <aside className="lg:col-span-4">
            <ScrollReveal direction="left" delay={100}>
              <FraudQueue
                cases={displayedCases}
                selectedCaseId={selectedCase.id}
                onSelectCase={(c) => setSelectedCaseId(c.id)}
              />
            </ScrollReveal>
          </aside>

          {/* Right Workspace */}
          <section className="lg:col-span-8 space-y-8">
            <ScrollReveal direction="left" delay={150}>
              <FraudCaseProfile
                fraud={selectedCase}
                onUpdateStatus={handleUpdateStatus}
              />
            </ScrollReveal>

            <ScrollReveal direction="left" delay={200}>
              <FraudInsights fraud={selectedCase} />
            </ScrollReveal>

            <ScrollReveal direction="left" delay={250}>
              <RecommendedActions
                fraud={selectedCase}
                onExecuteAction={(actionKey) => {
                  if (actionKey === "freeze") handleUpdateStatus(selectedCase.id, "Frozen");
                  if (actionKey === "escalate") handleUpdateStatus(selectedCase.id, "Escalated");
                }}
              />
            </ScrollReveal>

            <ScrollReveal direction="left" delay={300}>
              <TransactionGraph fraud={selectedCase} />
            </ScrollReveal>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
              <ScrollReveal direction="left" delay={350}>
                <TransactionTimeline fraud={selectedCase} />
              </ScrollReveal>
              <ScrollReveal direction="left" delay={400}>
                <SimilarCases fraud={selectedCase} />
              </ScrollReveal>
            </div>

            <ScrollReveal direction="left" delay={450}>
              <FraudCopilot fraud={selectedCase} />
            </ScrollReveal>
          </section>
        </div>
      </main>
    </AppLayout>
  );
}