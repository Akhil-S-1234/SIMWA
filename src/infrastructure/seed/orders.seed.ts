import type { Sale, Purchase } from "@/shared/types/domain";

export const INITIAL_SALES: Sale[] = [
  {
    id: "sale-1",
    invoiceNumber: "SO-8924",
    customerId: "cust-1",
    customerName: "NexGen Data Systems Ltd",
    items: [
      { productId: "prod-1", productName: 'Dell UltraSharp 27" 4K Monitor', sku: "SKU-MON-001", quantity: 16, unitPrice: 42500, lineTotal: 680000 },
    ],
    subtotal: 680000,
    total: 680000,
    status: "completed",
    createdAt: "2024-10-24T14:32:00Z",
    completedAt: "2024-10-24T14:35:00Z",
  },
  {
    id: "sale-2",
    invoiceNumber: "SO-8921",
    customerId: "cust-4",
    customerName: "VoltCraft Switchgears Pvt",
    items: [
      { productId: "prod-5", productName: "Havells Crabtree 6A 1-Way Switch", sku: "SKU-SWT-015", quantity: 1500, unitPrice: 85, lineTotal: 127500 },
      { productId: "prod-2", productName: "Polycab 2.5sq mm Copper Wire", sku: "SKU-WIR-042", quantity: 42, unitPrice: 2850, lineTotal: 119700 },
    ],
    subtotal: 247200,
    total: 247200,
    status: "completed",
    createdAt: "2024-10-23T15:50:00Z",
    completedAt: "2024-10-23T15:55:00Z",
  },
  {
    id: "sale-3",
    invoiceNumber: "SO-8925",
    customerId: "cust-2",
    customerName: "SmartGrid Infra Solutions",
    items: [
      { productId: "prod-4", productName: "Syska 18W Square LED Downlight", sku: "SKU-LED-220", quantity: 40, unitPrice: 480, lineTotal: 19200 },
    ],
    subtotal: 19200,
    total: 19200,
    status: "draft",
    createdAt: "2024-10-24T16:10:00Z",
  },
];

export const INITIAL_PURCHASES: Purchase[] = [
  {
    id: "po-1",
    purchaseOrderNumber: "PO-4098",
    supplierId: "supp-3",
    supplierName: "Polycab Wires & Cables Ltd",
    items: [
      { productId: "prod-2", productName: "Polycab 2.5sq mm Copper Wire", sku: "SKU-WIR-042", quantity: 120, unitPrice: 2100, lineTotal: 252000 },
    ],
    subtotal: 252000,
    total: 294000,
    status: "received",
    createdAt: "2024-10-24T10:00:00Z",
    receivedAt: "2024-10-24T12:15:00Z",
  },
  {
    id: "po-2",
    purchaseOrderNumber: "PO-4091",
    supplierId: "supp-1",
    supplierName: "Foxconn Electronics India",
    items: [
      { productId: "prod-6", productName: "Foxconn Cat6 UTP High-Speed Cable", sku: "SKU-NET-089", quantity: 15, unitPrice: 2400, lineTotal: 36000 },
    ],
    subtotal: 36000,
    total: 36000,
    status: "pending",
    createdAt: "2024-10-22T09:12:00Z",
  },
  {
    id: "po-3",
    purchaseOrderNumber: "PO-4082",
    supplierId: "supp-4",
    supplierName: "Schneider Electric India",
    items: [
      { productId: "prod-3", productName: "Schneider Acti9 32A Double Pole MCB", sku: "SKU-MCB-108", quantity: 50, unitPrice: 890, lineTotal: 44500 },
    ],
    subtotal: 44500,
    total: 44500,
    status: "pending",
    createdAt: "2024-10-23T11:00:00Z",
  },
];
