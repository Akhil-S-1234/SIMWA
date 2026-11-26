"use client";

import { useEffect, useState } from "react";
import { useInventoryStore } from "./inventory.store";

/**
 * Hook to avoid hydration mismatch when reading persisted Zustand state
 */
export function useHydratedStore<T>(
  selector: (state: ReturnType<typeof useInventoryStore.getState>) => T,
  fallback: T
): T {
  const result = useInventoryStore(selector);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? result : fallback;
}
