import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  sku: z.string().min(3, "SKU must be at least 3 characters").toUpperCase(),
  category: z.string().min(2, "Category is required"),
  quantity: z.number().int().nonnegative("Initial quantity cannot be negative"),
  minimumStockLevel: z.number().int().positive("Minimum buffer must be at least 1"),
  unitCost: z.number().positive("Unit cost must be greater than 0"),
  sellingPrice: z.number().positive("Selling price must be greater than 0"),
  barcode: z.string().optional().default(""),
  variant: z.string().optional().default("Standard"),
});

export const saleOrderSchema = z.object({
  customerId: z.string().min(1, "Please select a customer"),
  productId: z.string().min(1, "Please select a product"),
  quantity: z.number().int().positive("Quantity must be at least 1"),
});

export const purchaseOrderSchema = z.object({
  supplierId: z.string().min(1, "Please select a supplier"),
  productId: z.string().min(1, "Please select a product"),
  quantity: z.number().int().positive("Quantity must be at least 1"),
  unitCost: z.number().positive("Unit cost must be positive"),
});

export const stockAdjustmentSchema = z.object({
  productId: z.string().min(1, "Select a product"),
  delta: z.number().int().refine((n) => n !== 0, "Adjustment cannot be 0"),
  reason: z.string().min(3, "Please provide an adjustment reason"),
});
