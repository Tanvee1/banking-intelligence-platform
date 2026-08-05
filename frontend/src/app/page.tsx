import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center justify-between gap-28 px-8 py-20 lg:px-12">
        <div className="max-w-xl">
          <span className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            AI-Powered Banking Workspace
          </span>

          <h1 className="mt-8 text-7xl font-semibold tracking-tight">
            Aegis
          </h1>

          <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight">
            Enterprise AI Banking Intelligence Platform
          </h2>

          <p className="mt-8 max-w-lg text-lg leading-9 text-muted-foreground">
            Empowering relationship managers, fraud analysts, and compliance
            teams with AI-driven customer intelligence, fraud investigation,
            enterprise knowledge retrieval, and predictive insights.
          </p>

          <div className="mt-14">
            <Link
              href="/login"
              className="group inline-flex items-center gap-3 rounded-xl bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Enter Workspace
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Secure access for authorized relationship managers, fraud analysts,
              and compliance officers.
            </p>
          </div>

          <div className="mt-16 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Designed For
            </p>

            <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
              <span>Relationship Managers</span>
              <span>Fraud Analysts</span>
              <span>Compliance Officers</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="w-[560px] rounded-3xl border bg-card p-8 shadow-sm">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  Enterprise Workspace
                </p>

                <h3 className="mt-2 text-3xl font-semibold">
                  Today's AI Brief
                </h3>
              </div>

              <div className="rounded-2xl border p-5">
                <p className="text-sm font-medium text-muted-foreground">
                  AI Insight
                </p>

                <p className="mt-3 text-base leading-8">
                  Maya Iyer&apos;s predicted churn risk has increased to{" "}
                  <span className="font-semibold">92%</span> after sustained
                  declines in deposits, reduced digital engagement and recent
                  complaint activity.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border p-5">
                  <p className="text-sm text-muted-foreground">Customers</p>
                  <p className="mt-2 text-4xl font-semibold">128</p>
                </div>

                <div className="rounded-2xl border p-5">
                  <p className="text-sm text-muted-foreground">High Risk</p>
                  <p className="mt-2 text-4xl font-semibold">9</p>
                </div>
              </div>

              <div className="rounded-2xl border p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Predicted Deposit Trend
                  </p>

                  <span className="text-sm font-medium">
                    Next 90 Days
                  </span>
                </div>

                <div className="mt-6 flex h-24 items-end gap-2">
                  {[40,52,68,84,66,48,36,45,20,30,50,60,65,70,45,54,43,32,21].map((h, i) => (
                    <div
                      key={i}
                      className="w-4 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.15)]"
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border p-5">
                <p className="text-sm font-medium text-muted-foreground">
                  Recommended Action
                </p>

                <p className="mt-3 leading-8">
                  Schedule a portfolio review within the next 48 hours and
                  proactively discuss investment and savings options to reduce
                  predicted churn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
