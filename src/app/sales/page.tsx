import { SalesHeader } from "@/modules/sales/components/sales-header";
import { SalesKpiDeck } from "@/modules/sales/components/sales-kpi-deck";
import { SalesTableCard } from "@/modules/sales/components/sales-table-card";

export default function SalesPage() {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
      <SalesHeader />
      <SalesKpiDeck />
      <SalesTableCard />
    </div>
  );
}
