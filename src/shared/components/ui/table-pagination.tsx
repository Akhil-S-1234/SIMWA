"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  currentCount: number;
  totalCount: number;
  itemName?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function TablePagination({
  currentCount,
  totalCount,
  itemName = "records",
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: TablePaginationProps) {
  return (
    <div className="p-3.5 border-t border-outline-variant/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest text-xs text-on-surface-variant rounded-b-xl">
      <span>
        Showing <strong className="text-on-surface">{currentCount}</strong> of{" "}
        <strong className="text-on-surface">{totalCount}</strong> {itemName}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage <= 1}
          className="h-7 px-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low disabled:opacity-40 flex items-center gap-0.5 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Prev
        </button>
        <button
          type="button"
          className="h-7 w-7 rounded-lg bg-primary-container text-white font-semibold flex items-center justify-center text-xs shadow-xs"
        >
          {currentPage}
        </button>
        <button
          type="button"
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="h-7 px-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low disabled:opacity-40 flex items-center gap-0.5 transition-colors"
        >
          Next <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
