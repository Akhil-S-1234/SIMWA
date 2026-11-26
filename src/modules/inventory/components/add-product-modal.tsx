"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { useInventoryStore } from "@/store/inventory.store";
import { Modal } from "@/shared/components/ui/modal";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * AddProductModal - Registers a new SKU item into the catalog.
 * Configures unit cost, selling price, initial quantity, and minimum buffer threshold.
 */
export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const { addProduct } = useInventoryStore();

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("Displays");
  const [sellingPrice, setSellingPrice] = useState(1000);
  const [unitCost, setUnitCost] = useState(700);
  const [quantity, setQuantity] = useState(20);
  const [bufferMin, setBufferMin] = useState(10);
  const [barcode, setBarcode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("Product name is required.");
    if (!sku.trim()) return setError("SKU code is required.");
    if (sellingPrice <= 0 || unitCost <= 0) return setError("Prices must be greater than zero.");
    if (quantity < 0) return setError("Initial quantity cannot be negative.");

    addProduct({
      name: name.trim(),
      sku: sku.trim().toUpperCase(),
      category,
      sellingPrice,
      unitCost,
      quantity,
      minimumStockLevel: bufferMin,
      barcode: barcode.trim() || String(Math.floor(890000000000 + Math.random() * 99999999)),
      variant: "Standard Hub Variant",
    });

    onClose();
  };

  const footer = (
    <>
      <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-xs font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">
        Cancel
      </button>
      <button type="submit" className="px-4 py-2 rounded-lg text-xs font-semibold bg-primary-container text-white hover:bg-primary shadow-xs transition-colors">
        Save to Catalog
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Catalog Product"
      subtitle="Register SKU, stock parameters, and pricing"
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
        <label className="font-medium text-on-surface block mb-1">Product Title</label>
        <input type="text" placeholder="e.g. Cisco Catalyst 24-Port Switch" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary/20 text-on-surface text-xs" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="font-medium text-on-surface block mb-1">SKU Number</label>
          <input type="text" placeholder="SKU-CAT-024" value={sku} onChange={(e) => setSku(e.target.value)} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary/20 text-on-surface text-xs uppercase" />
        </div>
        <div>
          <label className="font-medium text-on-surface block mb-1">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary/20 text-on-surface text-xs">
            <option value="Displays">Displays</option>
            <option value="Electrical Supplies">Electrical Supplies</option>
            <option value="Switchgear & Controls">Switchgear & Controls</option>
            <option value="Lighting & Fixtures">Lighting & Fixtures</option>
            <option value="IT & Electronics">IT & Electronics</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="font-medium text-on-surface block mb-1">Selling Price (₹)</label>
          <input type="number" min={1} value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary/20 text-on-surface text-xs" />
        </div>
        <div>
          <label className="font-medium text-on-surface block mb-1">Unit Cost (₹)</label>
          <input type="number" min={1} value={unitCost} onChange={(e) => setUnitCost(Number(e.target.value))} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary/20 text-on-surface text-xs" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="font-medium text-on-surface block mb-1">Initial In-Stock Units</label>
          <input type="number" min={0} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary/20 text-on-surface text-xs" />
        </div>
        <div>
          <label className="font-medium text-on-surface block mb-1">Buffer Minimum Threshold</label>
          <input type="number" min={1} value={bufferMin} onChange={(e) => setBufferMin(Number(e.target.value))} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary/20 text-on-surface text-xs" />
        </div>
      </div>

      <div>
        <label className="font-medium text-on-surface block mb-1">Barcode / EAN (Optional)</label>
        <input type="text" placeholder="e.g. 884116392453" value={barcode} onChange={(e) => setBarcode(e.target.value)} className="w-full h-9 rounded-lg bg-white px-3 outline-none border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary/20 text-on-surface text-xs" />
      </div>
    </Modal>
  );
}
