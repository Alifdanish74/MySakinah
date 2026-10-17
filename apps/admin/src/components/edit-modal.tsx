"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { X, Save, Loader2 } from "lucide-react";
import type { Submission } from "@/lib/types";
import { calculateAgeFromIC, formatIC, formatPhone } from "@/lib/utils";

interface EditModalProps {
  submission: Submission;
  onClose: () => void;
  onSaved: () => void;
  /** Pass moduleSlug so the modal can show Al-Barzah-specific fields */
  moduleSlug?: string;
}

// ─── tiny helpers ────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "var(--color-admin-text-muted)",
        marginBottom: 4,
      }}
    >
      {children}
    </label>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

// ─── component ───────────────────────────────────────────────────────────────
export function EditModal({ submission, onClose, onSaved, moduleSlug }: EditModalProps) {
  const isAlbarzah = moduleSlug === "albarzah";

  const [status, setStatus] = useState<Submission["status"]>(submission.status || "pending");
  const [notes, setNotes]   = useState<string>(submission.notes || "");
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const rawFd = { ...(submission.form_data || {}) };
    if (!rawFd.umur || rawFd.umur === "-" || rawFd.umur === "—") {
      const computed = calculateAgeFromIC(rawFd.no_kp || rawFd.ic);
      if (computed) rawFd.umur = computed;
    }
    return rawFd;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  function handleFieldChange(key: string, value: any) {
    setFormData((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "no_kp") {
        const computed = calculateAgeFromIC(value);
        if (
          computed &&
          (!prev.umur || prev.umur === "-" || prev.umur === "—" ||
            prev.umur === calculateAgeFromIC(prev.no_kp))
        ) {
          next.umur = computed;
        }
      }
      return next;
    });
  }

  function fd(key: string, fallback = "") {
    return formData[key] ?? fallback;
  }

  function inp(id: string, key: string, placeholder = "") {
    return (
      <input
        id={id}
        type="text"
        value={fd(key)}
        onChange={(e) => handleFieldChange(key, e.target.value)}
        placeholder={placeholder}
        className="form-input"
      />
    );
  }

  /** Phone input: displays formatted (xxx-xxxxxxxx), stores raw digits */
  function phoneInp(id: string, key: string) {
    const raw = fd(key);
    return (
      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={formatPhone(raw) === "\u2014" ? raw : formatPhone(raw)}
        onChange={(e) => {
          const d = e.target.value.replace(/\D/g, "").slice(0, 11);
          handleFieldChange(key, d);
        }}
        placeholder="e.g. 012-3456789"
        maxLength={14}
        className="form-input"
      />
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/admin/api/submissions/${submission.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          notes,
          submitted_by: formData.nama || submission.submitted_by,
          form_data: formData,
        }),
      });

      if (!response.ok) {
        const resJson = await response.json();
        throw new Error(resJson.error || "Failed to update record");
      }

      onSaved();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(6px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: 680,
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-admin-border-bright)",
        }}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
              Edit Registration Entry
            </h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-admin-text-muted)", marginTop: 2 }}>
              ID: <code style={{ color: "var(--color-admin-primary)", fontSize: "0.75rem" }}>{submission.id}</code>
            </p>
          </div>
          <button
            id="close-edit-modal"
            onClick={onClose}
            className="btn-ghost"
            style={{ padding: "0.375rem" }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="badge-danger" style={{ padding: "0.75rem", borderRadius: "var(--radius-md)" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* ── Section: Status & Dates ──────────────────────────────────── */}
          <SectionTitle>Status & Dates</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <Field label="Processing Status">
              <select
                id="submission-status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="form-input"
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="contacted">Contacted</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </Field>

            <Field label="Tarikh Daftar">
              {inp("form-input-tarikh_daftar", "tarikh_daftar", "e.g. 01/01/2025")}
            </Field>
          </div>

          {/* ── Section: Personal Info ───────────────────────────────────── */}
          <SectionTitle>Maklumat Peribadi</SectionTitle>

          {/* Nama */}
          <Field label="Nama">
            <input
              id="form-input-nama"
              type="text"
              value={fd("nama") || submission.submitted_by || ""}
              onChange={(e) => handleFieldChange("nama", e.target.value)}
              className="form-input"
              required
            />
          </Field>

          {/* No KP + Umur */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "0.75rem" }}>
            <Field label="No KP">
              <input
                id="form-input-no_kp"
                type="text"
                inputMode="numeric"
                value={formatIC(fd("no_kp")) === "\u2014" ? fd("no_kp") : formatIC(fd("no_kp"))}
                onChange={(e) => {
                  // strip hyphens before storing so raw digits are saved
                  const raw = e.target.value.replace(/[^\d]/g, "").slice(0, 12);
                  handleFieldChange("no_kp", raw);
                }}
                placeholder="e.g. 870654-03-2121"
                maxLength={14}
                className="form-input"
              />
            </Field>
            <Field label="Umur">
              <input
                id="form-input-umur"
                type="text"
                value={fd("umur")}
                onChange={(e) => handleFieldChange("umur", e.target.value)}
                className="form-input"
              />
            </Field>
          </div>

          {/* No Telefon + Pakej */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <Field label="No Telefon">
              {phoneInp("form-input-no_telefon", "no_telefon")}
            </Field>
            <Field label="Pakej">
              {inp("form-input-pakej", "pakej", "e.g. KELUARGA 20")}
            </Field>
          </div>

          {/* Generic-only: Kategori + No Ahli/Anggota + Utama */}
          {!isAlbarzah && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                <Field label="Kategori">
                  <select
                    id="kategori-select"
                    value={fd("kategori") || "AHLI"}
                    onChange={(e) => handleFieldChange("kategori", e.target.value)}
                    className="form-input"
                  >
                    <option value="AHLI">AHLI</option>
                    <option value="PASANGAN">PASANGAN</option>
                    <option value="ANAK">ANAK</option>
                    <option value="IBU">IBU</option>
                    <option value="KAKAK">KAKAK</option>
                    <option value="ABANG">ABANG</option>
                  </select>
                </Field>

                <Field label="No Ahli / Anggota">
                  {inp("form-input-no_ahli", "no_ahli")}
                </Field>

                <Field label="Bukan Anggota">
                  <select
                    id="form-input-bukan_anggota"
                    value={fd("bukan_anggota")}
                    onChange={(e) => handleFieldChange("bukan_anggota", e.target.value)}
                    className="form-input"
                  >
                    <option value="">ANGGOTA</option>
                    <option value="BUKAN ANGGOTA">BUKAN ANGGOTA</option>
                  </select>
                </Field>
              </div>

              <Field label="Utama (Main Contact Name)">
                {inp("form-input-utama", "utama", "Name of primary registrant")}
              </Field>
            </>
          )}

          {/* ── Section: Waris ───────────────────────────────────────────── */}
          <SectionTitle>Maklumat Waris</SectionTitle>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <Field label="Nama Waris">
              {inp("form-input-namaWaris", "namaWaris")}
            </Field>
            <Field label="Tel Waris">
              {phoneInp("form-input-telefonWaris", "telefonWaris")}
            </Field>
          </div>

          {/* Al-Barzah: Hubungan Waris */}
          {isAlbarzah && (
            <Field label="Hubungan Waris">
              {inp("form-input-hubunganWaris", "hubunganWaris", "e.g. ANAK, PASANGAN")}
            </Field>
          )}

          {/* ── Section: Kawan (Al-Barzah only) ─────────────────────────── */}
          {isAlbarzah && (
            <>
              <SectionTitle>Maklumat Kawan Selain Waris</SectionTitle>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <Field label="Nama Kawan">
                  {inp("form-input-namaKawan", "namaKawan")}
                </Field>
                <Field label="Kategori Kawan">
                  {inp("form-input-jenisKawan", "jenisKawan", "e.g. ANAK, PASANGAN")}
                </Field>
              </div>

              <SectionTitle>Diperkenalkan Oleh</SectionTitle>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <Field label="Nama Diperkenalkan">
                  {inp("form-input-namaPerkenalkan", "namaPerkenalkan")}
                </Field>
                <Field label="Tel Diperkenalkan">
                  {phoneInp("form-input-telefonPerkenalkan", "telefonPerkenalkan")}
                </Field>
              </div>
            </>
          )}

          {/* ── Section: Alamat ──────────────────────────────────────────── */}
          <SectionTitle>Alamat</SectionTitle>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <Field label="Alamat 1">
              {inp("form-input-alamat1", "alamat1")}
            </Field>
            <Field label="Alamat 2">
              {inp("form-input-alamat2", "alamat2")}
            </Field>
          </div>

          {/* Al-Barzah has Daerah/Bandar; generic doesn't */}
          <div style={{ display: "grid", gridTemplateColumns: isAlbarzah ? "1fr 1fr 1fr" : "1fr 1fr", gap: "0.75rem" }}>
            <Field label="Poskod">
              <input
                id="form-input-poskod"
                type="text"
                inputMode="numeric"
                value={fd("poskod")}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 5);
                  handleFieldChange("poskod", digits);
                }}
                maxLength={5}
                placeholder="e.g. 50600"
                className="form-input"
              />
            </Field>

            {isAlbarzah && (
              <Field label="Daerah / Bandar">
                {inp("form-input-daerah", "alamat3", "e.g. Kuala Lumpur")}
              </Field>
            )}

            <Field label="Negeri">
              {inp("form-input-negeri", "negeri")}
            </Field>
          </div>

          {/* ── Section: Admin Notes ─────────────────────────────────────── */}
          <SectionTitle>Admin Notes</SectionTitle>
          <div>
            <textarea
              id="submission-notes-input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="form-input"
              placeholder="Internal remarks or action log..."
              style={{ resize: "vertical" }}
            />
          </div>

          {/* ── Actions ──────────────────────────────────────────────────── */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", paddingTop: "0.25rem" }}>
            <button id="cancel-edit-btn" type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button
              id="save-edit-btn"
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              <span>Save Record Changes</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Section title divider ────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.625rem",
        marginBottom: "-0.25rem",
      }}
    >
      <span
        style={{
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-admin-primary)",
        }}
      >
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: "var(--color-admin-border)" }} />
    </div>
  );
}
