"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { useInventoryStore } from "@/store/inventory.store";
import { Modal } from "@/shared/components/ui/modal";

interface CreateSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * CreateSaleModal - Generates sales orders and optionally deducts inventory immediately upon fulfillment.
 */
export function CreateSaleModal({ isOpen, onClose }: CreateSaleModalProps) {
  const { customers, products, createSale, completeSale } = useInventoryStore();

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const selectedProduct = products.find((p) => p.id === productId);
  const selectedCustomer = customers.find((c) => c.id === customerId);
  const total = selectedProduct ? selectedProduct.sellingPrice * quantity : 0;
  const isOutOfStock = selectedProduct ? selectedProduct.quantity < quantity : false;

  const handleSubmit = (autoComplete: boolean) => {
    setError(null);
    if (!customerId) return setError("Please select a customer.");
    if (!productId || !selectedProduct) return setError("Please select a product.");
    if (quantity <= 0) return setError("Quantity must be greater than zero.");
    if (autoComplete && isOutOfStock) {
      return setError(`Insufficient inventory. Available: ${selectedProduct.quantity} units`);
    }

    const sale = createSale({
      invoiceNumber: `SO-${Math.floor(8000 + Math.random() * 2000)}`,
      customerId,
      customerName: selectedCustomer?.name || "Customer",
      items: [
        {
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          sku: selectedProduct.sku,
          quantity,
          unitPrice: selectedProduct.sellingPrice,
          lineTotal: total,
        },
      ],
      subtotal: total,
      total,
      status: "draft",
    });

    if (autoComplete) {
      const res = completeSale(sale.id);
      if (!res.success) {
        setError(res.error || "Failed to complete sale.");
        return;
      }
    }

    onClose();
  };

  const footer = (
    <>
      <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-xs font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">
        Cancel
      </button>
      <button type="button" onClick={() => handleSubmit(false)} className="px-4 py-2 rounded-lg text-xs font-medium bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors">
        Save Draft
      </button>
      <button type="button" onClick={() => handleSubmit(true)} disabled={isOutOfStock} className="px-4 py-2 rounded-lg text-xs font-semibold bg-primary-container text-white hover:bg-primary disabled:opacity-50 shadow-xs transition-colors">
        Complete & Deduct
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Sale Order"
      subtitle="Issue invoice and allocate warehouse inventory"
      footer={footer}
    >
      {error && (
        <div className="p-3 rounded-lg bg-error-container text-on-error-container text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="font-medium text-on-surface block mb-1">Customer</label>
        <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-primary text-on-surface text-xs">
          <option value="">Select customer...</option>
          {customers.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.city})</option>)}
        </select>
      </div>

      <div>
        <label className="font-medium text-on-surface block mb-1">Product</label>
        <select value={productId} onChange={(e) => setProductId(e.target.value)} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-primary text-on-surface text-xs">
          <option value="">Select product...</option>
          {products.map((p) => <option key={p.id} value={p.id}>{p.name} — Stock: {p.quantity} (₹{p.sellingPrice.toLocaleString()})</option>)}
        </select>
      </div>

      {selectedProduct && (
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low/60 border border-outline-variant/20 text-xs">
          <span className="text-on-surface-variant">Available Stock: <strong className={selectedProduct.quantity < selectedProduct.minimumStockLevel ? "text-error font-semibold" : "text-tertiary-container font-semibold"}>{selectedProduct.quantity} units</strong></span>
          <span className="text-on-surface-variant">Unit Price: <strong className="text-on-surface font-semibold">₹{selectedProduct.sellingPrice.toLocaleString()}</strong></span>
        </div>
      )}

      <div>
        <label className="font-medium text-on-surface block mb-1">Order Quantity</label>
        <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-primary text-on-surface text-xs" />
      </div>

      <div className="p-3.5 rounded-xl bg-surface-container-low/80 border border-outline-variant/30 flex justify-between items-center text-xs">
        <span className="font-medium text-on-surface-variant">Total Order Amount:</span>
        <span className="font-bold font-mono text-base text-primary">₹{total.toLocaleString()}</span>
      </div>
    </Modal>
  );
}
