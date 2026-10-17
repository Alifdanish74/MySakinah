// File: src/lib/pakej.ts
// Canonical pakej names stored in the admin DB (no "Setahun" suffix).

const YEARLY_PAKEJ_AMOUNTS = ["80", "120", "180", "240"] as const;

/**
 * Convert the on-screen pakej label (e.g. "PAKEJ RM 80.00 SETAHUN")
 * into the value persisted on submissions (e.g. "Pakej 80").
 */
export function toAlbarzahStoragePakej(name: string): string {
  const trimmed = name.trim().replace(/\s+/g, " ");
  if (!trimmed) return trimmed;

  if (/permata|1[,\s]?500|seumur/i.test(trimmed)) {
    return trimmed.replace(/\s+setahun$/i, "").trim();
  }

  const amountMatch = trimmed.match(/\b(80|120|180|240)\b/);
  if (amountMatch && YEARLY_PAKEJ_AMOUNTS.includes(amountMatch[1] as (typeof YEARLY_PAKEJ_AMOUNTS)[number])) {
    return `Pakej ${amountMatch[1]}`;
  }

  return trimmed.replace(/\s+setahun$/i, "").trim();
}
