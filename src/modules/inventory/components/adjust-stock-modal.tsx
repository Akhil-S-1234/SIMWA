"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { useInventoryStore } from "@/store/inventory.store";
import { Modal } from "@/shared/components/ui/modal";

interface AdjustStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProductId?: string;
}

/**
 * AdjustStockModal - Reconciles physical count variance with the inventory ledger.
 * Validates against negative stock and appends audit movement records.
 */
export function AdjustStockModal({ isOpen, onClose, defaultProductId }: AdjustStockModalProps) {
  const { products, adjustStock } = useInventoryStore();

  const [productId, setProductId] = useState(defaultProductId || products[0]?.id || "");
  const [direction, setDirection] = useState<"add" | "deduct">("add");
  const [quantity, setQuantity] = useState(5);
  const [reason, setReason] = useState("Cycle Count Reconciliation");
  const [error, setError] = useState<string | null>(null);

  const selectedProduct = products.find((p) => p.id === productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!productId || !selectedProduct) return setError("Please select a product.");
    if (quantity <= 0) return setError("Quantity must be greater than zero.");

    const delta = direction === "add" ? quantity : -quantity;
    const res = adjustStock(productId, delta, reason);

    if (!res.success) {
      setError(res.error || "Failed to adjust inventory.");
      return;
    }

    onClose();
  };

  const footer = (
    <>
      <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-xs font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">
        Cancel
      </button>
      <button type="submit" className="px-4 py-2 rounded-lg text-xs font-semibold bg-primary-container text-white hover:bg-primary shadow-xs transition-colors">
        Confirm Adjustment
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Manual Stock Adjustment"
      subtitle="Reconcile physical stock with inventory ledger"
      maxWidth="max-w-md"
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
        <label className="font-medium text-on-surface block mb-1">Target Product</label>
        <select value={productId} onChange={(e) => setProductId(e.target.value)} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-primary text-on-surface text-xs">
          {products.map((p) => <option key={p.id} value={p.id}>{p.name} (Current: {p.quantity})</option>)}
        </select>
      </div>

      {selectedProduct && (
        <div className="p-3 rounded-lg bg-surface-container-low/60 border border-outline-variant/20 flex justify-between text-xs">
          <span className="text-on-surface-variant">Current In-Stock:</span>
          <span className="font-bold font-mono text-on-surface">{selectedProduct.quantity} units</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="font-medium text-on-surface block mb-1">Adjustment Action</label>
          <select value={direction} onChange={(e) => setDirection(e.target.value as "add" | "deduct")} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-primary text-on-surface text-xs font-medium">
            <option value="add">+ Add Stock (Inbound)</option>
            <option value="deduct">- Deduct Stock (Loss/Damage)</option>
          </select>
        </div>
        <div>
          <label className="font-medium text-on-surface block mb-1">Units Quantity</label>
          <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-primary text-on-surface text-xs" />
        </div>
      </div>

      <div>
        <label className="font-medium text-on-surface block mb-1">Audit Reason</label>
        <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-primary text-on-surface text-xs mb-2">
          <option value="Cycle Count Reconciliation">Cycle Count Reconciliation</option>
          <option value="Damaged / Broken in Transit">Damaged / Broken in Transit</option>
          <option value="Internal Demo & Testing">Internal Demo & Testing</option>
          <option value="Inbound Dock QC Discrepancy">Inbound Dock QC Discrepancy</option>
        </select>
        <input type="text" placeholder="Or enter custom audit note..." onChange={(e) => e.target.value && setReason(e.target.value)} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-primary text-on-surface text-xs" />
      </div>
    </Modal>
  );
}
