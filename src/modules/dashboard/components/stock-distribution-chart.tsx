import { Info, CheckCircle2 } from "lucide-react";

export function StockDistributionChart({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col justify-between ${className}`}>
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold text-on-surface">Stock Distribution</h2>
          <p className="text-xs text-on-surface-variant">Inventory tier breakdown</p>
        </div>
        <Info className="w-4 h-4 text-outline cursor-pointer hover:text-on-surface transition-colors" />
      </div>

      {/* Donut Chart */}
      <div className="relative flex items-center justify-center my-4">
        <svg className="w-44 h-44 -rotate-90" viewBox="0 0 160 160">
          <circle cx="80" cy="80" fill="transparent" r="62" stroke="#eaedff" strokeWidth="18" />
          {/* Segment 1: In Stock (72%) */}
          <circle
            cx="80"
            cy="80"
            fill="transparent"
            r="62"
            stroke="#4f46e5"
            strokeDasharray="280.4 389.5"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeWidth="18"
          />
          {/* Segment 2: Low Stock (21%) */}
          <circle
            cx="80"
            cy="80"
            fill="transparent"
            r="62"
            stroke="#2170e4"
            strokeDasharray="81.8 389.5"
            strokeDashoffset="-283"
            strokeLinecap="round"
            strokeWidth="18"
          />
          {/* Segment 3: Critical / OOS (7%) */}
          <circle
            cx="80"
            cy="80"
            fill="transparent"
            r="62"
            stroke="#ba1a1a"
            strokeDasharray="27.2 389.5"
            strokeDashoffset="-368"
            strokeLinecap="round"
            strokeWidth="18"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-heading text-2xl font-bold text-on-surface leading-none">8,420</span>
          <span className="text-[10px] text-outline mt-1 font-semibold uppercase tracking-wider">Total Units</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container-low transition-colors text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
            <span className="text-on-surface font-medium">In Stock</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono font-semibold text-on-surface">6,062</span>
            <span className="text-outline w-8 text-right">72%</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container-low transition-colors text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
            <span className="text-on-surface font-medium">Low Stock</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono font-semibold text-on-surface">1,768</span>
            <span className="text-outline w-8 text-right">21%</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container-low transition-colors text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-error" />
            <span className="text-on-surface font-medium">Critical / OOS</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono font-semibold text-on-surface">590</span>
            <span className="text-outline w-8 text-right">7%</span>
          </div>
        </div>
      </div>

      {/* Warehouse Health Badge */}
      <div className="mt-3 p-2 rounded-xl bg-surface-container-low flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-tertiary-container" />
          <span className="text-on-surface font-semibold">Warehouse Health</span>
        </div>
        <span className="text-tertiary-container font-bold">92% Optimum</span>
      </div>
    </div>
  );
}
