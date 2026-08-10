import { AppLayout } from "@/components/layout";
import {
  DashboardHeader,
  KPIGrid,
  AIInsights,
  TrendSection,
  Recommendations,
  FraudAlertFeed,
} from "@/components/dashboard";

export default function DashboardPage() {
  return (
    <AppLayout>
      <main className="space-y-8 max-w-[1600px] mx-auto pb-16">
        <DashboardHeader />

        <KPIGrid />

        <div className="grid gap-8 xl:grid-cols-2 items-stretch">
          <AIInsights />
          <TrendSection />
        </div>

        <Recommendations />

        <FraudAlertFeed />
      </main>
    </AppLayout>
  );
}