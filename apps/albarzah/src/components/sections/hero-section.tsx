"use client";
// File: src/components/sections/hero-section.tsx
// (Replaced by PamphletProfileSection in page.tsx)

export function HeroSection() {
  return null;
}

/*
import { motion } from "framer-motion";
import { Phone, Clock, Wallet, ShieldCheck, ArrowRight, Users } from "lucide-react";
import { BRAND, SECTION_IDS } from "@/lib/constants";
import { ResponsiveContainer, HotlineCard, staggerContainer, cardReveal } from "@sakinah/ui";

const trustIndicators = [
  { icon: Clock, label: "Pengurusan 24 Jam" },
  { icon: Wallet, label: "Serendah RM 80/Tahun" },
  { icon: Users, label: "Terbuka Untuk Semua" },
  { icon: ShieldCheck, label: "Tanpa Laporan Kesihatan" },
];

export function OldHeroSection() {
  return (
    <section
      id={SECTION_IDS.utama}
      aria-label="Utama"
      className="hero-bg relative min-h-[88dvh] overflow-hidden flex items-center justify-center py-16 lg:py-24"
      style={
        {
          "--hero-bg-image": "url('/albarzah/images/albarzah_hero_bg2.png')",
        } as React.CSSProperties
      }
    >
      <ResponsiveContainer className="flex justify-center">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-8 md:px-12 text-center flex flex-col items-center">
          <div
            className="w-full p-5 pt-10 sm:p-10 sm:pt-16 md:p-12 md:pt-20 shadow-2xl border flex flex-col items-center text-center backdrop-blur-md overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.93)",
              borderColor: "var(--color-brand-gold-light)",
              borderWidth: "1.5px",
              boxShadow: "0 20px 60px rgba(0,71,60,0.22)",
              borderRadius: "50% 50% 2rem 2rem / 20% 20% 2rem 2rem",
            }}
          >
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
              className="text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-5"
              style={{ color: "var(--color-brand-gold)" }}
            >
              Khairat Kematian Yang Mampu Dimiliki
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-sm sm:text-base leading-relaxed text-slate-700 font-medium mb-7 max-w-lg"
            >
              Pengurusan jenazah lengkap{" "}
              <strong>&ldquo;TANPA TUNAI&rdquo;</strong> — 24 jam bersedia membantu waris dalam kesedihan. Mulai dari{" "}
              <strong className="text-emerald-800">RM 80.00 setahun</strong> sahaja.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col gap-3 sm:flex-row justify-center w-full max-w-md mb-7"
            >
              <a
                href={`#${SECTION_IDS.point8}`}
                className="hover-scale flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 px-6 text-sm font-black uppercase tracking-wide transition-all shadow-md cursor-pointer"
                style={{
                  background: "var(--color-brand-green)",
                  color: "#fff",
                }}
                aria-label="Lihat pilihan pakej tahunan Albarzah"
              >
                LIHAT PAKEJ
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
                BANTUAN 24 JAM
              </a>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              transition={{ delayChildren: 0.7 }}
              className="grid grid-cols-2 gap-2 sm:grid-cols-4 w-full mb-6"
            >
              {trustIndicators.map(({ icon: Icon, label }) => (
                <motion.div
                  key={label}
                  variants={cardReveal}
                  className="flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 border bg-white/95"
                  style={{ borderColor: "var(--color-brand-border)" }}
                >
                  <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--color-brand-green)" }} aria-hidden="true" />
                  <span className="text-[11px] font-bold text-slate-800">{label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="w-full"
            >
              <HotlineCard />
            </motion.div>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}
*/
