import { InventoryHeader } from "@/modules/inventory/components/inventory-header";
import { InventoryKpiDeck } from "@/modules/inventory/components/inventory-kpi-deck";
import { InventoryTableCard } from "@/modules/inventory/components/inventory-table-card";
import { InventoryMovementsLedger } from "@/modules/inventory/components/inventory-movements-ledger";

export default function InventoryPage() {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
      <InventoryHeader />
      <InventoryKpiDeck />
      <InventoryTableCard />
      <InventoryMovementsLedger />
    </div>
  );
}
