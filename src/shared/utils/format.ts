/**
 * Standardized formatting utilities for SIMWA StockFlow.
 * Enforces uniform currency, date, and metric representation across all modules.
 */

/**
 * Formats a numeric value into INR currency string (e.g., ₹1,24,500.00).
 */
export function formatCurrency(amount: number, decimals: number = 2): string {
  return "₹" + amount.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Formats an ISO date string into human-readable Indian standard display.
 */
export function formatDate(dateString: string, includeTime: boolean = false): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
      ...(includeTime ? { hour: "2-digit", minute: "2-digit" } : {}),
    });
  } catch {
    return dateString;
  }
}

/**
 * Formats integer unit quantities with comma grouping.
 */
export function formatUnits(qty: number): string {
  return qty.toLocaleString("en-IN") + " units";
}
