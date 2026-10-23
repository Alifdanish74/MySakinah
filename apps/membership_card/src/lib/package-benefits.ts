// Sourced from: apps/kohasil/src/components/sections/package-section.tsx
// Each entry mirrors the modalData for the corresponding package.
// isKeluarga = true means benefits cover Ahli + Pasangan (show pasangan column)

export interface BenefitItem {
  no: number;
  benefit: string;
  ahli: string;
  pasangan?: string;
}

export interface PackageBenefitData {
  id: string;
  /** Canonical pakej name as stored in the database */
  names: string[];
  isKeluarga: boolean;
  isMuslim: boolean;
  totalNormalDeath: string;
  items: BenefitItem[];
  accidentBenefit: string;
  totalAccident: string;
  childBenefit?: string;
  termAndCondition?: string;
}

export const packageBenefitMap: PackageBenefitData[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // INDIVIDU 10
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "ind-10",
    names: ["INDIVIDU 10", "IND 10", "PKJ 10", "PAKEJ 10"],
    isKeluarga: false,
    isMuslim: true,
    totalNormalDeath: "RM 5,000",
    items: [
      { no: 1, benefit: "PENGURUSAN JENAZAH LENGKAP ATAU TUNAI (24 JAM BERSYARAT)", ahli: "RM 1,500" },
      { no: 2, benefit: "TAHLIL DAN KHATAM AL QURAN (DIURUSKAN BJSB - SELEPAS 30 HARI)", ahli: "RM 500" },
      { no: 3, benefit: "PAKEJ KEPADA WARIS (SELEPAS 60 HARI)", ahli: "RM 120" },
      { no: 4, benefit: "WANG KHAIRAT KEPADA WARIS (SELEPAS 90 HARI)", ahli: "RM 2,880" },
    ],
    accidentBenefit: "MENINGGAL / KECACATAN KEKAL AKI. KEMALANGAN (SELEPAS 180 HARI)",
    totalAccident: "RM 5,000",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // INDIVIDU 15
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "ind-15",
    names: ["INDIVIDU 15", "IND 15", "PKJ 15", "PAKEJ 15"],
    isKeluarga: false,
    isMuslim: true,
    totalNormalDeath: "RM 7,000",
    items: [
      { no: 1, benefit: "PENGURUSAN JENAZAH LENGKAP ATAU TUNAI (24 JAM BERSYARAT)", ahli: "RM 1,500" },
      { no: 2, benefit: "TAHLIL DAN KHATAM AL QURAN (DIURUSKAN BJSB - SELEPAS 30 HARI)", ahli: "RM 500" },
      { no: 3, benefit: "PAKEJ KEPADA WARIS (SELEPAS 60 HARI)", ahli: "RM 180" },
      { no: 4, benefit: "WANG KHAIRAT KEPADA WARIS (SELEPAS 90 HARI)", ahli: "RM 4,820" },
    ],
    accidentBenefit: "MENINGGAL / KECACATAN KEKAL AKI. KEMALANGAN (SELEPAS 180 HARI)",
    totalAccident: "RM 10,000",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // INDIVIDU 20
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "ind-20",
    names: ["INDIVIDU 20", "IND 20", "PKJ 20", "PAKEJ 20"],
    isKeluarga: false,
    isMuslim: true,
    totalNormalDeath: "RM 9,000",
    items: [
      { no: 1, benefit: "PENGURUSAN JENAZAH LENGKAP ATAU TUNAI (24 JAM BERSYARAT)", ahli: "RM 1,500" },
      { no: 2, benefit: "TAHLIL DAN KHATAM AL QURAN (DIURUSKAN BJSB - SELEPAS 30 HARI)", ahli: "RM 500" },
      { no: 3, benefit: "PAKEJ KEPADA WARIS (SELEPAS 60 HARI)", ahli: "RM 240" },
      { no: 4, benefit: "WANG KHAIRAT KEPADA WARIS (SELEPAS 90 HARI)", ahli: "RM 6,760" },
    ],
    accidentBenefit: "MENINGGAL / KECACATAN KEKAL AKI. KEMALANGAN (SELEPAS 180 HARI)",
    totalAccident: "RM 15,000",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // KELUARGA 20
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "kel-20",
    names: ["KELUARGA 20", "KEL 20", "FAMILY 20"],
    isKeluarga: true,
    isMuslim: true,
    totalNormalDeath: "RM 5,000 (Ahli) + RM 5,000 (Pasangan)",
    items: [
      { no: 1, benefit: "PENGURUSAN JENAZAH LENGKAP ATAU TUNAI (24 JAM BERSYARAT)", ahli: "RM 1,500", pasangan: "RM 1,500" },
      { no: 2, benefit: "TAHLIL DAN KHATAM AL QURAN (DIURUSKAN BJSB - SELEPAS 30 HARI)", ahli: "RM 500", pasangan: "RM 500" },
      { no: 3, benefit: "PAKEJ KEPADA WARIS (SELEPAS 60 HARI)", ahli: "RM 120", pasangan: "RM 120" },
      { no: 4, benefit: "WANG KHAIRAT KEPADA WARIS (SELEPAS 90 HARI)", ahli: "RM 2,880", pasangan: "RM 2,880" },
    ],
    accidentBenefit: "MENINGGAL / KECACATAN KEKAL AKI. KEMALANGAN (SELEPAS 180 HARI)",
    totalAccident: "RM 5,000 (Ahli) + RM 5,000 (Pasangan)",
    childBenefit: "TUNAI RM 1,200 SEORANG UNTUK 2 ANAK BERDAFTAR (1-17 TAHUN)",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // KELUARGA 30
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "kel-30",
    names: ["KELUARGA 30", "KEL 30", "FAMILY 30"],
    isKeluarga: true,
    isMuslim: true,
    totalNormalDeath: "RM 7,000 (Ahli) + RM 7,000 (Pasangan)",
    items: [
      { no: 1, benefit: "PENGURUSAN JENAZAH LENGKAP ATAU TUNAI (24 JAM BERSYARAT)", ahli: "RM 1,500", pasangan: "RM 1,500" },
      { no: 2, benefit: "TAHLIL DAN KHATAM AL QURAN (DIURUSKAN BJSB - SELEPAS 30 HARI)", ahli: "RM 500", pasangan: "RM 500" },
      { no: 3, benefit: "PAKEJ KEPADA WARIS (SELEPAS 60 HARI)", ahli: "RM 180", pasangan: "RM 180" },
      { no: 4, benefit: "WANG KHAIRAT KEPADA WARIS (SELEPAS 90 HARI)", ahli: "RM 4,820", pasangan: "RM 4,820" },
    ],
    accidentBenefit: "MENINGGAL / KECACATAN KEKAL AKI. KEMALANGAN (SELEPAS 180 HARI)",
    totalAccident: "RM 10,000 (Ahli) + RM 10,000 (Pasangan)",
    childBenefit: "TUNAI RM 1,200 SEORANG UNTUK 3 ANAK BERDAFTAR (1-17 TAHUN)",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // KELUARGA 40
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "kel-40",
    names: ["KELUARGA 40", "KEL 40", "FAMILY 40"],
    isKeluarga: true,
    isMuslim: true,
    totalNormalDeath: "RM 9,000 (Ahli) + RM 9,000 (Pasangan)",
    items: [
      { no: 1, benefit: "PENGURUSAN JENAZAH LENGKAP ATAU TUNAI (24 JAM BERSYARAT)", ahli: "RM 1,500", pasangan: "RM 1,500" },
      { no: 2, benefit: "TAHLIL DAN KHATAM AL QURAN (DIURUSKAN BJSB - SELEPAS 30 HARI)", ahli: "RM 500", pasangan: "RM 500" },
      { no: 3, benefit: "PAKEJ KEPADA WARIS (SELEPAS 60 HARI)", ahli: "RM 240", pasangan: "RM 240" },
      { no: 4, benefit: "WANG KHAIRAT KEPADA WARIS (SELEPAS 90 HARI)", ahli: "RM 6,760", pasangan: "RM 6,760" },
    ],
    accidentBenefit: "MENINGGAL / KECACATAN KEKAL AKI. KEMALANGAN (SELEPAS 180 HARI)",
    totalAccident: "RM 15,000 (Ahli) + RM 15,000 (Pasangan)",
    childBenefit: "TUNAI RM 1,200 SEORANG UNTUK 5 ANAK BERDAFTAR (1-17 TAHUN)",
  },
];

/**
 * Look up benefit data for a given pakej name.
 * Matches by checking if the pakej string contains any of the known names (case-insensitive).
 * Returns null if no match found (unknown/generic pakej).
 */
export function getBenefitsByPakej(pakej: string): PackageBenefitData | null {
  if (!pakej) return null;
  const upper = pakej.toUpperCase().trim();

  for (const pkg of packageBenefitMap) {
    for (const name of pkg.names) {
      if (upper.includes(name) || name.includes(upper)) {
        return pkg;
      }
    }
  }
  return null;
}
