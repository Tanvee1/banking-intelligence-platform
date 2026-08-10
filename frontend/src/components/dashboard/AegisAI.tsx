"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Send, Bot, Users, ShieldAlert, BookOpen, ExternalLink, Filter, Maximize2 } from "lucide-react";
import { generateCrossFieldResponse, CopilotResponse } from "@/lib/copilot-engine";
import { ExpandedChatModal } from "@/components/common/ExpandedChatModal";

interface Message {
  sender: "user" | "copilot";
  text: string;
  responseObj?: CopilotResponse;
  timestamp: string;
}

export function AegisAI() {
  const [domainFilter, setDomainFilter] = useState<"all" | "customer" | "fraud" | "sop">("all");
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "copilot",
      text: "Welcome to **Aegis Global Cross-Field Copilot**. I am connected to live Customer Portfolios, Fraud Intercept Telemetry, and Regulatory SOP Knowledge bases.\n\nAsk any question spanning customer balances, transaction anomalies, or compliance policies.",
      timestamp: "Just now",
      responseObj: {
        domainsCovered: ["Customer Intelligence", "Fraud Telemetry", "Regulatory SOPs"],
        riskLevel: "Low",
        markdownText: "",
        citations: [
          {
            type: "customer",
            label: "Customer Portfolio",
            link: "/customer",
            detail: "4 High-Net-Worth Accounts Monitored",
          },
          {
            type: "fraud",
            label: "Fraud Workstation",
            link: "/fraud",
            detail: "4 Live Intercept Telemetry Alerts",
          },
          {
            type: "sop",
            label: "Policy RAG Index",
            link: "/knowledge",
            detail: "SOP-2026 Edition Indexed",
          },
        ],
      },
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const suggestedPrompts = [
    "What is Maya Iyer's total risk exposure across churn, fraud, and policy compliance?",
    "Cross-reference case CASE-8945-TXN with regulatory SWIFT wire dual-control SOPs.",
    "What are the KYC and FIU-IND 24-hour SAR filing rules for high-value accounts?",
  ];

  const handleSend = (queryText: string) => {
    if (!queryText.trim() || isThinking) return;

    const userMsg: Message = {
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      const copilotRes = generateCrossFieldResponse(queryText, domainFilter);
      const copilotMsg: Message = {
        sender: "copilot",
        text: copilotRes.markdownText,
        responseObj: copilotRes,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, copilotMsg]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <>
      <section
        onClick={() => setIsExpanded(true)}
        className="group rounded-3xl border border-border bg-card shadow-lg hover:shadow-2xl hover:scale-[1.01] hover:-translate-y-1 hover:border-blue-500/50 transition-all duration-300 ease-out cursor-pointer flex flex-col h-[640px] overflow-hidden"
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-card/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/10 border border-blue-500/30 text-blue-500 shadow-xs group-hover:scale-110 transition duration-300">
              <Sparkles size={22} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight flex items-center gap-2 group-hover:text-blue-400 transition">
                Global Aegis AI Copilot
                <span className="text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">
                  Cross-Field v4.2
                </span>
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Autonomous reasoning active across Customer, Fraud & Regulatory Policy layers
              </p>
            </div>
          </div>

          {/* Controls & Expand Button */}
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-1.5 bg-background p-1.5 rounded-2xl border border-border text-xs font-semibold">
              <span className="text-[10px] uppercase font-bold text-muted-foreground px-2 flex items-center gap-1">
                <Filter size={12} /> Scope:
              </span>
              {[
                { id: "all", label: "All Domains" },
                { id: "customer", label: "Customer" },
                { id: "fraud", label: "Fraud" },
                { id: "sop", label: "Policy SOPs" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setDomainFilter(f.id as typeof domainFilter)}
                  className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                    domainFilter === f.id
                      ? "bg-blue-600 text-white font-bold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsExpanded(true)}
              className="p-2.5 rounded-xl border border-border bg-background hover:bg-muted text-blue-400 transition flex items-center gap-1.5 text-xs font-bold shadow-xs cursor-pointer"
              title="Expand Copilot to Fullscreen"
            >
              <Maximize2 size={16} /> Expand Chat
            </button>
          </div>
        </div>

        {/* Message Output Window */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col space-y-2 ${
                m.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {m.sender === "copilot" ? (
                  <span className="font-bold flex items-center gap-1 text-blue-400">
                    <Bot size={14} /> Aegis Neural Synthesis
                  </span>
                ) : (
                  <span className="font-bold text-foreground">You</span>
                )}
                <span>• {m.timestamp}</span>
              </div>

              <div
                className={`p-6 rounded-3xl max-w-[88%] leading-relaxed shadow-xs ${
                  m.sender === "user"
                    ? "bg-blue-600 text-white font-medium rounded-tr-none"
                    : "bg-background border border-border text-foreground rounded-tl-none space-y-4"
                }`}
              >
                {/* Message Content */}
                <div className="whitespace-pre-wrap font-sans text-sm">{m.text}</div>

                {/* Citations & Covered Domains */}
                {m.responseObj && (
                  <div className="pt-4 border-t border-border/80 space-y-3">
                    {/* Domains Covered Badges */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                        Domains Synthesized:
                      </span>
                      {m.responseObj.domainsCovered.map((d: string, i: number) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400 font-extrabold text-[11px]"
                        >
                          {d === "Customer Intelligence" && <Users size={12} />}
                          {d === "Fraud Telemetry" && <ShieldAlert size={12} />}
                          {d === "Regulatory SOPs" && <BookOpen size={12} />}
                          {d}
                        </span>
                      ))}
                    </div>

                    {/* Citation Links */}
                    {m.responseObj.citations && m.responseObj.citations.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                        {m.responseObj.citations.map((c: any, cIdx: number) => (
                          <Link
                            key={cIdx}
                            href={c.link}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-between p-3 rounded-2xl border border-border bg-card hover:border-blue-500/50 hover:bg-muted transition text-xs group/link cursor-pointer"
                          >
                            <div className="space-y-0.5 truncate pr-2">
                              <p className="font-bold text-foreground truncate group-hover/link:text-blue-400 transition">
                                {c.label}
                              </p>
                              <p className="text-[10px] text-muted-foreground truncate">{c.detail}</p>
                            </div>
                            <ExternalLink size={14} className="text-muted-foreground group-hover/link:text-blue-400 shrink-0 transition" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-background border border-border text-xs text-muted-foreground w-max">
              <Bot size={16} className="animate-spin text-blue-500" />
              Cross-referencing portfolio databases, fraud graph models & regulatory SOP indexes...
            </div>
          )}
        </div>

        {/* Suggested Prompts & Input Form */}
        <div className="p-6 border-t border-border bg-card/50 space-y-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
            {suggestedPrompts.map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSend(prompt)}
                className="rounded-2xl border border-border bg-background px-4 py-2 text-xs font-semibold text-muted-foreground hover:border-blue-500/40 hover:text-foreground whitespace-nowrap transition cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Global Copilot across Customer, Fraud & Regulatory Policy data..."
              className="flex-1 rounded-2xl border border-border bg-background px-5 py-4 text-sm font-semibold outline-none focus:border-blue-500 transition shadow-xs"
            />
            <button
              type="submit"
              disabled={isThinking || !input.trim()}
              className="rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white hover:bg-blue-700 disabled:opacity-50 transition flex items-center gap-2 shadow-md cursor-pointer"
            >
              Send <Send size={16} />
            </button>
          </form>
        </div>
      </section>

      <ExpandedChatModal
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        title="Global Aegis AI Copilot Workspace"
        subtitle="Full Cross-Field Autonomous Reasoning Feed"
        messages={messages}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        suggestedPrompts={suggestedPrompts}
        isThinking={isThinking}
      />
    </>
  );
}
