"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Sparkles, ArrowRight } from "lucide-react";

export interface ModalData {
  title: string;
  category?: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  metrics?: { label: string; value: string; change?: string; color?: string }[];
  description: string;
  details?: string[];
  actionLabel?: string;
  actionHref?: string;
}

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData | null;
}

export function CardModal({ isOpen, onClose, data }: CardModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !data || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-background/80 backdrop-blur-md transition-opacity z-[-1]"
      />

      {/* Modal Container with strict max height & internal scrolling */}
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl z-10 space-y-6 transform transition-all duration-300 scale-100 animate-in zoom-in-95 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="space-y-3 border-b border-border pb-6 pr-12">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-400">
              <Sparkles size={12} /> {data.category || "Expanded Intelligence View"}
            </span>
            {data.badge && (
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${data.badgeColor || "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`}>
                {data.badge}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">{data.title}</h2>
          {data.subtitle && (
            <p className="text-sm font-semibold text-muted-foreground">{data.subtitle}</p>
          )}
        </div>

        {/* Metrics Grid */}
        {data.metrics && data.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {data.metrics.map((m, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-background p-4 space-y-1">
                <p className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">{m.label}</p>
                <p className="text-xl sm:text-2xl font-black font-mono text-foreground">{m.value}</p>
                {m.change && (
                  <p className={`text-xs font-bold ${m.color || "text-blue-400"}`}>{m.change}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        <div className="rounded-2xl border border-border bg-background p-5 space-y-3">
          <p className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">AI Intelligence Overview</p>
          <p className="text-sm leading-relaxed text-foreground font-medium">{data.description}</p>
        </div>

        {/* Bullet Details */}
        {data.details && data.details.length > 0 && (
          <div className="space-y-2 text-xs text-muted-foreground">
            <p className="font-bold text-foreground text-xs uppercase tracking-wider">Key Telemetry Breakdown:</p>
            <ul className="space-y-1.5 list-disc list-inside text-sm">
              {data.details.map((d, dIdx) => (
                <li key={dIdx} className="leading-relaxed">{d}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <button
            onClick={onClose}
            className="rounded-xl border border-border bg-background px-5 py-2.5 text-xs font-bold hover:bg-muted transition cursor-pointer"
          >
            Close View
          </button>

          {data.actionLabel && data.actionHref && (
            <a
              href={data.actionHref}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 shadow-md transition cursor-pointer"
            >
              {data.actionLabel}
              <ArrowRight size={14} />
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
