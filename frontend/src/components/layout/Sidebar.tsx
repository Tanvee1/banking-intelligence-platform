"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  BookOpen,
  Settings,
  Sun,
  Moon,
  Lock,
  Eye,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useAuth, ROLE_PERMISSIONS } from "@/providers/AuthProvider";

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Customer Intelligence",
    href: "/customer",
    icon: Users,
  },
  {
    title: "Fraud Intelligence",
    href: "/fraud",
    icon: ShieldAlert,
  },
  {
    title: "Knowledge Intelligence",
    href: "/knowledge",
    icon: BookOpen,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({ isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { user, hasAccess, isReadOnly } = useAuth();

  const userRoleConfig = user ? ROLE_PERMISSIONS[user.role] : null;

  return (
    <aside
      className={`flex h-screen flex-col border-r border-border bg-card/80 backdrop-blur-md shadow-sm shrink-0 sticky top-0 z-40 transition-all duration-200 ${
        isCollapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Brand Header & Toggle */}
      <div className="border-b border-border px-3 py-3 flex items-center justify-between min-h-[64px] shrink-0">
        {!isCollapsed ? (
          <>
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-extrabold text-white text-xl shadow-md">
                A
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-foreground leading-none">Aegis</h1>
                <p className="text-[11px] font-medium text-muted-foreground mt-0.5">Banking Platform</p>
              </div>
            </Link>

            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition cursor-pointer"
                title="Collapse Sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            )}
          </>
        ) : (
          <div className="w-full flex items-center justify-center">
            <button
              onClick={onToggleCollapse}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-extrabold text-white text-lg shadow-md hover:bg-blue-500 transition cursor-pointer group"
              title="Expand Sidebar"
            >
              <span>A</span>
              <span className="absolute -bottom-1 -right-1 bg-card border border-border rounded-full p-0.5 text-foreground shadow-xs group-hover:scale-110 transition">
                <PanelLeftOpen className="w-2.5 h-2.5" />
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 p-2.5 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const allowed = hasAccess(item.href);
          const readOnly = isReadOnly(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.title : undefined}
              className={`flex items-center ${
                isCollapsed ? "justify-center px-0 py-2.5" : "justify-between px-3 py-2.5"
              } rounded-xl text-xs font-semibold transition-all duration-150 ${
                active
                  ? "bg-blue-600 text-white shadow-sm"
                  : allowed
                  ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                  : "text-muted-foreground/60 hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${active ? "text-white" : "text-blue-500"}`} />
                {!isCollapsed && <span className="truncate">{item.title}</span>}
              </div>

              {!isCollapsed && !allowed && (
                <span title="Restricted for current role">
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                </span>
              )}
              {!isCollapsed && allowed && readOnly && (
                <span title="Read-only access">
                  <Eye className={`w-3.5 h-3.5 ${active ? "text-white/80" : "text-amber-500"}`} />
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Role Footer */}
      {user && userRoleConfig && !isCollapsed && (
        <div className="border-t border-border p-2.5 shrink-0">
          <div className="rounded-xl border border-border bg-muted/50 p-2.5 space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                Role
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <p className="text-xs font-bold text-foreground truncate">{userRoleConfig.label}</p>
          </div>
        </div>
      )}
    </aside>
  );
}