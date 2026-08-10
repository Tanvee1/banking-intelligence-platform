"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { ModulesSection } from "@/components/landing/ModulesSection";
import { EventCorrelationFeature } from "@/components/landing/EventCorrelationFeature";
import { RolePersonaSection } from "@/components/landing/RolePersonaSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Header Bar */}
      <LandingHeader />

      {/* Hero Section */}
      <LandingHero />

      {/* Core 4 Modules Grid */}
      <ModulesSection />

      {/* Real-World Event Correlation Feature */}
      <EventCorrelationFeature />

      {/* Role-Based Personas */}
      <RolePersonaSection />

      {/* Footer */}
      <footer className="border-t border-border bg-card px-6 lg:px-12 py-12">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground font-semibold">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 font-black text-white text-sm">
              A
            </div>
            <div>
              <p className="font-black text-foreground text-sm">Aegis Intelligence Platform v4.2</p>
              <p className="text-[11px]">Autonomous AI Banking & Financial Crime Workspace</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-foreground transition font-bold">Dashboard</Link>
            <Link href="/customer" className="hover:text-foreground transition font-bold">Customer</Link>
            <Link href="/fraud" className="hover:text-foreground transition font-bold">Fraud</Link>
            <Link href="/knowledge" className="hover:text-foreground transition font-bold">Knowledge RAG</Link>
            <Link href="/login" className="hover:text-foreground transition font-bold">Sign In</Link>
          </div>

          <p className="text-[11px]">© 2026 Aegis Intelligence Systems. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
