import { Package, Layers, CheckCircle2, AlertTriangle, XCircle, TrendingUp, BarChart2 } from "lucide-react";

const KPI_CARDS = [
  {
    title: "Total Products",
    value: "1,248",
    trend: "+14 new this month",
    trendType: "positive",
    icon: Package,
    colorClass: "text-primary",
    bgClass: "group-hover:bg-primary-container group-hover:text-white",
    sparklineD: "M2 18 L15 16 L28 19 L40 10 L58 4",
    sparklineStroke: "#3525cd",
  },
  {
    title: "Total Stock Units",
    value: "8,420",
    trend: "Avg. 6.7 units/SKU",
    trendType: "neutral",
    icon: Layers,
    colorClass: "text-secondary",
    bgClass: "group-hover:bg-secondary group-hover:text-white",
    sparklineD: "M2 14 L14 12 L26 15 L38 9 L58 6",
    sparklineStroke: "#0058be",
  },
  {
    title: "In Stock Items",
    value: "1,085",
    trend: "86.9% catalog ready",
    trendType: "positive",
    icon: CheckCircle2,
    colorClass: "text-tertiary-container",
    bgClass: "group-hover:bg-tertiary-container group-hover:text-white",
    sparklineD: "M2 10 L15 12 L30 8 L45 9 L58 4",
    sparklineStroke: "#006e4b",
  },
  {
    title: "Low Stock Items",
    value: "128",
    trend: "18 critical reorders",
    trendType: "warning",
    icon: AlertTriangle,
    colorClass: "text-secondary-container",
    bgClass: "group-hover:bg-secondary-container group-hover:text-white",
    sparklineD: "M2 6 L18 10 L34 8 L46 16 L58 20",
    sparklineStroke: "#2170e4",
  },
  {
    title: "Out of Stock",
    value: "35",
    trend: "3 high priority loss",
    trendType: "error",
    icon: XCircle,
    colorClass: "text-error",
    bgClass: "group-hover:bg-error group-hover:text-white",
    sparklineD: "M2 4 L16 8 L32 14 L46 18 L58 22",
    sparklineStroke: "#ba1a1a",
  },
];

export function InventoryKpiDeck() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {KPI_CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow border border-outline-variant/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">
                {card.title}
              </span>
              <span className={`h-8 w-8 rounded-lg bg-surface-container-low flex items-center justify-center ${card.colorClass} ${card.bgClass} transition-colors`}>
                <Icon className="w-4 h-4" />
              </span>
            </div>

            <div className="my-2 flex items-baseline justify-between">
              <span className="font-heading text-2xl text-on-surface font-semibold">
                {card.value}
              </span>
              <svg className="w-16 h-7" fill="none" stroke={card.sparklineStroke} strokeWidth="2" viewBox="0 0 60 24">
                <path d={card.sparklineD} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="flex items-center gap-1 text-xs">
              {card.trendType === "positive" && <TrendingUp className="w-3.5 h-3.5 text-tertiary-container" />}
              {card.trendType === "neutral" && <BarChart2 className="w-3.5 h-3.5 text-outline" />}
              {card.trendType === "warning" && <AlertTriangle className="w-3.5 h-3.5 text-secondary-container" />}
              {card.trendType === "error" && <XCircle className="w-3.5 h-3.5 text-error" />}
              <span
                className={`font-medium ${
                  card.trendType === "positive"
                    ? "text-tertiary-container"
                    : card.trendType === "warning"
                    ? "text-secondary-container"
                    : card.trendType === "error"
                    ? "text-error"
                    : "text-on-surface-variant"
                }`}
              >
                {card.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
