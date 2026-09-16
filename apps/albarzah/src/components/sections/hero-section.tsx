"use client";
// File: src/components/sections/hero-section.tsx

import { motion } from "framer-motion";
import { Phone, Clock, Wallet, ShieldCheck, ArrowRight, Users, HeartHandshake, Quote, Sparkles } from "lucide-react";
import { BRAND, SECTION_IDS } from "@/lib/constants";
import { ResponsiveContainer } from "@sakinah/ui";
import { HotlineCard } from "@sakinah/ui";
import {
  staggerContainer,
  cardReveal,
  viewportEager,
} from "@sakinah/ui";

const trustIndicators = [
  { icon: Clock, label: "Pengurusan 24 Jam" },
  { icon: Wallet, label: "Serendah RM80/Tahun" },
  { icon: Users, label: "Terbuka Untuk Semua" },
  { icon: ShieldCheck, label: "Tanpa Laporan Kesihatan" },
];

export function HeroSection() {
  return (
    <section
      id={SECTION_IDS.utama}
      aria-label="Utama"
      className="hero-bg relative min-h-[92dvh] overflow-hidden flex items-center justify-center py-16 lg:py-24"
      style={
        {
          "--hero-bg-image": "url('/images/albarzah_hero_bg2.png')",
        } as React.CSSProperties
      }
    >
      {/* Custom responsive dome arch curve for mobile & desktop */}
      <style jsx global>{`
        .hero-dome-card {
          border-radius: 40% 40% 2rem 2rem / 15% 15% 2rem 2rem;
        }
        @media (min-width: 640px) {
          .hero-dome-card {
            border-radius: 60% 60% 2.25rem 2.25rem / 35% 35% 2.25rem 2.25rem;
          }
        }
      `}</style>

      <ResponsiveContainer className="flex justify-center">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-8 md:px-12 text-center flex flex-col items-center">

          {/* Main Mosque Dome Arch Container */}
          <div
            className="hero-dome-card w-full p-5 pt-8 sm:p-10 sm:pt-14 md:p-12 md:pt-16 shadow-2xl border flex flex-col items-center text-center backdrop-blur-md overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.92)",
              borderColor: "var(--color-brand-gold-light)",
              borderWidth: "1.5px",
              boxShadow: "0 20px 60px rgba(0,71,60,0.22)",
            }}
          >
            {/* Eyebrow Badge */}
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={viewportEager}
              className="eyebrow-cinzel mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest"
              style={{
                background: "rgba(0,179,15,0.12)",
                border: "1px solid var(--color-brand-green-light)",
                color: "var(--color-brand-green-dark)",
              }}
            >
              ALBARZAH • SKIM PENGURISAN JENAZAH &amp; KHAIRAT
            </motion.p>

            {/* Main Brand Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.8, ease: "backOut" }}
              className="mb-2 text-4xl sm:text-5xl lg:text-6xl font-black italic leading-none tracking-tight"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-green-dark)",
              }}
            >
              ALBARZAH
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-6"
              style={{ color: "var(--color-brand-gold)" }}
            >
              Jangan Menyesal Kemudian Hari
            </motion.p>

            {/* ── PDF Slide 1 & 2: Mutiara Kata Quote Box ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-full mb-6 rounded-2xl p-4 sm:p-6 border relative text-left"
              style={{
                background: "var(--color-brand-sage-soft)",
                borderColor: "var(--color-brand-border)",
              }}
            >
              <Quote className="h-8 w-8 absolute top-3 right-4 opacity-15" style={{ color: "var(--color-brand-green)" }} />
              <p className="text-[11px] font-black uppercase tracking-widest mb-1.5 flex items-center gap-1.5" style={{ color: "var(--color-brand-green)" }}>
                <Sparkles className="h-3.5 w-3.5" />
                MUTIARA KATA
              </p>
              <p className="text-sm sm:text-base font-bold italic leading-relaxed text-slate-800">
                “ SEDARA SIAPA KITA TAK PENTING, YANG PENTING BAGAIMANA PENGURUSAN JENAZAH KITA YA. KITA YANG TERAKHIR, fikir-fikir kanlah…… ”
              </p>
            </motion.div>

            {/* ── PDF Slide 1: Pantun Card ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="w-full mb-6 rounded-2xl p-4 text-center border"
              style={{
                background: "rgba(243,182,1,0.08)",
                borderColor: "rgba(243,182,1,0.3)",
              }}
            >
              <p className="text-xs sm:text-sm font-extrabold italic leading-relaxed" style={{ color: "var(--color-brand-green-dark)" }}>
                Buat Mandi Tuan Puteri, Siapa Tak Daftar Dia Yang Rugi, <br />
                <span className="font-black underline decoration-amber-400">Jangan Menyesal Kemudian Hari</span>
              </p>
            </motion.div>

            {/* ── PDF Slide 3: Jom Kita Berdakwah Card (Point 7) ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="w-full mb-8 rounded-2xl p-5 border text-center text-white"
              style={{
                background: "var(--color-brand-green)",
                borderColor: "var(--color-brand-green-dark)",
                boxShadow: "0 8px 24px rgba(0,71,60,0.15)",
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <HeartHandshake className="h-5 w-5" style={{ color: "var(--color-brand-gold-light)" }} />
                <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-white">
                  JOM KITA BERDAKWAH
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-95 mb-3">
                “ Menyampaikan perkara yang baik itu dakwah. Bagitahu pakej ini kepada keluarga dan kawan yang lain agar mereka juga mendapat manfaat. ”
              </p>
              <div className="pt-3 border-t border-white/20 text-[11px] sm:text-xs font-bold text-amber-200 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4">
                <span>US HJ MOHD ZAINAL HJ KHAMIS</span>
                <span className="hidden sm:inline">•</span>
                <span>ALBARZAH ENTERPRISE &amp; BUMIJEZ SDN BHD</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col gap-3 sm:flex-row justify-center w-full max-w-md mb-8"
            >
              <a
                href={`#${SECTION_IDS.pakej}`}
                className="hover-scale flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 px-6 text-sm font-black uppercase tracking-wide transition-all shadow-md cursor-pointer"
                style={{
                  background: "var(--color-brand-gold-light)",
                  color: "var(--color-brand-green-dark)",
                }}
                aria-label="Lihat pilihan pakej tahunan Albarzah"
              >
                LIHAT PAKEJ TAHUNAN
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={BRAND.hotlineTel}
                className="hover-scale flex flex-1 items-center justify-center gap-2 rounded-full border py-3.5 px-6 text-sm font-bold uppercase tracking-wide transition-all shadow-sm cursor-pointer"
                style={{
                  background: "#fff",
                  borderColor: "var(--color-brand-green)",
                  color: "var(--color-brand-green)",
                }}
                aria-label={`Hubungi bantuan 24 jam: ${BRAND.hotline}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Hubungi 24 Jam
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              transition={{ delayChildren: 0.9 }}
              className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 w-full"
            >
              {trustIndicators.map(({ icon: Icon, label }) => (
                <motion.div
                  key={label}
                  variants={cardReveal}
                  className="flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 border bg-white/95"
                  style={{ borderColor: "var(--color-brand-border)" }}
                >
                  <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--color-brand-green)" }} />
                  <span className="text-[11px] font-bold text-slate-800">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Hotline Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="mt-6 w-full"
            >
              <HotlineCard
                style={{
                  background: "var(--color-brand-green)",
                  color: "#fff",
                }}
              />
            </motion.div>

          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}
