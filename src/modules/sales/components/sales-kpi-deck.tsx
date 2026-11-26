import { ShoppingBag, CreditCard, Clock, Truck, TrendingUp, ArrowUpRight, CheckCircle2 } from "lucide-react";

export function SalesKpiDeck() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Sales */}
      <div className="flex flex-col justify-between p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20 relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">Total Sales</span>
            <span className="font-heading text-2xl text-on-surface font-semibold tracking-tight mt-0.5">1,482</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-white transition-colors">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between pt-2 border-t border-outline-variant/10">
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-1 text-xs text-tertiary-container font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+12.4%</span>
              <span className="text-on-surface-variant font-normal">vs last month</span>
            </div>
            <span className="text-[11px] text-on-surface-variant mt-0.5">Avg. 49 orders / day</span>
          </div>
          <div className="w-20 h-9 shrink-0">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 80 32">
              <defs>
                <linearGradient id="salesGrad1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#006e4b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#006e4b" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M0 24 Q 12 18, 24 22 T 48 10 T 64 14 T 80 4 L 80 32 L 0 32 Z" fill="url(#salesGrad1)" />
              <path d="M0 24 Q 12 18, 24 22 T 48 10 T 64 14 T 80 4" fill="none" stroke="#006e4b" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Total Revenue */}
      <div className="flex flex-col justify-between p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20 relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">Total Revenue</span>
            <span className="font-heading text-2xl text-on-surface font-semibold tracking-tight mt-0.5">₹42,85,600</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-white transition-colors">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between pt-2 border-t border-outline-variant/10">
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-1 text-xs text-tertiary-container font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.2%</span>
              <span className="text-on-surface-variant font-normal">MoM growth</span>
            </div>
            <span className="text-[11px] text-on-surface-variant mt-0.5">Gross margin 24.8%</span>
          </div>
          <div className="w-20 h-9 shrink-0">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 80 32">
              <defs>
                <linearGradient id="salesGrad2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M0 26 Q 14 24, 28 16 T 56 12 T 80 2 L 80 32 L 0 32 Z" fill="url(#salesGrad2)" />
              <path d="M0 26 Q 14 24, 28 16 T 56 12 T 80 2" fill="none" stroke="#3525cd" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Pending Payments */}
      <div className="flex flex-col justify-between p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20 relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">Pending Payments</span>
            <span className="font-heading text-2xl text-on-surface font-semibold tracking-tight mt-0.5">₹3,92,400</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-error group-hover:bg-error group-hover:text-white transition-colors">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between pt-2 border-t border-outline-variant/10">
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-1.5 text-xs text-error font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-error" />
              <span>14 invoices overdue</span>
            </div>
            <span className="text-[11px] text-on-surface-variant mt-0.5">Avg. aging 8.5 days</span>
          </div>
          <div className="w-20 h-9 shrink-0">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 80 32">
              <defs>
                <linearGradient id="salesGrad3" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ba1a1a" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ba1a1a" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M0 10 Q 20 18, 40 14 T 60 22 T 80 20 L 80 32 L 0 32 Z" fill="url(#salesGrad3)" />
              <path d="M0 10 Q 20 18, 40 14 T 60 22 T 80 20" fill="none" stroke="#ba1a1a" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* 4. Completed Orders */}
      <div className="flex flex-col justify-between p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20 relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">Completed Orders</span>
            <span className="font-heading text-2xl text-on-surface font-semibold tracking-tight mt-0.5">1,396</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
            <Truck className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between pt-2 border-t border-outline-variant/10">
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-1 text-xs text-secondary font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>94.2% fulfillment rate</span>
            </div>
            <span className="text-[11px] text-on-surface-variant mt-0.5">0.8% return rate</span>
          </div>
          <div className="w-20 h-9 shrink-0">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 80 32">
              <defs>
                <linearGradient id="salesGrad4" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0058be" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0058be" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M0 20 Q 20 12, 40 18 T 60 8 T 80 6 L 80 32 L 0 32 Z" fill="url(#salesGrad4)" />
              <path d="M0 20 Q 20 12, 40 18 T 60 8 T 80 6" fill="none" stroke="#0058be" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
