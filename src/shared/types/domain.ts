/**
 * Core Domain Models for SIMWA StockFlow
 * Represents business entities independent of UI or persistence layers.
 */

export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  minimumStockLevel: number;
  unitCost: number;
  sellingPrice: number;
  barcode: string;
  variant: string;
  createdAt: string;
  updatedAt: string;
};

export type Customer = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  city?: string;
};

export type Supplier = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  city?: string;
};

export type TransactionItem = {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type SaleStatus = "draft" | "completed" | "cancelled";

export type Sale = {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  items: TransactionItem[];
  subtotal: number;
  total: number;
  status: SaleStatus;
  createdAt: string;
  completedAt?: string;
};

export type PurchaseStatus = "draft" | "pending" | "received" | "cancelled";

export type Purchase = {
  id: string;
  purchaseOrderNumber: string;
  supplierId: string;
  supplierName: string;
  items: TransactionItem[];
  subtotal: number;
  total: number;
  status: PurchaseStatus;
  createdAt: string;
  receivedAt?: string;
};

export type StockMovementType =
  | "purchase"
  | "sale"
  | "adjustment"
  | "sale_reversal";

export type StockMovement = {
  id: string;
  productId: string;
  productName: string;
  type: StockMovementType;
  quantityChange: number;
  previousQuantity: number;
  newQuantity: number;
  referenceId?: string;
  reason?: string;
  createdAt: string;
};
