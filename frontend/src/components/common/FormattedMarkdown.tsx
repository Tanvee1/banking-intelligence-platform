"use client";

import React from "react";

interface Props {
  text: string;
}

export function FormattedMarkdown({ text }: Props) {
  if (!text) return null;

  // Split lines
  const lines = text.split("\n");

  const renderInline = (str: string) => {
    // Replace `code` with styled <code>, and **bold** with <strong>
    const parts: React.ReactNode[] = [];
    let remaining = str;

    // Pattern to match `code` or **bold** or *italic*
    const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
    let match;
    let lastIdx = 0;

    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIdx) {
        parts.push(str.substring(lastIdx, match.index));
      }

      const matchText = match[0];
      if (matchText.startsWith("`") && matchText.endsWith("`")) {
        parts.push(
          <code
            key={match.index}
            className="font-mono bg-blue-500/15 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-lg text-xs font-bold"
          >
            {matchText.slice(1, -1)}
          </code>
        );
      } else if (matchText.startsWith("**") && matchText.endsWith("**")) {
        parts.push(
          <strong key={match.index} className="font-black text-foreground">
            {matchText.slice(2, -2)}
          </strong>
        );
      } else if (matchText.startsWith("*") && matchText.endsWith("*")) {
        parts.push(
          <em key={match.index} className="italic text-muted-foreground">
            {matchText.slice(1, -1)}
          </em>
        );
      }

      lastIdx = regex.lastIndex;
    }

    if (lastIdx < str.length) {
      parts.push(str.substring(lastIdx));
    }

    return parts;
  };

  return (
    <div className="space-y-3 text-sm text-foreground font-medium leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // H3 Header (### Title)
        if (trimmed.startsWith("###")) {
          const headerText = trimmed.replace(/^###\s*/, "");
          return (
            <h4
              key={idx}
              className="text-base font-black text-foreground border-b border-border pb-2 pt-2 tracking-tight flex items-center gap-2"
            >
              {renderInline(headerText)}
            </h4>
          );
        }

        // Bullet Point (- Item or * Item)
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const bulletText = trimmed.replace(/^[-*]\s*/, "");
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-2 text-xs sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0 mt-2" />
              <div className="flex-1 leading-relaxed">{renderInline(bulletText)}</div>
            </div>
          );
        }

        // Numbered list (1. Item)
        if (/^\d+\.\s/.test(trimmed)) {
          const numMatch = trimmed.match(/^(\d+\.)\s*(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 text-xs sm:text-sm">
                <span className="font-black text-blue-400 text-xs shrink-0 mt-0.5">{numMatch[1]}</span>
                <div className="flex-1 leading-relaxed">{renderInline(numMatch[2])}</div>
              </div>
            );
          }
        }

        // Regular Paragraph
        return (
          <p key={idx} className="text-xs sm:text-sm leading-relaxed">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
