"use client";
// File: src/components/sections/pamphlet-profile-section.tsx
// Digital Pamphlet Section — Point 3 only (Point 4 is now realiti-section.tsx)

import { motion } from "framer-motion";
import { ShieldCheck, Headphones, Truck, Landmark } from "lucide-react";
import { ResponsiveContainer, viewportOnce } from "@sakinah/ui";
import { SECTION_IDS } from "@/lib/constants";

const ROLES = [
  { title: "PENGURUSAN", org: "Pengurusan jenazah lengkap berlandaskan sunnah", icon: ShieldCheck },
  { title: "BANTUAN", org: "Van jenazah seluruh Malaysia", icon: Truck },
  { title: "PANDUAN", org: "Nasihat bersepadu kepada waris", icon: Headphones },
  // { title: "AMANAH", org: "Bantuan pengurusan e-pusaka", icon: Landmark },
];

export function PamphletProfileSection() {
  return (
    <section
      id={SECTION_IDS.utama}
      aria-label="Pengenalan Bumijez"
      className="section-texture py-16 lg:py-24"
      style={{ background: "#fff" }}
    >
      <ResponsiveContainer>

        {/* Section heading */}
        <div className="mb-8 max-w-xl">
          <p className="eyebrow-cinzel mb-2">KHAIRAT KEMATIAN YANG MAMPU DIMILIKI</p>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
          >
            KAMI MENYEDIAKAN
          </h2>
          <p className="mt-2 text-base sm:text-lg font-bold" style={{ color: "var(--color-brand-text-muted)" }}>
            PAKEJ KHAIRAT KEMATIAN DAN PENGURUSAN JENAZAH LENGKAP
          </p>
        </div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-6 sm:p-10 border shadow-lg overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, rgba(0,71,60,0.03) 0%, rgba(243,182,1,0.05) 100%)",
            borderColor: "var(--color-brand-gold-light)",
            borderWidth: "1.5px",
          }}
        >
          {/* Service overview */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            <div className="flex-shrink-0">
              <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-3xl p-2 bg-gradient-to-b from-[var(--color-brand-gold-light)] to-[var(--color-brand-green)] shadow-xl overflow-hidden">
                <img
                  src="/bumijez/images/official/logo.png"
                  alt="Logo Bumijez"
                  className="h-full w-full rounded-2xl object-contain bg-white"
                />
              </div>
            </div>

            <div className="text-center md:text-left flex-1">
              <p className="eyebrow-cinzel mb-2">BERSAMA BUMIJEZ</p>
              <h3
                className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight mb-1.5"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
              >
                Pengurusan Lengkap <br /> Dalam 24 Jam
              </h3>
              <p className="text-sm font-bold italic mb-2" style={{ color: "var(--color-brand-gold)" }}>
                Berprinsip syariah, bersistematik dan bersepadu
              </p>
              <ul className="mt-3 text-sm text-slate-600 font-medium leading-relaxed list-disc list-outside pl-5 space-y-1.5 text-left">
                <li>Pengurusan jenazah lengkap mengikut keperluan dan prinsip syariah.</li>
                <li>Bantuan van jenazah mengikut keperluan waris di seluruh Malaysia.</li>
                <li>Panduan praktikal kepada ahli keluarga semasa saat yang sukar.</li>
                <li>Penerangan dan bantuan permulaan pengurusan harta pusaka.</li>
              </ul>
            </div>
          </div>

          {/* Organization Roles Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {ROLES.map(({ title, org, icon: Icon }) => (
              <div
                key={org}
                className="flex items-start gap-1.5 sm:gap-3 rounded-2xl p-2 sm:p-3.5 bg-white border shadow-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderColor: "var(--color-brand-border)" }}
              >
                <div
                  className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-xl flex-shrink-0 mt-0.5"
                  style={{ background: "var(--color-brand-sage-soft)", color: "var(--color-brand-green)" }}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wide text-slate-400 leading-tight break-words mb-0.5">
                    {title}
                  </p>
                  <p className="text-[10.5px] sm:text-xs font-bold text-slate-800 leading-snug break-words">
                    {org}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Brand statement */}
          <div
            className="mt-8 rounded-2xl p-5 text-center border"
            style={{ background: "var(--color-brand-sage-soft)", borderColor: "var(--color-brand-border)" }}
          >
            <p className="eyebrow-cinzel mb-1">My Sakinah Pro</p>
            <p
              className="text-lg sm:text-xl font-black uppercase italic"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
            >
              &ldquo; KHAIRAT KEMATIAN YANG MAMPU DIMILIKI &rdquo;
            </p>
          </div>
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
}
