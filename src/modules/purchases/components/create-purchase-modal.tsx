"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { useInventoryStore } from "@/store/inventory.store";
import { Modal } from "@/shared/components/ui/modal";

interface CreatePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * CreatePurchaseModal - Creates a purchase order commitment to a supplier/vendor.
 */
export function CreatePurchaseModal({ isOpen, onClose }: CreatePurchaseModalProps) {
  const { suppliers, products, createPurchase } = useInventoryStore();

  const [supplierId, setSupplierId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [unitCost, setUnitCost] = useState(100);
  const [error, setError] = useState<string | null>(null);

  const selectedSupplier = suppliers.find((s) => s.id === supplierId);
  const selectedProduct = products.find((p) => p.id === productId);

  const handleProductChange = (id: string) => {
    setProductId(id);
    const prod = products.find((p) => p.id === id);
    if (prod) setUnitCost(prod.unitCost);
  };

  const total = quantity * unitCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!supplierId) return setError("Please select a vendor / supplier.");
    if (!productId || !selectedProduct) return setError("Please select a product.");
    if (quantity <= 0) return setError("Quantity must be greater than zero.");

    createPurchase({
      purchaseOrderNumber: `PO-${Math.floor(4000 + Math.random() * 1000)}`,
      supplierId,
      supplierName: selectedSupplier?.name || "Supplier",
      items: [
        {
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          sku: selectedProduct.sku,
          quantity,
          unitPrice: unitCost,
          lineTotal: total,
        },
      ],
      subtotal: total,
      total,
      status: "pending",
    });

    onClose();
  };

  const footer = (
    <>
      <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-xs font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">
        Cancel
      </button>
      <button type="submit" className="px-4 py-2 rounded-lg text-xs font-semibold bg-secondary text-white hover:bg-secondary/90 shadow-xs transition-colors">
        Issue Purchase Order
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Purchase Order (PO)"
      subtitle="Reorder stock from authorized vendor / supplier"
      onSubmit={handleSubmit}
      footer={footer}
    >
      {error && (
        <div className="p-3 rounded-lg bg-error-container text-on-error-container text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="font-medium text-on-surface block mb-1">Vendor / Supplier</label>
        <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-secondary text-on-surface text-xs">
          <option value="">Select supplier...</option>
          {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.city})</option>)}
        </select>
      </div>

      <div>
        <label className="font-medium text-on-surface block mb-1">Target Product</label>
        <select value={productId} onChange={(e) => handleProductChange(e.target.value)} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-secondary text-on-surface text-xs">
          <option value="">Select product...</option>
          {products.map((p) => <option key={p.id} value={p.id}>{p.name} (SKU: {p.sku})</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="font-medium text-on-surface block mb-1">Quantity to Inbound</label>
          <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-secondary text-on-surface text-xs" />
        </div>
        <div>
          <label className="font-medium text-on-surface block mb-1">Agreed Unit Cost (₹)</label>
          <input type="number" min={1} value={unitCost} onChange={(e) => setUnitCost(Math.max(1, parseInt(e.target.value) || 1))} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-secondary text-on-surface text-xs" />
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-surface-container-low/80 border border-outline-variant/30 flex justify-between items-center text-xs">
        <span className="font-medium text-on-surface-variant">PO Total Commitment:</span>
        <span className="font-bold font-mono text-base text-secondary">₹{total.toLocaleString()}</span>
      </div>
    </Modal>
  );
}
