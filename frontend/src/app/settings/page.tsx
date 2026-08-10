"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  ThemeSettings,
  RiskModelSettings,
  SecuritySettings,
  NotificationSettings,
} from "@/components/settings";

export default function SettingsPage() {
  const [tab, setTab] = useState<"theme" | "risk" | "security" | "notifications">("theme");

  const tabs = [
    { id: "theme", label: "Appearance & Theme" },
    { id: "risk", label: "AI Risk Models" },
    { id: "security", label: "Security & MFA" },
    { id: "notifications", label: "Notification Triggers" },
  ];

  return (
    <AppLayout>
      <main className="space-y-8 max-w-[1600px] mx-auto pb-16">
        <ScrollReveal direction="left" delay={50}>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">System Settings</h1>
            <p className="text-base text-muted-foreground mt-1">
              Enterprise Banking Intelligence Platform Configurations & Preferences
            </p>
          </div>
        </ScrollReveal>

        {/* Tab Switcher */}
        <ScrollReveal direction="left" delay={100}>
          <div className="flex items-center gap-2 border-b border-border text-sm font-semibold">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as typeof tab)}
                className={`pb-4 px-4 border-b-2 transition ${
                  tab === t.id
                    ? "border-blue-600 text-blue-500 font-bold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="left" delay={150}>
          <div>
            {tab === "theme" && <ThemeSettings />}
            {tab === "risk" && <RiskModelSettings />}
            {tab === "security" && <SecuritySettings />}
            {tab === "notifications" && <NotificationSettings />}
          </div>
        </ScrollReveal>
      </main>
    </AppLayout>
  );
}
