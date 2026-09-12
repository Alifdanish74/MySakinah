"use client";

import { useState } from "react";
import { Download, Printer, RefreshCw, Loader2, Check } from "lucide-react";
import { toPng } from "html-to-image";

interface CardDownloadActionsProps {
  memberName: string;
  icNumber: string;
  onReset: () => void;
}

export function CardDownloadActions({ memberName, icNumber, onReset }: CardDownloadActionsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadImage = async () => {
    const cardElem = document.getElementById("exportable-card-area") || document.getElementById("printable-card-area");
    if (!cardElem) return;

    try {
      setIsExporting(true);

      // Use native browser rendering via html-to-image to capture stacked Front & Back cards
      const dataUrl = await toPng(cardElem, {
        quality: 0.95,
        pixelRatio: 3, // 3x High DPI resolution PNG export
        cacheBust: true,
        skipFonts: true, // Prevents scanning cross-origin Google Fonts stylesheets
        fontEmbedCSS: "",
        style: {
          transform: "none",
          transition: "none",
        },
      });

      const link = document.createElement("a");
      const safeName = memberName.toLowerCase().replace(/[^a-z0-9]/g, "-");
      link.download = `kad-keahlian-mysakinah-${safeName}-${icNumber}.png`;
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to capture membership card image:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 no-print mt-4">
      {/* Download PNG Button */}
      <button
        type="button"
        onClick={handleDownloadImage}
        disabled={isExporting}
        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Menjana Imej Kad...</span>
          </>
        ) : downloadSuccess ? (
          <>
            <Check className="w-4 h-4 text-slate-950" />
            <span>Imej Telah Dimuat Turun!</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Muat Turun Kad (PNG)</span>
          </>
        )}
      </button>

      {/* Print Button */}
      <button
        type="button"
        onClick={handlePrint}
        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-all active:scale-95"
      >
        <Printer className="w-4 h-4 text-amber-400" />
        <span>Cetak Kad</span>
      </button>

      {/* Reset Search Button */}
      <button
        type="button"
        onClick={onReset}
        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-medium text-sm border border-slate-800 flex items-center justify-center gap-2 transition-all"
      >
        <RefreshCw className="w-4 h-4 text-slate-400" />
        <span>Semak IC Lain</span>
      </button>
    </div>
  );
}
