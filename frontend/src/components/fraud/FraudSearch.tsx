"use client";

import { Search, Filter } from "lucide-react";
import { FraudCase } from "@/lib/fraud-data";

interface FraudSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRiskFilter: string;
  setSelectedRiskFilter: (filter: string) => void;
  selectedStatusFilter: string;
  setSelectedStatusFilter: (filter: string) => void;
  allCases: FraudCase[];
}

export function FraudSearch({
  searchQuery,
  setSearchQuery,
  selectedRiskFilter,
  setSelectedRiskFilter,
  selectedStatusFilter,
  setSelectedStatusFilter,
}: FraudSearchProps) {
  return (
    <section className="flex flex-col sm:flex-row items-center gap-4">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search transaction ID, customer name, merchant..."
          className="w-full rounded-2xl border border-border bg-card py-3.5 pl-12 pr-4 text-base outline-none focus:border-blue-500 transition shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground px-2.5 py-1 bg-muted rounded-lg"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Dropdowns */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 text-sm shadow-xs">
          <Filter size={18} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">Risk:</span>
          <select
            value={selectedRiskFilter}
            onChange={(e) => setSelectedRiskFilter(e.target.value)}
            className="bg-transparent text-sm font-semibold text-foreground outline-none cursor-pointer"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 text-sm shadow-xs">
          <span className="text-sm text-muted-foreground font-medium">Status:</span>
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="bg-transparent text-sm font-semibold text-foreground outline-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="Under Review">Under Review</option>
            <option value="Escalated">Escalated</option>
            <option value="Frozen">Frozen</option>
            <option value="Cleared">Cleared</option>
          </select>
        </div>
      </div>
    </section>
  );
}