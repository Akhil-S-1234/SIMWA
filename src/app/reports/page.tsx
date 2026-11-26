"use client";

import { useState } from "react";
import { ReportsHeader } from "@/modules/reports/components/reports-header";
import { ReportsKpiDeck } from "@/modules/reports/components/reports-kpi-deck";
import { ReportsSalesTrendCard } from "@/modules/reports/components/reports-sales-trend-card";
import { ReportsProcurementFlowCard } from "@/modules/reports/components/reports-procurement-flow-card";
import { ReportsStockDistributionCard } from "@/modules/reports/components/reports-stock-distribution-card";
import { ReportsLedgerCard } from "@/modules/reports/components/reports-ledger-card";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6 max-w-[1680px] mx-auto w-full">
      <ReportsHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {/* KPI Deck */}
      <ReportsKpiDeck />

      {/* Dynamic Deep-Dive View based on activeTab */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch animate-in fade-in duration-200">
          <div className="lg:col-span-7">
            <ReportsSalesTrendCard />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-5">
            <ReportsProcurementFlowCard />
            <ReportsStockDistributionCard />
          </div>
        </div>
      )}

      {activeTab === "Sales Analytics" && (
        <div className="w-full animate-in fade-in duration-200">
          <ReportsSalesTrendCard />
        </div>
      )}

      {activeTab === "Procurement Log" && (
        <div className="w-full animate-in fade-in duration-200">
          <ReportsProcurementFlowCard />
        </div>
      )}

      {activeTab === "Stock Health" && (
        <div className="w-full animate-in fade-in duration-200">
          <ReportsStockDistributionCard />
        </div>
      )}

      {/* Consolidated Ledger */}
      <ReportsLedgerCard />
    </div>
  );
}
