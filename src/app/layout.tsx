import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/shared/components/layout/sidebar";
import { Topbar } from "@/shared/components/layout/topbar";

export const metadata: Metadata = {
  title: "SIMWA StockFlow — Inventory Management System",
  description: "Modern real-time B2B inventory, sales, and purchase management platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-surface font-sans text-on-surface antialiased">
        <Sidebar />
        <div className="pl-64 flex flex-col min-h-screen">
          <Topbar />
          <main className="w-full pt-16 bg-surface flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
