"use client";
// File: src/components/sections/introduction-section.tsx — Albarzah

import { motion } from "framer-motion";
import { PhoneCall, HeartHandshake, MapPin, CheckCircle, Sparkles } from "lucide-react";
import { BRAND, SECTION_IDS } from "@/lib/constants";
import { ResponsiveContainer, SectionHeading, OrnamentalDivider, SopProcessFlow } from "@sakinah/ui";
import { staggerContainer, riseUp, viewportOnce } from "@sakinah/ui";

const modusOperandiSteps = [
  {
    step: "1",
    title: "Waris Menghubungi Hotline 24 Jam",
    detail: "Hubungi talian beroperasi 24 Jam: 011-1300 1999 untuk memohon bantuan serta-merta.",
    icon: PhoneCall,
  },
  {
    step: "2",
    title: "Pengurus Jenazah Ke Lokasi",
    detail: "Pasukan pengurus jenazah akan terus ke lokasi yang diminta waris (rumah atau hospital).",
    icon: MapPin,
  },
  {
    step: "3",
    title: "Pengurusan Jenazah Secara Tertib",
    detail: "Kelengkapan dan urusan mandian, kafan, serta solat jenazah diuruskan dengan sempurna.",
    icon: HeartHandshake,
  },
  {
    step: "4",
    title: "Pengkebumian Dipastikan Sempurna",
    detail: "Urusan pengebumian diselesaikan dengan penuh penghormatan dan mematuhi syarak.",
    icon: CheckCircle,
  },
];

export function IntroductionSection() {
  return (
    <section
      id={SECTION_IDS.langgan}
      aria-label="Pengenalan Albarzah"
      className="section-texture py-16 lg:py-24"
      style={{ background: "#fff" }}
    >
      <ResponsiveContainer>
        <SectionHeading
          eyebrow="Pengenalan Skim"
          title="Khidmat Pengurusan Jenazah & Khairat Kematian Untuk Orang Awam"
          subtitle="Albarzah menyediakan khidmat pengurusan jenazah lengkap terus ke lokasi yang diminta waris (rumah atau hospital). Perlindungan merangkumi seluruh Malaysia termasuk Sabah dan Sarawak."
          subtitle2="Khidmat Pengurusan Jenazah Lengkap meliputi: 1. Bantuan Nasihat 2. Memandikan Jenazah 3. Mengkafankan Jenazah 4. Menguruskan Solat Jenazah 5. Khidmat Van Jenazah 6. Menguruskan Pengkebumian"
          className="mb-12"
        />

        {/* Intro Highlight Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mb-14 rounded-2xl p-6 sm:p-8 border shadow-sm text-center md:text-left flex flex-col md:flex-row items-center gap-6"
          style={{
            background: "var(--color-brand-sage-soft)",
            borderColor: "var(--color-brand-border)",
          }}
        >
          <div
            className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl"
            style={{ background: "var(--color-brand-green)" }}
          >
            <Sparkles className="h-8 w-8 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3
              className="text-lg sm:text-xl font-bold mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green)" }}
            >
              Kemudahan Tanpa Bebanan Kos Pada Hari Kejadian
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Pihak waris <strong>tidak perlu menyediakan kelengkapan</strong> pengurusan jenazah pada hari kejadian dan <strong>tidak perlu membayar kos semasa</strong> yang terlibat. Talian hotline 24 Jam{" "}
              <a href={BRAND.hotlineTel} className="font-bold underline" style={{ color: "var(--color-brand-green)" }}>
                {BRAND.hotline}
              </a>{" "}
              sedia membantu 24 jam sehari, 7 hari seminggu.
            </p>
          </div>
        </motion.div>

        {/* Modus Operandi */}
        <div className="text-center mb-10">
          <h3
            className="text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green)" }}
          >
            Modus Operandi Bantuan (SOP 4-Langkah)
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Proses bantuan pantas dan sistematik dari mula hingga selesai
          </p>
        </div>

        {/* Shared SOP 4-Step Visual Flow Diagram */}
        <SopProcessFlow />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16"
        >
          {modusOperandiSteps.map((stepItem) => {
            const IconComp = stepItem.icon;
            return (
              <motion.div
                key={stepItem.step}
                variants={riseUp}
                className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{ borderColor: "var(--color-brand-border)" }}
              >
                <div
                  className="relative flex h-40 w-full items-center justify-center"
                  style={{ background: "var(--color-brand-green)" }}
                >
                  <IconComp className="h-16 w-16 text-white/70" aria-hidden="true" />
                  <div
                    className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shadow-md"
                    style={{ background: "var(--color-brand-gold-light)", color: "var(--color-brand-green-dark)" }}
                  >
                    {stepItem.step}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h4
                    className="mb-2 text-base font-bold leading-snug"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green)" }}
                  >
                    {stepItem.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stepItem.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Pelengkap Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-6 sm:p-8 border flex flex-col justify-between"
            style={{
              background: "var(--color-brand-sage-soft)",
              borderColor: "var(--color-brand-border)",
            }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-6 w-6" style={{ color: "var(--color-brand-gold)" }} />
                <h4
                  className="text-lg font-bold uppercase tracking-wide text-xs"
                  style={{ color: "var(--color-brand-green)" }}
                >
                  Pelengkap Kepada Khairat Kematian
                </h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Albarzah <strong>tidak mengganggu / menggantikan</strong> khidmat khairat tempatan di surau, masjid atau jabatan (jika ada) — ia membantu <strong>menambah manfaat</strong> dan meringankan beban tanggungjawab waris, terutamanya dari segi kos serta memastikan pengurusan berjalan lancar.
              </p>
            </div>
          </motion.div>

          {/* Pricing Teaser Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-6 sm:p-8 border flex flex-col justify-between text-white"
            style={{
              background: "var(--color-brand-green)",
              borderColor: "var(--color-brand-green-dark)",
            }}
          >
            <div>
              <span
                className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider mb-4"
                style={{ background: "rgba(243,182,1,0.2)", color: "var(--color-brand-gold-light)" }}
              >
                Keahlian Tahunan
              </span>
              <h4
                className="text-xl sm:text-2xl font-bold mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Serendah RM80.00 Setahun
              </h4>
              <p className="text-sm leading-relaxed text-white/85">
                Terbuka kepada semua warganegara Malaysia berumur 1 hingga 69 tahun — tanpa pemeriksaan kesihatan. Nikmati perlindungan jenazah komprehensif dengan bayaran tahunan yang berpatutan.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <OrnamentalDivider className="mt-14" label="Albarzah" />
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
}
