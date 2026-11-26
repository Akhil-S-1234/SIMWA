"use client";

import { useState, useMemo } from "react";
import { CheckSquare, Download, RotateCcw } from "lucide-react";
import { AdjustStockModal } from "./adjust-stock-modal";
import { SearchInput } from "@/shared/components/ui/search-input";
import { TableFilterSelect } from "@/shared/components/ui/table-filter-select";

interface InventoryTableToolbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  categoryFilter: string;
  onCategoryChange: (val: string) => void;
  statusFilter: string;
  onStatusChange: (val: string) => void;
  onReset: () => void;
  onExportCsv?: () => void;
  categories?: string[];
}

const DEFAULT_CATEGORIES = [
  "Displays",
  "Electrical Supplies",
  "Switchgear & Controls",
  "Lighting & Fixtures",
  "IT & Electronics",
];

const STATUS_OPTIONS = [
  { label: "All Statuses", value: "ALL" },
  { label: "In Stock", value: "in_stock" },
  { label: "Low Stock", value: "low_stock" },
  { label: "Out of Stock", value: "out_of_stock" },
];

export function InventoryTableToolbar({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  onReset,
  onExportCsv,
  categories = DEFAULT_CATEGORIES,
}: InventoryTableToolbarProps) {
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);

  const categoryOptions = useMemo(() => [
    { label: "All Categories", value: "ALL" },
    ...categories.map((c) => ({ label: c, value: c })),
  ], [categories]);

  return (
    <>
      <div className="relative z-20 rounded-t-xl p-4 bg-surface-container-lowest border-b border-outline-variant/20 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search by product, SKU, barcode, category..."
          className="w-full lg:w-96"
        />

        {/* Filters and Actions */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <TableFilterSelect
            label="Category"
            value={categoryFilter}
            onChange={onCategoryChange}
            options={categoryOptions}
          />

          <TableFilterSelect
            label="Status"
            value={statusFilter}
            onChange={onStatusChange}
            options={STATUS_OPTIONS}
          />

          <button
            type="button"
            onClick={() => setIsAdjustOpen(true)}
            className="h-8 px-2.5 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg text-xs font-medium border border-outline-variant/30 flex items-center gap-1.5 transition-colors"
            title="Batch stock adjustment"
          >
            <CheckSquare className="w-3.5 h-3.5 text-primary" />
            <span>Bulk Adjust</span>
          </button>

          {onExportCsv && (
            <button
              type="button"
              onClick={onExportCsv}
              className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-medium border border-outline-variant/30 transition-colors"
              title="Export catalog to CSV"
            >
              <Download className="w-3.5 h-3.5 text-on-surface-variant" />
              <span>Export CSV</span>
            </button>
          )}

          <button
            type="button"
            onClick={onReset}
            className="h-8 w-8 bg-surface-container-low hover:bg-surface-container text-outline hover:text-primary rounded-lg flex items-center justify-center transition-colors border border-outline-variant/30"
            title="Reset Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <AdjustStockModal isOpen={isAdjustOpen} onClose={() => setIsAdjustOpen(false)} />
    </>
  );
}
