import { Package } from "lucide-react";

export function ReportsStockDistributionCard() {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm p-5 flex flex-col justify-between border border-outline-variant/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-tertiary-container" />
          <h2 className="font-heading text-sm font-semibold text-on-surface">
            Stock Valuation & Distribution
          </h2>
        </div>
        <span className="text-[11px] text-tertiary-container bg-tertiary-fixed/40 px-2 py-0.5 rounded font-semibold border border-tertiary-fixed">
          Healthy Turn
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 py-2">
        {/* Donut Visual (Inline SVG) */}
        <div className="relative w-28 h-28 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="transparent" r="38" stroke="#f2f3ff" strokeWidth="12" />
            {/* In Stock (72%) */}
            <circle
              cx="50" cy="50" fill="transparent" r="38" stroke="#006e4b"
              strokeDasharray="171.8 238.7" strokeDashoffset="0" strokeWidth="12"
            />
            {/* Buffer / Reorder (21%) */}
            <circle
              cx="50" cy="50" fill="transparent" r="38" stroke="#2170e4"
              strokeDasharray="50.1 238.7" strokeDashoffset="-171.8" strokeWidth="12"
            />
            {/* Stockout Risk (7%) */}
            <circle
              cx="50" cy="50" fill="transparent" r="38" stroke="#ba1a1a"
              strokeDasharray="16.7 238.7" strokeDashoffset="-221.9" strokeWidth="12"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-heading text-lg text-on-surface font-bold leading-tight">72%</span>
            <span className="text-[10px] text-outline">Nominal</span>
          </div>
        </div>

        {/* Legend and Valuation Breakdown */}
        <div className="flex flex-col gap-2 w-full text-xs">
          <div className="flex items-center justify-between p-2 rounded bg-surface-container-low">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container" />
              <span>In Stock (72%)</span>
            </span>
            <span className="font-semibold font-mono text-on-surface">₹17,89,200</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-surface-container-low">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
              <span>Buffer / Reorder (21%)</span>
            </span>
            <span className="font-semibold font-mono text-on-surface">₹5,21,800</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-surface-container-low">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-error" />
              <span>Stockout Risk (7%)</span>
            </span>
            <span className="font-semibold font-mono text-error">₹1,74,000</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Chips */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-outline-variant/15 text-xs text-on-surface-variant">
        <div className="p-2 rounded bg-surface-container-low flex flex-col">
          <span className="text-[10px] text-outline">Safety Stock Coverage</span>
          <strong className="text-on-surface font-semibold text-xs mt-0.5">18.4 Days</strong>
        </div>
        <div className="p-2 rounded bg-surface-container-low flex flex-col">
          <span className="text-[10px] text-outline">Dead Stock (&gt;90d Aging)</span>
          <strong className="text-on-surface font-semibold text-xs mt-0.5">1.4% (₹34.8K)</strong>
        </div>
      </div>
    </div>
  );
}
