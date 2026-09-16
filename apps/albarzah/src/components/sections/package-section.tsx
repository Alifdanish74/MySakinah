"use client";
// File: src/components/sections/package-section.tsx
// Albarzah — 4 pakej individu from PPT (Slides 4–7, Points 8–11)
// "SAYA PILIH PAKEJ INI (SILA ISI BORANG)" — modal form per pakej

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Star,
  X,
  Info,
  Loader2,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { SECTION_IDS, BRAND } from "@/lib/constants";
import { notaPenting } from "@/data/packages";
import { ResponsiveContainer } from "@sakinah/ui";
import { SectionHeading } from "@sakinah/ui";
import { viewportOnce } from "@sakinah/ui";

// ── Package data (exact from PPT) ──────────────────────────────────────────
interface BenefitRow {
  no: number;
  label: string;
  note: string;
  value: string;
}

interface PakejData {
  id: string;
  yearly: string;          // e.g. "RM 80.00"
  sebulan: string;         // e.g. "RM 2.66"
  sehari: string;          // e.g. "22 SEN"
  umur: string;            // from PPT
  recommended?: boolean;
  manfaatBiasa: BenefitRow[];
  jumlahBiasa: string;
  kemalangan: BenefitRow[];
  jumlahKeseluruhan: string;
}

