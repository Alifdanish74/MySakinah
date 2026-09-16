"use client";
// File: src/app/page.tsx — Albarzah Digital Pamphlet

import { HeroSection } from "@/components/sections/hero-section";
import { PamphletProfileSection } from "@/components/sections/pamphlet-profile-section";
import { PamphletServicesSection } from "@/components/sections/pamphlet-services-section";
import { PamphletNasihatSection } from "@/components/sections/pamphlet-nasihat-section";
import { PackageSection } from "@/components/sections/package-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";

export default function Home() {
  return (
    <>
      {/* ── 1. Hero & Point 7 (Jom Kita Berdakwah & Talian Hotline) ───────── */}
      <HeroSection />

      {/* ── 2. Point 3 & 4 (Profil Pengasas & Urus Jenazah Tanpa Tunai) ────── */}
      <PamphletProfileSection />

      {/* ── 3. Point 5 (8 Perkhidmatan Lengkap & Pelengkap Khairat) ───────── */}
      <PamphletServicesSection />

      {/* ── 4. Point 6 (Nasihat Ustaz, Pantun & Mutiara Kata) ─────────────── */}
      <PamphletNasihatSection />

      {/* ── 5. Points 8–11 Cards & Point 12 Borang Permohonan Modal ─────────── */}
      <PackageSection />

      {/* ── 6. Points 15 & 16 (Butiran Manfaat Pakej Individu Matrix) ───────── */}
      <BenefitsSection />

      {/* ── 7. Point 7 Contact Info & Ibu Pejabat Bumijez ─────────────────── */}
      <ContactSection />

      {/* ── 8. Soalan Lazim (FAQ) ─────────────────────────────────────────── */}
      <FaqSection />
    </>
  );
}
