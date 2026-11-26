"use client";

import { Package, Layers, IndianRupee, AlertTriangle, ArrowUpRight, TrendingUp } from "lucide-react";
import { KpiCard } from "./kpi-card";
import { useInventoryStore } from "@/store/inventory.store";

export function KpiGrid() {
  const { products } = useInventoryStore();

  const totalProducts = products.length;
  const totalUnits = products.reduce((acc, p) => acc + p.quantity, 0);
  const totalValuation = products.reduce((acc, p) => acc + p.quantity * p.sellingPrice, 0);
  const lowStockCount = products.filter((p) => p.quantity <= p.minimumStockLevel).length;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Products */}
      <KpiCard
        title="Total Products"
        icon={Package}
        iconBgClass="bg-surface-container-low"
        iconColorClass="text-primary"
        value={totalProducts.toString()}
        trendText="+12"
        trendSubtext="this month"
        trendBadgeClass="bg-tertiary-fixed text-on-tertiary-fixed shadow-sm"
        trendIcon={ArrowUpRight}
        sparklinePath="M 0,22 Q 14,24 25,16 T 50,11 T 70,4"
        sparklineStroke="#006e4b"
        footerLeft="Active in 14 categories"
        footerRight="99.4% active"
        footerRightClass="text-tertiary-container"
      />

      {/* 2. Total Stock Units */}
      <KpiCard
        title="Total Stock Units"
        icon={Layers}
        iconBgClass="bg-surface-container-low"
        iconColorClass="text-secondary"
        value={totalUnits.toLocaleString()}
        trendText="+5.4%"
        trendSubtext="vs last cycle"
        trendBadgeClass="bg-tertiary-fixed text-on-tertiary-fixed shadow-sm"
        trendIcon={ArrowUpRight}
        sparklinePath="M 0,20 Q 18,10 32,18 T 54,8 T 70,3"
        sparklineStroke="#2170e4"
        footerLeft="3 regional distribution hubs"
        footerRight="Optimal cap"
        footerRightClass="text-secondary"
      />

      {/* 3. Total Inventory Value */}
      <KpiCard
        title="Total Inventory Value"
        icon={IndianRupee}
        iconBgClass="bg-surface-container-low"
        iconColorClass="text-tertiary-container"
        value={`₹${totalValuation.toLocaleString()}`}
        trendText="+8.2%"
        trendSubtext="MoM growth"
        trendBadgeClass="bg-tertiary-fixed text-on-tertiary-fixed shadow-sm"
        trendIcon={TrendingUp}
        sparklinePath="M 0,24 Q 20,20 35,14 T 55,10 T 70,2"
        sparklineStroke="#4f46e5"
        footerLeft="Live inventory valuation"
        footerRight="Direct cost"
        footerRightClass="text-primary"
      />

      {/* 4. Low Stock Alerts */}
      <KpiCard
        title="Low Stock Alerts"
        icon={AlertTriangle}
        iconBgClass="bg-error-container"
        iconColorClass="text-error"
        value={lowStockCount.toString()}
        trendText={`${lowStockCount} items`}
        trendSubtext="need reorder"
        trendBadgeClass="bg-error-container text-error shadow-sm"
        trendIcon={AlertTriangle}
        sparklinePath="M 0,8 Q 16,14 30,10 T 52,22 T 70,20"
        sparklineStroke="#ba1a1a"
        footerLeft="Buffer stock breaches"
        footerRight="Action required"
        footerRightClass="text-error font-medium"
      />
    </section>
  );
}
