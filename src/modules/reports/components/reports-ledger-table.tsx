"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, Sliders, MoreVertical } from "lucide-react";
import { useInventoryStore } from "@/store/inventory.store";
import type { StockMovement } from "@/shared/types/domain";
import { TablePagination } from "@/shared/components/ui/table-pagination";
import { formatDate } from "@/shared/utils/format";

interface ReportsLedgerTableProps {
  movements: StockMovement[];
  totalCount: number;
}

export function ReportsLedgerTable({ movements, totalCount }: ReportsLedgerTableProps) {
  const { products } = useInventoryStore();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) => setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const toggleAll = () => setSelected((prev) => (prev.length === movements.length ? [] : movements.map((t) => t.id)));

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="h-9 bg-surface-container-low text-on-surface-variant text-[11px] uppercase tracking-wider select-none">
            <th className="w-10 px-4 text-center">
              <input type="checkbox" checked={selected.length === movements.length && movements.length > 0} onChange={toggleAll} className="h-3.5 w-3.5 rounded text-primary-container focus:ring-0 cursor-pointer" />
            </th>
            <th className="px-4 py-2 font-semibold">Reference ID</th>
            <th className="px-4 py-2 font-semibold">Type</th>
            <th className="px-4 py-2 font-semibold min-w-[200px]">Product / Descriptor</th>
            <th className="px-4 py-2 font-semibold text-right">Units Changed</th>
            <th className="px-4 py-2 font-semibold text-right">Stock (Prev → New)</th>
            <th className="px-4 py-2 font-semibold">Timestamp</th>
            <th className="px-4 py-2 font-semibold">Audit State</th>
            <th className="w-12 px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10 text-on-surface text-xs">
          {movements.length === 0 ? (
            <tr><td colSpan={9} className="py-8 text-center text-outline">No ledger movements found matching your criteria.</td></tr>
          ) : (
            movements.map((tx) => {
              const prod = products.find((p) => p.id === tx.productId);
              const isPositive = tx.quantityChange > 0;
              const typeLabel = tx.type === "sale" ? "Sales Dispatch" : tx.type === "purchase" ? "PO Inbound" : "Stock Variance";
              return (
                <tr key={tx.id} className="h-13 hover:bg-surface-container-low/60 transition-colors group">
                  <td className="px-4 text-center">
                    <input type="checkbox" checked={selected.includes(tx.id)} onChange={() => toggleSelect(tx.id)} className="h-3.5 w-3.5 rounded text-primary-container focus:ring-0 cursor-pointer" />
                  </td>
                  <td className="px-4 py-2 font-medium">
                    <span className="text-primary font-semibold font-mono">{tx.referenceId || tx.id.slice(0, 8)}</span>
                    <span className="block text-[11px] text-outline">{tx.reason || "Operational update"}</span>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                      tx.type === "sale" ? "bg-secondary-fixed text-on-secondary-fixed-variant" : tx.type === "purchase" ? "bg-tertiary-fixed text-on-tertiary-fixed" : "bg-surface-container-high text-on-surface-variant"
                    }`}>
                      {tx.type === "sale" && <ArrowUpRight className="w-3 h-3" />}
                      {tx.type === "purchase" && <ArrowDownLeft className="w-3 h-3" />}
                      {tx.type === "adjustment" && <Sliders className="w-3 h-3" />}
                      {typeLabel}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="font-semibold text-on-surface">{tx.productName || prod?.name || "Product"}</div>
                    <div className="text-[11px] text-outline font-mono">SKU: {prod?.sku || "N/A"}</div>
                  </td>
                  <td className={`px-4 py-2 text-right font-semibold font-mono ${isPositive ? "text-tertiary-container" : "text-error"}`}>
                    {isPositive ? `+${tx.quantityChange}` : tx.quantityChange} units
                  </td>
                  <td className="px-4 py-2 text-right font-mono text-outline">
                    {tx.previousQuantity} → <strong className="text-on-surface">{tx.newQuantity}</strong>
                  </td>
                  <td className="px-4 py-2 text-[11px] text-on-surface-variant whitespace-nowrap">
                    {formatDate(tx.createdAt, true)}
                  </td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-tertiary-fixed/40 text-on-tertiary-fixed border border-tertiary-fixed">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container" /> Reconciled
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button type="button" className="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container"><MoreVertical className="w-4 h-4" /></button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <TablePagination currentCount={movements.length} totalCount={totalCount} itemName="audit records" />
    </div>
  );
}
