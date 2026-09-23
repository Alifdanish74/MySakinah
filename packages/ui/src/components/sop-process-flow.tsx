"use client";

import React from "react";
import { motion } from "framer-motion";
import { viewportOnce } from "../lib/motion";

export function HubungiSvg({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%" className={className}>
      <rect x="24" y="24" width="464" height="464" rx="90" ry="90" fill="#6E2020" />
      <path
        d="M 172 120 C 161 123, 145 136, 137 151 C 127 169, 134 196, 150 240 C 166 284, 203 346, 260 401 C 305 444, 335 449, 355 439 C 367 433, 377 421, 381 407 C 384 397, 376 384, 345 352 C 317 323, 308 316, 298 317 C 290 318, 279 328, 261 347 C 255 353, 248 357, 244 354 C 236 348, 203 313, 187 289 C 178 276, 179 270, 190 258 C 205 241, 212 232, 212 222 C 212 214, 208 206, 183 147 C 178 135, 175 129, 172 120 Z"
        fill="#FFFFFF"
      />
      <text
        x="345"
        y="218"
        fill="#FFFFFF"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Arial Black', Impact, sans-serif"
        fontWeight="900"
        textAnchor="middle"
      >
        <tspan x="345" fontSize="70" letterSpacing="-1">24</tspan>
        <tspan x="345" dy="50" fontSize="44" letterSpacing="1">JAM</tspan>
      </text>
    </svg>
  );
}

export function HadirSvg({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%" className={className}>
      <rect x="32" y="32" width="448" height="448" rx="88" ry="88" fill="#6E2020" />
      <path
        d="M 140 180 L 350 180 Q 380 180, 386 210 L 392 285 Q 393 325, 375 325 L 367 325 A 30 30 0 0 0 307 325 L 201 325 A 30 30 0 0 0 141 325 L 125 325 Q 122 325, 122 315 L 122 198 Q 122 180, 140 180 Z"
        fill="#FFFFFF"
      />
      <circle cx="171" cy="322" r="22" fill="#FFFFFF" />
      <circle cx="337" cy="322" r="22" fill="#FFFFFF" />
      <path
        d="M 319 194 L 361 194 Q 371 194, 372 208 L 379 257 Q 380 266, 371 266 L 339 266 Q 333 266, 327 259 L 319 246 Z"
        fill="#6E2020"
      />
      <text
        x="138"
        y="223"
        fill="#6E2020"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontWeight="800"
        fontSize="22"
        letterSpacing="0.5"
      >
        <tspan x="138" dy="0">VAN</tspan>
        <tspan x="138" dy="34">JENAZAH</tspan>
      </text>
    </svg>
  );
}

