"use client";
// File: src/components/sections/contact-section.tsx — Albarzah
// Contact info section (No form — registration is done per package modal)

import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, UserCheck, ShieldCheck } from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import { ResponsiveContainer, SectionHeading, cardReveal, staggerContainer, viewportOnce } from "@sakinah/ui";

const CONTACT_NUMBERS = [
  { label: "Hotline 24 Jam 1", phone: "011-1300 1999", rawPhone: "601113001999" },
  { label: "Hotline 24 Jam 2", phone: "011-1497 7733", rawPhone: "601114977733" },
];

const PENASIHAT_NUMBERS = [
  { label: "Talian 1", phone: "017-338 3884", rawPhone: "60173383884" },
  { label: "Talian 2", phone: "012-600 3884", rawPhone: "60126003884" },
  { label: "Talian 3", phone: "011-5550 3884", rawPhone: "601155503884" },
];

export function ContactSection() {
  return (
    <section
      id={SECTION_IDS.hubungi}
      aria-label="Hubungi Kami"
      className="section-texture py-16 lg:py-24"
      style={{ background: "var(--color-brand-cream)" }}
    >
      <ResponsiveContainer>
        <SectionHeading
          eyebrow="HUBUNGI KAMI"
          title="Perkhidmatan & Bantuan 24 Jam"
          subtitle="Sila hubungi kami untuk sebarang pertanyaan atau bantuan kecemasan pengurusan jenazah."
          align="center"
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Hotline 24 Jam Card */}
          <motion.div
            variants={cardReveal}
            className="rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-md"
            style={{
              background: "#fff",
              border: "1px solid var(--color-brand-border)",
            }}
          >
            <div>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl mb-6"
                style={{ background: "var(--color-brand-sage-soft)" }}
              >
                <Phone className="h-6 w-6" style={{ color: "var(--color-brand-green)" }} />
              </div>
              <p
                className="text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: "var(--color-brand-gold)" }}
              >
                BANTUAN KECEMASAN 24 JAM
              </p>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: "var(--color-brand-green-dark)", fontFamily: "var(--font-heading)" }}
              >
                Hotline Albarzah
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Perkhidmatan pengurusan jenazah lengkap & khairat kematian 24 jam sehari.
              </p>

              <div className="space-y-3">
                {CONTACT_NUMBERS.map((item) => (
                  <div key={item.rawPhone} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500 uppercase">{item.label}</p>
                      <p className="text-sm font-bold text-slate-800">{item.phone}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`tel:${item.rawPhone}`}
                        className="p-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                        title="Call"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://wa.me/${item.rawPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                        title="WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>Bumijez Sdn Bhd — Talian Bersedia 24/7</span>
            </div>
          </motion.div>

          {/* Penasihat & Konsultan Card */}
          <motion.div
            variants={cardReveal}
            className="rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-md"
            style={{
              background: "#fff",
              border: "1px solid var(--color-brand-border)",
            }}
          >
            <div>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl mb-6"
                style={{ background: "var(--color-brand-gold-soft)" }}
              >
                <UserCheck className="h-6 w-6" style={{ color: "var(--color-brand-gold)" }} />
              </div>
              <p
                className="text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: "var(--color-brand-gold)" }}
              >
                PENASIHAT & KONSULTAN
              </p>
              <h3
                className="text-xl font-bold mb-1"
                style={{ color: "var(--color-brand-green-dark)", fontFamily: "var(--font-heading)" }}
              >
                Us. Hj Mohd Zainal Hj Khamis
              </h3>
              <p className="text-xs font-medium text-slate-500 mb-6">
                Penasihat Perkhidmatan Pengurusan Jenazah Bumijez Sdn Bhd
              </p>

              <div className="space-y-3">
                {PENASIHAT_NUMBERS.map((item) => (
                  <div key={item.rawPhone} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500 uppercase">{item.label}</p>
                      <p className="text-sm font-bold text-slate-800">{item.phone}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`tel:${item.rawPhone}`}
                        className="p-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
                        title="Call"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://wa.me/${item.rawPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                        title="WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <MessageCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>Hubungi terus untuk nasihat & penerangan pakej</span>
            </div>
          </motion.div>

          {/* Pejabat & Alamat Card */}
          {/* <motion.div
            variants={cardReveal}
            className="rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-md md:col-span-2 lg:col-span-1"
            style={{
              background: "#fff",
              border: "1px solid var(--color-brand-border)",
            }}
          >
            <div>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl mb-6"
                style={{ background: "var(--color-brand-sage-soft)" }}
              >
                <MapPin className="h-6 w-6" style={{ color: "var(--color-brand-green)" }} />
              </div>
              <p
                className="text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: "var(--color-brand-gold)" }}
              >
                IBU PEJABAT
              </p>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: "var(--color-brand-green-dark)", fontFamily: "var(--font-heading)" }}
              >
                Bumijez Sdn Bhd
              </h3>
              <p className="text-sm font-semibold text-slate-800 mb-2">
                No 11, Tingkat 1, Jalan PP 2/1, Taman Putra Prima, 47130 Puchong, Selangor
              </p>
              <p className="text-xs text-slate-500 mb-6">
                Waktu Pejabat: Isnin - Jumaat (9:00 AM - 5:00 PM)
              </p>

              <div className="space-y-3">
                <a
                  href="mailto:info@bumijez.com.my"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors"
                >
                  <Mail className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase">E-mel Rasmi</p>
                    <p className="text-sm font-bold text-slate-800">info@bumijez.com.my</p>
                  </div>
                </a>

                <a
                  href="https://maps.google.com/?q=No+11+Tingkat+1+Jalan+PP+2/1+Taman+Putra+Prima+47130+Puchong+Selangor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                >
                  <MapPin className="h-4 w-4 text-emerald-700" />
                  <span>Buka Petunjuk Arah (Google Maps)</span>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 text-center">
              Dikelola oleh BUMIJEZ SDN BHD
            </div>
          </motion.div> */}
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
}
