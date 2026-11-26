export type PaymentStatus = "Paid" | "Pending" | "Partial" | "Overdue";
export type OrderStatus = "Completed" | "Processing" | "Dispatched" | "Cancelled";

export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  gstin: string;
  orderDate: string;
  orderTime: string;
  units: number;
  skusCount: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
}
