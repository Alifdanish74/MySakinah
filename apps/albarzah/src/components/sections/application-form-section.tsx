"use client";
// File: src/components/sections/application-form-section.tsx
// Digital Pamphlet Section — Point 12
// BORANG PERMOHONAN — inline form (not a modal)

import { useState } from "react";
import { CheckCircle2, Loader2, AlertCircle, Upload } from "lucide-react";
import { ResponsiveContainer } from "@sakinah/ui";
import { SECTION_IDS } from "@/lib/constants";

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

const PAKEJ_OPTIONS = [
  "PAKEJ RM80.00 SETAHUN",
  "PAKEJ RM120.00 SETAHUN",
  "PAKEJ RM180.00 SETAHUN",
  "PAKEJ RM240.00 SETAHUN",
  "PAKEJ RM1,500 SEUMUR HIDUP",
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

// ── Props ──────────────────────────────────────────────────────────────────
interface ApplicationFormSectionProps {
  selectedPackage: string;
  onPackageChange: (pkg: string) => void;
}

export function ApplicationFormSection({ selectedPackage, onPackageChange }: ApplicationFormSectionProps) {
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
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

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
      const res = await fetch("/albarzah/api/enquiry", {
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
          pakej: selectedPackage,
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

  // Common label style
  const labelClass = "block text-sm font-bold mb-1.5 uppercase tracking-wide";
  const labelStyle = { color: "var(--color-brand-text)" };

  return (
    <section
      id={SECTION_IDS.point12}
      aria-label="Borang Permohonan"
      className="section-texture py-16 lg:py-24"
      style={{ background: "var(--color-brand-cream)" }}
    >
      <ResponsiveContainer>

        {/* Point indicator */}
        <div className="flex items-center gap-3 mb-8">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-black flex-shrink-0"
            style={{ background: "var(--color-brand-green)", color: "#fff" }}
            aria-hidden="true"
          >
            12
          </span>
          <div className="h-px flex-1 opacity-20" style={{ background: "var(--color-brand-green)" }} aria-hidden="true" />
        </div>

        {/* Heading */}
        <div className="mb-6">
          <p className="eyebrow-cinzel mb-2">POINT 12</p>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight mb-2"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-brand-green-dark)" }}
          >
            BORANG PERMOHONAN
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Sila pilih pakej di bawah untuk mengisi borang permohonan khusus bagi pakej tersebut.
          </p>
        </div>

        {/* Package Selector Tabs for Point 12 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {PAKEJ_OPTIONS.map((opt) => {
              const isActive = selectedPackage === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onPackageChange(opt)}
                  className="px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex-shrink-0 border"
                  style={{
                    background: isActive ? "var(--color-brand-green)" : "#fff",
                    color: isActive ? "#fff" : "var(--color-brand-green-dark)",
                    borderColor: isActive ? "var(--color-brand-green)" : "var(--color-brand-border)",
                    boxShadow: isActive ? "0 4px 12px rgba(0,71,60,0.18)" : "none",
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Active Package Banner */}
          <div
            className="mt-4 p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm"
            style={{ background: "#fff", borderColor: "var(--color-brand-gold)" }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl text-xs font-black text-white flex-shrink-0"
                style={{ background: "var(--color-brand-green)" }}
              >
                ★
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">BORANG DIBUKA UNTUK</p>
                <p className="text-base font-black uppercase" style={{ color: "var(--color-brand-green-dark)", fontFamily: "var(--font-heading)" }}>
                  {selectedPackage}
                </p>
              </div>
            </div>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
              style={{ background: "var(--color-brand-sage-soft)", color: "var(--color-brand-green-dark)" }}
            >
              Permohonan Khusus Pakej Ini
            </span>
          </div>
        </div>

        {/* Success state */}
        {status === "success" ? (
          <div
            className="max-w-lg mx-auto rounded-3xl p-10 text-center border shadow-md"
            style={{ background: "#fff", borderColor: "var(--color-brand-border)" }}
          >
            <CheckCircle2
              className="h-16 w-16 mx-auto mb-4"
              style={{ color: "var(--color-brand-green-light)" }}
            />
            <h3 className="text-xl font-black mb-2" style={{ color: "var(--color-brand-green-dark)" }}>
              Permohonan Berjaya Dihantar!
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-brand-text-muted)" }}>
              RESIT AKAN DIHANTAR SETELAH BAYARAN DISAHKAN.
            </p>
            <div
              className="rounded-2xl px-4 py-3 flex items-center gap-2.5 text-left"
              style={{ background: "var(--color-brand-sage-soft)", border: "1px solid var(--color-brand-border)" }}
            >
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: "var(--color-brand-green)" }} />
              <p className="text-sm font-semibold" style={{ color: "var(--color-brand-green-dark)" }}>
                ANDA BOLEH MENDAPATKAN KAD KEAHLIAN SELEPAS 3 HARI BEKERJA MELALUI WHATSAPP.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* ── Column 1: Personal Info + Waris + Kawan ── */}
              <div className="space-y-6">

                {/* MAKLUMAT PEMOHON */}
                <div
                  className="rounded-3xl p-6 border shadow-sm"
                  style={{ background: "#fff", borderColor: "var(--color-brand-border)" }}
                >
                  <p
                    className="text-xs font-black uppercase tracking-widest mb-4"
                    style={{ color: "var(--color-brand-green)" }}
                  >
                    MAKLUMAT PEMOHON
                  </p>

                  <div className="space-y-4">
                    {/* NAMA */}
                    <div>
                      <label htmlFor="bNama" className={labelClass} style={labelStyle}>
                        NAMA DALAM KAD PENGENALAN <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="bNama"
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

                    {/* IC + UMUR */}
                    <div>
                      <label htmlFor="bIc" className={labelClass} style={labelStyle}>
                        NO. KAD PENGENALAN
                      </label>
                      <input
                        id="bIc"
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
                      <label htmlFor="bUmur" className={labelClass} style={labelStyle}>
                        UMUR
                        <span className="ml-1 text-[10px] font-normal normal-case tracking-normal" style={{ color: "var(--color-brand-text-muted)" }}>
                          (dikira automatik daripada No. K/P)
                        </span>
                      </label>
                      <input
                        id="bUmur"
                        type="text"
                        readOnly
                        value={umur ? `${umur} tahun` : "—"}
                        className="form-input w-full"
                        style={{
                          background: "var(--color-brand-sage-soft)",
                          cursor: "default",
                          color: umur ? "var(--color-brand-green)" : "var(--color-brand-text-muted)",
                          fontWeight: umur ? "700" : "400",
                        }}
                        aria-label="Umur dikira secara automatik daripada No. Kad Pengenalan"
                      />
                    </div>

                    {/* ALAMAT */}
                    <div>
                      <label htmlFor="bAlamat" className={labelClass} style={labelStyle}>
                        ALAMAT TEMPAT TINGGAL
                      </label>
                      <textarea
                        id="bAlamat"
                        rows={3}
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        placeholder="Nombor, Jalan, Taman, Poskod, Negeri"
                        className="form-input w-full"
                        style={{ resize: "vertical" }}
                        autoComplete="street-address"
                      />
                    </div>

                    {/* NO TEL */}
                    <div>
                      <label htmlFor="bTel" className={labelClass} style={labelStyle}>
                        NO. TEL. <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="bTel"
                        type="tel"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                        placeholder="01X-XXX XXXX"
                        className="form-input w-full"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                      />
                    </div>
                  </div>
                </div>

                {/* WARIS */}
                <div
                  className="rounded-3xl p-6 border shadow-sm"
                  style={{ background: "var(--color-brand-sage-soft)", borderColor: "var(--color-brand-border)" }}
                >
                  <p
                    className="text-xs font-black uppercase tracking-widest mb-1"
                    style={{ color: "var(--color-brand-green)" }}
                  >
                    WARIS DI KALANGAN KELUARGA
                  </p>
                  <p className="text-xs text-slate-500 font-medium mb-4">
                    Waris perlu dimaklumkan. Akan dihubungi apabila berlaku kematian.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="bNamaWaris" className={labelClass} style={labelStyle}>
                        NAMA WARIS
                      </label>
                      <input
                        id="bNamaWaris"
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
                      <label htmlFor="bTelWaris" className={labelClass} style={labelStyle}>
                        NO. TEL. WARIS
                      </label>
                      <input
                        id="bTelWaris"
                        type="tel"
                        value={telWaris}
                        onChange={(e) => setTelWaris(e.target.value)}
                        placeholder="01X-XXX XXXX"
                        className="form-input w-full"
                        autoComplete="off"
                        inputMode="tel"
                      />
                    </div>

                    <div>
                      <label htmlFor="bHubungan" className={labelClass} style={labelStyle}>
                        HUBUNGAN
                      </label>
                      <select
                        id="bHubungan"
                        value={hubungan}
                        onChange={(e) => setHubungan(e.target.value)}
                        className="form-input w-full"
                        aria-label="Hubungan waris dengan pemohon"
                      >
                        <option value="">Pilih Hubungan</option>
                        {HUBUNGAN_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* KAWAN */}
                <div
                  className="rounded-3xl p-6 border shadow-sm"
                  style={{ background: "rgba(243,182,1,0.06)", borderColor: "rgba(243,182,1,0.25)" }}
                >
                  <p
                    className="text-xs font-black uppercase tracking-widest mb-1"
                    style={{ color: "var(--color-brand-gold)" }}
                  >
                    KAWAN SELAIN WARIS
                  </p>
                  <p className="text-xs text-slate-500 font-medium mb-4">
                    Kawan hendaklah diberitahu. Akan dihubungi apabila berlaku kematian.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="bNamaKawan" className={labelClass} style={labelStyle}>
                        NAMA KAWAN
                      </label>
                      <input
                        id="bNamaKawan"
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
                      <label htmlFor="bTelKawan" className={labelClass} style={labelStyle}>
                        NO. TEL. KAWAN
                      </label>
                      <input
                        id="bTelKawan"
                        type="tel"
                        value={telKawan}
                        onChange={(e) => setTelKawan(e.target.value)}
                        placeholder="01X-XXX XXXX"
                        className="form-input w-full"
                        autoComplete="off"
                        inputMode="tel"
                      />
                    </div>

                    <div>
                      <label htmlFor="bKategoriKawan" className={labelClass} style={labelStyle}>
                        KATEGORI KAWAN
                      </label>
                      <select
                        id="bKategoriKawan"
                        value={jenisKawan}
                        onChange={(e) => setJenisKawan(e.target.value)}
                        className="form-input w-full"
                        aria-label="Kategori kawan"
                      >
                        <option value="">Pilih Kategori</option>
                        {KAWAN_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Column 2: Package + Payment ── */}
              <div className="space-y-6">

                {/* PAKEJ DAN BAYARAN */}
                <div
                  className="rounded-3xl p-6 border shadow-sm"
                  style={{ background: "#fff", borderColor: "var(--color-brand-gold)", borderWidth: "1.5px" }}
                >
                  <p
                    className="text-xs font-black uppercase tracking-widest mb-1"
                    style={{ color: "var(--color-brand-green-dark)" }}
                  >
                    PAKEJ DAN BAYARAN <span className="text-red-600">*</span>
                  </p>
                  <p className="text-xs text-slate-500 font-medium mb-4">
                    Pilih pakej yang anda ingin sertai.
                  </p>

                  {/* Radio card selection */}
                  <div className="space-y-2.5" role="radiogroup" aria-label="Pilihan pakej">
                    {PAKEJ_OPTIONS.map((opt) => {
                      const isSelected = selectedPackage === opt;
                      return (
                        <label
                          key={opt}
                          className="flex items-center gap-3 rounded-2xl px-4 py-3.5 border cursor-pointer transition-all min-h-[52px]"
                          style={{
                            background: isSelected ? "var(--color-brand-sage-soft)" : "#fafafa",
                            borderColor: isSelected ? "var(--color-brand-green)" : "var(--color-brand-border)",
                            borderWidth: isSelected ? "1.5px" : "1px",
                          }}
                        >
                          <input
                            type="radio"
                            name="pakej"
                            value={opt}
                            checked={isSelected}
                            onChange={() => onPackageChange(opt)}
                            className="sr-only"
                          />
                          <span
                            className="flex h-5 w-5 items-center justify-center rounded-full border-2 flex-shrink-0 transition-all"
                            style={{
                              borderColor: isSelected ? "var(--color-brand-green)" : "var(--color-brand-border)",
                              background: isSelected ? "var(--color-brand-green)" : "transparent",
                            }}
                            aria-hidden="true"
                          >
                            {isSelected && (
                              <span className="block h-2 w-2 rounded-full bg-white" />
                            )}
                          </span>
                          <span
                            className="text-sm font-bold flex-1"
                            style={{ color: isSelected ? "var(--color-brand-green-dark)" : "var(--color-brand-text)" }}
                          >
                            {opt}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* CARA BAYARAN */}
                <div
                  className="rounded-3xl p-6 border shadow-sm"
                  style={{ background: "var(--color-brand-cream)", borderColor: "var(--color-brand-border)" }}
                >
                  <p
                    className="text-xs font-black uppercase tracking-widest mb-1"
                    style={{ color: "var(--color-brand-green)" }}
                  >
                    CARA BAYARAN
                  </p>
                  {/* Payment details placeholder — verified details not found in repo */}
                  <div
                    className="rounded-2xl p-4 border mb-4 text-center"
                    style={{ background: "#fff", borderColor: "var(--color-brand-border)", borderStyle: "dashed" }}
                  >
                    <p className="text-xs text-slate-500 font-medium">
                      No. Akaun / QR — Sila hubungi kami untuk maklumat pembayaran terkini.
                    </p>
                  </div>

                  {/* Slip upload */}
                  <p
                    className="text-xs font-black uppercase tracking-widest mb-3"
                    style={{ color: "var(--color-brand-green)" }}
                  >
                    HANTAR SLIP BAYARAN
                  </p>
                  <label
                    className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-5 cursor-pointer transition-all bg-white min-h-[100px]"
                    style={{
                      borderColor: slipFile ? "var(--color-brand-green)" : "var(--color-brand-border)",
                    }}
                    aria-label="Muat naik slip bayaran"
                  >
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="sr-only"
                      onChange={(e) => setSlipFile(e.target.files?.[0] ?? null)}
                    />
                    {slipFile ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: "var(--color-brand-green)" }} aria-hidden="true" />
                        <span className="text-sm font-bold truncate max-w-[220px]" style={{ color: "var(--color-brand-green-dark)" }}>
                          {slipFile.name}
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="h-6 w-6 mx-auto mb-1.5 text-slate-400" aria-hidden="true" />
                        <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">Pilih Fail</p>
                        <p className="text-xs text-slate-400 mt-0.5">Imej atau PDF</p>
                      </div>
                    )}
                  </label>

                  <p className="text-xs text-slate-500 mt-3 text-center font-medium">
                    RESIT AKAN DIHANTAR SETELAH BAYARAN DISAHKAN.
                  </p>
                </div>

                {/* Kad Keahlian notice */}
                <div
                  className="rounded-2xl px-4 py-4 flex items-start gap-3 border"
                  style={{ background: "var(--color-brand-sage-soft)", borderColor: "var(--color-brand-border)" }}
                >
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "var(--color-brand-green)" }} aria-hidden="true" />
                  <p className="text-sm font-semibold leading-relaxed" style={{ color: "var(--color-brand-green-dark)" }}>
                    ANDA BOLEH MENDAPATKAN KAD KEAHLIAN SELEPAS 3 HARI BEKERJA MELALUI WHATSAPP.
                  </p>
                </div>

                {/* Error */}
                {errMsg && (
                  <div
                    className="flex items-center gap-2.5 rounded-2xl p-4 text-sm font-semibold"
                    style={{ background: "#fef2f2", color: "var(--color-brand-error)" }}
                    role="alert"
                    aria-live="polite"
                  >
                    <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    <span>{errMsg}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full min-h-[52px] flex items-center justify-center gap-2 rounded-full py-3.5 px-6 text-sm font-black uppercase tracking-wider transition-all disabled:opacity-60 cursor-pointer shadow-md"
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
            </div>
          </form>
        )}
      </ResponsiveContainer>
    </section>
  );
}
