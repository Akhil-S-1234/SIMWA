"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { AddProductModal } from "./add-product-modal";

export function InventoryHeader() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "p" || e.key === "P") && !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsAddOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="font-heading text-2xl font-semibold text-on-surface tracking-tight">Inventory</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-tertiary-fixed/40 text-on-tertiary-fixed font-medium text-xs border border-tertiary-fixed">
              <span className="h-1.5 w-1.5 rounded-full bg-tertiary-container animate-pulse" />
              Real-Time SKU Telemetry
            </span>
          </div>
          <p className="text-sm text-on-surface-variant">Monitor products, stock levels, and inventory availability across the catalog.</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button type="button" onClick={() => setIsAddOpen(true)} className="h-9 px-3.5 bg-primary-container text-white rounded-lg text-xs font-medium hover:bg-primary transition-all shadow-sm flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
            <kbd className="ml-1 px-1.5 py-0.5 rounded bg-white/20 text-white text-[10px] font-mono">P</kbd>
          </button>
        </div>
      </div>

      <AddProductModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </>
  );
}
