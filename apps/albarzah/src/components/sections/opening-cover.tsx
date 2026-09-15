"use client";
// File: src/components/sections/opening-cover.tsx
// Albarzah — Opening Entrance Cover

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { BRAND, SECTION_IDS } from "@/lib/constants";
import { scrollToSection } from "@sakinah/ui";

const entranceVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -1000 },
};

export function OpeningCover() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [visible, setVisible] = useState(pathname === "/");

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (visible && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible, isOpen]);

  const handleClick = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("start_bg_audio"));
      window.dispatchEvent(new CustomEvent("start_auto_scroll"));
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setTimeout(() => {
      setVisible(false);
      scrollToSection(SECTION_IDS.utama);
    }, 800);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="entrance-cover"
          initial={{ y: 0, opacity: 1 }}
          animate={isOpen ? "open" : "closed"}
          variants={entranceVariants}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex h-dvh w-screen flex-col items-center justify-center overflow-y-auto px-4 text-center overscroll-none"
          role="dialog"
          aria-modal="true"
          aria-label="Selamat datang ke Albarzah"
        >
          {/* Full-screen background — Albarzah green mosque image */}
          <picture className="absolute inset-0 z-0 h-full w-full">
            <source
              media="(min-width: 768px)"
              srcSet="/images/albarzah_hero_bg.png"
            />
            <img
              src="/images/albarzah_hero_bg.png"
              alt=""
              className="h-full w-full object-cover object-center"
              aria-hidden="true"
            />
          </picture>

          {/* Deep green overlay for readability */}
          <div
            className="absolute inset-0 z-[1]"
            style={{ background: "rgba(0,48,40,0.62)" }}
            aria-hidden="true"
          />

          {/* Central Content */}
          <div className="relative z-10 flex w-full max-w-[340px] xs:max-w-[370px] sm:max-w-[440px] md:max-w-[500px] flex-col items-center px-4 text-center my-auto py-4 sm:py-6 pb-28 sm:pb-8">

            {/* Top Center Circle Profile Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative mb-3 flex items-center justify-center"
            >
              <div className="relative h-28 w-28 xs:h-32 xs:w-32 sm:h-36 sm:w-36 md:h-40 md:w-40 rounded-full p-1.5 bg-gradient-to-b from-[var(--color-brand-gold-light,#f3b601)] to-amber-600 shadow-2xl">
                <img
                  src="/images/front_icon_ustaz.jpeg"
                  alt="Us Hj Mohd Zainal Hj Khamis"
                  className="h-full w-full rounded-full object-cover border-2 border-white/30"
                />
              </div>
            </motion.div>

            {/* Name */}
            <motion.h2
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wide text-white drop-shadow"
            >
              US HJ MOHD ZAINAL <br /> BIN HJ KHAMIS
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="text-xs xs:text-sm sm:text-base font-semibold italic mb-2.5"
              style={{ color: "var(--color-brand-gold-light)" }}
            >
              (Ustaz Jenazah Songkok Tinggi)
            </motion.p>

            {/* Companies */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-xs xs:text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-wider text-amber-300 mb-4"
            >
              ALBARZAH ENTERPRISE &amp; BUMIJEZ SDN BHD
            </motion.p>

            {/* Experience Headline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mb-5 px-1"
            >
              <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl font-black uppercase leading-snug tracking-wide text-white drop-shadow-lg">
                LEBIH 30 TAHUN BERPENGALAMAN
                <br />
                MENGURUSKAN JENAZAH
                <br />
                DAN KURSUS JENAZAH
              </h1>
            </motion.div>

            {/* Open button CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="w-full mb-5"
            >
              <motion.button
                onClick={handleClick}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex w-full flex-col items-center justify-center gap-0.5 rounded-full py-3 px-6 shadow-2xl transition-all"
                style={{
                  background: "var(--color-brand-gold-light)",
                  color: "var(--color-brand-green-dark)",
                  boxShadow: "0 8px 28px rgba(243,182,1,0.55)",
                  touchAction: "manipulation",
                }}
                type="button"
                aria-label="Terokai Sekarang"
              >
                <div className="flex items-center justify-center gap-2 text-base xs:text-lg sm:text-xl font-black uppercase tracking-wider">
                  <span>TEROKI SEKARANG</span>
                  <ChevronDown className="h-5 w-5 xs:h-6 xs:w-6 animate-bounce stroke-[3]" aria-hidden="true" />
                </div>
                <span className="text-xs xs:text-sm font-semibold italic normal-case tracking-normal opacity-90">
                  (tekan untuk mengetahui lebih lanjut)
                </span>
              </motion.button>
            </motion.div>

            {/* Footer / Motto section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="flex flex-col items-center gap-1 text-center"
            >
              <p className="text-xs xs:text-sm sm:text-base font-extrabold uppercase tracking-wider text-white">
                BANTUAN PERKHIDMATAN 24 JAM
              </p>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl font-black italic tracking-widest text-amber-300 drop-shadow-md">
                “ INGAT! MATI ITU 1 TUNTUTAN ”
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
