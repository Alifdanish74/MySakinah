"use client";
// File: src/components/sections/benefits-section.tsx — Albarzah
// Point 15 (RM 80 & RM 120) and Point 16 (RM 180 & RM 240)
// Inline scrollable — no tabs, no accordion hiding packages

import { motion } from "framer-motion";
import { ShieldCheck, Zap } from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import { ResponsiveContainer } from "@sakinah/ui";
import { viewportOnce } from "@sakinah/ui";

// ── Benefit data for Points 15 & 16 ───────────────────────────────────────

interface BenefitItem {
  no: number;
  label: string;
  timeline?: string;
  detail?: string;
  value: string;
}

interface BenefitGroup {
  label: string;
  isAccident: boolean;
  items: BenefitItem[];
}

interface PakejBenefitData {
  id: string;
  title: string;
  yearlyFee: string;
  groups: BenefitGroup[];
}

// ── POINT 15: RM 80 & RM 120 ────────────────────────────────────────────────
const point15Data: PakejBenefitData[] = [
  {
    id: "benefit-80",
    title: "MANFAAT PAKEJ INDIVIDU RM 80 SETAHUN",
    yearlyFee: "RM 80",
    groups: [
      {
        label: "Meninggal Biasa",
        isAccident: false,
        items: [
          { no: 1, label: "Pengurusan Jenazah Lengkap / Tunai", timeline: "24 JAM", detail: "Bersyarat", value: "RM 1,500" },
          { no: 2, label: "Tahlil dan Khatam Al-Quran", timeline: "selepas 30 hari", detail: "Bumijez urus", value: "RM 500" },
          { no: 3, label: "Pakej Diwarisi Kepada Waris", timeline: "selepas 60 hari bekerja", value: "RM 80" },
          { no: 4, label: "Wang Khairat Kepada Waris", timeline: "selepas 90 hari bekerja", value: "RM 920" },
        ],
      },
      {
        label: "Berlaku Kemalangan",
        isAccident: true,
        items: [
          { no: 1, label: "Meninggal", detail: "bayar kepada waris • 3 / 4 bulan • tertakluk kepada Takaful", value: "RM 5,000" },
          { no: 2, label: "Kecacatan Kekal", detail: "lihat pada kecacatan • bayaran sehingga", value: "RM 5,000" },
        ],
      },
    ],
  },
  {
    id: "benefit-120",
    title: "MANFAAT PAKEJ INDIVIDU RM 120 SETAHUN",
    yearlyFee: "RM 120",
    groups: [
      {
        label: "Meninggal Biasa",
        isAccident: false,
        items: [
          { no: 1, label: "Pengurusan Jenazah Lengkap / Tunai", timeline: "24 JAM", detail: "Bersyarat", value: "RM 1,500" },
          { no: 2, label: "Tahlil dan Khatam Al-Quran", timeline: "selepas 30 hari", detail: "Bumijez urus", value: "RM 500" },
          { no: 3, label: "Pakej Diwarisi Kepada Waris", timeline: "selepas 60 hari bekerja", value: "RM 120" },
          { no: 4, label: "Wang Khairat Kepada Waris", timeline: "selepas 90 hari bekerja", value: "RM 2,880" },
        ],
      },
      {
        label: "Berlaku Kemalangan",
        isAccident: true,
        items: [
          { no: 1, label: "Meninggal", detail: "bayar kepada waris • 3 / 4 bulan • tertakluk kepada Takaful", value: "RM 5,000" },
          { no: 2, label: "Kecacatan Kekal", detail: "lihat pada kecacatan • bayaran sehingga", value: "RM 5,000" },
        ],
      },
    ],
  },
];

// ── POINT 16: RM 180 & RM 240 ───────────────────────────────────────────────
const point16Data: PakejBenefitData[] = [
  {
    id: "benefit-180",
    title: "MANFAAT PAKEJ INDIVIDU RM 180 SETAHUN",
    yearlyFee: "RM 180",
    groups: [
      {
        label: "Meninggal Biasa",
        isAccident: false,
        items: [
          { no: 1, label: "Pengurusan Jenazah Lengkap / Tunai", timeline: "24 JAM", detail: "Bersyarat", value: "RM 1,500" },
          { no: 2, label: "Tahlil dan Khatam Al-Quran", timeline: "selepas 30 hari", detail: "Bumijez urus", value: "RM 500" },
          { no: 3, label: "Pakej Diwarisi Kepada Waris", timeline: "selepas 60 hari bekerja", value: "RM 180" },
          { no: 4, label: "Wang Khairat Kepada Waris", timeline: "selepas 90 hari bekerja", value: "RM 4,820" },
        ],
      },
      {
        label: "Berlaku Kemalangan",
        isAccident: true,
        items: [
          { no: 1, label: "Meninggal", detail: "bayar kepada waris • 3 / 4 bulan • tertakluk kepada Takaful", value: "RM 10,000" },
          { no: 2, label: "Kecacatan Kekal", detail: "lihat pada kecacatan • bayaran sehingga", value: "RM 10,000" },
        ],
      },
    ],
  },
  {
    id: "benefit-240",
    title: "MANFAAT PAKEJ INDIVIDU RM 240 SETAHUN",
    yearlyFee: "RM 240",
    groups: [
      {
        label: "Meninggal Biasa",
        isAccident: false,
        items: [
          { no: 1, label: "Pengurusan Jenazah Lengkap / Tunai", timeline: "24 JAM", detail: "Bersyarat", value: "RM 1,500" },
          { no: 2, label: "Tahlil dan Khatam Al-Quran", timeline: "selepas 30 hari", detail: "Bumijez urus", value: "RM 500" },
          { no: 3, label: "Pakej Diwarisi Kepada Waris", timeline: "selepas 60 hari bekerja", value: "RM 240" },
          { no: 4, label: "Wang Khairat Kepada Waris", timeline: "selepas 90 hari bekerja", value: "RM 6,760" },
        ],
      },
      {
        label: "Berlaku Kemalangan",
        isAccident: true,
        items: [
          { no: 1, label: "Meninggal", detail: "bayar kepada waris • 3 / 4 bulan • tertakluk kepada Takaful", value: "RM 15,000" },
          { no: 2, label: "Kecacatan Kekal", detail: "lihat pada kecacatan • bayaran sehingga", value: "RM 15,000" },
        ],
      },
    ],
  },
];

