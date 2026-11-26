"use client";

import Link from "next/link";
import { ShoppingBag, Truck, SlidersHorizontal, ArrowRight } from "lucide-react";
import { useInventoryStore } from "@/store/inventory.store";
import type { StockMovement } from "@/shared/types/domain";

export function RecentActivityStream({ className = "" }: { className?: string }) {
  const { stockMovements } = useInventoryStore();
  const recentMovements: StockMovement[] = stockMovements.slice(0, 5);

  return (
    <div className={`bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10">
          <div>
            <h2 className="font-heading text-lg font-semibold text-on-surface">Recent Activity</h2>
            <p className="text-xs text-on-surface-variant">Continuous operational log stream</p>
          </div>
          <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-semibold">
            Live Stream
          </span>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 flex flex-col gap-4 mt-4">
          <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-surface-container-high" />

          {recentMovements.length === 0 ? (
            <p className="text-xs text-outline py-4">No recent stock activity logged.</p>
          ) : (
            recentMovements.map((act) => {
              const isSale = act.type === "sale";
              const isPurchase = act.type === "purchase";
              const Icon = isSale ? ShoppingBag : isPurchase ? Truck : SlidersHorizontal;
              const iconBg = isSale ? "bg-primary-container text-white" : isPurchase ? "bg-secondary text-white" : "bg-surface-container-high text-primary";
              const refText = act.referenceId || act.id.slice(0, 8);
              const title = isSale ? `Sale Dispatched (${refText})` : isPurchase ? `PO Received (${refText})` : `Stock Adjusted (${refText})`;
              const detail = `${act.quantityChange > 0 ? "+" : ""}${act.quantityChange} units of ${act.productName}`;
              const timeAgo = new Date(act.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

              return (
                <div key={act.id} className="relative flex items-start gap-3">
                  <span className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full ${iconBg} flex items-center justify-center text-xs shadow-sm`}>
                    <Icon className="w-3 h-3" />
                  </span>
                  <div className="flex flex-col text-xs">
                    <div className="font-semibold text-on-surface">{title}</div>
                    <div className="text-on-surface-variant mt-0.5">{detail}</div>
                    <div className="text-[10px] text-outline mt-0.5 font-mono">{timeAgo} · {act.reason || "Audit Log"}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-outline-variant/10">
        <Link href="/reports" className="w-full py-2 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center justify-between text-xs font-semibold transition-colors">
          <span>View Full Audit Log ({stockMovements.length} total events)</span>
          <ArrowRight className="w-3.5 h-3.5 text-outline" />
        </Link>
      </div>
    </div>
  );
}
