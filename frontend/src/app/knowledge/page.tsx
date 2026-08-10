"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  KnowledgeSearch,
  DocumentViewer,
  KnowledgeCopilot,
} from "@/components/knowledge";

export default function KnowledgePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedDocId, setSelectedDocId] = useState("SOP-2026-KYC");

  return (
    <AppLayout>
      <main className="space-y-8 max-w-[1600px] mx-auto pb-16">
        <ScrollReveal direction="left" delay={50}>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Knowledge Intelligence</h1>
            <p className="text-base text-muted-foreground mt-1">
              Enterprise Banking Policy, Regulatory SOPs & Compliance Retrieval Engine
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="left" delay={100}>
          <KnowledgeSearch
            query={query}
            setQuery={setQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <ScrollReveal direction="left" delay={150}>
              <DocumentViewer
                selectedDocId={selectedDocId}
                onSelectDoc={(id) => setSelectedDocId(id)}
              />
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal direction="left" delay={200}>
              <KnowledgeCopilot />
            </ScrollReveal>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}