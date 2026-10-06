"use client";

import { motion } from "framer-motion";
import { BookOpen, Star } from "lucide-react";
import { ResponsiveContainer } from "./responsive-container";
import { SectionHeading } from "./section-heading";
import { OrnamentalDivider } from "./ornamental-divider";
import { viewportOnce } from "../lib/motion";

const shariahPoints = [
  "Tiada unsur riba (faedah berganda)",
  "Tiada unsur gharar (ketidaktentuan melampau)",
  "Tiada unsur maisir (perjudian)",
  "Berasaskan tolong-menolong (ta'awun)",
  "Pengurusan dana mengikut prinsip syariah",
];

export interface ShariahSectionProps {
  /** Module/product name, used in the subtitle and disclaimer */
  moduleName: string;
  /**
   * Controls the colour palette of the divider and compliance tags.
   * - "dark"  → white divider + semi-transparent white tags  (default, for dark green BG)
   * - "light" → gold divider + white solid tags (for lighter-tinted BG)
   */
  variant?: "dark" | "light";
}

export function ShariahSection({
  moduleName,
  variant = "dark",
}: ShariahSectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      id="syariah"
      aria-label="Prinsip Syariah"
      className="py-16 lg:py-24"
      style={{
        background: "var(--color-brand-green)",
        color: isDark ? "#fff" : "var(--color-brand-text)",
        backgroundImage: isDark
          ? "radial-gradient(circle at 20% 80%, rgba(191,168,0,0.12) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)"
          : "radial-gradient(circle at 20% 80%, rgba(253,242,103,0.12) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)",
      }}
    >
      <ResponsiveContainer>
        <SectionHeading
          eyebrow="Patuh Syariah"
          title="Skim Berteraskan Prinsip Islam"
          subtitle={`${moduleName} dibangunkan berdasarkan nilai-nilai Islam — patuh syariah dengan sokongan Jabatan Mufti Negeri Selangor.`}
          className={`mb-12${isDark ? " [&_h2]:text-white [&_p]:!text-white/80" : ""}`}
          variant="white"
        />

        {/* Shariah compliance checklist */}
        <OrnamentalDivider className="mb-8" variant={isDark ? "white" : "gold"} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center"
        >
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2 shadow-sm"
            style={{
              background: "var(--color-brand-gold)",
              color: isDark ? "var(--color-brand-green-dark)" : "var(--color-white)",
            }}
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm font-bold">Elemen Syariah Dipatuhi</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {shariahPoints.map((point, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs shadow-sm ${isDark ? "font-medium" : "font-semibold"}`}
                style={
                  isDark
                    ? {
                        background: "rgba(255,255,255,0.10)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#fff",
                      }
                    : {
                        background: "rgba(255, 255, 255, 0.90)",
                        border: "1px solid var(--color-brand-border)",
                        color: "var(--color-brand-text)",
                      }
                }
              >
                <Star
                  className="h-3 w-3"
                  aria-hidden="true"
                  style={{
                    color: isDark
                      ? "var(--color-brand-gold-light)"
                      : "var(--color-brand-green-dark)",
                  } as React.CSSProperties}
                />
                {point}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center text-xs font-medium leading-relaxed"
          style={{ color: isDark ? "rgba(255,255,255,0.45)" : "var(--color-brand-text-muted)" }}
        >
          * Maklumat pematuhan syariah ini adalah berdasarkan prinsip am. Sila rujuk pihak{" "}
          {moduleName} atau jawatankuasa syariah yang dilantik untuk pengesahan rasmi.
        </motion.p>
      </ResponsiveContainer>
    </section>
  );
}
