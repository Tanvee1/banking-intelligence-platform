"use client";

import { Search, BookOpen, Filter } from "lucide-react";

interface KnowledgeSearchProps {
  query: string;
  setQuery: (q: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export function KnowledgeSearch({
  query,
  setQuery,
  activeCategory,
  setActiveCategory,
}: KnowledgeSearchProps) {
  const categories = ["ALL", "KYC & AML", "Wire Transfers", "Credit Underwriting", "Sanctions Screening", "Fraud SOPs"];

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search banking SOPs, RBI regulations, KYC policies, wire transfer rules..."
            className="w-full rounded-2xl border border-border bg-card py-3.5 pl-12 pr-4 text-base outline-none focus:border-blue-500 transition shadow-xs"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-xl px-4 py-2.5 font-bold transition whitespace-nowrap ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-xs"
                : "border border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}
