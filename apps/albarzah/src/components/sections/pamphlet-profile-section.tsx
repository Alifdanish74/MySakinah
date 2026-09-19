"use client";
// File: src/components/sections/pamphlet-profile-section.tsx
// Digital Pamphlet Section — Point 3 only (Point 4 is now realiti-section.tsx)

import { motion } from "framer-motion";
import { ShieldCheck, Award, Building2, BookOpen, Heart, Landmark } from "lucide-react";
import { ResponsiveContainer, viewportOnce } from "@sakinah/ui";
import { SECTION_IDS } from "@/lib/constants";

const ROLES = [
  { title: "PENGARAH", org: "Albarzah Enterprise", icon: Building2 },
  { title: "PENGERUSI EKSEKUTIF", org: "BUMIJEZ Sdn Bhd", icon: Landmark },
  { title: "PENGERUSI", org: "Koperasi Darul Jenazah (KODARUL)", icon: ShieldCheck },
  { title: "MAAHAD TAHFIZ", org: "Maahad Tahfiz Al-Quran Al-Ikhwaniah", icon: BookOpen },
  { title: "INSTITUSI ANTARABANGSA", org: "United Institute Arakan Malaysia (UAIM)", icon: Award },
  { title: "PERTUBUHAN AMAL", org: "Pertubuhan Amal Barzah", icon: Heart },
];

export function PamphletProfileSection() {
  return (
    <section
      id={SECTION_IDS.point3}
      aria-label="Profil Pengasas"
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
          {/* Profile info: portrait + roles */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            {/* Ustaz Photo */}
            <div className="flex-shrink-0">
              <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full p-1.5 bg-gradient-to-b from-amber-400 to-emerald-700 shadow-xl overflow-hidden">
                <img
                  src="/albarzah/images/front_icon_ustaz.jpeg"
                  alt="Us Hj Mohd Zainal Bin Hj Khamis"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>

            {/* Name & intro */}
            <div className="text-center md:text-left flex-1">
              <p className="eyebrow-cinzel mb-2">PENGARAH & PENGASAS</p>
              <h3
                className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight mb-1.5"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
              >
                US HJ MOHD ZAINAL BIN HJ KHAMIS
              </h3>
              <p className="text-sm font-bold italic mb-2" style={{ color: "var(--color-brand-gold)" }}>
                Ustaz Jenazah Songkok Tinggi — Pengalaman Lebih 30 Tahun
              </p>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Mengetuai kepimpinan pengurusan jenazah Islam dan institusi pendidikan &amp; kebajikan utama di Malaysia.
              </p>
            </div>
          </div>

          {/* Organization Roles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ROLES.map(({ title, org, icon: Icon }) => (
              <div
                key={org}
                className="flex items-start gap-3 rounded-2xl p-3.5 bg-white border shadow-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderColor: "var(--color-brand-border)" }}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl flex-shrink-0 mt-0.5"
                  style={{ background: "var(--color-brand-sage-soft)", color: "var(--color-brand-green)" }}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {title}
                  </p>
                  <p className="text-xs font-bold text-slate-800 leading-snug">
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
