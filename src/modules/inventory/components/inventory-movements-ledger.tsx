"use client";

import Link from "next/link";
import { History, ArrowDownLeft, ArrowUpRight, Sliders, ArrowRight } from "lucide-react";
import { useInventoryStore } from "@/store/inventory.store";

/**
 * InventoryMovementsLedger - Displays the real-time FIFO stock movement audit feed.
 */
export function InventoryMovementsLedger() {
  const { stockMovements } = useInventoryStore();
  const recentMovements = stockMovements.slice(0, 5);

  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col justify-between border border-outline-variant/20 h-full">
      <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-secondary" />
            <h2 className="font-heading text-base font-semibold text-on-surface">Recent Stock Movements</h2>
          </div>
          <span className="text-xs text-on-surface-variant mt-0.5">Live ledger feed from store operations</span>
        </div>
        <Link href="/reports" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
          <span>View Ledger</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex flex-col gap-2 my-2 overflow-hidden">
        {recentMovements.map((item) => (
          <div key={item.id} className="p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={`h-8 w-8 rounded-lg shrink-0 flex items-center justify-center ${
                item.quantityChange > 0 ? "bg-tertiary-fixed/40 text-on-tertiary-fixed" : item.type === "adjustment" ? "bg-secondary-fixed text-secondary" : "bg-primary-fixed text-primary"
              }`}>
                {item.quantityChange > 0 ? <ArrowDownLeft className="w-4 h-4" /> : item.type === "adjustment" ? <Sliders className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-on-surface font-semibold truncate">{item.productName}</span>
                <span className="text-[11px] text-on-surface-variant truncate">{item.referenceId || "Internal"} • {item.reason || item.type}</span>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0">
              <span className={`text-xs font-semibold ${item.quantityChange > 0 ? "text-tertiary-container" : item.type === "adjustment" ? "text-secondary-container" : "text-primary"}`}>
                {item.quantityChange > 0 ? `+${item.quantityChange}` : item.quantityChange} units
              </span>
              <span className="text-[10px] text-outline font-mono">
                {new Date(item.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
