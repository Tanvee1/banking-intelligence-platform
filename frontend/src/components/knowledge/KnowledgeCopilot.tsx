"use client";

import { useState } from "react";
import { Send, BookOpen, Maximize2 } from "lucide-react";
import { ExpandedChatModal } from "@/components/common/ExpandedChatModal";

export function KnowledgeCopilot() {
  const [messages, setMessages] = useState<{ sender: "user" | "copilot"; text: string }[]>([
    {
      sender: "copilot",
      text: "Aegis Policy RAG Copilot initialized. Ask any regulatory or internal SOP compliance question to receive cited banking policy guidelines.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const suggested = [
    "What is the KYC requirement for high-value accounts over ₹1 Crore?",
    "Dual-control wire transfer approval thresholds?",
    "When must an FIU-IND SAR report be filed?",
  ];

  const handleSend = (query: string) => {
    if (!query.trim()) return;

    let reply = "";
    const q = query.toLowerCase();

    if (q.includes("kyc") || q.includes("high-value") || q.includes("1 crore")) {
      reply = `### Regulatory Response: High-Value KYC Requirements\n\n**Citation**: *SOP-2026-KYC (Section 4.2 — UBO Verification)*\n\n- Mandatory Enhanced Due Diligence (EDD) required for all portfolio accounts exceeding ₹1 Crore ($120k USD).\n- Natural person Ultimate Beneficial Owner (UBO) controlling interest must be verified down to a **10% threshold**.\n- Mandates certified passport, tax residency declaration, and audited financial statements.`;
    } else if (q.includes("wire") || q.includes("dual-control") || q.includes("swift")) {
      reply = `### Regulatory Response: Dual-Control Wire Thresholds\n\n**Citation**: *SOP-2026-WIRE (Section 7.1 — Dual Approval & Cooldown)*\n\n- Outbound wire transfers exceeding **₹2.5 Crore** or international transfers over **$50,000 USD** require dual sign-off by a Senior RM and Compliance Desk.\n- Newly added beneficiaries have a **24-hour cooling period** with a ₹50,000 transfer limit unless 3DS biometric hardware push auth is completed.`;
    } else if (q.includes("fiu") || q.includes("sar") || q.includes("report")) {
      reply = `### Regulatory Response: FIU-IND SAR Filing Window\n\n**Citation**: *SOP-2026-AML (Section 2.4 — 24-Hour Mandatory Disclosure)*\n\n- Upon intercepting confirmed account takeover or un-biometric wire transfer anomalies, an electronic Suspicious Activity Report (SAR) must be drafted and submitted within **24 hours**.`;
    } else {
      reply = `Based on Aegis Banking Knowledge Repository (SOP-2026 Edition):\n\nAll high-value wire transfers, beneficial ownership changes, and churn risk interventions must comply with RBI master directions and internal financial crime policies.`;
    }

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: query },
      { sender: "copilot", text: reply },
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
            <BookOpen size={22} className="text-blue-500 group-hover:scale-110 transition duration-300" /> Policy RAG Copilot
          </h3>
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <span className="text-sm font-mono text-muted-foreground">Internal SOP Index v2026.2</span>
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
                  ? "bg-blue-600 text-white font-medium ml-auto rounded-br-none"
                  : "bg-background border border-border text-foreground rounded-bl-none"
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
              placeholder="Ask a policy or compliance question..."
              className="flex-1 rounded-xl border border-border bg-background px-4 py-3.5 text-base outline-none focus:border-blue-500 transition"
            />
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3.5 text-base font-bold text-white hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"
            >
              Send <Send size={16} />
            </button>
          </form>
        </div>
      </section>

      <ExpandedChatModal
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        title="Regulatory Policy RAG Copilot"
        subtitle="SOP Compliance Search Workspace — 2026 Edition"
        messages={messages}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        suggestedPrompts={suggested}
      />
    </>
  );
}
