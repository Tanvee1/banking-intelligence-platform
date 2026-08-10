"use client";

import { AppLayout } from "@/components/layout";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  CustomerSearch,
  CustomerProfile,
  AISummary,
  NextBestActions,
  PortfolioTrend,
  RelationshipTimeline,
  ProductHoldings,
  CustomerCopilot,
} from "@/components/customer";

export default function CustomerPage() {
  return (
    <AppLayout>
      <main className="space-y-8 max-w-[1600px] mx-auto pb-16">
        <ScrollReveal direction="left" delay={50}>
          <CustomerSearch />
        </ScrollReveal>

        <ScrollReveal direction="left" delay={100}>
          <CustomerProfile />
        </ScrollReveal>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
          <ScrollReveal direction="left" delay={150}>
            <AISummary />
          </ScrollReveal>
          <ScrollReveal direction="left" delay={200}>
            <NextBestActions />
          </ScrollReveal>
        </div>

        <ScrollReveal direction="left" delay={250}>
          <PortfolioTrend />
        </ScrollReveal>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
          <ScrollReveal direction="left" delay={300}>
            <RelationshipTimeline />
          </ScrollReveal>
          <ScrollReveal direction="left" delay={350}>
            <ProductHoldings />
          </ScrollReveal>
        </div>

        <ScrollReveal direction="left" delay={400}>
          <CustomerCopilot />
        </ScrollReveal>
      </main>
    </AppLayout>
  );
}