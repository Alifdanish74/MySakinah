"use client";
// File: src/components/sections/package-form-modal.tsx
// Albarzah — Dedicated Popup Form Modal for individual package registrations

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, AlertCircle, Upload, Phone, ShieldCheck } from "lucide-react";

// ── Dropdown options ──────────────────────────────────────────────────────
const HUBUNGAN_OPTIONS = [
  "SUAMI", "ISTERI", "AYAH", "IBU",
  "AYAH MERTUA", "IBU MERTUA", "ANAK",
  "ABANG", "KAKAK", "ADIK",
  "ABANG IPAR", "KAKAK IPAR", "ADIK IPAR",
];

const KAWAN_OPTIONS = [
  "KAWAN BAIK", "KAWAN RAPAT", "KAWAN SEKERJA",
  "KAWAN SEKOLAH", "KAWAN SERUMAH", "KAWAN SEKAMPUNG",
];

const MALAYSIAN_STATES = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Perak",
  "Perlis",
  "Pulau Pinang",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "Wilayah Persekutuan Kuala Lumpur",
  "Wilayah Persekutuan Labuan",
  "Wilayah Persekutuan Putrajaya",
] as const;

// ── IC helper ─────────────────────────────────────────────────────────────
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

// ── Package Metadata for Modal Header ─────────────────────────────────────
const PACKAGE_DETAILS_MAP: Record<string, { yearly: string; monthly: string; daily: string; age: string; total: string }> = {
  "PAKEJ RM80.00 SETAHUN": {
    yearly: "RM80.00 SETAHUN",
    monthly: "RM2.66 / sebulan",
    daily: "22 sen / sehari",
    age: "17 – 65 tahun",
    total: "RM8,000",
  },
  "PAKEJ RM120.00 SETAHUN": {
    yearly: "RM120.00 SETAHUN",
    monthly: "RM10.00 / sebulan",
    daily: "33 sen / sehari",
    age: "17 – 65 tahun",
    total: "RM10,000",
  },
  "PAKEJ RM180.00 SETAHUN": {
    yearly: "RM180.00 SETAHUN",
    monthly: "RM15.00 / sebulan",
    daily: "50 sen / sehari",
    age: "17 – 65 tahun",
    total: "RM17,000",
  },
  "PAKEJ RM240.00 SETAHUN": {
    yearly: "RM240.00 SETAHUN",
    monthly: "RM20.00 / sebulan",
    daily: "66 sen / sehari",
    age: "17 – 55 tahun",
    total: "RM24,000",
  },
  "PAKEJ PERMATA INDIVIDU": {
    yearly: "RM1,500.00 SEUMUR HIDUP",
    monthly: "Bayaran Sekali Sahaja",
    daily: "Seumur Hidup",
    age: "Selepas Umur 70 Tahun",
    total: "RM1,730.00",
  },
  "PAKEJ RM1,500 SEUMUR HIDUP": {
    yearly: "RM1,500.00 SEUMUR HIDUP",
    monthly: "Bayaran Sekali Sahaja",
    daily: "Seumur Hidup",
    age: "Selepas Umur 70 Tahun",
    total: "RM1,730.00",
  },
};

interface PackageFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
}

