"use client";

import { useState } from "react";
import { ShieldCheck, RotateCw, QrCode, Phone, UserCheck } from "lucide-react";

export interface MemberData {
  id?: string;
  moduleId?: string;
  nama: string;
  ic: string;
  noAhli: string;
  pakej: string;
  skim: string;
  status: string;
  tarikhDaftar: string;
  tempohKeahlian?: string;
  namaWaris?: string;
  telefonWaris?: string;
  telefon?: string;
  negeri?: string;
  kategori?: string;
}

const CARD_HOTLINE = "011 1300 1999";
const CARD_NOTICE =
  "PENTING : PERLINDUNGAN BERMULA 30 HARI DARI TARIKH MULA KEAHLIAN";

function formatIcDisplay(ic: string): string {
  const digits = ic.replace(/\D/g, "");
  if (digits.length === 12) {
    return `${digits.slice(0, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
  }
  return ic;
}

function formatTempohKeahlian(raw?: string, fallbackDate?: string): string {
  const source = (raw || fallbackDate || "").trim();
  if (!source) return "HINGGA TAMAT PERKHIDMATAN";

  const [startRaw, endRaw] = source.split(" - ").map((part) => part.trim());
  const prettyStart = startRaw.replace(/\//g, " / ");

  if (!endRaw) {
    return `${prettyStart} HINGGA TAMAT PERKHIDMATAN`;
  }

  return `${prettyStart} HINGGA ${endRaw.replace(/\//g, " / ")}`;
}

function MosqueShieldMark() {
  return (
    <svg
      viewBox="0 0 48 56"
      className="w-8 h-10 sm:w-11 sm:h-[3.25rem] text-amber-400"
      fill="none"
      aria-hidden
    >
      <path
        d="M24 3.5 L43 12.5 V31.5 C43 43.2 32.6 52.2 24 53.5 C15.4 52.2 5 43.2 5 31.5 V12.5 Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M24 14.5 C20.2 14.5 17.4 17.6 17.4 21.2 C17.4 23.4 18.6 25.3 20.4 26.4 V28.2 H27.6 V26.4 C29.4 25.3 30.6 23.4 30.6 21.2 C30.6 17.6 27.8 14.5 24 14.5 Z"
        fill="currentColor"
      />
      <path
        d="M24 11.2 V14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="24" cy="10.2" r="1.15" fill="currentColor" />
      <path
        d="M14.8 35.2 H33.2 V41.4 H14.8 Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M18.2 35.2 V41.4 M24 35.2 V41.4 M29.8 35.2 V41.4"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

interface MembershipCardDisplayProps {
  member: MemberData;
}

// ─── CARD FRONT COMPONENT ───────────────────────────────────────────────────
export function CardFront({ member }: { member: MemberData }) {
  const tempoh = formatTempohKeahlian(member.tempohKeahlian, member.tarikhDaftar);

  return (
    <div className="relative w-full h-full rounded-2xl sm:rounded-3xl bg-[#12151c] border-2 border-amber-500/35 p-3.5 sm:p-5 md:p-6 flex flex-col justify-between glass-card-dark card-shine overflow-hidden shadow-2xl shadow-amber-500/10">
      <div className="absolute -top-24 right-0 w-72 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-16 w-64 h-64 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Header: module name first, MySakinah Pro as subtitle */}
      <div className="flex items-start justify-between gap-2 z-10">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <MosqueShieldMark />
          <div className="min-w-0">
            <h3 className="text-[13px] sm:text-lg md:text-xl font-black tracking-wide text-amber-400 uppercase leading-tight truncate">
              {member.skim || "MYSAKINAH PRO"}
            </h3>
            <p className="text-[8px] sm:text-[10px] font-bold tracking-[0.18em] text-amber-500/90 uppercase mt-0.5">
              MYSAKINAH PRO
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-500/15 border border-emerald-400/50 text-emerald-300 text-[9px] sm:text-xs font-extrabold uppercase tracking-wide shrink-0">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400" />
          <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
          <span>{member.status || "AKTIF"}</span>
        </div>
      </div>

      {/* Member identity band */}
      <div className="z-10 -mx-3.5 sm:-mx-5 md:-mx-6 px-3.5 sm:px-5 md:px-6 py-2 sm:py-2.5 bg-white/[0.06]">
        <span className="text-[8px] sm:text-[10px] font-semibold tracking-[0.16em] text-slate-400 uppercase block mb-0.5">
          NAMA AHLI
        </span>
        <h2 className="text-sm sm:text-xl md:text-[1.65rem] font-black text-white tracking-wide uppercase leading-tight truncate">
          {member.nama}
        </h2>
      </div>

      {/* Core fields */}
      <div className="z-10 space-y-2 sm:space-y-3">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="min-w-0">
            <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.14em] text-slate-400 uppercase block">
              PAKEJ
            </span>
            <p className="text-[10px] sm:text-sm font-bold text-white uppercase truncate">
              {member.pakej}
            </p>
          </div>
          <div className="min-w-0">
            <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.14em] text-slate-400 uppercase block">
              NO K/P
            </span>
            <p className="text-[10px] sm:text-sm font-mono font-bold text-white tracking-wide truncate">
              {formatIcDisplay(member.ic)}
            </p>
          </div>
          <div className="min-w-0">
            <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.14em] text-slate-400 uppercase block">
              KATEGORI
            </span>
            <p className="text-[10px] sm:text-sm font-bold text-amber-400 uppercase truncate">
              {member.kategori || "AHLI"}
            </p>
          </div>
        </div>

        <div>
          <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.14em] text-slate-400 uppercase block">
            TEMPOH KEAHLIAN
          </span>
          <p className="text-[10px] sm:text-sm font-bold text-amber-400 uppercase tracking-wide truncate">
            {tempoh}
          </p>
        </div>
      </div>

      {/* Footer notice + hotline */}
      <div className="z-10 pt-1.5 sm:pt-2 border-t border-amber-500/35">
        <p className="text-[7px] sm:text-[9px] font-semibold tracking-[0.08em] text-slate-400 uppercase">
          {CARD_NOTICE}
        </p>
        <p className="mt-0.5 sm:mt-1 text-sm sm:text-lg md:text-xl font-black text-amber-400 tracking-wide uppercase">
          HOTLINE 24 JAM : {CARD_HOTLINE}
        </p>
      </div>
    </div>
  );
}

// ─── CARD BACK COMPONENT ────────────────────────────────────────────────────
export function CardBack({ member }: { member: MemberData }) {
  return (
    <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-slate-950 border-2 border-amber-500/40 p-4 sm:p-6 md:p-7 flex flex-col justify-between glass-card-dark overflow-hidden shadow-2xl shadow-amber-500/10">
      {/* Back Header */}
      <div className="z-10 pt-1 sm:pt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2 text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span className="truncate">Maklumat Penama & Waris</span>
        </div>
        <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono shrink-0">MS-VERIFIED</span>
      </div>

      {/* Back Details Grid */}
      <div className="z-10 space-y-1.5 sm:space-y-2.5 text-xs text-slate-300 my-auto">
        <div className="bg-slate-900/80 p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-slate-800 flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <span className="text-[8px] sm:text-[9px] text-slate-400 block font-semibold uppercase">WARIS BERDAFTAR</span>
            <span className="font-bold text-white text-[10px] sm:text-xs truncate block">{member.namaWaris || "TIADA MAKLUMAT WARIS"}</span>
          </div>
          {member.telefonWaris && (
            <span className="text-[9px] sm:text-[11px] font-mono text-amber-300 bg-amber-500/10 px-1.5 sm:px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
              {member.telefonWaris}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          <div className="bg-slate-900/80 p-1.5 sm:p-2 rounded-lg border border-slate-800">
            <span className="text-[8px] sm:text-[9px] text-slate-400 block font-semibold uppercase">NEGERI</span>
            <span className="font-semibold text-slate-200 text-[10px] sm:text-xs truncate block">{member.negeri || "MALAYSIA"}</span>
          </div>
          <div className="bg-slate-900/80 p-1.5 sm:p-2 rounded-lg border border-slate-800">
            <span className="text-[8px] sm:text-[9px] text-slate-400 block font-semibold uppercase">KATEGORI</span>
            <span className="font-semibold text-amber-300 text-[10px] sm:text-xs truncate block">{member.kategori || "AHLI"}</span>
          </div>
        </div>
      </div>

      {/* Back Footer: QR Code & Hotline */}
      <div className="z-10 pt-1.5 sm:pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Simulated QR Code */}
          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white p-1 rounded-lg flex items-center justify-center shrink-0 shadow-md">
            <QrCode className="w-7 h-7 sm:w-10 sm:h-10 text-slate-950" />
          </div>
          <div>
            <span className="text-[8px] sm:text-[9px] text-slate-400 block uppercase font-bold">HOTLINE BANTUAN 24/7</span>
            <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
              <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0" />
              1-300-88-SAKINAH
            </span>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[7px] sm:text-[8px] text-slate-500 block max-w-[90px] sm:max-w-[120px] leading-tight">
            Kad Digital Sah Rasmi MySakinah Pro
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN DISPLAY COMPONENT ─────────────────────────────────────────────────
export function MembershipCardDisplay({ member }: MembershipCardDisplayProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-4 sm:gap-6">
      {/* On-Screen Interactive 3D Card */}
      <div className="w-full max-w-[540px] perspective-1000 px-1 sm:px-0">
        <div
          className={`relative w-full aspect-[85.6/54] rounded-2xl sm:rounded-3xl transform-style-3d cursor-pointer shadow-2xl transition-transform duration-700 ${isFlipped ? "rotate-y-180" : ""
            }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front Side */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <CardFront member={member} />
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <CardBack member={member} />
          </div>
        </div>
      </div>

      {/* Flip Hint Button */}
      <button
        type="button"
        onClick={() => setIsFlipped(!isFlipped)}
        className="no-print inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium transition-colors"
      >
        <RotateCw className={`w-3.5 h-3.5 text-amber-400 transition-transform duration-500 ${isFlipped ? "rotate-180" : ""}`} />
        <span>Klik Kad Untuk {isFlipped ? "Lihat Depan" : "Lihat Belakang"}</span>
      </button>

      {/* ========================================================================= */}
      {/* DEDICATED STACKED EXPORT CONTAINER (#exportable-card-area) */}
      {/* Stacked vertically: Card 1 (Front) on top, Card 2 (Back) directly below. */}
      {/* Rendered offscreen for crisp PNG image capture & clean PDF print layout. */}
      {/* ========================================================================= */}
      <div className="absolute -left-[9999px] -top-[9999px] print:static print:left-0 print:top-0">
        <div
          id="exportable-card-area"
          className="w-[540px] bg-[#07090e] p-6 space-y-6 flex flex-col items-center justify-start rounded-3xl border border-amber-500/30"
        >
          {/* Card 1: Front */}
          <div className="w-full aspect-[85.6/54]">
            <CardFront member={member} />
          </div>

          {/* Card 2: Back */}
          <div className="w-full aspect-[85.6/54]">
            <CardBack member={member} />
          </div>
        </div>
      </div>
    </div>
  );
}
