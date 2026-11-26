"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, AlertCircle, HelpCircle, CheckCircle2, X } from "lucide-react";

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "primary" | "secondary";
  icon?: React.ReactNode;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary",
  icon,
}: ConfirmationModalProps) {
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

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          iconBg: "bg-error-container text-error",
          defaultIcon: <AlertTriangle className="w-5 h-5" />,
          btn: "bg-error text-white hover:bg-error/90",
        };
      case "warning":
        return {
          iconBg: "bg-amber-100 text-amber-700",
          defaultIcon: <AlertCircle className="w-5 h-5" />,
          btn: "bg-amber-600 text-white hover:bg-amber-700",
        };
      case "secondary":
        return {
          iconBg: "bg-secondary/10 text-secondary",
          defaultIcon: <CheckCircle2 className="w-5 h-5" />,
          btn: "bg-secondary text-white hover:bg-secondary/90",
        };
      case "primary":
      default:
        return {
          iconBg: "bg-primary-container/15 text-primary",
          defaultIcon: <HelpCircle className="w-5 h-5" />,
          btn: "bg-primary-container text-white hover:bg-primary",
        };
    }
  };

  const v = getVariantStyles();

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Full-screen backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Card */}
      <div
        className="relative z-10 bg-surface-container-lowest rounded-2xl max-w-sm w-full shadow-2xl border border-outline-variant/30 flex flex-col p-6 animate-in zoom-in-95 slide-in-from-bottom-2 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${v.iconBg}`}>
            {icon || v.defaultIcon}
          </div>
          <div className="flex flex-col gap-1 pr-3">
            <h3 className="font-heading text-sm font-semibold text-on-surface leading-snug">
              {title}
            </h3>
            <div className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
              {message}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 mt-5 pt-3.5 border-t border-outline-variant/20">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors ${v.btn}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
