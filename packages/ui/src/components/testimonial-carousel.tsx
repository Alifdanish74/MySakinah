"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Quote } from "lucide-react";
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
// Component
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

  // Auto swipe every 6 seconds
  useEffect(() => {
    if (isPaused || lightboxIndex !== null) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, lightboxIndex, items.length]);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % items.length);

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

        {/* ── Carousel Frame ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative max-w-4xl mx-auto rounded-3xl border shadow-xl bg-white overflow-hidden"
          style={{ borderColor: "var(--color-brand-border)" }}
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 z-30 overflow-hidden">
            <motion.div
              key={`${currentIndex}-${isPaused}`}
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? "0%" : "100%" }}
              transition={{ duration: isPaused ? 0 : 6, ease: "linear" }}
              className="h-full"
              style={{ background: "var(--color-brand-gold, #bf8800)" }}
            />
          </div>

          {/* Main Slide */}
          <div className="relative min-h-[380px] sm:min-h-[480px] md:min-h-[520px] flex items-center justify-center bg-slate-950/90 group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full min-h-[380px] sm:min-h-[480px] md:min-h-[520px] flex items-center justify-center cursor-pointer p-4 sm:p-6"
                onClick={() => setLightboxIndex(currentIndex)}
              >
                <Image
                  src={currentItem.src}
                  alt={currentItem.caption ?? `Testimoni ${currentIndex + 1}`}
                  fill
                  className="object-contain p-2 sm:p-4 drop-shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={handlePrev}
              aria-label="Testimoni sebelumnya"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-black/80 hover:scale-110 focus:outline-none shadow-lg"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Testimoni seterusnya"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-black/80 hover:scale-110 focus:outline-none shadow-lg"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Slide index badge */}
            <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-md">
              {currentIndex + 1} / {items.length}
            </div>
          </div>

          {/* Caption bar below the slide image */}
          {currentItem.caption && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`caption-${currentIndex}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-center"
              >
                <p className="text-xs sm:text-sm text-slate-600 italic leading-snug">
                  {currentItem.caption}
                </p>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Thumbnails & controls bar */}
          <div className="p-4 sm:p-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Quote className="h-5 w-5 text-amber-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-700">
                Galeri Gambar Testimoni &amp; Respon Peserta
              </span>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1 px-1">
              {items.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative h-12 w-16 sm:h-14 sm:w-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      isActive
                        ? "border-amber-500 scale-105 shadow-md ring-2 ring-amber-400/30"
                        : "border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300"
                    }`}
                    aria-label={item.caption ?? `Testimoni ${idx + 1}`}
                  >
                    <Image
                      src={item.src}
                      alt={item.caption ?? `Kecil ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Lightbox ────────────────────────────────────────────────── */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Centered frame — NOT full-width */}
              <motion.div
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative mx-4 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl bg-slate-900"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button — inside the frame, top-right */}
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute top-3 right-3 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 backdrop-blur-md border border-white/20 transition-all shadow-lg"
                  aria-label="Tutup paparan"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Image */}
                <div className="relative w-full aspect-[4/3] bg-slate-950">
                  <Image
                    src={items[lightboxIndex].src}
                    alt={
                      items[lightboxIndex].caption ??
                      `Paparan Penuh Testimoni ${lightboxIndex + 1}`
                    }
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 672px"
                    priority
                  />
                </div>

                {/* Caption inside lightbox */}
                {items[lightboxIndex].caption && (
                  <div className="px-5 py-3 bg-slate-900 text-center">
                    <p className="text-sm text-slate-300 italic leading-snug">
                      {items[lightboxIndex].caption}
                    </p>
                  </div>
                )}

                {/* Lightbox navigation */}
                {items.length > 1 && (
                  <div className="flex items-center justify-between px-5 py-3 bg-slate-800">
                    <button
                      onClick={() =>
                        setLightboxIndex(
                          (prev) =>
                            ((prev ?? 0) - 1 + items.length) % items.length
                        )
                      }
                      className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                      aria-label="Gambar sebelumnya"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Sebelumnya
                    </button>
                    <span className="text-xs text-slate-400 font-semibold">
                      {(lightboxIndex ?? 0) + 1} / {items.length}
                    </span>
                    <button
                      onClick={() =>
                        setLightboxIndex(
                          (prev) => ((prev ?? 0) + 1) % items.length
                        )
                      }
                      className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
                      aria-label="Gambar seterusnya"
                    >
                      Seterusnya
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom Ornamental Divider ─────────────────────────────── */}
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
