"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { Sun, Moon, Laptop, Check } from "lucide-react";

export function ThemeSettings() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themes = [
    {
      id: "dark",
      name: "Dark Mode",
      desc: "High contrast dark aesthetic optimized for 8+ hours of enterprise analysis",
      icon: Moon,
    },
    {
      id: "light",
      name: "Light Mode",
      desc: "Clean light aesthetic with high typography contrast and soft borders",
      icon: Sun,
    },
    {
      id: "system",
      name: "System Default",
      desc: "Automatically sync with OS system appearance preferences",
      icon: Laptop,
    },
  ];

  return (
    <section className="rounded-2xl border border-border bg-card p-8 shadow-xs space-y-6">
      <div className="pb-4 border-b border-border">
        <h3 className="text-xl font-bold tracking-tight">Appearance & Theme Preferences</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Customize platform color themes, visual modes, and display density.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {themes.map((t) => {
          const Icon = t.icon;
          const isSelected = theme === t.id;

          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id as "dark" | "light" | "system")}
              className={`rounded-xl border p-6 text-left transition flex flex-col justify-between space-y-4 ${
                isSelected
                  ? "border-blue-600 bg-blue-600/10"
                  : "border-border bg-background hover:border-blue-500/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <Icon size={22} className={t.id === "dark" ? "text-amber-400" : "text-blue-500"} />
                  </div>
                  {isSelected && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check size={14} />
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-base text-foreground mt-4">{t.name}</h4>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t.desc}</p>
              </div>

              <div className="pt-2 text-xs font-semibold text-blue-400">
                Active Theme: {resolvedTheme.toUpperCase()}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
