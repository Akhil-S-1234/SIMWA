"use client";

import { useState, useMemo } from "react";
import { useInventoryStore } from "@/store/inventory.store";
import { exportToCsv } from "@/shared/utils/csv";
import { InventoryTableToolbar } from "./inventory-table-toolbar";
import { InventoryTable } from "./inventory-table";

/**
 * InventoryTableCard - Orchestrates search, dynamic category, status filters, and CSV export
 */
export function InventoryTableCard() {
  const { products } = useInventoryStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const availableCategories = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);
    return list.length > 0 ? list : undefined;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.barcode.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);

      const matchCategory =
        categoryFilter === "ALL" || p.category.toLowerCase() === categoryFilter.toLowerCase();

      const isOut = p.quantity === 0;
      const isLow = !isOut && p.quantity <= p.minimumStockLevel;
      let matchStatus = true;
      if (statusFilter === "in_stock") matchStatus = !isOut && !isLow;
      if (statusFilter === "low_stock") matchStatus = isLow;
      if (statusFilter === "out_of_stock") matchStatus = isOut;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [products, searchQuery, categoryFilter, statusFilter]);

  const handleExportCsv = () => {
    exportToCsv(
      "inventory_catalog",
      filteredProducts.map((p) => ({
        SKU: p.sku,
        ProductName: p.name,
        Category: p.category,
        CurrentStock: p.quantity,
        BufferMinimum: p.minimumStockLevel,
        SellingPrice: p.sellingPrice,
        UnitCost: p.unitCost,
      }))
    );
  };

  return (
    <div className="flex flex-col rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/20">
      <InventoryTableToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onReset={() => {
          setSearchQuery("");
          setCategoryFilter("ALL");
          setStatusFilter("ALL");
        }}
        onExportCsv={handleExportCsv}
        categories={availableCategories}
      />
      <InventoryTable products={filteredProducts} totalCount={products.length} />
    </div>
  );
}
