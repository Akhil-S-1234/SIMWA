import { PurchasesHeader } from "@/modules/purchases/components/purchases-header";
import { PurchasesKpiDeck } from "@/modules/purchases/components/purchases-kpi-deck";
import { PurchasesTableCard } from "@/modules/purchases/components/purchases-table-card";

export default function PurchasesPage() {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
      <PurchasesHeader />
      <PurchasesKpiDeck />
      <PurchasesTableCard />
    </div>
  );
}
