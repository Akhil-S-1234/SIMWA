/**
 * Pure client-side CSV export utility.
 * Converts an array of objects into a formatted CSV and triggers a browser download.
 */
export function exportToCsv<T extends Record<string, unknown>>(
  filename: string,
  rows: T[]
): void {
  if (!rows || rows.length === 0) return;

  const separator = ",";
  const keys = Object.keys(rows[0]);

  const csvContent =
    keys.join(separator) +
    "\n" +
    rows
      .map((row) =>
        keys
          .map((k) => {
            const raw = row[k];
            let cell = raw === null || raw === undefined ? "" : String(raw);
            cell = cell.replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          })
          .join(separator)
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
