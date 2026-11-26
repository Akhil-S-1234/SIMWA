export type PurchasePaymentStatus = "Paid" | "Advance Paid" | "Pending" | "Cancelled";
export type PurchaseReceivingStatus = "Pending" | "Partially Received" | "Received" | "Vendor Stockout";

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierName: string;
  gstin: string;
  orderDate: string;
  orderTime: string;
  expectedDelivery: string;
  deliveryTag?: string;
  isOverdue?: boolean;
  units: number;
  skusCount: number;
  totalAmount: number;
  paymentStatus: PurchasePaymentStatus;
  receivingStatus: PurchaseReceivingStatus;
  receivedCount?: string;
}
