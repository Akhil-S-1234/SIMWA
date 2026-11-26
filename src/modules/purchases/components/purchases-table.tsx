"use client";

import { useState } from "react";
import { Eye, Inbox } from "lucide-react";
import type { Purchase } from "@/shared/types/domain";
import { useInventoryStore } from "@/store/inventory.store";
import { StatusBadge } from "@/shared/components/ui/status-badge";
import { TablePagination } from "@/shared/components/ui/table-pagination";
import { ConfirmationModal } from "@/shared/components/ui/confirmation-modal";
import { formatCurrency, formatDate } from "@/shared/utils/format";

interface PurchasesTableProps {
  purchases: Purchase[];
  totalCount: number;
}

export function PurchasesTable({ purchases, totalCount }: PurchasesTableProps) {
  const { receivePurchase } = useInventoryStore();
  const [msg, setMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<Purchase | null>(null);

  const handleReceive = (id: string) => {
    const res = receivePurchase(id);
    setMsg(
      res.success
        ? { text: "Goods received successfully! Stock units incremented.", isError: false }
        : { text: res.error || "Failed to receive goods.", isError: true }
    );
    setTimeout(() => setMsg(null), 4000);
  };

  return (
    <div className="w-full overflow-hidden flex flex-col">
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
            <tr className="bg-surface-container-low text-outline uppercase tracking-wider h-10 select-none font-semibold border-b border-outline-variant/30">
              <th className="w-10 px-4 text-center"><input className="rounded cursor-pointer" type="checkbox" /></th>
              <th className="px-4">PO ID</th>
              <th className="px-4">Supplier</th>
              <th className="px-4">Order Date</th>
              <th className="px-4">Items / SKUs</th>
              <th className="px-4 text-right">Total Amount</th>
              <th className="px-4">Receiving Status</th>
              <th className="px-4 text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-on-surface">
            {purchases.length === 0 ? (
              <tr><td colSpan={8} className="py-8 text-center text-outline">No purchase orders found matching your search.</td></tr>
            ) : (
              purchases.map((ord) => {
                const totalUnits = ord.items.reduce((acc, i) => acc + i.quantity, 0);
                return (
                  <tr key={ord.id} className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="w-10 px-4 text-center"><input className="rounded cursor-pointer" type="checkbox" /></td>
                    <td className="px-4 py-3.5"><span className="font-semibold text-primary hover:underline cursor-pointer">#{ord.purchaseOrderNumber}</span></td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-on-surface truncate">{ord.supplierName}</span>
                        <span className="text-[11px] text-outline mt-0.5">{ord.items[0]?.productName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5"><span>{formatDate(ord.createdAt)}</span></td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-col">
                        <span className="font-medium">{totalUnits} units</span>
                        <span className="text-[11px] text-outline">{ord.items.length} line items</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold tabular-nums text-on-surface">
                      {formatCurrency(ord.total)}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={ord.status} withDot={ord.status === "pending"} />
                    </td>
                    <td className="px-4 py-3.5 text-right pr-6">
                      <div className="inline-flex items-center gap-1.5">
                        {ord.status === "pending" && (
                          <button onClick={() => setConfirmTarget(ord)} className="px-2.5 py-1 rounded bg-secondary-container text-white text-[11px] font-medium hover:bg-secondary transition-colors flex items-center gap-1 shadow-sm">
                            <Inbox className="w-3 h-3" /> Receive Goods
                          </button>
                        )}
                        <button className="p-1.5 rounded hover:bg-surface-container text-outline hover:text-on-surface" title="View PO"><Eye className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <TablePagination currentCount={purchases.length} totalCount={totalCount} itemName="purchase orders" />

      <ConfirmationModal
        isOpen={Boolean(confirmTarget)}
        onClose={() => setConfirmTarget(null)}
        onConfirm={() => confirmTarget && handleReceive(confirmTarget.id)}
        title="Receive Inbound Goods?"
        message={`Confirm physical delivery for #${confirmTarget?.purchaseOrderNumber} from ${confirmTarget?.supplierName}? Warehouse inventory will be incremented.`}
        confirmText="Receive Goods"
        variant="secondary"
      />
    </div>
  );
}
