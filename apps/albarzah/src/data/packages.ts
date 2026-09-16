// File: src/data/packages.ts
// Albarzah — All 4 individual plans from PPT (Slides 5–8, Points 8–11)

export interface BenefitItem {
  no: number;
  label: string;
  timeline?: string; // e.g. "30 hari bekerja"
  detail?: string;   // e.g. "Bumijez urus"
  value: string;     // e.g. "RM 1,500"
}

export interface PackageBenefitGroup {
  label: string;
  items: BenefitItem[];
  total?: string;
}

export interface Package {
  id: string;
  name: string;
  yearlyFee: number;
  monthlyFee: string;   // e.g. "RM 6.67"
  dailyRate: string;    // e.g. "22 sen"
  recommended?: boolean;
  eligibility: string;
  /** Brief bullet points shown on card */
  benefits: { label: string; value: string }[];
  /** Detailed breakdown for Benefits section */
  benefitGroups: PackageBenefitGroup[];
  details: string[];
  totalManfaat: string;
}

// Shared Nota Penting across all plans
export const notaPenting = [
  "Tarikh keahlian bermula pada 01 dan 15 haribuan setiap bulan DAN Manfaat akan bermula 30 hari dari Tarikh keahlian.",
  "Jika pembaharuan dibuat SEBELUM tarikh tamat keahlian — Manfaat akan terus bermula (tiada 30 hari menunggu).",
  "Jika pembaharuan dibuat SELEPAS tarikh tamat keahlian — Manfaat akan bermula 30 hari dari tarikh keahlian baru.",
];

