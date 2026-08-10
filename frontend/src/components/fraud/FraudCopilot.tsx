"use client";

import { useState } from "react";
import { Send, Bot, Maximize2 } from "lucide-react";
import { FraudCase } from "@/lib/fraud-data";
import { ExpandedChatModal } from "@/components/common/ExpandedChatModal";

interface FraudCopilotProps {
  fraud: FraudCase;
}

export function FraudCopilot({ fraud }: FraudCopilotProps) {
  const [messages, setMessages] = useState<{ sender: "user" | "copilot"; text: string }[]>([
    {
      sender: "copilot",
      text: `Hello Analyst. I'm Aegis Fraud Copilot initialized for case **${fraud.id}** (${fraud.customer.name}).\n\nAsk any question or select a prompt below to analyze evidence or draft a SAR report.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const suggested = [
    "Explain why this transaction is suspicious.",
    "Generate investigation report.",
    "Find similar frauds.",
    "Recommend next analyst action.",
    "Summarize evidence.",
  ];

  const handleSend = (query: string) => {
    if (!query.trim()) return;

    let response = `Analysis for ${fraud.id}: `;
    const q = query.toLowerCase();

    if (q.includes("suspicious")) {
      response = `Transaction ${fraud.transactionId} (${fraud.amount}) was flagged due to a major velocity anomaly: ${fraud.location.anomaly}. Device ${fraud.device.name} IP ${fraud.device.ip} has trust score ${fraud.device.trustScore}.`;
    } else if (q.includes("report")) {
      response = `### CONFIDENTIAL INVESTIGATION REPORT (${fraud.id})\nCustomer: ${fraud.customer.name} (${fraud.customer.id})\nAmount: ${fraud.amount}\nMerchant: ${fraud.merchant.name}\nLocation Anomaly: ${fraud.location.anomaly}\nRisk Score: ${fraud.riskScore}/100\nAssigned Analyst: ${fraud.analyst}`;
    } else if (q.includes("similar")) {
      response = `Matched ${fraud.similarCases.length} precedents: ${fraud.similarCases.map(s => `${s.caseId} (${s.outcome})`).join(", ")}.`;
    } else if (q.includes("recommend")) {
      response = `Top Recommendation: ${fraud.actions[0]?.title} (${fraud.actions[0]?.confidence}). Expected Impact: ${fraud.actions[0]?.expectedImpact}.`;
    } else if (q.includes("evidence")) {
      response = `Evidence Summary for ${fraud.id}:\n- IP Geolocation: ${fraud.device.ip} (${fraud.location.city})\n- Device: ${fraud.device.name}\n- Value: ${fraud.amount} (Exceeds daily average)\n- Target: ${fraud.merchant.name}`;
    } else {
      response = `Case ${fraud.id} evaluated at ${fraud.riskScore}/100 risk score based on transaction anomalies and device telemetry.`;
    }

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: query },
      { sender: "copilot", text: response },
    ]);
    setInput("");
  };

  return (
    <>
      <section
        onClick={() => setIsExpanded(true)}
        className="group rounded-3xl border border-border bg-card p-8 shadow-md hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 hover:border-blue-500/50 transition-all duration-300 ease-out cursor-pointer flex flex-col h-[520px]"
      >
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h3 className="font-bold text-xl tracking-tight flex items-center gap-2 group-hover:text-blue-400 transition">
            <Bot size={22} className="text-blue-400 group-hover:scale-110 transition duration-300" /> Fraud Copilot Workspace
          </h3>
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <span className="text-sm font-mono text-muted-foreground bg-muted px-2.5 py-0.5 rounded-md">
              Case Context: {fraud.id}
            </span>
            <button
              onClick={() => setIsExpanded(true)}
              className="p-2 rounded-xl border border-border bg-background hover:bg-muted text-blue-400 transition flex items-center gap-1.5 text-xs font-bold"
              title="Expand Chat Window"
            >
              <Maximize2 size={14} /> Expand Chat
            </button>
          </div>
        </div>

        {/* Message Chat Window */}
        <div className="flex-1 overflow-y-auto py-5 space-y-4 pr-2 text-base">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-5 rounded-2xl max-w-[85%] leading-relaxed ${
                m.sender === "user"
                  ? "bg-blue-600 text-white font-medium ml-auto rounded-br-none shadow-xs"
                  : "bg-background border border-border text-foreground rounded-bl-none shadow-xs"
              }`}
            >
              <p className="whitespace-pre-wrap">{m.text}</p>
            </div>
          ))}
        </div>

        {/* Prompt Buttons & Input Form */}
        <div className="pt-4 border-t border-border space-y-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2 overflow-x-auto text-sm pb-1">
            {suggested.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                className="rounded-xl border border-border bg-background px-3.5 py-2 text-sm font-medium hover:bg-muted hover:border-blue-500/40 whitespace-nowrap transition cursor-pointer"
              >
                {s}
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
              placeholder={`Ask Fraud Copilot about case ${fraud.id}...`}
              className="flex-1 rounded-xl border border-border bg-background px-4 py-3.5 text-base outline-none focus:border-blue-500 transition"
            />
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3.5 text-base font-bold text-white hover:bg-blue-700 transition flex items-center gap-2 shadow-xs cursor-pointer"
            >
              Send <Send size={16} />
            </button>
          </form>
        </div>
      </section>

      <ExpandedChatModal
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        title="Fraud Copilot Investigation Workspace"
        subtitle={`Case ${fraud.id} • ${fraud.customer.name} (${fraud.amount})`}
        messages={messages}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        suggestedPrompts={suggested}
      />
    </>
  );
}
