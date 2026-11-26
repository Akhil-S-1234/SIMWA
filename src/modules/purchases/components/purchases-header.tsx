"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { CreatePurchaseModal } from "./create-purchase-modal";

export function PurchasesHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "p" || e.key === "P") && !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <section className="bg-surface-container-lowest p-5 md:p-6 rounded-xl shadow-sm border border-outline-variant/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <h1 className="font-heading text-2xl font-semibold text-on-surface tracking-tight">Purchases</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-tertiary-fixed text-on-tertiary-fixed tracking-wide shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-tertiary-container animate-pulse" />
                Vendor Inbound Sync
              </span>
            </div>
            <p className="text-sm text-on-surface-variant mt-0.5">Manage purchase orders, suppliers, and incoming stock.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary-container text-white text-xs font-semibold hover:bg-primary transition-all shadow-sm active:scale-[0.98]">
              <Plus className="w-4 h-4" />
              <span>Create Purchase</span>
              <kbd className="ml-1 px-1.5 py-0.5 rounded bg-white/20 text-white font-mono text-[10px]">P</kbd>
            </button>
          </div>
        </div>
      </section>

      <CreatePurchaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