export function PackageFormModal({ isOpen, onClose, packageName }: PackageFormModalProps) {
  const [ic, setIc] = useState("");
  const [umur, setUmur] = useState("");
  const [nama, setNama] = useState("");
  const [alamat1, setAlamat1] = useState("");
  const [poskod, setPoskod] = useState("");
  const [daerah, setDaerah] = useState("");
  const [negeri, setNegeri] = useState("");
  const [tel, setTel] = useState("");
  const [namaWaris, setNamaWaris] = useState("");
  const [telWaris, setTelWaris] = useState("");
  const [hubungan, setHubungan] = useState("");
  const [namaKawan, setNamaKawan] = useState("");
  const [telKawan, setTelKawan] = useState("");
  const [jenisKawan, setJenisKawan] = useState("");
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  // Auto close timer on success
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        onClose();
        setStatus("idle");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  // Reset form state when opened
  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setErrMsg("");
    }
  }, [isOpen, packageName]);

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
      const sanitizedTel = tel.replace(/[\s-]/g, "");
      const sanitizedTelWaris = telWaris ? telWaris.replace(/[\s-]/g, "") : undefined;
      const sanitizedTelKawan = telKawan ? telKawan.replace(/[\s-]/g, "") : undefined;
      const sanitizedIc = ic ? ic.replace(/\D/g, "") : undefined;

      const fullAlamat = [alamat1, poskod, daerah, negeri].filter(Boolean).join(", ");

      const res = await fetch("/albarzah/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          telefon: sanitizedTel,
          ic: sanitizedIc,
          alamat: fullAlamat || undefined,
          alamat1: alamat1 || undefined,
          alamat2: poskod || undefined,
          poskod: poskod || undefined,
          alamat3: daerah || undefined,
          negeri: negeri || undefined,
          umur: umur || undefined,
          namaWaris: namaWaris || undefined,
          telefonWaris: sanitizedTelWaris,
          hubunganWaris: hubungan || undefined,
          namaKawan: namaKawan || undefined,
          telefonKawan: sanitizedTelKawan,
          jenisKawan: jenisKawan || undefined,
          pakej: packageName,
          kaedahHubungi: "whatsapp",
          persetujuan: true,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || "Ralat menghantar permohonan");
      }
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrMsg(err?.message || "Ralat sambungan. Sila cuba lagi atau hubungi kami melalui WhatsApp.");
    }
  };

  const details = PACKAGE_DETAILS_MAP[packageName] || {
    yearly: packageName,
    monthly: "Manfaat Perlindungan Lengkap",
    daily: "Albarzah Khairat Kematian",
    age: "Semua Umur",
    total: "Mengikut Pakej",
  };

  const labelClass = "block text-xs font-bold mb-1.5 uppercase tracking-wide text-slate-700";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto border border-amber-500/20 max-h-[90vh] z-10"
          >
            {/* Modal Header */}
            <div
              className="p-5 sm:p-6 text-white relative flex-shrink-0"
              style={{ background: "var(--color-brand-green)" }}
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer"
                aria-label="Tutup borang"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-amber-300" />
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-300">
                  Borang Permohonan Pakej
                </span>
              </div>

              <h3
                className="text-xl sm:text-2xl font-black text-white leading-tight uppercase mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {packageName}
              </h3>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm font-semibold text-amber-200 border border-white/20">
                  {details.monthly}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm font-semibold text-white/90 border border-white/20">
                  {details.daily}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm font-semibold text-amber-200 border border-white/20">
                  Jumlah Manfaat: {details.total}
                </span>
              </div>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 bg-slate-50/50">
              {status === "success" ? (
                <div className="text-center py-8 space-y-5">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full mx-auto shadow-md"
                    style={{ background: "var(--color-brand-sage-soft)", color: "var(--color-brand-green)" }}
                  >
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <div>
                    <h4
                      className="text-2xl font-black mb-2"
                      style={{ color: "var(--color-brand-green-dark)", fontFamily: "var(--font-heading)" }}
                    >
                      PERMOHONAN BERJAYA!
                    </h4>
                    <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Maklumat bagi <strong>{packageName}</strong> telah berjaya disimpan ke dalam sistem Albarzah.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border text-left bg-white" style={{ borderColor: "var(--color-brand-border)" }}>
                    <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                      ★ Resit akan dihantar setelah bayaran disahkan.<br />
                      ★ Anda boleh mendapatkan Kad Keahlian selepas 3 hari bekerja melalui WhatsApp.
                    </p>
                  </div>

                  <div className="pt-2 space-y-2.5">
                    <a
                      href={`https://wa.me/601113001999?text=Salam%20Albarzah,%20saya%20telah%20menghantar%20permohonan%20untuk%20${encodeURIComponent(packageName)}.%20Sila%20bantu%20pengesahan.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full text-sm font-black text-white shadow-md transition-all hover:opacity-95"
                      style={{ background: "#25D366" }}
                    >
                      <Phone className="h-4 w-4" />
                      HUBUNGI WHATSAPP TERUS (011-1300 1999)
                    </a>

                    <button
                      onClick={onClose}
                      type="button"
                      className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      Tutup Borang
                    </button>
                    <p className="text-[11px] text-slate-400 italic text-center">
                      (Borang ini akan ditutup secara automatik dalam masa 6 saat)
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* MAKLUMAT PEMOHON */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <p className="text-xs font-black uppercase tracking-wider" style={{ color: "var(--color-brand-green)" }}>
                      MAKLUMAT PEMOHON
                    </p>

                    <div>
                      <label htmlFor="modalNama" className={labelClass}>
                        NAMA DALAM KAD PENGENALAN <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="modalNama"
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value.toUpperCase())}
                        placeholder="NAMA PENUH"
                        className="form-input w-full"
                        style={{ textTransform: "uppercase" }}
                        required
                        autoComplete="name"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="modalIc" className={labelClass}>
                          NO. KAD PENGENALAN
                        </label>
                        <input
                          id="modalIc"
                          type="text"
                          value={ic}
                          onChange={(e) => handleIcChange(e.target.value)}
                          placeholder="000000-00-0000"
                          maxLength={14}
                          className="form-input w-full"
                          autoComplete="off"
                          inputMode="numeric"
                        />
                      </div>

                      <div>
                        <label htmlFor="modalUmur" className={labelClass}>
                          UMUR
                        </label>
                        <input
                          id="modalUmur"
                          type="text"
                          readOnly
                          value={umur ? `${umur} tahun` : "—"}
                          className="form-input w-full bg-slate-100 font-bold"
                          style={{ cursor: "default", color: umur ? "var(--color-brand-green)" : "#94a3b8" }}
                          aria-label="Umur dikira secara automatik"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="modalAlamat1" className={labelClass}>
                        ALAMAT 1
                      </label>
                      <input
                        id="modalAlamat1"
                        type="text"
                        value={alamat1}
                        onChange={(e) => setAlamat1(e.target.value.toUpperCase())}
                        placeholder="No. Rumah, Jalan, Taman"
                        className="form-input w-full"
                        style={{ textTransform: "uppercase" }}
                        autoComplete="address-line1"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="modalPoskod" className={labelClass}>
                          POSKOD
                        </label>
                        <input
                          id="modalPoskod"
                          type="text"
                          inputMode="numeric"
                          value={poskod}
                          onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, "").slice(0, 5);
                            setPoskod(digits);
                          }}
                          maxLength={5}
                          placeholder="50600"
                          className="form-input w-full"
                          autoComplete="postal-code"
                        />
                      </div>

                      <div>
                        <label htmlFor="modalDaerah" className={labelClass}>
                          BANDAR / DAERAH
                        </label>
                        <input
                          id="modalDaerah"
                          type="text"
                          value={daerah}
                          onChange={(e) => setDaerah(e.target.value.toUpperCase())}
                          placeholder="Kuala Lumpur"
                          className="form-input w-full"
                          style={{ textTransform: "uppercase" }}
                          autoComplete="address-level2"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="modalNegeri" className={labelClass}>
                        NEGERI
                      </label>
                      <select
                        id="modalNegeri"
                        value={negeri}
                        onChange={(e) => setNegeri(e.target.value)}
                        className="form-input w-full bg-white font-medium"
                        aria-label="Pilih Negeri"
                      >
                        <option value="">-- PILIH NEGERI --</option>
                        {MALAYSIAN_STATES.map((st) => (
                          <option key={st} value={st.toUpperCase()}>
                            {st.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="modalTel" className={labelClass}>
                        NO. TELEFON <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="modalTel"
                        type="tel"
                        value={tel}
                        onChange={(e) => setTel(e.target.value.toUpperCase())}
                        placeholder="01X-XXX XXXX"
                        className="form-input w-full"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                      />
                    </div>
                  </div>

                  {/* WARIS KELUARGA */}
                  <div className="p-5 rounded-2xl border space-y-4 shadow-sm" style={{ background: "var(--color-brand-sage-soft)", borderColor: "var(--color-brand-border)" }}>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider" style={{ color: "var(--color-brand-green-dark)" }}>
                        WARIS DI KALANGAN KELUARGA
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Akan dihubungi sekiranya berlaku kematian.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="modalNamaWaris" className={labelClass}>
                          NAMA WARIS
                        </label>
                        <input
                          id="modalNamaWaris"
                          type="text"
                          value={namaWaris}
                          onChange={(e) => setNamaWaris(e.target.value.toUpperCase())}
                          placeholder="NAMA PENUH WARIS"
                          className="form-input w-full"
                          style={{ textTransform: "uppercase" }}
                          autoComplete="off"
                        />
                      </div>

                      <div>
                        <label htmlFor="modalTelWaris" className={labelClass}>
                          NO. TEL. WARIS
                        </label>
                        <input
                          id="modalTelWaris"
                          type="tel"
                          value={telWaris}
                          onChange={(e) => setTelWaris(e.target.value.toUpperCase())}
                          placeholder="01X-XXX XXXX"
                          className="form-input w-full"
                          autoComplete="off"
                          inputMode="tel"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="modalHubungan" className={labelClass}>
                        HUBUNGAN WARIS
                      </label>
                      <select
                        id="modalHubungan"
                        value={hubungan}
                        onChange={(e) => setHubungan(e.target.value)}
                        className="form-input w-full"
                        aria-label="Hubungan waris"
                      >
                        <option value="">Pilih Hubungan</option>
                        {HUBUNGAN_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* KAWAN SELAIN WARIS */}
                  <div className="p-5 rounded-2xl border space-y-4 shadow-sm" style={{ background: "rgba(243,182,1,0.06)", borderColor: "rgba(243,182,1,0.25)" }}>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-amber-700">
                        KAWAN SELAIN WARIS
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Kawan hendaklah diberitahu jika berlaku kecemasan.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="modalNamaKawan" className={labelClass}>
                          NAMA KAWAN
                        </label>
                        <input
                          id="modalNamaKawan"
                          type="text"
                          value={namaKawan}
                          onChange={(e) => setNamaKawan(e.target.value.toUpperCase())}
                          placeholder="NAMA PENUH KAWAN"
                          className="form-input w-full"
                          style={{ textTransform: "uppercase" }}
                          autoComplete="off"
                        />
                      </div>

                      <div>
                        <label htmlFor="modalTelKawan" className={labelClass}>
                          NO. TEL. KAWAN
                        </label>
                        <input
                          id="modalTelKawan"
                          type="tel"
                          value={telKawan}
                          onChange={(e) => setTelKawan(e.target.value.toUpperCase())}
                          placeholder="01X-XXX XXXX"
                          className="form-input w-full"
                          autoComplete="off"
                          inputMode="tel"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="modalJenisKawan" className={labelClass}>
                        KATEGORI KAWAN
                      </label>
                      <select
                        id="modalJenisKawan"
                        value={jenisKawan}
                        onChange={(e) => setJenisKawan(e.target.value)}
                        className="form-input w-full"
                        aria-label="Kategori kawan"
                      >
                        <option value="">Pilih Kategori Kawan</option>
                        {KAWAN_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* SLIP UPLOAD */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                    <p className="text-xs font-black uppercase tracking-wider" style={{ color: "var(--color-brand-green)" }}>
                      HANTAR SLIP BAYARAN (JIKA ADA)
                    </p>
                    <label
                      className="flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed p-4 cursor-pointer transition-all bg-slate-50/50 hover:bg-slate-50"
                      style={{ borderColor: slipFile ? "var(--color-brand-green)" : "var(--color-brand-border)" }}
                    >
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="sr-only"
                        onChange={(e) => setSlipFile(e.target.files?.[0] ?? null)}
                      />
                      {slipFile ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          <span className="text-xs font-bold truncate max-w-[200px]" style={{ color: "var(--color-brand-green-dark)" }}>
                            {slipFile.name}
                          </span>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="h-5 w-5 mx-auto mb-1 text-slate-400" />
                          <p className="text-xs font-bold text-slate-700">PILIH FAIL SLIP BAYARAN</p>
                          <p className="text-[10px] text-slate-400">Imej atau PDF</p>
                        </div>
                      )}
                    </label>
                  </div>

                  {/* Error Alert */}
                  {errMsg && (
                    <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200" role="alert">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>{errMsg}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full min-h-[50px] flex items-center justify-center gap-2 rounded-full py-3 px-6 text-sm font-black uppercase tracking-wider transition-all disabled:opacity-60 cursor-pointer shadow-md text-white"
                    style={{ background: "var(--color-brand-green)" }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        MENGHANTAR PERMOHONAN…
                      </>
                    ) : (
                      `HANTAR PERMOHONAN (${packageName})`
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
