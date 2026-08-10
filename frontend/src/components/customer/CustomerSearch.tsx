"use client";

import { Search, SlidersHorizontal, UserPlus } from "lucide-react";

interface CustomerSearchProps {
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export function CustomerSearch({ searchQuery = "", setSearchQuery }: CustomerSearchProps) {
  return (
    <section className="flex flex-col sm:flex-row items-center gap-4">
      <div className="relative flex-1 w-full">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          placeholder="Search customer name, account number, RM, or tier..."
          className="w-full rounded-2xl border border-border bg-card py-3.5 pl-12 pr-4 text-base outline-none focus:border-blue-500 transition shadow-xs"
        />
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-bold hover:bg-muted transition shadow-xs">
          <SlidersHorizontal size={18} /> Filters
        </button>
        <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-blue-700 transition shadow-xs shrink-0">
          <UserPlus size={18} /> Add Client
        </button>
      </div>
    </section>
  );
}