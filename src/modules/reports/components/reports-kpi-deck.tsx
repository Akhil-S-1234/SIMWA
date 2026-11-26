import { ArrowUp, TrendingUp, AlertTriangle } from "lucide-react";

const CARDS = [
  {
    title: "Total Sales Revenue",
    value: "₹42,85,600",
    badge: "+18.2%",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
    badgeIcon: ArrowUp,
    sparklineD: "M0 32 Q 20 30, 40 22 T 80 16 T 120 20 T 160 6",
    sparklineColor: "#4f46e5",
    leftMeta: <>Gross Margin: <strong className="text-on-surface font-semibold">24.8%</strong></>,
    rightMeta: "AOV ₹28,918",
  },
  {
    title: "Total Purchase Value",
    value: "₹31,45,200",
    badge: "+14.2%",
    badgeClass: "bg-secondary-fixed text-on-secondary-fixed-variant",
    badgeIcon: TrendingUp,
    sparklineD: "M0 28 Q 25 35, 50 20 T 100 24 T 130 12 T 160 18",
    sparklineColor: "#0058be",
    leftMeta: "384 POs issued",
    rightMeta: <span className="text-tertiary-container font-semibold">₹1.82L saved</span>,
  },
  {
    title: "Total Throughput",
    value: "1,866",
    subUnit: "Transactions",
    badge: "1,482 SO / 384 PO",
    badgeClass: "bg-surface-container-high text-on-surface-variant",
    badgeIcon: null,
    sparklineD: "M0 22 Q 30 10, 60 25 T 110 8 T 160 14",
    sparklineColor: "#3525cd",
    leftMeta: <>OTIF Rate: <strong className="text-tertiary-container font-semibold">94.2%</strong></>,
    rightMeta: "Lead Time: 2.1d",
  },
  {
    title: "Inventory Valuation",
    value: "₹24,85,000",
    badge: "35 Out",
    badgeClass: "bg-error-container text-on-error-container",
    badgeIcon: AlertTriangle,
    sparklineD: "M0 16 Q 40 28, 80 18 T 120 30 T 160 24",
    sparklineColor: "#777587",
    leftMeta: "8,420 units (1,248 SKUs)",
    rightMeta: <span className="text-error font-medium">128 Reorder</span>,
  },
];

export function ReportsKpiDeck() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {CARDS.map((card) => {
        const BadgeIcon = card.badgeIcon;
        return (
          <div
            key={card.title}
            className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between hover:bg-surface-bright transition-all border border-outline-variant/20 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">
                  {card.title}
                </span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="font-heading text-2xl font-semibold text-on-surface">
                    {card.value}
                  </span>
                  {card.subUnit && (
                    <span className="text-xs text-outline">{card.subUnit}</span>
                  )}
                </div>
              </div>

              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${card.badgeClass}`}>
                {BadgeIcon && <BadgeIcon className="w-3 h-3" />}
                {card.badge}
              </span>
            </div>

            <div className="py-2">
              <svg className="w-full h-11" fill="none" viewBox="0 0 160 40" preserveAspectRatio="none">
                <path d={card.sparklineD} stroke={card.sparklineColor} strokeLinecap="round" strokeWidth="2.2" />
                <path d={`${card.sparklineD} L 160 40 L 0 40 Z`} fill={card.sparklineColor} fillOpacity="0.08" />
              </svg>
            </div>

            <div className="pt-2 border-t border-outline-variant/10 flex items-center justify-between text-xs text-on-surface-variant">
              <span>{card.leftMeta}</span>
              <span>{card.rightMeta}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
