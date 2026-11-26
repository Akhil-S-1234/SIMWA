"use client";

import { usePathname } from "next/navigation";

/**
 * Route Transition Wrapper.
 * Provides smooth page-entry fade and subtle translation on navigation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out fill-mode-both"
    >
      {children}
    </div>
  );
}
