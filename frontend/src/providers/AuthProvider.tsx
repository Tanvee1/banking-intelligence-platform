"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export type UserRole = "relationship_manager" | "fraud_analyst" | "compliance_officer" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  avatarInitials: string;
  isPreview?: boolean;
}

export const GUEST_PREVIEW_USER: UserProfile = {
  id: "user-preview-000",
  name: "Guest Explorer",
  email: "guest.preview@northstarbank.com",
  role: "admin",
  title: "Workspace Read-Only Peek Mode",
  avatarInitials: "PEEK",
  isPreview: true,
};

export const PRESET_USERS: Record<UserRole, UserProfile> = {
  relationship_manager: {
    id: "user-rm-101",
    name: "Tanvee Bhangale",
    email: "tanvee.bhangale@northstarbank.com",
    role: "relationship_manager",
    title: "Lead Relationship Manager",
    avatarInitials: "RM",
  },
  fraud_analyst: {
    id: "user-fa-202",
    name: "Vikram Malhotra",
    email: "vikram.m@northstarbank.com",
    role: "fraud_analyst",
    title: "Senior Fraud Investigator",
    avatarInitials: "FA",
  },
  compliance_officer: {
    id: "user-co-303",
    name: "Ananya Roy",
    email: "ananya.roy@northstarbank.com",
    role: "compliance_officer",
    title: "Head of AML & Compliance",
    avatarInitials: "CO",
  },
  admin: {
    id: "user-adm-404",
    name: "System Executive",
    email: "admin@northstarbank.com",
    role: "admin",
    title: "Chief Risk & Operations Officer",
    avatarInitials: "EX",
  },
};

export const ROLE_PERMISSIONS: Record<UserRole, { allowedRoutes: string[]; readOnlyRoutes: string[]; label: string; badgeColor: string }> = {
  relationship_manager: {
    label: "Relationship Manager",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    allowedRoutes: ["/dashboard", "/customer", "/settings"],
    readOnlyRoutes: ["/fraud"],
  },
  fraud_analyst: {
    label: "Fraud Analyst",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
    allowedRoutes: ["/dashboard", "/fraud", "/settings"],
    readOnlyRoutes: ["/customer"],
  },
  compliance_officer: {
    label: "Compliance Officer",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    allowedRoutes: ["/dashboard", "/knowledge", "/settings"],
    readOnlyRoutes: ["/fraud", "/customer"],
  },
  admin: {
    label: "Super Admin",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    allowedRoutes: ["/dashboard", "/customer", "/fraud", "/knowledge", "/settings"],
    readOnlyRoutes: [],
  },
};

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (role: UserRole, customEmail?: string, customName?: string) => void;
  exploreAsGuest: () => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  hasAccess: (path: string) => boolean;
  isReadOnly: (path: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "aegis-auth-session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(STORAGE_KEY);
      if (savedSession) {
        setUser(JSON.parse(savedSession));
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const login = (role: UserRole, customEmail?: string, customName?: string) => {
    const base = PRESET_USERS[role];
    const newUser: UserProfile = {
      ...base,
      email: customEmail && customEmail.trim() ? customEmail : base.email,
      name: customName && customName.trim() ? customName : base.name,
      isPreview: false,
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  };

  const exploreAsGuest = () => {
    setUser(GUEST_PREVIEW_USER);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(GUEST_PREVIEW_USER));
    router.push("/dashboard");
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updated = {
        ...PRESET_USERS[role],
        name: user.name,
        isPreview: false,
      };
      setUser(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } else {
      login(role);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    router.push("/login");
  };

  const hasAccess = (path: string): boolean => {
    if (!user) return false;
    if (user.isPreview) return true; // Guests can view all pages in read-only peek mode
    if (user.role === "admin") return true;
    const permissions = ROLE_PERMISSIONS[user.role];
    if (!permissions) return false;

    const isAllowed = permissions.allowedRoutes.some((route) => path === route || path.startsWith(`${route}/`));
    const isReadOnly = permissions.readOnlyRoutes.some((route) => path === route || path.startsWith(`${route}/`));

    return isAllowed || isReadOnly;
  };

  const isReadOnly = (path: string): boolean => {
    if (!user) return false;
    if (user.isPreview) return true; // Guests are strictly restricted from actions
    if (user.role === "admin") return false;
    const permissions = ROLE_PERMISSIONS[user.role];
    if (!permissions) return false;

    const allowed = permissions.allowedRoutes.some((route) => path === route || path.startsWith(`${route}/`));
    if (allowed) return false;

    return permissions.readOnlyRoutes.some((route) => path === route || path.startsWith(`${route}/`));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        exploreAsGuest,
        logout,
        switchRole,
        hasAccess,
        isReadOnly,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
