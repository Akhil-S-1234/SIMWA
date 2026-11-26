"use client";

import { useState } from "react";
import { Moon, Bell, HelpCircle, ChevronDown, RotateCcw } from "lucide-react";
import { useInventoryStore } from "@/store/inventory.store";
import { ConfirmationModal } from "@/shared/components/ui/confirmation-modal";

/**
 * Topbar - Global layout header.
 * Displays real-time operational status, demo state resets, and user context.
 */
export function Topbar() {
  const { resetDemoData } = useInventoryStore();
  const [isResetOpen, setIsResetOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/20 z-40 px-6 flex items-center justify-between">
        {/* Real-time system telemetry indicator */}
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-tertiary-container animate-pulse" />
          <span className="text-xs font-medium text-on-surface-variant">Live Stock Telemetry Active</span>
        </div>

        {/* Global actions and user profile */}
        <div className="flex items-center gap-3">
          {/* Demo state reset action */}
          <button
            type="button"
            onClick={() => setIsResetOpen(true)}
            className="h-8 px-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 text-xs border border-outline-variant/30"
            title="Reset demo data to initial factory state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px] font-medium">Reset Demo</span>
          </button>

          {/* Utility buttons: Theme toggle, Notifications, Help */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
              title="Toggle Theme"
            >
              <Moon className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="relative p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
              title="Help & Documentation"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="h-5 w-px bg-outline-variant/30" />

          {/* Current operator profile badge */}
          <div className="flex items-center gap-2.5 pl-1 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-primary-container text-white text-xs font-semibold flex items-center justify-center ring-1 ring-outline-variant/30">
              VM
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs text-on-surface font-semibold leading-tight group-hover:text-primary transition-colors">
                Vikram Malhotra
              </span>
              <span className="text-[10px] text-on-surface-variant">Ops Lead</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-outline-variant group-hover:text-on-surface transition-colors" />
          </div>
        </div>
      </header>

      {/* Confirmation dialog before restoring factory state */}
      <ConfirmationModal
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onConfirm={resetDemoData}
        title="Reset Demo Data?"
        message="This will restore all products, orders, and ledger records to initial factory state. Any temporary changes will be lost."
        confirmText="Reset Demo Data"
        variant="danger"
      />
    </>
  );
}
