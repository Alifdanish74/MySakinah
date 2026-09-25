"use client";
// File: src/components/sections/pamphlet-services-section.tsx
// Digital Pamphlet Section — Point 5

import { motion } from "framer-motion";
import {
  FileText,
  Droplets,
  Shirt,
  HeartHandshake,
  Truck,
  Mountain,
  BookOpenCheck,
  Headphones,
  CheckCircle2,
  PlusCircle,
  Star,
} from "lucide-react";
import { ResponsiveContainer, viewportOnce } from "@sakinah/ui";
import { SECTION_IDS } from "@/lib/constants";

const SERVICES_8 = [
  { no: 1, label: "Khidmat Nasihat Kepada Waris", icon: Headphones },
  { no: 2, label: "Dokumen Kematian", icon: FileText },
  { no: 3, label: "Mandi Jenazah", icon: Droplets },
  { no: 4, label: "Kafan Jenazah", icon: Shirt },
  { no: 5, label: "Solat Jenazah", icon: HeartHandshake },
  { no: 6, label: "Van Jenazah", icon: Truck },
  { no: 7, label: "Kebumi Jenazah", icon: Mountain },
  { no: 8, label: "Membaca Talkin", icon: BookOpenCheck },
];

export function PamphletServicesSection() {
  return (
    <section
      id={SECTION_IDS.point5}
      aria-label="Perkhidmatan Jenazah Lengkap"
      className="section-texture py-16 lg:py-24"
      style={{ background: "#fff" }}
    >
      <ResponsiveContainer>

        {/* Heading */}
        <div className="mb-10">
          <p className="eyebrow-cinzel mb-2">SEGALA KELENGKAPAN DISEDIAKAN</p>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight mb-3"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
          >
            MEMBANTU WARIS
          </h2>
          <p className="text-base text-slate-600 font-medium leading-relaxed max-w-xl">
            Dalam kesedihan apabila berlaku kematian. Menyediakan Pengurusan Jenazah Lengkap — pengurus jenazah akan menghubungi waris.
          </p>
        </div>

        {/* ── 8 Perkhidmatan Lengkap Grid ─────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-10">
          {SERVICES_8.map(({ no, label, icon: Icon }) => (
            <motion.div
              key={no}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.4, delay: no * 0.05 }}
              className="relative flex items-center gap-2.5 sm:gap-4 rounded-2xl p-3 sm:p-4 border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              style={{ borderColor: "var(--color-brand-border)" }}
            >
              <div
                className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl flex-shrink-0"
                style={{ background: "var(--color-brand-sage-soft)", color: "var(--color-brand-green)" }}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest block mb-0.5"
                  style={{ color: "var(--color-brand-gold)" }}
                >
                  {String(no).padStart(2, "0")}
                </span>
                <p className="text-xs sm:text-sm font-bold leading-snug break-words" style={{ color: "var(--color-brand-green-dark)" }}>
                  {label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SEGALA KELENGKAPAN DISEDIAKAN banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          className="mb-12 text-center"
        >
          <span
            className="inline-block rounded-full px-6 py-2.5 text-sm font-black uppercase tracking-widest border shadow-md"
            style={{
              background: "var(--color-brand-gold-light)",
              borderColor: "var(--color-brand-gold)",
              color: "var(--color-brand-green-dark)",
            }}
          >
            ★ SEGALA KELENGKAPAN DISEDIAKAN ★
          </span>
        </motion.div>

        {/* Khairat reminder + Kami Pelengkap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* Sudahkah anda memiliki khairat kematian */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-6 sm:p-8 border bg-white flex flex-col justify-between shadow-sm"
            style={{ borderColor: "var(--color-brand-border)" }}
          >
            <div>
              <h3
                className="text-xl sm:text-2xl font-black mb-3 leading-snug"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
              >
                SUDAHKAH ANDA MEMILIKI KHAIRAT KEMATIAN?
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium mb-4">
                Jika <strong className="text-emerald-800">SUDAH ADA</strong>, Alhamdulillah. Lebih baik jika anda memiliki{" "}
                <strong>2 atau 3 khairat kematian</strong>.
              </p>
              <div
                className="rounded-2xl p-4 border font-bold text-sm"
                style={{ background: "rgba(198,40,40,0.06)", borderColor: "rgba(198,40,40,0.2)", color: "#b71c1c" }}
              >
                ⚠️ JANGAN sampai anda TIADA khairat kematian.
              </div>
            </div>
          </motion.div>

          {/* Kami Pelengkap */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-6 sm:p-8 border text-white flex flex-col justify-between shadow-md"
            style={{
              background: "var(--color-brand-green)",
              borderColor: "var(--color-brand-green-dark)",
            }}
          >
            <div>
              <p className="eyebrow-cinzel mb-3" style={{ color: "var(--color-brand-gold-light)" }}>
                PERANAN UTAMA ALBARZAH
              </p>
              <h3
                className="text-xl sm:text-2xl font-black uppercase mb-5 leading-snug text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                KAMI PELENGKAP KEPADA PENGURUSAN YANG SEDIA ADA
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 border border-white/20">
                  <CheckCircle2 className="h-5 w-5 text-amber-300 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm font-black uppercase tracking-wide">YANG DAH ADA KAMI BANTU</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 border border-white/20">
                  <PlusCircle className="h-5 w-5 text-amber-300 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm font-black uppercase tracking-wide">YANG KURANG KAMI TAMBAH</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 border border-white/20">
                  <Star className="h-5 w-5 text-amber-300 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm font-black uppercase tracking-wide">YANG DAH BAIK KAMI BUAT LEBIH BAIK</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </ResponsiveContainer>
    </section>
  );
}
