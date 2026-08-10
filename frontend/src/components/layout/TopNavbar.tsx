"use client";

import { useState } from "react";
import { Bell, Sun, Moon, LogOut, ChevronDown, UserCheck, ShieldCheck, Sparkles, Bot } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useAuth, ROLE_PERMISSIONS, UserRole } from "@/providers/AuthProvider";

interface TopNavbarProps {
  onOpenCopilot?: () => void;
}

export default function TopNavbar({ onOpenCopilot }: TopNavbarProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { user, logout, switchRole } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: "n1",
      title: "High Risk Wire Intercepted",
      desc: "₹1.25 Cr SWIFT wire flagged for case CASE-8945-TXN",
      time: "3m ago",
      type: "fraud",
    },
    {
      id: "n2",
      title: "Customer Churn Alert",
      desc: "Maya Iyer predicted churn score increased to 92%",
      time: "15m ago",
      type: "customer",
    },
    {
      id: "n3",
      title: "Compliance SAR Due",
      desc: "FIU-IND disclosure required within 24 hours",
      time: "1h ago",
      type: "compliance",
    },
  ];

  const userRoleConfig = user ? ROLE_PERMISSIONS[user.role] : null;

  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-card px-8 shadow-xs relative z-30">
      {/* Title & Status */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Enterprise Intelligence Workspace</h2>
          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            Live Banking Telemetry Sync Active • System Normal
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Global AI Copilot Button */}
        {onOpenCopilot && (
          <button
            onClick={onOpenCopilot}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400 font-extrabold text-xs hover:bg-blue-600 hover:text-white transition shadow-xs cursor-pointer group"
          >
            <Bot size={16} className="text-blue-400 group-hover:text-white transition" />
            <span>AI Copilot</span>
            <span className="bg-blue-500/20 group-hover:bg-white/20 text-blue-300 group-hover:text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">
              Ask AI
            </span>
          </button>
        )}

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground hover:bg-muted transition"
          title={`Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} Mode`}
        >
          {resolvedTheme === "dark" ? (
            <Sun size={18} className="text-amber-400" />
          ) : (
            <Moon size={18} className="text-slate-700" />
          )}
        </button>

        {/* Notifications Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground hover:bg-muted transition"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-card" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-border bg-card p-4 shadow-2xl z-50 space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h4 className="font-bold text-sm">System Alerts</h4>
                <span className="text-xs text-blue-400 font-semibold">{notifications.length} New</span>
              </div>

              <div className="space-y-2 text-xs">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl border border-border/80 bg-background space-y-1">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-foreground">{n.title}</span>
                      <span className="text-[10px] text-muted-foreground">{n.time}</span>
                    </div>
                    <p className="text-muted-foreground">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill & Dropdown */}
        {user && userRoleConfig && (
          <div className="relative pl-4 border-l border-border">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-background p-2 pr-3 hover:bg-muted transition text-left"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-extrabold text-white text-xs shadow-xs">
                {user.avatarInitials}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold leading-tight">{user.name}</p>
                <span className={`inline-block text-[10px] font-extrabold px-1.5 py-0.5 rounded border mt-0.5 ${userRoleConfig.badgeColor}`}>
                  {userRoleConfig.label}
                </span>
              </div>
              <ChevronDown size={14} className="text-muted-foreground ml-1" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-border bg-card p-4 shadow-2xl z-50 space-y-3">
                <div className="border-b border-border pb-3">
                  <p className="text-sm font-bold">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck size={12} /> Active Persona: {userRoleConfig.label}
                  </div>
                </div>

                {/* Quick Role Switcher */}
                <div className="space-y-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground px-1 mb-1">
                    Switch Role Workspace
                  </p>

                  {(
                    [
                      { role: "relationship_manager", label: "Relationship Manager" },
                      { role: "fraud_analyst", label: "Fraud Analyst" },
                      { role: "compliance_officer", label: "Compliance Officer" },
                      { role: "admin", label: "Super Admin" },
                    ] as { role: UserRole; label: string }[]
                  ).map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        switchRole(r.role);
                        setShowProfileMenu(false);
                      }}
                      className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-xl transition ${
                        user.role === r.role
                          ? "bg-blue-600 text-white font-bold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
                      }`}
                    >
                      <span>{r.label}</span>
                      {user.role === r.role && <UserCheck size={14} />}
                    </button>
                  ))}
                </div>

                <div className="border-t border-border pt-2">
                  <button
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-2 text-xs font-bold text-red-400 hover:bg-red-500/10 p-2.5 rounded-xl transition"
                  >
                    <LogOut size={16} /> Sign Out Workspace
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}