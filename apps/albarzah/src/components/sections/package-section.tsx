"use client";
// File: src/components/sections/package-section.tsx
// Albarzah — Points 8–11: Four individual pakej sections (inline scrollable)
// CTA scrolls to #point-12 and pre-selects the package via callback

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import { notaPenting } from "@/data/packages";
import { ResponsiveContainer, viewportOnce } from "@sakinah/ui";
import { PackageFormModal } from "./package-form-modal";

// ── Package data (exact from PPT Points 8–11) ─────────────────────────────
interface BenefitRow {
  no: number;
  label: string;
  note: string;
  value: string;
}

interface PakejData {
  id: string;
  pointId: string;
  pointNo: string;
  yearly: string;
  yearlyValue: string;
  packageName?: string;
  period?: string;
  sebulan: string;
  sehari: string;
  umur: string;
  manfaatBiasa: BenefitRow[];
  kemalangan: BenefitRow[];
  csrNote?: string;
  jumlahKeseluruhan: string;
}

const PAKEJ_LIST: PakejData[] = [
  {
    id: "pakej-80",
    pointId: SECTION_IDS.point8,
    pointNo: "08",
    yearly: "RM 80.00",
    yearlyValue: "PAKEJ RM 80.00 SETAHUN",
    sebulan: "RM 2.66",
    sehari: "22 sen",
    umur: "Umur bermula 17 tahun hingga 65 tahun dan boleh bayar sehingga 70 tahun",
    manfaatBiasa: [
      { no: 1, label: "Pengurusan Jenazah Lengkap / Tunai", note: "24 Jam Bersyarat • Pilihan", value: "RM 1,500" },
      { no: 2, label: "Tahlil dan Khatam Al-Quran", note: "30 Hari Bekerja • Bumijez Urus", value: "RM 500" },
      { no: 3, label: "Pakej Diwarisi", note: "60 Hari Bekerja • Mengikut Pakej Diambil", value: "RM 80" },
      { no: 4, label: "Wang Khairat", note: "90 Hari Bekerja • Dibayar Kepada Waris", value: "RM 920" },
    ],
    kemalangan: [
      { no: 1, label: "Meninggal", note: "3 / 4 Bulan • Tertakluk Takaful • Bayar Kepada Waris", value: "RM 5,000" },
      { no: 2, label: "Kecacatan Kekal", note: "Lihat Pada Kecacatan • Bayar Kepada Waris", value: "RM 5,000" },
    ],
    jumlahKeseluruhan: "RM 8,000",
  },
  {
    id: "pakej-120",
    pointId: SECTION_IDS.point9,
    pointNo: "09",
    yearly: "RM 120.00",
    yearlyValue: "PAKEJ RM 120.00 SETAHUN",
    sebulan: "RM 10.00",
    sehari: "33 sen",
    umur: "Umur bermula 17 tahun hingga 65 tahun dan boleh bayar sehingga 70 tahun",
    manfaatBiasa: [
      { no: 1, label: "Pengurusan Jenazah Lengkap / Tunai", note: "24 Jam Bersyarat • Pilihan", value: "RM 1,500" },
      { no: 2, label: "Tahlil dan Khatam Al-Quran", note: "30 Hari Bekerja • Bumijez Urus", value: "RM 500" },
      { no: 3, label: "Pakej Diwarisi", note: "60 Hari Bekerja • Mengikut Pakej Diambil", value: "RM 120" },
      { no: 4, label: "Wang Khairat", note: "90 Hari Bekerja • Dibayar Kepada Waris", value: "RM 2,880" },
    ],
    kemalangan: [
      { no: 1, label: "Meninggal", note: "3 / 4 Bulan • Tertakluk Takaful • Bayar Kepada Waris", value: "RM 5,000" },
      { no: 2, label: "Kecacatan Kekal", note: "Lihat Pada Kecacatan • Bayar Kepada Waris", value: "RM 5,000" },
    ],
    jumlahKeseluruhan: "RM 10,000",
  },
  {
    id: "pakej-180",
    pointId: SECTION_IDS.point10,
    pointNo: "10",
    yearly: "RM 180.00",
    yearlyValue: "PAKEJ RM 180.00 SETAHUN",
    sebulan: "RM 15.00",
    sehari: "50 sen",
    umur: "Umur bermula 17 tahun hingga 65 tahun dan boleh bayar sehingga 70 tahun",
    manfaatBiasa: [
      { no: 1, label: "Pengurusan Jenazah Lengkap / Tunai", note: "24 Jam Bersyarat • Pilihan", value: "RM 1,500" },
      { no: 2, label: "Tahlil dan Khatam Al-Quran", note: "30 Hari Bekerja • Bumijez Urus", value: "RM 500" },
      { no: 3, label: "Pakej Diwarisi", note: "60 Hari Bekerja • Mengikut Pakej Diambil", value: "RM 180" },
      { no: 4, label: "Wang Khairat", note: "90 Hari Bekerja • Dibayar Kepada Waris", value: "RM 4,820" },
    ],
    kemalangan: [
      { no: 1, label: "Meninggal", note: "3 / 4 Bulan • Tertakluk Takaful • Bayar Kepada Waris", value: "RM 10,000" },
      { no: 2, label: "Kecacatan Kekal", note: "Lihat Pada Kecacatan • Bayar Kepada Waris", value: "RM 10,000" },
    ],
    jumlahKeseluruhan: "RM 17,000",
  },
  {
    id: "pakej-240",
    pointId: SECTION_IDS.point11,
    pointNo: "11",
    yearly: "RM 240.00",
    yearlyValue: "PAKEJ RM 240.00 SETAHUN",
    sebulan: "RM 20.00",
    sehari: "66 sen",
    umur: "Umur bermula 17 tahun hingga 55 tahun dan boleh bayar sehingga 70 tahun",
    manfaatBiasa: [
      { no: 1, label: "Pengurusan Jenazah Lengkap / Tunai", note: "24 Jam Bersyarat • Pilihan", value: "RM 1,500" },
      { no: 2, label: "Tahlil dan Khatam Al-Quran", note: "30 Hari Bekerja • Bumijez Urus", value: "RM 500" },
      { no: 3, label: "Pakej Diwarisi", note: "60 Hari Bekerja • Mengikut Pakej Diambil", value: "RM 240" },
      { no: 4, label: "Wang Khairat", note: "90 Hari Bekerja • Dibayar Kepada Waris", value: "RM 6,760" },
    ],
    kemalangan: [
      { no: 1, label: "Meninggal", note: "3 / 4 Bulan • Tertakluk Takaful • Bayar Kepada Waris", value: "RM 15,000" },
      { no: 2, label: "Kecacatan Kekal", note: "Lihat Pada Kecacatan • Bayar Kepada Waris", value: "RM 15,000" },
    ],
    jumlahKeseluruhan: "RM 24,000",
  },
  {
    id: "pakej-1500",
    pointId: "pakej-1500",
    pointNo: "12",
    yearly: "RM 1,500.00",
    yearlyValue: "PAKEJ PERMATA INDIVIDU",
    packageName: "PAKEJ PERMATA INDIVIDU",
    period: "SEUMUR HIDUP",
    sebulan: "Bayaran Sekali Sahaja",
    sehari: "Seumur Hidup",
    umur: "SELEPAS UMUR 70 TAHUN DAN MESTI MELANGGANI MANA-MANA PAKEJ SELAMA 5 TAHUN",
    manfaatBiasa: [
      { no: 1, label: "Pengurusan Jenazah Lengkap / Tunai", note: "24 Jam Bersyarat • Pilihan", value: "RM 1,500.00" },
      { no: 2, label: "Pakej Diwarisi", note: "30 Hari Bekerja • Pakej Terendah", value: "RM 80.00" },
      { no: 4, label: "Wang Khairat", note: "30 Hari Bekerja • Dibayar Kepada Waris", value: "RM 150.00" },
    ],
    kemalangan: [],
    csrNote: "Pakej ini tidak ditakafulkan selebihnya adalah CSR Bumijez Sdn Bhd",
    jumlahKeseluruhan: "RM 1,730.00",
  },
];

