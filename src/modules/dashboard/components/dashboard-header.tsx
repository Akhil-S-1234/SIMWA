"use client";

import { Download } from "lucide-react";
import { useInventoryStore } from "@/store/inventory.store";
import { exportToCsv } from "@/shared/utils/csv";

export function DashboardHeader() {
  const { products } = useInventoryStore();

  const handleExportSummary = () => {
    exportToCsv(
      "hub_inventory_summary",
      products.map((p) => ({
        SKU: p.sku,
        ProductName: p.name,
        Category: p.category,
        CurrentStock: p.quantity,
        BufferMinimum: p.minimumStockLevel,
        SellingPrice: p.sellingPrice,
      }))
    );
  };

  return (
    <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2">
      {/* Title & Live Status */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <h1 className="font-heading font-semibold text-2xl text-on-surface tracking-tight">
            Dashboard
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-tertiary-fixed text-on-tertiary-fixed shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-pulse" />
            Live Sync
          </span>
        </div>
        <p className="text-sm text-on-surface-variant">
          Real-time operations, inventory movement, and catalog telemetry for today.
        </p>
      </div>

      {/* Operational Controls */}
      <div className="flex items-center gap-2">
        {/* Export Data */}
        <button
          type="button"
          onClick={handleExportSummary}
          className="h-9 px-3.5 bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors rounded-xl shadow-xs flex items-center gap-2 text-xs font-medium border border-outline-variant/30 active:scale-95"
          title="Export inventory summary to CSV"
        >
          <Download className="w-4 h-4 text-outline" />
          <span>Export Summary</span>
        </button>
      </div>
    </header>
  );
}
