"use client";
// File: src/components/sections/benefits-section.tsx — Albarzah
// Point 15 (RM80 & RM120) and Point 16 (RM180 & RM240)
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

// ── POINT 15: RM80 & RM120 ────────────────────────────────────────────────
const point15Data: PakejBenefitData[] = [
  {
    id: "benefit-80",
    title: "MANFAAT PAKEJ INDIVIDU RM80 SETAHUN",
    yearlyFee: "RM80",
    groups: [
      {
        label: "Meninggal Biasa",
        isAccident: false,
        items: [
          { no: 1, label: "Pengurusan Jenazah Lengkap / Tunai", timeline: "24 JAM", detail: "Bersyarat", value: "RM1,500" },
          { no: 2, label: "Tahlil dan Khatam Al-Quran", timeline: "selepas 30 hari", detail: "Bumijez urus", value: "RM500" },
          { no: 3, label: "Pakej Diwarisi Kepada Waris", timeline: "selepas 60 hari bekerja", value: "RM80" },
          { no: 4, label: "Wang Khairat Kepada Waris", timeline: "selepas 90 hari bekerja", value: "RM920" },
        ],
      },
      {
        label: "Berlaku Kemalangan",
        isAccident: true,
        items: [
          { no: 1, label: "Meninggal", detail: "bayar kepada waris • 3 / 4 bulan • tertakluk kepada Takaful", value: "RM5,000" },
          { no: 2, label: "Kecacatan Kekal", detail: "lihat pada kecacatan • bayaran sehingga", value: "RM5,000" },
        ],
      },
    ],
  },
  {
    id: "benefit-120",
    title: "MANFAAT PAKEJ INDIVIDU RM120 SETAHUN",
    yearlyFee: "RM120",
    groups: [
      {
        label: "Meninggal Biasa",
        isAccident: false,
        items: [
          { no: 1, label: "Pengurusan Jenazah Lengkap / Tunai", timeline: "24 JAM", detail: "Bersyarat", value: "RM1,500" },
          { no: 2, label: "Tahlil dan Khatam Al-Quran", timeline: "selepas 30 hari", detail: "Bumijez urus", value: "RM500" },
          { no: 3, label: "Pakej Diwarisi Kepada Waris", timeline: "selepas 60 hari bekerja", value: "RM120" },
          { no: 4, label: "Wang Khairat Kepada Waris", timeline: "selepas 90 hari bekerja", value: "RM2,880" },
        ],
      },
      {
        label: "Berlaku Kemalangan",
        isAccident: true,
        items: [
          { no: 1, label: "Meninggal", detail: "bayar kepada waris • 3 / 4 bulan • tertakluk kepada Takaful", value: "RM5,000" },
          { no: 2, label: "Kecacatan Kekal", detail: "lihat pada kecacatan • bayaran sehingga", value: "RM5,000" },
        ],
      },
    ],
  },
];

// ── POINT 16: RM180 & RM240 ───────────────────────────────────────────────
const point16Data: PakejBenefitData[] = [
  {
    id: "benefit-180",
    title: "MANFAAT PAKEJ INDIVIDU RM180 SETAHUN",
    yearlyFee: "RM180",
    groups: [
      {
        label: "Meninggal Biasa",
        isAccident: false,
        items: [
          { no: 1, label: "Pengurusan Jenazah Lengkap / Tunai", timeline: "24 JAM", detail: "Bersyarat", value: "RM1,500" },
          { no: 2, label: "Tahlil dan Khatam Al-Quran", timeline: "selepas 30 hari", detail: "Bumijez urus", value: "RM500" },
          { no: 3, label: "Pakej Diwarisi Kepada Waris", timeline: "selepas 60 hari bekerja", value: "RM180" },
          { no: 4, label: "Wang Khairat Kepada Waris", timeline: "selepas 90 hari bekerja", value: "RM4,820" },
        ],
      },
      {
        label: "Berlaku Kemalangan",
        isAccident: true,
        items: [
          { no: 1, label: "Meninggal", detail: "bayar kepada waris • 3 / 4 bulan • tertakluk kepada Takaful", value: "RM10,000" },
          { no: 2, label: "Kecacatan Kekal", detail: "lihat pada kecacatan • bayaran sehingga", value: "RM10,000" },
        ],
      },
    ],
  },
  {
    id: "benefit-240",
    title: "MANFAAT PAKEJ INDIVIDU RM240 SETAHUN",
    yearlyFee: "RM240",
    groups: [
      {
        label: "Meninggal Biasa",
        isAccident: false,
        items: [
          { no: 1, label: "Pengurusan Jenazah Lengkap / Tunai", timeline: "24 JAM", detail: "Bersyarat", value: "RM1,500" },
          { no: 2, label: "Tahlil dan Khatam Al-Quran", timeline: "selepas 30 hari", detail: "Bumijez urus", value: "RM500" },
          { no: 3, label: "Pakej Diwarisi Kepada Waris", timeline: "selepas 60 hari bekerja", value: "RM240" },
          { no: 4, label: "Wang Khairat Kepada Waris", timeline: "selepas 90 hari bekerja", value: "RM6,760" },
        ],
      },
      {
        label: "Berlaku Kemalangan",
        isAccident: true,
        items: [
          { no: 1, label: "Meninggal", detail: "bayar kepada waris • 3 / 4 bulan • tertakluk kepada Takaful", value: "RM15,000" },
          { no: 2, label: "Kecacatan Kekal", detail: "lihat pada kecacatan • bayaran sehingga", value: "RM15,000" },
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
        {/* Point indicator */}
        <div className="flex items-center gap-3 mb-8">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-black flex-shrink-0"
            style={{ background: "var(--color-brand-green)", color: "#fff" }}
            aria-hidden="true"
          >
            {pointNo}
          </span>
          <div className="h-px flex-1 opacity-20" style={{ background: "var(--color-brand-green)" }} aria-hidden="true" />
        </div>

        <div className="mb-10">
          <p className="eyebrow-cinzel mb-2">POINT {pointNo} • BUTIRAN MANFAAT PAKEJ</p>
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
      heading="Manfaat Pakej RM80 &amp; RM120"
      subheading="Butiran lengkap manfaat bagi Pakej Individu RM80 dan RM120 setahun."
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
      heading="Manfaat Pakej RM180 &amp; RM240"
      subheading="Butiran lengkap manfaat bagi Pakej Individu RM180 dan RM240 setahun."
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
