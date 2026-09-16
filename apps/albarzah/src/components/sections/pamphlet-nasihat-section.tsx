"use client";
// File: src/components/sections/pamphlet-nasihat-section.tsx
// Digital Pamphlet Section — Point 6

import { motion } from "framer-motion";
import { Quote, Sparkles, HeartHandshake, ArrowRight } from "lucide-react";
import { ResponsiveContainer, SectionHeading, viewportOnce } from "@sakinah/ui";
import { SECTION_IDS } from "@/lib/constants";

export function PamphletNasihatSection() {
  return (
    <section
      id="nasihat-ustaz"
      aria-label="Nasihat Ustaz & Pantun"
      className="section-texture py-16 lg:py-24"
      style={{ background: "#fff" }}
    >
      <ResponsiveContainer>
        <SectionHeading
          eyebrow="POINT 6 • PESANAN & NASIHAT PENGASAS"
          title="Nasihat, Pantun & Mutiara Kata"
          subtitle="Renungan ikhlas daripada Ustaz Hj Mohd Zainal Hj Khamis untuk ingatan bersama."
          align="center"
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* 1. NASIHAT SAYA (Ustaz Zainal) */}
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
                <HeartHandshake className="h-5 w-5" style={{ color: "var(--color-brand-green)" }} />
                <p className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--color-brand-green-dark)" }}>
                  NASIHAT SAYA
                </p>
              </div>
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: "var(--color-brand-green-dark)", fontFamily: "var(--font-heading)" }}
              >
                Us. Hj Mohd Zainal Bin Hj Khamis
              </h3>
              <p className="text-sm text-slate-800 font-semibold leading-relaxed italic">
                “ Ambil pakej sekurang-kurangnya <strong className="text-emerald-900 underline">RM 80 setahun</strong>, jangan sampai tak ambil <span className="text-red-600 uppercase font-black">'RUGI'</span>. Jika anda bayar 30 tahun pun masih ada untung, saya rasa belum tentu kita mencapai ke usia itu. ”
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 text-right">
              <a
                href={`#${SECTION_IDS.pakej}`}
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 hover:text-emerald-900"
              >
                <span>Daftar RM80/Tahun Sekarang</span>
                <ArrowRight className="h-3.5 w-3.5" />
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
              <span className="inline-block rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-widest mb-3 bg-amber-200 text-amber-950">
                PANTUN NASIHAT
              </span>
              <div className="space-y-2 text-sm sm:text-base font-bold italic leading-relaxed text-slate-900 my-4">
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
            <Quote className="h-16 w-16 absolute -bottom-2 -right-2 opacity-15 text-white" />
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-amber-300" />
                <p className="text-xs font-black uppercase tracking-widest text-amber-300">
                  MUTIARA KATA
                </p>
              </div>
              <p className="text-base sm:text-lg font-black italic leading-relaxed text-white">
                “ SEDARA SIAPA KITA TAK PENTING, YANG PENTING BAGAIMANA PENGURUSAN JENAZAH KITA YANG TERAKHIR ”
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 text-right text-xs font-bold text-amber-200 italic">
              fikir-fikir kan lah……
            </div>
          </motion.div>

        </div>
      </ResponsiveContainer>
    </section>
  );
}
