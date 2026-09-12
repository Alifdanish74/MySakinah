import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ShieldCheck, CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Kad Keahlian Digital | MySakinah Pro",
  description: "Portal Semakan & Kad Keahlian Digital Rasmi MySakinah Pro. Masukkan no. kad pengenalan anda untuk menyemak dan memuat turun kad keahlian.",
  keywords: ["MySakinah", "Kad Keahlian", "Membership Card", "Semakan IC", "Kad Digital"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#07090e] text-slate-100 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-amber-500/20 px-4 lg:px-8 py-3.5 no-print">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  MYSAKINAH PRO
                </span>
                <span className="block text-[10px] font-medium tracking-widest text-amber-400/80 uppercase">
                  Digital Membership Portal
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Portal Pengesahan Kad Keahlian</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 text-center text-xs text-slate-500 no-print">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} MySakinah Pro. Hak Cipta Terpelihara.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="hover:text-amber-400 transition-colors cursor-pointer">Dasar Privasi</span>
              <span>•</span>
              <span className="hover:text-amber-400 transition-colors cursor-pointer">Terma & Syarat</span>
              <span>•</span>
              <span className="hover:text-amber-400 transition-colors cursor-pointer">Bantuan Support</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
