"use client";

import { useState } from "react";
import { ICSearchForm } from "@/components/ic-search-form";
import { MembershipCardDisplay, type MemberData } from "@/components/membership-card-display";
import { CardDownloadActions } from "@/components/card-download-actions";
import { ShieldCheck, Sparkles, CheckCircle2, FileText, ArrowLeft, Download, CreditCard, Lock, Layers, Clock, AlertTriangle, XCircle, PhoneCall } from "lucide-react";

// ── Status message config ──────────────────────────────────────────────────
interface StatusInfo {
  icon: React.ReactNode;
  title: string;
  message: string;
  subMessage?: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
}

function getStatusInfo(status: string): StatusInfo | null {
  const s = status.toLowerCase();

  if (s === "aktif") return null; // show card normally

  if (s === "baru" || s === "terima") {
    return {
      icon: <Clock className="w-10 h-10 text-amber-400" />,
      title: "Pendaftaran Anda Sedang Diproses",
      message: "Permohonan keahlian anda telah diterima dan sedang dalam semakan. Proses ini mengambil masa 3–7 hari bekerja.",
      subMessage: "Anda akan dihubungi melalui nombor telefon berdaftar apabila keahlian anda telah diaktifkan.",
      colorClass: "text-amber-400",
      borderClass: "border-amber-500/40",
      bgClass: "bg-amber-500/8",
    };
  }

  if (s === "proses" || s === "tangguh") {
    return {
      icon: <Clock className="w-10 h-10 text-blue-400" />,
      title: "Permohonan Dalam Semakan Lanjut",
      message: "Permohonan anda sedang melalui semakan tambahan oleh pihak pentadbir. Sila bersabar.",
      subMessage: "Sekiranya anda memerlukan maklumat lanjut, sila hubungi pejabat kami.",
      colorClass: "text-blue-400",
      borderClass: "border-blue-500/40",
      bgClass: "bg-blue-500/8",
    };
  }

  if (s === "tamat") {
    return {
      icon: <XCircle className="w-10 h-10 text-slate-400" />,
      title: "Keahlian Telah Tamat",
      message: "Keahlian anda dalam program ini telah tamat. Anda tidak lagi menerima manfaat perlindungan.",
      subMessage: "Untuk mendaftar semula atau mengetahui program lain, sila hubungi pejabat kami.",
      colorClass: "text-slate-400",
      borderClass: "border-slate-600/40",
      bgClass: "bg-slate-800/40",
    };
  }

  if (s === "tak layak" || s === "lebih umur") {
    return {
      icon: <AlertTriangle className="w-10 h-10 text-orange-400" />,
      title: "Permohonan Tidak Layak",
      message: s === "lebih umur"
        ? "Permohonan anda tidak dapat diproses kerana had umur yang ditetapkan telah melebihi syarat kelayakan pakej."
        : "Permohonan anda tidak memenuhi syarat kelayakan yang ditetapkan untuk program ini.",
      subMessage: "Sila hubungi pejabat kami untuk mendapatkan maklumat mengenai program lain yang sesuai.",
      colorClass: "text-orange-400",
      borderClass: "border-orange-500/40",
      bgClass: "bg-orange-500/8",
    };
  }

  if (s === "meninggal") {
    return {
      icon: <ShieldCheck className="w-10 h-10 text-emerald-400" />,
      title: "Rekod Telah Dikemaskini",
      message: "Rekod keahlian ini telah dikemaskini. Untuk urusan tuntutan atau maklumat lanjut, sila hubungi pejabat kami.",
      subMessage: "Semoga rohnya dicucuri rahmat. Al-Fatihah.",
      colorClass: "text-emerald-400",
      borderClass: "border-emerald-500/40",
      bgClass: "bg-emerald-500/8",
    };
  }

  // Generic fallback for any other unknown status
  return {
    icon: <AlertTriangle className="w-10 h-10 text-slate-400" />,
    title: "Status Keahlian Tidak Aktif",
    message: "Status keahlian anda pada masa ini tidak aktif. Sila hubungi pejabat kami untuk maklumat lanjut.",
    colorClass: "text-slate-400",
    borderClass: "border-slate-600/40",
    bgClass: "bg-slate-800/40",
  };
}

