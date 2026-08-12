"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, Sun, Moon, LogOut, ChevronDown, UserCheck, ShieldCheck, ExternalLink } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useAuth, ROLE_PERMISSIONS, UserRole } from "@/providers/AuthProvider";

interface TopNavbarProps {
  onOpenCopilot?: () => void;
}

export default function TopNavbar({ onOpenCopilot }: TopNavbarProps) {
  const router = useRouter();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { user, logout, switchRole } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const notifications = [
    {
      id: "n1",
      title: "High Risk Wire Intercepted",
      desc: "₹1.25 Cr SWIFT wire flagged for case CASE-8945-TXN",
      time: "3m ago",
      href: "/fraud",
      tag: "Fraud Intercept",
      tagColor: "bg-red-500/10 text-red-400 border-red-500/20",
    },
    {
      id: "n2",
      title: "Customer Churn Alert",
      desc: "Maya Iyer predicted churn score increased to 92%",
      time: "15m ago",
      href: "/customer",
      tag: "At-Risk Client",
      tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    {
      id: "n3",
      title: "Compliance SAR Due",
      desc: "FIU-IND disclosure required within 24 hours",
      time: "1h ago",
      href: "/knowledge",
      tag: "Regulatory SAR",
      tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
  ];

  const handleNotificationClick = (href: string) => {
    setShowNotifications(false);
    router.push(href);
  };

  const userRoleConfig = user ? ROLE_PERMISSIONS[user.role] : null;

  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-card/80 backdrop-blur-md px-8 shadow-xs relative z-30 transition-colors duration-200">
      {/* Title & Status */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Enterprise Intelligence Workspace</h2>
          <div
            className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2 cursor-help group/status relative"
            title="Real-time data pipeline: SQLite/PostgreSQL Database -> FastAPI Services -> ML Prediction Tools -> FAISS RAG Engine -> Next.js Frontend"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0" />
            <span className="font-medium">Live Telemetry Sync • FastAPI & Database Engine Active</span>
            <span className="hidden group-hover/status:inline-block text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              4 Microservices Connected
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls Container with Click-Outside Listener */}
      <div ref={navRef} className="flex items-center gap-4">
        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/50 text-foreground hover:bg-muted transition cursor-pointer"
          title={`Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} Mode`}
        >
          {resolvedTheme === "dark" ? (
            <Sun className="w-4.5 h-4.5 text-amber-400" />
          ) : (
            <Moon className="w-4.5 h-4.5 text-amber-500" />
          )}
        </button>

        {/* Notifications Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/50 text-foreground hover:bg-muted transition cursor-pointer"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-card" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-84 rounded-2xl border border-border bg-card p-4 shadow-2xl z-50 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-border pb-2.5">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-500" />
                  <h4 className="font-bold text-sm text-foreground">System Alerts</h4>
                </div>
                <span className="text-xs text-blue-500 font-semibold">{notifications.length} New</span>
              </div>

              <div className="space-y-2 text-xs">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleNotificationClick(n.href)}
                    className="p-3 rounded-xl border border-border bg-muted/40 hover:bg-muted hover:border-blue-500/50 transition cursor-pointer space-y-1 group"
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-foreground group-hover:text-blue-500 transition flex items-center gap-1.5">
                        {n.title}
                        <ExternalLink className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition" />
                      </span>
                      <span className="text-[10px] text-muted-foreground">{n.time}</span>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{n.desc}</p>
                    <div className="pt-1 flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${n.tagColor}`}>
                        {n.tag}
                      </span>
                      <span className="text-[11px] font-bold text-blue-500 group-hover:underline">
                        Open Workspace &rarr;
                      </span>
                    </div>
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
              className="flex items-center gap-3 rounded-2xl border border-border bg-muted/50 p-2 pr-3 hover:bg-muted transition text-left cursor-pointer"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-extrabold text-white text-xs shadow-xs">
                {user.avatarInitials}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold leading-tight text-foreground">{user.name}</p>
                <span className={`inline-block text-[10px] font-extrabold px-1.5 py-0.5 rounded border mt-0.5 ${userRoleConfig.badgeColor}`}>
                  {userRoleConfig.label}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground ml-1" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-border bg-card p-4 shadow-2xl z-50 space-y-3 animate-in fade-in duration-150">
                <div className="border-b border-border pb-3">
                  <p className="text-sm font-bold text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" /> Active Persona: {userRoleConfig.label}
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
                      className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-xl transition cursor-pointer ${
                        user.role === r.role
                          ? "bg-blue-600 text-white font-bold"
                          : "text-foreground hover:bg-muted font-medium"
                      }`}
                    >
                      <span>{r.label}</span>
                      {user.role === r.role && <UserCheck className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>

                <div className="border-t border-border pt-2">
                  <button
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-2 text-xs font-bold text-red-500 hover:bg-red-500/10 p-2.5 rounded-xl transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out Workspace
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