export const packages: Package[] = [
  // ─── PAKEJ A: RM 80 ───────────────────────────────────────────────────
  {
    id: "pakej-80",
    name: "Pakej RM 80",
    yearlyFee: 80,
    monthlyFee: "RM 2.66",
    dailyRate: "22 sen",
    eligibility: "Umur 17–65 tahun • Boleh bayar sehingga 70 tahun",
    benefits: [
      { label: "Pengurusan Jenazah Lengkap", value: "RM 1,500" },
      { label: "Tahlil & Khatam Al-Quran", value: "RM 500" },
      { label: "Pakej Diwarisi", value: "RM 80" },
      { label: "Wang Khairat", value: "RM 920" },
      { label: "Meninggal Kemalangan", value: "RM 5,000" },
      { label: "Kecacatan Kekal", value: "RM 5,000" },
    ],
    benefitGroups: [
      {
        label: "Manfaat Meninggal Biasa",
        items: [
          {
            no: 1,
            label: "Pengurusan Jenazah Lengkap / Tunai",
            timeline: "24 JAM",
            detail: "Bersyarat (Pilihan)",
            value: "RM 1,500",
          },
          {
            no: 2,
            label: "Tahlil dan Khatam Al-Quran",
            timeline: "30 hari bekerja",
            detail: "Bumijez urus",
            value: "RM 500",
          },
          {
            no: 3,
            label: "Pakej Diwarisi kepada Waris",
            timeline: "60 hari bekerja",
            detail: "Mengikut pakej diambil",
            value: "RM 80",
          },
          {
            no: 4,
            label: "Wang Khairat kepada Waris",
            timeline: "90 hari bekerja",
            detail: "Dibayar kepada waris",
            value: "RM 920",
          },
        ],
        total: "RM 3,000",
      },
      {
        label: "Manfaat Berlaku Kemalangan",
        items: [
          {
            no: 1,
            label: "Meninggal Akibat Kemalangan",
            timeline: "3–4 bulan",
            detail: "Tertakluk Takaful • Bayar kepada waris",
            value: "RM 5,000",
          },
          {
            no: 2,
            label: "Kecacatan Kekal",
            timeline: "",
            detail: "Lihat pada kecacatan • Bayar kepada waris",
            value: "RM 5,000",
          },
        ],
        total: "RM 10,000",
      },
    ],
    totalManfaat: "RM 8,000",
    details: [
      "Tiada pemeriksaan kesihatan diperlukan",
      "Terbuka untuk semua warganegara Malaysia",
      "Manfaat bermula 30 hari selepas keahlian",
    ],
  },

  // ─── PAKEJ B: RM 120 ──────────────────────────────────────────────────
  {
    id: "pakej-120",
    name: "Pakej RM 120",
    yearlyFee: 120,
    monthlyFee: "RM 10",
    dailyRate: "33 sen",
    eligibility: "Umur 17–65 tahun • Boleh bayar sehingga 70 tahun",
    benefits: [
      { label: "Pengurusan Jenazah Lengkap", value: "RM 1,500" },
      { label: "Tahlil & Khatam Al-Quran", value: "RM 500" },
      { label: "Pakej Diwarisi", value: "RM 120" },
      { label: "Wang Khairat", value: "RM 2,280" },
      { label: "Meninggal Kemalangan", value: "RM 5,000" },
      { label: "Kecacatan Kekal", value: "RM 5,000" },
    ],
    benefitGroups: [
      {
        label: "Manfaat Meninggal Biasa",
        items: [
          {
            no: 1,
            label: "Pengurusan Jenazah Lengkap / Tunai",
            timeline: "24 JAM",
            detail: "Bersyarat (Pilihan)",
            value: "RM 1,500",
          },
          {
            no: 2,
            label: "Tahlil dan Khatam Al-Quran",
            timeline: "30 hari bekerja",
            detail: "Bumijez urus",
            value: "RM 500",
          },
          {
            no: 3,
            label: "Pakej Diwarisi kepada Waris",
            timeline: "60 hari bekerja",
            detail: "Mengikut pakej diambil",
            value: "RM 120",
          },
          {
            no: 4,
            label: "Wang Khairat kepada Waris",
            timeline: "90 hari bekerja",
            detail: "Dibayar kepada waris",
            value: "RM 2,280",
          },
        ],
        total: "RM 4,400",
      },
      {
        label: "Manfaat Berlaku Kemalangan",
        items: [
          {
            no: 1,
            label: "Meninggal Akibat Kemalangan",
            timeline: "3–4 bulan",
            detail: "Tertakluk Takaful • Bayar kepada waris",
            value: "RM 5,000",
          },
          {
            no: 2,
            label: "Kecacatan Kekal",
            timeline: "",
            detail: "Lihat pada kecacatan • Bayar kepada waris",
            value: "RM 5,000",
          },
        ],
        total: "RM 10,000",
      },
    ],
    totalManfaat: "RM 10,000",
    details: [
      "Tiada pemeriksaan kesihatan diperlukan",
      "Terbuka untuk semua warganegara Malaysia",
      "Manfaat bermula 30 hari selepas keahlian",
    ],
  },

  // ─── PAKEJ C: RM 180 ──────────────────────────────────────────────────
  {
    id: "pakej-180",
    name: "Pakej RM 180",
    yearlyFee: 180,
    monthlyFee: "RM 15",
    dailyRate: "50 sen",
    recommended: true,
    eligibility: "Umur 17–65 tahun • Boleh bayar sehingga 70 tahun",
    benefits: [
      { label: "Pengurusan Jenazah Lengkap", value: "RM 1,500" },
      { label: "Tahlil & Khatam Al-Quran", value: "RM 500" },
      { label: "Pakej Diwarisi", value: "RM 180" },
      { label: "Wang Khairat", value: "RM 4,820" },
      { label: "Meninggal Kemalangan", value: "RM 10,000" },
      { label: "Kecacatan Kekal", value: "RM 10,000" },
    ],
    benefitGroups: [
      {
        label: "Manfaat Meninggal Biasa",
        items: [
          {
            no: 1,
            label: "Pengurusan Jenazah Lengkap / Tunai",
            timeline: "24 JAM",
            detail: "Bersyarat (Pilihan)",
            value: "RM 1,500",
          },
          {
            no: 2,
            label: "Tahlil dan Khatam Al-Quran",
            timeline: "30 hari bekerja",
            detail: "Bumijez urus",
            value: "RM 500",
          },
          {
            no: 3,
            label: "Pakej Diwarisi kepada Waris",
            timeline: "60 hari bekerja",
            detail: "Mengikut pakej diambil",
            value: "RM 180",
          },
          {
            no: 4,
            label: "Wang Khairat kepada Waris",
            timeline: "90 hari bekerja",
            detail: "Dibayar kepada waris",
            value: "RM 4,820",
          },
        ],
        total: "RM 7,000",
      },
      {
        label: "Manfaat Berlaku Kemalangan",
        items: [
          {
            no: 1,
            label: "Meninggal Akibat Kemalangan",
            timeline: "3–4 bulan",
            detail: "Tertakluk Takaful • Bayar kepada waris",
            value: "RM 10,000",
          },
          {
            no: 2,
            label: "Kecacatan Kekal",
            timeline: "",
            detail: "Lihat pada kecacatan • Bayar kepada waris",
            value: "RM 10,000",
          },
        ],
        total: "RM 20,000",
      },
    ],
    totalManfaat: "RM 17,000",
    details: [
      "Tiada pemeriksaan kesihatan diperlukan",
      "Terbuka untuk semua warganegara Malaysia",
      "Manfaat bermula 30 hari selepas keahlian",
    ],
  },

  // ─── PAKEJ D: RM 240 ──────────────────────────────────────────────────
  {
    id: "pakej-240",
    name: "Pakej RM 240",
    yearlyFee: 240,
    monthlyFee: "RM 20",
    dailyRate: "66 sen",
    eligibility: "Umur 17–55 tahun • Boleh bayar sehingga 70 tahun",
    benefits: [
      { label: "Pengurusan Jenazah Lengkap", value: "RM 1,500" },
      { label: "Tahlil & Khatam Al-Quran", value: "RM 500" },
      { label: "Pakej Diwarisi", value: "RM 240" },
      { label: "Wang Khairat", value: "RM 6,760" },
      { label: "Meninggal Kemalangan", value: "RM 15,000" },
      { label: "Kecacatan Kekal", value: "RM 15,000" },
    ],
    benefitGroups: [
      {
        label: "Manfaat Meninggal Biasa",
        items: [
          {
            no: 1,
            label: "Pengurusan Jenazah Lengkap / Tunai",
            timeline: "24 JAM",
            detail: "Bersyarat (Pilihan)",
            value: "RM 1,500",
          },
          {
            no: 2,
            label: "Tahlil dan Khatam Al-Quran",
            timeline: "30 hari bekerja",
            detail: "Bumijez urus",
            value: "RM 500",
          },
          {
            no: 3,
            label: "Pakej Diwarisi kepada Waris",
            timeline: "60 hari bekerja",
            detail: "Mengikut pakej diambil",
            value: "RM 240",
          },
          {
            no: 4,
            label: "Wang Khairat kepada Waris",
            timeline: "90 hari bekerja",
            detail: "Dibayar kepada waris",
            value: "RM 6,760",
          },
        ],
        total: "RM 9,000",
      },
      {
        label: "Manfaat Berlaku Kemalangan",
        items: [
          {
            no: 1,
            label: "Meninggal Akibat Kemalangan",
            timeline: "3–4 bulan",
            detail: "Tertakluk Takaful • Bayar kepada waris",
            value: "RM 15,000",
          },
          {
            no: 2,
            label: "Kecacatan Kekal",
            timeline: "",
            detail: "Lihat pada kecacatan • Bayar kepada waris",
            value: "RM 15,000",
          },
        ],
        total: "RM 30,000",
      },
    ],
    totalManfaat: "RM 24,000",
    details: [
      "Tiada pemeriksaan kesihatan diperlukan",
      "Terbuka untuk semua warganegara Malaysia",
      "Manfaat bermula 30 hari selepas keahlian",
    ],
  },
];

// Backward-compat export
export const packageCategories = [
  {
    id: "semua",
    label: "Semua Pelan",
    packages,
  },
];
