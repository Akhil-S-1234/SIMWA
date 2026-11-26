"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  onSubmit,
  maxWidth = "max-w-lg",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Full-screen backdrop covering sidebar, topbar, and viewport */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Window */}
      <div
        className={`relative z-10 bg-surface-container-lowest rounded-2xl ${maxWidth} w-full max-h-[88vh] shadow-2xl border border-outline-variant/30 flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-2 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20 shrink-0">
          <div>
            <h3 className="font-heading text-base font-semibold text-on-surface">{title}</h3>
            {subtitle && <p className="text-[11px] text-on-surface-variant/80 mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body + Footer */}
        <form onSubmit={onSubmit || ((e) => e.preventDefault())} className="flex flex-col flex-1 overflow-hidden">
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3.5 text-xs">
            {children}
          </div>

          {/* Fixed Bottom Action Bar */}
          {footer && (
            <div className="flex items-center justify-end gap-2.5 px-6 py-3.5 border-t border-outline-variant/20 bg-surface-container-low/30 shrink-0">
              {footer}
            </div>
          )}
        </form>
      </div>
    </div>,
    document.body
  );
}
