import Link from "next/link";
import { Receipt, Truck, PlusCircle, ArrowRight } from "lucide-react";

const ACTIONS = [
  {
    title: "Create New Sale",
    description: "Dispatch, invoice & ledger sync",
    href: "/sales",
    icon: Receipt,
    iconColor: "text-primary",
    hoverIconBg: "group-hover:bg-primary",
    hoverText: "group-hover:text-primary",
  },
  {
    title: "Create Purchase Order",
    description: "Restock inventory from vendor",
    href: "/purchases",
    icon: Truck,
    iconColor: "text-secondary",
    hoverIconBg: "group-hover:bg-secondary",
    hoverText: "group-hover:text-secondary",
  },
  {
    title: "Add New Product",
    description: "Catalog SKU & barcode register",
    href: "/inventory",
    icon: PlusCircle,
    iconColor: "text-tertiary-container",
    hoverIconBg: "group-hover:bg-tertiary-container",
    hoverText: "group-hover:text-tertiary-container",
  },
];

export function QuickActions() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.title}
            href={action.href}
            className="group bg-surface-container-lowest p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-outline-variant/20 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center ${action.iconColor} ${action.hoverIconBg} group-hover:text-white transition-colors`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`font-heading text-sm font-semibold text-on-surface ${action.hoverText} transition-colors`}>
                  {action.title}
                </h3>
                <p className="text-xs text-on-surface-variant">{action.description}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-outline-variant group-hover:translate-x-1 group-hover:text-primary transition-all shrink-0" />
          </Link>
        );
      })}
    </section>
  );
}
