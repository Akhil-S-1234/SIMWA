"use client";

import { useState, useMemo } from "react";
import { useInventoryStore } from "@/store/inventory.store";
import { exportToCsv } from "@/shared/utils/csv";
import { PurchasesTableToolbar } from "./purchases-table-toolbar";
import { PurchasesTable } from "./purchases-table";

/**
 * PurchasesTableCard - Orchestrates search, filter, CSV export, and PO table presentation
 */
export function PurchasesTableCard() {
  const { purchases } = useInventoryStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredPurchases = useMemo(() => {
    return purchases.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.purchaseOrderNumber.toLowerCase().includes(q) ||
        p.supplierName.toLowerCase().includes(q) ||
        p.items.some((i) => i.productName.toLowerCase().includes(q));
      const matchStatus = statusFilter === "ALL" || p.status.toLowerCase() === statusFilter.toLowerCase();
      return matchSearch && matchStatus;
    });
  }, [purchases, searchQuery, statusFilter]);

  const handleExportCsv = () => {
    exportToCsv(
      "purchase_orders",
      filteredPurchases.map((p) => ({
        PONumber: p.purchaseOrderNumber,
        Supplier: p.supplierName,
        TotalAmount: p.total,
        Status: p.status,
        ItemsCount: p.items.length,
        CreatedAt: p.createdAt,
      }))
    );
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 flex flex-col">
      <PurchasesTableToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onReset={() => {
          setSearchQuery("");
          setStatusFilter("ALL");
        }}
        onExportCsv={handleExportCsv}
      />
      <PurchasesTable purchases={filteredPurchases} totalCount={purchases.length} />
    </div>
  );
}
