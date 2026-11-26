"use client";

import { useState } from "react";
import { Sliders, RotateCcw, ShieldCheck, Database, Warehouse, CheckCircle2 } from "lucide-react";
import { useInventoryStore } from "@/store/inventory.store";
import { ConfirmationModal } from "@/shared/components/ui/confirmation-modal";

export default function SettingsPage() {
  const { resetDemoData, products, sales, purchases, stockMovements } = useInventoryStore();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const handleConfirmReset = () => {
    resetDemoData();
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 4000);
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-[1200px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold text-on-surface tracking-tight">System Settings & Hub Config</h1>
        <p className="text-sm text-on-surface-variant">Manage distribution hub settings, business constraints, and demo data state.</p>
      </div>

      {resetSuccess && (
        <div className="p-4 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed text-xs font-medium flex items-center gap-2 border border-tertiary-fixed">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Demo state successfully restored to initial factory catalog, orders, and ledger records!</span>
        </div>
      )}

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hub Configuration */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-outline-variant/15">
            <Warehouse className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-base font-semibold text-on-surface">Distribution Hub Profile</h2>
          </div>
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex justify-between py-1 border-b border-outline-variant/10">
              <span className="text-outline">Active Hub:</span>
              <strong className="text-on-surface">Primary Fulfillment Center</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant/10">
              <span className="text-outline">Jurisdiction:</span>
              <span className="font-mono text-on-surface">Maharashtra (GST: 27AABCS9912Q1Z1)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant/10">
              <span className="text-outline">RFID Gateway Status:</span>
              <span className="text-tertiary-container font-semibold">Active & Synced</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-outline">Current Timezone:</span>
              <span className="font-mono text-on-surface">Asia/Kolkata (IST +05:30)</span>
            </div>
          </div>
        </div>

        {/* Business Invariant Guards */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-outline-variant/15">
            <ShieldCheck className="w-5 h-5 text-tertiary-container" />
            <h2 className="font-heading text-base font-semibold text-on-surface">Business Rules & Invariants</h2>
          </div>
          <div className="flex flex-col gap-2.5 text-xs">
            <div className="p-2.5 rounded bg-surface-container-low flex items-center justify-between">
              <div>
                <strong className="block text-on-surface">Negative Stock Guard</strong>
                <span className="text-[11px] text-on-surface-variant">Prevents manual or sales adjustments below zero</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold text-[10px]">ACTIVE</span>
            </div>
            <div className="p-2.5 rounded bg-surface-container-low flex items-center justify-between">
              <div>
                <strong className="block text-on-surface">Idempotent Execution</strong>
                <span className="text-[11px] text-on-surface-variant">Prevents double-deduction or double-receipt</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold text-[10px]">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Data Management Card */}
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold text-on-surface">Assessment State & Persistence</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Live records: <strong className="text-on-surface">{products.length}</strong> products • <strong className="text-on-surface">{sales.length}</strong> sales • <strong className="text-on-surface">{purchases.length}</strong> POs • <strong className="text-on-surface">{stockMovements.length}</strong> movements.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsResetOpen(true)}
          className="h-9 px-4 rounded-lg bg-surface-container-low text-on-surface hover:bg-error-container hover:text-error transition-all text-xs font-semibold flex items-center gap-2 border border-outline-variant/30 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data to Initial</span>
        </button>
      </div>

      <ConfirmationModal
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onConfirm={handleConfirmReset}
        title="Restore Factory State?"
        message="Are you sure you want to restore all demo data? Live catalog items, active sales, and purchase telemetry will be reset."
        confirmText="Restore Factory State"
        variant="danger"
      />
    </div>
  );
}
