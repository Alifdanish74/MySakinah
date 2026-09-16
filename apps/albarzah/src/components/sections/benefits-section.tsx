"use client";
// File: src/components/sections/benefits-section.tsx — Albarzah
// Per-pakej benefit breakdown with tab selector (RM80 | RM120 | RM180 | RM240)

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import { packages } from "@/data/packages";
import { ResponsiveContainer } from "@sakinah/ui";
import { SectionHeading } from "@sakinah/ui";
import { OrnamentalDivider } from "@sakinah/ui";
import { staggerContainer, cardReveal, viewportOnce } from "@sakinah/ui";

// Tab labels mapped to plan IDs
const TABS = packages.map((pkg) => ({
  id: pkg.id,
  label: `RM${pkg.yearlyFee}`,
  subLabel: pkg.dailyRate + "/hari",
  recommended: pkg.recommended,
}));

export function BenefitsSection() {
  const [activeTab, setActiveTab] = useState(packages[0].id);

  const activePkg = packages.find((p) => p.id === activeTab) ?? packages[0];

  return (
    <section
      id={SECTION_IDS.manfaat}
      aria-label="Manfaat Pakej Albarzah"
      className="section-texture py-16 lg:py-24"
      style={{ background: "var(--color-brand-cream)" }}
    >
      <ResponsiveContainer>
        <SectionHeading
          eyebrow="MANFAAT PAKEJ INDIVIDU"
          title="Butiran Manfaat Perlindungan Mengikut Pakej"
          subtitle="Semak senarai penuh manfaat bagi Meninggal Biasa dan Berlaku Kemalangan untuk setiap pakej."
          className="mb-10"
        />

        {/* ── Plan Tab Selector ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <div
            className="inline-flex rounded-2xl p-1.5 gap-1"
            style={{
              background: "#fff",
              border: "1.5px solid var(--color-brand-border)",
            }}
            role="tablist"
            aria-label="Pilih pakej"
          >
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className="relative flex flex-col items-center justify-center rounded-xl px-4 py-2.5 transition-all duration-250 cursor-pointer min-w-[72px]"
                  style={
                    isActive
                      ? {
                          background: "var(--color-brand-green)",
                          color: "#fff",
                        }
                      : {
                          background: "transparent",
                          color: "var(--color-brand-text-muted)",
                        }
                  }
                >
                  {tab.recommended && (
                    <span
                      className="absolute -top-2 -right-1 text-[9px] font-black rounded-full px-1.5 py-0.5 leading-none"
                      style={{
                        background: "var(--color-brand-gold-light)",
                        color: "var(--color-brand-green-dark)",
                      }}
                    >
                      TERBAIK
                    </span>
                  )}
                  <span className="text-sm font-black leading-none">
                    {tab.label}
                  </span>
                  <span
                    className="text-[10px] font-semibold mt-0.5 opacity-70"
                  >
                    {tab.subLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Benefits Panel ────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            {activePkg.benefitGroups.map((group, gi) => {
              const isAccident = gi === 1; // second group = kemalangan
              return (
                <div
                  key={group.label}
                  className="rounded-2xl overflow-hidden border"
                  style={{
                    borderColor: isAccident
                      ? "var(--color-brand-gold)"
                      : "var(--color-brand-border)",
                    background: "#fff",
                    boxShadow: "0 4px 24px rgba(0,71,60,0.06)",
                  }}
                >
                  {/* Group header */}
                  <div
                    className="flex items-center gap-3 px-6 py-4"
                    style={{
                      background: isAccident
                        ? "var(--color-brand-green)"
                        : "var(--color-brand-green-dark)",
                    }}
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.12)" }}
                    >
                      {isAccident ? (
                        <Zap
                          className="h-4 w-4 text-white"
                          aria-hidden="true"
                        />
                      ) : (
                        <ShieldCheck
                          className="h-4 w-4 text-white"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <h3
                      className="text-sm font-bold text-white uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {group.label}
                    </h3>
                  </div>

                  {/* Benefit items */}
                  <div className="divide-y" style={{ borderColor: "var(--color-brand-border)" }}>
                    {group.items.map((item, ii) => (
                      <motion.div
                        key={item.no}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: ii * 0.06 }}
                        className="flex items-start gap-4 px-5 py-4"
                      >
                        {/* Number badge */}
                        <span
                          className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-xs font-black mt-0.5"
                          style={{
                            background: isAccident
                              ? "rgba(243,182,1,0.15)"
                              : "rgba(0,71,60,0.1)",
                            color: isAccident
                              ? "var(--color-brand-gold)"
                              : "var(--color-brand-green)",
                          }}
                        >
                          {item.no}
                        </span>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-semibold leading-snug"
                            style={{ color: "var(--color-brand-text)" }}
                          >
                            {item.label}
                          </p>
                          {(item.timeline || item.detail) && (
                            <div className="mt-1 flex flex-wrap gap-1.5">
                              {item.timeline && (
                                <span
                                  className="text-[11px] font-semibold rounded-full px-2 py-0.5"
                                  style={{
                                    background: isAccident
                                      ? "rgba(243,182,1,0.12)"
                                      : "var(--color-brand-sage-soft)",
                                    color: isAccident
                                      ? "var(--color-brand-gold)"
                                      : "var(--color-brand-green)",
                                  }}
                                >
                                  {item.timeline}
                                </span>
                              )}
                              {item.detail && (
                                <span
                                  className="text-[11px] text-slate-400 font-medium"
                                >
                                  {item.detail}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Value */}
                        <span
                          className="flex-shrink-0 text-base font-black tabular-nums"
                          style={{
                            color: isAccident
                              ? "var(--color-brand-gold)"
                              : "var(--color-brand-green)",
                          }}
                        >
                          {item.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Group subtotal */}
                  {group.total && (
                    <div
                      className="flex items-center justify-between px-5 py-3"
                      style={{
                        background: isAccident
                          ? "rgba(243,182,1,0.06)"
                          : "var(--color-brand-sage-soft)",
                        borderTop: `1px solid ${isAccident ? "rgba(243,182,1,0.2)" : "var(--color-brand-border)"}`,
                      }}
                    >
                      <p
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{
                          color: isAccident
                            ? "var(--color-brand-gold)"
                            : "var(--color-brand-text-muted)",
                        }}
                      >
                        Jumlah {group.label}
                      </p>
                      <p
                        className="text-base font-black tabular-nums"
                        style={{
                          color: isAccident
                            ? "var(--color-brand-gold)"
                            : "var(--color-brand-green-dark)",
                        }}
                      >
                        {group.total}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── Grand Total + CTA ────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`total-${activeTab}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className="max-w-2xl mx-auto"
          >
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl px-8 py-6"
              style={{
                background: "var(--color-brand-green)",
                border: "2px solid var(--color-brand-gold-light)",
                boxShadow: "0 12px 40px rgba(0,71,60,0.22)",
              }}
            >
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Jumlah Keseluruhan Manfaat
                </p>
                <p
                  className="text-4xl font-black text-white tabular-nums"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {activePkg.totalManfaat}
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  untuk Pakej {activePkg.name}
                </p>
              </div>

              <motion.a
                href={`#${SECTION_IDS.hubungi}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold flex-shrink-0 cursor-pointer"
                style={{
                  background: "var(--color-brand-gold-light)",
                  color: "var(--color-brand-green-dark)",
                }}
                aria-label={`Daftar pakej ${activePkg.name}`}
              >
                Daftar Sekarang
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Ornamental divider */}
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
