"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { GlobalCopilotDrawer } from "@/components/common/GlobalCopilotDrawer";
import { useAuth, ROLE_PERMISSIONS, UserRole } from "@/providers/AuthProvider";
import { ShieldAlert, Lock, ArrowRight, Eye, RefreshCw, LogIn } from "lucide-react";

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
    <div className="flex min-h-screen bg-background relative">
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
              <LogIn size={14} /> Sign In to Authenticate
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
            <div className="mx-auto max-w-2xl mt-16 rounded-3xl border border-red-500/30 bg-card p-10 shadow-2xl text-center space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500">
                <Lock size={32} />
              </div>

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400">
                  <ShieldAlert size={14} /> Security Policy Policy-RBAC-403
                </span>
                <h2 className="text-3xl font-black tracking-tight">Access Restricted for Your Role</h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  Your current account role (<strong>{userRoleConfig.label}</strong>) does not have authorization to view or execute operations in <code>{pathname}</code>.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5 text-left text-xs space-y-2">
                <p className="font-bold text-foreground">Permitted Roles for this Module:</p>
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
                  className="rounded-xl border border-border bg-background px-6 py-3 text-sm font-bold hover:bg-muted transition cursor-pointer"
                >
                  Return to Dashboard
                </button>

                <button
                  onClick={() => switchRole("admin")}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-blue-700 transition cursor-pointer"
                >
                  Switch to Super Admin
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>

      <GlobalCopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />
    </div>
  );
}