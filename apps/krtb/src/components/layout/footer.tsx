"use client";
// File: src/components/layout/footer.tsx
// Weddingcard-matched footer: ornamental divider before footer, large display brand name,
// whileInView entrance for footer content

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { ResponsiveContainer, OrnamentalDivider, viewportOnce } from "@sakinah/ui";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "var(--color-brand-green)",
      backgroundImage:
          "radial-gradient(circle at 50% 0%, rgba(44,44,132,0.18) 0%, transparent 60%)",
        color: "#fff",
      }}
      role="contentinfo"
    >
      {/* Weddingcard Border.svg ornamental divider at top of footer */}
      <div className="pt-2">
        <OrnamentalDivider className="mx-auto max-w-2xl px-6 py-4" variant="white" />
      </div>

      <ResponsiveContainer className="py-10 lg:py-14">
        {/* Brand display — Weddingcard large italic brand center treatment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1.0 }}
          className="mb-10 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold"
              style={{ background: "var(--color-brand-green-dark)", color: "var(--color-brand-text)" }}
              aria-hidden="true"
            >
              KR
            </div>
            <h2
              className="display-heading-white"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              {BRAND.name}
            </h2>
          </div>
          <p
            className="eyebrow-cinzel text-[0.625rem]"
            style={{ color: "var(--color-brand-gold-light)", letterSpacing: "0.22em" }}
          >
            {BRAND.product}
          </p>
          <p
            className="mx-auto mt-3 max-w-sm text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.60)" }}
          >
            {BRAND.description}
          </p>

          {/* Hotline CTA */}
          <div className="mt-5 flex justify-center">
            <a
              href={BRAND.hotlineTel}
              className="hover-scale inline-flex items-center gap-3 rounded-full px-6 py-3"
              style={{
                background: "rgba(230,0,0,0.18)",
                border: "1px solid rgba(230,0,0,0.30)",
              }}
              aria-label={`Telefon hotline: ${BRAND.hotline}`}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: "var(--color-brand-gold)" }}
              >
                <Phone className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <div className="text-left">
                <p
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Hotline 24 Jam
                </p>
                <p
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-gold-light)" }}
                >
                  {BRAND.hotline}
                </p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div
          className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center text-xs sm:flex-row"
          style={{
            borderColor: "rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          <p>&copy; {year} KRTB Care. Hak cipta terpelihara.</p>
          <p>Dibangunkan untuk {BRAND.product}</p>
        </div>
      </ResponsiveContainer>
    </footer>
  );
}