const PAKEJ_LIST: PakejData[] = [
  {
    id: "pakej-80",
    yearly: "RM 80.00",
    sebulan: "RM 2.66",
    sehari: "22 SEN",
    umur: "UMUR BERMULA 17 TAHUN HINGGA 65 TAHUN DAN BOLEH BAYAR SEHINGGA 70 TAHUN",
    manfaatBiasa: [
      { no: 1, label: "PENGURUSAN JENAZAH LENGKAP / TUNAI", note: "(24 JAM BERSYARAT) (PILIHAN)", value: "RM 1,500.00" },
      { no: 2, label: "TAHLIL DAN KHATAM AL QURAN",          note: "(30 HARI BEKERJA) (BUMIJEZ URUS)", value: "RM 500.00" },
      { no: 3, label: "PAKEJ DIWARISI",                       note: "(60 HARI BEKERJA) (MENGIKUT PAKEJ DIAMBIL)", value: "RM 80.00" },
      { no: 4, label: "WANG KHAIRAT",                         note: "(90 HARI BEKERJA) (DIBAYAR KEPADA WARIS)", value: "RM 920.00" },
    ],
    jumlahBiasa: "RM 3,000.00",
    kemalangan: [
      { no: 1, label: "MENINGGAL",      note: "(3/4 BULAN TERTAKLUK TAKAFUL) (BAYAR PADA WARIS)", value: "RM 5,000.00" },
      { no: 2, label: "KECACATAN KEKAL", note: "(LIHAT PADA KECACATAN) (BAYAR PADA WARIS)", value: "RM 5,000.00" },
    ],
    jumlahKeseluruhan: "RM 8,000.00",
  },
  {
    id: "pakej-120",
    yearly: "RM 120.00",
    sebulan: "RM 10.00",
    sehari: "33 SEN",
    umur: "UMUR BERMULA 17 TAHUN HINGGA 65 TAHUN DAN BOLEH BAYAR SEHINGGA 70 TAHUN",
    manfaatBiasa: [
      { no: 1, label: "PENGURUSAN JENAZAH LENGKAP / TUNAI", note: "(24 JAM BERSYARAT) (PILIHAN)", value: "RM 1,500.00" },
      { no: 2, label: "TAHLIL DAN KHATAM AL QURAN",          note: "(30 HARI BEKERJA) (BUMIJEZ URUS)", value: "RM 500.00" },
      { no: 3, label: "PAKEJ DIWARISI",                       note: "(60 HARI BEKERJA) (MENGIKUT PAKEJ DIAMBIL)", value: "RM 120.00" },
      { no: 4, label: "WANG KHAIRAT",                         note: "(90 HARI BEKERJA) (DIBAYAR KEPADA WARIS)", value: "RM 2,280.00" },
    ],
    jumlahBiasa: "RM 4,400.00",
    kemalangan: [
      { no: 1, label: "MENINGGAL",      note: "(3/4 BULAN TERTAKLUK TAKAFUL) (BAYAR PADA WARIS)", value: "RM 5,000.00" },
      { no: 2, label: "KECACATAN KEKAL", note: "(LIHAT PADA KECACATAN) (BAYAR PADA WARIS)", value: "RM 5,000.00" },
    ],
    jumlahKeseluruhan: "RM 10,000.00",
  },
  {
    id: "pakej-180",
    yearly: "RM 180.00",
    sebulan: "RM 15.00",
    sehari: "50 SEN",
    umur: "UMUR BERMULA 17 TAHUN HINGGA 65 TAHUN DAN BOLEH BAYAR SEHINGGA 70 TAHUN",
    recommended: true,
    manfaatBiasa: [
      { no: 1, label: "PENGURUSAN JENAZAH LENGKAP / TUNAI", note: "(24 JAM BERSYARAT) (PILIHAN)", value: "RM 1,500.00" },
      { no: 2, label: "TAHLIL DAN KHATAM AL QURAN",          note: "(30 HARI BEKERJA) (BUMIJEZ URUS)", value: "RM 500.00" },
      { no: 3, label: "PAKEJ DIWARISI",                       note: "(60 HARI BEKERJA) (MENGIKUT PAKEJ DIAMBIL)", value: "RM 180.00" },
      { no: 4, label: "WANG KHAIRAT",                         note: "(90 HARI BEKERJA) (DIBAYAR KEPADA WARIS)", value: "RM 4,820.00" },
    ],
    jumlahBiasa: "RM 7,000.00",
    kemalangan: [
      { no: 1, label: "MENINGGAL",      note: "(3/4 BULAN TERTAKLUK TAKAFUL) (BAYAR PADA WARIS)", value: "RM 10,000.00" },
      { no: 2, label: "KECACATAN KEKAL", note: "(LIHAT PADA KECACATAN) (BAYAR PADA WARIS)", value: "RM 10,000.00" },
    ],
    jumlahKeseluruhan: "RM 17,000.00",
  },
  {
    id: "pakej-240",
    yearly: "RM 240.00",
    sebulan: "RM 20.00",
    sehari: "66 SEN",
    umur: "UMUR BERMULA 17 TAHUN HINGGA 55 TAHUN DAN BOLEH BAYAR SEHINGGA 70 TAHUN",
    manfaatBiasa: [
      { no: 1, label: "PENGURUSAN JENAZAH LENGKAP / TUNAI", note: "(24 JAM BERSYARAT) (PILIHAN)", value: "RM 1,500.00" },
      { no: 2, label: "TAHLIL DAN KHATAM AL QURAN",          note: "(30 HARI BEKERJA) (BUMIJEZ URUS)", value: "RM 500.00" },
      { no: 3, label: "PAKEJ DIWARISI",                       note: "(60 HARI BEKERJA) (MENGIKUT PAKEJ DIAMBIL)", value: "RM 240.00" },
      { no: 4, label: "WANG KHAIRAT",                         note: "(90 HARI BEKERJA) (DIBAYAR KEPADA WARIS)", value: "RM 6,760.00" },
    ],
    jumlahBiasa: "RM 9,000.00",
    kemalangan: [
      { no: 1, label: "MENINGGAL",      note: "(3/4 BULAN TERTAKLUK TAKAFUL) (BAYAR PADA WARIS)", value: "RM 15,000.00" },
      { no: 2, label: "KECACATAN KEKAL", note: "(LIHAT PADA KECACATAN) (BAYAR PADA WARIS)", value: "RM 15,000.00" },
    ],
    jumlahKeseluruhan: "RM 24,000.00",
  },
];

// ── Dropdown options (exact from PPT Slide 8) ─────────────────────────────
const HUBUNGAN_OPTIONS = [
  "SUAMI", "ISTERI", "AYAH", "IBU",
  "AYAH MERTUA", "IBU MERTUA", "ANAK",
  "ABANG", "KAKAK", "ADIK",
  "ABANG IPAR", "KAKAK IPAR", "ADIK IPAR",
];

