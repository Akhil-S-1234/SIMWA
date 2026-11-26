"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product, Customer, Supplier, Sale, Purchase, StockMovement } from "@/shared/types/domain";
import { INITIAL_PRODUCTS } from "@/infrastructure/seed/products.seed";
import { INITIAL_CUSTOMERS, INITIAL_SUPPLIERS } from "@/infrastructure/seed/partners.seed";
import { INITIAL_SALES, INITIAL_PURCHASES, INITIAL_MOVEMENTS } from "@/infrastructure/seed/transactions.seed";
import { executeSaleCompletion, executePurchaseReceipt, executeStockAdjustment } from "@/infrastructure/services/inventory-service";

/**
 * State contract for the central inventory, partner, and transaction store.
 */
interface InventoryStoreState {
  products: Product[];
  customers: Customer[];
  suppliers: Supplier[];
  sales: Sale[];
  purchases: Purchase[];
  stockMovements: StockMovement[];
  isHydrated: boolean;
  setHydrated: (val: boolean) => void;
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  createSale: (sale: Omit<Sale, "id" | "createdAt">) => Sale;
  completeSale: (saleId: string) => { success: boolean; error?: string };
  cancelSale: (saleId: string) => void;
  createPurchase: (purchase: Omit<Purchase, "id" | "createdAt">) => Purchase;
  receivePurchase: (purchaseId: string) => { success: boolean; error?: string };
  adjustStock: (productId: string, quantityChange: number, reason: string) => { success: boolean; error?: string };
  resetDemoData: () => void;
}

/**
 * Central Zustand store with localStorage persistence and domain invariant enforcement.
 */
export const useInventoryStore = create<InventoryStoreState>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      customers: INITIAL_CUSTOMERS,
      suppliers: INITIAL_SUPPLIERS,
      sales: INITIAL_SALES,
      purchases: INITIAL_PURCHASES,
      stockMovements: INITIAL_MOVEMENTS,
      isHydrated: false,

      // Marks hydration state once localStorage is reconciled
      setHydrated: (isHydrated) => set({ isHydrated }),

      // Adds a new product SKU into the master catalog
      addProduct: (input) => {
        const newProduct: Product = { ...input, id: "prod-" + Date.now(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        set((state) => ({ products: [newProduct, ...state.products] }));
        return newProduct;
      },

      // Updates an existing catalog item
      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p),
        }));
      },

      // Issues a draft sales order
      createSale: (input) => {
        const newSale: Sale = { ...input, id: "sale-" + Date.now(), createdAt: new Date().toISOString() };
        set((state) => ({ sales: [newSale, ...state.sales] }));
        return newSale;
      },

      // Fulfills sale, decrements stock, and appends audit movement records
      completeSale: (saleId) => {
        const { products, sales, stockMovements } = get();
        const sale = sales.find((s) => s.id === saleId);
        if (!sale) return { success: false, error: "Sale not found" };

        const result = executeSaleCompletion(products, sale);
        if (!result.success) return { success: false, error: result.error };

        set({
          products: result.updatedProducts,
          stockMovements: [...result.newMovements, ...stockMovements],
          sales: sales.map((s) => s.id === saleId ? { ...s, status: "completed", completedAt: new Date().toISOString() } : s),
        });
        return { success: true };
      },

      // Cancels a draft sales order
      cancelSale: (saleId) => {
        const { sales } = get();
        set({ sales: sales.map((s) => (s.id === saleId ? { ...s, status: "cancelled" } : s)) });
      },

      // Creates a new purchase order for vendor replenishment
      createPurchase: (input) => {
        const newPo: Purchase = { ...input, id: "po-" + Date.now(), createdAt: new Date().toISOString() };
        set((state) => ({ purchases: [newPo, ...state.purchases] }));
        return newPo;
      },

      // Receives purchase order, increments inventory, and generates audit entry
      receivePurchase: (purchaseId) => {
        const { products, purchases, stockMovements } = get();
        const po = purchases.find((p) => p.id === purchaseId);
        if (!po) return { success: false, error: "Purchase order not found" };

        const result = executePurchaseReceipt(products, po);
        if (!result.success) return { success: false, error: result.error };

        set({
          products: result.updatedProducts,
          stockMovements: [...result.newMovements, ...stockMovements],
          purchases: purchases.map((p) => p.id === purchaseId ? { ...p, status: "received", receivedAt: new Date().toISOString() } : p),
        });
        return { success: true };
      },

      // Adjusts stock with reason logging and negative inventory guard
      adjustStock: (productId, delta, reason) => {
        const { products, stockMovements } = get();
        const result = executeStockAdjustment(products, productId, delta, reason);
        if (!result.success || !result.newMovement) return { success: false, error: result.error };

        set({
          products: result.updatedProducts,
          stockMovements: [result.newMovement, ...stockMovements],
        });
        return { success: true };
      },

      // Restores seed catalog, partners, orders, and ledger records
      resetDemoData: () => {
        set({
          products: INITIAL_PRODUCTS,
          customers: INITIAL_CUSTOMERS,
          suppliers: INITIAL_SUPPLIERS,
          sales: INITIAL_SALES,
          purchases: INITIAL_PURCHASES,
          stockMovements: INITIAL_MOVEMENTS,
        });
      },
    }),
    {
      name: "simwa_inventory_v1",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    }
  )
);
