"use client";

import { useState } from "react";
import { ICSearchForm } from "@/components/ic-search-form";
import { MembershipCardDisplay, type MemberData } from "@/components/membership-card-display";
import { CardDownloadActions } from "@/components/card-download-actions";
import { ShieldCheck, Sparkles, CheckCircle2, FileText, ArrowLeft, Download, CreditCard, Lock, Layers } from "lucide-react";

export default function MembershipCardPage() {
  const [memberList, setMemberList] = useState<MemberData[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (ic: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/membership_card/api/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ic }),
      });

      const data = await res.json();

      if (!res.ok || !data.found) {
        setError(data.error || "Maklumat keahlian tidak dijumpai.");
        setMemberList([]);
        setActiveCardIndex(0);
      } else {
        const list = data.members && data.members.length > 0 ? data.members : [data.member];
        setMemberList(list);
        setActiveCardIndex(0);
      }
    } catch (err: any) {
      console.error("Error looking up IC:", err);
      setError("Berlaku ralat sambungan semasa menyemak maklumat. Sila cuba lagi.");
      setMemberList([]);
      setActiveCardIndex(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMemberList([]);
    setActiveCardIndex(0);
    setError(null);
  };

  const activeMember = memberList[activeCardIndex] || null;

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* Search State View */}
      {memberList.length === 0 ? (
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Portal Kad Keahlian Rasmi MySakinah Pro</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Semakan & Kad Keahlian Digital
            </h1>
            <p className="text-base sm:text-lg text-slate-400">
              Masukkan nombor Kad Pengenalan (MyKad) anda di bawah untuk menyemak status keahlian dan memuat turun Kad Keahlian Digital rasmi.
            </p>
          </div>

          {/* Search Form */}
          <ICSearchForm onSearch={handleSearch} isLoading={isLoading} error={error} />

          {/* Features Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6 no-print">
            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Pengesahan Segera 24/7</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Semakan status keahlian serta-merta tanpa perlu menunggu borang fizikal.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Download className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Muat Turun & Simpan Kad</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Simpan kad digital dalam format PNG berkualiti tinggi atau cetak untuk kegunaan urusan.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Kod QR & Keselamatan</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Dilengkapi Kod QR verifikasi untuk mengesahkan kesahihan rekod keahlian anda.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Member Card Display View */
        <section className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="flex flex-wrap items-center justify-between gap-4 no-print border-b border-slate-800 pb-4">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali Ke Semakan IC</span>
            </button>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{memberList.length} Kad Keahlian Berdaftar</span>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Kad Keahlian Digital Rasmi
            </h1>
            <p className="text-sm text-slate-400">
              Berikut adalah kad keahlian digital bagi <span className="text-amber-300 font-semibold">{activeMember?.nama}</span>.
            </p>
          </div>

          {/* Module Selector Tabs (Shown if user belongs to 2 or more modules) */}
          {memberList.length > 1 && (
            <div className="max-w-xl mx-auto no-print bg-slate-900/90 border border-amber-500/30 p-1.5 rounded-2xl flex flex-wrap gap-1.5 justify-center shadow-xl">
              {memberList.map((m, idx) => {
                const isActive = idx === activeCardIndex;
                return (
                  <button
                    key={m.id || idx}
                    type="button"
                    onClick={() => setActiveCardIndex(idx)}
                    className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2 ${isActive
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20"
                        : "bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                      }`}
                  >
                    <CreditCard className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-amber-400"}`} />
                    <span className="truncate">{m.skim}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Digital 3D Card Display */}
          {activeMember && <MembershipCardDisplay member={activeMember} />}

          {/* Card Export & Download Action Buttons */}
          {activeMember && (
            <CardDownloadActions
              memberName={activeMember.nama}
              icNumber={activeMember.ic}
              onReset={handleReset}
            />
          )}

          {/* Member Details Breakdown Table */}
          {activeMember && (
            <div className="max-w-2xl mx-auto bg-slate-900/80 border border-amber-500/20 rounded-2xl p-6 shadow-xl no-print">
              <h3 className="text-base font-bold text-white flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Ringkasan Profil Keahlian ({activeMember.skim})</span>
                </span>
                {memberList.length > 1 && (
                  <span className="text-xs font-mono font-medium text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    Kad {activeCardIndex + 1} daripada {memberList.length}
                  </span>
                )}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-medium block">Nama Penuh</span>
                  <p className="font-semibold text-slate-200">{activeMember.nama}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-medium block">No. Kad Pengenalan</span>
                  <p className="font-mono font-semibold text-amber-300">{activeMember.ic}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-medium block">No. Keahlian</span>
                  <p className="font-mono font-semibold text-amber-400">{activeMember.noAhli}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-medium block">Program / Skim</span>
                  <p className="font-semibold text-slate-200">{activeMember.skim}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-medium block">Pakej Yang Didaftar</span>
                  <p className="font-semibold text-slate-300">{activeMember.pakej}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-medium block">Tarikh Pendaftaran</span>
                  <p className="font-mono font-semibold text-slate-300">{activeMember.tarikhDaftar}</p>
                </div>

                <div className="space-y-1 sm:col-span-2 pt-2 border-t border-slate-800">
                  <span className="text-xs text-slate-500 font-medium block">Penama Waris Berdaftar</span>
                  <p className="font-semibold text-slate-200">
                    {activeMember.namaWaris || "Tiada Maklumat Waris"}{" "}
                    {activeMember.telefonWaris && <span className="text-amber-400 text-xs ml-2">({activeMember.telefonWaris})</span>}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
