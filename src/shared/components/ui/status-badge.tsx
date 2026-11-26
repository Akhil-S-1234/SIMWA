"use client";

export type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral" | "primary";

interface StatusBadgeProps {
  status: string;
  variant?: BadgeVariant;
  withDot?: boolean;
  className?: string;
}

/**
 * Material Design 3 semantic color mapping for status pills.
 */
const VARIANT_STYLES: Record<BadgeVariant, { bg: string; dot: string }> = {
  success: { bg: "bg-tertiary-fixed text-on-tertiary-fixed", dot: "bg-tertiary-container" },
  warning: { bg: "bg-secondary-fixed text-secondary", dot: "bg-secondary" },
  danger: { bg: "bg-error-container text-error", dot: "bg-error" },
  info: { bg: "bg-primary-fixed text-primary", dot: "bg-primary" },
  primary: { bg: "bg-primary text-white", dot: "bg-white" },
  neutral: { bg: "bg-surface-container text-on-surface-variant", dot: "bg-outline" },
};

/**
 * StatusBadge - Standardized status indicator badge with optional live pulsing dot.
 */
export function StatusBadge({ status, variant, withDot = false, className = "" }: StatusBadgeProps) {
  const norm = status.toLowerCase();
  const resolvedVariant: BadgeVariant =
    variant ||
    (norm === "completed" || norm === "received" || norm === "in stock" || norm === "in_stock"
      ? "success"
      : norm === "pending" || norm === "low stock" || norm === "low_stock"
      ? "warning"
      : norm === "cancelled" || norm === "out of stock" || norm === "out_of_stock"
      ? "danger"
      : norm === "draft"
      ? "info"
      : "neutral");

  const style = VARIANT_STYLES[resolvedVariant];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${style.bg} ${className}`}>
      {withDot && <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />}
      {status.toUpperCase()}
    </span>
  );
}
