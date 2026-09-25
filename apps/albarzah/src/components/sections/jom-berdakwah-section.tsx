"use client";
// File: src/components/sections/jom-berdakwah-section.tsx
// Digital Pamphlet Section — Point 7
// JOM KITA BERDAKWAH

import { motion } from "framer-motion";
import { Phone, ArrowRight, HeartHandshake } from "lucide-react";
import { ResponsiveContainer, viewportOnce } from "@sakinah/ui";
import { SECTION_IDS } from "@/lib/constants";

const CONTACT_NUMBERS = [
  { label: "No. Tel. 1", phone: "017-338 3884", raw: "60173383884" },
  { label: "No. Tel. 2", phone: "012-600 3884", raw: "60126003884" },
  { label: "No. Tel. 3", phone: "011-5550 3884", raw: "601155503884" },
];

export function JomBerdakwahSection() {
  return (
    <section
      id={SECTION_IDS.point7}
      aria-label="Jom Kita Berdakwah"
      className="section-texture py-16 lg:py-24"
      style={{ background: "var(--color-brand-green)" }}
    >
      <ResponsiveContainer>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0"
                style={{ background: "var(--color-brand-gold-light)", color: "var(--color-brand-green-dark)" }}
              >
                <HeartHandshake className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                JOM KITA BERDAKWAH
              </h2>
            </div>

            <p className="text-base sm:text-lg text-white/90 font-medium leading-relaxed mb-6">
              Menyampaikan perkara yang baik itu dakwah. Beritahu pakej ini kepada keluarga dan kawan yang lain agar mereka juga mendapat manfaat.
            </p>

            <p className="text-base sm:text-lg text-white/90 font-medium leading-relaxed mb-6">
              Mungkin anda tidak memerlukannya tetapi orang lain sedang mencari dan sangat memerlukannya
            </p>

            <div
              className="rounded-2xl p-5 border mb-6"
              style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(243,182,1,0.35)" }}
            >
              <p className="text-xs font-black uppercase tracking-widest text-amber-300 mb-1">HUBUNGI KAMI</p>
              <p className="text-base sm:text-lg font-black text-white leading-snug mb-0.5">
                US HJ MOHD ZAINAL HJ KHAMIS
              </p>
              <p className="text-xs font-semibold text-white/65 uppercase tracking-wide">
                ALBARZAH ENTERPRISE &amp; BUMIJEZ SDN BHD
              </p>
            </div>

            {/* CTA */}
            {/* <a
              href={`#${SECTION_IDS.point8}`}
              className="hover-scale inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full py-3.5 px-8 text-sm font-black uppercase tracking-wide shadow-lg transition-all cursor-pointer"
              style={{
                background: "var(--color-brand-gold-light)",
                color: "var(--color-brand-green-dark)",
                boxShadow: "0 8px 28px rgba(243,182,1,0.4)",
              }}
              aria-label="Lihat pilihan pakej Albarzah"
            >
              LIHAT PAKEJ
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a> */}
          </motion.div>

          {/* Right: Phone numbers */}
          {/* <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-3"
          >
            <p className="text-xs font-black uppercase tracking-widest text-amber-300 mb-4">
              NO. TEL. UNTUK DIHUBUNGI
            </p>
            {CONTACT_NUMBERS.map(({ label, phone, raw }) => (
              <a
                key={raw}
                href={`tel:${raw}`}
                className="flex items-center justify-between w-full rounded-2xl px-5 py-4 border transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  borderColor: "rgba(255,255,255,0.15)",
                }}
                aria-label={`Hubungi ${label}: ${phone}`}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-0.5">{label}</p>
                  <p
                    className="text-xl sm:text-2xl font-black tabular-nums text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {phone}
                  </p>
                </div>
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full flex-shrink-0"
                  style={{ background: "var(--color-brand-gold-light)", color: "var(--color-brand-green-dark)" }}
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </div>
              </a>
            ))}
          </motion.div> */}
        </div>
      </ResponsiveContainer>
    </section>
  );
}
