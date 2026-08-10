"use client";

import { useState } from "react";
import { Bot, X, Send, Sparkles, ArrowUpRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { generateCrossFieldResponse, CopilotResponse } from "@/lib/copilot-engine";
import { fetchCopilotQuery } from "@/services/api";
import { FormattedMarkdown } from "@/components/common/FormattedMarkdown";

interface Props {

  isOpen: boolean;
  onClose: () => void;
}

export function GlobalCopilotDrawer({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [activeDomainFilter, setActiveDomainFilter] = useState("all");
  const [response, setResponse] = useState<CopilotResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleAsk = async (userQuery?: string) => {

    const q = userQuery || query;
    if (!q.trim()) return;

    setIsLoading(true);
    const backendRes = await fetchCopilotQuery(q, activeDomainFilter);
    if (backendRes) {
      setResponse(backendRes);
    } else {
      const res = generateCrossFieldResponse(q, activeDomainFilter);
      setResponse(res);
    }
    setIsLoading(false);
  };


  const samplePrompts = [
    "Analyze Maya Iyer churn risk & wire fraud anomaly",
    "High-value SWIFT wire intercept CASE-8945-TXN",
    "What are mandatory 24-hr FIU-IND SAR filing requirements?",
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300">
      <div className="w-full max-w-xl bg-card border-l border-border h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-600/10 border border-blue-500/30 text-blue-400">
              <Bot size={22} />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-foreground">Aegis Cross-Domain Copilot</h3>
              <p className="text-xs text-muted-foreground">Multi-Agent Banking & Fraud Intelligence Assistant</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Preset Sample Prompts */}
          <div className="space-y-2">
            <p className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <Sparkles size={14} className="text-blue-400" /> Suggested Cross-Domain Queries:
            </p>

            <div className="space-y-2">
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(prompt);
                    handleAsk(prompt);
                  }}
                  className="w-full text-left p-3 rounded-2xl border border-border bg-background hover:border-blue-500/50 hover:bg-muted/40 transition text-xs font-semibold text-foreground flex items-center justify-between group cursor-pointer"
                >
                  <span>{prompt}</span>
                  <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-blue-400 transition" />
                </button>
              ))}
            </div>
          </div>

          {/* Search / Ask Box */}
          <div className="space-y-3">
            <div className="relative">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAsk();
                  }
                }}
                placeholder="Ask about customers, fraud alerts, SWIFT wire holds, or compliance policies..."
                className="w-full rounded-2xl border border-border bg-background p-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-blue-500/40 min-h-[90px] resize-none"
              />

              <button
                onClick={() => handleAsk()}
                disabled={isLoading || !query.trim()}
                className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-blue-600 text-white font-bold disabled:opacity-40 hover:bg-blue-700 transition cursor-pointer shadow-xs"
              >
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Reasoning / Response Section */}
          {isLoading && (
            <div className="p-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 space-y-3 text-center animate-pulse">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-blue-400">
                <Bot className="animate-spin" size={16} /> Multi-Agent Orchestrator Reasoning...
              </div>
              <p className="text-xs text-muted-foreground">Synthesizing Customer AUM, Fraud Telemetry & FIU-IND SOPs</p>
            </div>
          )}

          {response && !isLoading && (
            <div className="rounded-3xl border border-border bg-card p-6 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2.5 text-sm font-black">
                  <ShieldCheck size={18} className="text-emerald-400" />
                  <span className="text-foreground tracking-tight">Verified Multi-Agent Synthesis</span>
                </div>
                {response.riskLevel && (
                  <span className="text-xs font-black uppercase px-3 py-1 rounded-full border bg-red-500/10 text-red-400 border-red-500/30">
                    Risk Level: {response.riskLevel}
                  </span>
                )}
              </div>

              {/* Formatted Copilot Content with High Contrast & Readability */}
              <div className="bg-background border border-border/80 rounded-2xl p-5 shadow-xs">
                <FormattedMarkdown text={response.markdownText} />
              </div>




              {/* Direct Evidence Citations */}
              {response.citations.length > 0 && (
                <div className="pt-4 border-t border-border space-y-3">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Direct Evidence Citations:
                  </p>
                  <div className="space-y-2.5">
                    {response.citations.map((c, i) => (
                      <a
                        key={i}
                        href={c.link}
                        className="p-3.5 rounded-2xl border border-border bg-background hover:border-blue-500/60 hover:bg-muted/40 transition flex items-center justify-between text-xs group cursor-pointer"
                      >
                        <div>
                          <span className="font-black text-foreground text-sm group-hover:text-blue-400 transition">{c.label}</span>
                          <p className="text-xs text-muted-foreground font-semibold mt-0.5">{c.detail}</p>
                        </div>
                        <span className="text-[10px] font-mono font-black text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2.5 py-1 rounded-full uppercase">
                          {c.type}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-border bg-muted/20 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
          <CheckCircle2 size={14} className="text-emerald-500" /> Multi-Agent Copilot Engine v4.2 Ready
        </div>
      </div>
    </div>
  );
}
