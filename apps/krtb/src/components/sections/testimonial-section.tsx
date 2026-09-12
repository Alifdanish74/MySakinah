"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Quote,
} from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import { ResponsiveContainer } from "@sakinah/ui";
import { SectionHeading } from "@sakinah/ui";
import { OrnamentalDivider } from "@sakinah/ui";
import { viewportOnce } from "@sakinah/ui";

/**
 * TESTIMONY IMAGES ARRAY
 * ----------------------
 * Insert or update your testimony image file paths here.
 * Example: "/images/testimoni_1.jpg", "/images/whatsapp_feedback_2.png"
 */
export const TESTIMONY_IMAGES: string[] = [
  "/images/elderly_parents.png",
  "/images/parent_carousel.png",
  "/images/parent_in_law_carousel.jpeg",
  "/images/graduate_carousel.png",
];

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Auto swipe every 6 seconds
  useEffect(() => {
    if (isPaused || lightboxImage) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONY_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, lightboxImage]);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONY_IMAGES.length) % TESTIMONY_IMAGES.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONY_IMAGES.length);
  };

  const currentImage = TESTIMONY_IMAGES[currentIndex];

  return (
    <section
      id={SECTION_IDS.testimoni}
      aria-label="Testimoni Peserta"
      className="section-texture py-16 lg:py-24 relative overflow-hidden"
      style={{ background: "#fcfbfa" }}
    >
      <ResponsiveContainer>
        <SectionHeading
          eyebrow="Testimoni & Maklum Balas"
          title="Apa Kata Peserta & Waris Kami"
          subtitle="Dengar pengalaman dan maklum balas sebenar daripada peserta serta ahli keluarga yang dilindungi bawah skim KRTB Care."
          className="mb-12"
        />

        {/* Testimonial Carousel Frame */}
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
          {/* Progress bar indicator */}
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

          {/* Main Slide Display */}
          <div className="relative min-h-[380px] sm:min-h-[480px] md:min-h-[520px] flex items-center justify-center bg-slate-950/90 group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full min-h-[380px] sm:min-h-[480px] md:min-h-[520px] flex items-center justify-center cursor-pointer p-4 sm:p-6"
                onClick={() => setLightboxImage(currentImage)}
              >
                <Image
                  src={currentImage}
                  alt={`Testimoni ${currentIndex + 1}`}
                  fill
                  className="object-contain p-2 sm:p-4 drop-shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />

                {/* Subtle gradient overlay at top/bottom for controls contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
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

            {/* Slide Index Badge */}
            <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-md">
              {currentIndex + 1} / {TESTIMONY_IMAGES.length}
            </div>
          </div>

          {/* Bottom Thumbnails & Controls Bar */}
          <div className="p-4 sm:p-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Quote className="h-5 w-5 text-amber-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-700">
                Galeri Gambar Testimoni & Respon Peserta
              </span>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1 px-1">
              {TESTIMONY_IMAGES.map((imgSrc, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative h-12 w-16 sm:h-14 sm:w-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${isActive
                      ? "border-amber-500 scale-105 shadow-md ring-2 ring-amber-400/30"
                      : "border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300"
                      }`}
                  >
                    <Image
                      src={imgSrc}
                      alt={`Kecil ${idx + 1}`}
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

        {/* Lightbox / Fullscreen Modal */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
              onClick={() => setLightboxImage(null)}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-md transition-all"
                aria-label="Tutup paparan"
              >
                <X className="h-6 w-6" />
              </button>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={lightboxImage}
                  alt="Paparan Penuh Testimoni"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <OrnamentalDivider className="mt-14" label="Testimoni KRTB" />
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
}
