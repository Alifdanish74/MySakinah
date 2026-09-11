// File: src/app/layout.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-navigation";
import { OpeningCover } from "@/components/sections/opening-cover";
import { ScrollToTop } from "@sakinah/ui";
import { AudioPlayer } from "@sakinah/ui";
import { AutoScrollManager } from "@sakinah/ui";
import { ParticleComponent } from "@sakinah/ui";

// Heading font — Cormorant Garamond (variable font)
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
    process.env.NEXT_PUBLIC_SITE_URL || "https://kopetro.mysakinah.com"
  ),
  title: "KOPETRO Care — Skim Pengurusan Jenazah & Khairat Kematian 24 Jam",
  description:
    "Bantuan pengurusan jenazah 24 jam & manfaat khairat kematian Patuh Syariah khas untuk anggota KOPETRO dan keluarga. Pendaftaran pantas melalui potongan gaji (RM10/sebulan).",
  keywords: [
    "kopetro",
    "skim jenazah",
    "bantuan pengurusan jenazah",
    "khairat kematian",
    "perlindungan keluarga",
    "patuh syariah",
    "takaful jenazah",
    "potongan gaji",
  ],
  authors: [{ name: "KOPETRO" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "ms_MY",
    url: "/",
    siteName: "KOPETRO Care",
    title: "KOPETRO Care — Perlindungan Ketenangan Sekeluarga",
    description:
      "Bantuan pengurusan jenazah 24 jam & manfaat khairat kematian Patuh Syariah khas untuk anggota KOPETRO dan keluarga.",
    images: [
      {
        url: "/images/opening_background_desktop.png",
        width: 1200,
        height: 630,
        alt: "KOPETRO Care — Skim Pengurusan Jenazah 24 Jam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KOPETRO Care — Skim Pengurusan Jenazah & Khairat Kematian",
    description:
      "Bantuan pengurusan jenazah 24 jam khas untuk warga KOPETRO dan keluarga.",
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
      className={`${cormorant.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-dvh flex flex-col antialiased relative" style={{ background: "var(--color-brand-ivory)" }}>
        {/* Accessibility skip link */}
        <a href="#main-content" className="skip-link">
          Langkau ke kandungan utama
        </a>

        {/* Ambient background particles */}
        <ParticleComponent particleColor="#FDF267" />

        {/* Full-screen Opening Cover / Entrance */}
        <OpeningCover />

        <Header />

        <main id="main-content" className="flex-1 pb-mobile-nav" tabIndex={-1}>
          {children}
        </main>

        <Footer />
        <MobileBottomNavigation />

        {/* Floating Utilities */}
        <AudioPlayer />
        <ScrollToTop />
        <AutoScrollManager />
      </body>
    </html>
  );
}
