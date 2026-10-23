"use client";

import { useState, useRef, useCallback } from "react";
import { ShieldCheck, RotateCw } from "lucide-react";
import { getBenefitsByPakej } from "@/lib/package-benefits";

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

      {/* Header */}
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
  const benefitData = getBenefitsByPakej(member.pakej);

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#12151c] border-2 border-amber-500/35 flex flex-col overflow-hidden glass-card-dark card-shine shadow-2xl shadow-amber-500/10">
      {/* Ambient glow blobs */}
      <div className="absolute -top-20 -right-10 w-64 h-40 bg-amber-500/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-12 w-56 h-56 bg-emerald-500/6 rounded-full blur-3xl pointer-events-none" />

      {/* Back header */}
      <div className="relative z-10 flex items-center justify-between gap-2 px-3 sm:px-4 pt-2 sm:pt-2.5 pb-1.5 border-b border-amber-500/20">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <svg viewBox="0 0 48 56" className="w-6 h-7 sm:w-8 sm:h-9 text-amber-400 shrink-0" fill="none" aria-hidden>
            <path d="M24 3.5 L43 12.5 V31.5 C43 43.2 32.6 52.2 24 53.5 C15.4 52.2 5 43.2 5 31.5 V12.5 Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M24 14.5 C20.2 14.5 17.4 17.6 17.4 21.2 C17.4 23.4 18.6 25.3 20.4 26.4 V28.2 H27.6 V26.4 C29.4 25.3 30.6 23.4 30.6 21.2 C30.6 17.6 27.8 14.5 24 14.5 Z" fill="currentColor" />
            <path d="M24 11.2 V14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="24" cy="10.2" r="1.15" fill="currentColor" />
            <path d="M14.8 35.2 H33.2 V41.4 H14.8 Z" stroke="currentColor" strokeWidth="1.8" />
            <path d="M18.2 35.2 V41.4 M24 35.2 V41.4 M29.8 35.2 V41.4" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <div className="min-w-0">
            <h3 className="text-[10px] sm:text-[12px] font-black text-amber-400 uppercase tracking-wide leading-tight truncate">
              {member.pakej || "SKIM PERLINDUNGAN"}
            </h3>
            <p className="text-[6.5px] sm:text-[8px] font-bold tracking-[0.14em] text-slate-400 uppercase">
              SENARAI MANFAAT
            </p>
          </div>
        </div>
        {benefitData && (
          <div className="flex items-center px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30 shrink-0">
            <span className="text-[7px] sm:text-[8px] font-extrabold text-amber-400 uppercase tracking-wider">
              {benefitData.totalNormalDeath}
            </span>
          </div>
        )}
      </div>

      {benefitData ? (
        /* ── KNOWN PAKEJ: precise benefit table ─────────────────────────── */
        <div className="relative z-10 px-3 sm:px-4 py-1.5 sm:py-2 space-y-1.5 sm:space-y-2">

          {/* Section label */}
          <p className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-[0.16em]">
            {benefitData.isKeluarga ? "MANFAAT AHLI DAN PASANGAN" : "MANFAAT AHLI"}
          </p>

          {/* Benefit rows */}
          <div className="space-y-1">
            {benefitData.isKeluarga ? (
              <>
                {/* Column headers */}
                <div className="grid grid-cols-[1fr_auto_auto] gap-x-1.5">
                  <span className="text-[6px] sm:text-[7px] text-slate-500 font-bold uppercase tracking-wider">MANFAAT</span>
                  <span className="text-[6px] sm:text-[7px] text-slate-500 font-bold uppercase tracking-wider text-right w-12 sm:w-14">AHLI</span>
                  <span className="text-[6px] sm:text-[7px] text-slate-500 font-bold uppercase tracking-wider text-right w-12 sm:w-14">PASANGAN</span>
                </div>
                <div className="h-px bg-white/[0.06]" />
                {benefitData.items.map((item) => (
                  <div key={item.no} className="grid grid-cols-[1fr_auto_auto] gap-x-1.5 items-start">
                    <div className="flex gap-1 items-start">
                      <span className="shrink-0 w-3.5 text-[7px] sm:text-[8px] text-amber-500/70 font-black pt-px">{item.no}.</span>
                      <span className="text-[7px] sm:text-[8px] font-semibold text-slate-300 leading-tight">{item.benefit}</span>
                    </div>
                    <span className="text-[7px] sm:text-[8px] font-black text-amber-400 text-right w-12 sm:w-14 shrink-0">{item.ahli}</span>
                    <span className="text-[7px] sm:text-[8px] font-black text-amber-400 text-right w-12 sm:w-14 shrink-0">{item.pasangan ?? "—"}</span>
                  </div>
                ))}
              </>
            ) : (
              benefitData.items.map((item) => (
                <div key={item.no} className="flex items-start justify-between gap-2">
                  <div className="flex gap-1 items-start min-w-0">
                    <span className="shrink-0 w-3.5 text-[7px] sm:text-[8px] text-amber-500/70 font-black pt-px">{item.no}.</span>
                    <span className="text-[7px] sm:text-[8px] font-semibold text-slate-300 leading-tight">{item.benefit}</span>
                  </div>
                  <span className="text-[7px] sm:text-[8px] font-black text-amber-400 shrink-0">{item.ahli}</span>
                </div>
              ))
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.06]" />

          {/* Accident benefit */}
          <div className="space-y-1">
            <p className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-[0.16em]">
              MANFAAT KEMALANGAN
            </p>
            {benefitData.isKeluarga ? (
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-1.5 items-start">
                <span className="text-[7px] sm:text-[8px] font-semibold text-slate-300 leading-tight">{benefitData.accidentBenefit}</span>
                <span className="text-[7px] sm:text-[8px] font-black text-amber-400 text-right w-12 sm:w-14 shrink-0">
                  {benefitData.totalAccident.split(" + ")[0]}
                </span>
                <span className="text-[7px] sm:text-[8px] font-black text-amber-400 text-right w-12 sm:w-14 shrink-0">
                  {benefitData.totalAccident.split(" + ")[1] ?? "—"}
                </span>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-2">
                <span className="text-[7px] sm:text-[8px] font-semibold text-slate-300 leading-tight">{benefitData.accidentBenefit}</span>
                <span className="text-[7px] sm:text-[8px] font-black text-amber-400 shrink-0">{benefitData.totalAccident}</span>
              </div>
            )}
            <p className="text-[6px] sm:text-[7px] text-slate-500 italic leading-tight">
              * BAYARAN MAKSIMUM TERTAKLUK KEPADA % KECACATAN DAN KELULUSAN PENGENDALI TAKAFUL
            </p>
          </div>

          {/* Child benefit */}
          {benefitData.childBenefit && (
            <>
              <div className="h-px bg-white/[0.06]" />
              <div className="space-y-0.5">
                <p className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-[0.16em]">
                  MANFAAT ANAK (1–17 TAHUN)
                </p>
                <p className="text-[7px] sm:text-[8px] font-semibold text-slate-300 leading-tight">
                  {benefitData.childBenefit}
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        /* ── UNKNOWN PAKEJ fallback ─────────────────────────────────────── */
        <div className="relative z-10 px-3 sm:px-4 py-3 sm:py-4">
          <p className="text-[8.5px] sm:text-[10px] text-slate-400 font-semibold leading-relaxed">
            Sila hubungi pejabat untuk maklumat manfaat penuh pakej ini.
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="relative z-10 mt-auto px-3 sm:px-4 pt-1.5 pb-2 sm:pt-2 sm:pb-2.5 border-t border-amber-500/20">
        <p className="text-center text-[6px] sm:text-[7px] text-slate-500 font-semibold uppercase tracking-wide leading-tight">
          SEMUA TEMPOH BAYARAN TERTAKLUK KEPADA TARIKH DOKUMEN LENGKAP DITERIMA
        </p>
        <p className="text-center text-[7px] sm:text-[8.5px] font-black text-amber-400 uppercase tracking-wide leading-tight">
          SEBUAH PROGRAM KHAIRAT USAHASAMA
        </p>
        <p className="text-center text-[6.5px] sm:text-[8px] font-bold text-amber-400/80 uppercase tracking-wide leading-tight">
          KOPERASI HASIL DALAM NEGERI BERHAD (KOHASIL) &amp; BUMIJEZ SDN BHD (BJSB)
        </p>
      </div>
    </div>
  );
}

// ─── MAIN DISPLAY COMPONENT ─────────────────────────────────────────────────
//
// Split-flip animation technique:
//   Phase 1 (HALF_MS): visible card rotates 0° → 90°  (edge-on, invisible)
//   Content swap:      "shown" state toggles while card is edge-on
//   Phase 2 (HALF_MS): new card starts at -90°, rotates to 0°  (sweeps in)
//
// The container height adapts naturally to front (fixed aspect-ratio) or
// back (auto-height) because only one card is rendered at a time; the
// 90°→-90° jump happens while the card is invisible.
// ─────────────────────────────────────────────────────────────────────────────
export function MembershipCardDisplay({ member }: MembershipCardDisplayProps) {
  const [shown, setShown] = useState<"front" | "back">("front");
  const [rotateY, setRotateY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const HALF_MS = 320; // ms per half-flip

  const flip = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Phase 1: rotate current side to 90° (edge-on)
    setRotateY(90);

    timerRef.current = setTimeout(() => {
      // Swap: jump to -90° and change content while invisible
      setShown((prev) => (prev === "front" ? "back" : "front"));
      setRotateY(-90);

      // Wait one paint cycle so -90° is committed before animating to 0°
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setRotateY(0);
          timerRef.current = setTimeout(() => {
            setIsAnimating(false);
          }, HALF_MS);
        });
      });
    }, HALF_MS);
  }, [isAnimating]);

  const isFlipped = shown === "back";

  return (
    <div className="w-full flex flex-col items-center gap-4 sm:gap-6">
      {/* Flip card wrapper with 3D perspective */}
      <div className="w-full max-w-[540px] px-1 sm:px-0" style={{ perspective: "1200px" }}>
        <div
          className="w-full cursor-pointer"
          style={{
            transform: `rotateY(${rotateY}deg)`,
            transition: `transform ${HALF_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
          onClick={flip}
        >
          {shown === "front" ? (
            <div className="w-full aspect-[85.6/54] rounded-2xl sm:rounded-3xl shadow-2xl">
              <CardFront member={member} />
            </div>
          ) : (
            <CardBack member={member} />
          )}
        </div>
      </div>

      {/* Flip hint button */}
      <button
        type="button"
        onClick={flip}
        disabled={isAnimating}
        className="no-print inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium transition-colors disabled:opacity-60"
      >
        <RotateCw
          className={`w-3.5 h-3.5 text-amber-400 transition-transform duration-500 ${isFlipped ? "rotate-180" : ""}`}
        />
        <span>Klik Kad Untuk {isFlipped ? "Lihat Depan" : "Lihat Belakang"}</span>
      </button>

      {/* ====================================================================
          DEDICATED STACKED EXPORT CONTAINER (#exportable-card-area)
          Rendered offscreen — used for PNG capture & PDF print layout.
          ==================================================================== */}
      <div className="absolute -left-[9999px] -top-[9999px] print:static print:left-0 print:top-0">
        <div
          id="exportable-card-area"
          className="w-[540px] bg-[#07090e] p-6 space-y-6 flex flex-col items-center justify-start rounded-3xl border border-amber-500/30"
        >
          {/* Card 1: Front */}
          <div className="w-full aspect-[85.6/54]">
            <CardFront member={member} />
          </div>

          {/* Card 2: Back — auto height to show all benefits */}
          <div className="w-full">
            <CardBack member={member} />
          </div>
        </div>
      </div>
    </div>
  );
}
