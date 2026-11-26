export type LedgerEntryType = "Sales Order" | "PO Inbound" | "Stock Variance" | "Inter-Hub Transfer";

export type AuditState =
  | "Reconciled"
  | "QC Passed"
  | "Write-off Approved"
  | "Dispatched"
  | "Dock Stored"
  | "In Warehouse QC";

export interface LedgerTransaction {
  id: string;
  referenceId: string;
  subReference: string;
  type: LedgerEntryType;
  productName: string;
  sku: string;
  category: string;
  unitsChanged: string;
  isPositive: boolean;
  netValuation: string;
  timestamp: string;
  timeIST: string;
  auditState: AuditState;
}

export interface BestSellerProduct {
  id: string;
  name: string;
  unitsInfo: string;
  revenue: string;
  iconType: "desktop" | "cable" | "switch" | "power";
}
