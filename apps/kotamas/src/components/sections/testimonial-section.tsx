"use client";

import { TestimonialCarousel, type TestimonyItem } from "@sakinah/ui";
import { SECTION_IDS } from "@/lib/constants";

/**
 * TESTIMONY ITEMS — KOTA MAS
 * ---------------------------
 * Each entry has an image path and an optional caption shown below the image.
 * Add / update entries here; the shared carousel will render them automatically.
 */
export const TESTIMONY_ITEMS: TestimonyItem[] = [
  { src: "/images/elderly_parents.png" },
  { src: "/images/parent_carousel.png" },
  { src: "/images/parent_in_law_carousel.jpeg" },
  { src: "/images/graduate_carousel.png" },
];

export function TestimonialSection() {
  return (
    <TestimonialCarousel
      sectionId={SECTION_IDS.testimoni}
      items={TESTIMONY_ITEMS}
      eyebrow="Testimoni & Maklum Balas"
      title="Apa Kata Peserta & Waris Kami"
      subtitle="Dengar pengalaman dan maklum balas sebenar daripada peserta serta ahli keluarga yang dilindungi bawah skim Kota Mas."
      dividerLabel="Testimoni Kota Mas"
    />
  );
}
