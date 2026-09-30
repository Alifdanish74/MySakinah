"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { viewportOnce } from "../lib/motion";

// Import PNGs as static assets from packages/public — bundled by Next.js at build time
import hubungiPng from "../../../public/images/hubungi.png";
import hadirPng from "../../../public/images/hadir.png";
import urusPng from "../../../public/images/urus.png";
import kebumiPng from "../../../public/images/kebumi.png";

export interface SopStepItem {
  key: string;
  label: string;
  imgSrc: string | { src: string; width: number; height: number };
  alt?: string;
  step?: string | number;
}

export interface SopProcessFlowProps {
  className?: string;
  steps?: SopStepItem[];
  color?: string;
}

const defaultSopSteps: SopStepItem[] = [
  { key: "hubungi", label: "HUBUNGI", imgSrc: hubungiPng, alt: "Langkah 1: Hubungi", step: "1" },
  { key: "hadir", label: "HADIR", imgSrc: hadirPng, alt: "Langkah 2: Hadir", step: "2" },
  { key: "urus", label: "URUS", imgSrc: urusPng, alt: "Langkah 3: Urus", step: "3" },
  { key: "kebumi", label: "KEBUMI", imgSrc: kebumiPng, alt: "Langkah 4: Kebumi", step: "4" },
];

export function SopProcessFlow({ className = "", steps = defaultSopSteps, color = "#6E2020" }: SopProcessFlowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6 }}
      className={`mb-14 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-100 shadow-sm w-full overflow-hidden ${className}`}
    >
      <div className="flex flex-row flex-nowrap items-start justify-between gap-2 sm:gap-4 md:gap-5 w-full">
        {steps.map((step, idx) => (
          <motion.div
            key={step.key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            className="flex flex-col items-center gap-1.5 group flex-1 min-w-0"
          >
            {/* Step number badge — ABOVE the card box */}
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold text-white shadow-md ring-2 ring-white flex-shrink-0"
              style={{ background: "var(--color-brand-gold, #BFA800)" }}
            >
              {step.step ?? idx + 1}
            </div>

            {/* Card box containing the icon — perfect square via aspect-ratio */}
            <div
              className="relative w-full max-w-[60px] rounded-2xl overflow-hidden flex items-center justify-center shadow-md border"
              style={{
                aspectRatio: "1 / 1",
                background: "linear-gradient(135deg, #fdf6ec 0%, #faecd8 100%)",
                borderColor: "rgba(110, 32, 32, 0.14)",
              }}
            >
              {/* PNG Icon — centred inside card */}
              <div
                className="relative transition-transform duration-300 group-hover:scale-110"
                style={{ width: "70%", height: "70%", position: "relative" }}
              >
                <Image
                  src={step.imgSrc}
                  alt={step.alt ?? step.label}
                  fill
                  className="object-contain drop-shadow-sm"
                  draggable={false}
                />
              </div>
            </div>

            {/* Label below the box */}
            <span
              className="text-[11px] sm:text-xs md:text-sm font-extrabold tracking-wider text-center uppercase leading-tight"
              style={{ color, fontFamily: "var(--font-heading)" }}
            >
              {step.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