const KAWAN_OPTIONS = [
  "KAWAN BAIK", "KAWAN RAPAT", "KAWAN SEKERJA",
  "KAWAN SEKOLAH", "KAWAN SERUMAH", "KAWAN", "KAWAN SEKAMPUNG",
];

// ── IC age compute ─────────────────────────────────────────────────────────
function getAgeFromIC(ic: string): string {
  const d = ic.replace(/\D/g, "");
  if (d.length < 6) return "";
  const yy = parseInt(d.slice(0, 2), 10);
  const mm = parseInt(d.slice(2, 4), 10);
  const dd2 = parseInt(d.slice(4, 6), 10);
  const now = new Date();
  const fy = yy <= now.getFullYear() % 100 ? 2000 + yy : 1900 + yy;
  let age = now.getFullYear() - fy;
  if (now.getMonth() + 1 < mm || (now.getMonth() + 1 === mm && now.getDate() < dd2)) age--;
  return age >= 0 && age <= 120 ? `${age}` : "";
}

function formatIC(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 12);
  if (d.length <= 6) return d;
  if (d.length <= 8) return `${d.slice(0, 6)}-${d.slice(6)}`;
  return `${d.slice(0, 6)}-${d.slice(6, 8)}-${d.slice(8)}`;
}

// ── Borang Form Modal ──────────────────────────────────────────────────────
interface BorangModalProps {
  pakej: PakejData;
  onClose: () => void;
}

