// File: src/lib/utils.ts
// Utility functions for age calculation, address parsing, and mobile formatting

/**
 * Calculates age based on Malaysian MyKad / IC number (YYMMDD-PB-###G format or digits).
 * Handles century detection (19xx vs 20xx) and exact birth date comparison.
 */
export function calculateAgeFromIC(ic?: string): string | null {
  if (!ic) return null;
  const clean = ic.replace(/\D/g, "");
  if (clean.length < 6) return null;

  const yy = parseInt(clean.substring(0, 2), 10);
  const mm = parseInt(clean.substring(2, 4), 10);
  const dd = parseInt(clean.substring(4, 6), 10);

  if (isNaN(yy) || isNaN(mm) || isNaN(dd) || mm < 1 || mm > 12 || dd < 1 || dd > 31) {
    return null;
  }

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentYY = currentYear % 100; // e.g., 26 for year 2026

  // If 2-digit year is greater than current 2-digit year, person was born in 19xx, else 20xx
  const fullBirthYear = yy > currentYY ? 1900 + yy : 2000 + yy;

  let age = currentYear - fullBirthYear;

  // Check if birthday has occurred yet this year
  const currentMonth = today.getMonth() + 1; // 1-12
  const currentDay = today.getDate(); // 1-31

  if (currentMonth < mm || (currentMonth === mm && currentDay < dd)) {
    age--;
  }

  if (age < 0 || age > 120) return null;
  return age.toString();
}

/**
 * Returns formatted Umur (Age).
 * Uses explicit form_data.umur if provided and valid.
 * Otherwise fallback to auto-calculating age from IC / MyKad.
 */
export function getUmurDisplay(fd: Record<string, any>): string {
  if (fd.umur && fd.umur !== "-" && fd.umur !== "—" && String(fd.umur).trim() !== "") {
    return String(fd.umur).trim();
  }
  if (fd.age && fd.age !== "-" && fd.age !== "—" && String(fd.age).trim() !== "") {
    return String(fd.age).trim();
  }
  const calculated = calculateAgeFromIC(fd.no_kp || fd.ic || fd.no_ic || fd.ic_number);
  return calculated || "—";
}

/**
 * Returns formatted street / building address (Alamat).
 * Combines alamat1, alamat2, alamat3 into a clean string.
 */
export function getAlamatDisplay(fd: Record<string, any>): string {
  const parts = [fd.alamat1, fd.alamat2, fd.alamat3]
    .filter((p) => p && String(p).trim() !== "" && p !== "-" && p !== "—")
    .map((p) => String(p).trim());

  if (parts.length > 0) return parts.join(", ");
  if (fd.alamat && fd.alamat !== "-" && fd.alamat !== "—") return String(fd.alamat).trim();
  if (fd.address && fd.address !== "-" && fd.address !== "—") return String(fd.address).trim();
  return "—";
}

/**
 * Returns Poskod (Postal code).
 */
export function getPoskodDisplay(fd: Record<string, any>): string {
  if (fd.poskod && fd.poskod !== "-" && fd.poskod !== "—" && String(fd.poskod).trim() !== "") {
    return String(fd.poskod).trim();
  }
  if (fd.postcode && fd.postcode !== "-" && fd.postcode !== "—" && String(fd.postcode).trim() !== "") {
    return String(fd.postcode).trim();
  }
  // Try extracting 5-digit postal code from full address string if available
  const fullAddr = [fd.alamat1, fd.alamat2, fd.alamat, fd.address].filter(Boolean).join(" ");
  const match = fullAddr.match(/\b\d{5}\b/);
  if (match) return match[0];

  return "—";
}

/**
 * Returns Negeri (State).
 */
export function getNegeriDisplay(fd: Record<string, any>): string {
  if (fd.negeri && fd.negeri !== "-" && fd.negeri !== "—" && String(fd.negeri).trim() !== "") {
    return String(fd.negeri).trim();
  }
  if (fd.state && fd.state !== "-" && fd.state !== "—" && String(fd.state).trim() !== "") {
    return String(fd.state).trim();
  }
  return "—";
}
