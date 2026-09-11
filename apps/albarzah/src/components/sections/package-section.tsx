"use client";
// File: src/components/sections/package-section.tsx
// Albarzah — simplified 2-plan yearly pricing (no category tabs)

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Star, ArrowRight, Calendar } from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import { packages } from "@/data/packages";
import { ResponsiveContainer } from "@sakinah/ui";
import { SectionHeading } from "@sakinah/ui";
import { staggerContainer, cardReveal, viewportOnce } from "@sakinah/ui";

interface PackageSectionProps {
  onSelectPackage?: (packageId: string) => void;
}

export function PackageSection({ onSelectPackage }: PackageSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const scrollToContact = (packageId: string) => {
    if (onSelectPackage) onSelectPackage(packageId);
    const el = document.getElementById(SECTION_IDS.hubungi);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id={SECTION_IDS.pakej}
      aria-label="Pakej Albarzah"
      className="section-texture py-16 lg:py-24"
      style={{ background: "var(--color-brand-ivory)" }}
    >
      <ResponsiveContainer>
        <SectionHeading
          eyebrow="Pakej Keahlian"
          title="Pilih Pelan Yang Sesuai"
          subtitle="Dua pilihan mudah dengan perlindungan jenazah komprehensif — terbuka untuk semua warganegara Malaysia"
          className="mb-12"
        />

        {/* Yearly badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold"
            style={{
              background: "var(--color-brand-green)",
              color: "#fff",
            }}
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            Bayaran Tahunan — Nilai Terbaik
          </div>
        </motion.div>

        {/* 2-Plan Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {packages.map((pkg) => {
            const isHovered = hoveredId === pkg.id;
            const isRecommended = !!pkg.recommended;

            return (
              <motion.div
                key={pkg.id}
                variants={cardReveal}
                onMouseEnter={() => setHoveredId(pkg.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300"
                style={{
                  background: isRecommended
                    ? "var(--color-brand-green)"
                    : "#fff",
                  border: isRecommended
                    ? "2px solid var(--color-brand-gold-light)"
                    : "1.5px solid var(--color-brand-border)",
                  boxShadow: isHovered
                    ? "0 20px 60px rgba(0,71,60,0.22)"
                    : "0 4px 24px rgba(0,71,60,0.08)",
                  transform: isHovered ? "translateY(-6px)" : "none",
                }}
              >
                {/* Recommended badge */}
                {isRecommended && (
                  <div
                    className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                    style={{
                      background: "var(--color-brand-gold-light)",
                      color: "var(--color-brand-green-dark)",
                    }}
                  >
                    <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                    Disyorkan
                  </div>
                )}

                {/* Plan header */}
                <div className="p-8 pb-6">
                  <h3
                    className="text-2xl font-bold mb-1"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: isRecommended ? "#fff" : "var(--color-brand-green-dark)",
                    }}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className="text-sm mb-6"
                    style={{
                      color: isRecommended ? "rgba(255,255,255,0.75)" : "var(--color-brand-text-muted)",
                    }}
                  >
                    {pkg.eligibility}
                  </p>

                  {/* Price */}
                  <div className="flex items-end gap-2 mb-2">
                    <span
                      className="text-5xl font-black"
                      style={{
                        color: isRecommended ? "#fff" : "var(--color-brand-green)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      RM{pkg.yearlyFee}
                    </span>
                    <span
                      className="text-base font-semibold pb-1.5"
                      style={{
                        color: isRecommended ? "rgba(255,255,255,0.75)" : "var(--color-brand-text-muted)",
                      }}
                    >
                      /tahun
                    </span>
                  </div>
                  <p
                    className="text-xs font-medium mb-6"
                    style={{
                      color: isRecommended ? "rgba(255,255,255,0.65)" : "var(--color-brand-text-muted)",
                    }}
                  >
                    ≈ RM{(pkg.yearlyFee / 12).toFixed(2)} sebulan
                  </p>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => scrollToContact(pkg.id)}
                    className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-all"
                    style={
                      isRecommended
                        ? {
                            background: "var(--color-brand-gold-light)",
                            color: "var(--color-brand-green-dark)",
                          }
                        : {
                            background: "var(--color-brand-green)",
                            color: "#fff",
                          }
                    }
                  >
                    Daftar Sekarang
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </motion.button>
                </div>

                {/* Divider */}
                <div
                  className="mx-8 h-px"
                  style={{
                    background: isRecommended
                      ? "rgba(255,255,255,0.2)"
                      : "var(--color-brand-border)",
                  }}
                />

                {/* Benefits list */}
                <div className="p-8 pt-6 flex-1">
                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-4"
                    style={{
                      color: isRecommended ? "rgba(255,255,255,0.6)" : "var(--color-brand-text-muted)",
                    }}
                  >
                    Manfaat Perlindungan
                  </p>
                  <ul className="space-y-3 mb-6">
                    {pkg.benefits.map((b) => (
                      <li key={b.label} className="flex items-start gap-3">
                        <CheckCircle2
                          className="h-4 w-4 flex-shrink-0 mt-0.5"
                          style={{
                            color: isRecommended
                              ? "var(--color-brand-gold-light)"
                              : "var(--color-brand-green-light)",
                          }}
                          aria-hidden="true"
                        />
                        <div>
                          <span
                            className="text-sm font-semibold"
                            style={{
                              color: isRecommended ? "#fff" : "var(--color-brand-text)",
                            }}
                          >
                            {b.label}
                          </span>
                          <span
                            className="text-sm ml-1"
                            style={{
                              color: isRecommended
                                ? "rgba(255,255,255,0.75)"
                                : "var(--color-brand-text-muted)",
                            }}
                          >
                            — {b.value}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Details */}
                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-3"
                    style={{
                      color: isRecommended ? "rgba(255,255,255,0.6)" : "var(--color-brand-text-muted)",
                    }}
                  >
                    Maklumat Lanjut
                  </p>
                  <ul className="space-y-2">
                    {pkg.details.map((d) => (
                      <li
                        key={d}
                        className="text-xs flex items-start gap-2"
                        style={{
                          color: isRecommended ? "rgba(255,255,255,0.7)" : "var(--color-brand-text-muted)",
                        }}
                      >
                        <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full"
                          style={{ background: isRecommended ? "rgba(255,255,255,0.5)" : "var(--color-brand-green-light)" }}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.4 }}
          className="text-center text-sm mt-10"
          style={{ color: "var(--color-brand-text-muted)" }}
        >
          Semua pelan tertakluk kepada syarat dan terma Bumijez Sdn Bhd. Hubungi kami untuk maklumat lanjut.
        </motion.p>
      </ResponsiveContainer>
    </section>
  );
}
