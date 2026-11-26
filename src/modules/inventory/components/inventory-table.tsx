"use client";

import { useState } from "react";
import { Sliders, MoreVertical } from "lucide-react";
import type { Product } from "@/shared/types/domain";
import { AdjustStockModal } from "./adjust-stock-modal";
import { StatusBadge } from "@/shared/components/ui/status-badge";
import { TablePagination } from "@/shared/components/ui/table-pagination";
import { formatCurrency } from "@/shared/utils/format";

interface InventoryTableProps {
  products: Product[];
  totalCount: number;
}

export function InventoryTable({ products, totalCount }: InventoryTableProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [adjustTargetId, setAdjustTargetId] = useState<string | null>(null);

  const toggleSelect = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const toggleAll = () =>
    setSelected((prev) => (prev.length === products.length ? [] : products.map((p) => p.id)));

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="h-9 bg-surface-container-low text-on-surface-variant text-[11px] uppercase tracking-wider select-none">
              <th className="w-10 px-4 text-center">
                <input
                  type="checkbox"
                  checked={selected.length === products.length && products.length > 0}
                  onChange={toggleAll}
                  className="h-3.5 w-3.5 rounded text-primary-container focus:ring-0 cursor-pointer"
                />
              </th>
              <th className="px-4 py-2">Product Details & Barcode</th>
              <th className="px-4 py-2">SKU Number</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Current Stock</th>
              <th className="px-4 py-2 text-right">Buffer Min</th>
              <th className="px-4 py-2 text-right">Selling Price</th>
              <th className="px-4 py-2">Stock Status</th>
              <th className="px-4 py-2 text-right">Quick Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-on-surface text-xs">
            {products.length === 0 ? (
              <tr><td colSpan={9} className="py-8 text-center text-outline">No products found matching your search.</td></tr>
            ) : (
              products.map((p) => {
                const maxCap = Math.max(p.quantity, p.minimumStockLevel * 2, 50);
                const pct = Math.round((p.quantity / maxCap) * 100);
                const isOut = p.quantity === 0;
                const isLow = !isOut && p.quantity <= p.minimumStockLevel;
                const status = isOut ? "Out of Stock" : isLow ? "Low Stock" : "In Stock";

                return (
                  <tr key={p.id} className="h-14 hover:bg-surface-container-low/60 transition-colors group">
                    <td className="px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selected.includes(p.id)}
                        onChange={() => toggleSelect(p.id)}
                        className="h-3.5 w-3.5 rounded text-primary-container focus:ring-0 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="font-semibold text-on-surface">{p.name}</div>
                      <div className="text-[11px] text-on-surface-variant font-mono">{p.variant} • Barcode: {p.barcode}</div>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[11px] text-outline">{p.sku}</td>
                    <td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant text-[11px] font-medium">{p.category}</span></td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-surface-container rounded-full overflow-hidden">
                          <div className={`h-full ${isOut ? "bg-error" : isLow ? "bg-secondary-container" : "bg-tertiary-container"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                        </div>
                        <span className="font-semibold font-mono">{p.quantity} units</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono font-medium text-outline">{p.minimumStockLevel}</td>
                    <td className="px-4 py-2.5 text-right font-semibold font-mono">{formatCurrency(p.sellingPrice, 0)}</td>
                    <td className="px-4 py-2.5">
                      <StatusBadge status={status} withDot />
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setAdjustTargetId(p.id)} className="px-2 py-1 rounded bg-surface-container-low text-on-surface hover:bg-surface-container text-[11px] font-medium flex items-center gap-1" title="Adjust Stock">
                          <Sliders className="w-3 h-3" /> Adjust
                        </button>
                        <button type="button" className="p-1 rounded hover:bg-surface-container text-outline hover:text-on-surface"><MoreVertical className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <TablePagination currentCount={products.length} totalCount={totalCount} itemName="catalog products" />
      </div>
      {adjustTargetId && (
        <AdjustStockModal isOpen={Boolean(adjustTargetId)} onClose={() => setAdjustTargetId(null)} defaultProductId={adjustTargetId} />
      )}
    </>
  );
}
