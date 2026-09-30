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
      className={`mb-14 p-3 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col items-center justify-center w-full overflow-hidden ${className}`}
    >
      <div className="w-full max-w-3xl flex items-center justify-between gap-1 sm:gap-3 md:gap-5 py-2">
        {steps.map((step, idx) => (
          <React.Fragment key={step.key}>
            <div className="flex items-center gap-1 sm:gap-3 md:gap-5 flex-1 min-w-0">
              {/* Step Item Card */}
              <div className="flex flex-col items-center flex-1 min-w-0 group">
                {/* Step number badge above icon */}
                <div
                  className="mb-1.5 sm:mb-2 flex h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 items-center justify-center rounded-full text-[10px] sm:text-sm md:text-sm font-bold text-white shadow-md flex-shrink-0"
                  style={{ background: "var(--color-brand-gold, #BFA800)" }}
                >
                  {step.step ?? idx + 1}
                </div>

                {/* PNG Icon */}
                <div className="relative w-full max-w-[56px] sm:max-w-[85px] md:max-w-[110px] aspect-square transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={step.imgSrc}
                    alt={step.alt ?? step.label}
                    fill
                    className="object-contain drop-shadow-sm"
                    draggable={false}
                  />
                </div>

                <span
                  className="mt-1.5 sm:mt-2 text-[9px] sm:text-xs md:text-sm font-extrabold tracking-wide text-center uppercase truncate w-full"
                  style={{ color, fontFamily: "var(--font-heading)" }}
                >
                  {step.label}
                </span>
              </div>

              {/* Arrow Connector (between steps) */}
              {idx < steps.length - 1 && (
                <div className="flex items-center justify-center flex-shrink-0 mb-3 sm:mb-5" style={{ color }}>
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
}
