"use client";
// File: src/components/sections/assistance-process-section.tsx
// Albarzah — 3-step registration process matching Bumijez flow

import { motion } from "framer-motion";
import { Search, FileText, CreditCard } from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import { ResponsiveContainer } from "@sakinah/ui";
import { SectionHeading } from "@sakinah/ui";
import { staggerContainer, cardReveal, viewportOnce } from "@sakinah/ui";

const steps = [
  {
    step: "Langkah 1",
    icon: Search,
    title: "Pilih Pelan",
    description:
      "Baca dengan teliti setiap pakej yang disediakan, dan pilih pakej yang memenuhi keperluan anda dan keluarga.",
  },
  {
    step: "Langkah 2",
    icon: FileText,
    title: "Isi Borang",
    description:
      "Lengkapkan borang pendaftaran dalam talian dengan maklumat peribadi anda. Proses mudah dan pantas — kurang dari 5 minit.",
  },
  {
    step: "Langkah 3",
    icon: CreditCard,
    title: "Pembayaran",
    description:
      "Pilih kaedah pembayaran pakej keahlian pilihan. Setelah berjaya, resit dan butiran keahlian akan diemailkan terus kepada anda.",
  },
];

export function AssistanceProcessSection() {
  return (
    <section
      id={SECTION_IDS.proses}
      aria-label="Cara Mendaftar"
      className="py-16 lg:py-24"
      style={{ background: "var(--color-brand-green-dark)" }}
    >
      <ResponsiveContainer>
        <SectionHeading
          eyebrow="Bagaimana Caranya?"
          title="Cara Mudah Untuk Mendaftar Menjadi Ahli"
          subtitle="Proses pendaftaran yang mudah dan pantas — siap dalam 3 langkah sahaja"
          className="mb-14"
          variant="white"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                variants={cardReveal}
                className="relative flex flex-col rounded-3xl p-8 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                }}
                whileHover={{
                  background: "rgba(255,255,255,0.12)",
                  y: -4,
                }}
              >
                {/* Step number */}
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold mb-6 self-start"
                  style={{
                    background: "var(--color-brand-gold-light)",
                    color: "var(--color-brand-green-dark)",
                  }}
                >
                  {step.step}
                </div>

                {/* Icon */}
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl mb-5"
                  style={{ background: "rgba(0,179,15,0.18)" }}
                >
                  <Icon
                    className="h-7 w-7"
                    style={{ color: "var(--color-brand-green-light)" }}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "#fff", fontFamily: "var(--font-heading)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  {step.description}
                </p>

                {/* Connector arrow (not on last item) */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 text-2xl z-10"
                    style={{ color: "var(--color-brand-gold-light)" }}
                    aria-hidden="true"
                  >
                    →
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href={`#${SECTION_IDS.hubungi}`}
            className="hover-scale inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold shadow-lg transition-all"
            style={{
              background: "var(--color-brand-gold-light)",
              color: "var(--color-brand-green-dark)",
            }}
          >
            Daftar Jadi Ahli Sekarang
          </a>
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
}
