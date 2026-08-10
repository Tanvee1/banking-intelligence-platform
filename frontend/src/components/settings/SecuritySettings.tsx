"use client";

import { Key, ShieldCheck, Lock, Globe } from "lucide-react";

export function SecuritySettings() {
  return (
    <section className="rounded-2xl border border-border bg-card p-8 shadow-xs space-y-6">
      <div className="pb-4 border-b border-border">
        <h3 className="text-xl font-bold tracking-tight">Security & Enterprise Access</h3>
        <p className="text-sm text-muted-foreground">Manage multi-factor authentication, API access tokens, and IP whitelists</p>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-background p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-base text-foreground">Hardware Push Multi-Factor Auth (MFA)</h4>
            <p className="text-sm text-muted-foreground mt-1">Enforce mandatory YubiKey or 3DS push verification on all analyst sessions.</p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            Enforced (Strict)
          </span>
        </div>

        <div className="rounded-xl border border-border bg-background p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-base text-foreground">Enterprise API Access Token</h4>
            <p className="text-sm font-mono text-muted-foreground mt-1">aegis_live_sec_9948104829104829104</p>
          </div>
          <button className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold hover:bg-muted transition">
            Regenerate Token
          </button>
        </div>
      </div>
    </section>
  );
}
