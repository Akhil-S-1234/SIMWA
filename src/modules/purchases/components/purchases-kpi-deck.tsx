import { Package, IndianRupee, Truck, CheckCircle2, ArrowUpRight, ShieldCheck } from "lucide-react";

export function PurchasesKpiDeck() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* 1. Total Purchases */}
      <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] text-outline uppercase tracking-wider font-semibold">Total Purchases</span>
            <div className="font-heading text-2xl text-on-surface font-bold mt-1 tracking-tight">384</div>
          </div>
          <div className="p-2.5 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between pt-2 border-t border-outline-variant/10">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-tertiary-container text-xs font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+8.6%</span>
              <span className="text-on-surface-variant font-normal text-[11px]">vs last month</span>
            </div>
            <span className="text-on-surface-variant text-[11px] mt-0.5">Avg. 12 POs / week</span>
          </div>
          <div className="w-20 h-9">
            <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 100 36">
              <path d="M0 30 Q 20 28, 35 22 T 70 12 T 100 4" stroke="#4f46e5" strokeLinecap="round" strokeWidth="2.5" />
              <path d="M0 30 Q 20 28, 35 22 T 70 12 T 100 4 L 100 36 L 0 36 Z" fill="url(#sparkline-indigo)" opacity="0.12" />
              <defs>
                <linearGradient id="sparkline-indigo" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Total Purchase Value */}
      <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] text-outline uppercase tracking-wider font-semibold">Total Purchase Value</span>
            <div className="font-heading text-2xl text-on-surface font-bold mt-1 tracking-tight">₹31,45,200</div>
          </div>
          <div className="p-2.5 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center">
            <IndianRupee className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between pt-2 border-t border-outline-variant/10">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-tertiary-container text-xs font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+14.2%</span>
              <span className="text-on-surface-variant font-normal text-[11px]">MoM procurement</span>
            </div>
            <span className="text-on-surface-variant text-[11px] mt-0.5">Vendor discounts saved ₹1.82L</span>
          </div>
          <div className="w-20 h-9">
            <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 100 36">
              <path d="M0 32 Q 25 30, 45 18 T 80 10 T 100 3" stroke="#0058be" strokeLinecap="round" strokeWidth="2.5" />
              <path d="M0 32 Q 25 30, 45 18 T 80 10 T 100 3 L 100 36 L 0 36 Z" fill="url(#sparkline-blue)" opacity="0.12" />
              <defs>
                <linearGradient id="sparkline-blue" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0058be" />
                  <stop offset="100%" stopColor="#0058be" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Pending Purchases */}
      <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] text-outline uppercase tracking-wider font-semibold">Pending Purchases</span>
            <div className="font-heading text-2xl text-on-surface font-bold mt-1 tracking-tight">46</div>
          </div>
          <div className="p-2.5 rounded-lg bg-error-container text-error flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between pt-2 border-t border-outline-variant/10">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-error text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-error" />
              <span>12 overdue deliveries</span>
            </div>
            <span className="text-on-surface-variant text-[11px] mt-0.5">Avg. transit delay 2.4 days</span>
          </div>
          <div className="w-20 h-9">
            <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 100 36">
              <path d="M0 10 Q 30 14, 55 24 T 85 28 T 100 32" stroke="#ba1a1a" strokeLinecap="round" strokeWidth="2.5" />
              <path d="M0 10 Q 30 14, 55 24 T 85 28 T 100 32 L 100 36 L 0 36 Z" fill="url(#sparkline-rose)" opacity="0.12" />
              <defs>
                <linearGradient id="sparkline-rose" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ba1a1a" />
                  <stop offset="100%" stopColor="#ba1a1a" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* 4. Received Purchases */}
      <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] text-outline uppercase tracking-wider font-semibold">Received Purchases</span>
            <div className="font-heading text-2xl text-on-surface font-bold mt-1 tracking-tight">328</div>
          </div>
          <div className="p-2.5 rounded-lg bg-tertiary-fixed text-tertiary-container flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between pt-2 border-t border-outline-variant/10">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-secondary text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>96.4% on-time rate</span>
            </div>
            <span className="text-on-surface-variant text-[11px] mt-0.5">0.4% discrepancy rate</span>
          </div>
          <div className="w-20 h-9">
            <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 100 36">
              <path d="M0 24 Q 25 18, 50 12 T 75 7 T 100 5" stroke="#006e4b" strokeLinecap="round" strokeWidth="2.5" />
              <path d="M0 24 Q 25 18, 50 12 T 75 7 T 100 5 L 100 36 L 0 36 Z" fill="url(#sparkline-green)" opacity="0.12" />
              <defs>
                <linearGradient id="sparkline-green" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#006e4b" />
                  <stop offset="100%" stopColor="#006e4b" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
