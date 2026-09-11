// File: src/data/packages.ts

export interface PackageBenefit {
  label: string;
  value: string;
}

export interface Package {
  id: string;
  name: string;
  yearlyFee: number;
  recommended?: boolean;
  eligibility: string;
  benefits: PackageBenefit[];
  details: string[];
}

export const packages: Package[] = [
  {
    id: "pelan-asas",
    name: "Pelan Asas",
    yearlyFee: 80,
    eligibility: "Warganegara Malaysia berumur 1–69 tahun",
    benefits: [
      { label: "Manfaat Kematian Biasa", value: "RM5,000" },
      { label: "Tambahan Kemalangan", value: "sehingga RM5,000" },
      { label: "Pengurusan Jenazah 24 Jam", value: "Disertakan" },
      { label: "Bantuan Tunai Segera", value: "Disertakan" },
    ],
    details: [
      "Tiada pemeriksaan kesihatan diperlukan",
      "Terbuka untuk semua warganegara Malaysia",
      "Tempoh menunggu: 45 hari selepas pendaftaran",
      "Boleh diperbaharui sehingga umur 75 tahun",
      "Tertakluk kepada syarat dan terma pakej",
    ],
  },
  {
    id: "pelan-premium",
    name: "Pelan Premium",
    yearlyFee: 120,
    recommended: true,
    eligibility: "Warganegara Malaysia berumur 1–69 tahun",
    benefits: [
      { label: "Manfaat Kematian Biasa", value: "RM10,000" },
      { label: "Tambahan Kemalangan", value: "sehingga RM10,000" },
      { label: "Manfaat Pasangan", value: "RM5,000" },
      { label: "Manfaat Setiap Anak (sehingga 4)", value: "RM1,000" },
      { label: "Pengurusan Jenazah Penuh", value: "Peserta & Pasangan" },
      { label: "Bantuan Tunai Segera", value: "Disertakan" },
    ],
    details: [
      "Tiada pemeriksaan kesihatan diperlukan",
      "Perlindungan komprehensif untuk seluruh keluarga",
      "Tempoh menunggu: 45 hari selepas pendaftaran",
      "Boleh diperbaharui sehingga umur 75 tahun",
      "Tertakluk kepada syarat dan terma pakej",
    ],
  },
];

// Kept for backward compat with any component that imports packageCategories
export const packageCategories = [
  {
    id: "semua",
    label: "Semua Pelan",
    packages,
  },
];
