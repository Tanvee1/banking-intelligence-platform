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
  ChevronLeft,
  ChevronRight,
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
      className={`flex h-screen flex-col border-r border-border bg-card shadow-sm shrink-0 sticky top-0 z-40 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Brand Header & Toggle */}
      <div className="border-b border-border p-4 flex items-center justify-between min-h-[76px]">
        {!isCollapsed ? (
          <>
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-black text-white text-2xl shadow-md">
                A
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-foreground leading-none">Aegis</h1>
                <p className="text-xs font-bold text-muted-foreground mt-1">Banking Platform</p>
              </div>
            </Link>

            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="p-2 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition cursor-pointer"
                title="Collapse Sidebar"
              >
                <PanelLeftClose size={18} />
              </button>
            )}
          </>
        ) : (
          <div className="w-full flex items-center justify-center">
            <button
              onClick={onToggleCollapse}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 font-black text-white text-xl shadow-md hover:bg-blue-700 hover:scale-105 transition cursor-pointer group"
              title="Expand Sidebar"
            >
              <span>A</span>
              <span className="absolute -bottom-1 -right-1 bg-card border border-border rounded-full p-0.5 text-foreground shadow-xs group-hover:scale-110 transition">
                <PanelLeftOpen size={10} />
              </span>
            </button>
          </div>
        )}
      </div>


      {/* Navigation Links */}
      <nav className="flex-1 space-y-2 p-3 overflow-y-auto">
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
                isCollapsed ? "justify-center px-0 py-3" : "justify-between px-4 py-3"
              } rounded-2xl text-sm font-extrabold transition-all duration-200 ${
                active
                  ? "bg-blue-600 text-white shadow-md"
                  : allowed
                  ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                  : "text-muted-foreground/50 hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={active ? "text-white" : "text-blue-500"} />
                {!isCollapsed && <span>{item.title}</span>}
              </div>

              {!isCollapsed && !allowed && (
                <span title="Restricted for current role">
                  <Lock size={15} className="text-muted-foreground/60" />
                </span>
              )}
              {!isCollapsed && allowed && readOnly && (
                <span title="Read-only access">
                  <Eye size={15} className={active ? "text-white/80" : "text-amber-500"} />
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Role & Theme Footer */}
      <div className="border-t border-border p-3 space-y-2">
        {user && userRoleConfig && !isCollapsed && (
          <div className="rounded-2xl border border-border bg-background p-3.5 space-y-1 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">
                Role
              </span>
              <ShieldCheck size={16} className="text-blue-500" />
            </div>
            <p className="text-xs font-black text-foreground">{userRoleConfig.label}</p>
          </div>
        )}

        <button
          onClick={toggleTheme}
          title="Toggle Dark/Light Mode"
          className={`w-full flex items-center ${
            isCollapsed ? "justify-center p-3" : "justify-between p-3.5"
          } rounded-2xl border border-border bg-background text-xs font-bold hover:bg-muted transition cursor-pointer`}
        >
          <span className="flex items-center gap-2">
            {resolvedTheme === "dark" ? <Moon size={18} className="text-amber-400" /> : <Sun size={18} className="text-slate-700" />}
            {!isCollapsed && <span className="text-foreground">{resolvedTheme === "dark" ? "Dark Mode" : "Light Mode"}</span>}
          </span>
        </button>
      </div>
    </aside>
  );
}