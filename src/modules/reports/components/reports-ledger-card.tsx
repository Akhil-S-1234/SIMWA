"use client";

import { useState, useMemo } from "react";
import { useInventoryStore } from "@/store/inventory.store";
import { exportToCsv } from "@/shared/utils/csv";
import { ReportsLedgerToolbar } from "./reports-ledger-toolbar";
import { ReportsLedgerTable } from "./reports-ledger-table";

/**
 * ReportsLedgerCard - Orchestrates search, category filters, and CSV export for the Audit Ledger
 */
export function ReportsLedgerCard() {
  const { stockMovements } = useInventoryStore();
  const [activePill, setActivePill] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovements = useMemo(() => {
    return stockMovements.filter((m) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        (m.referenceId && m.referenceId.toLowerCase().includes(q)) ||
        (m.productName && m.productName.toLowerCase().includes(q)) ||
        (m.reason && m.reason.toLowerCase().includes(q));

      const matchPill = activePill === "ALL" || m.type.toLowerCase() === activePill.toLowerCase();
      return matchSearch && matchPill;
    });
  }, [stockMovements, searchQuery, activePill]);

  const handleExportCsv = () => {
    exportToCsv(
      "inventory_audit_ledger",
      filteredMovements.map((m) => ({
        ReferenceID: m.referenceId || m.id,
        Type: m.type,
        ProductName: m.productName,
        QuantityChange: m.quantityChange,
        PreviousQuantity: m.previousQuantity,
        NewQuantity: m.newQuantity,
        Reason: m.reason || "",
        CreatedAt: m.createdAt,
      }))
    );
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden flex flex-col">
      <ReportsLedgerToolbar
        activePill={activePill}
        onPillChange={setActivePill}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExportCsv={handleExportCsv}
      />
      <ReportsLedgerTable movements={filteredMovements} totalCount={stockMovements.length} />
    </div>
  );
}
