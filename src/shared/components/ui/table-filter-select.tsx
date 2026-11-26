"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface FilterOption {
  label: string;
  value: string;
}

interface TableFilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  className?: string;
}

/**
 * Standardized custom dropdown filter matching the Material Design 3 theme.
 * Replaces raw OS native select boxes with styled rounded menus.
 */
export function TableFilterSelect({
  label,
  value,
  onChange,
  options,
  className = "",
}: TableFilterSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const activeOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`h-8 inline-flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1.5 rounded-lg text-xs border transition-all duration-200 select-none ${
          isOpen
            ? "border-primary bg-surface-container shadow-xs ring-2 ring-primary/20"
            : "border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container text-on-surface"
        }`}
      >
        <span className="text-on-surface-variant text-[10px] uppercase font-semibold tracking-wider">
          {label}:
        </span>
        <span className="font-medium text-on-surface truncate max-w-[130px]">
          {activeOption?.label || label}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-outline transition-transform duration-200 ml-0.5 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Custom Styled Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 z-50 min-w-[200px] max-h-64 overflow-y-auto bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 p-1.5 flex flex-col gap-0.5 animate-in fade-in-0 zoom-in-95 duration-150">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-left transition-colors ${
                  isSelected
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-on-surface hover:bg-surface-container-low hover:text-on-surface font-medium"
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
