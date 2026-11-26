# SIMWA StockFlow — B2B Inventory Management System

A modern, modular real-time B2B inventory, sales, and purchase management platform built for the **SasthaSoft Freelance Full Stack Developer Assessment**.

---

## 🚀 Key Highlights & Architecture

- **Next.js 15 App Router & React 19:** Clean domain-driven modular structure (`dashboard`, `sales`, `purchases`, `inventory`, `reports`).
- **Strict Invariant Guarantee:** **Every single `.ts` / `.tsx` file in `src/` is $\le$ 150 lines of code (LOC)**. Zero exceptions.
- **Client-Side Persistence:** Powered by Zustand `persist` with `localStorage`, providing reactive state without external database setup.
- **Strict Business Invariants:**
  - **Negative Stock Guard:** Prevents sales or adjustments that would reduce inventory below zero.
  - **Idempotency:** Completing a sale or receiving a PO cannot be triggered more than once, preventing duplicate stock mutations.
  - **Audit Ledger:** Every inventory alteration generates an immutable directional `StockMovement` audit record.
  - **Factory Reset:** Built-in "Reset Demo" action in the Topbar and Settings page to restore initial seed data anytime.
- **Enterprise Modal & Popover Architecture:**
  - **React Portal Modals:** Modals mount to `document.body` via `createPortal`, perfectly centered in the viewport with full-screen dimmed backdrops, body scroll locking, and sticky action footers.
  - **Reusable Confirmation Dialogs:** Custom semantic dialogs (`danger`, `secondary`, `primary`) for critical actions (Demo Reset, Inbound Receipt, Cancellation).
  - **Custom Filter Popovers:** Replaced raw OS native select boxes with styled MD3 popovers featuring active checkmarks and dynamic category detection.
  - **Client-Side CSV Export:** One-click `.csv` downloads across all 4 data tables.
  - **Smooth Route Transitions:** Page transitions powered by App Router `template.tsx`.

---

## 📦 Tech Stack

- **Framework:** Next.js 15.5.29 (App Router)
- **Language:** TypeScript 5.7 (Strict Mode, 0 errors)
- **Styling:** Tailwind CSS 3.4 with Material Design 3 (M3) semantic tokens
- **State Management:** Zustand 5.0 with `persist` middleware
- **Icons:** Lucide React

---

## 🛠️ Modules & Features

| Module | Route | Key Capabilities |
| :--- | :--- | :--- |
| **Dashboard** | `/dashboard` | Executive KPI deck, low-stock alerts list, sales overview chart, recent dock activity feed |
| **Sales** | `/sales` | Order registry table, create new sale modal (`N`), real-time stock check, instant stock deduction, CSV export |
| **Purchases** | `/purchases` | Vendor PO registry, create purchase modal (`P`), "Receive Goods" stock increment confirmation, CSV export |
| **Inventory** | `/inventory` | Master SKU catalog, Add Product modal, manual stock adjustment modal with audit reasons, dynamic category filter, CSV export |
| **Reports** | `/reports` | Throughput KPIs, revenue/margin charts, weekly PO cadence chart, consolidated FIFO audit ledger, CSV export |
| **Settings** | `/settings` | Hub configuration profile, business rules status, one-click factory reset |

---

## 💻 Local Setup & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Verify TypeScript compilation:**
   ```bash
   npx tsc --noEmit
   ```

4. **Verify production build:**
   ```bash
   npm run build
   ```

---

## 🧪 Testing Workflows in the UI

1. **Test Sale & Stock Deduction:**  
   Navigate to `/sales` $\to$ click **"Create New Sale"** $\to$ select customer & product $\to$ click **"Complete & Deduct Stock"** $\to$ observe stock immediately decrease in `/inventory` and an audit entry appear in the Ledger.
2. **Test Purchase Inbound & Stock Increment:**  
   Navigate to `/purchases` $\to$ click **"Receive Goods"** on a pending PO $\to$ confirm in the dialog $\to$ observe inventory stock increase in `/inventory`.
3. **Test Stock Adjustment Guard:**  
   Navigate to `/inventory` $\to$ click **"Adjust"** on any SKU $\to$ adjust stock with an audit reason (system prevents negative inventory).
4. **Test Filter Popovers & Dynamic Categories:**  
   In `/inventory`, open the **CATEGORY** filter $\to$ observe custom MD3 popover with checkmarks dynamically matching active products.
5. **Test CSV Export:**  
   Click **"Export CSV"** on any table to download a real `.csv` file.
6. **Test Reset Demo State:**  
   Click **"Reset Demo"** in the top navigation bar at any point $\to$ confirm in the prompt to restore factory seed data.
