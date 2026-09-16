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
  Sparkles,
  PlusCircle,
  Star,
} from "lucide-react";
import { ResponsiveContainer, SectionHeading, viewportOnce } from "@sakinah/ui";

const SERVICES_8 = [
  { no: 1, label: "Khidmat Nasihat Kepada Waris", icon: Headphones, desc: "Bimbingan & panduan mengurus jenazah mengikut syarak" },
  { no: 2, label: "Dokumen Kematian", icon: FileText, desc: "Bantuan menguruskan borang & permit pengebumian" },
  { no: 3, label: "Mandi Jenazah", icon: Droplets, desc: "Peralatan & petugas berpengalaman memandikan jenazah" },
  { no: 4, label: "Kafan Jenazah", icon: Shirt, desc: "Kelengkapan kain kafan & keperluan mengkafan yang sempurna" },
  { no: 5, label: "Solat Jenazah", icon: HeartHandshake, desc: "Pengurusan solat jenazah di masjid, surau atau rumah" },
  { no: 6, label: "Van Jenazah", icon: Truck, desc: "Pengangkutan khas jenazah dari lokasi ke tanah perkuburan" },
  { no: 7, label: "Kebumi Jenazah", icon: Mountain, desc: "Urusan dan bimbingan penggalian serta pengebumian" },
  { no: 8, label: "Talkin & Doa", icon: BookOpenCheck, desc: "Bacaan talkin dan doa selamat di tanah perkuburan" },
];

export function PamphletServicesSection() {
  return (
    <section
      id="perkhidmatan-lengkap"
      aria-label="8 Perkhidmatan Lengkap"
      className="section-texture py-16 lg:py-24"
      style={{ background: "var(--color-brand-cream)" }}
    >
      <ResponsiveContainer>
        <SectionHeading
          eyebrow="POINT 5 • SEGALA KELENGKAPAN DISEDIAKAN"
          title="MEMBANTU WARIS Dalam Kesedihan Apabila Berlaku Kematian"
          subtitle="Menyediakan Pengurusan Jenazah Lengkap — pengurus jenazah akan menghubungi waris secara langsung."
          align="center"
          className="mb-12"
        />

        {/* ── 8 Perkhidmatan Lengkap Grid ───────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {SERVICES_8.map(({ no, label, icon: Icon, desc }) => (
            <motion.div
              key={no}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.4, delay: no * 0.05 }}
              className="relative flex flex-col justify-between rounded-2xl p-5 border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{ borderColor: "var(--color-brand-border)" }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: "var(--color-brand-sage-soft)", color: "var(--color-brand-green)" }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-black"
                    style={{ background: "var(--color-brand-gold-light)", color: "var(--color-brand-green-dark)" }}
                  >
                    {no}
                  </span>
                </div>
                <h3 className="text-base font-bold mb-1" style={{ color: "var(--color-brand-green-dark)" }}>
                  {label}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {desc}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t flex items-center gap-1 text-[11px] font-extrabold text-emerald-700" style={{ borderColor: "var(--color-brand-border)" }}>
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Lengkap &amp; Disediakan</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner Badge: SEGALA KELENGKAPAN DISEDIAKAN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          className="mb-14 text-center"
        >
          <span
            className="inline-block rounded-full px-6 py-2.5 text-xs sm:text-sm font-black uppercase tracking-widest border shadow-md"
            style={{
              background: "var(--color-brand-gold-light)",
              borderColor: "var(--color-brand-gold)",
              color: "var(--color-brand-green-dark)",
            }}
          >
            ★ SEGALA KELENGKAPAN DISEDIAKAN ★
          </span>
        </motion.div>

        {/* ── Sudahkah Anda Memiliki Khairat Kematian & Kami Pelengkap ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* Advice card: Sudahkah anda memiliki khairat kematian */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-6 sm:p-8 border bg-white flex flex-col justify-between shadow-sm"
            style={{ borderColor: "var(--color-brand-border)" }}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5" style={{ color: "var(--color-brand-gold)" }} />
                <p className="text-xs font-black uppercase tracking-widest text-amber-700">
                  PERTANYAAN PENTING
                </p>
              </div>
              <h3
                className="text-xl sm:text-2xl font-black mb-3"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
              >
                SUDAHKAH ANDA MEMILIKI KHAIRAT KEMATIAN?
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                Jika <strong className="text-emerald-800">SUDAH ADA</strong> alhamdulillah, dan lebih baik jika anda memiliki <strong>2 atau 3 khairat kematian</strong>.
              </p>
              <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-extrabold text-xs sm:text-sm">
                ⚠️ JANGAN sampai anda TIADA khairat kematian!
              </div>
            </div>
          </motion.div>

          {/* Motto card: Kami Pelengkap Kepada Pengurusan Yang Sedia Ada */}
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
              <p className="text-xs font-black uppercase tracking-widest text-amber-300 mb-2">
                PERANAN UTAMA ALBARZAH
              </p>
              <h3
                className="text-xl sm:text-2xl font-black uppercase mb-4 leading-snug text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                KAMI PELENGKAP KEPADA PENGURUSAN YANG SEDIA ADA
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/20">
                  <CheckCircle2 className="h-5 w-5 text-amber-300 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wide">
                    YANG DAH ADA KAMI BANTU
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/20">
                  <PlusCircle className="h-5 w-5 text-amber-300 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wide">
                    YANG KURANG KAMI TAMBAH
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/20">
                  <Star className="h-5 w-5 text-amber-300 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wide">
                    YANG DAH BAIK KAMI BUAT LEBIH BAIK
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </ResponsiveContainer>
    </section>
  );
}
