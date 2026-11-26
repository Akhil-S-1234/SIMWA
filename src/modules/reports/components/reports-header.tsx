"use client";

import { FileText, Table, Circle } from "lucide-react";
import { useInventoryStore } from "@/store/inventory.store";
import { exportToCsv } from "@/shared/utils/csv";

interface ReportsHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = ["Overview", "Sales Analytics", "Procurement Log", "Stock Health"];

export function ReportsHeader({ activeTab, onTabChange }: ReportsHeaderProps) {
  const { stockMovements } = useInventoryStore();

  const handleExportCsv = () => {
    exportToCsv(
      "reports_summary",
      stockMovements.map((m) => ({
        ReferenceID: m.referenceId || m.id,
        Type: m.type,
        ProductName: m.productName,
        QuantityChange: m.quantityChange,
        Date: m.createdAt,
      }))
    );
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="bg-surface-container-lowest shadow-sm rounded-xl p-5 flex flex-col gap-4 border border-outline-variant/20">
      {/* Title & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-heading text-2xl font-semibold text-on-surface tracking-tight">
              Reports & Intelligence
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              Executive Telemetry
            </span>
            <span className="text-xs text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded font-mono">
              FY 2024-25
            </span>
          </div>
          <p className="text-sm text-on-surface-variant">
            Analyze real-time inventory velocity, sales performance, margin yields, and procurement commitments.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors text-xs font-medium shadow-xs border border-outline-variant/30 active:scale-95"
            title="Print or save as PDF"
          >
            <FileText className="w-4 h-4 text-error" />
            <span>Export PDF</span>
          </button>

          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors text-xs font-medium shadow-xs border border-outline-variant/30 active:scale-95"
            title="Download audit records as CSV"
          >
            <Table className="w-4 h-4 text-tertiary-container" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Module Switcher Tabs */}
      <div className="pt-2 border-t border-outline-variant/15 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === tab
                  ? "bg-surface-container-lowest text-on-surface shadow-xs font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-on-surface-variant">
          <Circle className="w-2 h-2 fill-tertiary text-tertiary" />
          <span>Live Telemetry Active</span>
        </div>
      </div>
    </div>
  );
}
