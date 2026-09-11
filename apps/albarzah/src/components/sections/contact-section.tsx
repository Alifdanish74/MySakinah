"use client";
// File: src/components/sections/contact-section.tsx — Albarzah
// General public enquiry form — no parent protection add-on

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Phone, MessageCircle, Mail, AlertCircle } from "lucide-react";
import { cn } from "@sakinah/ui";
import { BRAND, SECTION_IDS } from "@/lib/constants";
import { enquirySchema, type EnquiryFormData } from "@/lib/validations";
import { packages } from "@/data/packages";
import { ResponsiveContainer } from "@sakinah/ui";
import { SectionHeading } from "@sakinah/ui";
import { FormField } from "@sakinah/ui";
import { staggerContainer, cardReveal, viewportOnce } from "@sakinah/ui";

type FormStatus = "idle" | "loading" | "success" | "error";

interface ContactSectionProps {
  preselectedPackage?: string;
}

export function ContactSection({ preselectedPackage }: ContactSectionProps) {
  const [status, setStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<EnquiryFormData, any, EnquiryFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(enquirySchema) as any,
    defaultValues: {
      pakej: preselectedPackage || "",
      kaedahHubungi: "whatsapp",
      persetujuan: undefined,
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Ralat pelayan");
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

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
              subtitle="Tinggalkan maklumat anda dan pegawai Albarzah akan menghubungi anda dalam masa terdekat."
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
                  icon: MessageCircle,
                  label: "WhatsApp 24 Jam",
                  value: BRAND.hotline_whatsapp,
                  href: `https://wa.me/601114977733`,
                  sublabel: "Talian perkhidmatan & sokongan",
                },
                {
                  icon: Phone,
                  label: "Hotline 24 Jam (Bumijez)",
                  value: BRAND.hotline,
                  href: BRAND.hotlineTel,
                  sublabel: "Bumijez Sdn Bhd — Bantuan kecemasan 24 jam",
                },
                {
                  icon: Mail,
                  label: "E-mel Bumijez",
                  value: "info@bumijez.com.my",
                  href: "mailto:info@bumijez.com.my",
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

              {/* Office Address */}
              <div className="pt-4 border-t space-y-3 text-xs text-slate-600">
                <div className="rounded-xl p-3 bg-white border border-slate-200">
                  <p className="font-bold text-xs mb-1" style={{ color: "var(--color-brand-green-dark)" }}>
                    BUMIJEZ SDN BHD
                  </p>
                  <p>No 11, Tingkat 1, Jalan PP 2/1, Taman Putra Prima, 47130 Puchong, Selangor</p>
                  <p className="mt-1 font-semibold text-slate-700">Email: info@bumijez.com.my</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div
              className="card-elevated rounded-3xl p-8"
              style={{ background: "#fff" }}
            >
              <h3
                className="text-2xl font-bold mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-brand-green-dark)",
                }}
              >
                Borang Pertanyaan
              </h3>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-12 text-center"
                >
                  <CheckCircle2
                    className="h-16 w-16"
                    style={{ color: "var(--color-brand-green-light)" }}
                  />
                  <h4 className="text-xl font-bold" style={{ color: "var(--color-brand-green-dark)" }}>
                    Terima kasih!
                  </h4>
                  <p className="text-sm" style={{ color: "var(--color-brand-text-muted)" }}>
                    Pertanyaan anda telah berjaya dihantar. Pegawai kami akan menghubungi anda dalam masa terdekat.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 rounded-full px-6 py-2 text-sm font-semibold"
                    style={{ background: "var(--color-brand-green)", color: "#fff" }}
                  >
                    Hantar Lagi
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

                  {/* Package select */}
                  <FormField
                    label="Pakej Yang Diminati"
                    id="pakej"
                    error={errors.pakej?.message}
                    required
                  >
                    <select
                      id="pakej"
                      {...register("pakej")}
                      className={cn("form-input", errors.pakej && "error")}
                    >
                      <option value="">-- Pilih Pakej --</option>
                      {packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} — RM{pkg.yearlyFee}/tahun
                        </option>
                      ))}
                    </select>
                  </FormField>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <FormField label="Nama Penuh" id="nama" error={errors.nama?.message} required>
                      <input
                        id="nama"
                        type="text"
                        autoComplete="name"
                        placeholder="Nama seperti dalam IC"
                        {...register("nama")}
                        className={cn("form-input", errors.nama && "error")}
                      />
                    </FormField>
                    <FormField label="Nombor Telefon" id="telefon" error={errors.telefon?.message} required>
                      <input
                        id="telefon"
                        type="tel"
                        autoComplete="tel"
                        placeholder="01X-XXXXXXXX"
                        {...register("telefon")}
                        className={cn("form-input", errors.telefon && "error")}
                      />
                    </FormField>
                  </div>

                  {/* IC */}
                  <FormField label="No. Kad Pengenalan" id="ic" error={errors.ic?.message}>
                    <input
                      id="ic"
                      type="text"
                      placeholder="XXXXXX-XX-XXXX"
                      {...register("ic")}
                      className="form-input"
                    />
                  </FormField>

                  {/* Beneficiary */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <FormField label="Nama Waris / Benefisiari" id="namaWaris" error={errors.namaWaris?.message}>
                      <input
                        id="namaWaris"
                        type="text"
                        placeholder="Nama waris"
                        {...register("namaWaris")}
                        className="form-input"
                      />
                    </FormField>
                    <FormField label="Telefon Waris" id="telefonWaris" error={errors.telefonWaris?.message}>
                      <input
                        id="telefonWaris"
                        type="tel"
                        placeholder="01X-XXXXXXXX"
                        {...register("telefonWaris")}
                        className="form-input"
                      />
                    </FormField>
                  </div>

                  {/* Contact preference */}
                  <FormField label="Kaedah Hubungi Pilihan" id="kaedahHubungi" error={errors.kaedahHubungi?.message}>
                    <select
                      id="kaedahHubungi"
                      {...register("kaedahHubungi")}
                      className="form-input"
                    >
                      <option value="whatsapp">WhatsApp</option>
                      <option value="telefon">Telefon</option>
                      <option value="email">E-mel</option>
                    </select>
                  </FormField>

                  {/* Error state */}
                  {status === "error" && (
                    <div className="flex items-center gap-2 rounded-lg p-3 text-sm"
                      style={{ background: "#fef2f2", color: "var(--color-brand-error)" }}>
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      Ralat berlaku. Sila cuba semula atau hubungi kami terus melalui WhatsApp.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 rounded-full py-4 text-sm font-bold transition-all disabled:opacity-60"
                    style={{
                      background: "var(--color-brand-green)",
                      color: "#fff",
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Menghantar…
                      </>
                    ) : (
                      "Hantar Pertanyaan"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}
