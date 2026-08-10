"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Send, Bot, Sparkles, Minimize2, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Message {
  sender: "user" | "copilot";
  text: string;
  timestamp?: string;
  responseObj?: any;
}

interface ExpandedChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  messages: Message[];
  input: string;
  setInput: (val: string) => void;
  handleSend: (text: string) => void;
  suggestedPrompts?: string[];
  isThinking?: boolean;
}

export function ExpandedChatModal({
  isOpen,
  onClose,
  title,
  subtitle,
  messages,
  input,
  setInput,
  handleSend,
  suggestedPrompts = [],
  isThinking = false,
}: ExpandedChatModalProps) {
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

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-background/85 backdrop-blur-md transition-opacity z-[-1]"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[85vh] rounded-3xl border border-border bg-card shadow-2xl z-10 flex flex-col overflow-hidden my-auto transform transition-all duration-300 scale-100 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-card/60 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 border border-blue-500/30 text-blue-500 shadow-xs">
              <Sparkles size={24} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                {title}
                <span className="text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
                  Expanded Intelligence Mode
                </span>
              </h2>
              {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer"
            title="Minimize Chat View"
          >
            <Minimize2 size={18} />
          </button>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-base">
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
                    <Bot size={15} /> Aegis Copilot Synthesis
                  </span>
                ) : (
                  <span className="font-bold text-foreground">You</span>
                )}
                {m.timestamp && <span>• {m.timestamp}</span>}
              </div>

              <div
                className={`p-6 rounded-3xl max-w-[85%] leading-relaxed shadow-sm ${
                  m.sender === "user"
                    ? "bg-blue-600 text-white font-medium rounded-tr-none"
                    : "bg-background border border-border text-foreground rounded-tl-none space-y-4"
                }`}
              >
                <div className="whitespace-pre-wrap font-sans text-base">{m.text}</div>

                {m.responseObj && m.responseObj.citations && m.responseObj.citations.length > 0 && (
                  <div className="pt-4 border-t border-border/80 space-y-3">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Cross-Field Intelligence Citations:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {m.responseObj.citations.map((c: any, cIdx: number) => (
                        <Link
                          key={cIdx}
                          href={c.link}
                          onClick={onClose}
                          className="flex items-center justify-between p-3.5 rounded-2xl border border-border bg-card hover:border-blue-500/50 hover:bg-muted transition text-xs group"
                        >
                          <div className="space-y-0.5 truncate pr-2">
                            <p className="font-bold text-foreground truncate group-hover:text-blue-400 transition">
                              {c.label}
                            </p>
                            <p className="text-[11px] text-muted-foreground truncate">{c.detail}</p>
                          </div>
                          <ExternalLink size={14} className="text-muted-foreground group-hover:text-blue-400 shrink-0 transition" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-background border border-border text-sm text-muted-foreground w-max">
              <Bot size={18} className="animate-spin text-blue-500" />
              Processing neural cross-field search query...
            </div>
          )}
        </div>

        {/* Footer Prompts & Input */}
        <div className="p-6 border-t border-border bg-card/60 space-y-4">
          {suggestedPrompts.length > 0 && (
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
          )}

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
              placeholder="Type your message in expanded mode..."
              className="flex-1 rounded-2xl border border-border bg-background px-5 py-4 text-base font-semibold outline-none focus:border-blue-500 transition shadow-xs"
            />
            <button
              type="submit"
              disabled={isThinking || !input.trim()}
              className="rounded-2xl bg-blue-600 px-8 py-4 font-bold text-base text-white hover:bg-blue-700 disabled:opacity-50 transition flex items-center gap-2 shadow-md cursor-pointer"
            >
              Send <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
