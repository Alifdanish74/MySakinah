"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ShieldCheck,
  Heart,
  Clock,
  FileCheck2,
  Wallet,
  CheckCircle2,
  Sparkles,
  Users,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import { ResponsiveContainer } from "@sakinah/ui";
import { SectionHeading } from "@sakinah/ui";
import { OrnamentalDivider } from "@sakinah/ui";
import { staggerContainer, cardReveal, viewportOnce } from "@sakinah/ui";

const keistimewaanSkim = [
  {
    icon: ShieldCheck,
    title: "Patuh Syariah",
    description: "Khidmat Patuh Syariah Dengan Sokongan Jabatan Mufti Negeri Selangor.",
  },
  {
    icon: Heart,
    title: "Harga Mampu Milik",
    description: "Harga Mampu Milik Untuk Diri Dan Keluarga Tercinta Termasuk Ibu Bapa Tersayang.",
  },
  {
    icon: Clock,
    title: "Perlindungan Panjang",
    description: "Tempoh Perlindungan Yang Panjang, Sehingga Umur 70 Tahun.",
  },
  {
    icon: FileCheck2,
    title: "Tanpa Laporan Kesihatan",
    description: "Tiada Pemeriksaan Kesihatan Diperlukan Untuk Mendaftar.",
  },
  {
    icon: Wallet,
    title: "Pilihan Fleksibel 24 Jam",
    description: "Pilihan Fleksibel: Bantuan Pengurusan Jenazah Atau Bantuan Tunai 24 Jam.",
  },
  {
    icon: CheckCircle2,
    title: "Kelengkapan Disediakan",
    description: "Kelengkapan Pengurusan Jenazah Akan Disediakan Sepenuhnya Pada Hari Kejadian.",
  },
  {
    icon: Sparkles,
    title: "Bebas Risau Kos",
    description: "Pihak Waris Tidak Perlu Risau Akan Kos Terlibat Pada Hari Kejadian.",
  },
  {
    icon: Users,
    title: "Terbuka Bukan Muslim",
    description: "Terbuka Kepada Bukan Muslim: Bantuan Tunai 24 Jam Disediakan.",
  },
];

const carouselItems = [
  {
    id: "ibu-bapa",
    tabLabel: "1. Ibu Bapa",
    badge: "Peserta Tambahan",
    title: "Keistimewaan Untuk Ibu Bapa Tercinta",
    image: "/images/elderly_parents.png",
    imageSubtitle: "Kasih Sayang Ibu Bapa",
    imageTitle: "Pastikan Kebajikan Jenazah Ibu Bapa Terjaga",
    price: "Hanya RM10.00 Sebulan Seorang",
    priceDaily: "0.33 Sen Sehari",
    description: (
      <>
        Dengan potongan gaji tambahan, anda boleh melindungi ibu bapa anda di kampung untuk memastikan kebajikan pengurusan jenazah mereka terjaga pada hari kejadian. Perlindungan adalah <strong>sehingga umur 70 tahun</strong>.
      </>
    ),
    note: (
      <>
        <strong>Syarat Umur Pendaftaran:</strong> Umur pendaftaran mestilah di bawah 66 tahun / 60 tahun mengikut kelayakan pakej.
      </>
    ),
  },
  {
    id: "ibu-bapa-mentua",
    tabLabel: "2. Ibu Bapa Mentua",
    badge: "Peserta Tambahan",
    title: "Keistimewaan Untuk Ibu Bapa Mentua",
    image: "/images/parent_in_law_carousel.jpeg",
    imageSubtitle: "Penghormatan Ibu Bapa Mentua",
    imageTitle: "Perlindungan Sempurna Buat Ibu Bapa Mentua",
    price: "Hanya RM10.00 Sebulan Seorang",
    priceDaily: "0.33 Sen Sehari",
    description: (
      <>
        Berikan ketenangan fikiran buat pasangan anda dengan mendaftarkan ibu bapa mentua ke dalam skim perlindungan ini. Kebajikan dan pengurusan jenazah diuruskan dengan sempurna <strong>sehingga umur 70 tahun</strong>.
      </>
    ),
    note: (
      <>
        <strong>Syarat Umur Pendaftaran:</strong> Umur pendaftaran mestilah di bawah 66 tahun / 60 tahun mengikut kelayakan pakej.
      </>
    ),
  },
  {
    id: "anak-universiti",
    tabLabel: "3. Anak 18 Tahun Keatas",
    badge: "Peserta Tambahan",
    title: "Keistimewaan Untuk Anak Lebih 18 Tahun di Universiti",
    image: "/images/graduate_carousel.png",
    imageSubtitle: "Masa Depan & Pengajian",
    imageTitle: "Perlindungan Berterusan Anak Di IPT",
    price: "Hanya RM10.00 Sebulan Seorang",
    priceDaily: "0.33 Sen Sehari",
    description: (
      <>
        Perlindungan terus disambung bagi anak-anak berumur 18 tahun keatas
      </>
    )
  },
];

