"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  ShoppingBag,
  Package,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react";

/**
 * Main application navigation links.
 */
const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Sales", href: "/sales", icon: Receipt },
  { label: "Purchases", href: "/purchases", icon: ShoppingBag },
  { label: "Inventory", href: "/inventory", icon: Package },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

/**
 * Sidebar - Fixed primary navigation bar.
 * Handles active route detection, slide-in indicators, and hover micro-interactions.
 */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest border-r border-outline-variant/30 z-50 flex flex-col justify-between">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center gap-2 border-b border-outline-variant/20">
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-white font-bold text-sm shadow-xs">
            SW
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-semibold text-base text-on-surface leading-none tracking-tight">
              SIMWA
            </span>
            <span className="text-[10px] text-primary tracking-wider font-semibold mt-0.5">
              STOCKFLOW
            </span>
          </div>
        </div>

        {/* Navigation list with active route indicators */}
        <div className="px-3 py-3">
          <nav className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/" || pathname === "/dashboard"
                  : pathname === item.href || (pathname !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ease-out ${
                    isActive
                      ? "bg-primary-container text-white font-medium shadow-sm translate-x-0.5"
                      : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface hover:translate-x-1"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-white shadow-xs animate-in fade-in duration-200" />
                  )}
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                      isActive ? "scale-105" : "group-hover:scale-110"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Meta & Health status */}
      <div className="flex flex-col border-t border-outline-variant/20 p-3 gap-2 bg-surface-container-lowest">
        <button className="flex items-center gap-2 px-2 py-1 text-on-surface-variant hover:text-on-surface text-xs transition-colors">
          <HelpCircle className="w-4 h-4 text-outline" />
          <span>Help & Support</span>
        </button>

        <div className="flex items-center gap-2 px-2 py-1">
          <span className="h-2 w-2 rounded-full bg-tertiary-container animate-pulse" />
          <span className="text-[11px] text-on-surface-variant font-medium">All systems operational</span>
        </div>
      </div>
    </aside>
  );
}
