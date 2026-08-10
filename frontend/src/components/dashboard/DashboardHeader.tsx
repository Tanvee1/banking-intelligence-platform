"use client";

import { ShieldCheck, Download, Sparkles, RefreshCw } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight">Executive Intelligence Briefing</h1>
          <span className="rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck size={14} /> Risk Level: Normal
          </span>
        </div>
        <p className="text-base text-muted-foreground mt-1">
          Aegis AI Multi-Agent Risk Engine • Real-Time Enterprise Banking Overview
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-muted transition shadow-xs">
          <RefreshCw size={16} /> Sync Data
        </button>
        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition shadow-xs">
          <Download size={16} /> Export Risk Report
        </button>
      </div>
    </div>
  );
}