import { DashboardHeader } from "@/modules/dashboard/components/dashboard-header";
import { QuickActions } from "@/modules/dashboard/components/quick-actions";
import { KpiGrid } from "@/modules/dashboard/components/kpi-grid";
import { SalesOverviewChart } from "@/modules/dashboard/components/sales-overview-chart";
import { StockDistributionChart } from "@/modules/dashboard/components/stock-distribution-chart";
import { LowStockTable } from "@/modules/dashboard/components/low-stock-table";
import { RecentActivityStream } from "@/modules/dashboard/components/recent-activity-stream";

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
      <DashboardHeader />
      <QuickActions />
      <KpiGrid />

      {/* Analytics Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <SalesOverviewChart className="lg:col-span-8" />
        <StockDistributionChart className="lg:col-span-4" />
      </section>

      {/* Operational Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <LowStockTable className="lg:col-span-8" />
        <RecentActivityStream className="lg:col-span-4" />
      </section>
    </div>
  );
}
