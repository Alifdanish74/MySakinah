"use client";
// File: src/components/sections/realiti-section.tsx
// Digital Pamphlet Section — Point 4
// REALITI APABILA BERLAKU KEMATIAN

import { motion } from "framer-motion";
import { Banknote, Clock, CheckCircle2 } from "lucide-react";
import { ResponsiveContainer, viewportOnce } from "@sakinah/ui";
import { SECTION_IDS } from "@/lib/constants";

import { useState } from "react";
import { PackageFormModal } from "./package-form-modal";

interface RealitiSectionProps {
  onSelectPackage?: (pkgName: string) => void;
}

export function RealitiSection({ onSelectPackage }: RealitiSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCTA = () => {
    onSelectPackage?.("PAKEJ RM1,500 SEUMUR HIDUP");
    setModalOpen(true);
  };

  return (
    <section
      id={SECTION_IDS.point4}
      aria-label="Realiti Apabila Berlaku Kematian"
      className="section-texture py-16 lg:py-24"
      style={{ background: "var(--color-brand-cream)" }}
    >
      <PackageFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        packageName="PAKEJ RM1,500 SEUMUR HIDUP"
      />
      <ResponsiveContainer>

        {/* Point indicator */}
        <div className="flex items-center gap-3 mb-8">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-black flex-shrink-0"
            style={{ background: "var(--color-brand-green)", color: "#fff" }}
            aria-hidden="true"
          >
            04
          </span>
          <div className="h-px flex-1 opacity-20" style={{ background: "var(--color-brand-green)" }} aria-hidden="true" />
        </div>

        {/* Section heading */}
        <div className="mb-10">
          <p className="eyebrow-cinzel mb-2">POINT 04</p>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
          >
            REALITI APABILA BERLAKU KEMATIAN
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left: Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div
              className="rounded-2xl p-6 border shadow-sm"
              style={{ background: "#fff", borderColor: "var(--color-brand-border)" }}
            >
              <h3
                className="text-xl sm:text-2xl font-black uppercase italic leading-tight mb-3"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
              >
                &ldquo; URUS JENAZAH TANPA TUNAI &rdquo;
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-slate-700 font-medium">
                Anda tak perlu risau tentang bayaran pengurusan jenazah. Kami menyediakan perkhidmatan pengurusan jenazah{" "}
                <strong>&ldquo;TANPA TUNAI&rdquo;</strong>, atau anda tidak perlu mengeluarkan{" "}
                <strong>&ldquo;WANG TUNAI&rdquo;</strong> pada hari kematian.
              </p>
            </div>

            <div
              className="rounded-2xl p-5 border shadow-sm"
              style={{ background: "#fff", borderColor: "var(--color-brand-border)" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0 mt-0.5"
                  style={{ background: "var(--color-brand-sage-soft)", color: "var(--color-brand-green)" }}
                >
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: "var(--color-brand-green)" }}>
                    MEMBANTU WARIS
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    Dalam masa <strong>24 jam</strong> apabila berlaku kematian dan menyediakan keperluan sepenuhnya.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: RM1,500 callout */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div
              className="rounded-3xl p-8 sm:p-10 text-white text-center relative overflow-hidden border"
              style={{
                background: "var(--color-brand-green)",
                borderColor: "var(--color-brand-green-dark)",
                boxShadow: "0 16px 48px rgba(0,71,60,0.22)",
              }}
            >
              {/* Decorative bg circle */}
              <div
                className="absolute -top-8 -right-8 h-40 w-40 rounded-full opacity-10"
                style={{ background: "var(--color-brand-gold-light)" }}
                aria-hidden="true"
              />

              <div
                className="inline-flex items-center justify-center rounded-2xl p-3 mb-5"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <Banknote className="h-8 w-8 text-amber-300" aria-hidden="true" />
              </div>

              <p className="text-xs font-black uppercase tracking-widest text-amber-300 mb-2">
                MEMBANTU WARIS — DALAM MASA 24 JAM
              </p>

              <p className="text-sm sm:text-base font-semibold text-white/90 leading-relaxed mb-5">
                Menyediakan wang tunai sekiranya waris ingin menguruskan jenazah sendiri dengan melengkapkan dokumen yang diperlukan.
              </p>

              {/* Big RM1,500 callout */}
              <div
                className="rounded-2xl px-6 py-5 border mb-5"
                style={{ background: "rgba(255,255,255,0.10)", borderColor: "rgba(243,182,1,0.5)" }}
              >
                <p className="text-xs font-black uppercase tracking-widest text-amber-300 mb-1">
                  WANG TUNAI
                </p>
                <p
                  className="text-4xl sm:text-5xl font-black tabular-nums text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  RM1,500
                </p>
                <p className="text-xs text-white/70 mt-1 font-medium">
                  dibayar kepada waris yang layak
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-white/70 font-medium mb-5">
                <Clock className="h-4 w-4 flex-shrink-0 text-amber-300" aria-hidden="true" />
                <span>24 JAM BERSYARAT (PILIHAN)</span>
              </div>

              <button
                type="button"
                onClick={handleCTA}
                className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 px-6 font-black text-xs sm:text-sm uppercase tracking-wider text-slate-900 transition-all hover:bg-amber-400 active:scale-95 cursor-pointer shadow-lg"
                style={{ background: "#f3b601" }}
              >
                MOHON PAKEJ RM1,500 SEUMUR HIDUP
              </button>
            </div>
          </motion.div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}
