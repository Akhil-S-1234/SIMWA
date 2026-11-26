"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { CreateSaleModal } from "./create-sale-modal";

export function SalesHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "n" || e.key === "N") && !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="font-heading text-2xl font-semibold text-on-surface tracking-tight">Sales</h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-primary text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-pulse" />
              <span>Live Billing Sync</span>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant">Manage sales orders and track customer transactions.</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button type="button" onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-primary hover:bg-secondary text-white transition-all shadow-sm text-xs font-semibold group active:scale-[0.98]">
            <Plus className="w-4 h-4" />
            <span>Create New Sale</span>
            <kbd className="ml-1 px-1.5 py-0.5 rounded bg-primary-container text-white text-[10px] font-mono group-hover:bg-primary transition-colors">N</kbd>
          </button>
        </div>
      </div>

      <CreateSaleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
