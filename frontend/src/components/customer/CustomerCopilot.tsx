"use client";

import { useState } from "react";
import { Send, Bot, Maximize2 } from "lucide-react";
import { ExpandedChatModal } from "@/components/common/ExpandedChatModal";

export function CustomerCopilot() {
  const [messages, setMessages] = useState<{ sender: "user" | "copilot"; text: string }[]>([
    {
      sender: "copilot",
      text: "RM Copilot active for Maya Iyer (CUST-40921). Ask any question about portfolio holdings, churn factors, or recommended retention terms.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const suggested = [
    "Summarize Maya's churn risk factors.",
    "What is the best retention offer for Maya?",
    "Show recent transaction activity.",
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    let reply = `Customer Intelligence Response for Maya Iyer: `;
    const q = text.toLowerCase();

    if (q.includes("churn")) {
      reply = `Maya's 92% churn risk is driven by -₹45L deposit outflows and unresolved complaint #8849 regarding wire transfer fees.`;
    } else if (q.includes("retention") || q.includes("offer")) {
      reply = `Recommended Retention Terms:\n1. Waive ₹2,500 disputed wire fee.\n2. Extend +0.75% interest bonus on ₹50L liquid term deposit.\n3. Increase online wire limit to ₹50L.`;
    } else if (q.includes("transaction") || q.includes("activity")) {
      reply = `Recent Activity: Net outflow ₹45L to external wealth account; ₹4.2L high-value wire transfer flagged in Fraud Workstation.`;
    } else {
      reply = `Maya Iyer holds ₹18.4M AUM across 6 products with 6 years tenure under Affluent Wealth segment.`;
    }

    setMessages((prev) => [
      ...prev,
      { sender: "user", text },
      { sender: "copilot", text: reply },
    ]);
    setInput("");
  };

  return (
    <>
      <section
        onClick={() => setIsExpanded(true)}
        className="group rounded-3xl border border-border bg-card p-8 shadow-md hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 hover:border-blue-500/50 transition-all duration-300 ease-out cursor-pointer space-y-6 flex flex-col h-[480px]"
      >
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h3 className="font-bold text-xl tracking-tight flex items-center gap-2 group-hover:text-blue-400 transition">
            <Bot size={22} className="text-blue-500 group-hover:scale-110 transition duration-300" /> Customer RM Copilot
          </h3>
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs font-mono text-muted-foreground">Maya Iyer (CUST-40921)</span>
            <button
              onClick={() => setIsExpanded(true)}
              className="p-2 rounded-xl border border-border bg-background hover:bg-muted text-blue-400 transition flex items-center gap-1.5 text-xs font-bold"
              title="Expand Chat Window"
            >
              <Maximize2 size={14} /> Expand Chat
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 text-base">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-5 rounded-2xl max-w-[85%] leading-relaxed ${
                m.sender === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-background border border-border text-foreground"
              }`}
            >
              <p className="whitespace-pre-wrap">{m.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border space-y-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex gap-2 overflow-x-auto text-sm pb-1">
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
              placeholder="Ask Customer Copilot..."
              className="flex-1 rounded-xl border border-border bg-background px-4 py-3.5 text-base outline-none focus:border-blue-500 transition"
            />
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3.5 text-base font-bold text-white hover:bg-blue-700 transition cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      </section>

      <ExpandedChatModal
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        title="Customer RM Copilot Workspace"
        subtitle="Full Chat Telemetry — Maya Iyer (CUST-40921)"
        messages={messages}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        suggestedPrompts={suggested}
      />
    </>
  );
}