export function BenefitsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const currentItem = carouselItems[currentIndex];

  return (
    <section
      id={SECTION_IDS.manfaat}
      aria-label="Keistimewaan Skim"
      className="section-texture py-16 lg:py-24"
      style={{ background: "var(--color-brand-cream)" }}
    >
      <ResponsiveContainer>
        <SectionHeading
          eyebrow="Keistimewaan Skim"
          title="Satu Caruman, Perlindungan Menyeluruh"
          subtitle="Nikmati keistimewaan skim khairat kematian yang direka khas untuk memudahkan urusan anda dan keluarga tercinta."
          className="mb-12"
        />

        {/* 8 Keistimewaan Skim Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-16"
        >
          {keistimewaanSkim.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                variants={cardReveal}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-3.5 rounded-2xl p-6 border shadow-sm transition-all duration-300"
                style={{
                  background: "#fff",
                  borderColor: "var(--color-brand-border)",
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-sm"
                  style={{ background: "var(--color-brand-green)" }}
                >
                  <IconComp className="h-6 w-6" />
                </div>
                <div>
                  <h3
                    className="text-base font-bold mb-1.5 leading-snug"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Keistimewaan Peserta Tambahan (Carousel) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative overflow-hidden rounded-3xl border shadow-lg group"
          style={{
            background: "#fff",
            borderColor: "var(--color-brand-border)",
          }}
        >
          {/* Progress bar for 10s auto-swipe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 z-30 overflow-hidden">
            <motion.div
              key={`${currentIndex}-${isPaused}`}
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? "0%" : "100%" }}
              transition={{ duration: isPaused ? 0 : 10, ease: "linear" }}
              className="h-full"
              style={{ background: "var(--color-brand-gold, #bf8800)" }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Image section */}
            <div className="relative h-72 sm:h-96 lg:h-full lg:col-span-5 min-h-[360px] overflow-hidden bg-slate-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentItem.image}
                    alt={currentItem.title}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                    }}
                  />
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl p-3.5 backdrop-blur-md bg-black/50 text-white border border-white/20">
                    <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                      {currentItem.imageSubtitle}
                    </p>
                    <p className="text-sm sm:text-base font-bold">
                      {currentItem.imageTitle}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-black/70 hover:scale-110 focus:outline-none"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-black/70 hover:scale-110 focus:outline-none"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Slide Counter Badge */}
              <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
                {currentIndex + 1} / {carouselItems.length}
              </div>
            </div>

            {/* Content section */}
            <div className="p-6 sm:p-8 lg:p-10 lg:col-span-7 flex flex-col justify-between">
              {/* Tab navigation buttons */}
              <div className="flex flex-wrap gap-2 mb-6 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                {carouselItems.map((item, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentIndex(idx)}
                      className="flex-1 min-w-[120px] px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-1.5"
                      style={
                        isActive
                          ? {
                            background: "var(--color-brand-green)",
                            color: "#ffffff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          }
                          : {
                            color: "#475569",
                          }
                      }
                    >
                      <span
                        className={`h-2 w-2 rounded-full transition-all ${isActive ? "bg-amber-400 scale-125" : "bg-slate-400"
                          }`}
                      />
                      {item.tabLabel}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    <span
                      className="inline-block rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-3"
                      style={{ background: "rgba(191,168,0,0.15)", color: "var(--color-brand-green)" }}
                    >
                      {currentItem.badge}
                    </span>
                    <h3
                      className="text-2xl sm:text-3xl font-bold mb-4"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green)" }}
                    >
                      {currentItem.title}
                    </h3>

                    <div
                      className="mb-6 inline-flex flex-wrap items-center gap-3 rounded-2xl px-5 py-3 border shadow-sm"
                      style={{
                        background: "var(--color-brand-sage-soft)",
                        borderColor: "var(--color-brand-gold)",
                      }}
                    >
                      <span className="text-lg sm:text-xl font-extrabold text-green-900">
                        {currentItem.price}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-400 text-green-950">
                        {currentItem.priceDaily}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                      {currentItem.description}
                    </p>
                  </div>

                  <div
                    className="flex items-start gap-3 rounded-xl p-4 border mt-auto"
                    style={{
                      background: "#fff9f0",
                      borderColor: "#ffe3b3",
                    }}
                  >
                    <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-700 font-medium">
                      {currentItem.note}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <OrnamentalDivider className="mt-14" label="Kota Mas" />
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
}
