"use client";

import { useState, useMemo } from "react";
import { useInventoryStore } from "@/store/inventory.store";
import { exportToCsv } from "@/shared/utils/csv";
import { SalesTableToolbar } from "./sales-table-toolbar";
import { SalesOrdersTable } from "./sales-orders-table";

/**
 * SalesTableCard - Orchestrates search, filter, CSV export, and table presentation
 */
export function SalesTableCard() {
  const { sales } = useInventoryStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredSales = useMemo(() => {
    return sales.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        s.invoiceNumber.toLowerCase().includes(q) ||
        s.customerName.toLowerCase().includes(q) ||
        s.items.some((i) => i.productName.toLowerCase().includes(q));
      const matchStatus = statusFilter === "ALL" || s.status.toLowerCase() === statusFilter.toLowerCase();
      return matchSearch && matchStatus;
    });
  }, [sales, searchQuery, statusFilter]);

  const handleExportCsv = () => {
    exportToCsv(
      "sales_orders",
      filteredSales.map((s) => ({
        InvoiceNumber: s.invoiceNumber,
        Customer: s.customerName,
        TotalAmount: s.total,
        Status: s.status,
        ItemsCount: s.items.length,
        CreatedAt: s.createdAt,
      }))
    );
  };

  return (
    <div className="flex flex-col rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/20">
      <SalesTableToolbar
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
      <SalesOrdersTable sales={filteredSales} totalCount={sales.length} />
    </div>
  );
}
