"use client";

import { TestimonialCarousel, type TestimonyItem } from "@sakinah/ui";
import { SECTION_IDS } from "@/lib/constants";

/**
 * TESTIMONY ITEMS — KOHASiL Raudhah
 * ------------------------------------
 * Each entry has an image path and an optional caption shown below the image.
 * Add / update entries here; the shared carousel will render them automatically.
 */
export const TESTIMONY_ITEMS: TestimonyItem[] = [
  {
    src: "/images/feedback.jpg",
    caption: "Majlis Bacaan Talkin kepada Arwah Yusof bin Karim",
  },
  {
    src: "/images/feedback2.jpg",
    caption: "Majlis Bacaan Talkin kepada Arwah Asrizal bin Abdullah",
  },
  {
    src: "/images/feedback3.jpg",
    caption: "Penyerahan Wang Khairat kepada waris arwah Ridza Abdul Rauf Fais",
  },
  {
    src: "/images/feedback4.jpg",
    caption: "Penyerahan Cek wang khairat kepada Balu Mendiang En. Ambalagan",
  },
  {
    src: "/images/feedback5.jpg",
    caption: "Penyerahan Cek wang Khairat kepada anak Mendiang En. Sim Kim Hoon",
  },
];

export function TestimonialSection() {
  return (
    <TestimonialCarousel
      sectionId={SECTION_IDS.testimoni}
      items={TESTIMONY_ITEMS}
      eyebrow="Testimoni & Maklum Balas"
      title="Apa Kata Peserta & Waris Kami"
      subtitle="Dengar pengalaman dan maklum balas sebenar daripada peserta serta ahli keluarga yang dilindungi bawah skim KOHASiL Raudhah."
      dividerLabel="Testimoni Kohasil"
    />
  );
}
