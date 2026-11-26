import type { Product, Sale, Purchase, StockMovement } from "@/shared/types/domain";

/**
 * Domain Service functions containing inventory business rules
 */

export function executeSaleCompletion(
  products: Product[],
  sale: Sale
): { success: boolean; error?: string; updatedProducts: Product[]; newMovements: StockMovement[] } {
  // Idempotency check: already completed sales must not deduct stock again
  if (sale.status === "completed") {
    return { success: false, error: "Sale is already completed.", updatedProducts: products, newMovements: [] };
  }

  // Pre-validate stock availability for all line items before changing state
  for (const item of sale.items) {
    const prod = products.find((p) => p.id === item.productId);
    if (!prod) return { success: false, error: `Product not found: ${item.productName}`, updatedProducts: products, newMovements: [] };
    if (prod.quantity < item.quantity) {
      return {
        success: false,
        error: `Insufficient stock for ${prod.name}. Available: ${prod.quantity}, Requested: ${item.quantity}`,
        updatedProducts: products,
        newMovements: [],
      };
    }
  }

  // Deduct stock and generate stock movement audit entries
  const newMovements: StockMovement[] = [];
  const updatedProducts = products.map((prod) => {
    const item = sale.items.find((i) => i.productId === prod.id);
    if (!item) return prod;

    const previousQty = prod.quantity;
    const newQty = previousQty - item.quantity;

    newMovements.push({
      id: "mov-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      productId: prod.id,
      productName: prod.name,
      type: "sale",
      quantityChange: -item.quantity,
      previousQuantity: previousQty,
      newQuantity: newQty,
      referenceId: sale.invoiceNumber,
      reason: `Sale fulfillment to ${sale.customerName}`,
      createdAt: new Date().toISOString(),
    });

    return { ...prod, quantity: newQty, updatedAt: new Date().toISOString() };
  });

  return { success: true, updatedProducts, newMovements };
}

export function executePurchaseReceipt(
  products: Product[],
  purchase: Purchase
): { success: boolean; error?: string; updatedProducts: Product[]; newMovements: StockMovement[] } {
  // Idempotency: receiving a purchase must not add stock twice
  if (purchase.status === "received") {
    return { success: false, error: "Purchase order is already received.", updatedProducts: products, newMovements: [] };
  }

  const newMovements: StockMovement[] = [];
  const updatedProducts = products.map((prod) => {
    const item = purchase.items.find((i) => i.productId === prod.id);
    if (!item) return prod;

    const previousQty = prod.quantity;
    const newQty = previousQty + item.quantity;

    newMovements.push({
      id: "mov-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      productId: prod.id,
      productName: prod.name,
      type: "purchase",
      quantityChange: item.quantity,
      previousQuantity: previousQty,
      newQuantity: newQty,
      referenceId: purchase.purchaseOrderNumber,
      reason: `Goods received from ${purchase.supplierName}`,
      createdAt: new Date().toISOString(),
    });

    return { ...prod, quantity: newQty, updatedAt: new Date().toISOString() };
  });

  return { success: true, updatedProducts, newMovements };
}

export function executeStockAdjustment(
  products: Product[],
  productId: string,
  quantityChange: number,
  reason: string
): { success: boolean; error?: string; updatedProducts: Product[]; newMovement?: StockMovement } {
  const prod = products.find((p) => p.id === productId);
  if (!prod) return { success: false, error: "Product not found.", updatedProducts: products };

  const previousQty = prod.quantity;
  const newQty = previousQty + quantityChange;

  // Invariant: never permit negative stock
  if (newQty < 0) {
    return { success: false, error: `Adjustment would cause negative inventory (${newQty}). Current: ${previousQty}`, updatedProducts: products };
  }

  const newMovement: StockMovement = {
    id: "mov-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
    productId: prod.id,
    productName: prod.name,
    type: "adjustment",
    quantityChange,
    previousQuantity: previousQty,
    newQuantity: newQty,
    referenceId: "ADJ-" + Math.floor(1000 + Math.random() * 9000),
    reason,
    createdAt: new Date().toISOString(),
  };

  const updatedProducts = products.map((p) =>
    p.id === productId ? { ...p, quantity: newQty, updatedAt: new Date().toISOString() } : p
  );

  return { success: true, updatedProducts, newMovement };
}
