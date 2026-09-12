"use client";
// File: src/components/edit-modal.tsx
// Modal for editing submission status, notes, and Excel template fields

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Save, Loader2 } from "lucide-react";
import type { Submission } from "@/lib/types";

interface EditModalProps {
  submission: Submission;
  onClose: () => void;
  onSaved: () => void;
}

export function EditModal({ submission, onClose, onSaved }: EditModalProps) {
  const [status, setStatus] = useState<Submission["status"]>(submission.status || "pending");
  const [notes, setNotes]   = useState<string>(submission.notes || "");
  const [formData, setFormData] = useState<Record<string, any>>(submission.form_data || {});
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  function handleFieldChange(key: string, value: any) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/submissions/${submission.id}`, {
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
          maxWidth: 640,
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-admin-border-bright)",
        }}
      >
        {/* Header */}
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
          {/* Status & Category row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label
                htmlFor="submission-status-select"
                style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-admin-text-muted)", marginBottom: "0.375rem" }}
              >
                Processing Status
              </label>
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
            </div>

            <div>
              <label
                htmlFor="kategori-select"
                style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-admin-text-muted)", marginBottom: "0.375rem" }}
              >
                Kategori
              </label>
              <select
                id="kategori-select"
                value={formData.kategori || "AHLI"}
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
            </div>
          </div>

          {/* Core Info: Nama, IC, Umur */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr", gap: "0.75rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-admin-text-muted)", marginBottom: 4 }}>
                Nama
              </label>
              <input
                id="form-input-nama"
                type="text"
                value={formData.nama || submission.submitted_by || ""}
                onChange={(e) => handleFieldChange("nama", e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-admin-text-muted)", marginBottom: 4 }}>
                No KP
              </label>
              <input
                id="form-input-no_kp"
                type="text"
                value={formData.no_kp || ""}
                onChange={(e) => handleFieldChange("no_kp", e.target.value)}
                className="form-input"
                placeholder="e.g. 870654032121"
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-admin-text-muted)", marginBottom: 4 }}>
                Umur
              </label>
              <input
                id="form-input-umur"
                type="text"
                value={formData.umur || ""}
                onChange={(e) => handleFieldChange("umur", e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Membership Info: No Ahli, Bukan Anggota, Phone */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-admin-text-muted)", marginBottom: 4 }}>
                No Ahli
              </label>
              <input
                id="form-input-no_ahli"
                type="text"
                value={formData.no_ahli || ""}
                onChange={(e) => handleFieldChange("no_ahli", e.target.value)}
                className="form-input"
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-admin-text-muted)", marginBottom: 4 }}>
                Bukan Anggota
              </label>
              <select
                id="form-input-bukan_anggota"
                value={formData.bukan_anggota || ""}
                onChange={(e) => handleFieldChange("bukan_anggota", e.target.value)}
                className="form-input"
              >
                <option value="">ANGGOTA</option>
                <option value="BUKAN ANGGOTA">BUKAN ANGGOTA</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-admin-text-muted)", marginBottom: 4 }}>
                No Telefon
              </label>
              <input
                id="form-input-no_telefon"
                type="text"
                value={formData.no_telefon || formData.phone || ""}
                onChange={(e) => handleFieldChange("no_telefon", e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Address fields: Alamat 1, Alamat 2, Poskod, Negeri */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-admin-text-muted)", marginBottom: 4 }}>
                  Alamat 1
                </label>
                <input
                  id="form-input-alamat1"
                  type="text"
                  value={formData.alamat1 || ""}
                  onChange={(e) => handleFieldChange("alamat1", e.target.value)}
                  className="form-input"
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-admin-text-muted)", marginBottom: 4 }}>
                  Alamat 2
                </label>
                <input
                  id="form-input-alamat2"
                  type="text"
                  value={formData.alamat2 || ""}
                  onChange={(e) => handleFieldChange("alamat2", e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-admin-text-muted)", marginBottom: 4 }}>
                  Poskod
                </label>
                <input
                  id="form-input-poskod"
                  type="text"
                  value={formData.poskod || ""}
                  onChange={(e) => handleFieldChange("poskod", e.target.value)}
                  className="form-input"
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-admin-text-muted)", marginBottom: 4 }}>
                  Negeri
                </label>
                <input
                  id="form-input-negeri"
                  type="text"
                  value={formData.negeri || ""}
                  onChange={(e) => handleFieldChange("negeri", e.target.value)}
                  className="form-input"
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-admin-text-muted)", marginBottom: 4 }}>
                  Pakej
                </label>
                <input
                  id="form-input-pakej"
                  type="text"
                  value={formData.pakej || ""}
                  onChange={(e) => handleFieldChange("pakej", e.target.value)}
                  className="form-input"
                  placeholder="e.g. KELUARGA 20"
                />
              </div>
            </div>
          </div>

          {/* Primary contact: Utama */}
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-admin-text-muted)", marginBottom: 4 }}>
              Utama (Main Contact Name)
            </label>
            <input
              id="form-input-utama"
              type="text"
              value={formData.utama || ""}
              onChange={(e) => handleFieldChange("utama", e.target.value)}
              className="form-input"
              placeholder="Name of primary registrant"
            />
          </div>

          {/* Internal Admin Notes */}
          <div>
            <label
              htmlFor="submission-notes-input"
              style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-admin-text-muted)", marginBottom: "0.375rem" }}
            >
              Admin Notes
            </label>
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

          {/* Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", paddingTop: "0.5rem" }}>
            <button
              id="cancel-edit-btn"
              type="button"
              onClick={onClose}
              className="btn-ghost"
            >
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
