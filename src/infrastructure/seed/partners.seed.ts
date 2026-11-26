import type { Customer, Supplier } from "@/shared/types/domain";

/**
 * Initial partner directory seed data
 */
export const INITIAL_CUSTOMERS: Customer[] = [
  { id: "cust-1", name: "NexGen Data Systems Ltd", email: "procure@nexgen.in", phone: "+91 98201 44211", city: "Mumbai" },
  { id: "cust-2", name: "SmartGrid Infra Solutions", email: "ops@smartgrid.co", phone: "+91 98112 88410", city: "Bengaluru" },
  { id: "cust-3", name: "Apex MEP Contractors", email: "accounts@apexcontractors.com", phone: "+91 94451 90214", city: "Chennai" },
  { id: "cust-4", name: "VoltCraft Switchgears Pvt", email: "billing@voltcraft.co", phone: "+91 98402 11984", city: "Hyderabad" },
  { id: "cust-5", name: "Lumina Lighting Corp", email: "supply@luminalight.in", phone: "+91 97110 34219", city: "Delhi NCR" },
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  { id: "supp-1", name: "Foxconn Electronics India", email: "sales@foxconn.co.in", phone: "+91 44 2715 8000", city: "Sriperumbudur" },
  { id: "supp-2", name: "Dell Global Logistics", email: "enterprise-support@dell.com", phone: "+91 80 2506 8000", city: "Bengaluru" },
  { id: "supp-3", name: "Polycab Wires & Cables Ltd", email: "commercial@polycab.com", phone: "+91 22 2410 7000", city: "Mumbai" },
  { id: "supp-4", name: "Schneider Electric India", email: "orders@se.com", phone: "+91 124 489 8000", city: "Gurugram" },
  { id: "supp-5", name: "Havells India Ltd", email: "b2b@havells.com", phone: "+91 120 477 1000", city: "Noida" },
];