function BorangModal({ pakej, onClose }: BorangModalProps) {
  const [ic, setIc] = useState("");
  const [umur, setUmur] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tel, setTel] = useState("");
  const [namaWaris, setNamaWaris] = useState("");
  const [telWaris, setTelWaris] = useState("");
  const [hubungan, setHubungan] = useState("");
  const [namaKawan, setNamaKawan] = useState("");
  const [telKawan, setTelKawan] = useState("");
  const [jenisKawan, setJenisKawan] = useState("");
  const [selectedPakej, setSelectedPakej] = useState(`PAKEJ ${pakej.yearly} SETAHUN`);
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  // Auto-close 5s after success
  useEffect(() => {
    if (status === "success") {
      const t = setTimeout(() => onClose(), 5000);
      return () => clearTimeout(t);
    }
  }, [status, onClose]);

  // Auto-compute age from IC
  const handleIcChange = (raw: string) => {
    const formatted = formatIC(raw);
    setIc(formatted);
    setUmur(getAgeFromIC(formatted));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !tel.trim()) {
      setErrMsg("Sila lengkapkan semua ruangan bertanda *.");
      return;
    }
    setErrMsg("");
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          telefon: tel,
          ic: ic || undefined,
          alamat: alamat || undefined,
          umur: umur || undefined,
          namaWaris: namaWaris || undefined,
          telefonWaris: telWaris || undefined,
          hubunganWaris: hubungan || undefined,
          namaKawan: namaKawan || undefined,
          telefonKawan: telKawan || undefined,
          jenisKawan: jenisKawan || undefined,
          pakej: selectedPakej,
          kaedahHubungi: "whatsapp",
          persetujuan: true,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrMsg("Ralat sambungan. Sila cuba lagi atau hubungi kami melalui WhatsApp.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9998] flex items-center justify-center p-2 xs:p-4 sm:p-6 overflow-hidden"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
        role="dialog"
        aria-modal="true"
        aria-label={`Borang Permohonan Pakej ${pakej.yearly}`}
      >
        <motion.div
          className="relative w-full max-w-lg max-h-[92dvh] xs:max-h-[88dvh] sm:max-h-[85vh] rounded-2xl sm:rounded-3xl bg-white shadow-2xl flex flex-col overflow-hidden text-left border border-amber-200/50"
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ duration: 0.22 }}
        >
          {/* Modal header - Sticky at Top */}
          <div
            className="sticky top-0 z-20 flex items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4 flex-shrink-0 shadow-sm"
            style={{ background: "var(--color-brand-green)" }}
          >
            <div className="min-w-0 pr-2">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/70 truncate">
                PAKEJ MY SAKINAH PRO INDIVIDU
              </p>
              <h2 className="text-sm xs:text-base sm:text-lg font-black text-white truncate">
                BORANG PERMOHONAN — {pakej.yearly} SETAHUN
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0 cursor-pointer"
              aria-label="Tutup borang"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Success state */}
          {status === "success" ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12 px-6 text-center overflow-y-auto">
              <CheckCircle2
                className="h-14 w-14"
                style={{ color: "var(--color-brand-green-light)" }}
              />
              <h3 className="text-lg font-bold" style={{ color: "var(--color-brand-green-dark)" }}>
                Permohonan Berjaya Dihantar!
              </h3>
              <p className="text-xs sm:text-sm max-w-xs" style={{ color: "var(--color-brand-text-muted)" }}>
                RESIT AKAN DIHANTAR SETELAH BAYARAN DISAHKAN.
                Anda boleh dapatkan Kad Keahlian selepas 3 hari waktu bekerja melalui WhatsApp.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {/* Form Scrollable Body */}
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-800">

                {/* NAMA */}
                <div>
                  <label htmlFor="bNama" className="block text-xs font-bold mb-1 uppercase tracking-wide" style={{ color: "var(--color-brand-text)" }}>
                    NAMA DALAM KAD PENGENALAN <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="bNama"
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value.toUpperCase())}
                    placeholder="MOHD ZAINAL BIN KHAMIS"
                    className="form-input w-full min-h-[44px] text-xs sm:text-sm"
                    style={{ textTransform: "uppercase" }}
                    required
                  />
                </div>

                {/* IC + UMUR (Mobile-First Stack / Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label htmlFor="bIc" className="block text-xs font-bold mb-1 uppercase tracking-wide" style={{ color: "var(--color-brand-text)" }}>
                      NO KAD PENGENALAN
                    </label>
                    <input
                      id="bIc"
                      type="text"
                      value={ic}
                      onChange={(e) => handleIcChange(e.target.value)}
                      placeholder="000000-00-0000"
                      maxLength={14}
                      className="form-input w-full min-h-[44px] text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="bUmur" className="block text-xs font-bold mb-1 uppercase tracking-wide" style={{ color: "var(--color-brand-text)" }}>
                      UMUR
                    </label>
                    <input
                      id="bUmur"
                      type="text"
                      readOnly
                      value={umur ? `${umur} thn` : "automatik"}
                      className="form-input w-full min-h-[44px] text-xs sm:text-sm"
                      style={{
                        background: "var(--color-brand-sage-soft)",
                        cursor: "default",
                        color: umur ? "var(--color-brand-green)" : "var(--color-brand-text-muted)",
                        fontWeight: umur ? "700" : "400",
                      }}
                      aria-label="Umur dikira secara automatik"
                    />
                  </div>
                </div>

                {/* ALAMAT */}
                <div>
                  <label htmlFor="bAlamat" className="block text-xs font-bold mb-1 uppercase tracking-wide" style={{ color: "var(--color-brand-text)" }}>
                    ALAMAT TEMPAT TINGGAL
                  </label>
                  <textarea
                    id="bAlamat"
                    rows={2}
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    placeholder={"LOT 19 JALAN SERI AMAN MAS 1,\nKAMPUNG SERI AMAN MAS\n47100 PUCHONG SELANGOR"}
                    className="form-input w-full text-xs sm:text-sm p-3"
                    style={{ resize: "none" }}
                  />
                </div>

                {/* NO TEL */}
                <div>
                  <label htmlFor="bTel" className="block text-xs font-bold mb-1 uppercase tracking-wide" style={{ color: "var(--color-brand-text)" }}>
                    NO TEL <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="bTel"
                    type="tel"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    placeholder="017-338 3884"
                    className="form-input w-full min-h-[44px] text-xs sm:text-sm"
                    required
                  />
                </div>

                {/* WARIS DI KALANGAN KELUARGA */}
                <div
                  className="rounded-2xl p-3.5 sm:p-4 space-y-3"
                  style={{ background: "var(--color-brand-sage-soft)", border: "1px solid var(--color-brand-border)" }}
                >
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide" style={{ color: "var(--color-brand-green)" }}>
                      WARIS DI KALANGAN KELUARGA
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                      (waris perlu dimaklum &amp; akan dihubungi bila berlaku kematian)
                    </p>
                  </div>
                  <input
                    type="text"
                    value={namaWaris}
                    onChange={(e) => setNamaWaris(e.target.value.toUpperCase())}
                    placeholder="NAMA WARIS"
                    className="form-input w-full min-h-[44px] text-xs sm:text-sm"
                    style={{ textTransform: "uppercase" }}
                    aria-label="Nama waris"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="tel"
                      value={telWaris}
                      onChange={(e) => setTelWaris(e.target.value)}
                      placeholder="NO TEL WARIS (012-600 3884)"
                      className="form-input min-h-[44px] text-xs sm:text-sm"
                      aria-label="Telefon waris"
                    />
                    <select
                      value={hubungan}
                      onChange={(e) => setHubungan(e.target.value)}
                      className="form-input min-h-[44px] text-xs sm:text-sm"
                      aria-label="Hubungan dengan pemohon"
                    >
                      <option value="">HUBUNGAN</option>
                      {HUBUNGAN_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* KAWAN SELAIN WARIS */}
                <div
                  className="rounded-2xl p-3.5 sm:p-4 space-y-3"
                  style={{ background: "rgba(243,182,1,0.07)", border: "1px solid rgba(243,182,1,0.25)" }}
                >
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide" style={{ color: "var(--color-brand-gold)" }}>
                      KAWAN SELAIN WARIS
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                      (kawan hendaklah diberitahu &amp; akan dihubungi bila berlaku kematian)
                    </p>
                  </div>
                  <input
                    type="text"
                    value={namaKawan}
                    onChange={(e) => setNamaKawan(e.target.value.toUpperCase())}
                    placeholder="NAMA KAWAN"
                    className="form-input w-full min-h-[44px] text-xs sm:text-sm"
                    style={{ textTransform: "uppercase" }}
                    aria-label="Nama kawan"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="tel"
                      value={telKawan}
                      onChange={(e) => setTelKawan(e.target.value)}
                      placeholder="NO (011-5550 3884)"
                      className="form-input min-h-[44px] text-xs sm:text-sm"
                      aria-label="Telefon kawan"
                    />
                    <select
                      value={jenisKawan}
                      onChange={(e) => setJenisKawan(e.target.value)}
                      className="form-input min-h-[44px] text-xs sm:text-sm"
                      aria-label="Jenis kawan"
                    >
                      <option value="">KAWAN</option>
                      {KAWAN_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* PAKEJ DAN BAYARAN */}
                <div
                  className="rounded-2xl p-3.5 sm:p-4 space-y-2"
                  style={{ background: "#fff", border: "1.5px solid var(--color-brand-gold)" }}
                >
                  <label htmlFor="bPakej" className="block text-xs font-black uppercase tracking-wide" style={{ color: "var(--color-brand-green-dark)" }}>
                    PAKEJ DAN BAYARAN <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    id="bPakej"
                    value={selectedPakej}
                    onChange={(e) => setSelectedPakej(e.target.value)}
                    className="form-input w-full min-h-[44px] text-xs sm:text-sm font-bold"
                    style={{ color: "var(--color-brand-green-dark)" }}
                    required
                  >
                    <option value="PAKEJ RM 80.00 SETAHUN">PAKEJ RM 80.00 SETAHUN</option>
                    <option value="PAKEJ RM 120.00 SETAHUN">PAKEJ RM 120.00 SETAHUN</option>
                    <option value="PAKEJ RM 180.00 SETAHUN">PAKEJ RM 180.00 SETAHUN</option>
                    <option value="PAKEJ RM 240.00 SETAHUN">PAKEJ RM 240.00 SETAHUN</option>
                    <option value="PAKEJ RM 1,500 SEUMUR HIDUP">PAKEJ RM 1,500 SEUMUR HIDUP</option>
                  </select>
                </div>

                {/* CARA BAYARAN */}
                <div
                  className="rounded-2xl p-3.5 sm:p-4"
                  style={{ background: "var(--color-brand-cream)", border: "1px solid var(--color-brand-border)" }}
                >
                  <p className="text-xs font-black uppercase tracking-wide mb-1" style={{ color: "var(--color-brand-green)" }}>
                    CARA BAYARAN
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-slate-600 mb-3">(no akaun / qr)</p>

                  {/* Slip upload */}
                  <label
                    className="flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed p-3.5 cursor-pointer transition-all bg-white"
                    style={{ borderColor: slipFile ? "var(--color-brand-green)" : "var(--color-brand-border)" }}
                    aria-label="Hantar slip bayaran"
                  >
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="sr-only"
                      onChange={(e) => setSlipFile(e.target.files?.[0] ?? null)}
                    />
                    {slipFile ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: "var(--color-brand-green)" }} aria-hidden="true" />
                        <span className="text-xs font-bold truncate max-w-[200px]" style={{ color: "var(--color-brand-green-dark)" }}>
                          {slipFile.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-600 font-bold uppercase tracking-wide">
                        📷 HANTAR SLIP BAYARAN
                      </span>
                    )}
                  </label>

                  <p className="text-[10px] text-slate-500 mt-2 text-center font-medium">
                    RESIT AKAN DIHANTAR SETELAH BAYARAN DISAHKAN
                  </p>
                </div>

                {/* Kad keahlian note */}
                <div
                  className="rounded-2xl px-3.5 py-3 flex items-start gap-2 border"
                  style={{ background: "var(--color-brand-sage-soft)", borderColor: "var(--color-brand-border)" }}
                >
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--color-brand-green)" }} aria-hidden="true" />
                  <p className="text-[11px] sm:text-xs font-semibold leading-relaxed" style={{ color: "var(--color-brand-green-dark)" }}>
                    ANDA BOLEH DAPATKAN KAD KEAHLIAN SELEPAS 3 HARI WAKTU BEKERJA MELALUI WHATSAPP
                  </p>
                </div>

                {/* Error */}
                {errMsg && (
                  <div className="flex items-center gap-2 rounded-xl p-3 text-xs sm:text-sm font-semibold" style={{ background: "#fef2f2", color: "red" }} role="alert">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <span>{errMsg}</span>
                  </div>
                )}
              </div>

              {/* Submit Footer - Sticky at Bottom */}
              <div className="sticky bottom-0 z-20 p-3.5 sm:px-6 bg-white border-t border-slate-200 flex-shrink-0 shadow-lg">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-full py-3 text-xs sm:text-sm font-black uppercase tracking-wider transition-all disabled:opacity-60 cursor-pointer shadow-md"
                  style={{ background: "var(--color-brand-green)", color: "#fff" }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      MENGHANTAR…
                    </>
                  ) : (
                    "HANTAR PERMOHONAN"
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main PackageSection ────────────────────────────────────────────────────
export function PackageSection() {
  const [activeForm, setActiveForm] = useState<PakejData | null>(null);
  const [notaOpen, setNotaOpen] = useState(false);

  // Lock body scroll when modal open
  useEffect(() => {
    if (activeForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeForm]);

  return (
    <section
      id={SECTION_IDS.pakej}
      aria-label="Pakej Albarzah"
      className="section-texture py-16 lg:py-24"
      style={{ background: "var(--color-brand-ivory)" }}
    >
      <ResponsiveContainer>
        <SectionHeading
          eyebrow="PAKEJ MY SAKINAH PRO INDIVIDU"
          title="Pilih Pakej Yang Sesuai"
          subtitle="PAKEJ KHAIRAT KEMATIAN DAN PENGURUSAN JENAZAH LENGKAP"
          className="mb-12"
        />

        {/* 4-plan grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          {PAKEJ_LIST.map((pkg, idx) => {
            const isRec = !!pkg.recommended;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative flex flex-col rounded-3xl overflow-hidden"
                style={{
                  background: isRec ? "var(--color-brand-green)" : "#fff",
                  border: isRec
                    ? "2px solid var(--color-brand-gold-light)"
                    : "1.5px solid var(--color-brand-border)",
                  boxShadow: isRec
                    ? "0 20px 56px rgba(0,71,60,0.25)"
                    : "0 4px 20px rgba(0,71,60,0.07)",
                }}
              >
                {/* Recommended badge */}
                {isRec && (
                  <div
                    className="flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-black uppercase"
                    style={{
                      background: "var(--color-brand-gold-light)",
                      color: "var(--color-brand-green-dark)",
                    }}
                  >
                    <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                    PILIHAN POPULAR
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col gap-4">
                  {/* Price */}
                  <div>
                    <p
                      className="text-3xl font-black tabular-nums leading-none"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: isRec ? "#fff" : "var(--color-brand-green)",
                      }}
                    >
                      {pkg.yearly}
                    </p>
                    <p
                      className="text-xs font-bold mt-1"
                      style={{ color: isRec ? "rgba(255,255,255,0.65)" : "var(--color-brand-text-muted)" }}
                    >
                      {pkg.sebulan} SEBULAN / {pkg.sehari} SEHARI
                    </p>
                  </div>

                  {/* Benefit rows — Biasa */}
                  <div>
                    <p
                      className="text-[10px] font-black uppercase tracking-widest mb-2"
                      style={{ color: isRec ? "rgba(255,255,255,0.5)" : "var(--color-brand-text-muted)" }}
                    >
                      MANFAAT MENINGGAL BIASA
                    </p>
                    <ul className="space-y-1.5">
                      {pkg.manfaatBiasa.map((b) => (
                        <li key={b.no} className="flex items-start gap-2">
                          <CheckCircle2
                            className="h-3.5 w-3.5 flex-shrink-0 mt-0.5"
                            style={{ color: isRec ? "var(--color-brand-gold-light)" : "var(--color-brand-green-light)" }}
                            aria-hidden="true"
                          />
                          <div className="flex items-center justify-between w-full gap-1 min-w-0">
                            <span
                              className="text-[11px] leading-snug"
                              style={{ color: isRec ? "rgba(255,255,255,0.8)" : "var(--color-brand-text)" }}
                            >
                              {b.label}
                            </span>
                            <span
                              className="text-[11px] font-black flex-shrink-0 tabular-nums"
                              style={{ color: isRec ? "#fff" : "var(--color-brand-green)" }}
                            >
                              {b.value.replace(".00", "")}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Kemalangan */}
                  <div>
                    <p
                      className="text-[10px] font-black uppercase tracking-widest mb-2"
                      style={{ color: isRec ? "rgba(255,255,255,0.5)" : "var(--color-brand-text-muted)" }}
                    >
                      BERLAKU KEMALANGAN
                    </p>
                    <ul className="space-y-1.5">
                      {pkg.kemalangan.map((b) => (
                        <li key={b.no} className="flex items-start gap-2">
                          <CheckCircle2
                            className="h-3.5 w-3.5 flex-shrink-0 mt-0.5"
                            style={{ color: isRec ? "rgba(243,182,1,0.8)" : "var(--color-brand-gold)" }}
                            aria-hidden="true"
                          />
                          <div className="flex items-center justify-between w-full gap-1 min-w-0">
                            <span
                              className="text-[11px] leading-snug"
                              style={{ color: isRec ? "rgba(255,255,255,0.8)" : "var(--color-brand-text)" }}
                            >
                              {b.label}
                            </span>
                            <span
                              className="text-[11px] font-black flex-shrink-0 tabular-nums"
                              style={{ color: isRec ? "#fff" : "var(--color-brand-gold)" }}
                            >
                              {b.value.replace(".00", "")}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Jumlah */}
                  <div
                    className="rounded-xl px-4 py-2.5 flex items-center justify-between"
                    style={{
                      background: isRec ? "rgba(255,255,255,0.12)" : "var(--color-brand-sage-soft)",
                    }}
                  >
                    <span
                      className="text-[10px] font-bold uppercase"
                      style={{ color: isRec ? "rgba(255,255,255,0.65)" : "var(--color-brand-text-muted)" }}
                    >
                      JUMLAH KESELURUHAN MANFAAT
                    </span>
                    <span
                      className="text-sm font-black tabular-nums"
                      style={{ color: isRec ? "#fff" : "var(--color-brand-green)" }}
                    >
                      {pkg.jumlahKeseluruhan.replace(".00", "")}
                    </span>
                  </div>

                  {/* Umur */}
                  <p
                    className="text-[10px] text-center leading-snug"
                    style={{ color: isRec ? "rgba(255,255,255,0.5)" : "var(--color-brand-text-muted)" }}
                  >
                    {pkg.umur}
                  </p>

                  {/* CTA — exactly as PPT: "SAYA PILIH PAKEJ INI (SILA ISI BORANG)" */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveForm(pkg)}
                    className="w-full rounded-full py-3 text-xs font-black uppercase tracking-wider cursor-pointer flex flex-col items-center"
                    style={
                      isRec
                        ? { background: "var(--color-brand-gold-light)", color: "var(--color-brand-green-dark)" }
                        : { background: "var(--color-brand-green)", color: "#fff" }
                    }
                    type="button"
                    aria-label={`Pilih pakej ${pkg.yearly}`}
                  >
                    <span>SAYA PILIH PAKEJ INI</span>
                    <span className="text-[9px] font-semibold opacity-75 normal-case">(SILA ISI BORANG)</span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── NOTA PENTING accordion (exact from PPT) ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto rounded-2xl overflow-hidden border"
          style={{ borderColor: "var(--color-brand-gold)", background: "#fff" }}
        >
          <button
            type="button"
            onClick={() => setNotaOpen((o) => !o)}
            className="w-full flex items-center justify-between gap-4 px-6 py-4 cursor-pointer"
            aria-expanded={notaOpen}
            aria-controls="nota-penting-body"
          >
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" style={{ color: "var(--color-brand-gold)" }} aria-hidden="true" />
              <span className="text-sm font-black uppercase tracking-wider" style={{ color: "var(--color-brand-green-dark)" }}>
                NOTA PENTING
              </span>
            </div>
            <motion.div animate={{ rotate: notaOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
              <ChevronDown className="h-4 w-4" style={{ color: "var(--color-brand-gold)" }} aria-hidden="true" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {notaOpen && (
              <motion.div
                id="nota-penting-body"
                key="nota"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28 }}
                style={{ overflow: "hidden" }}
              >
                <div className="px-6 pb-5 border-t" style={{ borderColor: "var(--color-brand-border)" }}>
                  <ul className="mt-4 space-y-3">
                    {/* First nota: the main tarikh rule */}
                    <li className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-black mt-0.5"
                        style={{ background: "var(--color-brand-gold-light)", color: "var(--color-brand-green-dark)" }}
                      >
                        ★
                      </span>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-text)" }}>
                        Tarikh keahlian bermula pada <strong>01 dan 15 haribuan</strong> setiap bulan DAN Manfaat akan bermula <strong>30 hari</strong> dari Tarikh keahlian.
                      </p>
                    </li>
                    {/* Rules 1 & 2 from PPT */}
                    {notaPenting.slice(1).map((nota, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-black mt-0.5"
                          style={{ background: "var(--color-brand-gold-light)", color: "var(--color-brand-green-dark)" }}
                        >
                          {i + 1}
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-text)" }}>
                          {nota}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </ResponsiveContainer>

      {/* Per-pakej Borang Modal */}
      {activeForm && (
        <BorangModal pakej={activeForm} onClose={() => setActiveForm(null)} />
      )}
    </section>
  );
}
