import { Truck } from "lucide-react";

const WEEKS = [
  { label: "W1", poPct: 60, rcvPct: 52, poVal: "₹6.4L", rcvVal: "₹5.6L" },
  { label: "W2", poPct: 80, rcvPct: 75, poVal: "₹8.8L", rcvVal: "₹8.2L" },
  { label: "W3", poPct: 95, rcvPct: 90, poVal: "₹11.2L", rcvVal: "₹10.6L" },
  { label: "W4 (Cur)", poPct: 55, rcvPct: 38, poVal: "₹5.0L", rcvVal: "₹3.4L", isCurrent: true },
];

const TOP_VENDORS = [
  { name: "1. Foxconn Electronics India", spend: "₹14,20,000", share: "34.2%" },
  { name: "2. Dell Global Logistics", spend: "₹9,45,000", share: "22.8%" },
  { name: "3. Polycab Wires & Cables", spend: "₹7,20,000", share: "17.3%" },
];

export function ReportsProcurementFlowCard() {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm p-5 flex flex-col justify-between border border-outline-variant/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-secondary" />
          <h2 className="font-heading text-sm font-semibold text-on-surface">
            Procurement Inflow vs Receipts
          </h2>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-medium">
          Weekly PO Cadence
        </span>
      </div>

      {/* Weekly PO Cadence Bar Chart */}
      <div className="py-2">
        <div className="flex items-end justify-between h-20 gap-3 px-2 pt-2 bg-surface-container-low/30 rounded-lg">
          {WEEKS.map((w) => (
            <div key={w.label} className="flex flex-col items-center gap-1 flex-1 h-full justify-end">
              <div className="w-full flex items-end justify-center gap-1 h-14">
                <div
                  className="w-3 bg-secondary-fixed-dim rounded-t"
                  style={{ height: `${w.poPct}%` }}
                  title={`PO: ${w.poVal}`}
                />
                <div
                  className="w-3 bg-secondary-container rounded-t"
                  style={{ height: `${w.rcvPct}%` }}
                  title={`Received: ${w.rcvVal}`}
                />
              </div>
              <span className={`text-[10px] ${w.isCurrent ? "text-primary font-semibold" : "text-outline"}`}>
                {w.label}
              </span>
            </div>
          ))}
        </div>

        {/* Mini Stats Grid */}
        <div className="grid grid-cols-4 gap-2 text-center mt-2.5 pt-2 bg-surface-container-low rounded-lg p-2">
          <div>
            <p className="text-[10px] text-outline">Total POs</p>
            <p className="text-xs font-semibold text-on-surface">384</p>
          </div>
          <div>
            <p className="text-[10px] text-outline">Received</p>
            <p className="text-xs font-semibold text-tertiary-container">328 (85%)</p>
          </div>
          <div>
            <p className="text-[10px] text-outline">In Transit</p>
            <p className="text-xs font-semibold text-primary">46</p>
          </div>
          <div>
            <p className="text-[10px] text-outline">Disputed</p>
            <p className="text-xs font-semibold text-error">10</p>
          </div>
        </div>
      </div>

      {/* Top Supplier Spend List */}
      <div className="flex flex-col gap-1.5 pt-1 border-t border-outline-variant/15 text-xs text-on-surface">
        <span className="text-[10px] uppercase tracking-wider text-outline font-semibold">
          Top Vendor Allocations
        </span>
        {TOP_VENDORS.map((v) => (
          <div key={v.name} className="flex items-center justify-between text-xs py-0.5">
            <span className="truncate font-medium">{v.name}</span>
            <span className="font-mono font-semibold text-right">
              {v.spend} <span className="text-outline font-normal font-sans">({v.share})</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
