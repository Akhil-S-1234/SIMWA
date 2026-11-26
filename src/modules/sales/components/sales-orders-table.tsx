"use client";

import { useState } from "react";
import { Eye, CheckCircle2, RotateCcw } from "lucide-react";
import type { Sale } from "@/shared/types/domain";
import { useInventoryStore } from "@/store/inventory.store";
import { StatusBadge } from "@/shared/components/ui/status-badge";
import { TablePagination } from "@/shared/components/ui/table-pagination";
import { ConfirmationModal } from "@/shared/components/ui/confirmation-modal";
import { formatCurrency, formatDate } from "@/shared/utils/format";

interface SalesOrdersTableProps {
  sales: Sale[];
  totalCount: number;
}

export function SalesOrdersTable({ sales, totalCount }: SalesOrdersTableProps) {
  const { completeSale, cancelSale } = useInventoryStore();
  const [msg, setMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ type: "complete" | "cancel"; sale: Sale } | null>(null);

  const handleComplete = (id: string) => {
    const res = completeSale(id);
    setMsg(
      res.success
        ? { text: "Sale completed! Inventory stock deducted.", isError: false }
        : { text: res.error || "Cannot complete sale.", isError: true }
    );
    setTimeout(() => setMsg(null), 4000);
  };

  const handleConfirm = () => {
    if (!confirmAction) return;
    if (confirmAction.type === "complete") {
      handleComplete(confirmAction.sale.id);
    } else {
      cancelSale(confirmAction.sale.id);
      setMsg({ text: `Order #${confirmAction.sale.invoiceNumber} cancelled.`, isError: false });
      setTimeout(() => setMsg(null), 4000);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      {msg && (
        <div
          className={`p-3 text-xs font-medium flex items-center justify-between ${
            msg.isError
              ? "bg-error-container text-on-error-container"
              : "bg-tertiary-fixed text-on-tertiary-fixed"
          }`}
        >
          <span>{msg.text}</span>
          <button onClick={() => setMsg(null)} className="underline text-[11px]">Dismiss</button>
        </div>
      )}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="h-10 bg-surface-container-low text-on-surface-variant font-semibold uppercase tracking-wider select-none border-b border-outline-variant/30">
              <th className="w-12 px-4 text-center"><input className="rounded text-primary cursor-pointer" type="checkbox" /></th>
              <th className="px-4">Order ID</th>
              <th className="px-4">Customer</th>
              <th className="px-4">Order Date</th>
              <th className="px-4 text-right">Items / Units</th>
              <th className="px-4 text-right">Total Amount</th>
              <th className="px-4">Order Status</th>
              <th className="px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-on-surface">
            {sales.length === 0 ? (
              <tr><td colSpan={8} className="py-8 text-center text-outline">No sales orders found matching your search.</td></tr>
            ) : (
              sales.map((ord) => {
                const totalUnits = ord.items.reduce((acc, i) => acc + i.quantity, 0);
                return (
                  <tr key={ord.id} className="hover:bg-surface-container-low/70 transition-colors group">
                    <td className="px-4 py-3 text-center"><input className="rounded text-primary cursor-pointer" type="checkbox" /></td>
                    <td className="px-4 py-3 font-mono font-semibold text-primary hover:underline cursor-pointer">#{ord.invoiceNumber}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface">{ord.customerName}</span>
                        <span className="text-[11px] text-on-surface-variant font-mono">{ord.items[0]?.productName || "Multiple Items"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant whitespace-nowrap">{formatDate(ord.createdAt)}</td>
                    <td className="px-4 py-3 text-right font-medium whitespace-nowrap">{totalUnits} units <span className="text-on-surface-variant text-[11px]">({ord.items.length} SKUs)</span></td>
                    <td className="px-4 py-3 text-right font-semibold text-on-surface tabular-nums whitespace-nowrap">{formatCurrency(ord.total)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={ord.status} withDot={ord.status === "draft"} />
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {ord.status === "draft" && (
                          <button onClick={() => setConfirmAction({ type: "complete", sale: ord })} className="px-2 py-1 rounded bg-primary-container text-white text-[11px] font-medium hover:bg-primary transition-colors flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Complete
                          </button>
                        )}
                        {ord.status === "draft" && (
                          <button onClick={() => setConfirmAction({ type: "cancel", sale: ord })} className="p-1 rounded text-outline hover:text-error transition-colors" title="Cancel order">
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button className="p-1 rounded text-on-surface-variant hover:text-primary transition-colors" title="View details"><Eye className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <TablePagination currentCount={sales.length} totalCount={totalCount} itemName="sales orders" />

      <ConfirmationModal
        isOpen={Boolean(confirmAction)}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleConfirm}
        title={confirmAction?.type === "complete" ? "Complete & Fulfill Order?" : "Cancel Sale Order?"}
        message={confirmAction?.type === "complete"
          ? `Complete sale #${confirmAction.sale.invoiceNumber} for ${confirmAction.sale.customerName}? Stock will be deducted immediately.`
          : `Are you sure you want to cancel order #${confirmAction?.sale.invoiceNumber}? This action marks the order as cancelled.`}
        confirmText={confirmAction?.type === "complete" ? "Complete & Deduct" : "Cancel Order"}
        variant={confirmAction?.type === "complete" ? "primary" : "danger"}
      />
    </div>
  );
}
