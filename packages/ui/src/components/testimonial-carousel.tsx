"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn, Images } from "lucide-react";
import { ResponsiveContainer } from "./responsive-container";
import { SectionHeading } from "./section-heading";
import { OrnamentalDivider } from "./ornamental-divider";
import { viewportOnce } from "../lib/motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single testimony item — image source + optional caption displayed below */
export interface TestimonyItem {
  src: string;
  caption?: string;
}

export interface TestimonialCarouselProps {
  /** Array of testimony items (image + optional caption) */
  items: TestimonyItem[];

  /** Section anchor ID (maps to your SECTION_IDS.testimoni) */
  sectionId: string;

  /** Eyebrow text above the title (e.g. "Testimoni & Maklum Balas") */
  eyebrow?: string;

  /** Main heading title */
  title?: string;

  /** Subtitle / description paragraph */
  subtitle?: string;

  /** Label text for the OrnamentalDivider shown at the bottom */
  dividerLabel?: string;
}

// ---------------------------------------------------------------------------
// Lightbox Modal
// ---------------------------------------------------------------------------

function LightboxModal({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: TestimonyItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.88)" }}
      onClick={onClose}
    >
      {/* Modal card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
        style={{ background: "#0f172a" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Close button ── */}
        <button
          onClick={onClose}
          aria-label="Tutup paparan"
          className="absolute top-3 right-3 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:scale-110 focus:outline-none"
          style={{ background: "rgba(0,0,0,0.65)" }}
        >
          <X className="h-4 w-4" />
        </button>

        {/* ── Image area — fixed 4:3 ratio ── */}
        <div className="relative w-full bg-slate-950" style={{ aspectRatio: "4/3" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={item.src}
                alt={item.caption ?? `Testimoni ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 672px"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Left / Right nav overlays */}
          {items.length > 1 && (
            <>
              <button
                onClick={onPrev}
                aria-label="Gambar sebelumnya"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:scale-110 focus:outline-none shadow-xl"
                style={{ background: "rgba(0,0,0,0.55)" }}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={onNext}
                aria-label="Gambar seterusnya"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:scale-110 focus:outline-none shadow-xl"
                style={{ background: "rgba(0,0,0,0.55)" }}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Counter badge */}
          <div
            className="absolute bottom-3 right-3 z-20 px-2.5 py-1 rounded-full text-[11px] font-bold text-white"
            style={{ background: "rgba(0,0,0,0.6)" }}
          >
            {index + 1} / {items.length}
          </div>
        </div>

        {/* ── Caption ── */}
        <AnimatePresence mode="wait">
          {item.caption ? (
            <motion.div
              key={`lb-cap-${index}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-5 py-4 border-t border-white/10"
            >
              <p className="text-sm sm:text-base text-slate-200 text-center leading-relaxed">
                {item.caption}
              </p>
            </motion.div>
          ) : (
            <div key={`lb-empty-${index}`} className="py-2" />
          )}
        </AnimatePresence>

        {/* ── Dot indicators ── */}
        {items.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 pb-4">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`Gambar ${i + 1}`}
                onClick={() => {
                  // navigate directly
                  const diff = i - index;
                  if (diff > 0) for (let j = 0; j < diff; j++) onNext();
                  if (diff < 0) for (let j = 0; j < -diff; j++) onPrev();
                }}
                className="transition-all duration-200 rounded-full"
                style={{
                  width: i === index ? 20 : 7,
                  height: 7,
                  background:
                    i === index
                      ? "var(--color-brand-gold, #bf8800)"
                      : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function TestimonialCarousel({
  items,
  sectionId,
  eyebrow = "Testimoni & Maklum Balas",
  title = "Apa Kata Peserta & Waris Kami",
  subtitle,
  dividerLabel = "Testimoni",
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePrev = useCallback(
    () => setCurrentIndex((p) => (p - 1 + items.length) % items.length),
    [items.length]
  );
  const handleNext = useCallback(
    () => setCurrentIndex((p) => (p + 1) % items.length),
    [items.length]
  );

  const lbPrev = useCallback(
    () => setLightboxIndex((p) => ((p ?? 0) - 1 + items.length) % items.length),
    [items.length]
  );
  const lbNext = useCallback(
    () => setLightboxIndex((p) => ((p ?? 0) + 1) % items.length),
    [items.length]
  );

  // Auto-advance carousel (pauses when lightbox is open or hovered)
  useEffect(() => {
    if (isPaused || lightboxIndex !== null) return;
    const t = setInterval(handleNext, 6000);
    return () => clearInterval(t);
  }, [currentIndex, isPaused, lightboxIndex, handleNext]);

  const currentItem = items[currentIndex];

  return (
    <section
      id={sectionId}
      aria-label="Testimoni Peserta"
      className="section-texture py-16 lg:py-24 relative overflow-hidden"
      style={{ background: "#fcfbfa" }}
    >
      <ResponsiveContainer>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          className="mb-12"
        />

        {/* ── Carousel card ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative max-w-xl mx-auto"
        >
          {/* Card shell */}
          <div
            className="rounded-2xl overflow-hidden border shadow-xl bg-white"
            style={{ borderColor: "var(--color-brand-border, #e2d8cc)" }}
          >
            {/* Progress bar */}
            <div className="h-1 bg-slate-100 overflow-hidden">
              <motion.div
                key={`${currentIndex}-${isPaused}`}
                initial={{ width: "0%" }}
                animate={{ width: isPaused ? "0%" : "100%" }}
                transition={{ duration: isPaused ? 0 : 6, ease: "linear" }}
                className="h-full"
                style={{ background: "var(--color-brand-gold, #bf8800)" }}
              />
            </div>

            {/* ── Image area — 4:3 keeps it readable on all screen sizes ── */}
            <div
              className="relative w-full cursor-pointer group bg-slate-50"
              style={{ aspectRatio: "4/3" }}
              onClick={() => setLightboxIndex(currentIndex)}
              role="button"
              aria-label="Klik untuk paparan penuh"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(currentIndex)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentItem.src}
                    alt={currentItem.caption ?? `Testimoni ${currentIndex + 1}`}
                    fill
                    className="object-contain p-3 sm:p-4"
                    sizes="(max-width: 640px) 100vw, 576px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Zoom hint overlay on hover */}
              {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-semibold shadow-lg backdrop-blur-sm"
                  style={{ background: "rgba(0,0,0,0.55)" }}
                >
                  <ZoomIn className="h-4 w-4" />
                  Klik untuk paparan penuh
                </div>
              </div> */}

              {/* Slide index badge */}
              <div
                className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[11px] font-bold text-white"
                style={{ background: "rgba(0,0,0,0.55)" }}
              >
                {currentIndex + 1} / {items.length}
              </div>

              {/* Left / Right nav */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                aria-label="Testimoni sebelumnya"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110 focus:outline-none shadow-lg"
                style={{ background: "rgba(0,0,0,0.5)" }}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                aria-label="Testimoni seterusnya"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110 focus:outline-none shadow-lg"
                style={{ background: "rgba(0,0,0,0.5)" }}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* ── Caption ── */}
            <div className="min-h-[52px] border-t border-slate-100">
              <AnimatePresence mode="wait">
                {currentItem.caption ? (
                  <motion.div
                    key={`cap-${currentIndex}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 py-3 text-center"
                  >
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                      {currentItem.caption}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`cap-empty-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-5 py-3 text-center"
                  >
                    <p className="text-xs text-slate-400 italic">—</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Thumbnail strip ── */}
            <div className="px-4 pb-4 pt-2 bg-white border-t border-slate-100">
              {/* Label */}
              <div className="flex items-center gap-2 mb-3">
                <Images className="h-4 w-4 flex-shrink-0" style={{ color: "var(--color-brand-gold, #bf8800)" }} />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  Galeri Testimoni
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {items.map((item, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={item.caption ?? `Gambar ${idx + 1}`}
                      className="relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 focus:outline-none"
                      style={{
                        width: 56,
                        height: 44,
                        border: isActive
                          ? "2.5px solid var(--color-brand-gold, #bf8800)"
                          : "2px solid transparent",
                        boxShadow: isActive
                          ? "0 0 0 3px rgba(191,136,0,0.18)"
                          : undefined,
                        opacity: isActive ? 1 : 0.55,
                        transform: isActive ? "scale(1.07)" : "scale(1)",
                      }}
                    >
                      <Image
                        src={item.src}
                        alt={item.caption ?? `Kecil ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Dot indicators below card ── */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Pergi ke gambar ${i + 1}`}
                className="transition-all duration-300 rounded-full"
                style={{
                  height: 7,
                  width: i === currentIndex ? 22 : 7,
                  background:
                    i === currentIndex
                      ? "var(--color-brand-gold, #bf8800)"
                      : "#cbd5e1",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Lightbox ────────────────────────────────────────────────── */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <LightboxModal
              items={items}
              index={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
              onPrev={lbPrev}
              onNext={lbNext}
            />
          )}
        </AnimatePresence>

        {/* ── Bottom ornamental divider ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <OrnamentalDivider className="mt-14" label={dividerLabel} />
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
}
