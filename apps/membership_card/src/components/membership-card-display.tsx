"use client";

import { useState } from "react";
import { ShieldCheck, RotateCw, QrCode, Phone, UserCheck, Award } from "lucide-react";

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
  namaWaris?: string;
  telefonWaris?: string;
  telefon?: string;
  negeri?: string;
  kategori?: string;
}

interface MembershipCardDisplayProps {
  member: MemberData;
}

// ─── CARD FRONT COMPONENT ───────────────────────────────────────────────────
export function CardFront({ member }: { member: MemberData }) {
  return (
    <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-slate-950 border-2 border-amber-500/40 p-4 sm:p-6 md:p-7 flex flex-col justify-between glass-card-dark card-shine overflow-hidden shadow-2xl shadow-amber-500/10">
      {/* Background luxury gradient patterns */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Front Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] sm:rounded-[14px] flex items-center justify-center">
              <Award className="w-4 h-4 sm:w-6 sm:h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <h3 className="text-sm sm:text-lg font-black tracking-tight bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent leading-none sm:leading-normal">
              MYSAKINAH PRO
            </h3>
            <p className="text-[8px] sm:text-[10px] font-bold tracking-wider sm:tracking-widest text-amber-400/90 uppercase mt-0.5 sm:mt-0">
              {member.skim || "SKIM PERLINDUNGAN KELUARGA"}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-xs font-extrabold uppercase tracking-wide shrink-0">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping" />
          <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
          <span>{member.status || "AKTIF"}</span>
        </div>
      </div>

      {/* Front Center: Member Details */}
      <div className="z-10 my-auto py-1 sm:pt-2">
        <span className="text-[8px] sm:text-[10px] font-semibold tracking-wider sm:tracking-widest text-slate-400 uppercase block mb-0.5 sm:mb-1">
          NAMA AHLI / MEMBER NAME
        </span>
        <h2 className="text-base sm:text-xl md:text-2xl font-black text-white tracking-wide truncate max-w-full drop-shadow-md">
          {member.nama}
        </h2>

        <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-2 sm:mt-4">
          <div>
            <span className="text-[8px] sm:text-[9px] font-semibold tracking-wider text-slate-400 uppercase block">
              NO. KAD PENGENALAN (IC)
            </span>
            <p className="text-xs sm:text-sm md:text-base font-mono font-bold text-amber-300 tracking-wider truncate">
              {member.ic}
            </p>
          </div>
          <div>
            <span className="text-[8px] sm:text-[9px] font-semibold tracking-wider text-slate-400 uppercase block">
              NO. AHLI / MEMBER ID
            </span>
            <p className="text-xs sm:text-sm md:text-base font-mono font-bold text-amber-400 tracking-wider truncate">
              {member.noAhli}
            </p>
          </div>
        </div>
      </div>

      {/* Front Footer */}
      <div className="z-10 pt-1.5 sm:pt-3 border-t border-amber-500/20 flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <span className="text-[8px] sm:text-[9px] font-medium text-slate-400 block uppercase">PAKEJ KEAHLIAN</span>
          <p className="text-[10px] sm:text-xs font-bold text-slate-200 truncate max-w-[150px] sm:max-w-[240px]">
            {member.pakej}
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[8px] sm:text-[9px] font-medium text-slate-400 block uppercase">TARIKH DAFTAR</span>
          <p className="text-[10px] sm:text-xs font-mono font-semibold text-amber-300">
            {member.tarikhDaftar}
          </p>
        </div>
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
          className={`relative w-full aspect-[85.6/54] rounded-2xl sm:rounded-3xl transform-style-3d cursor-pointer shadow-2xl transition-transform duration-700 ${
            isFlipped ? "rotate-y-180" : ""
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
        <span>Klik Kad Untuk {isFlipped ? "Lihat Depan" : "Lihat Belakang (Waris & QR)"}</span>
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
