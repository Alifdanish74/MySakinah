"use client";
// File: src/components/sections/realiti-section.tsx
// Digital Pamphlet Section — Point 4
// REALITI APABILA BERLAKU KEMATIAN

import { motion } from "framer-motion";
import { Banknote, Clock, ShieldCheck } from "lucide-react";
import { ResponsiveContainer, viewportOnce } from "@sakinah/ui";
import { SECTION_IDS } from "@/lib/constants";

export function RealitiSection() {
  return (
    <section
      id={SECTION_IDS.point4}
      aria-label="Realiti Apabila Berlaku Kematian"
      className="section-texture py-16 lg:py-24"
      style={{ background: "var(--color-brand-cream)" }}
    >
      <ResponsiveContainer>
        {/* Section heading */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="eyebrow-cinzel mb-2">PERKHIDMATAN 24 JAM</p>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
          >
            REALITI APABILA BERLAKU KEMATIAN
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: Urus Jenazah Tanpa Tunai */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-6 border shadow-sm flex flex-col justify-between"
            style={{ background: "#fff", borderColor: "var(--color-brand-border)" }}
          >
            <div>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl mb-4"
                style={{ background: "var(--color-brand-sage-soft)", color: "var(--color-brand-green)" }}
              >
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3
                className="text-lg font-black uppercase italic leading-tight mb-3"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
              >
                &ldquo; URUS JENAZAH TANPA TUNAI &rdquo;
              </h3>
              <p className="text-sm leading-relaxed text-slate-700 font-medium">
                Anda tak perlu risau tentang bayaran pengurusan jenazah. Kami menyediakan perkhidmatan pengurusan jenazah{" "}
                <strong>&ldquo;TANPA TUNAI&rdquo;</strong> pada hari kematian.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Membantu Waris 24 Jam */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-6 border shadow-sm flex flex-col justify-between"
            style={{ background: "#fff", borderColor: "var(--color-brand-border)" }}
          >
            <div>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl mb-4"
                style={{ background: "var(--color-brand-sage-soft)", color: "var(--color-brand-green)" }}
              >
                <Clock className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3
                className="text-lg font-black uppercase leading-tight mb-3"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
              >
                MEMBANTU WARIS 24 JAM
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Sedia membantu waris dalam masa <strong>24 jam</strong> apabila berlaku kematian dan menyediakan keperluan sepenuhnya.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Opsyen Tunai Bagi Waris */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-6 border shadow-sm flex flex-col justify-between"
            style={{ background: "#fff", borderColor: "var(--color-brand-border)" }}
          >
            <div>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl mb-4"
                style={{ background: "rgba(243,182,1,0.15)", color: "var(--color-brand-gold)" }}
              >
                <Banknote className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3
                className="text-lg font-black uppercase leading-tight mb-3"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
              >
                WANG TUNAI PENGURUSAN
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Menyediakan wang tunai RM 1500 sekiranya waris memilih untuk menguruskan jenazah sendiri dengan melengkapkan dokumen yang diperlukan.
              </p>
            </div>
          </motion.div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}

