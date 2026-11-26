"use client";

import { Download, Filter } from "lucide-react";
import { SearchInput } from "@/shared/components/ui/search-input";

interface ReportsLedgerToolbarProps {
  activePill: string;
  onPillChange: (pill: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onExportCsv?: () => void;
}

const FILTER_PILLS = [
  { label: "All Movements", value: "ALL" },
  { label: "Sales Orders", value: "sale" },
  { label: "Purchase Inflows", value: "purchase" },
  { label: "Stock Adjustments", value: "adjustment" },
];

export function ReportsLedgerToolbar({
  activePill,
  onPillChange,
  searchQuery,
  onSearchChange,
  onExportCsv,
}: ReportsLedgerToolbarProps) {
  return (
    <div className="p-4 md:p-5 flex flex-col gap-4 border-b border-outline-variant/20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-base font-semibold text-on-surface">
            Consolidated Transaction & Audit Ledger
          </h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Real-time ledger recording sales dispatch, inbound dock shipments, and inventory variances
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg shrink-0">
          {FILTER_PILLS.map((pill) => (
            <button
              key={pill.value}
              type="button"
              onClick={() => onPillChange(pill.value)}
              className={`px-3 py-1 text-xs rounded transition-all ${
                activePill === pill.value
                  ? "bg-surface-container-lowest text-on-surface font-semibold shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        {/* Reusable Search Component */}
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search SKU, reference, or reason..."
          className="w-full sm:w-80"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap text-xs">
          {onExportCsv && (
            <button
              type="button"
              onClick={onExportCsv}
              className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-medium border border-outline-variant/30 transition-colors"
              title="Export ledger to CSV"
            >
              <Download className="w-3.5 h-3.5 text-on-surface-variant" />
              <span>Export CSV</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              onPillChange("ALL");
              onSearchChange("");
            }}
            className="h-8 px-2.5 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container transition-colors inline-flex items-center gap-1.5 font-medium border border-outline-variant/30"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Reset Ledger</span>
          </button>
        </div>
      </div>
    </div>
  );
}
