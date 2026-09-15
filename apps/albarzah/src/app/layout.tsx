// File: src/app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-navigation";
import { OpeningCover } from "@/components/sections/opening-cover";
import { ScrollToTop } from "@sakinah/ui";
import { AudioPlayer } from "@sakinah/ui";
import { AutoScrollManager } from "@sakinah/ui";
import { ParticleComponent } from "@sakinah/ui";

// Primary Heading font — Playfair Display (full-height lining numbers, elegant high-contrast serif)
const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  preload: true,
});

// Secondary Heading font — Cormorant Garamond
const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  preload: true,
});

// Body font — Inter (variable font)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://albarzah.mysakinah.com"
  ),
  title: "Albarzah — Perlindungan Khairat Kematian 24 JAM",
  description:
    "Albarzah - Sedia membantu urus jenazah 24 jam kenapa tidak urus jenazah \"TANPA TUNAI\" pada hari kematian ",
  keywords: [
    "albarzah",
    "skim jenazah",
    "tanpa tunai",
    "bantuan pengurusan jenazah",
    "khairat kematian",
    "perlindungan keluarga",
    "takaful jenazah",
    "bumijez",
    "darul jenazah",
    "keahlian tahunan",
    "orang awam",
  ],
  authors: [{ name: "Bumijez Sdn Bhd" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "ms_MY",
    url: "/",
    siteName: "Albarzah",
    title: "Albarzah — Perlindungan Khairat Kematian 24 JAM",
    description:
      "Albarzah - Sedia membantu urus jenazah 24 jam kenapa tidak urus jenazah \"TANPA TUNAI\" pada hari kematian ",
    images: [
      {
        url: "/images/opening_background_desktop.png",
        width: 1200,
        height: 630,
        alt: "Albarzah — Skim Pengurusan Jenazah TANPA TUNAI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Albarzah — Perlindungan Khairat Kematian 24 JAM",
    description:
      "Albarzah - Sedia membantu urus jenazah 24 jam kenapa tidak urus jenazah \"TANPA TUNAI\" pada hari kematian ",
    images: ["/images/opening_background_desktop.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ms"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-dvh flex flex-col antialiased relative" style={{ background: "var(--color-brand-ivory)" }}>
        {/* Accessibility skip link */}
        <a href="#main-content" className="skip-link">
          Langkau ke kandungan utama
        </a>

        {/* Ambient background particles */}
        <ParticleComponent particleColor="#BFA800" />

        {/* Full-screen Opening Cover / Entrance */}
        <OpeningCover />

        <Header />

        <main id="main-content" className="flex-1 pb-mobile-nav" tabIndex={-1}>
          {children}
        </main>

        <Footer />
        <MobileBottomNavigation />

        {/* Floating Utilities */}
        <AudioPlayer src="/assets/Hidupnya_insan.mp3" songName="Hidupnya Insan - Hijjaz" position="bottom-center" />
        <ScrollToTop />
        <AutoScrollManager />
      </body>
    </html>
  );
}
