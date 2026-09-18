"use client";
// File: src/app/page.tsx — Albarzah Digital Pamphlet
// Sequence: Hero → Point 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 15 → 16 → Contact → FAQ

import { useState } from "react";
import { HeroSection } from "@/components/sections/hero-section";
import { PamphletProfileSection } from "@/components/sections/pamphlet-profile-section";
import { RealitiSection } from "@/components/sections/realiti-section";
import { PamphletServicesSection } from "@/components/sections/pamphlet-services-section";
import { PamphletNasihatSection } from "@/components/sections/pamphlet-nasihat-section";
import { JomBerdakwahSection } from "@/components/sections/jom-berdakwah-section";
import { PackageSection } from "@/components/sections/package-section";
import { ApplicationFormSection } from "@/components/sections/application-form-section";
import { BenefitPoint15Section, BenefitPoint16Section } from "@/components/sections/benefits-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";

export default function Home() {
  // Selected package state — lifted from PackageSection to ApplicationFormSection
  const [selectedPackage, setSelectedPackage] = useState("PAKEJ RM80.00 SETAHUN");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Point 3: Profil Pengasas ─────────────────────────────────────── */}
      <PamphletProfileSection />

      {/* ── Point 4: Realiti Apabila Berlaku Kematian ────────────────────── */}
      <RealitiSection onSelectPackage={setSelectedPackage} />

      {/* ── Point 5: 8 Perkhidmatan Lengkap & Kami Pelengkap ─────────────── */}
      <PamphletServicesSection />

      {/* ── Point 6: Nasihat Ustaz, Pantun & Mutiara Kata ────────────────── */}
      <PamphletNasihatSection />

      {/* ── Point 7: Jom Kita Berdakwah ──────────────────────────────────── */}
      <JomBerdakwahSection />

      {/* ── Points 8–11: Pakej Cards (each gets its own section id) ─────── */}
      {/* ── Point 12: Borang Permohonan (inline, not a modal) ────────────── */}
      <PackageSection onSelectPackage={setSelectedPackage} />
      <ApplicationFormSection
        selectedPackage={selectedPackage}
        onPackageChange={setSelectedPackage}
      />

      {/* ── Point 15: Butiran Manfaat RM80 & RM120 ───────────────────────── */}
      <BenefitPoint15Section />

      {/* ── Point 16: Butiran Manfaat RM180 & RM240 ──────────────────────── */}
      <BenefitPoint16Section />

      {/* ── Contact & Hubungi ────────────────────────────────────────────── */}
      <ContactSection />

      {/* ── FAQ / Soalan Lazim ───────────────────────────────────────────── */}
      <FaqSection />
    </>
  );
}