// ── Benefit Card Component ─────────────────────────────────────────────────
function BenefitCard({ data }: { data: PakejBenefitData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6 }}
      className="rounded-3xl overflow-hidden border shadow-md"
      style={{ background: "#fff", borderColor: "var(--color-brand-border)" }}
    >
      {/* Card header */}
      <div
        className="px-6 py-5"
        style={{ background: "var(--color-brand-green-dark)" }}
      >
        <p
          className="text-base sm:text-lg font-black text-white uppercase leading-snug"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {data.title}
        </p>
      </div>

      <div className="divide-y" style={{ borderColor: "var(--color-brand-border)" }}>
        {data.groups.map((group) => (
          <div key={group.label}>
            {/* Group header */}
            <div
              className="flex items-center gap-3 px-5 py-3"
              style={{ background: group.isAccident ? "var(--color-brand-green)" : "var(--color-brand-green-dark)", opacity: 0.85 }}
            >
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                {group.isAccident ? (
                  <Zap className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                ) : (
                  <ShieldCheck className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                )}
              </div>
              <p className="text-xs font-black text-white uppercase tracking-wider">
                {group.label}
              </p>
            </div>

            {/* Benefit items */}
            <ul className="divide-y" style={{ borderColor: "var(--color-brand-border)" }}>
              {group.items.map((item) => (
                <li key={item.no} className="flex items-start gap-3 px-5 py-3.5">
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black flex-shrink-0 mt-0.5"
                    style={{
                      background: group.isAccident ? "rgba(243,182,1,0.15)" : "rgba(0,71,60,0.08)",
                      color: group.isAccident ? "var(--color-brand-gold)" : "var(--color-brand-green)",
                    }}
                  >
                    {item.no}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold leading-snug flex-1" style={{ color: "var(--color-brand-text)" }}>
                        {item.label}
                      </p>
                      <p
                        className="text-sm font-black tabular-nums flex-shrink-0"
                        style={{ color: group.isAccident ? "var(--color-brand-gold)" : "var(--color-brand-green)" }}
                      >
                        {item.value}
                      </p>
                    </div>
                    {(item.timeline || item.detail) && (
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {item.timeline && (
                          <span
                            className="text-[11px] font-semibold rounded-full px-2 py-0.5"
                            style={{
                              background: group.isAccident ? "rgba(243,182,1,0.10)" : "var(--color-brand-sage-soft)",
                              color: group.isAccident ? "var(--color-brand-gold)" : "var(--color-brand-green)",
                            }}
                          >
                            {item.timeline}
                          </span>
                        )}
                        {item.detail && (
                          <span className="text-[11px] text-slate-400 font-medium">
                            {item.detail}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── BenefitSection helper ──────────────────────────────────────────────────
interface BenefitSectionBlockProps {
  pointId: string;
  pointNo: string;
  heading: string;
  subheading: string;
  packages: PakejBenefitData[];
  bg: string;
}

function BenefitSectionBlock({ pointId, pointNo, heading, subheading, packages: pkgs, bg }: BenefitSectionBlockProps) {
  return (
    <section
      id={pointId}
      aria-label={heading}
      className="section-texture py-16 lg:py-24"
      style={{ background: bg }}
    >
      <ResponsiveContainer>
        <div className="mb-10">
          <p className="eyebrow-cinzel mb-2">BUTIRAN MANFAAT PAKEJ</p>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight mb-2"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
          >
            {heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">{subheading}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pkgs.map((pkg) => (
            <BenefitCard key={pkg.id} data={pkg} />
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
}

// ── Exported components ────────────────────────────────────────────────────
export function BenefitPoint15Section() {
  return (
    <BenefitSectionBlock
      pointId={SECTION_IDS.point15}
      pointNo="15"
      heading="Manfaat Pakej RM 80 &amp; RM 120"
      subheading="Butiran lengkap manfaat bagi Pakej Individu RM 80 dan RM 120 setahun."
      packages={point15Data}
      bg="#fff"
    />
  );
}

export function BenefitPoint16Section() {
  return (
    <BenefitSectionBlock
      pointId={SECTION_IDS.point16}
      pointNo="16"
      heading="Manfaat Pakej RM 180 &amp; RM 240"
      subheading="Butiran lengkap manfaat bagi Pakej Individu RM 180 dan RM 240 setahun."
      packages={point16Data}
      bg="var(--color-brand-cream)"
    />
  );
}

// Legacy export for backward compatibility
export function BenefitsSection() {
  return (
    <>
      <BenefitPoint15Section />
      <BenefitPoint16Section />
    </>
  );
}