// ── Single Package Card ────────────────────────────────────────────────────
interface PackageCardProps {
  pkg: PakejData;
  onSelectPackage: (yearlyValue: string) => void;
}

function PackageCard({ pkg, onSelectPackage }: PackageCardProps) {
  const handleCTA = () => {
    onSelectPackage(pkg.yearlyValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6 }}
      className="w-full rounded-3xl overflow-hidden border bg-white shadow-md"
      style={{ borderColor: "var(--color-brand-border)", boxShadow: "0 4px 24px rgba(0,71,60,0.08)" }}
    >
      {/* Card header with price */}
      <div
        className="px-6 py-6 sm:px-8"
        style={{ background: "var(--color-brand-green)" }}
      >
        <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.75)" }}>
          {pkg.packageName || "PAKEJ MY SAKINAH PRO INDIVIDU"}
        </p>
        <p
          className="text-4xl sm:text-5xl font-black tabular-nums text-white leading-none"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {pkg.yearly}
        </p>
        <p className="text-sm font-bold mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>
          {pkg.period || "SETAHUN"}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
          <span
            className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)" }}
          >
            {pkg.sebulan.toLowerCase().includes("bayar") || pkg.sebulan.toLowerCase().includes("sebulan") ? pkg.sebulan : `${pkg.sebulan} sebulan`}
          </span>
          <span
            className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)" }}
          >
            {pkg.sehari.toLowerCase().includes("hidup") || pkg.sehari.toLowerCase().includes("sehari") ? pkg.sehari : `${pkg.sehari} sehari`}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Eligibility */}
        <p
          className="text-xs sm:text-sm font-bold text-center leading-snug px-3 py-2.5 rounded-xl uppercase tracking-wide"
          style={{
            background: pkg.id === "pakej-1500" ? "rgba(239,68,68,0.08)" : "var(--color-brand-sage-soft)",
            color: pkg.id === "pakej-1500" ? "#c2410c" : "var(--color-brand-green-dark)",
            borderColor: pkg.id === "pakej-1500" ? "rgba(239,68,68,0.2)" : "transparent",
            borderWidth: pkg.id === "pakej-1500" ? "1px" : "0px",
          }}
        >
          {pkg.umur}
        </p>

        {/* Manfaat Meninggal Biasa */}
        <div>
          <p
            className="text-[10px] font-black uppercase tracking-widest mb-3"
            style={{ color: "var(--color-brand-text-muted)" }}
          >
            MANFAAT MENINGGAL BIASA
          </p>
          <ul className="space-y-3">
            {pkg.manfaatBiasa.map((b) => (
              <li key={b.no} className="flex items-start gap-3">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black flex-shrink-0 mt-0.5"
                  style={{ background: "var(--color-brand-sage-soft)", color: "var(--color-brand-green)" }}
                >
                  {b.no}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug flex-1" style={{ color: "var(--color-brand-text)" }}>
                      {b.label}
                    </p>
                    <p
                      className="text-sm font-black tabular-nums flex-shrink-0"
                      style={{ color: "var(--color-brand-green)" }}
                    >
                      {b.value}
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">{b.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Berlaku Kemalangan */}
        {pkg.kemalangan.length > 0 && (
          <div>
            <p
              className="text-[10px] font-black uppercase tracking-widest mb-3"
              style={{ color: "var(--color-brand-text-muted)" }}
            >
              BERLAKU KEMALANGAN
            </p>
            <ul className="space-y-3">
              {pkg.kemalangan.map((b) => (
                <li key={b.no} className="flex items-start gap-3">
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(243,182,1,0.12)", color: "var(--color-brand-gold)" }}
                  >
                    {b.no}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold leading-snug flex-1" style={{ color: "var(--color-brand-text)" }}>
                        {b.label}
                      </p>
                      <p
                        className="text-sm font-black tabular-nums flex-shrink-0"
                        style={{ color: "var(--color-brand-gold)" }}
                      >
                        {b.value}
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">{b.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Total */}
        <div
          className="flex items-center justify-between rounded-xl px-4 py-3 border"
          style={{ background: "var(--color-brand-sage-soft)", borderColor: "var(--color-brand-border)" }}
        >
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-brand-text-muted)" }}>
            JUMLAH KESELURUHAN MANFAAT
          </p>
          <p
            className="text-lg font-black tabular-nums"
            style={{ color: "var(--color-brand-green)", fontFamily: "var(--font-heading)" }}
          >
            {pkg.jumlahKeseluruhan}
          </p>
        </div>

        {/* CSR Note */}
        {pkg.csrNote && (
          <p className="text-xs text-center font-semibold italic text-slate-600 px-3 py-2 bg-amber-50/60 rounded-xl border border-amber-200/60 leading-relaxed">
            {pkg.csrNote}
          </p>
        )}

        {/* Embedded Nota Penting content */}
        <div
          className="rounded-2xl p-3.5 sm:p-4 border space-y-2"
          style={{ background: "var(--color-brand-sage-soft)", borderColor: "var(--color-brand-border)" }}
        >
          {notaPenting.map((nota, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span
                className="h-1.5 w-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: "var(--color-brand-gold)" }}
              />
              <p className="text-xs leading-relaxed font-medium" style={{ color: "var(--color-brand-text-muted)" }}>
                {nota}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={handleCTA}
          className="w-full flex flex-col items-center justify-center gap-0.5 rounded-full py-3.5 px-6 cursor-pointer transition-all hover:opacity-90 active:scale-95 min-h-[52px]"
          style={{ background: "var(--color-brand-green)", color: "#fff" }}
          aria-label={`Pilih pakej ${pkg.yearly} setahun dan isi borang`}
        >
          <span className="text-sm font-black uppercase tracking-wider">SAYA PILIH PAKEJ INI</span>
          <span className="text-[10px] font-medium opacity-75 normal-case flex items-center gap-1">
            <ArrowDown className="h-3 w-3" aria-hidden="true" />
            SILA ISI BORANG
          </span>
        </button>
      </div>
    </motion.div>
  );
}

// ── Main PackageSection ────────────────────────────────────────────────────
interface PackageSectionProps {
  onSelectPackage?: (yearlyValue: string) => void;
}

export function PackageSection({ onSelectPackage }: PackageSectionProps = {}) {
  const [modalPackage, setModalPackage] = useState<string | null>(null);

  const handleSelectPackageCard = (yearlyValue: string) => {
    onSelectPackage?.(yearlyValue);
    setModalPackage(yearlyValue);
  };

  return (
    <div id={SECTION_IDS.pakej}>
      <PackageFormModal
        isOpen={!!modalPackage}
        onClose={() => setModalPackage(null)}
        packageName={modalPackage || "PAKEJ RM 80.00 SETAHUN"}
      />
      {/* Section intro heading above the 4 package sections */}
      <div
        className="section-texture py-10 lg:py-14"
        style={{ background: "var(--color-brand-ivory)" }}
      >
        <ResponsiveContainer>
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow-cinzel mb-3">PAKEJ MY SAKINAH PRO INDIVIDU</p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight mb-3"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
            >
              PILIH PAKEJ YANG DITAWARKAN
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              PAKEJ KHAIRAT KEMATIAN MAMPU MILIK
            </p>
          </div>
        </ResponsiveContainer>
      </div>

      {/* Four package sections */}
      {PAKEJ_LIST.map((pkg, idx) => (
        <section
          key={pkg.id}
          id={pkg.pointId}
          aria-label={`Pakej ${pkg.yearly} Setahun`}
          className="section-texture py-12 lg:py-16"
          style={{ background: idx % 2 === 0 ? "var(--color-brand-ivory)" : "var(--color-brand-cream)" }}
        >
          <ResponsiveContainer>
            <div className="max-w-xl mx-auto">
              <PackageCard pkg={pkg} onSelectPackage={handleSelectPackageCard} />
            </div>
          </ResponsiveContainer>
        </section>
      ))}
    </div>
  );
}

