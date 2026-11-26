"use client";

import { Download, RotateCcw } from "lucide-react";
import { SearchInput } from "@/shared/components/ui/search-input";
import { TableFilterSelect } from "@/shared/components/ui/table-filter-select";

interface PurchasesTableToolbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusChange: (val: string) => void;
  onReset: () => void;
  onExportCsv?: () => void;
}

const STATUS_OPTIONS = [
  { label: "All Statuses", value: "ALL" },
  { label: "Pending", value: "pending" },
  { label: "Received", value: "received" },
  { label: "Cancelled", value: "cancelled" },
];

export function PurchasesTableToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onReset,
  onExportCsv,
}: PurchasesTableToolbarProps) {
  return (
    <div className="relative z-20 rounded-t-xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-outline-variant/10 bg-surface-container-lowest">
      {/* Search Field */}
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search by PO ID (PO-XXXX), supplier name, or product..."
        className="w-full md:max-w-md"
      />

      {/* Filter & Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <TableFilterSelect
          label="Status"
          value={statusFilter}
          onChange={onStatusChange}
          options={STATUS_OPTIONS}
        />

        {onExportCsv && (
          <button
            type="button"
            onClick={onExportCsv}
            className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-medium border border-outline-variant/30 transition-colors"
            title="Export filtered records to CSV"
          >
            <Download className="w-3.5 h-3.5 text-on-surface-variant" />
            <span>Export CSV</span>
          </button>
        )}

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 h-8 px-2.5 rounded-lg text-primary hover:bg-surface-container-low text-xs font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
