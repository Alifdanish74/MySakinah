"use client";
// File: src/components/sections/benefits-section.tsx — Albarzah

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Heart,
  Clock,
  FileCheck2,
  Wallet,
  CheckCircle2,
  Sparkles,
  Users,
} from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import { ResponsiveContainer } from "@sakinah/ui";
import { SectionHeading } from "@sakinah/ui";
import { OrnamentalDivider } from "@sakinah/ui";
import { staggerContainer, cardReveal, viewportOnce } from "@sakinah/ui";

const keistimewaan = [
  {
    icon: ShieldCheck,
    title: "Perlindungan Komprehensif",
    description: "Manfaat kematian sehingga RM10,000 termasuk perlindungan tambahan kemalangan.",
  },
  {
    icon: Heart,
    title: "Harga Mampu Milik",
    description: "Serendah RM80 setahun — bersamaan kurang daripada 22 sen sehari.",
  },
  {
    icon: Clock,
    title: "Perlindungan Hingga 75 Tahun",
    description: "Tempoh perlindungan yang panjang — boleh diperbaharui sehingga umur 75 tahun.",
  },
  {
    icon: FileCheck2,
    title: "Tanpa Laporan Kesihatan",
    description: "Tiada pemeriksaan kesihatan diperlukan. Pendaftaran mudah dan pantas.",
  },
  {
    icon: Wallet,
    title: "Bantuan Tunai Segera",
    description: "Bantuan tunai khairat kematian dibayar dalam tempoh 24 jam hingga 180 hari.",
  },
  {
    icon: CheckCircle2,
    title: "Kelengkapan Disediakan",
    description: "Semua kelengkapan pengurusan jenazah akan disediakan sepenuhnya pada hari kejadian.",
  },
  {
    icon: Sparkles,
    title: "Bebas Risau Kos",
    description: "Waris tidak perlu risau akan kos terlibat — semuanya ditanggung oleh Albarzah.",
  },
  {
    icon: Users,
    title: "Terbuka Non-Muslim",
    description: "Terbuka kepada bukan Muslim — bantuan tunai kematian 24 jam disediakan.",
  },
];

export function BenefitsSection() {
  return (
    <section
      id={SECTION_IDS.manfaat}
      aria-label="Keistimewaan Albarzah"
      className="section-texture py-16 lg:py-24"
      style={{ background: "var(--color-brand-cream)" }}
    >
      <ResponsiveContainer>
        <SectionHeading
          eyebrow="Keistimewaan Skim"
          title="Satu Pelan, Perlindungan Menyeluruh"
          subtitle="Nikmati keistimewaan skim khairat kematian yang direka khas untuk orang awam — mudah, mampu milik, dan menyeluruh."
          className="mb-12"
        />

        {/* 8 Benefits Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-16"
        >
          {keistimewaan.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                variants={cardReveal}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-3.5 rounded-2xl p-6 border shadow-sm transition-all duration-300"
                style={{
                  background: "#fff",
                  borderColor: "var(--color-brand-border)",
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-sm"
                  style={{ background: "var(--color-brand-green)" }}
                >
                  <IconComp className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3
                    className="text-base font-bold mb-1.5 leading-snug"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Family coverage highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-3xl border shadow-lg"
          style={{
            background: "#fff",
            borderColor: "var(--color-brand-border)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Decorative panel */}
            <div
              className="relative flex h-64 sm:h-80 lg:h-full lg:col-span-5 min-h-[280px] items-center justify-center"
              style={{ background: "var(--color-brand-green)" }}
            >
              <div className="text-center px-8">
                <div className="mb-4 flex justify-center">
                  <Users className="h-20 w-20 text-white/30" aria-hidden="true" />
                </div>
                <p className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-2">
                  Pelan Premium
                </p>
                <p className="text-white text-xl font-bold leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                  Perlindungan Untuk<br />Seluruh Keluarga
                </p>
              </div>
              <div
                className="absolute bottom-4 left-4 right-4 rounded-xl p-3 backdrop-blur-md text-white border"
                style={{ background: "rgba(0,0,0,0.35)", borderColor: "rgba(255,255,255,0.15)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-brand-gold-light)" }}>
                  Kasih Sayang Keluarga
                </p>
                <p className="text-sm font-bold">
                  Pastikan Kebajikan Jenazah Keluarga Terjaga
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 sm:p-10 lg:col-span-7 flex flex-col justify-between">
              <div>
                <span
                  className="inline-block rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ background: "rgba(0,71,60,0.1)", color: "var(--color-brand-green)" }}
                >
                  Pelan Premium — RM120/Tahun
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green)" }}
                >
                  Keistimewaan Perlindungan Keluarga
                </h3>

                <div
                  className="mb-6 inline-flex items-center gap-3 rounded-2xl px-5 py-3 border shadow-sm"
                  style={{
                    background: "var(--color-brand-sage-soft)",
                    borderColor: "var(--color-brand-gold)",
                  }}
                >
                  <span className="text-lg sm:text-xl font-extrabold text-green-900">
                    RM120.00 Setahun
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "var(--color-brand-gold-light)", color: "var(--color-brand-green-dark)" }}>
                    Nilai Terbaik
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Dengan Pelan Premium, anda mendapat perlindungan untuk pasangan (RM5,000) dan setiap anak sehingga 4 orang (RM1,000 setiap seorang). Pengurusan jenazah penuh juga disertakan untuk peserta dan pasangan — <strong>sehingga umur 75 tahun</strong>.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <OrnamentalDivider className="mt-14" label="Albarzah" />
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
}
