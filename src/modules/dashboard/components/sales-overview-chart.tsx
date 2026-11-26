"use client";

import { useState } from "react";

export function SalesOverviewChart({ className = "" }: { className?: string }) {
  const [activeRange, setActiveRange] = useState<"7D" | "30D" | "90D">("30D");

  return (
    <div className={`bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col justify-between ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg font-semibold text-on-surface">Sales Overview</h2>
            <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary text-[11px] font-semibold">
              Gross Dispatched
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-heading text-2xl font-bold text-on-surface">₹18,42,650</span>
            <span className="text-xs text-tertiary-container font-medium">+16.8% vs previous month</span>
          </div>
        </div>

        {/* Range Buttons */}
        <div className="inline-flex p-1 bg-surface-container-low rounded-xl text-xs">
          {(["7D", "30D", "90D"] as const).map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1 font-medium rounded-lg transition-colors ${
                activeRange === range
                  ? "bg-surface-container-lowest text-primary font-semibold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {range === "7D" ? "7 Days" : range === "30D" ? "30 Days" : "90 Days"}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-64 mt-2">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 760 220">
          <defs>
            <linearGradient id="primaryAreaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.32" />
              <stop offset="60%" stopColor="#4f46e5" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[20, 70, 120, 170].map((y) => (
            <line key={y} stroke="#dae2fd" strokeDasharray="3 3" strokeOpacity="0.6" x1="0" x2="760" y1={y} y2={y} />
          ))}

          {/* Target benchmark */}
          <path d="M 0,140 Q 180,120 380,95 T 760,55" fill="none" stroke="#c7c4d8" strokeDasharray="4 4" strokeWidth="1.5" />

          {/* Gradient Fill & Main Line */}
          <path
            d="M 0,165 C 60,150 110,130 160,110 C 210,90 260,125 310,105 C 360,85 410,40 460,50 C 510,60 560,95 610,65 C 660,35 710,25 760,20 L 760,200 L 0,200 Z"
            fill="url(#primaryAreaGrad)"
          />
          <path
            d="M 0,165 C 60,150 110,130 160,110 C 210,90 260,125 310,105 C 360,85 410,40 460,50 C 510,60 560,95 610,65 C 660,35 710,25 760,20"
            fill="none"
            stroke="#4f46e5"
            strokeLinecap="round"
            strokeWidth="2.5"
          />

          {/* Peak line & dot */}
          <line stroke="#4f46e5" strokeDasharray="2 2" strokeOpacity="0.7" strokeWidth="1.5" x1="460" x2="460" y1="50" y2="200" />
          <circle cx="460" cy="50" fill="#4f46e5" r="5" stroke="#ffffff" strokeWidth="2" className="shadow" />
        </svg>

        {/* Peak Tooltip */}
        <div className="absolute left-[60%] top-2 transform -translate-x-1/2 bg-inverse-surface text-white px-3 py-2 rounded-lg shadow-xl text-left pointer-events-none">
          <div className="text-[10px] text-inverse-on-surface/70 uppercase">Oct 18, 2024</div>
          <div className="text-sm font-semibold tracking-tight">₹1,42,800</div>
          <div className="text-[11px] text-inverse-on-surface/80">48 orders processed</div>
        </div>
      </div>

      {/* Axis Labels */}
      <div className="flex items-center justify-between text-outline text-[11px] font-medium pt-3 border-t border-outline-variant/10">
        <span>Oct 01</span>
        <span>Oct 05</span>
        <span>Oct 10</span>
        <span>Oct 15</span>
        <span className="text-primary font-semibold">Oct 18 (Peak)</span>
        <span>Oct 22</span>
        <span>Oct 24</span>
      </div>
    </div>
  );
}
