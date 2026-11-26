"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, Monitor, Cable, ToggleLeft, Power, ArrowRight } from "lucide-react";

const BEST_SELLERS = [
  { id: "1", name: 'Dell UltraSharp 27" 4K Monitor', units: "27 units • 26.8% of sales", revenue: "₹11,47,500", icon: Monitor, color: "text-primary" },
  { id: "2", name: "Polycab 2.5sq mm FR Wire", units: "340 coils • 19.4% share", revenue: "₹8,31,300", icon: Cable, color: "text-secondary" },
  { id: "3", name: "Schneider Acti9 32A DP MCB", units: "460 units • 12.6% share", revenue: "₹5,42,800", icon: ToggleLeft, color: "text-tertiary-container" },
  { id: "4", name: "Havells Athena Modular Switch", units: "2,500 units • 9.6% share", revenue: "₹4,12,500", icon: Power, color: "text-outline" },
];

export function ReportsSalesTrendCard() {
  const [cadence, setCadence] = useState<"Daily" | "Weekly">("Daily");

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm p-5 flex flex-col justify-between gap-4 border border-outline-variant/20 h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-container" />
            <h2 className="font-heading text-base font-semibold text-on-surface">
              Sales Revenue & Margin Trend
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Aggregate dispatch revenue mapped against direct gross product margin
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 text-xs text-on-surface-variant">
            <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary-container" />Revenue</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-tertiary-container" />Net Margin</span>
          </div>
          <div className="bg-surface-container-low p-0.5 rounded-md flex items-center">
            <button type="button" onClick={() => setCadence("Daily")} className={`px-2 py-0.5 rounded text-xs transition-all ${cadence === "Daily" ? "bg-surface-container-lowest text-on-surface font-semibold shadow-sm" : "text-on-surface-variant"}`}>Daily</button>
            <button type="button" onClick={() => setCadence("Weekly")} className={`px-2 py-0.5 rounded text-xs transition-all ${cadence === "Weekly" ? "bg-surface-container-lowest text-on-surface font-semibold shadow-sm" : "text-on-surface-variant"}`}>Weekly</button>
          </div>
        </div>
      </div>

      {/* SVG Interactive Area Chart */}
      <div className="relative w-full h-56 bg-surface-container-low/30 rounded-lg p-3 flex flex-col justify-between overflow-hidden">
        {/* Peak Tooltip Pill */}
        <div className="absolute left-[75%] top-5 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-2.5 py-1.5 rounded-lg shadow-md text-xs z-10 flex flex-col items-center pointer-events-none">
          <span className="text-inverse-on-surface/80 text-[10px]">Oct 18, 2024</span>
          <div className="flex items-center gap-2 font-semibold text-[11px]">
            <span className="text-tertiary-fixed">₹2,42,000 Rev</span>
            <span className="text-primary-fixed-dim">28.4% Margin</span>
          </div>
          <div className="w-2 h-2 bg-inverse-surface rotate-45 -mb-1 mt-1" />
        </div>

        <svg className="w-full h-40 overflow-visible" fill="none" viewBox="0 0 700 180" preserveAspectRatio="none">
          <defs>
            <linearGradient id="revGradRep" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="marGradRep" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#006e4b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#006e4b" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <line stroke="#dae2fd" strokeDasharray="3 3" x1="0" x2="700" y1="30" y2="30" />
          <line stroke="#dae2fd" strokeDasharray="3 3" x1="0" x2="700" y1="80" y2="80" />
          <line stroke="#dae2fd" strokeDasharray="3 3" x1="0" x2="700" y1="130" y2="130" />
          <path d="M 0 140 Q 90 135, 175 125 T 350 110 T 525 90 T 700 100 L 700 170 L 0 170 Z" fill="url(#marGradRep)" />
          <path d="M 0 140 Q 90 135, 175 125 T 350 110 T 525 90 T 700 100" stroke="#006e4b" strokeLinecap="round" strokeWidth="2" />
          <path d="M 0 120 Q 90 90, 175 105 T 350 65 T 525 25 T 700 55 L 700 170 L 0 170 Z" fill="url(#revGradRep)" />
          <path d="M 0 120 Q 90 90, 175 105 T 350 65 T 525 25 T 700 55" stroke="#4f46e5" strokeLinecap="round" strokeWidth="2.5" />
          <circle cx="525" cy="25" fill="#4f46e5" r="4.5" stroke="#ffffff" strokeWidth="2" />
          <line stroke="#4f46e5" strokeDasharray="2 2" strokeWidth="1.2" x1="525" x2="525" y1="25" y2="170" />
        </svg>

        <div className="flex items-center justify-between text-outline text-[11px] font-mono px-1">
          <span>Oct 01</span><span>Oct 06</span><span>Oct 12</span>
          <span className="text-primary font-semibold">Oct 18 (Peak)</span>
          <span>Oct 22</span><span>Oct 24 (Live)</span>
        </div>
      </div>

      {/* Top Revenue Drivers Grid */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
            Top Revenue Drivers (Active Period)
          </span>
          <Link href="/inventory" className="text-xs text-primary hover:underline font-semibold flex items-center gap-0.5">
            View SKU Matrix <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {BEST_SELLERS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between gap-2">
                <div className="min-w-0 flex items-center gap-2">
                  <div className={`w-8 h-8 rounded bg-surface-container flex items-center justify-center shrink-0 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-on-surface truncate">{item.name}</p>
                    <p className="text-[11px] text-on-surface-variant truncate">{item.units}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold font-mono text-on-surface shrink-0">{item.revenue}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
