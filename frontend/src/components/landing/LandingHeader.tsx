"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Sun, Moon, Sparkles, LogIn } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useAuth } from "@/providers/AuthProvider";

export function LandingHeader() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { exploreAsGuest } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md px-6 lg:px-12 py-4 flex items-center justify-between transition-colors">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 font-black text-white text-2xl shadow-lg shadow-blue-600/30 group-hover:scale-105 transition duration-300">
          A
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-foreground">Aegis</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded-full">
              v4.2 AI
            </span>
          </div>
          <p className="text-xs font-extrabold text-muted-foreground">Enterprise Banking Intelligence</p>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-extrabold text-muted-foreground">
        <a href="#modules" className="hover:text-foreground transition">Modules</a>
        <a href="#event-telemetry" className="hover:text-foreground transition">Event Telemetry</a>
        <a href="#personas" className="hover:text-foreground transition">Role Personas</a>
        <a href="#multi-agent" className="hover:text-foreground transition">Multi-Agent AI</a>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-muted transition cursor-pointer"
          title="Toggle Dark/Light Theme"
        >
          {resolvedTheme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
        </button>

        <button
          onClick={() => exploreAsGuest()}
          className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-extrabold hover:bg-muted transition shadow-xs cursor-pointer text-foreground"
        >
          <Sparkles size={14} className="text-blue-400" /> Guest Demo
        </button>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-black text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-[1.03] transition duration-200 cursor-pointer"
        >
          <LogIn size={15} /> Sign In
        </Link>
      </div>
    </header>
  );
}
