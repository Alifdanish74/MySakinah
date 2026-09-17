"use client";
// File: src/components/sections/pamphlet-profile-section.tsx
// Digital Pamphlet Section — Point 3 & Point 4

import { motion } from "framer-motion";
import { ShieldCheck, Award, Building2, BookOpen, Heart, Landmark, Banknote, Clock, Sparkles } from "lucide-react";
import { ResponsiveContainer, SectionHeading, viewportOnce } from "@sakinah/ui";

const ROLES = [
  { title: "PENGARAH", org: "Albarzah Enterprise", icon: Building2 },
  { title: "PENGERUSI EKSEKUTIF", org: "BUMIJEZ Sdn Bhd", icon: Landmark },
  { title: "PENGERUSI", org: "Koperasi Darul Jenazah (KODARUL)", icon: ShieldCheck },
  { title: "INSTITUSI & AKADEMI", org: "Maahad Tahfiz Al Quran Al Ikhwaniah", icon: BookOpen },
  { title: "INSTITUSI ANTARABANGSA", org: "United Institute Arakan Malaysia (UAIM)", icon: Award },
  { title: "PERTUBUHAN AMAL", org: "Pertubuhan Amal Barzah", icon: Heart },
];

export function PamphletProfileSection() {
  return (
    <section
      id="pengenalan-ustaz"
      aria-label="Profil & Kepimpinan"
      className="section-texture py-16 lg:py-24"
      style={{ background: "#fff" }}
    >
      <ResponsiveContainer>
        <SectionHeading
          eyebrow="KHAIRAT KEMATIAN YANG MAMPU DIMILIKI"
          title="Albarzah & Bumijez Sdn Bhd"
          subtitle="Dikelola oleh pengurusan berpengalaman lebih 30 tahun dalam pengurusan jenazah & khairat kematian di Malaysia."
          align="center"
          className="mb-12"
        />

        {/* ── Point 3: Executive Profile & Organizations Card ──────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mb-16 rounded-3xl p-6 sm:p-10 border shadow-lg overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, rgba(0,71,60,0.04) 0%, rgba(243,182,1,0.06) 100%)",
            borderColor: "var(--color-brand-gold-light)",
            borderWidth: "1.5px",
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            {/* Ustaz Photo */}
            <div className="relative flex-shrink-0">
              <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full p-1.5 bg-gradient-to-b from-amber-400 to-emerald-700 shadow-xl overflow-hidden">
                <img
                  src="/albarzah/images/front_icon_ustaz.jpeg"
                  alt="Us Hj Mohd Zainal Hj Khamis"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left flex-1">
              <span
                className="inline-block rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest mb-2"
                style={{ background: "rgba(0,179,15,0.12)", color: "var(--color-brand-green-dark)" }}
              >
                POINT 3 • PROFIL PENGASAS &amp; PENGERUSI
              </span>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight mb-2"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
              >
                US HJ MOHD ZAINAL BIN HJ KHAMIS
              </h2>
              <p className="text-sm sm:text-base font-bold italic" style={{ color: "var(--color-brand-gold)" }}>
                (Ustaz Jenazah Songkok Tinggi — Pengalaman Lebih 30 Tahun)
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
                Penerajui kepimpinan pengurusan jenazah dan institusi pendidikan &amp; kebajikan utama:
              </p>
            </div>
          </div>

          {/* Organization Roles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
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
                  <Icon className="h-4 w-4" />
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
        </motion.div>

        {/* ── Point 4: Realiti Apabila Berlaku Kematian & Urus Tanpa Tunai ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-3xl p-6 sm:p-10 border text-white relative overflow-hidden"
          style={{
            background: "var(--color-brand-green)",
            borderColor: "var(--color-brand-green-dark)",
            boxShadow: "0 16px 48px rgba(0,71,60,0.2)",
          }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-black uppercase tracking-widest bg-white/10 text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>POINT 4 • REALITI APABILA BERLAKU KEMATIAN</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase italic leading-tight text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                “ URUS JENAZAH TANPA TUNAI ”
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-white/90 font-medium">
                Anda tak perlu risau tentang bayaran pengurusan jenazah — kami menyediakan perkhidmatan pengurusan jenazah <strong>“TANPA TUNAI”</strong> tanpa perlu anda mengeluarkan <strong>“WANG TUNAI”</strong> pada hari kematian.
              </p>

              {/* Cash Assistance Highlight */}
              <div
                className="rounded-2xl p-4 sm:p-5 border text-left flex items-start gap-4"
                style={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(243,182,1,0.4)" }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0 mt-0.5"
                  style={{ background: "var(--color-brand-gold-light)", color: "var(--color-brand-green-dark)" }}
                >
                  <Banknote className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-amber-300">
                    MEMBANTU WARIS — DALAM MASA 24 JAM
                  </p>
                  <p className="text-xs sm:text-sm text-white font-semibold mt-1 leading-relaxed">
                    Menyediakan <strong className="text-amber-300 text-base">WANG TUNAI RM 1,500</strong> sekiranya waris ingin menguruskan jenazah sendiri dengan melengkapkan dokumen yang diperlukan.
                  </p>
                </div>
              </div>
            </div>

            {/* Side Badge */}
            <div
              className="flex-shrink-0 rounded-2xl p-6 text-center border flex flex-col items-center justify-center w-full lg:w-72"
              style={{
                background: "rgba(0,48,40,0.4)",
                borderColor: "var(--color-brand-gold-light)",
              }}
            >
              <Clock className="h-10 w-10 mb-3 text-amber-300" />
              <p className="text-xs font-extrabold uppercase tracking-widest text-amber-300">
                KAMI MENYEDIAKAN
              </p>
              <p className="text-base font-black text-white uppercase mt-1 leading-snug">
                PAKEJ KHAIRAT KEMATIAN DAN PENGURUSAN JENAZAH LENGKAP
              </p>
            </div>
          </div>
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
}
