import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  icon: LucideIcon;
  iconBgClass: string;
  iconColorClass: string;
  value: string;
  trendText: string;
  trendSubtext: string;
  trendBadgeClass: string;
  trendIcon?: LucideIcon;
  sparklinePath: string;
  sparklineStroke: string;
  sparklineDash?: string;
  footerLeft: string;
  footerRight: string;
  footerRightClass: string;
  isAlert?: boolean;
}

export function KpiCard({
  title,
  icon: Icon,
  iconBgClass,
  iconColorClass,
  value,
  trendText,
  trendSubtext,
  trendBadgeClass,
  trendIcon: TrendIcon,
  sparklinePath,
  sparklineStroke,
  sparklineDash,
  footerLeft,
  footerRight,
  footerRightClass,
  isAlert,
}: KpiCardProps) {
  const lastY = sparklinePath.split(",").slice(-1)[0] || "4";

  return (
    <div
      className={`bg-surface-container-lowest p-5 rounded-xl shadow-sm hover:shadow transition-shadow flex flex-col justify-between gap-4 border ${
        isAlert
          ? "border-error-container/60 ring-1 ring-error-container/40"
          : "border-outline-variant/20"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-outline uppercase tracking-wider font-semibold">
          {title}
        </span>
        <div className={`w-8 h-8 rounded-lg ${iconBgClass} flex items-center justify-center ${iconColorClass}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <div className="font-heading font-semibold text-2xl text-on-surface tracking-tight">
            {value}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold ${trendBadgeClass}`}>
              {TrendIcon && <TrendIcon className="w-3 h-3" />}
              {trendText}
            </span>
            <span className="text-xs text-on-surface-variant">{trendSubtext}</span>
          </div>
        </div>

        <div className="w-20 h-9 shrink-0 flex items-end pb-1" title="7-day trajectory">
          <svg className="w-full h-8 overflow-visible" viewBox="0 0 70 28" preserveAspectRatio="none">
            <path
              d={sparklinePath}
              fill="none"
              stroke={sparklineStroke}
              strokeWidth="2"
              strokeDasharray={sparklineDash}
              strokeLinecap="round"
            />
            <circle cx="70" cy={lastY} r="2.5" fill={sparklineStroke} />
          </svg>
        </div>
      </div>

      <div className="text-[11px] text-outline font-medium pt-2 border-t border-outline-variant/10 flex items-center justify-between">
        <span>{footerLeft}</span>
        <span className={`font-mono font-semibold ${footerRightClass}`}>{footerRight}</span>
      </div>
    </div>
  );
}