// ── Status Banner Component ────────────────────────────────────────────────
function StatusBanner({ member, onReset }: { member: MemberData; onReset: () => void }) {
  const info = getStatusInfo(member.status);
  if (!info) return null;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className={`rounded-2xl border ${info.borderClass} ${info.bgClass} p-8 flex flex-col items-center text-center gap-4 shadow-xl`}>
        <div className={`w-20 h-20 rounded-full flex items-center justify-center border ${info.borderClass} bg-slate-900/60`}>
          {info.icon}
        </div>
        <div className="space-y-2">
          <h2 className={`text-xl font-black ${info.colorClass} tracking-tight`}>{info.title}</h2>
          <p className="text-sm text-slate-300 leading-relaxed">{info.message}</p>
          {info.subMessage && (
            <p className="text-xs text-slate-500 leading-relaxed">{info.subMessage}</p>
          )}
        </div>

        {/* Member identity strip */}
        <div className="w-full mt-2 pt-4 border-t border-slate-700/60 grid grid-cols-2 gap-3 text-left">
          <div>
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block">Nama</span>
            <p className="text-sm font-bold text-white truncate">{member.nama}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block">Program</span>
            <p className="text-sm font-bold text-slate-300 truncate">{member.skim}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block">No. K/P</span>
            <p className="text-sm font-mono font-bold text-amber-400">{member.ic}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block">Status</span>
            <p className={`text-sm font-bold ${info.colorClass} capitalize`}>{member.status}</p>
          </div>
        </div>

        {/* Hotline */}
        <a
          href="tel:01113001999"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 border border-slate-700 hover:border-amber-500/50 text-amber-400 text-sm font-bold transition-colors"
        >
          <PhoneCall className="w-4 h-4" />
          Hubungi Hotline: 011 1300 1999
        </a>
      </div>

      <button
        onClick={onReset}
        className="w-full inline-flex items-center justify-center gap-2 text-slate-400 hover:text-amber-400 text-sm font-medium transition-colors py-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali Ke Semakan IC
      </button>
    </div>
  );
}

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
  const isMemberActive = activeMember?.status?.toLowerCase() === "aktif";

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
              Semakan &amp; Kad Keahlian Digital
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
                <h3 className="font-bold text-white text-sm">Muat Turun &amp; Simpan Kad</h3>
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
                <h3 className="font-bold text-white text-sm">Kod QR &amp; Keselamatan</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Dilengkapi Kod QR verifikasi untuk mengesahkan kesahihan rekod keahlian anda.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Member Card / Status View */
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

          {/* Module Selector Tabs (shown if 2+ modules) */}
          {memberList.length > 1 && (
            <div className="max-w-xl mx-auto no-print bg-slate-900/90 border border-amber-500/30 p-1.5 rounded-2xl flex flex-wrap gap-1.5 justify-center shadow-xl">
              {memberList.map((m, idx) => {
                const isTabActive = idx === activeCardIndex;
                return (
                  <button
                    key={m.id || idx}
                    type="button"
                    onClick={() => setActiveCardIndex(idx)}
                    className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2 ${isTabActive
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20"
                        : "bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                      }`}
                  >
                    <CreditCard className={`w-4 h-4 ${isTabActive ? "text-slate-950" : "text-amber-400"}`} />
                    <span className="truncate">{m.skim}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── ACTIVE: show full digital card ── */}
          {activeMember && isMemberActive && (
            <>
              <MembershipCardDisplay member={activeMember} />

              <CardDownloadActions
                memberName={activeMember.nama}
                icNumber={activeMember.ic}
                onReset={handleReset}
              />

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
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 font-medium block">Tempoh Keahlian</span>
                    <p className="font-semibold text-amber-300 uppercase">
                      {activeMember.tempohKeahlian || activeMember.tarikhDaftar}
                    </p>
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
            </>
          )}

          {/* ── NON-ACTIVE: show status message banner ── */}
          {activeMember && !isMemberActive && (
            <StatusBanner member={activeMember} onReset={handleReset} />
          )}
        </section>
      )}
    </div>
  );
}
