export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface InventoryItem {
  id: string;
  name: string;
  variant: string;
  barcode: string;
  sku: string;
  category: string;
  currentStock: number;
  maxStock: number;
  bufferMin: number;
  unitPrice: string;
  status: StockStatus;
  lastUpdated: string;
}

export interface StockMovement {
  id: string;
  productName: string;
  refCode: string;
  location: string;
  units: number;
  type: "in" | "out" | "audit";
  timestamp: string;
}
