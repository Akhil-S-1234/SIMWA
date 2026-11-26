"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  shortcut?: string;
}

/**
 * Reusable search bar component with smooth focus transition and shortcut badge.
 */
export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  shortcut = "⌘K",
}: SearchInputProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="w-4 h-4 absolute left-3 text-outline pointer-events-none transition-colors duration-200" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 pl-9 pr-14 bg-surface-container-low rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 border border-outline-variant/30 shadow-2xs"
      />
      {shortcut && (
        <kbd className="absolute right-2 px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[10px] font-mono shadow-xs pointer-events-none border border-outline-variant/20">
          {shortcut}
        </kbd>
      )}
    </div>
  );
}
