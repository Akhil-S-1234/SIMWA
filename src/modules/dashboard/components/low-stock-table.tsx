"use client";

import Link from "next/link";
import { SlidersHorizontal, ShoppingCart, ArrowRight } from "lucide-react";
import { useInventoryStore } from "@/store/inventory.store";

export function LowStockTable({ className = "" }: { className?: string }) {
  const { products } = useInventoryStore();
  const lowStockItems = products.filter((p) => p.quantity <= p.minimumStockLevel);

  return (
    <div className={`bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 flex flex-col overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/10">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg font-semibold text-on-surface">Low Stock Alerts</h2>
            <span className="px-2 py-0.5 rounded-full bg-error-container text-error text-xs font-semibold">
              {lowStockItems.length} Items
            </span>
          </div>
          <p className="text-xs text-on-surface-variant">Replenishment requirements ordered by stock risk</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/inventory" className="h-8 px-3 bg-primary-container hover:bg-primary text-white text-xs font-medium rounded-lg shadow-sm transition-colors flex items-center gap-1.5">
            <ShoppingCart className="w-3.5 h-3.5" /> Manage In Inventory
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-surface-container-low text-outline uppercase tracking-wider border-b border-outline-variant/30 font-semibold">
              <th className="py-2.5 px-4">Product Name</th>
              <th className="py-2.5 px-3">SKU</th>
              <th className="py-2.5 px-3 text-right">Available</th>
              <th className="py-2.5 px-3 text-right">Min Threshold</th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="py-2.5 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-on-surface">
            {lowStockItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-on-surface-variant">
                  All inventory healthy! No critical stockouts detected.
                </td>
              </tr>
            ) : (
              lowStockItems.map((item) => {
                const isCritical = item.quantity === 0;
                return (
                  <tr key={item.id} className="hover:bg-surface-container-low/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-on-surface">{item.name}</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-outline">{item.sku}</td>
                    <td className="py-3 px-3 text-right font-bold text-on-surface">{item.quantity}</td>
                    <td className="py-3 px-3 text-right font-medium text-outline">{item.minimumStockLevel}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        isCritical ? "bg-error-container text-error" : "bg-secondary-fixed text-secondary"
                      }`}>
                        {isCritical ? "Out of Stock" : "Low Stock"}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <Link href="/purchases" className="text-primary hover:underline font-semibold text-[11px]">
                        Order Stock →
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
