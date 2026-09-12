"use client";
// File: src/components/sections/contact-section.tsx
// Weddingcard-matched: card-elevated form surface, hover animations on contact links,
// stagger entrance for contact options (Weddingcard modal bottom-sheet surface feel)

import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { BRAND, SECTION_IDS } from "@/lib/constants";
import { ResponsiveContainer } from "@sakinah/ui";
import { SectionHeading } from "@sakinah/ui";
import { staggerContainer, cardReveal, viewportOnce } from "@sakinah/ui";

interface ContactSectionProps {
  preselectedPackage?: string;
}

export function ContactSection(_props: ContactSectionProps) {
  return (
    <section
      id={SECTION_IDS.hubungi}
      aria-label="Hubungi Kami"
      className="section-texture py-16 lg:py-24"
      style={{ background: "var(--color-brand-cream)" }}
    >
      <ResponsiveContainer>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <SectionHeading
              eyebrow="Hubungi Kami"
              title="Kami Sedia Membantu Anda"
              subtitle="Untuk bantuan dan pertanyaan, sila hubungi kami"
              align="left"
              className="mb-8"
            />

            {/* Contact options */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-4"
            >
              {[
                {
                  icon: Phone,
                  label: "Telefon Pejabat",
                  value: "03 4042 7766",
                  href: "tel:0340427766",
                  sublabel: "Koperasi Telekom Malaysia Berhad (Kota Mas)",
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp 24 Jam",
                  value: BRAND.hotline_whatsapp,
                  href: `https://wa.me/601113001999`,
                  sublabel: "Bumijez Sdn Bhd - Talian 24 Jam",
                },
                {
                  icon: Mail,
                  label: "E-mel Kota Mas",
                  value: "admin@KotaMas.com.my",
                  href: "mailto:admin@KotaMas.com.my",
                  sublabel: "Pertanyaan am & keahlian",
                },
              ].map(({ icon: Icon, label, value, href, sublabel }) => (
                <motion.a
                  key={href}
                  variants={cardReveal}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 rounded-xl p-4 transition-shadow hover:shadow-card"
                  style={{
                    background: "#fff",
                    border: "1px solid var(--color-brand-border)",
                    display: "flex",
                  }}
                >
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "var(--color-brand-sage-soft)" }}
                  >
                    <Icon
                      className="h-5 w-5"
                      aria-hidden="true"
                      style={{ color: "var(--color-brand-green)" } as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-brand-gold)" }}>
                      {label}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-brand-text)" }}>
                      {value}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-brand-text-muted)" }}>
                      {sublabel}
                    </p>
                  </div>
                </motion.a>
              ))}

              {/* Official Office Addresses */}
              <div className="pt-4 border-t space-y-4 text-xs text-slate-600" style={{ borderColor: "var(--color-brand-border)" }}>
                <div className="rounded-xl p-4 bg-white border border-slate-200 shadow-sm space-y-1.5">
                  <p className="font-bold text-green-900 text-xs tracking-wide">
                    KOPERASI TELEKOM MALAYSIA BERHAD (KOTA MAS)
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    No. 94, Tingkat 3, Wisma Kota Mas, Kompleks Damai,<br />
                    Jalan Dato&apos; Haji Eusoff, 50400 Kuala Lumpur.
                  </p>
                  <div className="pt-1 text-slate-700 font-medium space-y-1">
                    <p><span className="font-semibold text-slate-900">Tel:</span> <a href="tel:0340427766" className="hover:underline text-emerald-800 font-semibold">03 4042 7766</a> (Pejabat)</p>
                    <p><span className="font-semibold text-slate-900">Email:</span> <a href="mailto:admin@KotaMas.com.my" className="hover:underline text-emerald-800 font-semibold">admin@KotaMas.com.my</a></p>
                  </div>
                </div>

                <div className="rounded-xl p-4 bg-white border border-slate-200 shadow-sm space-y-1.5">
                  <p className="font-bold text-green-900 text-xs tracking-wide">
                    BUMIJEZ SDN BHD (863050-K)
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    No 11, Tingkat 1, Jalan PP 2/1,<br />
                    Taman Putra Prima, 47130 Puchong, Selangor.
                  </p>
                  <div className="pt-1 text-slate-700 font-medium space-y-1">
                    <p><span className="font-semibold text-slate-900">Tel:</span> <a href="https://wa.me/601113001999" target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-800 font-semibold">011-1300-1999</a> (Talian WhatsApp 24 Jam)</p>
                    <p><span className="font-semibold text-slate-900">Email:</span> <a href="mailto:info@bumijez.com.my" className="hover:underline text-emerald-800 font-semibold">info@bumijez.com.my</a></p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}
