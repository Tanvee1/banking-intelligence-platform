"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { GlobalCopilotDrawer } from "@/components/common/GlobalCopilotDrawer";
import { useAuth, ROLE_PERMISSIONS, UserRole } from "@/providers/AuthProvider";
import { ShieldAlert, Lock, ArrowRight, Eye, RefreshCw, LogIn, Bot } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  const { user, isAuthenticated, hasAccess, isReadOnly, switchRole } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex items-center gap-3 text-sm font-semibold text-muted-foreground">
          <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />
          Authenticating workspace credentials...
        </div>
      </div>
    );
  }

  const accessAllowed = hasAccess(pathname);
  const readOnly = isReadOnly(pathname);
  const userRoleConfig = ROLE_PERMISSIONS[user.role];

  return (
    <div className="flex min-h-screen bg-background relative text-foreground transition-colors duration-200">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex flex-1 flex-col min-w-0">
        <TopNavbar onOpenCopilot={() => setIsCopilotOpen(true)} />

        {/* Unauthenticated Guest Peek Mode Banner */}
        {user.isPreview ? (
          <div className="bg-blue-600/15 border-b border-blue-500/30 px-8 py-3 flex items-center justify-between text-xs font-semibold text-blue-400">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 shrink-0 text-blue-400 animate-pulse" />
              <span>
                <strong>Workspace Peek Mode (Unauthenticated Demo)</strong>: You are viewing a read-only preview of Aegis Intelligence. Action execution is restricted.
              </span>
            </div>
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" /> Sign In to Authenticate
            </button>
          </div>
        ) : (
          readOnly && accessAllowed && (
            <div className="bg-amber-500/10 border-b border-amber-500/30 px-8 py-3 flex items-center justify-between text-xs font-semibold text-amber-400">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 shrink-0" />
                <span>
                  <strong>Read-Only Access Mode</strong>: You are viewing this module under the <strong>{userRoleConfig.label}</strong> role. Executing actions is restricted.
                </span>
              </div>
              <button
                onClick={() => switchRole("admin")}
                className="px-3 py-1 rounded-lg border border-amber-500/40 bg-amber-500/20 text-amber-300 font-bold hover:bg-amber-500/30 transition cursor-pointer"
              >
                Elevate Role Permissions
              </button>
            </div>
          )
        )}

        <main className="flex-1 overflow-auto p-8">
          {!accessAllowed ? (
            <div className="mx-auto max-w-2xl mt-16 rounded-3xl border border-red-500/30 bg-slate-900 p-10 shadow-2xl text-center space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400">
                  <ShieldAlert className="w-3.5 h-3.5" /> Security Policy Policy-RBAC-403
                </span>
                <h2 className="text-3xl font-black tracking-tight text-white">Access Restricted for Your Role</h2>
                <p className="text-sm text-slate-400 leading-relaxed max-w-lg mx-auto">
                  Your current account role (<strong>{userRoleConfig.label}</strong>) does not have authorization to view or execute operations in <code>{pathname}</code>.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-left text-xs space-y-2">
                <p className="font-bold text-white">Permitted Roles for this Module:</p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(ROLE_PERMISSIONS) as UserRole[]).map((r) => {
                    const cfg = ROLE_PERMISSIONS[r];
                    const permits = cfg.allowedRoutes.some((route) => pathname.startsWith(route));
                    if (!permits) return null;
                    return (
                      <span key={r} className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${cfg.badgeColor}`}>
                        {cfg.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 px-6 py-3 text-sm font-bold text-slate-200 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  Return to Dashboard
                </button>

                <button
                  onClick={() => switchRole("admin")}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-blue-500 transition cursor-pointer"
                >
                  Switch to Super Admin
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>

      {/* Floating AI Copilot FAB in bottom-right corner */}
      <button
        onClick={() => setIsCopilotOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4.5 py-3 rounded-full bg-blue-600 text-white font-bold text-xs shadow-2xl hover:bg-blue-500 hover:scale-105 transition-all duration-200 cursor-pointer border border-blue-400/40 group"
        title="Open Aegis Multi-Agent AI Copilot"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-white group-hover:rotate-12 transition duration-200" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>
        <span className="tracking-wide text-xs">AI Copilot</span>
      </button>

      <GlobalCopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />
    </div>
  );
}