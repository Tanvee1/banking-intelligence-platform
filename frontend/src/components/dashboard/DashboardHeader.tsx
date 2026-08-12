"use client";

import { ShieldCheck, Download, RefreshCw } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl font-bold tracking-tight text-foreground">Executive Intelligence Briefing</h1>
          <span className="rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Normal Risk
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          Aegis AI Multi-Agent Risk Engine • Real-Time Enterprise Banking Overview
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition cursor-pointer">
          <RefreshCw className="w-3.5 h-3.5" /> Sync Data
        </button>
        <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition shadow-sm cursor-pointer">
          <Download className="w-3.5 h-3.5" /> Export Report
        </button>
      </div>
    </div>
  );
}