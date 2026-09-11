"use client";
// File: src/app/page.tsx — Albarzah

import { useState } from "react";
import { HeroSection } from "@/components/sections/hero-section";
import { IntroductionSection } from "@/components/sections/introduction-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { PackageSection } from "@/components/sections/package-section";
import { AssistanceProcessSection } from "@/components/sections/assistance-process-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  return (
    <>
      {/* ── Section 1: Hero ─────────────────────────────────────── */}
      <HeroSection />

      {/* ── Section 2: Introduction ─────────────────────────────── */}
      <IntroductionSection />

      {/* ── Section 3: Benefits ─────────────────────────────────── */}
      <BenefitsSection />

      {/* ── Section 4: Package Selection (2 yearly plans) ──────── */}
      <PackageSection onSelectPackage={setSelectedPackage} />

      {/* ── Section 5: 3-Step Registration Process ──────────────── */}
      <AssistanceProcessSection />

      {/* ── Section 6: Impact / Stats ───────────────────────────── */}
      <ImpactSection />

      {/* ── Section 7: FAQ ──────────────────────────────────────── */}
      <FaqSection />

      {/* ── Section 8: Contact / Enquiry Form ───────────────────── */}
      <ContactSection preselectedPackage={selectedPackage} />
    </>
  );
}