export function UrusSvg({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%" className={className}>
      <defs>
        <g id="urus-wheel-shared">
          <circle cx="0" cy="0" r="14" fill="#FFFFFF" />
          <circle cx="0" cy="0" r="10.5" fill="#6E2020" />
          <circle cx="0" cy="0" r="3.2" fill="#FFFFFF" />
          <path
            d="M -0.8,-10.5 H 0.8 V 10.5 H -0.8 Z M -10.5,-0.8 V 0.8 H 10.5 V -0.8 Z M -7.2,-7.8 L 7.8,7.2 L 6.1,8.9 L -8.9,-6.1 Z M -7.8,7.2 L 7.2,-7.8 L 8.9,-6.1 L -6.1,8.9 Z M -3.6,-9.8 L 3.6,9.8 L 2.1,10.4 L -5.1,-9.2 Z M -9.8,-3.6 L 9.8,3.6 L 9.2,5.1 L -10.4,-2.1 Z M -9.8,3.6 L 9.8,-3.6 L 10.4,-2.1 L -9.2,5.1 Z M -3.6,9.8 L 3.6,-9.8 L 5.1,-9.2 L -2.1,10.4 Z"
            fill="#FFFFFF"
          />
        </g>
      </defs>
      <rect x="24" y="24" width="464" height="464" rx="90" ry="90" fill="#6E2020" />
      <circle cx="218" cy="131" r="19.5" fill="#FFFFFF" />
      <path
        d="M 189 157 C 200 155, 236 155, 247 157 C 255 158, 258 165, 263 177 L 268 189 L 297 186 C 303 186, 305 190, 305 197 C 305 204, 299 207, 293 207 L 267 210 C 257 211, 249 204, 246 195 L 242 186 L 242 225 L 194 225 L 194 186 L 190 195 C 187 204, 179 211, 169 210 L 143 207 C 137 207, 131 204, 131 197 C 131 190, 133 186, 139 186 L 168 189 L 173 177 C 178 165, 181 158, 189 157 Z"
        fill="#FFFFFF"
      />
      <rect x="194" y="295" width="21" height="42" fill="#FFFFFF" />
      <rect x="222" y="295" width="20" height="42" fill="#FFFFFF" />
      <circle cx="363" cy="226" r="22" fill="#FFFFFF" />
      <path
        d="M 339 210 L 215 210 C 180 210, 155 225, 155 248 L 138 248 C 133 248, 131 254, 131 262 C 131 270, 133 277, 138 277 L 387 277 C 392 277, 394 270, 394 262 C 394 254, 392 248, 387 248 L 339 248 Z"
        fill="#FFFFFF"
      />
      <rect x="130.5" y="287" width="263" height="10.5" fill="#FFFFFF" />
      <rect x="149" y="297.5" width="5" height="34" fill="#FFFFFF" />
      <rect x="360" y="297.5" width="5" height="34" fill="#FFFFFF" />
      <use href="#urus-wheel-shared" x="151.5" y="342" />
      <use href="#urus-wheel-shared" x="362.5" y="342" />
    </svg>
  );
}

export function KebumiSvg({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%" className={className}>
      <rect x="24" y="24" width="464" height="464" rx="90" ry="90" fill="#6E2020" />
      <path
        d="M 152 387 L 152 230 C 152 145, 200 94, 256 94 C 312 94, 360 145, 360 230 L 360 387 Z"
        fill="#FFFFFF"
      />
      <path
        d="M 276 166 A 78 78 0 1 0 332 284 A 65 65 0 1 1 276 166 Z"
        fill="#6E2020"
      />
      <polygon
        points="273.0,204.0 279.8,225.0 302.0,225.0 284.1,238.0 290.9,259.0 273.0,246.0 255.1,259.0 261.9,238.0 244.0,225.0 266.2,225.0"
        fill="#6E2020"
      />
    </svg>
  );
}

export interface SopStepItem {
  key: string;
  label: string;
  IconComp: React.ComponentType<{ className?: string }>;
  alt?: string;
  step?: string | number;
}

export interface SopProcessFlowProps {
  className?: string;
  steps?: SopStepItem[];
  color?: string;
}

const defaultSopSteps: SopStepItem[] = [
  { key: "hubungi", label: "HUBUNGI", IconComp: HubungiSvg, alt: "Langkah 1: Hubungi", step: "1" },
  { key: "hadir", label: "HADIR", IconComp: HadirSvg, alt: "Langkah 2: Hadir", step: "2" },
  { key: "urus", label: "URUS", IconComp: UrusSvg, alt: "Langkah 3: Urus", step: "3" },
  { key: "kebumi", label: "KEBUMI", IconComp: KebumiSvg, alt: "Langkah 4: Kebumi", step: "4" },
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
        {steps.map((step, idx) => {
          const IconComponent = step.IconComp;
          return (
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
                  <div className="relative w-full max-w-[56px] sm:max-w-[85px] md:max-w-[110px] aspect-square transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                    <IconComponent className="w-full h-full drop-shadow-sm" />
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
          );
        })}
      </div>
    </motion.div>
  );
}
