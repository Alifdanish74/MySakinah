"use client";
// File: src/components/sections/pamphlet-nasihat-section.tsx
// Digital Pamphlet Section — Point 6

import { motion } from "framer-motion";
import { Quote, HeartHandshake, ArrowRight } from "lucide-react";
import { ResponsiveContainer, viewportOnce } from "@sakinah/ui";
import { SECTION_IDS } from "@/lib/constants";

export function PamphletNasihatSection() {
  return (
    <section
      id={SECTION_IDS.point6}
      aria-label="Nasihat, Pantun dan Mutiara Kata"
      className="section-texture py-16 lg:py-24"
      style={{ background: "var(--color-brand-cream)" }}
    >
      <ResponsiveContainer>

        {/* Point indicator */}
        <div className="flex items-center gap-3 mb-8">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-black flex-shrink-0"
            style={{ background: "var(--color-brand-green)", color: "#fff" }}
            aria-hidden="true"
          >
            06
          </span>
          <div className="h-px flex-1 opacity-20" style={{ background: "var(--color-brand-green)" }} aria-hidden="true" />
        </div>

        {/* Heading */}
        <div className="mb-10">
          <p className="eyebrow-cinzel mb-2">POINT 06 • PESANAN & NASIHAT</p>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
          >
            Nasihat, Pantun &amp; Mutiara Kata
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* 1. NASIHAT SAYA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-6 sm:p-8 border shadow-sm flex flex-col justify-between"
            style={{
              background: "var(--color-brand-sage-soft)",
              borderColor: "var(--color-brand-border)",
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <HeartHandshake className="h-5 w-5" style={{ color: "var(--color-brand-green)" }} aria-hidden="true" />
                <p className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--color-brand-green-dark)" }}>
                  NASIHAT SAYA
                </p>
              </div>
              <h3
                className="text-base font-bold mb-3"
                style={{ color: "var(--color-brand-green-dark)", fontFamily: "var(--font-heading)" }}
              >
                Us. Hj Mohd Zainal Bin Hj Khamis
              </h3>
              <p className="text-sm text-slate-800 font-semibold leading-relaxed italic">
                &ldquo; Ambil pakej sekurang-kurangnya <strong className="text-emerald-900 underline">RM80 setahun</strong>. Jangan sampai tak ambil.{" "}
                <span className="text-red-600 uppercase font-black">&apos;RUGI&apos;</span>{" "}
                jika anda bayar 30 tahun pun masih ada untung. Saya rasa belum tentu kita mencapai usia itu. &rdquo;
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 text-right">
              <a
                href={`#${SECTION_IDS.point8}`}
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 hover:text-emerald-900"
              >
                <span>Daftar RM80/Tahun Sekarang</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* 2. PANTUN NASIHAT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl p-6 sm:p-8 border shadow-sm flex flex-col justify-between text-center"
            style={{
              background: "rgba(243,182,1,0.08)",
              borderColor: "rgba(243,182,1,0.3)",
            }}
          >
            <div>
              <span className="inline-block rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest mb-4 bg-amber-200 text-amber-950">
                PANTUN NASIHAT
              </span>
              <div className="space-y-2 text-sm sm:text-base font-bold italic leading-relaxed text-slate-900 my-2">
                <p>Sungguh Sejuk Air Perigi,</p>
                <p>Buat Mandi Tuan Puteri;</p>
                <p>Siapa Tak Daftar Dia Yang Rugi,</p>
                <p className="text-amber-900 font-black underline">Jangan Menyesal Kemudian Hari.</p>
              </div>
            </div>

            <p className="text-[11px] font-bold text-amber-800 uppercase tracking-widest mt-4">
              ★ Albarzah Enterprise ★
            </p>
          </motion.div>

          {/* 3. MUTIARA KATA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl p-6 sm:p-8 border text-white shadow-md flex flex-col justify-between relative overflow-hidden"
            style={{
              background: "var(--color-brand-green)",
              borderColor: "var(--color-brand-green-dark)",
            }}
          >
            <Quote className="h-16 w-16 absolute -bottom-2 -right-2 opacity-15 text-white" aria-hidden="true" />
            <div>
              <p className="eyebrow-cinzel mb-3" style={{ color: "var(--color-brand-gold-light)" }}>
                MUTIARA KATA
              </p>
              <p
                className="text-base sm:text-lg font-black leading-relaxed text-white mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                SAUDARA SIAPA KITA TAK PENTING
              </p>
              <p className="text-sm font-bold text-white/85 leading-relaxed mb-2">
                YANG PENTING BAGAIMANA PENGURUSAN JENAZAH KITA YANG TERAKHIR
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20 text-right text-xs font-bold text-amber-200 italic">
              Fikir-fikirkanlah……
            </div>
          </motion.div>

        </div>
      </ResponsiveContainer>
    </section>
  );
}
